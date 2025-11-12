import { useState, useEffect } from 'react'
import { X, Copy, ExternalLink, Wallet } from 'lucide-react'
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-anthracite-900">Profil</h2>
          <button
            onClick={onClose}
            className="text-anthracite-400 hover:text-anthracite-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="space-y-6">
          {/* Wallet Address */}
          <div className="bg-gradient-to-r from-blockchain-50 to-blockchain-100 rounded-xl p-4 border border-blockchain-200">
            <p className="text-sm text-anthracite-600 mb-3 font-medium">Adresse du Portefeuille</p>
            <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-blockchain-100">
              <span className="font-mono text-sm font-semibold text-anthracite-900 truncate">
                {formatAddress(account)}
              </span>
              <button
                onClick={handleCopyAddress}
                className="ml-2 p-1 text-blockchain-600 hover:text-blockchain-700 hover:bg-blockchain-50 rounded transition-colors"
                title="Copier l'adresse"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <p className="text-xs text-green-600 mt-2 font-medium">✓ Adresse copiée !</p>
            )}
          </div>

          {/* Balance */}
          <div className="bg-gradient-to-r from-chance-50 to-chance-100 rounded-xl p-4 border border-chance-200">
            <p className="text-sm text-anthracite-600 mb-3 font-medium">Solde</p>
            <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-chance-100">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-chance-600" />
                <span className="text-lg font-bold text-anthracite-900">
                  {loading ? 'Chargement...' : balance ? `${balance} ETH` : '0 ETH'}
                </span>
              </div>
            </div>
          </div>

          {/* Full Address */}
          <div className="bg-anthracite-50 rounded-xl p-4 border border-anthracite-200">
            <p className="text-xs text-anthracite-600 mb-2 font-medium">Adresse Complète</p>
            <p className="font-mono text-xs text-anthracite-800 break-all bg-white p-3 rounded border border-anthracite-100">
              {account}
            </p>
          </div>

          {/* View on Etherscan Button */}
          <button
            onClick={openEtherscan}
            className="w-full px-4 py-3 bg-blockchain-500 hover:bg-blockchain-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Voir sur Etherscan
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-anthracite-500 text-center">
            Vos données ne quittent jamais votre navigateur
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
