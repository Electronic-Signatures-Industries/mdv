const fs = require('fs');
const ethers = require('ethers');

const WTemplate = artifacts.require('WTemplate');
const Approvals = artifacts.require('Approvals');
const ExtensionEventRegistry = artifacts.require('ExtensionEventRegistry');
const RecetaModel = artifacts.require('RecetaModel');
const WFactoryHelper = require('../wfactory-helper');

const ContractImportBuilder = require('../contract-import-builder');

module.exports = async (deployer, network, accounts) => {

  // Factory helper
  let wf = new WFactoryHelper();

  const eventRegistryAddress = '0x5b20dF810d32184eF79cb2eFc7bE9dAeA7c4fb19';
  
  
  
  // Deploy RecetaModel
await deployer.deploy(RecetaModel, eventRegistryAddress);
const modelContract =  await RecetaModel.deployed();  
  

  const builder = new ContractImportBuilder();
  const path = `${__dirname}/../abi-export/RecetaModel.js`;

  builder.setOutput(path);
  builder.onWrite = (output) => {
    fs.writeFileSync(path, output);
  };

  builder.addContract(
    'RecetaModel',
    modelContract,
    modelContract.address,
    network
  );
  //  builder.addContract("DocumentPayableContract", documentPayable, documentPayable.address, network);
};
