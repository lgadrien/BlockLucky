import { ArrowRight, Play } from 'lucide-react'

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden bg-linear-to-br from-gray-50 via-white to-blockchain-50" id="hero">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-chance-200 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-blockchain-200 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* Left - Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8" data-scroll>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blockchain-100 text-blockchain-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="w-2 h-2 bg-blockchain-500 rounded-full animate-pulse"></span>
              Blockchain-powered lottery
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-anthracite-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              LA LOTERIE
              <span className="block text-blockchain-500">
                DÉCENTRALISÉE
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-anthracite-700 leading-relaxed max-w-xl mx-auto lg:mx-0" style={{ fontFamily: 'Inter, sans-serif' }}>
              Participez à une loterie 100% transparente et équitable, propulsée par la blockchain. 
              Aucun intermédiaire, une sécurité maximale, des gains instantanés.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blockchain-600 to-chance-600 hover:from-blockchain-700 hover:to-chance-700 text-white text-sm sm:text-base font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Commencer maintenant
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-50 text-anthracite-700 text-sm sm:text-base font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <Play className="w-4 sm:w-5 h-4 sm:h-5" />
                Voir la démo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start text-xs sm:text-sm text-anthracite-700 pt-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Sécurisé par Ethereum</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% transparent</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Gains instantanés</span>
              </div>
            </div>
          </div>

          {/* Right - Visual/Image */}
          <div className="relative mt-8 lg:mt-0" data-scroll>
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-linear-to-br from-blockchain-50 to-blockchain-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blockchain-200">
                    <div className="text-2xl sm:text-3xl font-bold text-blockchain-700 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>10K+</div>
                    <div className="text-xs sm:text-sm text-anthracite-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Joueurs actifs</div>
                  </div>
                  <div className="bg-linear-to-br from-chance-50 to-chance-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-chance-200">
                    <div className="text-2xl sm:text-3xl font-bold text-chance-700 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>$2M+</div>
                    <div className="text-xs sm:text-sm text-anthracite-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>En gains distribués</div>
                  </div>
                </div>

                {/* Visual representation */}
                <div className="aspect-video bg-linear-to-br from-blockchain-500 to-chance-500 rounded-xl sm:rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white opacity-10"></div>
                  <svg className="w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Features */}
                <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-anthracite-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 sm:w-4 h-3 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Smart contracts vérifiés et audités</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-anthracite-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 sm:w-4 h-3 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Décentralisé sur la blockchain Ethereum</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-anthracite-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 sm:w-4 h-3 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Gains automatiques et instantanés</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-chance-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                🎉 Nouveau tirage !
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
