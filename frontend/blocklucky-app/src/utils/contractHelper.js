import { ethers } from 'ethers'
import lotteryABI from '../contracts/lotteryABI.json'

// Configuration
const LOTTERY_ADDRESS = import.meta.env.VITE_LOTTERY_ADDRESS
const RPC_URL = import.meta.env.VITE_RPC_URL || 'http://127.0.0.1:8545'

/**
 * Classe helper pour interagir avec le smart contract Lottery
 */
class LotteryContractHelper {
  constructor() {
    this.contract = null
    this.provider = null
    this.signer = null
  }

  /**
   * Initialiser le contrat avec un provider (lecture seule)
   */
  initWithProvider(provider) {
    this.provider = provider
    this.contract = new ethers.Contract(LOTTERY_ADDRESS, lotteryABI, provider)
    console.log('✅ Contrat initialisé avec provider:', LOTTERY_ADDRESS)
    return this.contract
  }

  /**
   * Initialiser le contrat avec un signer (lecture + écriture)
   */
  initWithSigner(signer) {
    this.signer = signer
    this.contract = new ethers.Contract(LOTTERY_ADDRESS, lotteryABI, signer)
    console.log('✅ Contrat initialisé avec signer:', LOTTERY_ADDRESS)
    return this.contract
  }

  /**
   * Obtenir un provider RPC par défaut (sans MetaMask)
   */
  getDefaultProvider() {
    if (!this.provider) {
      this.provider = new ethers.JsonRpcProvider(RPC_URL)
      console.log('✅ Provider RPC créé:', RPC_URL)
    }
    return this.provider
  }

  /**
   * Vérifier si le contrat est initialisé
   */
  isInitialized() {
    return this.contract !== null
  }

  /**
   * Vérifier si un signer est disponible
   */
  hasSigner() {
    return this.signer !== null
  }

  /**
   * Obtenir l'adresse du contrat
   */
  getContractAddress() {
    return LOTTERY_ADDRESS
  }

  // ==========================================
  // FONCTIONS DE LECTURE (VIEW)
  // ==========================================

  /**
   * Obtenir le prix d'un ticket
   * @returns {Promise<string>} Prix en ETH
   */
  async getTicketPrice() {
    if (!this.contract) throw new Error('Contrat non initialisé')
    const price = await this.contract.ticketPrice()
    return ethers.formatEther(price)
  }

  /**
   * Obtenir l'état de la loterie
   * @returns {Promise<number>} 0 = OPEN, 1 = CLOSED
   */
  async getLotteryState() {
    if (!this.contract) throw new Error('Contrat non initialisé')
    const state = await this.contract.lotteryState()
    return Number(state)
  }

  /**
   * Obtenir le nombre de participants
   * @returns {Promise<number>}
   */
  async getParticipantsCount() {
    if (!this.contract) throw new Error('Contrat non initialisé')
    const count = await this.contract.participantsCount()
    return Number(count)
  }

  /**
   * Obtenir le total des mises (cagnotte)
   * @returns {Promise<string>} Montant en ETH
   */
  async getTotalBets() {
    if (!this.contract) throw new Error('Contrat non initialisé')
    const total = await this.contract.totalBets()
    return ethers.formatEther(total)
  }

  /**
   * Obtenir le temps restant (timestamp)
   * @returns {Promise<number>} Timestamp Unix
   */
  async getTimeLeft() {
    if (!this.contract) throw new Error('Contrat non initialisé')
    const time = await this.contract.timeLeft()
    return Number(time)
  }

  /**
   * Obtenir le nombre de tickets vendus
   * @returns {Promise<number>}
   */
  async getTicketsSold() {
    if (!this.contract) throw new Error('Contrat non initialisé')
    const sold = await this.contract.ticketsSold()
    return Number(sold)
  }

  /**
   * Obtenir l'ID de la loterie actuelle
   * @returns {Promise<number>}
   */
  async getCurrentLotteryId() {
    if (!this.contract) throw new Error('Contrat non initialisé')
    const id = await this.contract.currentLotteryId()
    return Number(id)
  }

  /**
   * Obtenir l'adresse du gagnant
   * @returns {Promise<string>} Adresse du gagnant
   */
  async getWinner() {
    if (!this.contract) throw new Error('Contrat non initialisé')
    return await this.contract.winner()
  }

  /**
   * Obtenir le nombre de tickets achetés par un utilisateur
   * @param {string} address Adresse de l'utilisateur
   * @returns {Promise<number>}
   */
  async getUserTickets(address) {
    if (!this.contract) throw new Error('Contrat non initialisé')
    const tickets = await this.contract.ticketBought(address)
    return Number(tickets)
  }

