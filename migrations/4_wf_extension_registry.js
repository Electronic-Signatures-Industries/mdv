const fs = require('fs');
const ethers = require('ethers');


const ExtensionEventRegistry = artifacts.require('ExtensionEventRegistry');

const ContractImportBuilder = require('../contract-import-builder');

module.exports = async (deployer, network, accounts) => {

  // Deploy ExtensionEventRegistry extension
  await deployer.deploy(ExtensionEventRegistry);
  const eventRegistry = await ExtensionEventRegistry.deployed();

  const builder = new ContractImportBuilder();
  const path = `${__dirname}/../abi-export/ExtensionEventRegistry.js`;

  builder.setOutput(path);
  builder.onWrite = (output) => {
    fs.writeFileSync(path, output);
  };



  builder.addContract(
    'ExtensionEventRegistry',
    eventRegistry,
    eventRegistry.address,
    network
  );
  //  builder.addContract("DocumentPayableContract", documentPayable, documentPayable.address, network);
};
