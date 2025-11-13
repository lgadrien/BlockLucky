import { ethers } from 'ethers';

/**
 * Génère une seed aléatoire sécurisée pour le smart contract
 * @returns {string} Seed au format uint256 (string)
 */
export function generateRandomSeed() {
    // Combiner plusieurs sources d'aléatoire
    const timestamp = Date.now();
    const randomValues = crypto.getRandomValues(new Uint8Array(32));
    const performanceNow = performance.now();
    const mathRandom = Math.random();
    
    // Convertir en bytes
    const combined = ethers.solidityPacked(
        ["uint256", "bytes32", "uint256", "uint256"],
        [
            timestamp,
            ethers.hexlify(randomValues),
            Math.floor(performanceNow * 1000000),
            Math.floor(mathRandom * Number.MAX_SAFE_INTEGER)
        ]
    );
    
    // Créer un hash pour obtenir un uint256
    const seed = ethers.keccak256(combined);
    
    // Convertir en BigInt puis en string pour l'envoyer au smart contract
    return BigInt(seed).toString();
}

/**
 * Ferme la loterie avec une seed générée côté frontend
 * @param {Object} contract - Instance du contrat Lottery
 * @param {Object} signer - Signer (wallet connecté)
 * @returns {Promise<Object>} Receipt de la transaction
 */
export async function closeLotteryWithSeed(contract, signer) {
    try {
        // Générer la seed
        const seed = generateRandomSeed();
        console.log("🎲 Seed générée:", seed);
        
        // Connecter le contrat avec le signer
        const contractWithSigner = contract.connect(signer);
        
        // Fermer la loterie avec la seed
        console.log("⏳ Fermeture de la loterie en cours...");
        const tx = await contractWithSigner.closeLottery(seed);
        console.log("📝 Transaction envoyée:", tx.hash);
        
        // Attendre la confirmation
        const receipt = await tx.wait();
        console.log("✅ Transaction confirmée dans le bloc:", receipt.blockNumber);
        
        // Récupérer le gagnant
        const winner = await contract.winner();
        console.log("🎉 Gagnant désigné:", winner);
        
        return {
            success: true,
            receipt,
            winner,
            seed,
            txHash: tx.hash
        };
    } catch (error) {
        console.error("❌ Erreur lors de la fermeture de la loterie:", error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Exemple d'utilisation dans un composant React
 */
export async function exampleUsageInReact(provider, lotteryAddress) {
    // Récupérer le signer
    const signer = await provider.getSigner();
    
    // Charger le contrat (ABI à adapter)
    const lotteryABI = [
        "function closeLottery(uint256 frontendSeed) public",
        "function winner() public view returns (address)",
        "function lotteryState() public view returns (uint8)"
    ];
    
    const lottery = new ethers.Contract(lotteryAddress, lotteryABI, provider);
    
    // Fermer la loterie avec seed
    const result = await closeLotteryWithSeed(lottery, signer);
    
    if (result.success) {
        console.log("✅ Loterie fermée avec succès!");
        console.log("Gagnant:", result.winner);
        console.log("Transaction:", result.txHash);
    } else {
        console.error("❌ Échec:", result.error);
    }
    
    return result;
}
