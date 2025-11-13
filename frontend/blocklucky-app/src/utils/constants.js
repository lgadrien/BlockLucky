// Durées en millisecondes
export const DURATIONS = {
  INACTIVITY_TIMEOUT: 5 * 60 * 1000, // 5 minutes
  COOKIE_EXPIRY_DAYS: 7, // 7 jours
  ERROR_DISPLAY_TIME: 5000, // 5 secondes
}

// Routes de l'application
export const ROUTES = {
  HOME: '/',
  PROFILE: '/profil',
  LOTTERY: '/loterie',
}

// Types de notifications
export const NOTIFICATION_TYPES = {
  TICKET_PURCHASE: 'ticket_purchase',
  LOTTERY_START: 'lottery_start',
  LOTTERY_END: 'lottery_end',
  WIN: 'win',
}

// Clés des cookies
export const COOKIE_KEYS = {
  ACCOUNT: 'blocklucky_account',
}

// Configurations d'animation
export const ANIMATION_CONFIG = {
  SCROLL_THRESHOLD: 0.1,
  SCROLL_ROOT_MARGIN: '0px 0px -50px 0px',
  SCROLL_TOP_THRESHOLD: 500, // pixels
}

// Liens externes
export const EXTERNAL_LINKS = {
  METAMASK: 'https://metamask.io',
  GITHUB: 'https://github.com/lgadrien/BlockLucky',
}
