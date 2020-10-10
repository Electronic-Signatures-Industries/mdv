const fs = require('fs');
const Documents = artifacts.require('Documents');
const Approvals = artifacts.require('Approvals');
const ContractImportBuilder = require('../contract-import-builder');

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(Approvals);
  const approvals = await Approvals.deployed();

  await approvals.addACL(accounts[0], 0); // add owner as admin

  await deployer.deploy(Documents, approvals.address);
  const documents = await Documents.deployed();

  await documents.addACL(accounts[0], 0); // add owner as admin

  
  const builder = new ContractImportBuilder();
  const path = `${__dirname}/../abi-export/index.js`;

  builder.setOutput(path);
  builder.onWrite = (output) => {
    fs.writeFileSync(path, output);
  };

  builder.addContract(
    'DocumentContract',
    documents,
    documents.address,
    network
  );

  
  builder.addContract(
    'ApprovalsContract',
    approvals,
    approvals.address,
    network
  );
  //  builder.addContract("DocumentPayableContract", documentPayable, documentPayable.address, network);
};
