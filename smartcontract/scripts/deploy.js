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
  // Sauvegarder les adresses dans un fichier JSON
  const fs = require('fs');
  const path = require('path');
  const contractsDir = path.join(__dirname, '..');
  const addressesFile = path.join(contractsDir, 'deployed-addresses.json');
  
  const addresses = {
    Storage: storageAddress,
    Lottery: lotteryAddress,
    deployedAt: new Date().toISOString(),
    network: hre.network.name
  };
  
  fs.writeFileSync(addressesFile, JSON.stringify(addresses, null, 2));
  console.log("\n💾 Adresses sauvegardées dans:", addressesFile);

  // ============================================
  // Copier l'ABI vers le frontend
  // ============================================
  try {
    const artifactPath = path.join(__dirname, '..', 'artifacts', 'contracts', 'Lottery.sol', 'Lottery.json');
    const frontendABIPath = path.join(__dirname, '..', '..', 'frontend', 'blocklucky-app', 'src', 'contracts', 'lotteryABI.json');
    
    // Lire le fichier artifact
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    
    // Extraire uniquement l'ABI
    const abi = artifact.abi;
    
    // Créer le dossier contracts s'il n'existe pas
    const contractsFolder = path.dirname(frontendABIPath);
    if (!fs.existsSync(contractsFolder)) {
      fs.mkdirSync(contractsFolder, { recursive: true });
    }
    
    // Écrire l'ABI dans le frontend
    fs.writeFileSync(frontendABIPath, JSON.stringify(abi, null, 2));
    console.log("💾 ABI copié vers le frontend:", frontendABIPath);
  } catch (error) {
    console.warn("⚠️ Impossible de copier l'ABI:", error.message);
  }

  // Mettre à jour le fichier .env du frontend
  const frontendEnvPath = path.join(__dirname, '..', '..', 'frontend', 'blocklucky-app', '.env');
  
  try {
    let envContent = '';
    
    // Lire le fichier .env existant s'il existe
    if (fs.existsSync(frontendEnvPath)) {
      envContent = fs.readFileSync(frontendEnvPath, 'utf8');
    }
    
    // Mettre à jour ou ajouter VITE_LOTTERY_ADDRESS
    const lotteryAddressLine = `VITE_LOTTERY_ADDRESS=${lotteryAddress}`;
    
    if (envContent.includes('VITE_LOTTERY_ADDRESS=')) {
      // Remplacer l'ancienne adresse
      envContent = envContent.replace(/VITE_LOTTERY_ADDRESS=.*/g, lotteryAddressLine);
    } else {
      // Ajouter la nouvelle ligne
      envContent += `\n${lotteryAddressLine}`;
    }
    
    // S'assurer que RPC_URL et CHAIN_ID sont présents
    if (!envContent.includes('VITE_RPC_URL=')) {
      envContent = `VITE_RPC_URL=http://127.0.0.1:8545\n` + envContent;
    }
    if (!envContent.includes('VITE_CHAIN_ID=')) {
      envContent = envContent.replace(/VITE_RPC_URL=.*\n/, `$&VITE_CHAIN_ID=31337\n`);
    }
    
    // Nettoyer les lignes vides multiples
    envContent = envContent.replace(/\n\n+/g, '\n');
    
    fs.writeFileSync(frontendEnvPath, envContent.trim() + '\n');
    console.log("💾 Fichier .env du frontend mis à jour:", frontendEnvPath);
    console.log("   → VITE_LOTTERY_ADDRESS=" + lotteryAddress);
  } catch (error) {
    console.warn("⚠️ Impossible de mettre à jour le .env du frontend:", error.message);
  }

  console.log("\n" + "=".repeat(60));
  console.log("✅ DÉPLOIEMENT RÉUSSI");
  console.log("=".repeat(60));
  console.log("\n📝 Adresses des contrats:");
  console.log("   Storage:", storageAddress);
  console.log("   Lottery:", lotteryAddress);
  console.log("\n💡 Les adresses sont automatiquement sauvegardées!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Erreur lors du déploiement:");
    console.error(error);
    process.exit(1);
  });
