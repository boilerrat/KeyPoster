// test/KeyPoster-test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KeyPoster Contract", function() {
  let KeyPoster, keyPoster, owner, addr1, addr2;

  beforeEach(async () => {
    KeyPoster = await ethers.getContractFactory("KeyPoster");
    [owner, addr1, addr2] = await ethers.getSigners();
    keyPoster = await KeyPoster.deploy(owner.address);
  });

  describe("Deployment", function() {
    it("Should set the correct owner", async function() {
      expect(await keyPoster.owner()).to.equal(owner.address);
    });
  });

  describe("Add Key", function() {
    it("Should allow owner to add a key", async function() {
      await keyPoster.connect(owner).addKey(addr1.address);
      expect(await keyPoster.isKey(addr1.address)).to.equal(true);
    });

    it("Should emit KeyAdded event when key is added", async function() {
      const addKeyTx = await keyPoster.connect(owner).addKey(addr1.address);
      await expect(addKeyTx)
        .to.emit(keyPoster, "KeyAdded")
        .withArgs(addr1.address, addKeyTx.blockNumber);
    });

    it("Should not allow non-owner to add a key", async function() {
      await expect(keyPoster.connect(addr1).addKey(addr2.address))
        .to.be.revertedWith("OwnableUnauthorizedAccount");
    });

    it("Should not allow adding the same key twice", async function() {
      await keyPoster.connect(owner).addKey(addr1.address);
      await expect(keyPoster.connect(owner).addKey(addr1.address))
        .to.be.revertedWith("Key already exists");
    });
  });

  describe("Remove Key", function() {
    it("Should allow owner to remove a key", async function() {
      await keyPoster.connect(owner).addKey(addr1.address);
      await keyPoster.connect(owner).removeKey(addr1.address);
      expect(await keyPoster.isKey(addr1.address)).to.equal(false);
    });

    it("Should emit KeyRemoved event when key is removed", async function() {
      await keyPoster.connect(owner).addKey(addr1.address);
      await expect(keyPoster.connect(owner).removeKey(addr1.address))
        .to.emit(keyPoster, "KeyRemoved")
        .withArgs(addr1.address);
    });

    it("Should not allow non-owner to remove a key", async function() {
      await keyPoster.connect(owner).addKey(addr1.address);
      await expect(keyPoster.connect(addr1).removeKey(addr1.address))
        .to.be.revertedWith("OwnableUnauthorizedAccount");
    });

    it("Should not allow removing a key that doesn't exist", async function() {
      await expect(keyPoster.connect(owner).removeKey(addr1.address))
        .to.be.revertedWith("Key does not exist");
    });
  });

  describe("Check Key", function() {
    it("Should return true for a valid key", async function() {
      await keyPoster.connect(owner).addKey(addr1.address);
      expect(await keyPoster.isKey(addr1.address)).to.equal(true);
    });

    it("Should return false for an invalid key", async function() {
      expect(await keyPoster.isKey(addr1.address)).to.equal(false);
    });
  });

  describe("Get All Keys", function() {
    it("Should return all added keys along with their block numbers", async function() {
      await keyPoster.connect(owner).addKey(addr1.address);
      await keyPoster.connect(owner).addKey(addr2.address);

      const keysWithBlockNumbers = await keyPoster.getAllKeys();
      const addresses = keysWithBlockNumbers.map(tuple => tuple[0]);
      expect(addresses).to.include.members([addr1.address, addr2.address]);
    });
  });
});
