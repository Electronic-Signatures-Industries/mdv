// const assert = require("assert");
const Web3 = require('web3');
const web3 = new Web3();
const BigNumber = require('bignumber.js');
const ethers = require('ethers');
const EthCrypto = require('eth-crypto');
const WFactoryHelper = require('../wfactory-helper');

const getPubKey = async (pvk) => {
  const provider = new ethers.providers.JsonRpcProvider(
    'http://localhost:8545'
  );
  const wallet = new ethers.Wallet(pvk, provider);
  const signer = wallet.provider.getSigner();

  const hash = await ethers.utils.keccak256(recipientAddr);
  const sig = await signer.signMessage(ethers.utils.arrayify(hash));
  const publicKey = ethers.utils.recoverPublicKey(hash, sig);

  return publicKey.replace('0x', '');
};

const encrypt = async (senderPvk, pubKey, values) => {
  const signature = EthCrypto.sign(senderPvk, EthCrypto.hash.keccak256(values));
  const payload = {
    message: values,
    signature,
  };
  const data = await EthCrypto.encryptWithPublicKey(
    pubKey.replace('0x', ''),
    JSON.stringify(payload)
  );

  return EthCrypto.cipher.stringify(data);
};

const decrypt = async (sender, pvkKey, cipher) => {
  const data = EthCrypto.cipher.parse(cipher);
  const decrypted = await EthCrypto.decryptWithPrivateKey(pvkKey, data);

  // verify
  const address = EthCrypto.recover(
    decrypted.signature,
    EthCrypto.hash.keccak256(decrypted.message)
  );

  if (sender === address) {
    return decrypted.message;
  } else {
    throw new Error('Invalid sender');
  }
};

