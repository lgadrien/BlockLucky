import { useEffect, useState } from 'react'

/**
 * Hook pour gérer le bouton de retour en haut
 * @param {number} threshold - Position de scroll (en px) à partir de laquelle afficher le bouton
 * @returns {boolean} showButton - État d'affichage du bouton
 */
export const useScrollTop = (threshold = 500) => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { showButton, scrollToTop }
}

/**
 * Hook pour l'animation au scroll des éléments avec data-scroll
 */
export const useScrollAnimation = () => {
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

    const elements = document.querySelectorAll('[data-scroll]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
