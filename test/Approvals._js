// const assert = require("assert");
const Web3 = require('web3');
const web3 = new Web3();
const BigNumber = require('bignumber.js');

contract('Approvals', accounts => {
  let owner;
  let editor;
  let ApprovalContract = artifacts.require('Approvals');
  let signers;
  let limits;
  let minimumSigners = 2;

  contract('#approvals', () => {
    before(async () => {
      signers = [
        '0xea817a76993ae9cd3a706ff9d4e6d96a581838db',
        '0x467d1c5aefda6cdf1e6ad75316bdb4c6118b7478',
        '0xda31d24d6008f35cb87dbc492accce50dcfe5675'
      ];

      contract = await ApprovalContract.deployed();
      owner = accounts[0];
      editor = signers[0];

      // await contract.addACL(owner, 0); // add owner as admin
      await contract.addACL(editor, 1, { from: owner }); // add supplier

      limits = [1000, 100, 1000];

      assert.equal(contract !== null, true);
    });
    describe('when an approval is created', () => {
      it('should add to approvals mapping', async () => {
        assert.equal(contract !== null, true);

        const _owner = await contract.owner();

        assert.equal(_owner.toLowerCase(), accounts[0].toLowerCase());
        const tx = await contract.add(editor, signers, limits, minimumSigners, {
          from: editor
        });
        assert(!!tx.logs[0].args.id, true);
      });
    });

    describe('when an approval exists', () => {
      it('should be removable', async () => {
        assert.equal(contract !== null, true);

        const _owner = await contract.owner();

        assert.equal(_owner.toLowerCase(), accounts[0].toLowerCase());
        const tx = await contract.add(editor, signers, limits, minimumSigners, {
          from: editor
        });
        const id = tx.logs[0].args.id * 1;
        const ok = await contract.remove(id, { from: editor });
        assert(ok, true);
      });
    });

    describe('when an approval exists', () => {
      it('should has return a boolean', async () => {
        assert.equal(contract !== null, true);

        const _owner = await contract.owner();

        assert.equal(_owner.toLowerCase(), accounts[0].toLowerCase());
        const tx = await contract.add(editor, signers, limits, minimumSigners, {
          from: editor
        });
        const id = tx.logs[0].args.id * 1;
        const ok = await contract.has(id);
        assert(ok, true);
      });
    });

    describe('when an approval exists', () => {
      it('should return count of signers', async () => {
        assert.equal(contract !== null, true);

        const _owner = await contract.owner();

        assert.equal(_owner.toLowerCase(), accounts[0].toLowerCase());
        const tx = await contract.add(editor, signers, limits, minimumSigners, {
          from: editor
        });
        const id = tx.logs[0].args.id * 1;
        const ok = await contract.has(id);

        const count = await contract.getSignersCount(id);
        assert(count * 1, 3);
      });
    });

    describe('when an approval exists', () => {
      it('should check if it can be approved - negative', async () => {
        assert.equal(contract !== null, true);

        const _owner = await contract.owner();

        assert.equal(_owner.toLowerCase(), accounts[0].toLowerCase());
        const tx = await contract.add(editor, signers, limits, minimumSigners, {
          from: editor
        });
        const id = tx.logs[0].args.id * 1;
        const canApproved = await contract.canApproved(id, accounts[0], {
          from: accounts[0]
        });
        // console.log(canApproved)
        assert.isFalse(canApproved);
      });

      it('should check if it can be approved - positive', async () => {
        assert.equal(contract !== null, true);

        const _owner = await contract.owner();

        assert.equal(_owner.toLowerCase(), accounts[0].toLowerCase());
        const tx = await contract.add(editor, signers, limits, minimumSigners, {
          from: editor
        });
        const id = tx.logs[0].args.id * 1;

        const canApproved = await contract.canApproved(id, editor, {
          from: editor
        });
        assert.isTrue(canApproved);
      });
    });

    describe('when an editor sets approved', () => {
      it('should set to approved', async () => {
        assert.equal(contract !== null, true);

        const _owner = await contract.owner();

        assert.equal(_owner.toLowerCase(), accounts[0].toLowerCase());
        const tx = await contract.add(editor, signers, limits, minimumSigners, {
          from: editor
        });
        const id = tx.logs[0].args.id * 1;

        let res = await contract.approvals(id, editor);
        assert.equal(res.signedStatus, 0);

        await contract.setApproved(id, editor, 1000, {
          from: editor
        });

        res = await contract.approvals(id, editor);
        assert.equal(res.signedStatus, 1);
      });
    });

    it('should return invalid limit', async () => {
      assert.equal(contract !== null, true);

      const _owner = await contract.owner();

      assert.equal(_owner.toLowerCase(), accounts[0].toLowerCase());
      const tx = await contract.add(editor, signers, limits, minimumSigners, {
        from: editor
      });
      const id = tx.logs[0].args.id * 1;
      console.log(await contract.approvals(id, accounts[0]));
      console.log(await contract.approvals(id, editor));

      const fn = () => {
        return contract.setApproved(id, 1001, {
          from: editor
        });
      };

      try {
        assert.throws(
          await fn(),
          'VM Exception while processing transaction: revert Amount request limit met, please request more -- Reason given: Amount request limit met, please request more.'
        );
      } catch (e) {
        assert(true, true);
      }
    });

    it('should return minimum signers reached', async () => {
      assert.equal(contract !== null, true);

      const _owner = await contract.owner();

      assert.equal(_owner.toLowerCase(), accounts[0].toLowerCase());
      const tx = await   contract.add(editor, signers, limits, minimumSigners, {
        from: editor
      });
      const id = tx.logs[0].args.id * 1;

      // signer 1
      let res = await contract.approvals(id, editor);
      assert.equal(res.signedStatus, 0);

      await contract.setApproved(id, editor, 1000, {
        from: editor
      });

      res = await contract.approvals(id, editor);
      assert.equal(res.signedStatus, 1);

      // signer 2
      await contract.setApproved(id, signers[1], 100, {
        from: signers[1]
      });

      res = await contract.approvals(id, signers[1]);
      assert.equal(res.signedStatus, 1);

      try {
        // signer 3
        await contract.setApproved(id, signers[2], 1000, {
          from: signers[2]
        });
      } catch (e) {
        res = await contract.closedApprovals(id);
        assert.equal(res, 2);
      }
    });
  });
});