contract('WTemplate - TestDocumentModel', (accounts) => {
  let owner;
  let template = null;
  let templAddress = '';
  let modelContract;
  let factoryContract;
  let approvalsContract;
  let approvalExtensionId;
  let eventRegistry;
  let ExtensionEventRegistry = artifacts.require('ExtensionEventRegistry');
  let Approvals = artifacts.require('Approvals');
  let TestDocumentModelContract = artifacts.require('TestDocumentModel');
  let WTemplateContract = artifacts.require('WTemplate');
  let WFactoryContract = artifacts.require('WFactory');
  let wf = new WFactoryHelper();

  // States
  wf.createStates([
    'NONE',
    'CREATED',
    'ACCEPTED',
    'CERTIFIED',
    'COMPLETED',
    'MULTI_SIGNERS',
  ]);

  //  Actors
  wf.createActors(['USER', 'NOTARY']);

  // Steps
  wf.createStep({
    currentActor: wf.getActor('USER'),
    current: wf.getState('NONE'), // none
    next: wf.getState('CREATED'), // created
    mappingType: 0, // init
  });
  wf.createStep({
    currentActor: wf.getActor('NOTARY'),
    current: wf.getState('CREATED'), // created
    next: wf.getState('ACCEPTED'), // accepted
    mappingType: 2, // status
    stepValidations: [wf.getState('CREATED')],
  });
  wf.createStep({
    currentActor: wf.getActor('NOTARY'),
    current: wf.getState('ACCEPTED'), // accepted
    next: wf.getState('MULTI_SIGNERS'), // certified
    mappingType: 2, // updated_diff
    forkId: wf.getState('CERTIFIED'),
    stepValidations: [wf.getState('ACCEPTED')],
    recipientValidations: [accounts[2]],
  });
  wf.createStep({
    currentActor: wf.getActor('NOTARY'),
    current: wf.getState('MULTI_SIGNERS'), // accepted
    next: wf.getState('CERTIFIED'), // certified
    mappingType: 2, // updated_diff
    forkId: wf.getState('MULTI_SIGNERS'),
    stepValidations: [wf.getState('ACCEPTED'), wf.getState('MULTI_SIGNERS')],
    recipientValidations: [...accounts],
  });
  wf.createStep({
    currentActor: wf.getActor('USER'),
    current: wf.getState('CERTIFIED'), //       forkId: 0,
    next: wf.getState('COMPLETED'), // completed
    mappingType: 2, // status
    stepValidations: [wf.getState('CERTIFIED')],
    senderValidations: [...accounts],
  });

  contract('#wfactory', () => {
    before(async () => {
      // event registry
      eventRegistry = await ExtensionEventRegistry.new();
      approvalsContract = await Approvals.new({ from: accounts[0] });
      // create model contract
      modelContract = await TestDocumentModelContract.new(
        eventRegistry.address
      );
      owner = accounts[0];
      userAddr = accounts[1];
      userAddr2 = accounts[2];
      recipientAddr = accounts[2];

      await approvalsContract.addACL(userAddr, 0, {
        from: owner,
      });
      await approvalsContract.addACL(userAddr, 1, {
        from: owner,
      });

      // Create approval check
      const logs = await approvalsContract.add(
        userAddr,
        [userAddr, userAddr2],
        [515, 300],
        2,
        {
          from: userAddr,
        }
      );

      const id = logs.receipt.logs[0].args.id;

      // Add Approval as extension
      const regLog = await eventRegistry.add(
        'approvals',
        approvalsContract.address,
        id
      );

      approvalExtensionId = regLog.receipt.logs[0].args.id;
      console.log(approvalExtensionId);
    });

    describe('create wtemplate', () => {
      it('should generate workflow template', async () => {
        factoryContract = await WFactoryContract.new();
        const tx = await factoryContract.payWorkflowTemplate(modelContract.address, {
          value: 0.002*1e18
        });
        templAddress = tx.logs[0].args[0];
        template = await WTemplateContract.at(templAddress);

        await template.createWF(
          wf.createWFPayload(
            wf.getSteps(), [
            [wf.getActor('USER'), wf.getState('NONE'), wf.getState('CREATED')],
            [
              wf.getActor('NOTARY'),
              wf.getState('CREATED'),
              wf.getState('ACCEPTED'),
            ],
            [
              wf.getActor('NOTARY'),
              wf.getState('ACCEPTED'),
              wf.getState('MULTI_SIGNERS'),
            ],
            [
              wf.getActor('NOTARY'),
              wf.getState('MULTI_SIGNERS'),
              wf.getState('CERTIFIED'),
            ],
            [
              wf.getActor('USER'),
              wf.getState('CERTIFIED'),
              wf.getState('COMPLETED'),
            ],
          ])
        );
        // await template.createDataStorage(documentTable);

        //  await contract.addACL(owner, 0); // add owner as admin
        await template.addACL(owner); // add recipient

        // create license
        const lic = await template.createUserAccess(
          web3.utils.sha3('Panama Protege 2020'),
          new Date(2021, 2, 2).getTime() / 1000,
          'Licencia para MITRADEL'
        );
        const lic2 = await template.createUserAccess(
          web3.utils.sha3('Panama Protege 2020 #2'),
          new Date(2021, 2, 2).getTime() / 1000,
          'Licencia para usuario'
        );

        const lic3 = await template.createUserAccess(
          web3.utils.sha3('Panama Protege 2020 #3'),
          new Date(2021, 2, 2).getTime() / 1000,
          'Licencia para cliente'
        );

        let ok = await template.addIdentity(
          userAddr,
          `did:ethr:${userAddr}`,
          web3.utils.sha3('Panama Protege 2020'),
          { from: userAddr }
        );
        ok = await template.addIdentity(
          userAddr2,
          `did:ethr:${userAddr2}`,
          web3.utils.sha3('Panama Protege 2020 #2'),
          { from: userAddr2 }
        );
      });

      it('should execute workflow step 0 to 1 - created', async () => {
        const addr = templAddress;
        const payload = wf.createPayload({
          fileIpfsJson: JSON.stringify([{ path: '', content: '' }]),
          certifiedFilesIpfsJson: '',
          email: '',
          description: 'Testing workflow',
          name: 'John',
          lastname: 'Lopez',
          amount: 100,
        });

        // create doc sent to user addr 2

        let tx = await wf.executeStep(template, {
          to: userAddr2,
          step: wf.getState('NONE'),
          actor: wf.getActor('USER'),
          from: userAddr,
          payload,
        });

           console.log(tx.logs[0], tx.logs[1]);
      });
      it('should execute workflow step 1 to 2 - accepted', async () => {
        const addr = templAddress;
        const payload = wf.createPayload({
          fileIpfsJson: '',
          certifiedFilesIpfsJson: '',
          email: '',
          description: '',
          name: '',
          lastname: '',
          amount: 0,
        });

        let tx = await wf.executeStep(template, {
          to: userAddr,
          step: wf.getState('CREATED'),
          actor: wf.getActor('NOTARY'),
          documentId: 0,
          from: userAddr2,
          payload,
        });
        const log = tx.receipt.logs[0].args;
        assert.equal(log.current, wf.getState('CREATED'));
      });
      it('should throw exception if actor is invalid', async () => {
        const addr = templAddress;
        const payload = wf.createPayload({
          fileIpfsJson: '',
          certifiedFilesIpfsJson: '',
          email: '',
          description: '',
          name: '',
          lastname: '',
          amount: 0,
        });

        try {
          let tx = await wf.executeStep(template, {
            to: userAddr,
            step: wf.getState('CREATED'),
            actor: 11,
            documentId: 0,
            from: userAddr2,
            payload,
          });
        } catch (e) {
          assert.equal(
            e.toString().indexOf('WF_TEMPLATE_INVALID_ACTOR') > -1,
            true
          );
        }
      });
      it('should throw exception if step is invalid', async () => {
        const addr = templAddress;
        const payload = wf.createPayload({
          fileIpfsJson: '',
          certifiedFilesIpfsJson: '',
          email: '',
          description: '',
          name: '',
          lastname: '',
          amount: 0,
        });

        try {
          let tx = await wf.executeStep(template, {
            to: userAddr,
            step: 11,
            actor: wf.getActor('NOTARY'),
            documentId: 0,
            from: userAddr2,
            payload,
          });
        } catch (e) {
          assert.equal(
            e.toString().indexOf('WF_TEMPLATE_INVALID_ACTOR_OR_STEP') > -1,
            true
          );
        }
      });
      it('should throw invalid step if requested step is not next', async () => {
        const addr = templAddress;
        const payload = wf.createPayload({
          fileIpfsJson: '',
          certifiedFilesIpfsJson: '',
          email: '',
          description: '',
          name: '',
          lastname: '',
          amount: 0,
        });

        try {
          let tx = await wf.executeStep(template, {
            to: userAddr,
            step: wf.getState('NONE'),
            actor: wf.getActor('NOTARY'),
            documentId: 0,
            payload,
            from: userAddr2,
          });
        } catch (e) {
          assert.equal(
            e.toString().indexOf('WF_TEMPLATE_INVALID_ACTOR_OR_STEP') > -1,
            true
          );
        }
      });
      it('should execute workflow step 2 to 3 - multi signers', async () => {
        const addr = templAddress;
        const payload = wf.createPayload({
          fileIpfsJson: '',
          certifiedFilesIpfsJson: '',
          email: '',
          description: '',
          name: '',
          lastname: '',
          amount: 200,
        });

        let tx = await wf.executeStep(template, {
          to: userAddr,
          step: wf.getState('ACCEPTED'),
          actor: wf.getActor('NOTARY'),
          documentId: 0,
          from: userAddr2,
          extensionId: approvalExtensionId,
          payload,
        });

        const log = tx.receipt.logs[0].args;
        // console.log(...tx.receipt.rawLogs);
        assert.equal(log.current, wf.getState('ACCEPTED'));
      });
      it('should execute workflow step 3 to 4 - certified', async () => {
        const addr = templAddress;
        const payload = wf.createPayload({
          fileIpfsJson: '',
          certifiedFilesIpfsJson: '',
          email: '',
          description: '',
          name: '',
          lastname: '',
          amount: 200,
        });

        let tx = await wf.executeStep(template, {
          to: userAddr,
          step: wf.getState('MULTI_SIGNERS'),
          actor: wf.getActor('NOTARY'),
          documentId: 0,
          from: userAddr,
          extensionId: approvalExtensionId,
          payload,
        });

        const log = tx.receipt.logs[0].args;
        // console.log(...tx.receipt.rawLogs);
        assert.equal(log.current, wf.getState('MULTI_SIGNERS'));
      });
      it('should execute workflow step 4 to 5 - completed', async () => {
        const addr = templAddress;
        const payload = wf.createPayload({
          fileIpfsJson: '',
          certifiedFilesIpfsJson: '',
          email: '',
          description: '',
          name: '',
          lastname: '',
          amount: 200,
        });

        let tx = await wf.executeStep(template, {
          to: userAddr2,
          step: wf.getState('CERTIFIED'),
          actor: wf.getActor('USER'),
          documentId: 0,
          payload,
          from: userAddr,
        });
        console.log(tx.logs[1]);
      });
    });
  });
});