  /**
   * Obtenir la liste des participants
   * @returns {Promise<string[]>} Liste des adresses
   */
  async getParticipants() {
    if (!this.contract) throw new Error('Contrat non initialisé')
    return await this.contract.getParticipants()
  }

  /**
   * Obtenir l'historique complet des loteries
   * @returns {Promise<Array>} Historique formaté
   */
  async getLotteryHistory() {
    if (!this.contract) throw new Error('Contrat non initialisé')
    const history = await this.contract.getLotteryHistory()
    return history.map(item => ({
      id: Number(item.lotteryId),
      winner: item.winner,
      totalBets: ethers.formatEther(item.totalBets),
      participantsCount: Number(item.participantsCount),
      startTime: Number(item.startTime),
      endTime: Number(item.endTime),
      ticketsSold: Number(item.ticketsSold)
    }))
  }

  /**
   * Obtenir une loterie spécifique par son ID
   * @param {number} lotteryId ID de la loterie
   * @returns {Promise<Object>} Données de la loterie
   */
  async getLotteryById(lotteryId) {
    if (!this.contract) throw new Error('Contrat non initialisé')
    const lottery = await this.contract.getLotteryById(lotteryId)
    return {
      id: Number(lottery.lotteryId),
      winner: lottery.winner,
      totalBets: ethers.formatEther(lottery.totalBets),
      participantsCount: Number(lottery.participantsCount),
      startTime: Number(lottery.startTime),
      endTime: Number(lottery.endTime),
      ticketsSold: Number(lottery.ticketsSold)
    }
  }

  /**
   * Obtenir le nombre total de loteries passées
   * @returns {Promise<number>}
   */
  async getTotalLotteries() {
    if (!this.contract) throw new Error('Contrat non initialisé')
    const total = await this.contract.getTotalLotteries()
    return Number(total)
  }

  /**
   * Charger toutes les données de la loterie en une seule fois
   * @param {string} userAddress Adresse de l'utilisateur (optionnel)
   * @returns {Promise<Object>} Toutes les données
   */
  async loadAllData(userAddress = null) {
    if (!this.contract) throw new Error('Contrat non initialisé')

    console.log('🔄 Chargement de toutes les données du contrat...')

    try {
      const promises = [
        this.getTicketPrice(),
        this.getLotteryState(),
        this.getParticipantsCount(),
        this.getTotalBets(),
        this.getTimeLeft(),
        this.getTicketsSold(),
        this.getCurrentLotteryId(),
        this.getWinner(),
        this.getLotteryHistory()
      ]

      // Ajouter les tickets de l'utilisateur si une adresse est fournie
      if (userAddress) {
        promises.push(this.getUserTickets(userAddress))
      }

      const results = await Promise.all(promises)

      const data = {
        ticketPrice: results[0],
        lotteryState: results[1],
        participantsCount: results[2],
        totalBets: results[3],
        timeLeft: results[4],
        ticketsSold: results[5],
        currentLotteryId: results[6],
        winner: results[7],
        history: results[8],
        userTickets: userAddress ? results[9] : 0
      }

      console.log('✅ Données chargées:', data)
      return data
    } catch (error) {
      console.error('❌ Erreur lors du chargement des données:', error)
      throw error
    }
  }

  // ==========================================
  // FONCTIONS D'ÉCRITURE (TRANSACTIONS)
  // ==========================================

