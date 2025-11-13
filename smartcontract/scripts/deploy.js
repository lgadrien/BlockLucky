// Script de déploiement pour les smart contracts
const hre = require("hardhat");

async function main() {
  console.log("🚀 Démarrage du déploiement sur la blockchain locale...\n");

  // Récupérer les comptes disponibles
  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const balance = await hre.ethers.provider.getBalance(deployerAddress);

  console.log("📋 Informations de déploiement:");
  console.log("   Compte déployeur:", deployerAddress);
  console.log("   Balance:", hre.ethers.formatEther(balance), "ETH\n");

  // ============================================
  // Déploiement du contrat Storage
  // ============================================
  console.log("📦 Déploiement du contrat Storage...");
  const Storage = await hre.ethers.getContractFactory("Storage");
  const storage = await Storage.deploy();
  await storage.waitForDeployment();
  const storageAddress = await storage.getAddress();

  console.log("✅ Storage déployé à l'adresse:", storageAddress);
  
  // Tester le contrat Storage
  console.log("\n🧪 Test du contrat Storage:");
  await storage.set(42);
  const value = await storage.get();
  console.log("   Valeur stockée:", value.toString(), "\n");

  // ============================================
  // Déploiement du contrat Lottery
  // ============================================
  console.log("📦 Déploiement du contrat Lottery...");
  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy();
  await lottery.waitForDeployment();
  const lotteryAddress = await lottery.getAddress();

  console.log("✅ Lottery déployé à l'adresse:", lotteryAddress);

  // Récupérer les informations de la loterie
  const ticketPrice = await lottery.ticketPrice();
  const lotteryState = await lottery.lotteryState();
  
  console.log("\n📊 Informations du contrat Lottery:");
  console.log("   Prix du ticket:", hre.ethers.formatEther(ticketPrice), "ETH");
  console.log("   État:", lotteryState === 0n ? "OPEN" : "CLOSED");

  // ============================================
  // Résumé du déploiement
  // ============================================
  console.log("\n" + "=".repeat(60));
  console.log("✅ DÉPLOIEMENT RÉUSSI");
  console.log("=".repeat(60));
  console.log("\n📝 Adresses des contrats:");
  console.log("   Storage:", storageAddress);
  console.log("   Lottery:", lotteryAddress);
  console.log("\n💡 Sauvegardez ces adresses pour interagir avec vos contrats!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Erreur lors du déploiement:");
    console.error(error);
    process.exit(1);
  });
