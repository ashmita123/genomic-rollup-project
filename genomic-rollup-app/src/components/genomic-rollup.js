import React, { useState } from "react";
import useContract from "../hooks/useContract";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

function GenomicRollup() {
  const contract = useContract(CONTRACT_ADDRESS);

  const [newOwner, setNewOwner] = useState("");
  const [newMerkleRoot, setNewMerkleRoot] = useState("");
  const [verifyLeaf, setVerifyLeaf] = useState("");
  const [verifyProof, setVerifyProof] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);

  const handleUpdateMerkleRoot = async (e) => {
    e.preventDefault();
    if (!contract) return;
    try {
      const tx = await contract.updateMerkleRoot(newMerkleRoot);
      await tx.wait();
      alert(`Merkle Root updated to: ${newMerkleRoot}`);
    } catch (error) {
      console.error(error);
      alert("Error updating Merkle Root");
    }
  };

  const handleTransferOwnership = async (e) => {
    e.preventDefault();
    if (!contract) return;
    try {
      const tx = await contract.transferOwnership(newOwner);
      await tx.wait();
      alert(`Ownership transferred to: ${newOwner}`);
    } catch (error) {
      console.error(error);
      alert("Error transferring ownership");
    }
  };

  const handleVerifyMembership = async (e) => {
    e.preventDefault();
    if (!contract) return;
    try {
      const proofArray = verifyProof
        .split(",")
        .map((item) => item.trim());

      const result = await contract.verifyMembership(verifyLeaf, proofArray);
      setVerifyResult(result);
    } catch (error) {
      console.error(error);
      alert("Error verifying membership");
    }
  };

  return (
    <div className="genomic-rollup-container">
      <h2>GenomicDataRollup - Contract Interactions</h2>

      {/* Update Merkle Root */}
      <div className="card">
        <h3>Update Merkle Root</h3>
        <form onSubmit={handleUpdateMerkleRoot}>
          <label>New Merkle Root (hex):</label>
          <input
            type="text"
            value={newMerkleRoot}
            onChange={(e) => setNewMerkleRoot(e.target.value)}
            placeholder="0x123abc..."
          />
          <button type="submit">Update Root</button>
        </form>
      </div>

      {/* Transfer Ownership */}
      <div className="card">
        <h3>Transfer Ownership</h3>
        <form onSubmit={handleTransferOwnership}>
          <label>New Owner Address:</label>
          <input
            type="text"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            placeholder="0xNewOwnerAddress"
          />
          <button type="submit">Transfer</button>
        </form>
      </div>

      {/* Verify Membership */}
      <div className="card">
        <h3>Verify Membership</h3>
        <form onSubmit={handleVerifyMembership}>
          <label>Leaf (hex):</label>
          <input
            type="text"
            value={verifyLeaf}
            onChange={(e) => setVerifyLeaf(e.target.value)}
            placeholder="0xLeaf"
          />

          <label>Proof (comma-separated hex):</label>
          <input
            type="text"
            value={verifyProof}
            onChange={(e) => setVerifyProof(e.target.value)}
            placeholder="0xabc...,0xdef..."
          />

          <button type="submit">Verify</button>
        </form>
        {verifyResult !== null && (
          <p>
            Membership Verification Result:{" "}
            <strong>{verifyResult ? "VALID" : "INVALID"}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default GenomicRollup;
