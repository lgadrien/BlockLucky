import { useState } from 'react'
import { LogOut, Wallet, X, ExternalLink, Download } from 'lucide-react'
import { useWeb3 } from '../context/Web3Context'

function MetaMaskLogin() {
  const {
    account,
    isConnected,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    formatAddress,
    isMetaMaskInstalled
  } = useWeb3()

  const [showError, setShowError] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleConnect = async () => {
    setShowError(false)
    const success = await connectWallet()
    if (success) {
      setShowLoginModal(false)
    } else if (error) {
      setShowError(true)
      setTimeout(() => setShowError(false), 5000)
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
  }

  const openMetaMaskSite = () => {
    window.open('https://metamask.io', '_blank')
  }

  return (
    <>
      {isConnected ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="px-4 py-2.5 bg-blockchain-50 border border-blockchain-200 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 bg-blockchain-500 rounded-full animate-pulse"></div>
            <span className="text-blockchain-700 font-semibold text-sm sm:text-base">
              {formatAddress(account)}
            </span>
          </div>
          
          <button
            onClick={handleDisconnect}
            className="px-3 sm:px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            title="Déconnecter"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowLoginModal(true)}
          disabled={isLoading}
          className="px-4 sm:px-6 py-2.5 bg-chance-500 hover:bg-chance-600 disabled:bg-chance-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 transform disabled:cursor-not-allowed disabled:scale-100 text-sm sm:text-base flex items-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </span>
          <span className="sm:hidden">
            {isLoading ? '...' : 'Connexion'}
          </span>
        </button>
      )}

      {/* Modal de Login */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-anthracite-900">Connexion Web3</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-anthracite-400 hover:text-anthracite-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {isMetaMaskInstalled() ? (
              <>
                <p className="text-anthracite-600 mb-6">
                  Connectez votre portefeuille MetaMask pour accéder à BlockLucky.
                </p>

                {/* Message d'erreur dans le modal */}
                {showError && error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleConnect}
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-chance-500 hover:bg-chance-600 disabled:bg-chance-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⟳</span>
                      Vérification...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-5 h-5" />
                      Connecter MetaMask
                    </>
                  )}
                </button>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-anthracite-500 text-center">
                    Vérifiez que MetaMask est déverrouillé et actif
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-anthracite-600 mb-6">
                  MetaMask n'est pas installé. Veuillez installer l'extension pour continuer.
                </p>

                <button
                  onClick={openMetaMaskSite}
                  className="w-full px-6 py-3 bg-blockchain-500 hover:bg-blockchain-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Télécharger MetaMask
                </button>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <span className="text-lg">📖</span>
                    Comment installer ?
                  </h3>
                  <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                    <li>Cliquez sur "Télécharger MetaMask"</li>
                    <li>Sélectionnez votre navigateur</li>
                    <li>Cliquez sur "Ajouter à [navigateur]"</li>
                    <li>Confirmez et créez votre portefeuille</li>
                    <li>Revenez et connectez-vous</li>
                  </ol>
                </div>

                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-full mt-4 px-6 py-3 bg-anthracite-100 hover:bg-anthracite-200 text-anthracite-700 font-semibold rounded-xl transition-all duration-200"
                >
                  Fermer
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Message d'erreur en cas de fermeture du modal */}
      {showError && error && !showLoginModal && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg text-sm max-w-xs z-40">
          {error}
        </div>
      )}
    </>
  )
}

export default MetaMaskLogin