  /**
   * Acheter un ticket
   * @param {number} numberOfTickets Nombre de tickets à acheter
   * @returns {Promise<Object>} Résultat de la transaction
   */
  async buyTickets(numberOfTickets = 1) {
    if (!this.signer) {
      throw new Error('Signer non disponible - connectez votre wallet')
    }
    
    if (!this.contract) {
      throw new Error('Contrat non initialisé')
    }
    
    console.log(`🎫 Achat de ${numberOfTickets} ticket(s)...`)
    console.log('🔧 Contrat:', this.contract.target)
    console.log('🔧 Signer disponible:', this.signer ? 'Oui' : 'Non')

    try {
      // Vérifier l'état de la loterie
      const state = await this.contract.lotteryState()
      console.log('📊 État loterie:', state === 0n ? 'OUVERTE' : 'FERMÉE')
      
      if (state !== 0n) {
        throw new Error('Lottery is closed')
      }

      const ticketPrice = await this.contract.ticketPrice()
      console.log('💰 Prix par ticket:', ethers.formatEther(ticketPrice), 'ETH')
      
      const pricePerTicket = ticketPrice

      const receipts = []

      for (let i = 0; i < numberOfTickets; i++) {
        console.log(`📝 Envoi transaction ${i + 1}/${numberOfTickets}...`)
        
        const tx = await this.contract.buyTicket({
          value: pricePerTicket,
          gasLimit: 100000
        })

        console.log(`⏳ Transaction envoyée! Hash: ${tx.hash}`)
        console.log(`⏳ Attente de confirmation...`)
        
        const receipt = await tx.wait()
        console.log(`✅ Ticket ${i + 1} confirmé dans le bloc ${receipt.blockNumber}`)
        
        receipts.push(receipt)
      }

      console.log('🎉 Tous les tickets achetés avec succès!')
      return {
        success: true,
        receipts,
        numberOfTickets
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'achat:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Démarrer une loterie (owner seulement)
   * @param {number} duration Durée en secondes
   * @returns {Promise<Object>}
   */
  async startLottery(duration = 86400) {
    if (!this.signer) throw new Error('Signer non disponible')
    
    console.log(`🎰 Démarrage de la loterie pour ${duration} secondes...`)

    try {
      const tx = await this.contract.startLottery(duration)
      console.log(`📝 Transaction: ${tx.hash}`)
      
      const receipt = await tx.wait()
      console.log(`✅ Loterie démarrée dans le bloc ${receipt.blockNumber}`)

      return {
        success: true,
        receipt,
        duration
      }
    } catch (error) {
      console.error('❌ Erreur:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Fermer la loterie avec une seed (owner seulement)
   * @param {string} seed Seed aléatoire (optionnel)
   * @returns {Promise<Object>}
   */
  async closeLottery(seed = null) {
    if (!this.signer) throw new Error('Signer non disponible')
    
    // Générer une seed si non fournie
    if (!seed) {
      const randomBytes = ethers.randomBytes(32)
      seed = BigInt(ethers.hexlify(randomBytes)).toString()
    }

    console.log(`🎲 Fermeture de la loterie avec seed: ${seed}`)

    try {
      const tx = await this.contract.closeLottery(seed)
      console.log(`📝 Transaction: ${tx.hash}`)
      
      const receipt = await tx.wait()
      console.log(`✅ Loterie fermée dans le bloc ${receipt.blockNumber}`)

      const winner = await this.getWinner()
      console.log(`🏆 Gagnant: ${winner}`)

      return {
        success: true,
        receipt,
        winner,
        seed
      }
    } catch (error) {
      console.error('❌ Erreur:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Distribuer les gains (owner seulement)
   * @returns {Promise<Object>}
   */
  async distributeWinnings() {
    if (!this.signer) throw new Error('Signer non disponible')
    
    console.log('💰 Distribution des gains...')

    try {
      const tx = await this.contract.distributeWinnings()
      console.log(`📝 Transaction: ${tx.hash}`)
      
      const receipt = await tx.wait()
      console.log(`✅ Gains distribués dans le bloc ${receipt.blockNumber}`)

      return {
        success: true,
        receipt
      }
    } catch (error) {
      console.error('❌ Erreur:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Réinitialiser la loterie (owner seulement)
   * @returns {Promise<Object>}
   */
  async resetLottery() {
    if (!this.signer) throw new Error('Signer non disponible')
    
    console.log('🔄 Réinitialisation de la loterie...')

    try {
      const tx = await this.contract.resetLottery()
      console.log(`📝 Transaction: ${tx.hash}`)
      
      const receipt = await tx.wait()
      console.log(`✅ Loterie réinitialisée dans le bloc ${receipt.blockNumber}`)

      return {
        success: true,
        receipt
      }
    } catch (error) {
      console.error('❌ Erreur:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // ==========================================
  // UTILITAIRES
  // ==========================================

  /**
   * Écouter les événements du contrat
   * @param {string} eventName Nom de l'événement
   * @param {function} callback Fonction de callback
   */
  listenToEvent(eventName, callback) {
    if (!this.contract) throw new Error('Contrat non initialisé')
    
    console.log(`👂 Écoute de l'événement: ${eventName}`)
    this.contract.on(eventName, callback)
  }

  /**
   * Arrêter d'écouter les événements
   * @param {string} eventName Nom de l'événement
   */
  stopListeningToEvent(eventName) {
    if (!this.contract) throw new Error('Contrat non initialisé')
    
    console.log(`🔇 Arrêt de l'écoute: ${eventName}`)
    this.contract.removeAllListeners(eventName)
  }

  /**
   * Obtenir l'adresse du contrat
   * @returns {string}
   */
  getContractAddress() {
    return LOTTERY_ADDRESS
  }

  /**
   * Vérifier si une adresse est le winner
   * @param {string} address
   * @returns {Promise<boolean>}
   */
  async isWinner(address) {
    const winner = await this.getWinner()
    return winner.toLowerCase() === address.toLowerCase()
  }
}

// Créer une instance singleton
const lotteryHelper = new LotteryContractHelper()

export default lotteryHelper
