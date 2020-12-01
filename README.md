# Membership NFT

A simple Ethereum-based decentralized application (dapp) where you can create, obtain, and gift non-fungible membership tokens. Based on the [ERC-721](https://erc721.org) standard, these memberships are clear of user approvals making them nontransferable while also avoiding re-sale in secondary markets. Holding them in an ethereum wallet will grant access to the content enabled for members by the Membership contract owner in their front-end.

---

![Membership NFT](https://imgur.com/dIT8bYh.gif)


## Prerequisites

* **Node** - v12.x.x (preferrably v12.18.3 for long term support)
* **npm** - v6.x.x (preferrably v6.14.8)

## Running Locally

Step 1. Clone this repo to your local machine and install the dependencies as follows:

```bash
git clone https://github.com/tian0/membership-nft.git
cd membership-nft
npm install
```

A contract deployment instance is available on Ethereum's Rinkeby testnet, at the following address: 
`0x52B371514FcAb15D390d0B9dA5E6CF2D75Be3411`
If you wish to interact with this contract, skip to Step 4.

Step 2. To deploy locally, first install and run an Ethereum development testnet using [Ganache](https://www.trufflesuite.com/ganache):

```bash
npm install -g ganache-cli
ganache-cli
```

After ganache launches, run the following to compile, deploy the Membership contract:

```bash
truffle compile
truffle migrate
```

A total of 8 tests are provided in `test/membership.js` which make use of the contract functions. Run them using:

```bash
truffle test
```

Step 3. To deploy on Rinkeby, first you must delete the `client/contracts` folder. Secondly, create a file called `.env` which holds your own Infura Project ID, and a wallet mnemonic phrase as shown in the file provided `.env example`. Then deploy your Membership constract instance in the terminal, by running:

```bash
truffle compile
truffle migrate --network rinkeby
```

Step 4. Finally, install the client dependencies and serve the application in the development environment via:

```bash
cd client
npm install
npm run start
```

With Metamask installed and connected to Rinkeby, you are able to join the existing Membership contract provided [here](https://rinkeby.etherscan.io/address/0x52B371514FcAb15D390d0B9dA5E6CF2D75Be3411)

The member dashboard will allow you to see:
1. Membership Contract Address with it's corresponding Blockie
2. Your Ethereum address
3. Your ETH balance:
4. Your Membership tokenId
5. The total number of members
6. The Network ID (4 is Rinkeby)

You can also gift a membership to a new member by pasting their address and clicking the [Gift-Membership] button.

If you deploy your own Membership contract instance, the owner dashboard will allow you to see:
1. Membership Contract Address with it's corresponding Blockie
2. Your Ethereum address
3. Your ETH balance:
4. Your Membership tokenId
5. The total number of members

Owners can gift a new membership or remove a member by pasting an address and clicking the [Gift-Membership] or [Remove-Membership] buttons. The Contract Management Panel allows the owner to [Pause], [Unpause], and [Kill] the contract.

## Built With

* [Truffle](https://www.trufflesuite.com/boxes/react) - Truffle React Box
* [Solidity](https://solidity.readthedocs.io/en/v0.5.3/) - Ethereum's smart contract programming language
* [React.js](https://reactjs.org/) - Javascript framework used
* [web3.js](https://github.com/ethereum/web3.js/) - Javascript library used to interact with the Ethereum blockchain