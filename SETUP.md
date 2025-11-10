# 🎲 BlockLucky - Smart Contract Setup

## 📋 Description du Projet
BlockLucky est un smart contract de loterie décentralisée développé sur la blockchain Ethereum avec Hardhat.

## 🚀 Installation

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn
- Git

### Étapes d'installation
```bash
# Cloner le repository
git clone https://github.com/lgadrien/BlockLucky.git
cd BlockLucky

# Installer les dépendances
npm install
```

## 🛠️ Commandes Disponibles

### Compilation
```bash
npm run compile
```
Compile le smart contract Solidity.

### Tests
```bash
npm test
```
Lance la suite de tests complète du contrat.

### Déploiement Local
```bash
# Terminal 1 - Démarrer un nœud Hardhat local
npm run node

# Terminal 2 - Déployer sur le réseau local
npm run deploy:localhost
```

### Déploiement sur Testnet
```bash
# Configurer d'abord votre fichier .env
cp .env.example .env
# Éditer .env avec vos clés

# Déployer sur Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

### Nettoyage
```bash
npm run clean
```
Supprime les fichiers de cache et artifacts.

## 📁 Structure du Projet

```
BlockLucky/
├── contracts/              # Smart contracts Solidity
│   └── BlockLucky.sol     # Contrat principal de loterie
├── scripts/               # Scripts de déploiement
│   └── deploy.js         # Script de déploiement principal
├── test/                  # Tests unitaires
│   └── BlockLucky.test.js
├── ignition/              # Modules Hardhat Ignition
│   └── modules/
│       └── BlockLucky.js
├── hardhat.config.js      # Configuration Hardhat
├── package.json           # Dépendances Node.js
└── .env.example          # Template variables d'environnement
```

## 🎯 Fonctionnalités du Smart Contract

### Fonctions Principales

1. **createLottery(duration)** - Créer une nouvelle loterie
   - Réservé au propriétaire
   - Paramètre: durée en secondes

2. **buyTicket()** - Acheter un ticket
   - Payable: 0.01 ETH par défaut
   - Accessible à tous les utilisateurs

3. **selectWinner()** - Sélectionner le gagnant
   - Réservé au propriétaire
   - Exécutable après la fin de la loterie

4. **getPlayers(lotteryId)** - Obtenir la liste des participants
   - Vue publique

5. **setTicketPrice(newPrice)** - Modifier le prix du ticket
   - Réservé au propriétaire

### Events

- `LotteryCreated(lotteryId, ticketPrice, endTime)`
- `TicketPurchased(lotteryId, player)`
- `WinnerSelected(lotteryId, winner, prizeAmount)`

## 🧪 Tests

Le projet inclut des tests complets couvrant:
- ✅ Déploiement du contrat
- ✅ Création de loteries
- ✅ Achat de tickets
- ✅ Sélection de gagnants
- ✅ Gestion des permissions
- ✅ Modification du prix des tickets

## 🔒 Sécurité

⚠️ **Important**: 
- Ne jamais commiter votre fichier `.env` avec de vraies clés privées
- Le générateur de nombres aléatoires actuel est basique et conçu pour le développement
- Pour la production, utiliser Chainlink VRF pour une vraie génération aléatoire

## 📚 Technologies Utilisées

- **Solidity ^0.8.27** - Langage du smart contract
- **Hardhat** - Framework de développement Ethereum
- **Ethers.js** - Bibliothèque d'interaction avec Ethereum
- **Chai** - Framework de tests

## 🤝 Contribution

Ce projet est développé dans le cadre du cours DIGI3 - Blockchain.

## 📄 License

ISC

---

**Note**: Pour plus de détails sur le projet, consultez la documentation dans le dossier `Documentation/`.
