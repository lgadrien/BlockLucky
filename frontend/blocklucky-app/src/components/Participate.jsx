function Participate() {
  return (
    <section id="loterie" className="py-16 px-4 bg-linear-to-br from-blockchain-50 via-white to-chance-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-chance-200 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blockchain-200 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left side - Info */}
          <div className="space-y-6" data-scroll data-scroll-class="animate-fade-in-left">
            <div>
              <div className="inline-block px-4 py-1 bg-linear-to-r from-blockchain-100 to-chance-100 text-blockchain-700 text-sm font-bold rounded-full mb-4">
                🎲 Comment participer
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-anthracite-900 uppercase mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Rejoignez la <span className="bg-clip-text text-transparent bg-linear-to-r from-blockchain-500 to-chance-500">Loterie</span>
              </h2>
              <p className="text-lg text-anthracite-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Trois étapes simples pour tenter votre chance
              </p>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="group flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blockchain-500">
                <div className="shrink-0 w-12 h-12 bg-linear-to-br from-blockchain-500 to-blockchain-600 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 transition-transform" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  1
                </div>
                <div>
                  <h4 className="font-bold text-blockchain-600 text-base mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Connectez votre wallet
                  </h4>
                  <p className="text-anthracite-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Utilisez MetaMask ou tout wallet Ethereum compatible
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-chance-500">
                <div className="shrink-0 w-12 h-12 bg-linear-to-br from-chance-500 to-chance-600 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 transition-transform" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  2
                </div>
                <div>
                  <h4 className="font-bold text-chance-600 text-base mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Achetez vos tickets
                  </h4>
                  <p className="text-anthracite-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Seulement 0.01 ETH par ticket, autant que vous voulez !
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blockchain-500">
                <div className="shrink-0 w-12 h-12 bg-linear-to-br from-blockchain-500 to-blockchain-600 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 transition-transform" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  3
                </div>
                <div>
                  <h4 className="font-bold text-blockchain-600 text-base mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Attendez le tirage
                  </h4>
                  <p className="text-anthracite-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Le gagnant est sélectionné de façon transparente et vérifiable
                  </p>
                </div>
              </div>
            </div>

            <button className="group w-full sm:w-auto px-10 py-4 bg-linear-to-r from-chance-500 to-chance-600 hover:from-chance-600 hover:to-chance-700 text-white font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-lg">
              <span className="flex items-center justify-center gap-2">
                🎰 Participer maintenant
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Right side - Stats card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-blockchain-200 relative overflow-hidden" data-scroll data-scroll-class="animate-fade-in-right">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-blockchain-200 to-chance-200 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl md:text-3xl font-black text-anthracite-900 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Loterie Actuelle
                </h3>
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  ACTIVE
                </div>
              </div>

              <div className="space-y-6">
                {/* Cagnotte */}
                <div className="text-center p-6 bg-linear-to-br from-blockchain-50 to-chance-50 rounded-2xl">
                  <div className="text-xs text-anthracite-600 mb-2 uppercase tracking-wide font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    💰 Cagnotte totale
                  </div>
                  <div className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-linear-to-r from-blockchain-600 to-chance-600 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    12.5 ETH
                  </div>
                  <div className="text-sm text-anthracite-600 font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    ≈ $25,000 USD
                  </div>
                </div>

                {/* Grid Participants & Prix */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Participants */}
                  <div className="text-center p-4 bg-anthracite-50 rounded-xl">
                    <div className="text-xs text-anthracite-600 mb-1 uppercase tracking-wide font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      👥 Joueurs
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-chance-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      247
                    </div>
                  </div>

                  {/* Prix du ticket */}
                  <div className="text-center p-4 bg-anthracite-50 rounded-xl">
                    <div className="text-xs text-anthracite-600 mb-1 uppercase tracking-wide font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      🎫 Ticket
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-chance-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      0.01
                    </div>
                  </div>
                </div>

                {/* Temps restant */}
                <div className="p-4 bg-anthracite-50 rounded-xl">
                  <div className="text-xs text-anthracite-600 mb-2 uppercase tracking-wide font-bold text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    ⏰ Temps restant
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-blockchain-600 text-center mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    2j 14h 32m
                  </div>
                  <div className="w-full bg-anthracite-200 rounded-full h-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-blockchain-500 via-chance-500 to-blockchain-500 h-3 rounded-full animate-pulse" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Participate
