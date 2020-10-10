module.exports = {"VERSION":"1.0.0","Approvals":{"raw":{"abi":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"LogAddApproval","type":"event","signature":"0x61de8089da76c0c5634ac2626f3aee8545429a65a985d03eae4b60ca94915089"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"LogRemoveApproval","type":"event","signature":"0x8360f2836886d8f0e4e37847128c7754404bf85f21dc6f134e5a8595b95c4cfd"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"LogSetApprovalOwnerStatus","type":"event","signature":"0x2d2cf9aade20017068fdfcc5d853d460e3fdb090bc7154904e2f5d54d8b8fcd4"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event","signature":"0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event","signature":"0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b"},{"inputs":[],"name":"ADMIN","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x2a0acc6a"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xa217fddf"},{"inputs":[],"name":"EDITOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x9e8d31d5"},{"inputs":[],"name":"approvalCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x6884d0a6"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"approvalSignerCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x7ccd6a95"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"approvals","outputs":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"uint256","name":"signedStatus","type":"uint256"},{"internalType":"uint256","name":"limitAmount","type":"uint256"},{"internalType":"uint256","name":"minSigners","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xab2850da"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"closedApprovals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x2849132b"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x248a9ca3"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x9010d07c"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xca15c873"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x2f2ff15d"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x91d14854"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x8da5cb5b"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x36568abe"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xd547741f"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"signerMapping","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x7b9249cb"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address[]","name":"signers","type":"address[]"},{"internalType":"uint256[]","name":"limitAmount","type":"uint256[]"},{"internalType":"uint256","name":"minSignersCount","type":"uint256"}],"name":"add","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function","signature":"0xf454bd50"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"remove","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0x4cc82215"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"has","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xcccf7a8e"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getSignersCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x28ced8df"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"sender","type":"address"}],"name":"canExec","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0x038d9ad7"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"sender","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"executeExtension","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0x5e311b5e"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"amountRequested","type":"uint256"}],"name":"setApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0x043a6700"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"sender","type":"address"}],"name":"canApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xbe7d5ca7"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint8","name":"aclType","type":"uint8"}],"name":"addACL","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0xfe8e980b"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint8","name":"aclType","type":"uint8"}],"name":"removeACL","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0xd1e5dbc2"}]},"address":{"development":"0x48c62063E47173dD2645968d457a6B072E9695B8","test":"0x4da5e8aFC19c3a3006e934b400627b7B211020FA","ropsten-fork":"0x2c8d3Eb2730cd428F43C9502A2f936fAAE38B726","ropsten":"0x64adF10D6b9107270543ffEA077F0ebeefF20aCD"}}}