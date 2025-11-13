# 🎰 BlockLucky - Smart Contract & Blockchain Locale

Smart contract de loterie décentralisée développé avec Solidity et Hardhat, avec guide complet pour la blockchain locale.

---

## 🚀 Quick Start (3 minutes)

### 1️⃣ Installation

```powershell
cd smartcontract
npm install
```

### 2️⃣ Lancer la blockchain locale

**Terminal 1** (à laisser ouvert) :
```powershell
npx hardhat node
```

Vous verrez 20 comptes avec 10,000 ETH chacun. **Copiez les clés privées** pour MetaMask.

### 3️⃣ Déployer les contrats

**Terminal 2** (nouveau terminal) :
```powershell
npx hardhat run scripts/deploy.js --network localhost
```

**Notez les adresses des contrats affichées** !

### 4️⃣ MetaMask

**Ajouter le réseau local :**
- **Nom** : Hardhat Local
- **RPC** : http://127.0.0.1:8545
- **Chain ID** : 31337
- **Symbole** : ETH

**Importer un compte :**
1. MetaMask → Importer un compte → Clé privée
2. Coller : `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
3. ✅ Vous avez 10,000 ETH !

---

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

## 🚀 Blockchain Locale Hardhat

### Configuration automatique

Le fichier `hardhat.config.js` est déjà configuré avec :
- ✅ Réseau `localhost` sur `http://127.0.0.1:8545`
- ✅ 20 comptes automatiquement générés
- ✅ 10,000 ETH par compte
- ✅ Support Ethers.js v6

### Lancement du nœud Hardhat

**Terminal 1** :
```powershell
npx hardhat node
```

**Résultat attendu :**
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

... (jusqu'au compte #19)
```

### Comptes de Test Disponibles

| Compte | Adresse | Clé Privée |
|--------|---------|------------|
| #0 | `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` | `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` |
| #1 | `0x70997970C51812dc3A010C7d01b50e0d17dc79C8` | `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d` |
| #2 | `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC` | `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a` |

> ⚠️ **ATTENTION** : N'utilisez JAMAIS ces comptes sur un réseau réel (mainnet, testnet). Les clés sont publiques !

---

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

### Réseau local (Hardhat Localhost)

**Terminal 2** (laissez le nœud tourner dans le terminal 1) :
```bash
npx hardhat run scripts/deploy.js --network localhost
```

**Résultat attendu :**
```
🚀 Démarrage du déploiement sur la blockchain locale...

📋 Informations de déploiement:
   Compte déployeur: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   Balance: 10000.0 ETH

📦 Déploiement du contrat Storage...
✅ Storage déployé à l'adresse: 0x5FbDB2315678afecb367f032d93F642f64180aa3

📦 Déploiement du contrat Lottery...
✅ Lottery déployé à l'adresse: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

💡 Sauvegardez ces adresses pour interagir avec vos contrats!
```

### Commandes utiles

```powershell
# Voir tous les comptes
npx hardhat run scripts/accounts.js --network localhost

# Interagir avec les contrats
npx hardhat run scripts/interact.js --network localhost

# Console interactive
npx hardhat console --network localhost
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

Le fichier `hardhat.config.js` contient la configuration complète :

```javascript
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: { enabled: true, runs: 200 }
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        count: 20,
        accountsBalance: "10000000000000000000000" // 10,000 ETH
      }
    }
  }
};
```

## 🦊 Configuration MetaMask

### Ajouter le réseau local

1. Ouvrir MetaMask
2. Sélecteur de réseau → Ajouter un réseau manuellement
3. Remplir :
   - **Nom** : Hardhat Local
   - **URL RPC** : http://127.0.0.1:8545
   - **Chain ID** : 31337
   - **Symbole** : ETH
4. Enregistrer

### Importer un compte de test

1. MetaMask → Importer un compte → Clé privée
2. Coller une clé privée (voir tableau ci-dessus)
3. Vous avez maintenant 10,000 ETH de test !

### ⚠️ Redémarrage de la blockchain

Si vous redémarrez le nœud Hardhat :
1. Redéployer les contrats (les adresses changent)
2. MetaMask → Paramètres → Avancé → Effacer les données d'activité

## 📂 Structure du projet

```
smartcontract/
├── contracts/
│   ├── Lottery.sol          # Smart contract de loterie
│   ├── Storage.sol          # Smart contract simple (test)
│   └── interfaces/          # Interfaces
├── scripts/
│   ├── deploy.js            # Déploiement (Storage + Lottery)
│   ├── accounts.js          # Affiche les comptes locaux
│   └── interact.js          # Interaction avec les contrats
├── test/
│   └── Lottery.test.js      # Suite de 23 tests
├── ignition/modules/
│   └── Lottery.js           # Module Hardhat Ignition
├── hardhat.config.js        # Configuration complète
├── package.json             # Dépendances npm
├── README.md                # Ce fichier
└── GUIDE_BLOCKCHAIN_LOCALE.md  # Guide détaillé
```

---

## 📖 Documentation Complète

Pour un guide détaillé avec toutes les commandes, troubleshooting et exemples, consultez **[GUIDE_BLOCKCHAIN_LOCALE.md](./GUIDE_BLOCKCHAIN_LOCALE.md)**

---

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
