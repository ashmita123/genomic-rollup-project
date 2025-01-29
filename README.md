# Genomic Rollup Demo

This project is a very simple **Solidity contract** simulating genomic data rollups using a **Merkle root**, along with a **front-end React** app to interact with it. It provides:

    - Update Merkle Root functionality which is only doable by the contract owner.
    - Verify Membership of a data leaf using a Merkle proof.
    - Transfer Ownership of the contract.

## How to run

#### 1. Navigate to the genomic-rollup-contract.
        ```npm install```

#### 2. Create .env in the genomic-rollup-contract folder. Here we will store

        ``` ALCHEMY_API_KEY=YOUR_ALCHEMY_KEY
            PRIVATE_KEY=YOUR_METAMASK_PRIVATE_KEY
        ```
#### 3. Deploy Smart Contract

        ``` npx hardhat compile
            npx hardhat run scripts/deploy.js --network sepolia
        ```
#### 4. Create an .env file in genomic-rollup-app folder. Here we will add

        ``` REACT_APP_CONTRACT_ADDRESS= YOUR_DEPLOYED_CONTRACT_ADDRESS
        ```
#### 5. From the genomic-rollup-contract execute following command to copy the abi.
        ``` cp artifacts/contracts/GenomicDataRollup.sol/GenomicDataRollup.json ../genomic—rollup-app/src/contracts/
        ```
#### 6. Navigate to the genomic-rollup-app and now we can start the react app.

        ``` npm install
            npm start
        ```
#### 7. Open your browser at http://localhost:3000 and interact with the app.

## Assumptions

Since genomic actual data are huge and should not be stored on-chain due to data privacy, we are assuming it is stored off-chain and we are only storing a Merkle root to reference the encrypted data on-chain. Proofs are used to verify the inclusion of specific data leaves without exposing the actual data.