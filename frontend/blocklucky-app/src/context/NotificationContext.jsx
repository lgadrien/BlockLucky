import { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    // Exemples de notifications
    {
      id: 1,
      type: 'ticket_purchase',
      title: 'Ticket acheté',
      message: 'Vous avez acheté 3 tickets pour la loterie #42',
      timestamp: new Date(Date.now() - 3600000), // 1 heure avant
      read: false
    },
    {
      id: 2,
      type: 'lottery_start',
      title: 'Nouvelle loterie',
      message: 'La loterie #43 vient de commencer ! Participez maintenant.',
      timestamp: new Date(Date.now() - 7200000), // 2 heures avant
      read: false
    },
    {
      id: 3,
      type: 'lottery_end',
      title: 'Tirage effectué',
      message: 'Le tirage de la loterie #41 est terminé. Vérifiez vos gains !',
      timestamp: new Date(Date.now() - 86400000), // 1 jour avant
      read: true
    },
    {
      id: 4,
      type: 'win',
      title: '🎉 Félicitations !',
      message: 'Vous avez gagné 0.5 ETH à la loterie #41 !',
      timestamp: new Date(Date.now() - 86400000), // 1 jour avant
      read: false
    }
  ])

  // Ajouter une notification
  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    }
    setNotifications(prev => [newNotification, ...prev])
  }, [])

  // Marquer une notification comme lue
  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }, [])

  // Marquer toutes les notifications comme lues
  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }, [])

  // Supprimer une notification
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }, [])

  // Supprimer toutes les notifications
  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  // Compter les notifications non lues
  const unreadCount = notifications.filter(n => !n.read).length

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications doit être utilisé dans un NotificationProvider')
  }
  return context
}
