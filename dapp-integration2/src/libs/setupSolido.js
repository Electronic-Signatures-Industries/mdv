"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const solido_1 = require("@decent-bet/solido");
const solido_provider_ethers_1 = require("solido-provider-ethers");
const ethers_1 = require("ethers");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const { GSNProvider } = require("@openzeppelin/gsn-provider");
const contractImports = require("./contracts");
const ethrDIDRegistryABI = require("./eth-did-registry");
const ethrDIDImport = {
    raw: {
        abi: [ethrDIDRegistryABI]
    },
    address: {
        mainnet: "0xdCa7EF03e98e0DC2B855bE647C39ABe984fcF21B",
        ropsten: "0xdCa7EF03e98e0DC2B855bE647C39ABe984fcF21B"
    }
};
exports.setupSolido = async (options) => {
    // const networks: any = {
    //   3: 'ropsten',
    //   1: 'mainnet',
    //   4: 'rinkeby',
    // }
    // Create Solido Module
    const contractMappings = [
        {
            name: "Documents",
            import: contractImports.DocumentContract,
            provider: solido_provider_ethers_1.EthersPlugin,
            enableDynamicStubs: true
        },
        {
            name: "EthrDIDRegistry",
            import: ethrDIDImport,
            provider: solido_provider_ethers_1.EthersPlugin,
            enableDynamicStubs: true
        }
    ];
    // Create Solido Module
    const solido = new solido_1.SolidoModule(contractMappings);
    //  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
    const { web3 } = window;
    const defaultAccount = options.account;
    //  const Gsn = require('@openeth/gsn')
    //  const gsn = new Gsn.RelayProvider(web3.currentProvider,  { verbose: true, force_gasprice: 100000000, force_gaslimit: 1000000000000  }  )
    const provider = new ethers_1.ethers.providers.Web3Provider(web3.currentProvider);
    let network = "rinkeby"; //  rinkeby - 2
    if (options.networkId === 1) {
        network = "mainnet";
    }
    else if (options.networkId === 3) {
        network = "ropsten";
    }
    // Configure reactive solido store
    const store = {
        state: {
            currentTransaction: {
                txhash: ""
            }
        },
        mutations: {
            ADD_DOCUMENT: (e, contract) => {
                return rxjs_1.of(e).pipe(operators_1.map(items => {
                    return {
                        id: items[0],
                        supplier: items[1],
                        debtor: items[2],
                        status: "CREATED"
                    };
                }));
            }
        },
        mapEvents: {
            LogAddInvoice: {
                getter: "currentInvoice",
                mutation: "ADD_DOCUMENT"
            }
        },
        mapActions: {
            addInvoice: {
                getter: "currentInvoice",
                onFilter: "LogAddInvoice",
                mutation: "ADD_DOCUMENT"
            }
        }
    };
    const contracts = solido
        .bindContracts({
        ethers: {
            provider,
            options: {
                privateKey: "provider",
                defaultAccount: defaultAccount,
                provider,
                network,
                store
            }
        }
    })
        .connect();
    return { contracts, web3, account: defaultAccount, network, networkId: options.networkId, provider };
};
//# sourceMappingURL=setupSolido.js.map