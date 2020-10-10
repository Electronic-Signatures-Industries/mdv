const fs = require('fs');
const ethers = require('ethers');

const Approvals = artifacts.require('Approvals');
const ContractImportBuilder = require('../contract-import-builder');

module.exports = async (deployer, network, accounts) => {
  const owner = accounts[0];

  // Deploy Approvals extension
  await deployer.deploy(Approvals, { from: owner });
  const approvals = await Approvals.deployed();


  // Add Owner as ADMIN, EDITOR
  await approvals.addACL(owner, 0, {
    from: owner,
  });
  await approvals.addACL(owner, 1, {
    from: owner,
  });

  const builder = new ContractImportBuilder();
  const path = `${__dirname}/../abi-export/Approvals.js`;

  builder.setOutput(path);
  builder.onWrite = (output) => {
    fs.writeFileSync(path, output);
  };

  builder.addContract(
    'Approvals',
    approvals,
    approvals.address,
    network
  );

};
