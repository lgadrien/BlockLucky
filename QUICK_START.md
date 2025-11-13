# ⚡ Quick Start - BlockLucky

## 🚀 Démarrage en 3 commandes

### 1️⃣ Terminal 1 : Blockchain
```powershell
cd C:\Users\adri1\Desktop\BlockLucky\smartcontract
npx hardhat node
```
**→ Laisse ce terminal ouvert ! ⚠️**

---

### 2️⃣ Terminal 2 : Déployer & Démarrer
```powershell
cd C:\Users\adri1\Desktop\BlockLucky\smartcontract
npx hardhat run scripts/deploy.js --network localhost
npx hardhat run scripts/startLottery.js --network localhost
```

**✅ Automatiquement fait :**
- 📝 ABI copié vers `frontend/src/contracts/lotteryABI.json`
- 📝 Adresse du contrat mise à jour dans `frontend/.env`
- 📝 Adresses sauvegardées dans `deployed-addresses.json`

---

### 3️⃣ Terminal 3 : Frontend
```powershell
cd C:\Users\adri1\Desktop\BlockLucky\frontend\blocklucky-app
npm run dev
```

**→ Ouvre http://localhost:5173/**

---

## 🎯 Pour acheter des tickets

1. **Connecte MetaMask** (clique sur "Connexion")
2. **Importe Account #0** si pas déjà fait :
   - Clé privée : `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
3. **Va sur la page "Loterie"**
4. **Utilise le panneau de test 🧪** en bas à droite
5. **Clique "Tester l'achat de 1 ticket"**
6. **Confirme dans MetaMask**

---

## 🔄 Si tu redéploies

**Quand tu relances `deploy.js`, tout se met à jour automatiquement :**
- ✅ Nouvel ABI copié
- ✅ Nouvelle adresse dans `.env`
- ✅ Frontend rechargé automatiquement (si Vite tourne)

**⚠️ Pense à :**
1. Relancer `startLottery.js` après le déploiement
2. Nettoyer MetaMask (Paramètres → Avancé → Effacer les données d'activité)

---

## ✅ Tout est automatique maintenant !

Plus besoin de copier manuellement l'ABI ou les adresses ! 🎉
