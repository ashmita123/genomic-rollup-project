import { useState, useEffect } from "react";
import { ethers } from "ethers";
import GenomicDataRollup from "../contracts/GenomicDataRollup.json";

function useContract(contractAddress) {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadContract = async () => {
      try {
        if (!window.ethereum) {
          console.error("Metamask not detected");
          return;
        }
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const instance = new ethers.Contract(
          contractAddress,
          GenomicDataRollup.abi,
          signer
        );
        setContract(instance);
      } catch (error) {
        console.error("Error loading contract:", error);
      }
    };

    if (contractAddress) {
      loadContract();
    }
  }, [contractAddress]);

  return contract;
}

export default useContract;
