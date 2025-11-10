# BlockLucky

Application de loterie décentralisée sur la blockchain Ethereum.

## Structure du projet

```
BlockLucky/
├── backend/          # Smart contracts Hardhat
│   ├── contracts/    # Smart contracts Solidity
│   ├── scripts/      # Scripts de déploiement
│   ├── test/         # Tests unitaires
│   └── ignition/     # Modules Hardhat Ignition
│
└── frontend/         # Application frontend
    └── src/          # Code source frontend
```

## Installation

### Backend (Smart Contracts)
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Démarrage rapide

1. **Compiler les smart contracts**
   ```bash
   cd backend
   npm run compile
   ```

2. **Lancer un nœud local**
   ```bash
   cd backend
   npm run node
   ```

3. **Déployer les contracts (dans un autre terminal)**
   ```bash
   cd backend
   npm run deploy:localhost
   ```

4. **Lancer le frontend**
   ```bash
   cd frontend
   npm run dev
   ```

## Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## Licence

ISC
