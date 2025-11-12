import { ArrowRight } from 'lucide-react'

function About() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="order-2 lg:order-1" data-scroll>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-anthracite-700 mb-4 sm:mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              La loterie du futur est déjà là
            </h2>
            <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-anthracite-700" style={{ fontFamily: 'Inter, sans-serif' }}>
              <p>
                BlockLucky réinvente l'expérience de la loterie en combinant la transparence de la blockchain avec une interface moderne et intuitive.
              </p>
              <p>
                Grâce aux smart contracts, chaque tirage est 100% équitable et vérifiable. Plus besoin de faire confiance à un intermédiaire : la technologie garantit l'équité.
              </p>
              <p>
                Rejoignez des milliers de joueurs qui ont déjà fait le choix de la transparence et de l'innovation.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 sm:gap-6">
              <div className="flex-1 min-w-[120px] sm:min-w-[140px]">
                <div className="text-2xl sm:text-3xl font-bold text-blockchain-600 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>10,000+</div>
                <div className="text-sm sm:text-base text-anthracite-700" style={{ fontFamily: 'Inter, sans-serif' }}>Joueurs actifs</div>
              </div>
              <div className="flex-1 min-w-[120px] sm:min-w-[140px]">
                <div className="text-2xl sm:text-3xl font-bold text-blockchain-600 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>50,000+</div>
                <div className="text-sm sm:text-base text-anthracite-700" style={{ fontFamily: 'Inter, sans-serif' }}>Tirages effectués</div>
              </div>
              <div className="flex-1 min-w-[120px] sm:min-w-[140px]">
                <div className="text-2xl sm:text-3xl font-bold text-blockchain-600 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>99.9%</div>
                <div className="text-sm sm:text-base text-anthracite-700" style={{ fontFamily: 'Inter, sans-serif' }}>Disponibilité</div>
              </div>
            </div>

            <button className="mt-8 sm:mt-10 inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-anthracite-700 hover:bg-anthracite-900 text-white text-sm sm:text-base font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              En savoir plus
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right - Image/Visual */}
          <div className="order-1 lg:order-2" data-scroll>
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-linear-to-br from-blockchain-100 to-chance-100 rounded-2xl sm:rounded-3xl transform rotate-3"></div>
              
              {/* Main content card */}
              <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
                <div className="aspect-square bg-linear-to-br from-blockchain-500 to-chance-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <svg className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                
                {/* Stats badges */}
                <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="text-xs sm:text-sm text-anthracite-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Sécurité</div>
                    <div className="text-xl sm:text-2xl font-bold text-anthracite-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>100%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="text-xs sm:text-sm text-anthracite-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Transparence</div>
                    <div className="text-xl sm:text-2xl font-bold text-anthracite-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>Totale</div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-chance-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                ✨ Vérifié sur blockchain
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
