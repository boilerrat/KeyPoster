require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.21",
  networks: {
    sepolia: {
      url: process.env.INFURA_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    goerli: {
      url: process.env.INFURA_URL_GO,
      accounts: [process.env.PRIVATE_KEY]
    },
    opgoerli: {
      url: process.env.INFURA_URL_OPGO,
      accounts: [process.env.PRIVATE_KEY]
    }  
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY // General Etherscan API Key
  }
};
