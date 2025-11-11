# 🎨 Charte Graphique BlockLucky

## 1. Identité visuelle

**Concept** : Union entre blockchain (Ethereum) et chance (dé).

**Style** : Moderne, technologique, minimaliste.

**Ambiance** : Confiance, transparence, innovation.

---

## 2. Couleurs principales

| Couleur | Usage | Code HEX | Description |
|---------|-------|----------|-------------|
| 🔵 **Bleu blockchain** | Élément principal, titres, contours | `#2B6CB0` | Rappel d'Ethereum et de la fiabilité |
| 🟣 **Violet chance** | Élément secondaire, surbrillance, boutons | `#805AD5` | Évoque la chance, la créativité |
| ⚪ **Blanc pur** | Fond principal | `#FFFFFF` | Clarté et lisibilité |
| ⚫ **Gris anthracite** | Texte secondaire | `#2D3748` | Sobriété et contraste doux |

### Palette complète Tailwind CSS

#### Bleu blockchain
- `blockchain-50`: #e6f2ff
- `blockchain-500`: #2B6CB0 (principal)
- `blockchain-600`: #245a94

#### Violet chance
- `chance-50`: #f5f0ff
- `chance-400`: #9F7AEA (hover link)
- `chance-500`: #805AD5 (principal)
- `chance-600`: #6B46C1 (hover bouton)

#### Gris anthracite
- `anthracite-200`: #e2e8f0
- `anthracite-700`: #2D3748 (texte)

---

## 3. Typographie

- **Titre / Logo** : `Montserrat` (gras, majuscules)
- **Texte courant** : `Inter` ou `Open Sans` (clair, lisible)
- **Code / Interface technique** : `Roboto Mono`

### Usage dans le code
```jsx
// Titres
style={{ fontFamily: 'Montserrat, sans-serif' }}

// Texte courant
style={{ fontFamily: 'Inter, sans-serif' }}

// Code
style={{ fontFamily: 'Roboto Mono, monospace' }}
```

---

## 4. Iconographie

- Style **flat** et **géométrique**
- Formes angulaires rappelant les facettes du logo Ethereum
- Couleurs limitées à la palette principale

---

## 5. UI / UX (site web ou app)

### Arrière-plan
- Clair (`#FFFFFF`) ou gradient bleu/violet léger

### Boutons
```css
/* Couleur principale */
background: #805AD5

/* Hover */
background: #6B46C1

/* Texte */
color: white
```

### Liens
- Couleur : Bleu `#2B6CB0`
- Survol : Violet clair `#9F7AEA`

### Cartes / Blocs
- **Coins arrondis** : `radius 12px` (`rounded-xl`)
- **Ombre légère** : `rgba(0,0,0,0.1)` (`shadow-sm`)
- **Bordure** : `border-2 border-anthracite-200`
- **Hover** : `hover:border-chance-400`

---

## 6. Utilisation du logo

### Versions
- **Version principale** (avec texte) : affiches et présentations
- **Version icône seule** (sans texte) : favicon, application, réseaux sociaux

### Protection
- Espace de protection autour du logo : **au moins la hauteur du dé**

### Règles
- ❌ Ne pas modifier les couleurs
- ❌ Ne pas modifier la rotation du symbole Ethereum
- ✅ Garder le ratio d'aspect

---

## 7. Exemples de composants

### Bouton principal
```jsx
<button className="px-6 py-2.5 bg-chance-500 hover:bg-chance-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
  Action
</button>
```

### Card
```jsx
<div className="bg-white rounded-xl p-6 border-2 border-anthracite-200 hover:border-chance-400 transition-all duration-200 shadow-sm">
  Contenu
</div>
```

### Titre principal
```jsx
<h1 className="text-blockchain-600 font-bold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
  TITRE
</h1>
```

---

## 8. Accessibilité

- Contraste minimum : **4.5:1** pour le texte normal
- Contraste minimum : **3:1** pour le texte large
- Taille de texte minimum : **16px**
- Zones cliquables minimum : **44x44px**
