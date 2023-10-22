# KeyPoster & KeyPosterFactory Smart Contracts

## Introduction

This repository contains two Solidity smart contracts, `KeyPoster` and `KeyPosterFactory`, designed for managing Ethereum addresses, termed as "keys". These contracts are pretty simple however they are not audited and you should use at your own risk.

## Purpose of the Contracts

### KeyPoster

The `KeyPoster` contract stores EVM addresses along with the block number at the time of storage in a mapping. These keys are then stored in an array for easy retrieval. The contract allows for the following functionalities:

- Add a key (Owner only)
- Remove a key (Owner only)
- Check if a key exists
- Retrieve all keys

### KeyPosterFactory

The `KeyPosterFactory` contract serves as a factory to deploy new instances of the `KeyPoster` contract. This enables users to create their own individual `KeyPoster` contracts. The factory emits an event when a new `KeyPoster` contract is created.

## Installation

- Clone the repository

```bash
git clone https://github.com/boilerrat/KeyPoster.git
```

- Navigate to the project directory

```bash
cd KeyPoster
```

- Install dependencies

```bash
npm install
```

## Forking the Repository

To fork this repository, click the "Fork" button at the top-right corner of this GitHub page. This will create your own copy of the repository. You can then clone it, make changes, and submit Pull Requests to the original repository.

## Environment Configuration

Before running any scripts, it's essential to set up the environment variables. A .env.example file is included in the repository as a template. This file contains placeholders for the following keys:

- INFURA_URL: The endpoint URL for the Infura service.
- PRIVATE_KEY: Your Ethereum account's private key.
- ETHERSCAN_API_KEY: Your API key for Etherscan, required for contract verification.

To set up:

- Open the .env.example file in your text editor.
- Replace INSERT_YOUR_INFURA_ENDPOINT, INSERT_YOUR_PRIVATE_KEY, and INSERT_ETHERSCAN_API with your actual Infura URL, private key, and Etherscan API key respectively.
- Save the file.
- Rename the file from .env.example to .env.

    ⚠️ Security Note: Never commit the .env file to version control. It contains sensitive information. Make sure to add .env to your .gitignore file.

## Contract Usage

### Testing

Run tests using Hardhat:

```bash
npx hardhat test
```

### Deployment

```⚠️ Note: You do not need to do this if you you just want to store addressed in your contract. To do this, you only need to deploy a new clone of `KeyPoster` ```

Deploy the contracts to the Sepolia testnet:

```bash
npx hardhat run --network sepolia scripts/deployFactory.js
```

### Verification

Verify the contracts on Etherscan:

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

## Deployments

The `KeyPosterFactory` contract is currently deployed on Sepolia (adding more soon) to allow easy creation of individual `KeyPoster` contracts. You can deploy a new `KeyPoster` by calling the `createKeyPoster` function on the deployed `KeyPosterFactory` contract.

### Current Deployments

- **Mainnet Ethereum**: [0x59433f7195a6a5d87af923F4ae6079f2bD2b126E](https://etherscan.io/address/0x59433f7195a6a5d87af923F4ae6079f2bD2b126E)
- **Sepolia Testnet**: [0xae955Ad879A01281F8748C5c4aADC93Cba737FBf](https://sepolia.etherscan.io/address/0xae955Ad879A01281F8748C5c4aADC93Cba737FBf)
- **Goerli Testnet**: [0x6B61A6B1ACb42387a23383919b0aEc237101301d](https://goerli.etherscan.io/address/0x6B61A6B1ACb42387a23383919b0aEc237101301d)

---

- **Optimisim**: [0x29eD8B18203e74Ef5A6a5a4Bd12763bAEB1aEa15](https://optimistic.etherscan.io/address/0xE7b1f55F4f61Eb913276cDfb098a28884394FC72)
- **Optimisim Goerli**: [0x3d46E90a05146eb7f0b23F7fd2031a7ca7845C9d](https://goerli-optimism.etherscan.io/address/0x3d46E90a05146eb7f0b23F7fd2031a7ca7845C9d)
  
---

- **Arbitrum**: [0x525F5BA8C7AFd698fD44167FefbDc4B37EdFcC55](https://arbiscan.io/address/0x525F5BA8C7AFd698fD44167FefbDc4B37EdFcC55)
-  **Arbitrum Goerli**: [](https://goerli.arbiscan.io/address/0x21E1873EeE3dF9cB30FB9297A52dAa4F007Ca607)


More deployments will be added as they are deployed.

### How to Deploy a New KeyPoster Using Etherscan

1. Go to the Etherscan page of the deployed `KeyPosterFactory` contract. For Sepolia, [click here](https://sepolia.etherscan.io/address/0xfE1A213a0B7661829A06C8bc7d936B50b4460207).

2. Connect your Ethereum wallet by clicking the "Connect to Web3" button.

3. Navigate to the `Write Contract` section.

4. You'll see the `createKeyPoster` function listed. Click the "Write" button next to it.

5. Confirm the transaction in your wallet.

6. Once the transaction is confirmed, a `KeyPosterCreated` event will be emitted. You can view this in the `Logs` tab of the transaction details. This log contains the address of your newly created `KeyPoster` contract.

7. This should now create a new, already verified, clone of KeyPoster.

## Use KeyPoster in Your Own Contract

The `KeyPoster` contract can serve as a reusable component for storing Ethereum addresses in your own smart contracts. Here's how to integrate it:

### Install as a Dependency

First, install the `KeyPoster` contract as a dependency in your project:

```bash
npm install KeyPoster --save
```

### Importing and Inheritance

In your Solidity file, import the contract and inherit from it:

```solidity
pragma solidity ^0.8.21;

import "KeyPoster/contracts/KeyPoster.sol";

contract MyContract is KeyPoster {
  // Your contract code here
}
```

### Using KeyPoster Functions

After inheriting from `KeyPoster`, all its functions like `addKey`, `removeKey`, `isKey`, and `getAllKeys` become available in your contract. You can directly call these functions in your contract logic:

```solidity
function myFunction(address _address) public {
  // Add the address to the keys
  addKey(_address);

  // Check if the address is a key
  bool isAKey = isKey(_address);

  // Remove the address from the keys
  removeKey(_address);
}
```

### Example Use-Case

Suppose you have a contract that needs to maintain a list of authorized addresses for a specific operation. You can use the `KeyPoster` to efficiently manage this list without reinventing the wheel.

## Additional Information

Feel free to contribute to the project by opening Issues or submitting Pull Requests.

---
