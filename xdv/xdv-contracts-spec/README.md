# XDV Contracts Specification
##  v0.1.0
#### By:  Rogelio  Morrell C. , 2020

## Introduction
**XDV Contracts** is a browser based decentralized compute specification based on off-chain and on-chain technologies including Swarm, Ethereum and additional Layer 2 technologies like Whisper.  

## Preface

Given a decentralized storage like Swarm, is possible to create and host durable storage content using Swarm Feed API. This gives up a 1:1 spec correlation with a smart contract, which is durable or immutable, content addressable (Ethereum address) and signed by an owner.

Now built on top of that `durable storage` API and add Decentralized Identity DID technology and thus, we get a DID based smart contract that runs on any browser based OS.

With `XDV contract`, the specification defines the following structure:

### Durable Storage

Must be stored in a Swarm / IPFS like content addressable decentralized network and must be resolvable to a immutable address using Swarm Feed or IPNS.

### WASM modules

Must be stored in durable storage and compiled and signed, signature process must be similar as signing an Ethereum contract.

### WASM module DID signature

Must be stored separately and signed by both the WASM module and owner of smart contract.

### OS Support packages

Must contain any OS Support eg Wasmer or Dart to integrate WASM smart contracts. The package itself must be signed separately with a signature for future verifications.

### Blockchain registrable

Once smart contract an XDV app are signed, they are registered in an XDV app registry. Only applies for apps that have both app + smart contracts.

### Deployment to clients

XDV apps must be DNS addressable, once it deploys to a browser, XDV app should boot and then smart contract. Peer connections with Whisper or PubSub or any other library like libp2p are optional.

## Security

* Both smart contract and issuer of the contract signed with their keypairs
* A smart contract can be used without being registered in the registry, but any standalone XDV app or pair of app and smart contracts requires to be registered. This because a resolver will compare signatures with onchain registry to verify the executable are trusted.
* Threat model should be low given WASM operates under a security sandbox which permits secure execution

## Use cases

* P2P computing
* Censorship resistance mobile or desktop apps
* Durable and free like beer mobile or desktop apps

## Diagram

![](https://static.swimlanes.io/9399cb043e2f9f6de4d05ccdb16a3fbe.png)

> Copyright, Rogelio Morrell, April 2020

