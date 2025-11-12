import { Sparkles } from 'lucide-react'
import { useWeb3 } from '../context/Web3Context'

function CTA() {
  const { connectWallet, isLoading } = useWeb3()

  const handleConnect = async () => {
    await connectWallet()
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blockchain-600 to-chance-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
          <Sparkles className="w-3 sm:w-4 h-3 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Offre de lancement</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4" style={{ fontFamily: 'Montserrat, sans-serif' }} data-scroll>
          Prêt à tenter votre chance ?
        </h2>
        
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto px-4" style={{ fontFamily: 'Inter, sans-serif' }} data-scroll>
          Rejoignez des milliers de joueurs et participez au prochain tirage dès maintenant
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4" data-scroll>
          <button 
            onClick={handleConnect}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-50 text-blockchain-600 text-sm sm:text-base font-bold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {isLoading ? 'Connexion...' : 'Commencer maintenant'}
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-white/80 text-sm sm:text-base px-4" data-scroll style={{ fontFamily: 'Inter, sans-serif' }}>
          <div className="flex items-center gap-2">
            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Sans engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100% sécurisé</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Support 24/7</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
