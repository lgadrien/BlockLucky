# 🔗 Blockchain Locale Hardhat - Guide Complet

Guide complet pour configurer et utiliser une blockchain locale avec Hardhat, incluant 20 comptes avec 10,000 ETH chacun.

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

## 📁 Architecture du Projet

```
smartcontract/
├── contracts/           # Smart contracts Solidity
│   ├── Storage.sol     # Contrat simple (set/get)
│   └── Lottery.sol     # Contrat de loterie
├── scripts/            # Scripts de déploiement
│   └── deploy.js       # Script principal de déploiement
├── test/               # Tests unitaires
│   └── Lottery.test.js
├── hardhat.config.js   # Configuration Hardhat
└── package.json        # Dépendances NPM
```

---

## ⚙️ Configuration

### 1. Installation des dépendances

```powershell
cd smartcontract
npm install
```

### 2. Configuration Hardhat (`hardhat.config.js`)

Le fichier est déjà configuré avec :
- ✅ Réseau `localhost` sur `http://127.0.0.1:8545`
- ✅ 20 comptes automatiquement générés
- ✅ 10,000 ETH par compte
- ✅ Support Ethers.js v6

---

## 🚀 Lancement de la Blockchain Locale

### Étape 1 : Démarrer le nœud Hardhat

Ouvrez un **premier terminal** et lancez :

```powershell
npx hardhat node
```

**Résultat attendu :**
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

