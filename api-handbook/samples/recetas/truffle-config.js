const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config('../');
module.exports = {
  compilers: {
    solc: {
      version: '^0.6.0'
    }
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions : { 
      excludeContracts: ['Documents'],
      currency: 'USD'}
  },
  networks: {
    test: {
      from: '0x4198258023ed0d6fae5dbcf3af2aedaaa363571f',
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    development: {
      from: '0x4198258023ed0d6fae5dbcf3af2aedaaa363571f',
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, process.env.URL),
      network_id: 4,
      gas: 9000000,
      gasPrice: 10000000000
    },
    mainnet: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, process.env.URL),
      network_id: 1,
      gas: 4500000,
           gasPrice: 10000000000
    },

    ropsten: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, process.env.URL),
      network_id: 3
      , gas: 4500000,
           gasPrice: 10000000000
    }
  }
}
