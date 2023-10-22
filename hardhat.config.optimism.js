// hardhat.config.optimism.js
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.21",
  networks: {
    opgoerli: {
      url: process.env.INFURA_URL_OPGO,
      accounts: [process.env.PRIVATE_KEY]
    },
    optimism: {
      url: process.env.INFURA_URL_OPTIMISM,
      accounts: [process.env.PRIVATE_KEY]
    }  
  },
  etherscan: {
    apiKey: process.env.OP_ETHERSCAN_API_KEY
  }
};
