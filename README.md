# 🌿 NatureSurvi — Boutique E-commerce

> **Préparez-vous. Naturellement.**

Boutique e-commerce statique spécialisée en autosuffisance, survie et jardinage. Conçue avec un design orienté conversion (option B agressive).

## 📁 Structure du projet

```
naturesurvi/
├── css/
│   └── style.css          # Feuille de styles complète (responsive, animations, accessibilité)
├── js/
│   ├── products.js        # Base de données des 20 produits + fonctions utilitaires
│   └── cart.js            # Logique panier (localStorage) + wishlist + UI dynamique
├── index.html             # Page d'accueil (hero, catégories, best-sellers, témoignages, newsletter)
├── catalogue.html         # Catalogue complet (filtres, tri, 20 produits)
├── about.html             # Page à propos (histoire, valeurs, stats)
├── panier.html            # Page panier complète (récapitulatif, quantités, total)
└── README.md              # Ce fichier
```

## 🎨 Branding

| Élément | Valeur |
|---------|--------|
| **Nom** | NatureSurvi |
| **Slogan** | Préparez-vous. Naturellement. |
| **Logo** | 🌿 + texte |
| **Typo titres** | Merriweather (Google Fonts) |
| **Typo corps** | Nunito (Google Fonts) |
| **Vert foncé** | `#2d5016` |
| **Vert moyen** | `#4a7c2d` |
| **Vert clair** | `#7ab648` |
| **Terre** | `#8b5e3c` |
| **Crème** | `#f5f0e8` |
| **Orange CTA** | `#e8622a` |

## 🛒 Fonctionnalités

### Conversion (Option B — Agressive)
- ⚡ **Barre d'urgence** avec countdown dynamique ("Offre flash -15%")
- 🏷️ **Badges produits** : Bio, Promo, Bestseller, Nouveau, Essentiel
- 🔒 **Barre de confiance** : livraison gratuite >50€, satisfait ou remboursé, paiement sécurisé
- 👥 **Social proof** : "1 247 clients satisfaits"
- 🔔 **Toast notifications** animées à l'ajout au panier
- 📦 **Panier drawer** (panneau latéral glissant)
- 👁️ **Modal produit** avec détails complets
- 📬 **Newsletter** avec incentive (-10% code NATURE10)
- ❤️ **Wishlist/favoris** avec persistance localStorage

### Technique
- 📱 **Responsive design** mobile-first (breakpoints: 480px, 768px, 992px)
- ♿ **Accessibilité** : skip link, aria labels, focus states, semantic HTML
- 🔍 **SEO** : meta tags, Open Graph, JSON-LD structured data
- ⚡ **Performance** : lazy loading images, preconnect Google Fonts
- 🎨 **Micro-animations** CSS : hover effects, transitions, keyframes
- 💾 **Persistance** : panier et favoris via localStorage
- 🔝 **Back-to-top** button animé
- 🍔 **Menu burger** responsive avec animation

### Catalogue
- 🏷️ **Filtres par catégorie** : Survie, Jardinage, Énergie, Conservation, Outils, Formation
- 📊 **Tri** : Popularité, Prix ↑↓, Notes, Avis, Nom A-Z
- 🔗 **Deep linking** : `catalogue.html?cat=Survie` filtre directement la catégorie
- 🔄 **URL dynamique** sans rechargement de page

### Panier
- ➕➖ Modification des quantités
- 🗑️ Suppression d'articles individuels ou vidage complet
- 📊 Récapitulatif avec sous-total, économies, livraison, total
- 🚚 Indicateur livraison gratuite (seuil 50€)
- 💳 Bouton commande (démo)

## 📦 Les 20 produits

| # | Nom | Prix | Catégorie |
|---|-----|------|-----------|
| 1 | Kit de survie complet 72h | 89,90 € | Survie |
| 2 | Purificateur d'eau LifeStraw | 29,90 € | Survie |
| 3 | Couteau bushcraft Mora Companion | 24,90 € | Outils |
| 4 | Kit de graines potager 4 saisons | 34,90 € | Jardinage |
| 5 | Bac potager surélevé 120x60cm | 79,90 € | Jardinage |
| 6 | Lampe solaire rechargeable 3-en-1 | 19,90 € | Énergie |
| 7 | Panneau solaire portable 60W | 129,90 € | Énergie |
| 8 | Déshydrateur alimentaire 5 plateaux | 69,90 € | Conservation |
| 9 | Kit de bocaux conserves (12 pcs) | 39,90 € | Conservation |
| 10 | Hache de survie multi-usage 38cm | 44,90 € | Outils |
| 11 | Tente ultra-légère 2 personnes | 149,90 € | Survie |
| 12 | Filtre à eau gravité 10L | 59,90 € | Survie |
| 13 | Composteur rotatif 160L | 89,90 € | Jardinage |
| 14 | Serre de jardin tunnel 3x2m | 119,90 € | Jardinage |
| 15 | Batterie externe solaire 20000mAh | 39,90 € | Énergie |
| 16 | Réchaud portable multi-combustible | 49,90 € | Survie |
| 17 | Kit premiers secours IFAK | 54,90 € | Survie |
| 18 | Sécateur professionnel bypass | 22,90 € | Jardinage |
| 19 | Gourde isotherme inox 1L | 27,90 € | Survie |
| 20 | Guide de survie illustré (livre) | 18,90 € | Formation |

## 🚀 Utilisation

1. **Ouvrir** `index.html` dans un navigateur moderne
2. Aucune installation requise — tout est en HTML/CSS/JS statique
3. Les données sont stockées localement via `localStorage`

### Serveur local (optionnel)

Pour éviter les restrictions CORS sur certains navigateurs :

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## 🛠️ Technologies

- HTML5 sémantique
- CSS3 (variables, grid, flexbox, animations, media queries)
- JavaScript vanilla (ES6+, no framework)
- Google Fonts (Merriweather + Nunito)
- placehold.co pour les images placeholder
- localStorage pour la persistance des données

## 📄 Licence

Projet de démonstration — NatureSurvi © 2024
