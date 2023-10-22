// hardhat.config.optimism.js
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.21",
  networks: {
    arbgo: {
      url: process.env.INFURA_URL_ARBGO,
      accounts: [process.env.PRIVATE_KEY]
    },
    arbitrum: {
      url: process.env.INFURA_URL_ARBITRUM,
      accounts: [process.env.PRIVATE_KEY]
    }  
  },
  etherscan: {
    apiKey: process.env.ARB_ETHERSCAN_API_KEY
  }
};
