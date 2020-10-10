module.exports = {
  VERSION: '1.0.0',
  DocumentContract: {
    raw: {
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'approvalContract',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
          signature: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'ipfsFilesJson',
              type: 'string',
            },
          ],
          name: 'LogAddDocument',
          type: 'event',
          signature:
            '0xae8c0f902177ac5d76be1c2a5c1ba7f0dbd62e06d5710ec7c3aad2e11cfab556',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
          ],
          name: 'LogDocumentsReceived',
          type: 'event',
          signature:
            '0xaa41c19fa6656c7f9df41b7154149b978ce03c49397c175778ba2f6f678e5ac7',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
          ],
          name: 'LogDocumentsReleased',
          type: 'event',
          signature:
            '0x318ff958955faeeeff147ac870ac029b3b5084bc2157aa9aa7790721852549e2',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'id',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'idType',
              type: 'uint256',
            },
          ],
          name: 'LogIdentityAdded',
          type: 'event',
          signature:
            '0xb9054126adf0bf382c5ceb6af2f01b1a7d934d23f2fe6ac5106a575d596828ec',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'string',
              name: 'key',
              type: 'string',
            },
          ],
          name: 'LogLicenseCreated',
          type: 'event',
          signature:
            '0xfc3966531ddfc7ad6471ad015ece52c51c98e90489678b1bbf591d83bde5305d',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'string',
              name: 'apiKey',
              type: 'string',
            },
          ],
          name: 'LogLicenseEnabled',
          type: 'event',
          signature:
            '0x3689df2dacc9584137727ef65fb091dafebdcd0719897d70d6d406dc2fbb67c0',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'string',
              name: 'apiKey',
              type: 'string',
            },
          ],
          name: 'LogLicenseRenewed',
          type: 'event',
          signature:
            '0xdb1cc5669b3841d305deef2d9fa8290cdfa4a0234d67a25f0cfa7db0ebd1bbda',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
          ],
          name: 'LogRecipientAccepted',
          type: 'event',
          signature:
            '0x780af8cf256cef3b1d085e9db2a86ce54aa1126bbb5fbe2a97d7dbd35f2e4685',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
          ],
          name: 'LogRecipientCertified',
          type: 'event',
          signature:
            '0xcedfce38ab5063d3cbda63452ea5b15bf576691bd602bf4096f5bb25fbb59fc7',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
          ],
          name: 'LogRecipientRejected',
          type: 'event',
          signature:
            '0x5060c48e91f3e22b940e74f7cef991a14afd455397821489272482607ac1db70',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
          ],
          name: 'LogServiceFeeReceived',
          type: 'event',
          signature:
            '0x6538d44ebf5fe8e3845a164fe28e1da2ce9c1bbd954823d81071967a216e2dd4',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
          ],
          name: 'LogServiceFeeSent',
          type: 'event',
          signature:
            '0x8a3187e7f79bee85aef53ac12e18fa779d7cd954d0a1c6b3c673437f7d7ef99c',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
          ],
          name: 'LogUserCanceled',
          type: 'event',
          signature:
            '0xb0c0b236d78c292806bb60fa57f91c6966964e54ddcd53b7a821e5074d572bfc',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          name: 'RoleGranted',
          type: 'event',
          signature:
            '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          name: 'RoleRevoked',
          type: 'event',
          signature:
            '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b',
        },
        {
          inputs: [],
          name: 'ADMIN',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x2a0acc6a',
        },
        {
          inputs: [],
          name: 'DEFAULT_ADMIN_ROLE',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0xa217fddf',
        },
        {
          inputs: [],
          name: 'RECIPIENT',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x0d9019e1',
        },
        {
          inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          name: 'completedApprovals',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x17b25ecb',
        },
        {
          inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
          name: 'getRoleAdmin',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x248a9ca3',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'uint256', name: 'index', type: 'uint256' },
          ],
          name: 'getRoleMember',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x9010d07c',
        },
        {
          inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
          name: 'getRoleMemberCount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0xca15c873',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'grantRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x2f2ff15d',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'hasRole',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x91d14854',
        },
        {
          inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          name: 'idUserArray',
          outputs: [
            { internalType: 'address', name: 'id', type: 'address' },
            { internalType: 'uint256', name: 'idType', type: 'uint256' },
            {
              internalType: 'string',
              name: 'registeredApiKey',
              type: 'string',
            },
            { internalType: 'string', name: 'publicKey', type: 'string' },
            { internalType: 'bool', name: 'removed', type: 'bool' },
            { internalType: 'uint256', name: 'index', type: 'uint256' },
            { internalType: 'uint256', name: 'expires', type: 'uint256' },
          ],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0xacbdbd9e',
        },
        {
          inputs: [{ internalType: 'address', name: '', type: 'address' }],
          name: 'idUsers',
          outputs: [
            { internalType: 'address', name: 'id', type: 'address' },
            { internalType: 'uint256', name: 'idType', type: 'uint256' },
            {
              internalType: 'string',
              name: 'registeredApiKey',
              type: 'string',
            },
            { internalType: 'string', name: 'publicKey', type: 'string' },
            { internalType: 'bool', name: 'removed', type: 'bool' },
            { internalType: 'uint256', name: 'index', type: 'uint256' },
            { internalType: 'uint256', name: 'expires', type: 'uint256' },
          ],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x818b2062',
        },
        {
          inputs: [{ internalType: 'string', name: '', type: 'string' }],
          name: 'licenses',
          outputs: [
            { internalType: 'uint256', name: 'expires', type: 'uint256' },
            { internalType: 'string', name: 'description', type: 'string' },
            { internalType: 'bool', name: 'enabled', type: 'bool' },
            { internalType: 'bool', name: 'created', type: 'bool' },
            { internalType: 'string', name: 'did', type: 'string' },
          ],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x0540dafd',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x8da5cb5b',
        },
        {
          inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          name: 'recipientArray',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0xcff29424',
        },
        {
          inputs: [],
          name: 'recipientCount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x22eabb8e',
        },
        {
          inputs: [{ internalType: 'address', name: '', type: 'address' }],
          name: 'recipientDocumentCount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0xe76e8ca8',
        },
        {
          inputs: [
            { internalType: 'address', name: '', type: 'address' },
            { internalType: 'uint256', name: '', type: 'uint256' },
          ],
          name: 'recipientDocuments',
          outputs: [
            { internalType: 'string', name: 'fileIpfsJson', type: 'string' },
            {
              internalType: 'string',
              name: 'certifiedFilesIpfsJson',
              type: 'string',
            },
            { internalType: 'uint256', name: 'status', type: 'uint256' },
            { internalType: 'string', name: 'description', type: 'string' },
            { internalType: 'address', name: 'recipient', type: 'address' },
            { internalType: 'address', name: 'user', type: 'address' },
            { internalType: 'bytes32', name: 'email', type: 'bytes32' },
            { internalType: 'bytes32', name: 'name', type: 'bytes32' },
            { internalType: 'bytes32', name: 'lastName', type: 'bytes32' },
          ],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x2905122e',
        },
        {
          inputs: [{ internalType: 'address', name: '', type: 'address' }],
          name: 'recipientIndex',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0xc4a503c4',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'renounceRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x36568abe',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'revokeRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xd547741f',
        },
        {
          inputs: [],
          name: 'userCount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x07973ccf',
        },
        {
          inputs: [
            { internalType: 'address', name: 'user', type: 'address' },
            { internalType: 'uint8', name: 'aclType', type: 'uint8' },
          ],
          name: 'addACL',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xfe8e980b',
        },
        {
          inputs: [
            { internalType: 'address', name: 'user', type: 'address' },
            { internalType: 'uint8', name: 'aclType', type: 'uint8' },
          ],
          name: 'removeACL',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xd1e5dbc2',
        },
        {
          inputs: [
            { internalType: 'string', name: 'key', type: 'string' },
            { internalType: 'uint256', name: 'expires', type: 'uint256' },
            { internalType: 'string', name: 'description', type: 'string' },
          ],
          name: 'createLicense',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x52424da3',
        },
        {
          inputs: [
            { internalType: 'address', name: 'id', type: 'address' },
            { internalType: 'string', name: 'key', type: 'string' },
            { internalType: 'uint256', name: 'expires', type: 'uint256' },
          ],
          name: 'renewLicense',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x6fea761d',
        },
        {
          inputs: [
            { internalType: 'address', name: 'id', type: 'address' },
            { internalType: 'string', name: 'publicKey', type: 'string' },
            { internalType: 'uint256', name: 'idType', type: 'uint256' },
            { internalType: 'string', name: 'key', type: 'string' },
          ],
          name: 'addIdentity',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xac72071d',
        },
        {
          inputs: [{ internalType: 'address', name: 'id', type: 'address' }],
          name: 'removeIdentity',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xc1f2f1aa',
        },
        {
          inputs: [
            { internalType: 'address', name: 'recipient', type: 'address' },
            { internalType: 'string', name: 'fileIpfsJson', type: 'string' },
            { internalType: 'string', name: 'description', type: 'string' },
            { internalType: 'bytes32', name: 'email', type: 'bytes32' },
            { internalType: 'bytes32', name: 'name', type: 'bytes32' },
            { internalType: 'bytes32', name: 'lastName', type: 'bytes32' },
          ],
          name: 'addDocument',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xf65f5d59',
        },
        {
          inputs: [{ internalType: 'address', name: 'admin', type: 'address' }],
          name: 'isAdmin',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x24d7806c',
        },
        {
          inputs: [
            { internalType: 'address', name: 'recipient', type: 'address' },
          ],
          name: 'isRecipient',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x8c5143ea',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
          name: 'setDocumentAccepted',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xd08da82d',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
          name: 'setDocumentRejected',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xd193ebb9',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
          name: 'setDocumentCertified',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xcae1a50d',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'address', name: 'recipient', type: 'address' },
          ],
          name: 'setServiceFeeSent',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x9fab2efb',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'address', name: 'recipient', type: 'address' },
          ],
          name: 'setUserCanceled',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x3a92732f',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
          name: 'setServiceFeeReceived',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xc57ce74d',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'address', name: 'recipient', type: 'address' },
          ],
          name: 'setDocumentsReceived',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x646dc813',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            {
              internalType: 'string',
              name: 'certifiedDocsIpfsJson',
              type: 'string',
            },
          ],
          name: 'addCertifiedDocuments',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x9e2d381f',
        },
      ],
    },
    address: {
      development: '0xd4Eda5ABEe3F3Ce4bA44dcd244DDe0922e467905',
      test: '0xB76c04a933C234300E84aBe01EEb720a330d97cF',
    },
  },
  ApprovalsContract: {
    raw: {
      abi: [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor',
          signature: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
          ],
          name: 'LogAddApproval',
          type: 'event',
          signature:
            '0x61de8089da76c0c5634ac2626f3aee8545429a65a985d03eae4b60ca94915089',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
          ],
          name: 'LogRemoveApproval',
          type: 'event',
          signature:
            '0x8360f2836886d8f0e4e37847128c7754404bf85f21dc6f134e5a8595b95c4cfd',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
          ],
          name: 'LogSetApprovalOwnerStatus',
          type: 'event',
          signature:
            '0x2d2cf9aade20017068fdfcc5d853d460e3fdb090bc7154904e2f5d54d8b8fcd4',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          name: 'RoleGranted',
          type: 'event',
          signature:
            '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          name: 'RoleRevoked',
          type: 'event',
          signature:
            '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b',
        },
        {
          inputs: [],
          name: 'ADMIN',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x2a0acc6a',
        },
        {
          inputs: [],
          name: 'DEFAULT_ADMIN_ROLE',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0xa217fddf',
        },
        {
          inputs: [],
          name: 'EDITOR',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x9e8d31d5',
        },
        {
          inputs: [],
          name: 'approvalCount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x6884d0a6',
        },
        {
          inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          name: 'approvalSignerCount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x7ccd6a95',
        },
        {
          inputs: [
            { internalType: 'uint256', name: '', type: 'uint256' },
            { internalType: 'address', name: '', type: 'address' },
          ],
          name: 'approvals',
          outputs: [
            { internalType: 'address', name: 'signer', type: 'address' },
            { internalType: 'uint256', name: 'signedStatus', type: 'uint256' },
            { internalType: 'uint256', name: 'limitAmount', type: 'uint256' },
            { internalType: 'uint256', name: 'minSigners', type: 'uint256' },
          ],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0xab2850da',
        },
        {
          inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          name: 'closedApprovals',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x2849132b',
        },
        {
          inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
          name: 'getRoleAdmin',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x248a9ca3',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'uint256', name: 'index', type: 'uint256' },
          ],
          name: 'getRoleMember',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x9010d07c',
        },
        {
          inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
          name: 'getRoleMemberCount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0xca15c873',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'grantRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x2f2ff15d',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'hasRole',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x91d14854',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x8da5cb5b',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'renounceRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x36568abe',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'revokeRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xd547741f',
        },
        {
          inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          name: 'signerMapping',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x7b9249cb',
        },
        {
          inputs: [
            { internalType: 'address', name: 'sender', type: 'address' },
            { internalType: 'address[]', name: 'signers', type: 'address[]' },
            {
              internalType: 'uint256[]',
              name: 'limitAmount',
              type: 'uint256[]',
            },
            {
              internalType: 'uint256',
              name: 'minSignersCount',
              type: 'uint256',
            },
          ],
          name: 'add',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xf454bd50',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
          name: 'remove',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x4cc82215',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
          name: 'has',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0xcccf7a8e',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
          name: 'getSignersCount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0x28ced8df',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'address', name: 'sender', type: 'address' },
          ],
          name: 'canExec',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x038d9ad7',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'address', name: 'sender', type: 'address' },
            { internalType: 'bytes', name: 'data', type: 'bytes' },
          ],
          name: 'executeExtension',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x5e311b5e',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'address', name: 'sender', type: 'address' },
            {
              internalType: 'uint256',
              name: 'amountRequested',
              type: 'uint256',
            },
          ],
          name: 'setApproved',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x043a6700',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'address', name: 'sender', type: 'address' },
          ],
          name: 'canApproved',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          signature: '0xbe7d5ca7',
        },
        {
          inputs: [
            { internalType: 'address', name: 'user', type: 'address' },
            { internalType: 'uint8', name: 'aclType', type: 'uint8' },
          ],
          name: 'addACL',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xfe8e980b',
        },
        {
          inputs: [
            { internalType: 'address', name: 'user', type: 'address' },
            { internalType: 'uint8', name: 'aclType', type: 'uint8' },
          ],
          name: 'removeACL',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xd1e5dbc2',
        },
      ],
    },
    address: {
      development: '0x09a3939a0aaDE28d60b9Aabe38c952Fae1cECeF7',
      test: '0xD59aE267885fe046a5b9eb391444B61C145B7fC8',
    },
  },
};
