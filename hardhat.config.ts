import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-truffle5";

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      accounts: [
        {
          balance: '1000000000000000000000',
          privateKey: `0x77b78d5fee6aa1a3ae163a048b885cefe457b1ca50d20891637e24f9f86f6e5d`
        },
      ]
    },
    mumbai: {
      url: 'http://localhost:8545/',
      accounts: [
        `0x77b78d5fee6aa1a3ae163a048b885cefe457b1ca50d20891637e24f9f86f6e5d`,
      ]
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [
        `0x77b78d5fee6aa1a3ae163a048b885cefe457b1ca50d20891637e24f9f86f6e5d`,
      ],
      chainId: 80001,
    }
  },
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: 'SGYWBESN2STKPVEV9IDQ63WRWG3ZIRJ2T2'
  }
};

export default config;
