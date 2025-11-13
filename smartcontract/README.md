# 🎰 BlockLucky - Smart Contract Lottery

Smart contract de loterie décentralisée développé avec Solidity et Hardhat.

## 📋 Description

BlockLucky est un smart contract de loterie qui permet aux utilisateurs d'acheter des tickets et de participer à un tirage au sort décentralisé. Le contrat gère l'ensemble du cycle de vie de la loterie : ouverture, achat de tickets, tirage du gagnant et distribution des gains.

## ✨ Fonctionnalités

- ✅ **Démarrage de loterie** : Le propriétaire peut démarrer une nouvelle loterie avec une durée personnalisée
- 🎫 **Achat de tickets** : Les participants peuvent acheter des tickets pendant que la loterie est ouverte
- 🎲 **Tirage au sort** : Sélection aléatoire d'un gagnant parmi les participants
- 💰 **Distribution des gains** : Transfert automatique des gains au gagnant
- 🔒 **Sécurité** : Protection contre la réentrance et vérifications strictes

## 🏗️ Architecture du contrat

### Variables d'état

- `lotteryState` : État de la loterie (OPEN/CLOSED)
- `owner` : Adresse du propriétaire du contrat
- `participants` : Liste des participants
- `ticketBought` : Nombre de tickets achetés par adresse
- `participantsCount` : Nombre total de participants
- `totalBets` : Montant total des mises
- `timeLeft` : Timestamp de fin de la loterie
- `ticketPrice` : Prix d'un ticket (0.0016 ETH)
- `winner` : Adresse du gagnant

### Fonctions principales

#### `startLottery(uint duration)`
Démarre une nouvelle loterie.
- **Accès** : Propriétaire uniquement
- **Paramètres** : `duration` - Durée de la loterie en secondes
- **Effets** : Réinitialise les données et ouvre la loterie

#### `buyTicket()`
Permet d'acheter un ticket de loterie.
- **Accès** : Public
- **Payable** : 0.0016 ETH requis
- **Effets** : Ajoute le participant et incrémente les compteurs

#### `distributeWinnings()`
Distribue les gains au gagnant.
- **Accès** : Propriétaire uniquement
- **Prérequis** : Un gagnant doit être désigné et la loterie fermée
- **Effets** : Transfère le montant total au gagnant

### Events

- `LotteryStarted(uint duration)` : Émis au démarrage de la loterie
- `TicketPurchased(address indexed participant, uint amount)` : Émis lors de l'achat d'un ticket
- `WinningsDistributed(address indexed winner, uint amount)` : Émis lors de la distribution des gains

## 🚀 Installation

### Prérequis

- Node.js >= 16.0.0
- npm ou yarn

### Installation des dépendances

```bash
npm install
```

## 🧪 Tests

Le projet inclut une suite complète de 23 tests couvrant toutes les fonctionnalités.

### Lancer les tests

```bash
npx hardhat test
```

### Couverture des tests

- ✅ Déploiement et initialisation
- ✅ Démarrage de loterie (5 tests)
- ✅ Achat de tickets (6 tests)
- ✅ Distribution des gains (3 tests)
- ✅ Fonctions de lecture (4 tests)
- ✅ Gestion du solde du contrat

### Résultats attendus

```
  Lottery
    Deployment
      ✔ Should set the right owner
      ✔ Should initialize with CLOSED state
      ✔ Should set the correct ticket price
      ✔ Should initialize with zero participants
      ✔ Should initialize with zero total bets
    Start Lottery
      ✔ Should allow owner to start the lottery
      ✔ Should revert if non-owner tries to start lottery
      ✔ Should revert if lottery is already open
      ✔ Should revert if duration is zero
      ✔ Should reset previous lottery data
    Buy Ticket
      ✔ Should allow participant to buy ticket
      ✔ Should allow same participant to buy multiple tickets
      ✔ Should revert if lottery is closed
      ✔ Should revert if wrong amount is sent
      ✔ Should track multiple participants correctly
    Distribute Winnings
      ✔ Should revert if no winner is designated
      ✔ Should revert if lottery is not closed (no winner)
      ✔ Should revert if non-owner tries to distribute
    View Functions
      ✔ Should return correct participants count
      ✔ Should return correct total bets
      ✔ Should return correct ticket price
      ✔ Should track tickets bought per participant
    Contract Balance
      ✔ Should receive and hold ETH from ticket purchases

  23 passing
```

## 📦 Compilation

```bash
npx hardhat compile
```

## 🚢 Déploiement

### Réseau local (Hardhat Network)

```bash
npx hardhat run scripts/deploy.js
```

### Testnet (ex: Sepolia)

1. Configurer les variables d'environnement dans `.env` :
```env
PRIVATE_KEY=your_private_key
INFURA_API_KEY=your_infura_key
```

2. Déployer :
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## 🔧 Configuration

Le fichier `hardhat.config.js` contient la configuration du projet :

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
};
```

## 📂 Structure du projet

```
smartcontract/
├── contracts/
│   ├── Lottery.sol          # Smart contract principal
│   └── interfaces/          # Interfaces
├── test/
│   └── Lottery.test.js      # Suite de tests
├── scripts/
│   └── deploy.js            # Script de déploiement
├── ignition/
│   └── modules/
│       └── Lottery.js       # Module Hardhat Ignition
├── hardhat.config.js        # Configuration Hardhat
├── package.json             # Dépendances npm
└── README.md               # Ce fichier
```

## 🔐 Sécurité

Le contrat implémente plusieurs mesures de sécurité :

- ✅ **Checks-Effects-Interactions pattern** : Réinitialisation de `totalBets` avant le transfert
- ✅ **Require statements** : Vérifications strictes sur toutes les fonctions
- ✅ **Access control** : Certaines fonctions réservées au propriétaire
- ✅ **Reentrancy protection** : Utilisation de `.call{value}("")` avec pattern CEI

## 🛠️ Technologies utilisées

- **Solidity** ^0.8.0
- **Hardhat** ^2.19.0
- **Ethers.js** ^6.4.0
- **Chai** ^4.3.10
- **Hardhat Toolbox** ^5.0.0

## 📝 License

MIT

## 👥 Auteurs

BlockLucky Team

## 🚧 Fonctionnalités à venir

- [ ] Fonction `pickWinner()` - Tirage au sort du gagnant
- [ ] Fonction `closeLottery()` - Fermeture de la loterie
- [ ] Fonction `resetLottery()` - Réinitialisation complète
- [ ] Support de Chainlink VRF pour le random
- [ ] Interface web pour interagir avec le contrat

## 📞 Support

Pour toute question ou problème, ouvrez une issue sur le repository GitHub.

---

Made with ❤️ by BlockLucky Team
