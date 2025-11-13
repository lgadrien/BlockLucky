# 🎰 BlockLucky

Loterie décentralisée sur blockchain Ethereum avec interface React moderne.

## 📋 Prérequis

- Node.js 18+
- MetaMask
- Git

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone https://github.com/lgadrien/BlockLucky.git
cd BlockLucky
```

### 2. Smart Contract

```bash
cd smartcontract
npm install
```

**Démarrer la blockchain locale :**
```bash
npx hardhat node
```

**Déployer le contrat (nouveau terminal) :**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

**Tester le contrat :**
```bash
npx hardhat test
```

### 3. Frontend

```bash
cd ../frontend/blocklucky-app
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## ⚙️ Configuration MetaMask

1. **Ajouter le réseau local :**
   - Réseau : Localhost 8545
   - URL RPC : `http://127.0.0.1:8545`
   - Chain ID : `31337`
   - Symbole : ETH

2. **Importer un compte de test :**
   - Clé privée : `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
   - Balance : 10 000 ETH

## 🎯 Utilisation

1. Connectez MetaMask au réseau local
2. Connectez votre wallet sur l'application
3. Naviguez vers la page Loterie
4. Achetez des billets et participez !

## 📁 Structure

```
BlockLucky/
├── frontend/blocklucky-app/     # Application React
│   ├── src/
│   │   ├── components/          # Composants UI
│   │   ├── pages/               # Pages (Home, Lottery, Profile)
│   │   ├── context/             # Web3Context, NotificationContext
│   │   ├── hooks/               # Hooks personnalisés
│   │   └── utils/               # Fonctions utilitaires
│   └── package.json
│
├── smartcontract/               # Smart contracts Solidity
│   ├── contracts/Lottery.sol    # Contrat principal
│   ├── test/Lottery.test.js     # Tests
│   ├── scripts/deploy.js        # Script de déploiement
│   └── package.json
│
└── Documentation/               # Charte graphique
```

## 🛠️ Technologies

**Frontend :**
- React 18
- React Router v6
- Ethers.js v6
- Tailwind CSS
- Lucide Icons

**Smart Contract :**
- Solidity ^0.8.28
- Hardhat
- Ethers.js
- Chai (tests)

## 🧪 Tests

```bash
cd smartcontract
npx hardhat test
```

Tests disponibles :
- Démarrage/fermeture de loterie
- Achat de billets
- Distribution des gains
- Sélection du gagnant
- Cycle complet de loterie

## 📝 Fonctionnalités

✅ Connexion MetaMask avec session persistante (7 jours)  
✅ Déconnexion automatique après 5 min d'inactivité  
✅ Achat de billets de loterie  
✅ Visualisation des participants  
✅ Système de notifications  
✅ Interface responsive  
✅ Protection des routes  
✅ Gestion des erreurs  

## 🔐 Sécurité

- Smart contract auditable
- Pas de stockage de clés privées
- Session sécurisée par cookies
- Génération aléatoire on-chain

## 👨‍💻 Développement

**Frontend :**
```bash
cd frontend/blocklucky-app
npm run dev        # Serveur de développement
npm run build      # Build production
npm run preview    # Aperçu du build
```

**Smart Contract :**
```bash
cd smartcontract
npx hardhat compile    # Compiler les contrats
npx hardhat clean      # Nettoyer les artifacts
npx hardhat node       # Nœud local
```

## 📄 Licence

MIT

## 👤 Auteur

[@lgadrien](https://github.com/lgadrien)
