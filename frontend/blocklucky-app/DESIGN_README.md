# BlockLucky - Site Web Moderne

Site web moderne et responsive pour BlockLucky, construit avec React et Tailwind CSS dans un style minimaliste inspiré d'Apple, Stripe et Notion.

## 🎨 Design

- **Style** : Minimaliste, épuré et professionnel
- **Typographie** : 
  - Inter pour le contenu
  - Montserrat pour les titres
- **Palette de couleurs** :
  - Fond clair (blanc, gris 50)
  - Accents bleu/violet (primary & accent)
  - Gradients subtils
- **Éléments** :
  - Coins arrondis
  - Ombres légères
  - Transitions fluides
  - Animations au scroll

## 📁 Structure

```
src/
├── components/
│   ├── Hero.jsx          # Section héro avec CTA
│   ├── Features.jsx      # Grille de fonctionnalités
│   ├── About.jsx         # Section "À propos"
│   ├── CTA.jsx           # Appel à l'action
│   └── layout/
│       ├── Header.jsx    # Header fixe avec navigation
│       └── Footer.jsx    # Footer avec liens
├── App.jsx               # Composant principal
├── index.css             # Styles globaux
└── main.jsx             # Point d'entrée
```

## 🚀 Fonctionnalités

### Header
- Navigation fixe avec effet au scroll
- Menu responsive (mobile + desktop)
- Logo avec gradient
- Bouton CTA

### Hero
- Section plein écran avec titre accrocheur
- Deux boutons CTA
- Statistiques visuelles
- Badge animé
- Indicateurs de confiance

### Features
- Grille responsive (1/2/3 colonnes)
- 6 cartes de fonctionnalités avec icônes
- Effets hover élégants
- Animations au scroll

### About
- Layout à 2 colonnes
- Statistiques clés
- Illustration visuelle
- Badge flottant

### CTA
- Fond en dégradé
- Deux boutons d'action
- Indicateurs de confiance
- Design immersif

### Footer
- 5 colonnes responsive
- Liens sociaux
- Sections organisées (Produit, Entreprise, Légal)
- Copyright et crédits

## 🛠️ Technologies

- **React 19.2.0** - Framework UI
- **Tailwind CSS 4.1.17** - Framework CSS utilitaire
- **Vite 7.2.2** - Build tool
- **Lucide React** - Icônes modernes

## 📦 Installation

\`\`\`bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Build de production
npm build

# Prévisualisation du build
npm run preview
\`\`\`

## ✨ Caractéristiques

### Responsive
- Mobile-first approach
- Breakpoints : sm, md, lg
- Menu mobile avec toggle
- Grilles adaptatives

### Accessible
- Labels ARIA
- Navigation au clavier
- Contraste des couleurs
- Structure sémantique

### Performance
- Lazy loading
- Optimisation des images
- CSS minimal
- Animations performantes

### UX
- Scroll smooth
- Bouton retour en haut
- Animations au scroll
- Transitions fluides
- États hover/focus

## 🎯 Hiérarchie Visuelle

1. **Titres** : Police Montserrat, grande taille, gras
2. **Sous-titres** : Police Inter, taille moyenne
3. **Corps** : Police Inter, taille normale
4. **CTAs** : Gradients de couleur, ombres prononcées
5. **Cartes** : Fond blanc, ombres légères, hover accentué

## 📱 Responsive Breakpoints

- **Mobile** : < 768px (1 colonne)
- **Tablet** : 768px - 1024px (2 colonnes)
- **Desktop** : > 1024px (3 colonnes)

## 🎨 Palette de Couleurs

\`\`\`js
primary: {
  50-900: Bleu (du plus clair au plus foncé)
}

accent: {
  50-900: Violet (du plus clair au plus foncé)
}

gray: {
  50-900: Nuances de gris
}
\`\`\`

## 📝 Notes

- Le design est inspiré des meilleurs sites modernes (Apple, Stripe, Notion)
- Toutes les animations sont optimisées pour la performance
- Le site est 100% responsive et accessible
- Les gradients et ombres sont utilisés avec parcimonie

## 🔗 Navigation

- `#hero` - Section héro
- `#features` - Fonctionnalités
- `#about` - À propos
- `#footer` - Contact/Footer

## 📄 Licence

© 2025 BlockLucky. Tous droits réservés.
