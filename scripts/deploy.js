const hre = require("hardhat");

async function main() {
  const ticketPrice = hre.ethers.parseEther("0.01"); // 0.01 ETH par ticket

  console.log("Déploiement du contrat BlockLucky...");
  console.log("Prix du ticket:", hre.ethers.formatEther(ticketPrice), "ETH");

  const BlockLucky = await hre.ethers.getContractFactory("BlockLucky");
  const blockLucky = await BlockLucky.deploy(ticketPrice);

  await blockLucky.waitForDeployment();

  const address = await blockLucky.getAddress();
  console.log("BlockLucky déployé à l'adresse:", address);
  console.log("Owner:", await blockLucky.owner());
  console.log("Prix du ticket:", hre.ethers.formatEther(await blockLucky.ticketPrice()), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
