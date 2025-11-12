import { Shield, Zap, Globe, Lock, Users, TrendingUp } from 'lucide-react'

function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Sécurité Blockchain',
      description: 'Vos transactions sont protégées par la technologie blockchain décentralisée et immuable.'
    },
    {
      icon: Zap,
      title: 'Rapidité',
      description: 'Des transactions instantanées et des résultats vérifiables en temps réel.'
    },
    {
      icon: Globe,
      title: 'Accessible partout',
      description: 'Participez depuis n\'importe où dans le monde, 24h/24 et 7j/7.'
    },
    {
      icon: Lock,
      title: 'Transparence totale',
      description: 'Chaque tirage est vérifiable sur la blockchain. Aucune manipulation possible.'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Rejoignez une communauté mondiale de joueurs passionnés par la blockchain.'
    },
    {
      icon: TrendingUp,
      title: 'Gains équitables',
      description: 'Distribution automatique et équitable des gains via smart contracts.'
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16" data-scroll>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-anthracite-700 mb-3 sm:mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Pourquoi choisir BlockLucky ?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-anthracite-700 max-w-2xl mx-auto px-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Une expérience de loterie réinventée grâce à la blockchain
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              data-scroll
            >
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-linear-to-br from-blockchain-500 to-chance-500 rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <feature.icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-anthracite-700 mb-2 sm:mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-anthracite-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
