import { Link } from 'react-router-dom'
import { Home, AlertTriangle } from 'lucide-react'

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blockchain-500 to-chance-500 blur-3xl opacity-20 animate-pulse"></div>
            <AlertTriangle className="relative w-32 h-32 text-chance-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Error Code */}
        <h1 
          className="text-8xl sm:text-9xl font-bold mb-4 bg-gradient-to-r from-blockchain-600 to-chance-600 bg-clip-text text-transparent"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          404
        </h1>

        {/* Error Message */}
        <h2 
          className="text-2xl sm:text-3xl font-bold text-anthracite-700 mb-4"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Page non trouvée
        </h2>
        
        <p 
          className="text-base sm:text-lg text-anthracite-700 mb-8 max-w-md mx-auto"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blockchain-600 to-chance-600 hover:from-blockchain-700 hover:to-chance-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-anthracite-700 font-semibold rounded-xl transition-all duration-200 border-2 border-gray-200 hover:border-gray-300"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Page précédente
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
          <p>Code d'erreur: 404 - Page introuvable</p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
