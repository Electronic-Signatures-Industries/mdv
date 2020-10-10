// const assert = require("assert");
const Web3 = require('web3');
const web3 = new Web3();
const BigNumber = require('bignumber.js');
const ethers = require('ethers');
const EthCrypto = require('eth-crypto');

const getPubKey = async pvk => {
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
    signature
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

contract('Documents', accounts => {
  let owner;
  
  let DocumentContract = artifacts.require('Documents');
  let name = 'John';
  let lastName = 'Doe';
  let email = 'john.doe@_gmail_.com';
  let userPvk =
    '4d6f765a6fbf1067467f9e11d334bdf7e85c4faf734d52048ed215fdba3ef4b4';
  let pvk = 'f5a46017fdbe655e694de83c42c6c3332b57f2baf6385bccb745db5f501314a7';

  contract('#documents', () => {
    before(async () => {
      owner = accounts[0];
      contract = await DocumentContract.deployed();
      owner = accounts[0];
      userAddr = accounts[1];
      recipientAddr = accounts[2];

      //  await contract.addACL(owner, 0); // add owner as admin
      await contract.addACL(recipientAddr, 1); // add recipient

      // create license
      const lic = await contract.createLicense(
        web3.utils.sha3('Panama Protege 2020'),
        new Date(2021, 2, 2).getTime() / 1000,
        'Licencia para MITRADEL'
      );
      const lic2 = await contract.createLicense(
        web3.utils.sha3('Panama Protege 2020 #2'),
        new Date(2021, 2, 2).getTime() / 1000,
        'Licencia para usuario'
      );

      const lic3 = await contract.createLicense(
        web3.utils.sha3('Panama Protege 2020 #3'),
        new Date(2021, 2, 2).getTime() / 1000,
        'Licencia para cliente'
      );

      await contract.createLicense(
        web3.utils.sha3('Panama Protege 2020 #4'),
        new Date(2021, 2, 2).getTime() / 1000,
        'Licencia para cliente'
      );

      await contract.createLicense(
        web3.utils.sha3('Panama Protege 2020 #5'),
        new Date(2021, 2, 2).getTime() / 1000,
        'Licencia para cliente'
      );

      await contract.createLicense(
        web3.utils.sha3('Panama Protege 2020 #6'),
        new Date(2021, 2, 2).getTime() / 1000,
        'Licencia para cliente'
      );

      console.log(lic.logs[0].args);
      assert.equal(contract !== null, true);
    });

    describe('when enrolling users', () => {
      it('should create identities', async () => {
        assert.equal(contract !== null, true);
        const toString = txt => web3.utils.fromUtf8(txt);

        const pub = await getPubKey(pvk);
        const ok = await contract.addIdentity(
          recipientAddr,
          pub,
          1,
          web3.utils.sha3('Panama Protege 2020'),
          { from: recipientAddr }
        );
        assert.equal(!!ok.tx, true);
      });

      it('should create two identities', async () => {
        assert.equal(contract !== null, true);
        const toString = txt => web3.utils.fromUtf8(txt);

        const pub2 = await getPubKey(userPvk);
        const pub = await getPubKey(pvk);
        const ok = await contract.addIdentity(
          recipientAddr,
          pub,
          1,
          web3.utils.sha3('Panama Protege 2020 #3'),
          { from: recipientAddr }
        );
        await contract.addIdentity(
          userAddr,
          pub2,
          0,
          web3.utils.sha3('Panama Protege 2020 #2'),
          { from: userAddr }
        );
        assert.equal(!!ok.tx, true);
      });
      it('should failed because of invalid api key', async () => {
        assert.equal(contract !== null, true);
        const toString = txt => web3.utils.fromUtf8(txt);

        const pub = await getPubKey(pvk);
        try {
          const ok = await contract.addIdentity(
            recipientAddr,
            pub,
            1,
            web3.utils.sha3('Panama Protege 2020.'),
            { from: recipientAddr }
          );
        } catch (e) {
          assert.equal(!!e, true);
        }
      });
    });
  });

  describe('when sending requests to recipient', () => {
    it('should create document record', async () => {
      assert.equal(contract !== null, true);
      const toString = txt => web3.utils.fromUtf8(txt);

      await contract.addDocument(
        recipientAddr,
        toString(JSON.stringify([{ path: '', content: '' }])),
        toString('.....'),
        ethers.utils.formatBytes32String(email),
        ethers.utils.formatBytes32String(name),
        ethers.utils.formatBytes32String(lastName),
        {
          from: userAddr
        }
      );
    });

    it('should failed to create document record', async () => {
      assert.equal(contract !== null, true);
      const toString = txt => web3.utils.fromUtf8(txt);

      const pub = await getPubKey(pvk);

      // get recipient public key
      const res = await contract.idUsers(recipientAddr);
      const entry = await contract.idUserArray(res.index);
      assert.equal(pub, entry.publicKey);

      try {
        const response = await contract.addDocument(
          recipientAddr,
          toString(JSON.stringify([{ path: '', content: '' }])),
          toString('.....'),
          ethers.utils.formatBytes32String(email),
          ethers.utils.formatBytes32String(name),
          ethers.utils.formatBytes32String(lastName),
          {
            from: owner
          }
        );
      } catch (e) {
        assert.equal(!!e, true);
      }
    });
  });

  describe('when recipient reviews', () => {
    it('should accept document', async () => {
      assert.equal(contract !== null, true);
      const toString = txt => web3.utils.fromUtf8(txt);

      const response = await contract.setDocumentAccepted(0, {
        from: recipientAddr
      });

      assert.isTrue(response.logs[0].args.user === userAddr);
    });

    it('should certified document', async () => {
      assert.equal(contract !== null, true);
      const toString = txt => web3.utils.fromUtf8(txt);

      const response = await contract.setDocumentCertified(0, {
        from: recipientAddr
      });

      assert.isTrue(response.logs[0].args.user === userAddr);
    });

    it('should wait for payment', async () => {
      assert.equal(contract !== null, true);
      const toString = txt => web3.utils.fromUtf8(txt);

      const response = await contract.setServiceFeeSent(0, recipientAddr, {
        from: userAddr
      });

      assert.isTrue(response.logs[0].args.user === userAddr);
    });

    it('should set payment received', async () => {
      assert.equal(contract !== null, true);
      const toString = txt => web3.utils.fromUtf8(txt);

      const response = await contract.setServiceFeeReceived(0, {
        from: recipientAddr
      });

      assert.isTrue(response.logs[0].args.user === userAddr);
    });
    it('should sent certified documents', async () => {
      assert.equal(contract !== null, true);
      const toString = txt => web3.utils.fromUtf8(txt);

      const response = await contract.addCertifiedDocuments(
        0,
        toString(JSON.stringify([{ path: '', content: '' }])),
        {
          from: recipientAddr
        }
      );

      assert.isTrue(response.logs[0].args.user === userAddr);
    });

    it('should canceled if rejected or created', async () => {
      await contract.addDocument(
        recipientAddr,
        toString(JSON.stringify([{ path: '', content: '' }])),
        toString('.....'),
        ethers.utils.formatBytes32String(email),
        ethers.utils.formatBytes32String(name),
        ethers.utils.formatBytes32String(lastName),
        {
          from: userAddr
        }
      );
      
      const response = await contract.setUserCanceled(1, recipientAddr, {
        from: userAddr
      });

      assert.isTrue(response.logs[0].args.user === userAddr);
    });

    it('should reject if created or accepted', async () => {
      await contract.addDocument(
        recipientAddr,
        toString(JSON.stringify([{ path: '', content: '' }])),
        toString('.....'),
        ethers.utils.formatBytes32String(email),
        ethers.utils.formatBytes32String(name),
        ethers.utils.formatBytes32String(lastName),
        {
          from: userAddr
        }
      );

      const response = await contract.setDocumentAccepted(2, {
        from: recipientAddr
      });

      await contract.setDocumentRejected(2, {
        from: recipientAddr
      });

      assert.isTrue(response.logs[0].args.user === userAddr);
    });

    it('should failed to create document record', async () => {
      assert.equal(contract !== null, true);
      const toString = txt => web3.utils.fromUtf8(txt);

      const pub = await getPubKey(pvk);

      // get recipient public key
      const res = await contract.idUsers(recipientAddr);
      const entry = await contract.idUserArray(res.index);
      assert.equal(pub, entry.publicKey);

      try {
        const response = await contract.addDocument(
          recipientAddr,
          toString(JSON.stringify([{ path: '', content: '' }])),
          toString('.....'),
          ethers.utils.formatBytes32String(email),
          ethers.utils.formatBytes32String(name),
          ethers.utils.formatBytes32String(lastName),
          {
            from: owner
          }
        );
      } catch (e) {
        assert.equal(!!e, true);
      }
    });
  });

  xdescribe('when sending documents', () => {
    it('should encrypt documents with recipient public key', async () => {
      assert.equal(contract !== null, true);
      const toString = txt => web3.utils.fromUtf8(txt);

      const pub = await getPubKey(pvk);

      // get recipient public key
      const res = await contract.idUsers(recipientAddr);
      const entry = await contract.idUserArray(res.index);
      assert.equal(pub, entry.publicKey);

      const cipher = await encrypt(
        userPvk,
        res.publicKey,
        'Encripta estos datos'
      );

      assert.isFalse(cipher == 'Encripta estos datos');
    });

    it('should decrypt documents with recipient private key', async () => {
      assert.equal(contract !== null, true);
      const pub = await getPubKey(pvk);

      // get recipient public key
      const res = await contract.idUsers(recipientAddr);
      const entry = await contract.idUserArray(res.index);
      assert.equal(pub, entry.publicKey);

      const cipher = await encrypt(
        userPvk,
        res.publicKey,
        'Encripta estos datos'
      );

      assert.isFalse(cipher == 'Encripta estos datos');

      // decrypt with recipient private key
      const message = await decrypt(userAddr, pvk, cipher);
      assert.isTrue(message === 'Encripta estos datos');
    });
    it('should failed because of invalid api key', async () => {
      assert.equal(contract !== null, true);
      const toString = txt => web3.utils.fromUtf8(txt);

      const pub = await getPubKey(pvk);
      try {
        const ok = await contract.addIdentity(
          recipientAddr,
          toString(pub),
          1,
          web3.utils.sha3('Panama Protege 2020.'),
          { from: recipientAddr }
        );
      } catch (e) {
        assert.equal(!!e, true);
      }
    });
  });
});
