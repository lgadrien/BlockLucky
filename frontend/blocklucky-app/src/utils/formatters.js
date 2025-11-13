/**
 * Formater une adresse Ethereum pour l'affichage
 * @param {string} address - Adresse Ethereum complète
 * @returns {string} - Adresse formatée (0x1234...5678)
 */
export const formatAddress = (address) => {
  if (!address) return ''
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

/**
 * Formater un timestamp en temps relatif
 * @param {Date|string|number} timestamp - Timestamp à formater
 * @returns {string} - Temps relatif (Il y a 2h, Il y a 1j, etc.)
 */
export const formatTimeAgo = (timestamp) => {
  const now = new Date()
  const diff = now - new Date(timestamp)
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'À l\'instant'
  if (minutes < 60) return `Il y a ${minutes} min`
  if (hours < 24) return `Il y a ${hours}h`
  return `Il y a ${days}j`
}

/**
 * Formater un montant en ETH
 * @param {number} amount - Montant en Wei
 * @param {number} decimals - Nombre de décimales à afficher
 * @returns {string} - Montant formaté en ETH
 */
export const formatEth = (amount, decimals = 4) => {
  if (!amount) return '0 ETH'
  return `${parseFloat(amount).toFixed(decimals)} ETH`
}

/**
 * Formater un montant en USD
 * @param {number} amount - Montant
 * @returns {string} - Montant formaté en USD
 */
export const formatUsd = (amount) => {
  if (!amount) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
