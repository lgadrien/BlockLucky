import { useEffect, useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { useWeb3 } from '../context/Web3Context'

function NetworkWarning() {
  const { chainId, isConnected, switchToHardhatNetwork } = useWeb3()
  const [showWarning, setShowWarning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Afficher l'avertissement si connecté mais pas sur le bon réseau
    if (isConnected && chainId !== 31337n) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }
  }, [chainId, isConnected])

  const handleSwitchNetwork = async () => {
    setIsLoading(true)
    const success = await switchToHardhatNetwork()
    setIsLoading(false)
    if (success) {
      setShowWarning(false)
    }
  }

  if (!showWarning) return null

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-yellow-900 mb-1">
              Réseau incorrect
            </h3>
            <p className="text-sm text-yellow-800 mb-3">
              Vous devez être sur le réseau <strong>Hardhat Local</strong> pour utiliser cette application.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleSwitchNetwork}
                disabled={isLoading}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? 'Changement...' : 'Changer de réseau'}
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="px-3 py-2 text-yellow-800 hover:bg-yellow-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkWarning
