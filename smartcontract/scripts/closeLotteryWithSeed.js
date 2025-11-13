const { ethers } = require("hardhat");
const crypto = require("crypto");
const fs = require('fs');
const path = require('path');

/**
 * Script pour fermer la loterie avec une seed générée côté frontend
 * Cette seed améliore l'aléatoire du smart contract
 */
async function main() {
    // Récupérer le déployeur (owner)
    const [deployer] = await ethers.getSigners();
    console.log("Fermeture de la loterie avec le compte:", deployer.address);

    // Lire l'adresse du contrat depuis le fichier JSON
    const addressesFile = path.join(__dirname, '..', 'deployed-addresses.json');
    
    if (!fs.existsSync(addressesFile)) {
        console.error("❌ Erreur: Fichier deployed-addresses.json non trouvé!");
        console.error("💡 Veuillez d'abord déployer le contrat avec: npx hardhat run scripts/deploy.js --network localhost");
        process.exit(1);
    }
    
    const addresses = JSON.parse(fs.readFileSync(addressesFile, 'utf8'));
    const LOTTERY_ADDRESS = addresses.Lottery;
    
    console.log("📍 Adresse du contrat Lottery:", LOTTERY_ADDRESS);
    console.log("📅 Déployé le:", addresses.deployedAt);
    console.log("🌐 Réseau:", addresses.network);

    // Récupérer le contrat Lottery
    const Lottery = await ethers.getContractAt("Lottery", LOTTERY_ADDRESS);

    // Générer une seed aléatoire sécurisée côté frontend
    // Utilise crypto.randomBytes pour générer 32 bytes aléatoires
    const randomBytes = crypto.randomBytes(32);
    const frontendSeed = BigInt("0x" + randomBytes.toString("hex"));
    
    console.log("\n📊 Informations de la loterie avant fermeture:");
    const lotteryState = await Lottery.lotteryState();
    const participantsCount = await Lottery.participantsCount();
    const totalBets = await Lottery.totalBets();
    
    console.log("État de la loterie:", lotteryState === 0n ? "OUVERTE" : "FERMÉE");
    console.log("Nombre de participants:", participantsCount.toString());
    console.log("Total des mises:", ethers.formatEther(totalBets), "ETH");

    // Vérifier que la loterie est ouverte
    if (lotteryState !== 0n) {
        console.error("❌ La loterie est déjà fermée");
        process.exit(1);
    }

    console.log("\n🎲 Génération de la seed aléatoire:");
    console.log("Seed (hex):", "0x" + randomBytes.toString("hex"));
    console.log("Seed (uint256):", frontendSeed.toString());

    // Fermer la loterie avec la seed
    console.log("\n⏳ Fermeture de la loterie en cours...");
    const tx = await Lottery.closeLottery(frontendSeed);
    console.log("Transaction envoyée:", tx.hash);
    
    // Attendre la confirmation
    const receipt = await tx.wait();
    console.log("✅ Transaction confirmée dans le bloc:", receipt.blockNumber);

    // Récupérer le gagnant
    const winner = await Lottery.winner();
    console.log("\n🎉 Gagnant désigné:", winner);

    console.log("\n📊 Informations finales:");
    const finalState = await Lottery.lotteryState();
    console.log("État de la loterie:", finalState === 0n ? "OUVERTE" : "FERMÉE");
    console.log("Gagnant:", winner);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
