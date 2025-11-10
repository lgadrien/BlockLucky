# BlockLucky Backend

Smart contracts Hardhat pour BlockLucky - Loterie sur la blockchain Ethereum.

## Installation

```bash
cd backend
npm install
```

## Compilation

```bash
npm run compile
```

## Tests

```bash
npm test
```

## Déploiement

### Local
```bash
# Terminal 1 - Démarrer un nœud local
npm run node

# Terminal 2 - Déployer
npm run deploy:localhost
```

### Testnet
```bash
npm run deploy
```

## Structure

- `contracts/` - Smart contracts Solidity
- `scripts/` - Scripts de déploiement
- `test/` - Tests unitaires
- `ignition/` - Modules Hardhat Ignition
