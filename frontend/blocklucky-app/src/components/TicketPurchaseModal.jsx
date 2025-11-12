import { useState, useEffect, useCallback } from 'react'
import { CheckCircle, X, Ticket, Coins, ArrowRight, AlertCircle } from 'lucide-react'

function TicketPurchaseModal({ isOpen, onClose, ticketCount, totalPrice, onConfirm }) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(null)

  // Prévenir le scroll quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Réinitialiser les états
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsSuccess(false)
        setIsConfirming(false)
        setError(null)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !isConfirming) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, isConfirming, onClose])

  const handleConfirmPurchase = useCallback(async () => {
    setIsConfirming(true)
    setError(null)
    try {
      await onConfirm?.()
      setIsSuccess(true)
      // Fermer automatiquement après 3 secondes
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    } catch (err) {
      console.error('Erreur lors de l\'achat:', err)
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.')
      setIsConfirming(false)
    }
  }, [onConfirm, onClose])

  const handleClickBackdrop = (e) => {
    if (e.target === e.currentTarget && !isConfirming) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleClickBackdrop}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden animate-in zoom-in duration-300 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-chance-500 to-blockchain-500 text-white p-6 flex items-center justify-between sticky top-0">
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Confirmation d'Achat
          </h2>
          <button
            onClick={onClose}
            disabled={isConfirming}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-6 text-center overflow-y-auto flex flex-col justify-center flex-1">
            {/* Success Icon */}
            <div className="mb-4 animate-bounce">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-anthracite-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Achat Réussi! 🎉
            </h3>
            
            <p className="text-sm text-anthracite-600 mb-4">
              Vos {ticketCount} billet{ticketCount > 1 ? 's' : ''} ont été achetés avec succès !
            </p>

            {/* Transaction Details */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Ticket className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">Détails de la transaction</span>
              </div>
              
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-anthracite-600">Nombre de billets:</span>
                  <span className="font-bold text-anthracite-900">{ticketCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-anthracite-600">Montant total:</span>
                  <span className="font-bold text-green-600">{(ticketCount * 0.01).toFixed(3)} ETH</span>
                </div>
                <div className="border-t border-green-200 pt-1 mt-1">
                  <div className="flex justify-between">
                    <span className="text-anthracite-600 font-medium">Statut:</span>
                    <span className="font-bold text-green-600 flex items-center gap-1">
                      <span>✓</span> Confirmé
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-anthracite-500 mb-3 animate-pulse">
              Fermeture automatique...
            </p>

            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 text-sm"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            {/* Loading Overlay */}
            {isConfirming && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50">
                <div className="text-center">
                  <div className="inline-block">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-transparent border-t-chance-500 border-r-blockchain-500 rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <p className="text-anthracite-700 font-semibold mt-4">Traitement en cours...</p>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1 flex flex-col">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 flex gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-red-900 mb-0.5">Erreur</p>
                    <p className="text-xs text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="bg-gradient-to-br from-chance-50 to-blockchain-50 rounded-lg p-4 border-2 border-chance-200">
                <h3 className="text-sm font-bold text-anthracite-900 mb-3">Récapitulatif</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-chance-100">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-chance-600" />
                      <span className="text-xs text-anthracite-700 font-medium">Billets</span>
                    </div>
                    <span className="font-bold text-sm text-anthracite-900">{ticketCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-white rounded border border-blockchain-100">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-blockchain-600" />
                      <span className="text-xs text-anthracite-700 font-medium">Total</span>
                    </div>
                    <span className="font-bold text-sm text-blockchain-600">{totalPrice} ETH</span>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 rounded p-2 border border-blue-200">
                  <p className="text-xs text-blue-700 font-medium mb-0.5">💰 Frais</p>
                  <p className="text-xs font-bold text-blue-900">Gratuit</p>
                </div>
                <div className="bg-purple-50 rounded p-2 border border-purple-200">
                  <p className="text-xs text-purple-700 font-medium mb-0.5">⚡ Délai</p>
                  <p className="text-xs font-bold text-purple-900">Immédiat</p>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-anthracite-50 rounded p-3 border border-anthracite-200">
                <p className="text-xs text-anthracite-600 leading-relaxed">
                  <span className="font-semibold">🔒 Sécurisé:</span> Via MetaMask, aucune donnée sensible stockée.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-gray-200 mt-auto">
                <button
                  onClick={handleConfirmPurchase}
                  disabled={isConfirming}
                  className="w-full px-4 py-3 bg-gradient-to-r from-chance-500 to-blockchain-500 hover:from-chance-600 hover:to-blockchain-600 disabled:from-chance-400 disabled:to-blockchain-400 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm active:scale-95"
                >
                  <Ticket className="w-4 h-4" />
                  Confirmer
                  {!isConfirming && <ArrowRight className="w-4 h-4" />}
                </button>

                <button
                  onClick={onClose}
                  disabled={isConfirming}
                  className="w-full px-4 py-2 bg-anthracite-100 hover:bg-anthracite-200 disabled:bg-anthracite-50 text-anthracite-900 font-semibold rounded-lg transition-colors disabled:cursor-not-allowed active:scale-95 text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TicketPurchaseModal
