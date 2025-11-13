// Script pour interagir avec les contrats déployés
const hre = require("hardhat");

async function main() {
  console.log("\n🔗 Interaction avec les smart contracts...\n");

  // ⚠️ IMPORTANT: Remplacez ces adresses par celles affichées lors du déploiement
  const STORAGE_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const LOTTERY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  // ============================================
  // Interaction avec Storage
  // ============================================
  console.log("📦 Contrat Storage");
  console.log("   Adresse:", STORAGE_ADDRESS, "\n");

  const Storage = await hre.ethers.getContractFactory("Storage");
  const storage = await Storage.attach(STORAGE_ADDRESS);

  // Lire la valeur actuelle
  let value = await storage.get();
  console.log("   📖 Valeur actuelle:", value.toString());

  // Modifier la valeur
  console.log("   ✍️  Modification de la valeur à 999...");
  const tx = await storage.set(999);
  await tx.wait();
  console.log("   ✅ Transaction confirmée!");

  // Lire la nouvelle valeur
  value = await storage.get();
  console.log("   📖 Nouvelle valeur:", value.toString());

  // ============================================
  // Interaction avec Lottery
  // ============================================
  console.log("\n📦 Contrat Lottery");
  console.log("   Adresse:", LOTTERY_ADDRESS, "\n");

  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.attach(LOTTERY_ADDRESS);

  // Récupérer les informations
  const ticketPrice = await lottery.ticketPrice();
  const participantsCount = await lottery.participantsCount();
  const totalBets = await lottery.totalBets();
  const lotteryState = await lottery.lotteryState();

  console.log("   📊 Informations:");
  console.log("   - Prix du ticket:", hre.ethers.formatEther(ticketPrice), "ETH");
  console.log("   - Participants:", participantsCount.toString());
  console.log("   - Total des mises:", hre.ethers.formatEther(totalBets), "ETH");
  console.log("   - État:", lotteryState === 0n ? "OPEN" : "CLOSED");

  console.log("\n✅ Interaction terminée!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Erreur:", error.message);
    process.exit(1);
  });
