solc ./contracts/Documents/Documents.sol --abi --bin --optimize  -o ./build/ --allow-paths /home/rogelio/Code/micsa-contracts/ --overwrite
web3j solidity generate  -a build/Documents.abi -b build/Documents.bin  -o /home/rogelio/Code/micsa-contracts/java/src/main/java/com/blockchain/example/micsa -p com.blockchain.example.micsa
