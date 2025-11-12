import { ArrowUp } from 'lucide-react'

function ScrollToTopButton({ onClick, show }) {
  if (!show) return null

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 w-12 sm:w-14 h-12 sm:h-14 bg-linear-to-br from-blockchain-600 to-chance-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center group"
      aria-label="Retour en haut"
    >
      <ArrowUp className="w-5 sm:w-6 h-5 sm:h-6 group-hover:-translate-y-1 transition-transform" />
    </button>
  )
}

export default ScrollToTopButton
