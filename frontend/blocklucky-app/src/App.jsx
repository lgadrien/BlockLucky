import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import LotteryPage from './pages/LotteryPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTopButton from './components/ui/ScrollToTopButton'
import NetworkWarning from './components/NetworkWarning'
import { useScrollTop, useScrollAnimation } from './hooks/useScroll'

function App() {
  const { showButton, scrollToTop } = useScrollTop()
  useScrollAnimation()

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <NetworkWarning />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/profil" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/loterie" 
              element={
                <ProtectedRoute>
                  <LotteryPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton show={showButton} onClick={scrollToTop} />
      </div>
    </Router>
  )
}

export default App
