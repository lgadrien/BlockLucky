# BlockLucky Frontend - Organisation du Code

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── layout/         # Composants de mise en page (Header, Footer)
│   ├── sections/       # Sections de page
│   ├── ui/            # Composants UI réutilisables
│   └── ...            # Autres composants
├── context/           # Contextes React (Web3, Notifications)
├── hooks/            # Hooks personnalisés
├── pages/            # Pages de l'application
├── utils/            # Fonctions utilitaires
│   ├── constants.js  # Constantes globales
│   ├── cookies.js    # Gestion des cookies
│   └── formatters.js # Fonctions de formatage
└── ...

## 🔧 Utilitaires

### Constants (`utils/constants.js`)
Centralise toutes les constantes de l'application:
- Durées et timeouts
- Routes
- Types de notifications
- Clés de cookies
- Configurations

### Cookies (`utils/cookies.js`)
Gestion des cookies:
- `setCookie(name, value, days)` - Définir un cookie
- `getCookie(name)` - Récupérer un cookie
- `deleteCookie(name)` - Supprimer un cookie

### Formatters (`utils/formatters.js`)
Fonctions de formatage:
- `formatAddress(address)` - Formater une adresse Ethereum
- `formatTimeAgo(timestamp)` - Temps relatif
- `formatEth(amount)` - Formater en ETH
- `formatUsd(amount)` - Formater en USD

## 🎣 Hooks Personnalisés

### `useScroll` (`hooks/useScroll.js`)
- `useScrollTop(threshold)` - Gestion du bouton retour en haut
- `useScrollAnimation()` - Animation au scroll

## 📦 Contextes

### Web3Context
Gestion de la connexion blockchain:
- Connexion/déconnexion MetaMask
- Gestion des cookies de session
- Déconnexion automatique après inactivité
- État de connexion global

### NotificationContext
Système de notifications:
- Gestion des notifications
- Types: tickets, loterie, gains
- Actions: lire, supprimer, effacer tout

## 🎨 Composants UI

### ScrollToTopButton
Bouton de retour en haut de page réutilisable

### NotificationBell
Cloche de notifications avec dropdown

## 📝 Bonnes Pratiques

1. **Séparation des responsabilités**: Logique métier séparée de la présentation
2. **Réutilisabilité**: Composants et hooks réutilisables
3. **Constantes centralisées**: Facile à maintenir et modifier
4. **Documentation**: Code commenté et typé
5. **Organisation claire**: Structure de dossiers logique
