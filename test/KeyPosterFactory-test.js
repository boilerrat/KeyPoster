const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KeyPosterFactory Contract", function () {
  let KeyPosterFactory, keyPosterFactory, KeyPoster, keyPoster;
  let owner, addr1;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    KeyPoster = await ethers.getContractFactory("KeyPoster");
    KeyPosterFactory = await ethers.getContractFactory("KeyPosterFactory");
    [owner, addr1] = await ethers.getSigners();

    // Deploy the KeyPosterFactory contract
    keyPosterFactory = await KeyPosterFactory.deploy();
    await keyPosterFactory.deployed();
  });

  it("Should deploy KeyPoster", async function () {
    
    // Call createKeyPoster function
    const tx = await keyPosterFactory.createKeyPoster();

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    // Find the 'KeyPosterCreated' event emitted during the transaction
    const event = receipt.events?.find(e => e.event === 'KeyPosterCreated');
    expect(event).to.not.be.undefined;

    // Deployed KeyPoster contract address
    const deployedKeyPosterAddr = event.args.newKeyPoster;

    // Fetch deployed contract and verify
    keyPoster = KeyPoster.attach(deployedKeyPosterAddr);
    expect(await keyPoster.owner()).to.equal(owner.address);
  });
});
