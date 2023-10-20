// scripts/deployFactory.js

require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // We get the contract to deploy
  const KeyPosterFactory = await ethers.getContractFactory("KeyPosterFactory");
  const keyPosterFactory = await KeyPosterFactory.deploy();

  console.log("Deploying KeyPosterFactory...");
  await keyPosterFactory.deployed();
  console.log("KeyPosterFactory deployed to:", keyPosterFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
