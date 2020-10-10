module.exports = {"VERSION":"1.0.0","ExtensionEventRegistry":{"raw":{"abi":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"LogAddExtEvent","type":"event","signature":"0xcc479190c541756bd832f14e89fecfd8578ccb61be7037f89583d78f11577764"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"address","name":"caller","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"add","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function","signature":"0xff03cf4f"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"has","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xcccf7a8e"},{"inputs":[{"internalType":"uint256","name":"extid","type":"uint256"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"edit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0x53b619a3"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"read","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"extContract","type":"address"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct ExtensionEventRegistry.ExtEventEntry","name":"","type":"tuple"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xed2e5a97"}]},"address":{"development":"0x456d2675A5bB2c5A5C98eB0150CecA3B906aE202","test":"0xDd1B1B5950b53F81e7505B0aD1b7ad12fCC33145","ropsten-fork":"0x5b20dF810d32184eF79cb2eFc7bE9dAeA7c4fb19","ropsten":"0x5b20dF810d32184eF79cb2eFc7bE9dAeA7c4fb19"}}}