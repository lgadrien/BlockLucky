import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { ethers } from 'ethers'
import { setCookie, getCookie, deleteCookie } from '../utils/cookies'
import { formatAddress as formatAddressUtil } from '../utils/formatters'
import { DURATIONS, COOKIE_KEYS } from '../utils/constants'

const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [chainId, setChainId] = useState(null)
  const inactivityTimerRef = useRef(null)

  // Vérifier si MetaMask est installé
  const isMetaMaskInstalled = useCallback(() => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
  }, [])

  // Déconnecter le wallet
  const disconnectWallet = useCallback(() => {
    setAccount(null)
    setIsConnected(false)
    setProvider(null)
    setSigner(null)
    setError(null)
    setChainId(null)
    
    // Supprimer le cookie
    deleteCookie(COOKIE_KEYS.ACCOUNT)
    
    // Effacer le timer d'inactivité
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }
  }, [])

  // Réinitialiser le timer d'inactivité
  const resetInactivityTimer = useCallback(() => {
    // Effacer le timer existant
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }

    // Créer un nouveau timer
    inactivityTimerRef.current = setTimeout(() => {
      console.log('Déconnexion automatique due à l\'inactivité')
      disconnectWallet()
    }, DURATIONS.INACTIVITY_TIMEOUT)
  }, [disconnectWallet])

  // Fonction pour vérifier et changer de réseau
  const switchToHardhatNetwork = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask n\'est pas installé.')
      return false
    }

    try {
      // Essayer de changer vers le réseau Hardhat
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x7a69' }], // 31337 en hexadécimal
      })
      return true
    } catch (switchError) {
      // Si le réseau n'existe pas, l'ajouter
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x7a69', // 31337 en hexadécimal
                chainName: 'Hardhat Local',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['http://127.0.0.1:8545'],
                blockExplorerUrls: null
              }
            ]
          })
          return true
        } catch (addError) {
          console.error('Erreur lors de l\'ajout du réseau:', addError)
          setError('Impossible d\'ajouter le réseau Hardhat.')
          return false
        }
      }
      console.error('Erreur lors du changement de réseau:', switchError)
      setError('Impossible de changer de réseau.')
      return false
    }
  }, [isMetaMaskInstalled])

  // Connecter le wallet
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask n\'est pas installé. Veuillez installer MetaMask.')
      return false
    }

    try {
      setIsLoading(true)
      setError(null)

      // Vérifier et changer vers le réseau Hardhat si nécessaire
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' })
      console.log('Chain ID actuel:', currentChainId, '(attendu: 0x7a69)')
      
      if (currentChainId !== '0x7a69') {
        console.log('Changement vers le réseau Hardhat...')
        const switched = await switchToHardhatNetwork()
        if (!switched) {
          throw new Error('Impossible de se connecter au réseau Hardhat')
        }
      }

      // Demander l'accès aux comptes
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      // Créer un fournisseur ethers
      const ethersProvider = new ethers.BrowserProvider(window.ethereum)
      const ethersSigner = await ethersProvider.getSigner()
      const chainIdData = await ethersProvider.getNetwork()

      console.log('✅ Connecté au réseau:', chainIdData.chainId.toString())
      console.log('✅ Compte:', accounts[0])

      setProvider(ethersProvider)
      setSigner(ethersSigner)
      setAccount(accounts[0])
      setChainId(chainIdData.chainId)
      setIsConnected(true)

      // Sauvegarder dans les cookies
      setCookie(COOKIE_KEYS.ACCOUNT, accounts[0], DURATIONS.COOKIE_EXPIRY_DAYS)
      
      // Démarrer le timer d'inactivité
      resetInactivityTimer()

      return true
    } catch (err) {
      console.error('Erreur de connexion:', err)
      if (err.code === 4001) {
        setError('Vous avez annulé la connexion.')
      } else {
        setError('Erreur lors de la connexion à MetaMask.')
      }
      return false
    } finally {
      setIsLoading(false)
    }
  }, [isMetaMaskInstalled, resetInactivityTimer])

  // Formater l'adresse pour l'affichage
  const formatAddress = useCallback((address) => {
    return formatAddressUtil(address)
  }, [])

  // Écouter les changements de compte
  useEffect(() => {
    if (!isMetaMaskInstalled()) return

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet()
      } else if (accounts[0] !== account) {
        setAccount(accounts[0])
        setCookie(COOKIE_KEYS.ACCOUNT, accounts[0], DURATIONS.COOKIE_EXPIRY_DAYS)
      }
    }

    const handleChainChanged = (chainIdHex) => {
      setChainId(parseInt(chainIdHex, 16))
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [account, disconnectWallet, isMetaMaskInstalled])

  // Reconnexion automatique depuis les cookies au chargement
  useEffect(() => {
    const savedAccount = getCookie(COOKIE_KEYS.ACCOUNT)
    
    if (savedAccount && isMetaMaskInstalled() && !isConnected) {
      // Tenter de reconnecter automatiquement
      const autoConnect = async () => {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          
          if (accounts.length > 0 && accounts[0].toLowerCase() === savedAccount.toLowerCase()) {
            const ethersProvider = new ethers.BrowserProvider(window.ethereum)
            const ethersSigner = await ethersProvider.getSigner()
            const chainIdData = await ethersProvider.getNetwork()

            setProvider(ethersProvider)
            setSigner(ethersSigner)
            setAccount(accounts[0])
            setChainId(chainIdData.chainId)
            setIsConnected(true)
            
            // Démarrer le timer d'inactivité
            resetInactivityTimer()
          } else {
            // Le compte sauvegardé ne correspond pas, supprimer le cookie
            deleteCookie(COOKIE_KEYS.ACCOUNT)
          }
        } catch (err) {
          console.error('Erreur lors de la reconnexion automatique:', err)
          deleteCookie(COOKIE_KEYS.ACCOUNT)
        }
      }
      
      autoConnect()
    }
  }, [isMetaMaskInstalled, isConnected, resetInactivityTimer])

  // Écouter l'activité de l'utilisateur pour réinitialiser le timer
  useEffect(() => {
    if (!isConnected) return

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    const handleActivity = () => {
      resetInactivityTimer()
    }

    // Ajouter les écouteurs d'événements
    events.forEach(event => {
      document.addEventListener(event, handleActivity)
    })

    // Initialiser le timer
    resetInactivityTimer()

    return () => {
      // Nettoyer les écouteurs
      events.forEach(event => {
        document.removeEventListener(event, handleActivity)
      })
      
      // Effacer le timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [isConnected, resetInactivityTimer])

  const value = {
    account,
    isConnected,
    provider,
    signer,
    isLoading,
    error,
    chainId,
    connectWallet,
    disconnectWallet,
    switchToHardhatNetwork,
    formatAddress,
    isMetaMaskInstalled
  }

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 doit être utilisé dans un Web3Provider')
  }
  return context
}
