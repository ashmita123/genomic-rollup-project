const hre = require("hardhat");

async function main() {
  const GenomicDataRollup = await hre.ethers.getContractFactory("GenomicDataRollup");

  const contract = await GenomicDataRollup.deploy();

  await contract.deployed();

  console.log("GenomicDataRollup deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
