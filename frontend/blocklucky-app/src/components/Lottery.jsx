import { useState } from 'react'
import { X, Ticket, Clock, Users } from 'lucide-react'

function Lottery({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-anthracite-900">Lotterie</h2>
          <button
            onClick={onClose}
            className="text-anthracite-400 hover:text-anthracite-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lottery Content - En développement */}
        <div className="space-y-6">
          {/* Main Lottery Info */}
          <div className="bg-gradient-to-br from-chance-50 to-blockchain-50 rounded-xl p-6 border-2 border-dashed border-chance-300 text-center">
            <Ticket className="w-12 h-12 text-chance-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-anthracite-900 mb-2">
              Lotterie Actuelle
            </h3>
            <p className="text-sm text-anthracite-600 mb-4">
              La fonctionnalité de lotterie est actuellement en développement.
            </p>
            <div className="inline-block px-4 py-2 bg-chance-100 text-chance-700 rounded-lg font-semibold text-sm">
              🚧 En développement
            </div>
          </div>

          {/* Features coming soon */}
          <div className="bg-anthracite-50 rounded-xl p-4 border border-anthracite-200 space-y-3">
            <h4 className="font-semibold text-anthracite-900 mb-3">
              Fonctionnalités à venir :
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-blockchain-600 mt-0.5 flex-shrink-0" />
                <span className="text-anthracite-700">Voir les participants actuels</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blockchain-600 mt-0.5 flex-shrink-0" />
                <span className="text-anthracite-700">Minuteur jusqu'au tirage</span>
              </div>
              <div className="flex items-start gap-3">
                <Ticket className="w-4 h-4 text-blockchain-600 mt-0.5 flex-shrink-0" />
                <span className="text-anthracite-700">Acheter des billets</span>
              </div>
            </div>
          </div>

          {/* Current status */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Status :</span> Les informations de la lotterie seront bientôt disponibles une fois le contrat intelligent complètement intégré.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-anthracite-100 hover:bg-anthracite-200 text-anthracite-900 font-semibold rounded-xl transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

export default Lottery
