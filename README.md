# real-estate-marketplace
Decentralized application (DAPP) that allows potential home owners to authenticate a property title in order to risk the possibility of title fraud.

This contract is currently deployed to the Rinkeby Ethereum test network:

> SolnSquareVerifier Address: [0x4249A815fe1a17139A49e0F2b3344C8B56965268](https://rinkeby.etherscan.io/address/0x4249A815fe1a17139A49e0F2b3344C8B56965268)

> Verifier Address:
[0x7e7FBDADc5B446133dc0616755b553903610Ac90](https://rinkeby.etherscan.io/address/0x7e7fbdadc5b446133dc0616755b553903610ac90)

OpenSea storefront address:

> OpenSea: [Geminorium-v3](https://rinkeby.opensea.io/assets/geminorium-v3)

## Getting Started
Instructions to get the Real Estate Marketplace appliation running on your local machine.

### Prerequisites
The Geminorium real estate marketplace application takes advantage of solidity smart contracts and the truffle framework.

In order to get the application running on your machine, you will need:

* [NodeJS](https://nodejs.org) Installed on your local machine.
* [Truffle](https://trufflesuite.com) installed on your local machine. This can be done using the `npm install` command.

### Installing
To run a local instance of the project, you must first install project files and dependencies. To get started doing this, use the `git clone` command to clone the repository to your local machine:

```
> git clone https://github.com/hicks8989/real-estate-marketplace
```

Next, change to the project root directory:

```
> cd real-estate-marketplace
```

Finally, install npm packages and compile solidity smart contracts:

```
> npm install
```

```
> cd eth-contracts
```

```
> truffle compile
```

### Configuration
In order to get your own instance of the Real Estate Marketplace DAPP running, certain configuration variables must be set:

* Create a secret file called `.secret` in the `eth-contracts` directory and insert the mnemonic for your metamask account.
* Set the `infuraKey` variable in the `truffle-config.js` file to your infura project key.

### Build
In order to build the project, make sure yor're in the `eth-contracts` directory. Next, use the `truffle develop` command to start a local truffle development environment:

```
> truffle develop
```

Next, use the `migrate --reset` command to run the migrations contract and create local instances of the Data and Application contract in the development environment:

```
truffle (develop)> migrate --reset
```

## Testing
In order to run tests for the project, you will need to:

* Make sure you are in the `eth-contracts` directory, then compile and migrate contracts with truffle terminal:

```
> truffle compile
```

```
> truffle develop
```

```
truffle(develop)> migrate --reset
```

* Run the `truffle test` command:

```
truffle(develop)> test
```

There are 18 test cases provided. Upon running the tests, you should get back all 18 passing:

![Test Screenshot](https://github.com/hicks8989/real-estate-marketplace/blob/dev/screenshots/test.JPG)

## Built With

* [Ethereum](https://ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts.
* [Truffle](https://trufflesuite.com) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.
* [NodeJS](https://nodejs.org) - Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.
* [Solidity](https://solidity.readthedocs.io/en/v0.6.10/) - Solidity is an object-oriented programming language for writing smart contracts.
* [Docker](https://docker.com) - Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.
* [Zokrates](https://zokrates.github.io/) - ZoKrates is a toolbox for zkSNARKs on Ethereum. It helps you use verifiable computation in your DApp, from the specification of your program in a high level language to generating proofs of computation to verifying those proofs in Solidity.