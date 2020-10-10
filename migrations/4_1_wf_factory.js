const fs = require('fs');
const ethers = require('ethers');


const WFactory = artifacts.require('WFactory');

const ContractImportBuilder = require('../contract-import-builder');

module.exports = async (deployer, network, accounts) => {

  // Deploy WFactory extension
  await deployer.deploy(WFactory);
  const contract = await WFactory.deployed();

  const builder = new ContractImportBuilder();
  const path = `${__dirname}/../abi-export/WFactory.js`;

  builder.setOutput(path);
  builder.onWrite = (output) => {
    fs.writeFileSync(path, output);
  };



  builder.addContract(
    'WFactory',
    contract,
    contract.address,
    network
  );
  //  builder.addContract("DocumentPayableContract", documentPayable, documentPayable.address, network);
};
