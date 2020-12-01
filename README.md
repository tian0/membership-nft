# Membership NFT

A simple Ethereum-based decentralized application (dapp) where you can create, obtain, and gift non-fungible membership tokens. Based on the [ERC-721](https://erc721.org) standard, these memberships are clear of user approvals making them nontransferable while also avoiding re-sale in secondary markets. Holding them in an ethereum wallet will grant access to the content enabled for members by the Membership contract owner in their front-end.

---

![Membership NFT](https://imgur.com/a/40EUMnv)


## Prerequisites

* **Node** - v12.x.x (preferrably v12.18.3 for long term support)
* **npm** - v6.x.x (preferrably v6.14.8)

## Running Locally

Clone this repo to your local machine and install the dependencies as follows:

```bash
git clone https://github.com/tian0/membership-nft.git
cd membership-nft
npm install
```

A contract deployment instance is available on Ethereum's Rinkeby testnet, at the following address: 
`0xb8D88dB5cf4E183904A35b8FE9eD2516c6c8D3F6`

To deploy your own Membership contract instance in the terminal, run:
```bash
truffle compile
truffle migrate --network rinkeby
```

To deploy locally, (globally) install and run an Ethereum development testnet using [Ganache](https://www.trufflesuite.com/ganache):

```bash
npm install -g ganache-cli
ganache-cli
```

After ganache launches, run the following to compile and deploy the Membership contract:

```bash
truffle compile
truffle migrate
```

Finally, install the client dependencies and serve the application in the development environment via:

```bash
cd client
npm install
npm run start
```

With Metamask installed and connected to Rinkeby, you should be able to join an existing Membership contract on Rinkeby provided at `0xb8D88dB5cf4E183904A35b8FE9eD2516c6c8D3F6`

The member dashboard will allow you to see:
1. Membership Contract Address
2. Your Ethereum address
3. Your ETH balance:
4. Your Membership tokenId
5. The total number of members
6. The Network ID (4 is Rinkeby)

You can gift a membership to a new member by pasting their address and clicking the [Gift-Membership] button.

If you deploy your own Membership contract instance, the owner dashboard will allow you to see:
The member dashboard will allow you to see:
1. Membership Contract Address
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