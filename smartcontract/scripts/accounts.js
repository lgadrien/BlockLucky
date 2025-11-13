// Script pour afficher tous les comptes disponibles
const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  
  console.log("\n" + "=".repeat(80));
  console.log("📋 COMPTES DISPONIBLES SUR LA BLOCKCHAIN LOCALE");
  console.log("=".repeat(80) + "\n");
  
  for (let i = 0; i < accounts.length; i++) {
    const address = await accounts[i].getAddress();
    const balance = await hre.ethers.provider.getBalance(address);
    
    console.log(`Compte #${i}:`);
    console.log(`   Adresse: ${address}`);
    console.log(`   Balance: ${hre.ethers.formatEther(balance)} ETH`);
    console.log("");
  }
  
  console.log("=".repeat(80));
  console.log(`Total: ${accounts.length} comptes`);
  console.log("=".repeat(80) + "\n");
  
  console.log("💡 Pour importer un compte dans MetaMask:");
  console.log("   1. Copiez une clé privée depuis le terminal du nœud Hardhat");
  console.log("   2. MetaMask → Importer un compte → Clé privée");
  console.log("   3. Collez la clé et validez\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
