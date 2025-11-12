import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { ethers } from 'ethers'

const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [chainId, setChainId] = useState(null)

  // Vérifier si MetaMask est installé
  const isMetaMaskInstalled = useCallback(() => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
  }, [])

  // Connecter le wallet
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask n\'est pas installé. Veuillez installer MetaMask.')
      return false
    }

    try {
      setIsLoading(true)
      setError(null)

      // Demander l'accès aux comptes
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      // Créer un fournisseur ethers
      const ethersProvider = new ethers.BrowserProvider(window.ethereum)
      const ethersSigner = await ethersProvider.getSigner()
      const chainIdData = await ethersProvider.getNetwork()

      setProvider(ethersProvider)
      setSigner(ethersSigner)
      setAccount(accounts[0])
      setChainId(chainIdData.chainId)
      setIsConnected(true)

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
  }, [isMetaMaskInstalled])

  // Déconnecter le wallet
  const disconnectWallet = useCallback(() => {
    setAccount(null)
    setIsConnected(false)
    setProvider(null)
    setSigner(null)
    setError(null)
    setChainId(null)
  }, [])

  // Formater l'adresse pour l'affichage
  const formatAddress = useCallback((address) => {
    if (!address) return ''
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }, [])

  // Écouter les changements de compte
  useEffect(() => {
    if (!isMetaMaskInstalled()) return

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet()
      } else if (accounts[0] !== account) {
        setAccount(accounts[0])
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
