import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useWeb3 } from '../../context/Web3Context'

function Footer() {
  const currentYear = new Date().getFullYear()
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const { connectWallet, isLoading } = useWeb3()

  const handleConnect = async () => {
    await connectWallet()
  }

  const links = {
    product: [
      { name: 'Fonctionnalités', href: '#features' },
      { name: 'Comment ça marche', href: '#about' },
      { name: 'Sécurité', href: '#' },
      { name: 'FAQ', href: '#' },
    ],
    company: [
      { name: 'À propos', href: '#about' },
      { name: 'Blog', href: '#' },
      { name: 'Carrières', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Politique de confidentialité', href: '#' },
      { name: 'Conditions d\'utilisation', href: '#' },
      { name: 'Mentions légales', href: '#' },
      { name: 'Cookies', href: '#' },
    ],
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/lgadrien/BlockLucky' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@blocklucky.com' },
  ]

  return (
    <footer className="relative bg-white text-anthracite-700 overflow-hidden border-t border-gray-200" id="footer">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blockchain-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-chance-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Section - Only on homepage */}
        {isHomePage && (
          <div className="py-12 sm:py-16 border-b border-gray-200">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-anthracite-700 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Prêt à commencer ?
              </h3>
              <p className="text-base sm:text-lg text-anthracite-700 mb-6 sm:mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                Rejoignez BlockLucky dès aujourd'hui et participez à la révolution de la loterie décentralisée.
              </p>
              <button 
                onClick={handleConnect}
                disabled={isLoading}
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blockchain-600 to-chance-600 hover:from-blockchain-700 hover:to-chance-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {isLoading ? 'Connexion...' : 'Participer maintenant'}
                <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Links Section */}
        <div className="py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
            {/* Brand */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <img src="/LogoWebBlockLuckyremovebg.png" alt="BlockLucky Logo" className="h-12 sm:h-14 w-12 sm:w-14" />
                <span className="text-2xl sm:text-3xl font-bold uppercase tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <span className="text-blockchain-500">Block</span><span className="text-chance-500">Lucky</span>
                </span>
              </div>
              <p className="text-sm sm:text-base text-anthracite-700 mb-5 sm:mb-6 max-w-md leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                La première loterie décentralisée propulsée par la blockchain Ethereum. 
                Transparence totale, équité garantie et sécurité maximale pour tous les joueurs.
              </p>
              
              {/* Social Links */}
              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-anthracite-700 uppercase tracking-wider" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Rejoignez-nous
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.name} 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group w-10 sm:w-11 h-10 sm:h-11 bg-gray-100 hover:bg-linear-to-br hover:from-blockchain-500 hover:to-chance-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg" 
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5 text-anthracite-700 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <h3 className="text-anthracite-700 text-sm sm:text-base font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Produit</h3>
                <ul className="space-y-3">
                  {links.product.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href} 
                        className="group inline-flex items-center gap-1 text-sm text-anthracite-700 hover:text-blockchain-500 transition-colors duration-200" 
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-anthracite-700 text-sm sm:text-base font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Entreprise</h3>
                <ul className="space-y-3">
                  {links.company.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href} 
                        className="group inline-flex items-center gap-1 text-sm text-anthracite-700 hover:text-chance-500 transition-colors duration-200" 
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-anthracite-700 text-sm sm:text-base font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Légal</h3>
                <ul className="space-y-3">
                  {links.legal.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href} 
                        className="group inline-flex items-center gap-1 text-sm text-anthracite-700 hover:text-anthracite-900 transition-colors duration-200" 
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 sm:py-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              <p>© {currentYear} BlockLucky. Tous droits réservés.</p>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
              <p className="flex items-center gap-1.5">
                Propulsé par 
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <span className="text-blockchain-500">Ethereum</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-chance-500">Smart Contracts</span>
                </span>
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span>Crafted with</span>
              <span className="text-red-500 animate-pulse">❤</span>
              <span>by BlockLucky Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
