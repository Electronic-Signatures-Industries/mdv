module.exports = {
  VERSION: "1.0.0",
  DocumentContract: {
    raw: {
      abi: [
        {
          inputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
          signature: "constructor"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              indexed: false,
              internalType: "string",
              name: "ipfsFilesJson",
              type: "string"
            }
          ],
          name: "LogAddDocument",
          type: "event",
          signature:
            "0xae8c0f902177ac5d76be1c2a5c1ba7f0dbd62e06d5710ec7c3aad2e11cfab556"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            }
          ],
          name: "LogDocumentsReceived",
          type: "event",
          signature:
            "0xaa41c19fa6656c7f9df41b7154149b978ce03c49397c175778ba2f6f678e5ac7"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            }
          ],
          name: "LogDocumentsReleased",
          type: "event",
          signature:
            "0x318ff958955faeeeff147ac870ac029b3b5084bc2157aa9aa7790721852549e2"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "id",
              type: "address"
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "idType",
              type: "uint256"
            }
          ],
          name: "LogIdentityAdded",
          type: "event",
          signature:
            "0xb9054126adf0bf382c5ceb6af2f01b1a7d934d23f2fe6ac5106a575d596828ec"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "key",
              type: "string"
            }
          ],
          name: "LogLicenseCreated",
          type: "event",
          signature:
            "0xfc3966531ddfc7ad6471ad015ece52c51c98e90489678b1bbf591d83bde5305d"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "apiKey",
              type: "string"
            }
          ],
          name: "LogLicenseEnabled",
          type: "event",
          signature:
            "0x3689df2dacc9584137727ef65fb091dafebdcd0719897d70d6d406dc2fbb67c0"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "apiKey",
              type: "string"
            }
          ],
          name: "LogLicenseRenewed",
          type: "event",
          signature:
            "0xdb1cc5669b3841d305deef2d9fa8290cdfa4a0234d67a25f0cfa7db0ebd1bbda"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            }
          ],
          name: "LogRecipientAccepted",
          type: "event",
          signature:
            "0x780af8cf256cef3b1d085e9db2a86ce54aa1126bbb5fbe2a97d7dbd35f2e4685"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            }
          ],
          name: "LogRecipientCertified",
          type: "event",
          signature:
            "0xcedfce38ab5063d3cbda63452ea5b15bf576691bd602bf4096f5bb25fbb59fc7"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            }
          ],
          name: "LogRecipientRejected",
          type: "event",
          signature:
            "0x5060c48e91f3e22b940e74f7cef991a14afd455397821489272482607ac1db70"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            }
          ],
          name: "LogServiceFeeReceived",
          type: "event",
          signature:
            "0x6538d44ebf5fe8e3845a164fe28e1da2ce9c1bbd954823d81071967a216e2dd4"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            }
          ],
          name: "LogServiceFeeSent",
          type: "event",
          signature:
            "0x8a3187e7f79bee85aef53ac12e18fa779d7cd954d0a1c6b3c673437f7d7ef99c"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            }
          ],
          name: "LogUserCanceled",
          type: "event",
          signature:
            "0xb0c0b236d78c292806bb60fa57f91c6966964e54ddcd53b7a821e5074d572bfc"
        },
        {
          constant: true,
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "idUserArray",
          outputs: [
            { internalType: "address", name: "id", type: "address" },
            { internalType: "uint256", name: "idType", type: "uint256" },
            {
              internalType: "string",
              name: "registeredApiKey",
              type: "string"
            },
            { internalType: "string", name: "publicKey", type: "string" },
            { internalType: "bool", name: "removed", type: "bool" },
            { internalType: "uint256", name: "index", type: "uint256" },
            { internalType: "uint256", name: "expires", type: "uint256" }
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
          signature: "0xacbdbd9e"
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "idUsers",
          outputs: [
            { internalType: "address", name: "id", type: "address" },
            { internalType: "uint256", name: "idType", type: "uint256" },
            {
              internalType: "string",
              name: "registeredApiKey",
              type: "string"
            },
            { internalType: "string", name: "publicKey", type: "string" },
            { internalType: "bool", name: "removed", type: "bool" },
            { internalType: "uint256", name: "index", type: "uint256" },
            { internalType: "uint256", name: "expires", type: "uint256" }
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
          signature: "0x818b2062"
        },
        {
          constant: true,
          inputs: [{ internalType: "string", name: "", type: "string" }],
          name: "licenses",
          outputs: [
            { internalType: "uint256", name: "expires", type: "uint256" },
            { internalType: "string", name: "description", type: "string" },
            { internalType: "bool", name: "enabled", type: "bool" },
            { internalType: "bool", name: "created", type: "bool" }
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
          signature: "0x0540dafd"
        },
        {
          constant: true,
          inputs: [],
          name: "owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
          signature: "0x8da5cb5b"
        },
        {
          constant: true,
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "recipientArray",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
          signature: "0xcff29424"
        },
        {
          constant: true,
          inputs: [],
          name: "recipientCount",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
          signature: "0x22eabb8e"
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "recipientDocumentCount",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
          signature: "0xe76e8ca8"
        },
        {
          constant: true,
          inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "uint256", name: "", type: "uint256" }
          ],
          name: "recipientDocuments",
          outputs: [
            { internalType: "string", name: "fileIpfsJson", type: "string" },
            {
              internalType: "string",
              name: "certifiedFilesIpfsJson",
              type: "string"
            },
            { internalType: "uint256", name: "status", type: "uint256" },
            { internalType: "string", name: "description", type: "string" },
            { internalType: "address", name: "recipient", type: "address" },
            { internalType: "address", name: "user", type: "address" },
            { internalType: "bytes32", name: "email", type: "bytes32" },
            { internalType: "bytes32", name: "name", type: "bytes32" },
            { internalType: "bytes32", name: "lastName", type: "bytes32" }
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
          signature: "0x2905122e"
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "recipientIndex",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
          signature: "0xc4a503c4"
        },
        {
          constant: true,
          inputs: [],
          name: "userCount",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
          signature: "0x07973ccf"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "user", type: "address" },
            { internalType: "uint8", name: "aclType", type: "uint8" }
          ],
          name: "addACL",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0xfe8e980b"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "user", type: "address" },
            { internalType: "uint8", name: "aclType", type: "uint8" }
          ],
          name: "removeACL",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0xd1e5dbc2"
        },
        {
          constant: false,
          inputs: [
            { internalType: "string", name: "key", type: "string" },
            { internalType: "uint256", name: "expires", type: "uint256" },
            { internalType: "string", name: "description", type: "string" }
          ],
          name: "createLicense",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0x52424da3"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "id", type: "address" },
            { internalType: "string", name: "key", type: "string" },
            { internalType: "uint256", name: "expires", type: "uint256" }
          ],
          name: "renewLicense",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0x6fea761d"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "id", type: "address" },
            { internalType: "string", name: "publicKey", type: "string" },
            { internalType: "uint256", name: "idType", type: "uint256" },
            { internalType: "string", name: "key", type: "string" }
          ],
          name: "addIdentity",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0xac72071d"
        },
        {
          constant: false,
          inputs: [{ internalType: "address", name: "id", type: "address" }],
          name: "removeIdentity",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0xc1f2f1aa"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "recipient", type: "address" },
            { internalType: "string", name: "fileIpfsJson", type: "string" },
            { internalType: "string", name: "description", type: "string" },
            { internalType: "bytes32", name: "email", type: "bytes32" },
            { internalType: "bytes32", name: "name", type: "bytes32" },
            { internalType: "bytes32", name: "lastName", type: "bytes32" }
          ],
          name: "addDocument",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0xf65f5d59"
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "admin", type: "address" }],
          name: "isAdmin",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
          signature: "0x24d7806c"
        },
        {
          constant: true,
          inputs: [
            { internalType: "address", name: "recipient", type: "address" }
          ],
          name: "isRecipient",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
          signature: "0x8c5143ea"
        },
        {
          constant: false,
          inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
          name: "setDocumentAccepted",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0xd08da82d"
        },
        {
          constant: false,
          inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
          name: "setDocumentRejected",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0xd193ebb9"
        },
        {
          constant: false,
          inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
          name: "setDocumentCertified",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0xcae1a50d"
        },
        {
          constant: false,
          inputs: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "address", name: "recipient", type: "address" }
          ],
          name: "setServiceFeeSent",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0x9fab2efb"
        },
        {
          constant: false,
          inputs: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "address", name: "recipient", type: "address" }
          ],
          name: "setUserCanceled",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0x3a92732f"
        },
        {
          constant: false,
          inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
          name: "setServiceFeeReceived",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0xc57ce74d"
        },
        {
          constant: false,
          inputs: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "address", name: "recipient", type: "address" }
          ],
          name: "setDocumentsReceived",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0x646dc813"
        },
        {
          constant: false,
          inputs: [
            { internalType: "uint256", name: "id", type: "uint256" },
            {
              internalType: "string",
              name: "certifiedDocsIpfsJson",
              type: "string"
            }
          ],
          name: "addCertifiedDocuments",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
          signature: "0x9e2d381f"
        }
      ]
    },
    address: {
      development: "0x711e48b1e1E093d9fa348EBCC2B321bABcDa6194",
      ropsten: "0x8c950f966f701D11400Be2f5194dc80CdeE0a84A",
      "ropsten-fork": "0x8c950f966f701D11400Be2f5194dc80CdeE0a84A",
      "rinkeby-fork": "0x4B764dce96FF73C22D1Bd5ecFE7dfC985BAa3dBb"
    }
  }
};
