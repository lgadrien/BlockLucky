import { Navigate } from 'react-router-dom'
import { useWeb3 } from '../context/Web3Context'

function ProtectedRoute({ children }) {
  const { isConnected } = useWeb3()

  if (!isConnected) {
    // Rediriger vers la page d'accueil si non connecté
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
