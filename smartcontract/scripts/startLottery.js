const { ethers } = require("hardhat");

/**
 * Script pour démarrer une loterie sur la blockchain locale
 */
async function main() {
    // Récupérer le déployeur (owner)
    const [deployer] = await ethers.getSigners();
    console.log("Démarrage de la loterie avec le compte:", deployer.address);

    // Lire l'adresse du contrat depuis le fichier JSON
    const fs = require('fs');
    const path = require('path');
    const addressesFile = path.join(__dirname, '..', 'deployed-addresses.json');
    
    if (!fs.existsSync(addressesFile)) {
        console.error("❌ Erreur: Fichier deployed-addresses.json non trouvé!");
        console.error("💡 Veuillez d'abord déployer le contrat avec: npx hardhat run scripts/deploy.js --network localhost");
        process.exit(1);
    }
    
    const addresses = JSON.parse(fs.readFileSync(addressesFile, 'utf8'));
    const LOTTERY_ADDRESS = addresses.Lottery;
    
    console.log("📍 Adresse du contrat Lottery:", LOTTERY_ADDRESS);

    // Récupérer le contrat Lottery
    const Lottery = await ethers.getContractAt("Lottery", LOTTERY_ADDRESS);

    // Vérifier l'état actuel
    const currentState = await Lottery.lotteryState();
    console.log("\n📊 État actuel de la loterie:", currentState === 0n ? "OUVERTE" : "FERMÉE");

    if (currentState === 0n) {
        console.error("❌ La loterie est déjà ouverte");
        process.exit(1);
    }

    // Démarrer la loterie avec une durée de 24 heures (86400 secondes)
    const duration = 86400; // 24 heures
    console.log(`\n⏳ Démarrage de la loterie pour ${duration / 3600} heures...`);
    
    const tx = await Lottery.startLottery(duration);
    console.log("📝 Transaction envoyée:", tx.hash);
    
    // Attendre la confirmation
    const receipt = await tx.wait();
    console.log("✅ Transaction confirmée dans le bloc:", receipt.blockNumber);

    // Récupérer les informations de la loterie
    const ticketPrice = await Lottery.ticketPrice();
    const timeLeft = await Lottery.timeLeft();
    const lotteryId = await Lottery.currentLotteryId();

    console.log("\n🎰 Loterie démarrée avec succès!");
    console.log("📋 Informations:");
    console.log("   ID de la loterie:", lotteryId.toString());
    console.log("   Prix du ticket:", ethers.formatEther(ticketPrice), "ETH");
    console.log("   Durée:", duration / 3600, "heures");
    console.log("   Fin prévue:", new Date(Number(timeLeft) * 1000).toLocaleString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
