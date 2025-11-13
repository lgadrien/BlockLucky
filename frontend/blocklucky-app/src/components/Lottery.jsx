import { useState, useEffect } from 'react'
import { Ticket, Clock, Users, Trophy, TrendingUp, AlertCircle, Coins, Gift } from 'lucide-react'
import { useWeb3 } from '../context/Web3Context'
import lotteryHelper from '../utils/contractHelper'

function Lottery({ isOpen, onClose }) {
  const { account, provider, signer } = useWeb3()
  const [ticketAmount, setTicketAmount] = useState(1)
  
  // États pour les données du contrat
  const [ticketPrice, setTicketPrice] = useState("0.0016")
  const [currentPrize, setCurrentPrize] = useState("0")
  const [participants, setParticipants] = useState(0)
  const [lotteryState, setLotteryState] = useState(1) // 0 = OPEN, 1 = CLOSED
  const [endTime, setEndTime] = useState(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000))
  const [userTickets, setUserTickets] = useState(0)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [lotteryHistory, setLotteryHistory] = useState([])
  
  // Initialiser le contrat
  useEffect(() => {
    if (provider) {
      lotteryHelper.initWithProvider(provider)
    }
    if (signer) {
      lotteryHelper.initWithSigner(signer)
    }
  }, [provider, signer])

  // Charger les données du contrat
  const loadLotteryData = async () => {
    if (!lotteryHelper.isInitialized()) {
      console.log("⚠️ Helper non initialisé")
      return
    }
    
    try {
      setIsLoadingData(true)
      
      // Utiliser la fonction loadAllData du helper
      const data = await lotteryHelper.loadAllData(account)
      
      setTicketPrice(data.ticketPrice)
      setLotteryState(data.lotteryState)
      setParticipants(data.participantsCount)
      setCurrentPrize(data.totalBets)
      setUserTickets(data.userTickets)
      
      // Calculer le temps restant
      if (data.timeLeft > 0) {
        setEndTime(new Date(data.timeLeft * 1000))
      }
      
      // Formater l'historique (prendre les 3 derniers)
      const formattedHistory = data.history.slice(-3).reverse()
      setLotteryHistory(formattedHistory)
      
    } catch (error) {
      console.error("❌ Erreur lors du chargement des données:", error)
    } finally {
      setIsLoadingData(false)
    }
  }

  // Charger les données au montage et toutes les 10 secondes
  useEffect(() => {
    if (lotteryHelper.isInitialized() && isOpen) {
      loadLotteryData()
      const interval = setInterval(loadLotteryData, 10000)
      return () => clearInterval(interval)
    }
  }, [provider, signer, account, isOpen])

  const formatTimeRemaining = () => {
    const now = new Date()
    const diff = endTime - now
    if (diff <= 0) return "Terminé"
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${days}j ${hours}h ${minutes}m`
  }

  const handleBuyTickets = async () => {
    // Vérifier que le wallet est connecté
    if (!account || !signer) {
      alert("⚠️ Veuillez connecter votre wallet d'abord !")
      return
    }
    
    // Vérifier que la loterie est ouverte
    if (lotteryState !== 0) {
      alert("⚠️ La loterie est fermée !")
      return
    }

    // Mode debug : afficher les infos de connexion
    console.log('🔍 Debug - État de connexion:')
    console.log('  Account:', account)
    console.log('  Provider:', provider ? 'Disponible' : 'Indisponible')
    console.log('  Signer:', signer ? 'Disponible' : 'Indisponible')
    console.log('  Signer type:', signer)
    console.log('  Helper initialisé:', lotteryHelper.isInitialized())
    console.log('  Helper a signer:', lotteryHelper.hasSigner())
    
    // TOUJOURS réinitialiser le signer avant d'acheter (force la connexion MetaMask)
    console.log("🔄 Réinitialisation du signer pour MetaMask...")
    if (provider && signer) {
      lotteryHelper.initWithProvider(provider)
      lotteryHelper.initWithSigner(signer)
      console.log("✅ Signer réinitialisé")
    } else {
      alert("❌ Erreur: Provider ou Signer manquant !")
      return
    }

    try {
      console.log(`🎫 Tentative d'achat de ${ticketAmount} ticket(s)...`)
      console.log(`💰 Prix unitaire: ${ticketPrice} ETH`)
      console.log(`💰 Prix total: ${(parseFloat(ticketPrice) * ticketAmount).toFixed(4)} ETH`)
      
      // Confirmer avec l'utilisateur
      const totalPrice = (parseFloat(ticketPrice) * ticketAmount).toFixed(4)
      const confirmed = window.confirm(
        `Acheter ${ticketAmount} ticket(s) pour ${totalPrice} ETH ?\n\n` +
        `MetaMask va s'ouvrir pour confirmer la transaction.`
      )
      
      if (!confirmed) {
        console.log("❌ Achat annulé par l'utilisateur")
        return
      }
      
      console.log("✅ Confirmation reçue, envoi de la transaction...")
      
      // Utiliser le helper pour acheter des tickets
      const result = await lotteryHelper.buyTickets(ticketAmount)
      
      console.log("📊 Résultat de la transaction:", result)
      
      if (result.success) {
        console.log("🎉 Achat réussi!")
        alert(`✅ ${ticketAmount} ticket(s) acheté(s) avec succès !`)
        
        // Recharger les données
        await loadLotteryData()
        
        // Réinitialiser le nombre de billets
        setTicketAmount(1)
      } else {
        throw new Error(result.error || "Échec de l'achat")
      }
      
    } catch (error) {
      console.error("❌ Erreur lors de l'achat:", error)
      
      let errorMessage = "Erreur lors de l'achat des tickets"
      
      if (error.message.includes("user rejected")) {
        errorMessage = "Transaction annulée"
      } else if (error.message.includes("insufficient funds")) {
        errorMessage = "Solde insuffisant"
      } else if (error.message.includes("Lottery is closed")) {
        errorMessage = "La loterie est fermée"
      }
      
      alert(`❌ ${errorMessage}`)
    }
  }



  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-50 z-40 overflow-y-auto">
      <div className="min-h-screen pb-20">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-chance-500 via-chance-600 to-blockchain-600 text-white pt-24 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full mb-6">
                <Ticket className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Loterie BlockLucky
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                Tentez votre chance et gagnez gros avec la blockchain
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Lottery Section - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Lottery Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-anthracite-900 flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-chance-500" />
                    Loterie en Cours
                  </h2>
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Active
                  </span>
                </div>

                {/* Prize Pool */}
                <div className="bg-linear-to-br from-chance-50 via-chance-100 to-blockchain-50 rounded-2xl p-8 mb-6 border-2 border-chance-300 text-center">
                  <p className="text-sm text-anthracite-600 mb-2 font-medium">Cagnotte Actuelle</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Coins className="w-12 h-12 text-chance-600" />
                    <p className="text-5xl font-bold text-anthracite-900">{currentPrize} ETH</p>
                  </div>
                  <p className="text-sm text-anthracite-500">≈ ${(currentPrize * 2000).toFixed(2)} USD</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blockchain-50 rounded-xl p-4 border border-blockchain-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-blockchain-600" />
                      <span className="text-sm text-anthracite-600 font-medium">Participants</span>
                    </div>
                    <p className="text-2xl font-bold text-anthracite-900">{participants}</p>
                  </div>
                  
                  <div className="bg-chance-50 rounded-xl p-4 border border-chance-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-chance-600" />
                      <span className="text-sm text-anthracite-600 font-medium">Temps restant</span>
                    </div>
                    <p className="text-xl font-bold text-anthracite-900">{formatTimeRemaining()}</p>
                  </div>
                </div>

                {/* Buy Tickets Section */}
                <div className="bg-anthracite-50 rounded-xl p-6 border border-anthracite-200">
                  <h3 className="text-lg font-bold text-anthracite-900 mb-4 flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-chance-500" />
                    Acheter des Billets
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-anthracite-600 font-medium mb-2 block">
                        Prix du billet: {ticketPrice} ETH
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setTicketAmount(Math.max(1, ticketAmount - 1))}
                          className="px-4 py-2 bg-anthracite-200 hover:bg-anthracite-300 text-anthracite-900 font-bold rounded-lg transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={ticketAmount}
                          onChange={(e) => setTicketAmount(Math.max(1, parseInt(e.target.value) || 1))}
                          className="flex-1 px-4 py-2 border-2 border-anthracite-300 rounded-lg text-center text-xl font-bold focus:outline-none focus:border-blockchain-500"
                        />
                        <button
                          onClick={() => setTicketAmount(Math.min(100, ticketAmount + 1))}
                          className="px-4 py-2 bg-anthracite-200 hover:bg-anthracite-300 text-anthracite-900 font-bold rounded-lg transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-anthracite-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-anthracite-600">Nombre de billets:</span>
                        <span className="font-bold text-anthracite-900">{ticketAmount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-anthracite-600">Total à payer:</span>
                        <span className="font-bold text-xl text-chance-600">{(ticketPrice * ticketAmount).toFixed(3)} ETH</span>
                      </div>
                    </div>

                    <button
                      onClick={handleBuyTickets}
                      disabled={!account || lotteryState !== 0 || isLoadingData}
                      className="w-full px-6 py-4 bg-linear-to-r from-chance-500 to-blockchain-500 hover:from-chance-600 hover:to-blockchain-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Ticket className="w-6 h-6" />
                      {!account ? "Connectez votre wallet" : lotteryState !== 0 ? "Loterie fermée" : `Acheter ${ticketAmount} Billet${ticketAmount > 1 ? 's' : ''}`}
                    </button>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-anthracite-900 mb-6 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-blockchain-500" />
                  Comment ça marche ?
                </h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-blockchain-100 text-blockchain-600 rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-anthracite-900 mb-1">Achetez vos billets</h3>
                      <p className="text-sm text-anthracite-600">Choisissez le nombre de billets que vous souhaitez acheter. Plus vous achetez, plus vous avez de chances de gagner !</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-blockchain-100 text-blockchain-600 rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-anthracite-900 mb-1">Attendez le tirage</h3>
                      <p className="text-sm text-anthracite-600">Le tirage a lieu automatiquement à la fin du compte à rebours. Tout est géré par le smart contract.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-blockchain-100 text-blockchain-600 rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-anthracite-900 mb-1">Récupérez vos gains</h3>
                      <p className="text-sm text-anthracite-600">Si vous gagnez, les fonds sont automatiquement transférés sur votre portefeuille. Transparent et sécurisé !</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats & Info - Right Column */}
            <div className="space-y-6">
              {/* Your Tickets */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-anthracite-900 mb-6 flex items-center gap-3">
                  <Gift className="w-5 h-5 text-chance-500" />
                  Mes Billets
                </h2>
                
                {userTickets > 0 ? (
                  <div className="space-y-3">
                    <div className="bg-linear-to-r from-chance-50 to-blockchain-50 rounded-lg p-4 border-2 border-chance-300">
                      <div className="text-center">
                        <Ticket className="w-12 h-12 text-chance-600 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-anthracite-900">{userTickets}</p>
                        <p className="text-sm text-anthracite-600">Billet{userTickets > 1 ? 's' : ''} actif{userTickets > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <p className="text-xs text-blue-800">
                        💡 Vos chances de gagner: <span className="font-bold">{participants > 0 ? ((userTickets / participants) * 100).toFixed(2) : 0}%</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Ticket className="w-16 h-16 text-anthracite-300 mx-auto mb-4" />
                    <p className="text-anthracite-600 mb-2">Aucun billet</p>
                    <p className="text-sm text-anthracite-400">Achetez des billets pour participer</p>
                  </div>
                )}
              </div>

              {/* Previous Winners */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-anthracite-900 mb-6 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-blockchain-500" />
                  Derniers Gagnants
                </h2>
                
                {lotteryHistory.length > 0 ? (
                  <div className="space-y-3">
                    {lotteryHistory.map((lottery) => (
                      <div key={lottery.id} className="bg-linear-to-r from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-anthracite-600">Loterie #{lottery.id}</span>
                          <Trophy className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="font-mono text-sm font-semibold text-anthracite-900 mb-1">
                          {lottery.winner.slice(0, 6)}...{lottery.winner.slice(-4)}
                        </p>
                        <p className="text-sm font-bold text-green-600">{parseFloat(lottery.totalBets).toFixed(4)} ETH</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="w-16 h-16 text-anthracite-300 mx-auto mb-4" />
                    <p className="text-sm text-anthracite-400">Aucun gagnant pour le moment</p>
                  </div>
                )}
              </div>

              {/* Lottery Info */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-anthracite-900 mb-6">Informations</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-anthracite-600">Prix du billet</span>
                    <span className="font-semibold text-anthracite-900">{ticketPrice} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-anthracite-600">Participants</span>
                    <span className="font-semibold text-anthracite-900">{participants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-anthracite-600">Vos chances</span>
                    <span className="font-semibold text-anthracite-900">
                      {participants > 0 && userTickets > 0 ? `${((userTickets / participants) * 100).toFixed(2)}%` : "0%"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-anthracite-600">État</span>
                    <span className="font-semibold text-anthracite-900">
                      {lotteryState === 0 ? "Ouverte" : "Fermée"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-anthracite-600">Fin du tirage</span>
                    <span className="font-semibold text-anthracite-900">{formatTimeRemaining()}</span>
                  </div>
                </div>
              </div>

              {/* Blockchain Info */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">🔗 Blockchain :</span> Cette lotterie est 100% décentralisée et sécurisée par Ethereum. Le gagnant est sélectionné de manière aléatoire et vérifiable.
                </p>
              </div>

              {/* Debug Panel - Dev Mode */}
              {account && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-300">
                  <details className="cursor-pointer">
                    <summary className="text-sm font-semibold text-gray-700 hover:text-gray-900">
                      🔧 Panneau de Debug
                    </summary>
                    <div className="mt-3 space-y-2 text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white p-2 rounded">
                          <span className="text-gray-600">Account:</span>
                          <p className="font-mono text-gray-900 truncate">{account}</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <span className="text-gray-600">Provider:</span>
                          <p className="font-semibold">{provider ? '✅ Disponible' : '❌ Indisponible'}</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <span className="text-gray-600">Signer:</span>
                          <p className="font-semibold">{signer ? '✅ Disponible' : '❌ Indisponible'}</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <span className="text-gray-600">Helper initialisé:</span>
                          <p className="font-semibold">{lotteryHelper.isInitialized() ? '✅ Oui' : '❌ Non'}</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <span className="text-gray-600">Helper a signer:</span>
                          <p className="font-semibold">{lotteryHelper.hasSigner() ? '✅ Oui' : '❌ Non'}</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <span className="text-gray-600">Contrat:</span>
                          <p className="font-mono text-gray-900 truncate text-xs">{lotteryHelper.getContractAddress()}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic mt-2">
                        💡 Tous les détails sont affichés dans la console (F12)
                      </p>
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lottery
