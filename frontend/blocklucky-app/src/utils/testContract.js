import { ethers } from 'ethers'

// Configuration
const RPC_URL = "http://127.0.0.1:8545"
const LOTTERY_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

// ABI minimal pour tester
const minimalABI = [
  "function ticketPrice() view returns (uint256)",
  "function lotteryState() view returns (uint8)",
  "function participantsCount() view returns (uint256)",
  "function totalBets() view returns (uint256)"
]

async function testConnection() {
  console.log("🔍 Test de connexion au smart contract...")
  console.log("RPC URL:", RPC_URL)
  console.log("Contract Address:", LOTTERY_ADDRESS)
  
  try {
    // Créer un provider
    const provider = new ethers.JsonRpcProvider(RPC_URL)
    console.log("✅ Provider créé")
    
    // Vérifier la connexion à la blockchain
    const network = await provider.getNetwork()
    console.log("✅ Connecté au réseau:", network.chainId.toString())
    
    // Créer l'instance du contrat
    const contract = new ethers.Contract(LOTTERY_ADDRESS, minimalABI, provider)
    console.log("✅ Contrat initialisé")
    
    // Tester les appels
    console.log("\n📊 Récupération des données...")
    
    const ticketPrice = await contract.ticketPrice()
    console.log("Prix du ticket:", ethers.formatEther(ticketPrice), "ETH")
    
    const lotteryState = await contract.lotteryState()
    console.log("État de la loterie:", lotteryState === 0n ? "OUVERTE" : "FERMÉE")
    
    const participants = await contract.participantsCount()
    console.log("Nombre de participants:", participants.toString())
    
    const totalBets = await contract.totalBets()
    console.log("Cagnotte totale:", ethers.formatEther(totalBets), "ETH")
    
    console.log("\n✅ Test réussi! Le contrat est accessible.")
    
  } catch (error) {
    console.error("❌ Erreur:", error.message)
    console.error(error)
  }
}

export { testConnection }
