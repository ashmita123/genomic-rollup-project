// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract GenomicDataRollup {
    address public owner;
    bytes32 public merkleRoot;

    event OwnerChanged(address indexed oldOwner, address indexed newOwner);
    event MerkleRootUpdated(bytes32 oldRoot, bytes32 newRoot);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner");
        emit OwnerChanged(owner, newOwner);
        owner = newOwner;
    }

    function updateMerkleRoot(bytes32 _newRoot) external onlyOwner {
        emit MerkleRootUpdated(merkleRoot, _newRoot);
        merkleRoot = _newRoot;
    }

    function verifyMembership(
        bytes32 leaf,
        bytes32[] calldata proof
    ) external view returns (bool) {
        bytes32 computedHash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];

            if (computedHash < proofElement) {
                computedHash = keccak256(
                    abi.encodePacked(computedHash, proofElement)
                );
            } else {
                computedHash = keccak256(
                    abi.encodePacked(proofElement, computedHash)
                );
            }
        }

        return computedHash == merkleRoot;
    }
}