... (jusqu'au compte #19)
```

> ⚠️ **Important** : Gardez ce terminal ouvert. C'est votre blockchain locale qui tourne !

---

## 📦 Déploiement des Smart Contracts

### Étape 2 : Déployer les contrats

Ouvrez un **second terminal** (laissez le nœud tourner dans le premier) :

```powershell
cd smartcontract
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

🧪 Test du contrat Storage:
   Valeur stockée: 42

📦 Déploiement du contrat Lottery...
✅ Lottery déployé à l'adresse: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

📊 Informations du contrat Lottery:
   Prix du ticket: 0.0016 ETH
   État: CLOSED

============================================================
✅ DÉPLOIEMENT RÉUSSI
============================================================

📝 Adresses des contrats:
   Storage: 0x5FbDB2315678afecb367f032d93F642f64180aa3
   Lottery: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

💡 Sauvegardez ces adresses pour interagir avec vos contrats!
```

---

## 🦊 Configuration MetaMask

### Étape 3 : Ajouter le réseau local dans MetaMask

1. Ouvrir MetaMask
2. Cliquer sur le sélecteur de réseau (en haut)
3. Cliquer sur **"Ajouter un réseau"** → **"Ajouter un réseau manuellement"**
4. Remplir les informations :

| Champ | Valeur |
|-------|--------|
| **Nom du réseau** | Hardhat Local |
| **URL RPC** | http://127.0.0.1:8545 |
| **ID de chaîne** | 31337 |
| **Symbole** | ETH |
| **URL de l'explorateur** | (laisser vide) |

5. Cliquer sur **"Enregistrer"**

### Étape 4 : Importer un compte avec des ETH

1. Dans MetaMask, cliquer sur l'icône du compte (en haut à droite)
2. Cliquer sur **"Importer un compte"**
3. Sélectionner **"Clé privée"**
4. Coller une clé privée depuis le terminal du nœud Hardhat, par exemple :

```
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

5. Cliquer sur **"Importer"**

**✅ Vous devriez maintenant voir 10,000 ETH dans votre compte !**

### Comptes de Test Disponibles

Voici les 3 premiers comptes (vous pouvez en importer jusqu'à 20) :

| Compte | Adresse | Clé Privée |
|--------|---------|------------|
| #0 | `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` | `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` |
| #1 | `0x70997970C51812dc3A010C7d01b50e0d17dc79C8` | `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d` |
| #2 | `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC` | `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a` |

> ⚠️ **ATTENTION** : N'utilisez JAMAIS ces comptes sur un réseau réel (mainnet, testnet). Les clés sont publiques !

---

## 🧪 Vérification du Contrat

### Test avec Hardhat Console

Lancez la console interactive :

```powershell
npx hardhat console --network localhost
```

Puis testez le contrat Storage :

```javascript
// Récupérer le contrat déployé
const Storage = await ethers.getContractFactory("Storage");
const storage = await Storage.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

// Stocker une valeur
await storage.set(123);

// Lire la valeur
const value = await storage.get();
console.log("Valeur stockée:", value.toString());
```

### Test avec Script

Créez un fichier `scripts/interact.js` pour interagir avec vos contrats :

```javascript
const hre = require("hardhat");

async function main() {
  // Adresse du contrat Storage (à remplacer par votre adresse)
  const storageAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  // Attacher le contrat
  const Storage = await hre.ethers.getContractFactory("Storage");
  const storage = await Storage.attach(storageAddress);
  
  // Lire la valeur actuelle
  let value = await storage.get();
  console.log("Valeur actuelle:", value.toString());
  
  // Modifier la valeur
  const tx = await storage.set(999);
  await tx.wait();
  console.log("✅ Valeur modifiée!");
  
  // Lire la nouvelle valeur
  value = await storage.get();
  console.log("Nouvelle valeur:", value.toString());
}

main().catch(console.error);
```

Exécuter :

```powershell
npx hardhat run scripts/interact.js --network localhost
```

---

## 📚 Commandes Utiles

```powershell
# Voir tous les comptes
npx hardhat run scripts/accounts.js --network localhost

# Interagir avec les contrats
npx hardhat run scripts/interact.js --network localhost

# Compiler
npx hardhat compile

# Tester
npx hardhat test

# Nettoyage
npx hardhat clean

# Console interactive
npx hardhat console --network localhost
```

---

## 🔄 Workflow Complet

### Développement quotidien

1. **Terminal 1** - Démarrer la blockchain :
   ```powershell
   npx hardhat node
   ```

2. **Terminal 2** - Développer et déployer :
   ```powershell
   # Modifier vos contrats dans contracts/
   
   # Compiler
   npx hardhat compile
   
   # Tester
   npx hardhat test
   
   # Déployer
   npx hardhat run scripts/deploy.js --network localhost
   ```

3. **MetaMask** - Tester l'interface :
   - Connecter à "Hardhat Local"
   - Importer un compte de test
   - Interagir avec vos contrats via votre frontend

### Redémarrage de la blockchain

Si vous redémarrez le nœud Hardhat :

1. Arrêter le nœud (Ctrl+C)
2. Relancer `npx hardhat node`
3. **Important** : Redéployer tous vos contrats (les adresses changeront)
4. **Important** : Dans MetaMask, réinitialiser les transactions :
   - Paramètres → Avancé → Effacer les données d'activité

---

## 🎯 Smart Contracts Disponibles

### Storage.sol

Contrat simple pour tester le déploiement et les interactions de base.

**Fonctions :**
- `set(uint256 _value)` : Stocker une valeur
- `get()` : Récupérer la valeur stockée

### Lottery.sol

Contrat de loterie complet avec :
- Achat de tickets
- Tirage au sort
- Distribution des gains

**Utilisation :** Voir le code dans `contracts/Lottery.sol`

---

## ❓ Troubleshooting

### Le nœud ne démarre pas

```powershell
# Tuer les processus sur le port 8545
netstat -ano | findstr :8545
taskkill /PID <PID> /F

# Relancer
npx hardhat node
```

### Erreur "nonce too high" dans MetaMask

MetaMask → Paramètres → Avancé → Effacer les données d'activité

### Les comptes n'ont pas 10,000 ETH

Vérifiez `hardhat.config.js` :
```javascript
accountsBalance: "10000000000000000000000" // 10,000 ETH en wei
```

### Le déploiement échoue

1. Vérifier que le nœud tourne (`npx hardhat node`)
2. Compiler d'abord (`npx hardhat compile`)
3. Vérifier qu'il n'y a pas d'erreurs dans les contrats

---

## 🎉 Vous êtes prêt !

Vous avez maintenant :

✅ Une blockchain locale Hardhat fonctionnelle  
✅ 20 comptes avec 10,000 ETH chacun  
✅ Des contrats déployés (Storage + Lottery)  
✅ MetaMask configuré  
✅ Un workflow de développement complet  

**Prochaines étapes :**
- Connecter votre frontend au réseau local
- Développer de nouveaux smart contracts
- Tester vos fonctionnalités en local avant le déploiement

---

## 📖 Ressources

- [Documentation Hardhat](https://hardhat.org/docs)
- [Documentation Ethers.js](https://docs.ethers.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)

---

**Bon développement ! 🚀**
