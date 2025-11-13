import { useState, useCallback } from 'react'
import { Ticket, Clock, Users, Trophy, TrendingUp, AlertCircle, Coins, Gift } from 'lucide-react'
import TicketPurchaseModal from '../components/TicketPurchaseModal'

function LotteryPage() {
  const [ticketAmount, setTicketAmount] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [purchasedTickets, setPurchasedTickets] = useState(0)
  const [boughtCount, setBoughtCount] = useState(0) // Pour afficher le bon nombre au succès

  // Données de démonstration
  const currentPrize = "5.75"
  const participants = 127
  const ticketPrice = "0.01"
  const endTime = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  
  const formatTimeRemaining = useCallback(() => {
    const now = new Date()
    const diff = endTime - now
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${days}j ${hours}h ${minutes}m`
  }, [endTime])

  const handleBuyTickets = useCallback(() => {
    setBoughtCount(ticketAmount) // Sauvegarder le nombre de billets achetés
    setShowConfirmation(true)
  }, [ticketAmount])

  const handleConfirmPurchase = useCallback(async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setPurchasedTickets(prev => prev + ticketAmount)
        console.log(`Achat confirmé: ${ticketAmount} billet(s) pour ${(ticketPrice * ticketAmount).toFixed(3)} ETH`)
        setTicketAmount(1)
        resolve()
      }, 2000)
    })
  }, [ticketAmount, ticketPrice])

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="pb-20">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-chance-500 via-chance-600 to-blockchain-600 text-white pt-32 pb-32">
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
                      className="w-full px-6 py-4 bg-linear-to-r from-chance-500 to-blockchain-500 hover:from-chance-600 hover:to-blockchain-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
                    >
                      <Ticket className="w-6 h-6" />
                      Acheter {ticketAmount} Billet{ticketAmount > 1 ? 's' : ''}
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
              <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-xl font-bold text-anthracite-900 mb-6 flex items-center gap-3">
                  <Gift className="w-5 h-5 text-chance-500" />
                  Mes Billets
                </h2>
                
                {purchasedTickets > 0 ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-chance-100 rounded-full mb-4">
                      <Ticket className="w-8 h-8 text-chance-600" />
                    </div>
                    <p className="text-3xl font-bold text-anthracite-900 mb-2">{purchasedTickets}</p>
                    <p className="text-sm text-anthracite-600">Billet{purchasedTickets > 1 ? 's' : ''} acheté{purchasedTickets > 1 ? 's' : ''}</p>
                    <p className="text-xs text-chance-600 mt-3 font-medium">Bonne chance! 🍀</p>
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
                
                <div className="space-y-3">
                  <div className="bg-linear-to-r from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-anthracite-600">Loterie #12</span>
                      <Trophy className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="font-mono text-sm font-semibold text-anthracite-900 mb-1">0x742d...3a9f</p>
                    <p className="text-sm font-bold text-green-600">3.2 ETH</p>
                  </div>

                  <div className="bg-linear-to-r from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-anthracite-600">Loterie #11</span>
                      <Trophy className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="font-mono text-sm font-semibold text-anthracite-900 mb-1">0x8f1b...7c2e</p>
                    <p className="text-sm font-bold text-green-600">4.8 ETH</p>
                  </div>

                  <div className="bg-linear-to-r from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-anthracite-600">Loterie #10</span>
                      <Trophy className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="font-mono text-sm font-semibold text-anthracite-900 mb-1">0x3d5a...1f8b</p>
                    <p className="text-sm font-bold text-green-600">2.9 ETH</p>
                  </div>
                </div>
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
                    <span className="font-semibold text-anthracite-900">0%</span>
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
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation d'achat */}
      <TicketPurchaseModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        ticketCount={boughtCount}
        totalPrice={(ticketPrice * boughtCount).toFixed(3)}
        onConfirm={handleConfirmPurchase}
      />
    </div>
  )
}

export default LotteryPage
