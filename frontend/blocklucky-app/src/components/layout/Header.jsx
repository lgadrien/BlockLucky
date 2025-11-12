import { useState, useEffect } from 'react'
import { Menu, X, Home, User, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import MetaMaskLogin from '../MetaMaskLogin'
import { useWeb3 } from '../../context/Web3Context'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isConnected } = useWeb3()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Fonctionnalités', href: '#features' },
    { name: 'À propos', href: '#about' },
    { name: 'Contact', href: '#footer' },
  ]

  // Filtrer les liens selon l'état de connexion
  const displayedLinks = isConnected 
    ? navLinks.filter(link => link.name === 'Accueil') 
    : navLinks

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
      scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg border-gray-200' : 'bg-white border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <img 
              src="/LogoWebBlockLuckyremovebg.png" 
              alt="BlockLucky Logo" 
              className="h-12 w-12 group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-2xl font-bold uppercase tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <span className="text-blockchain-500">Block</span>
              <span className="text-chance-500">Lucky</span>
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {isConnected ? (
              <>
                {/* Bouton Home */}
                <Link
                  to="/"
                  className="text-anthracite-700 hover:text-blockchain-500 font-medium transition-colors duration-200 relative group flex items-center gap-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Home className="w-4 h-4" />
                  <span>Accueil</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blockchain-500 group-hover:w-full transition-all duration-300"></span>
                </Link>

                {/* Bouton Profil */}
                <Link
                  to="/profil"
                  className="text-anthracite-700 hover:text-blockchain-500 font-medium transition-colors duration-200 relative group flex items-center gap-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <User className="w-4 h-4" />
                  <span>Profil</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blockchain-500 group-hover:w-full transition-all duration-300"></span>
                </Link>

                {/* Bouton Lotterie */}
                <Link
                  to="/lotterie"
                  className="text-anthracite-700 hover:text-blockchain-500 font-medium transition-colors duration-200 relative group flex items-center gap-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Ticket className="w-4 h-4" />
                  <span>Lotterie</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blockchain-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </>
            ) : (
              <>
                {displayedLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-anthracite-700 hover:text-blockchain-500 font-medium transition-colors duration-200 relative group"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blockchain-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </>
            )}
            <MetaMaskLogin />
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-anthracite-700 hover:text-blockchain-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              {isConnected ? (
                <>
                  {/* Bouton Home Mobile */}
                  <Link
                    to="/"
                    className="text-anthracite-700 hover:text-blockchain-500 font-medium transition-colors duration-200 py-2 flex items-center gap-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home className="w-4 h-4" />
                    <span>Accueil</span>
                  </Link>

                  {/* Bouton Profil Mobile */}
                  <Link
                    to="/profil"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-anthracite-700 hover:text-blockchain-500 font-medium transition-colors duration-200 py-2 flex items-center gap-2 text-left"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <User className="w-4 h-4" />
                    <span>Profil</span>
                  </Link>

                  {/* Bouton Lotterie Mobile */}
                  <Link
                    to="/lotterie"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-anthracite-700 hover:text-blockchain-500 font-medium transition-colors duration-200 py-2 flex items-center gap-2 text-left"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Lotterie</span>
                  </Link>
                </>
              ) : (
                <>
                  {displayedLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-anthracite-700 hover:text-blockchain-500 font-medium transition-colors duration-200 py-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </>
              )}
              <div className="mt-2">
                <MetaMaskLogin />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
