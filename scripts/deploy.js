// scripts/deploy.js

const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const KeyPoster = await ethers.getContractFactory("KeyPoster");
  const keyPoster = await KeyPoster.deploy(deployer.address);

  console.log("KeyPoster contract address:", keyPoster.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
