const fs = require('fs');

const WTemplate = artifacts.require('WTemplate');
const ReceiptModel = artifacts.require('ReceiptModel');
const ContractImportBuilder = require('../contract-import-builder');

module.exports = async (deployer, network, accounts) => {

  const eventRegistryAddress = '0x';

  // Deploy ReceiptModel
  await deployer.deploy(ReceiptModel, eventRegistry.address);
  const modelContract = await ReceiptModel.deployed();

  // Create WTemplate
  await deployer.deploy(WTemplate, modelContract.address);
  const template = await WTemplate.deployed();

  //  add owner as admin
  await template.addACL(owner); // add recipient

  const builder = new ContractImportBuilder();
  const path = `${__dirname}/../abi-export/receipts.js`;

  builder.setOutput(path);
  builder.onWrite = (output) => {
    fs.writeFileSync(path, output);
  };


  builder.addContract(
    'ReceiptModel',
    modelContract,
    modelContract.address,
    network
  );

  builder.addContract(
    'WTemplate',
    template,
    template.address,
    network);
};
