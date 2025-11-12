import { useState, useRef, useEffect } from 'react'
import { Bell, X, Check, Ticket, Trophy, PlayCircle, StopCircle } from 'lucide-react'
import { useNotifications } from '../context/NotificationContext'
import { formatTimeAgo } from '../utils/formatters'

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications()
  const dropdownRef = useRef(null)

  // Fermer le dropdown en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'ticket_purchase':
        return <Ticket className="w-5 h-5 text-blockchain-500" />
      case 'win':
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 'lottery_start':
        return <PlayCircle className="w-5 h-5 text-green-500" />
      case 'lottery_end':
        return <StopCircle className="w-5 h-5 text-red-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const handleNotificationClick = (notif) => {
    if (!notif.read) {
      markAsRead(notif.id)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-anthracite-700 hover:bg-gray-100 rounded-xl transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[calc(100vh-100px)] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-anthracite-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="px-2 py-1 text-xs font-semibold text-blockchain-600 bg-blockchain-100 rounded-full">
                  {unreadCount} {unreadCount === 1 ? 'nouvelle' : 'nouvelles'}
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blockchain-600 hover:text-blockchain-700 font-medium flex items-center gap-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Check className="w-3 h-3" />
                    Tout marquer comme lu
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 ml-auto"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <X className="w-3 h-3" />
                  Tout effacer
                </button>
              </div>
            )}
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Aucune notification
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notif.read ? 'bg-blockchain-50/30' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`text-sm font-semibold ${!notif.read ? 'text-anthracite-700' : 'text-gray-700'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {notif.title}
                          </h4>
                          {!notif.read && (
                            <div className="w-2 h-2 bg-blockchain-500 rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {notif.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {formatTimeAgo(notif.timestamp)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notif.id)
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Supprimer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell
