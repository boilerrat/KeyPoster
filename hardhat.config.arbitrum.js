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
      url: "https://optimism-mainnet.infura.io/v3/4dc5e84fc7e8436a9c8db205e6907e5f",
      accounts: [process.env.PRIVATE_KEY]
    }  
  },
  etherscan: {
    apiKey: process.env.OP_ETHERSCAN_API_KEY
  }
};
