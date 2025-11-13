import { useState, useEffect } from 'react'
import { Copy, ExternalLink, Wallet, User, Award, History, TrendingUp } from 'lucide-react'
import { useWeb3 } from '../context/Web3Context'

function Profile({ isOpen, onClose }) {
  const { account, formatAddress, provider } = useWeb3()
  const [balance, setBalance] = useState(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBalance = async () => {
      if (!provider || !account) return
      
      try {
        setLoading(true)
        const balanceWei = await provider.getBalance(account)
        // Convertir de Wei à ETH
        const balanceEth = (balanceWei / 1e18).toFixed(4)
        setBalance(balanceEth)
      } catch (err) {
        console.error('Erreur lors de la récupération du solde:', err)
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) {
      fetchBalance()
    }
  }, [isOpen, provider, account])

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(account)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openEtherscan = () => {
    window.open(`https://etherscan.io/address/${account}`, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-50 z-40 overflow-y-auto">
      <div className="min-h-screen pb-20">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-blockchain-500 via-blockchain-600 to-chance-600 text-white pt-24 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full mb-6">
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Mon Profil
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                Gérez votre portefeuille et consultez votre activité
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wallet Info - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Wallet Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-anthracite-900 mb-6 flex items-center gap-3">
                  <Wallet className="w-6 h-6 text-blockchain-500" />
                  Informations du Portefeuille
                </h2>

                {/* Balance Section */}
                <div className="bg-linear-to-br from-chance-50 to-chance-100 rounded-xl p-6 mb-6 border border-chance-200">
                  <p className="text-sm text-anthracite-600 mb-3 font-medium">Solde Actuel</p>
                  <div className="flex items-center gap-3">
                    <Wallet className="w-8 h-8 text-chance-600" />
                    <div>
                      <p className="text-3xl font-bold text-anthracite-900">
                        {loading ? 'Chargement...' : balance ? `${balance} ETH` : '0 ETH'}
                      </p>
                      <p className="text-sm text-anthracite-500">Ethereum</p>
                    </div>
                  </div>
                </div>

                {/* Wallet Address */}
                <div className="bg-linear-to-r from-blockchain-50 to-blockchain-100 rounded-xl p-6 border border-blockchain-200">
                  <p className="text-sm text-anthracite-600 mb-3 font-medium">Adresse du Portefeuille</p>
                  <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-blockchain-100 mb-3">
                    <span className="font-mono text-sm font-semibold text-anthracite-900 truncate">
                      {formatAddress(account)}
                    </span>
                    <button
                      onClick={handleCopyAddress}
                      className="ml-2 p-2 text-blockchain-600 hover:text-blockchain-700 hover:bg-blockchain-50 rounded-lg transition-colors"
                      title="Copier l'adresse"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-600 font-medium">✓ Adresse copiée !</p>
                  )}
                  
                  {/* Full Address */}
                  <div className="mt-4">
                    <p className="text-xs text-anthracite-600 mb-2 font-medium">Adresse Complète</p>
                    <p className="font-mono text-xs text-anthracite-800 break-all bg-white p-3 rounded-lg border border-blockchain-100">
                      {account}
                    </p>
                  </div>
                </div>

                {/* View on Etherscan */}
                <button
                  onClick={openEtherscan}
                  className="w-full mt-6 px-6 py-3 bg-blockchain-500 hover:bg-blockchain-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Voir sur Etherscan
                </button>
              </div>

              {/* Transaction History */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-anthracite-900 mb-6 flex items-center gap-3">
                  <History className="w-6 h-6 text-blockchain-500" />
                  Historique des Transactions
                </h2>
                <div className="text-center py-12">
                  <History className="w-16 h-16 text-anthracite-300 mx-auto mb-4" />
                  <p className="text-anthracite-600 mb-2">Aucune transaction récente</p>
                  <p className="text-sm text-anthracite-400">Vos transactions apparaîtront ici</p>
                </div>
              </div>
            </div>

            {/* Stats - Right Column */}
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-anthracite-900 mb-6 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-blockchain-500" />
                  Statistiques
                </h2>
                
                <div className="space-y-4">
                  {/* Lotteries Participated */}
                  <div className="bg-linear-to-r from-blockchain-50 to-blockchain-100 rounded-xl p-4 border border-blockchain-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-anthracite-600 font-medium">Loteries jouées</span>
                      <Award className="w-4 h-4 text-blockchain-500" />
                    </div>
                    <p className="text-2xl font-bold text-anthracite-900">0</p>
                  </div>

                  {/* Total Spent */}
                  <div className="bg-linear-to-r from-chance-50 to-chance-100 rounded-xl p-4 border border-chance-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-anthracite-600 font-medium">Total dépensé</span>
                      <Wallet className="w-4 h-4 text-chance-500" />
                    </div>
                    <p className="text-2xl font-bold text-anthracite-900">0 ETH</p>
                  </div>

                  {/* Wins */}
                  <div className="bg-linear-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-anthracite-600 font-medium">Gains totaux</span>
                      <Award className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-anthracite-900">0 ETH</p>
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-anthracite-900 mb-6">Informations</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-anthracite-600">Réseau</span>
                    <span className="font-semibold text-anthracite-900">Ethereum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-anthracite-600">Type</span>
                    <span className="font-semibold text-anthracite-900">MetaMask</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-anthracite-600">Statut</span>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-green-600">Connecté</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">🔒 Sécurité :</span> Vos données ne quittent jamais votre navigateur et sont sécurisées par la blockchain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
