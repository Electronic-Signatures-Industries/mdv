const fs = require('fs');
const ethers = require('ethers');


const DV = artifacts.require('DV');

const ContractImportBuilder = require('../contract-import-builder');

module.exports = async (deployer, network, accounts) => {

  // Deploy DV extension
  await deployer.deploy(DV);
  const dv = await DV.deployed();
  await dv.seed();

  const builder = new ContractImportBuilder();
  const path = `${__dirname}/../abi-export/DV.js`;

  builder.setOutput(path);
  builder.onWrite = (output) => {
    fs.writeFileSync(path, output);
  };



  builder.addContract(
    'DV',
    dv,
    dv.address,
    network
  );
  //  builder.addContract("DocumentPayableContract", documentPayable, documentPayable.address, network);
};
