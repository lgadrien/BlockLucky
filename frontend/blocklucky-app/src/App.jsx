import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import LotteryPage from './pages/LotteryPage'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe all elements with data-scroll attribute
    const elements = document.querySelectorAll('[data-scroll]')
    elements.forEach((el) => observer.observe(el))

    // Show/hide scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profil" element={<ProfilePage />} />
            <Route path="/lotterie" element={<LotteryPage />} />
          </Routes>
        </main>
        <Footer />

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 w-12 sm:w-14 h-12 sm:h-14 bg-linear-to-br from-blockchain-600 to-chance-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center group"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 sm:w-6 h-5 sm:h-6 group-hover:-translate-y-1 transition-transform" />
          </button>
        )}
      </div>
    </Router>
  )
}

export default App
