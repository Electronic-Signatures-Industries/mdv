// const assert = require("assert");
const Web3 = require("web3");
const web3 = new Web3();
const BigNumber = require("bignumber.js");

contract("DocumentPayable", accounts => {
  let owner;
  let supplierAddr;
  let debtorAddr;
  let custodian;
  let DocumentContract = artifacts.require("DocumentPayable");
  let approvalCtr;
  let limits;


  contract("#documents", () => {
    before(async () => {

      owner = accounts[0];
      contract = await DocumentContract.deployed();
      owner = accounts[0];
      userAddr = accounts[1];
      recipientAddr = accounts[2];

    //  await contract.addACL(owner, 0); // add owner as admin
      await contract.addACL(recipientAddr, 1); // add recipient

      // set exchange fee
      await contract.setExchangeFee(new BigNumber(0.05 * 1e18));

      // set product ids
      await contract.setRecipientProductPrice(
        recipientAddr,
        1,
        new BigNumber(0.001 * 1e18)
      );
      await contract.setRecipientProductPrice(
        recipientAddr,
        2,
        new BigNumber(0.003 * 1e18)
      );
      assert.equal(contract !== null, true);
    });

    describe("when uploading documents", () => {
      it("should create tx and pay", async () => {
        assert.equal(contract !== null, true);
        const toString = txt => web3.utils.fromUtf8(txt);
        const toWei = usd => new BigNumber(usd);

        
        const payload = {
          recipient: recipientAddr,
          fileIpfsJson: toString(JSON.stringify([{path: '', content: '' }])),
          description: toString("....."),
        };
        const _owner = await contract.owner();


        const productId = 1;

        assert.equal(_owner.toLowerCase(), accounts[0].toLowerCase());

       
        const ok = await contract.addDocument(
          payload.recipient,
          productId,
          payload.fileIpfsJson,
          payload.description,
          { from: userAddr, value:  new BigNumber(0.051 * 1e18) }
        );

        assert.equal(!!ok.tx, true);
      });
    });
  });
});
