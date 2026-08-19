# Fond animé du hero — intégration dans `index.html`

Deux lignes à coller, rien d'autre. Aucune modification du HTML du hero, aucun
`<div>` à ajouter : le script fabrique lui-même son canvas et le place en
premier enfant de `.hero`.

**Rien n'a été touché dans `index.html`, `catalogue.html`, `jardinage.html` ni
`produit.html`.** Les fichiers livrés sont neufs.

---

## Les fichiers livrés

| Fichier | Rôle |
|---|---|
| `js/bg3d-naturesurvi.js` | le fond animé (WebGL écrit à la main, zéro dépendance) |
| `css/bg3d-naturesurvi.css` | l'habillage du hero **et** le décor de repli sans WebGL |
| `apercu-fond-3d.html` | page d'aperçu isolée, pour voir/mesurer sans toucher à la prod |
| `apercu-fond-3d-ordinateur.png` | capture réelle, 1440 × 820 |
| `apercu-fond-3d-mobile.png` | capture réelle, 390 × 844 (×2) |
| `apercu-fond-3d-repli-sans-webgl.png` | capture réelle du repli (`?bg3d=off`) |

---

## Étape 1 — la feuille de style

Dans `index.html`, **juste avant `</head>`**, donc APRÈS les deux blocs
`<style>` déjà présents (c'est important : la feuille doit gagner en cas
d'égalité de spécificité) :

```html
  <link rel="stylesheet" href="css/bg3d-naturesurvi.css">
</head>
```

## Étape 2 — le script

Dans `index.html`, **juste avant `</body>`**, après les scripts existants
(`products.js`, `cart.js`, `analytics.js`, `ui-dynamic.js`) :

```html
<script src="js/bg3d-naturesurvi.js" defer></script>
</body>
```

L'ordre par rapport aux autres scripts n'a aucune importance : celui-ci ne
touche à rien d'autre que `.hero`, ne déclare aucune variable globale sauf
`window.__bg3dns` (une sonde de diagnostic en lecture seule) et n'écoute que
des événements passifs.

C'est fini. Rien à changer dans le hero, ni dans `css/style.css` (que
`index.html` ne charge d'ailleurs pas).

---

## Ce qu'il faut vérifier après (2 minutes)

1. **Ouvrir `index.html`** : le hero est vert sombre, une frondaison de feuilles
   occupe le haut, des rais de lumière descendent depuis la gauche. Le fond
   apparaît en fondu ~1 s après le premier mouvement de souris (c'est voulu,
   voir « démarrage différé » plus bas).
2. **Console (F12)** : aucune erreur, aucun avertissement. Le script ne parle
   que s'il bascule en repli, et il le dit en clair : `Fond hero : rendu
   statique (WebGL indisponible)` par exemple.
3. **Cliquer les deux boutons** « Boutique Survie » et « Boutique Jardinage » :
   ils répondent. Le canvas est en `pointer-events: none`, il ne peut rien
   intercepter.
4. **Défiler** : la page défile normalement, le fond reste dans le hero et
   s'arrête dès que le hero sort de l'écran.
5. **Panier** : le badge `.cart-count` et le total de la navbar affichent
   toujours la même chose qu'avant. Ce script ne touche ni à `cart.js` ni au
   DOM de la navbar.
6. **`index.html?bg3d=off`** : le hero doit rester beau, sans canvas — c'est ce
   que voient les visiteurs sans WebGL.
7. **Téléphone** (ou barre d'outils mobile de Chrome) : mêmes vérifications.

---

## Les interrupteurs

| À faire | Comment |
|---|---|
| Couper le fond pour voir la page sans lui | `index.html?bg3d=off` |
| Le forcer là où il serait coupé | `index.html?bg3d=on` |
| Le couper définitivement sur téléphone | `MOBILE_3D: false` en haut de `js/bg3d-naturesurvi.js` |
| Le retirer complètement | enlever les deux lignes ajoutées ; il ne reste aucune trace |

---

## Ce que le fichier fait tout seul (les garde-fous)

- **Pas de WebGL, contexte perdu, boucle figée, machine sous 6 images/s** :
  le canvas est retiré, `<html>` reçoit la classe `bg3dns-static`, et le décor
  CSS reprend la main. Aucun trou, aucun écran noir.
- **Entre 6 et 12 images/s** : le tampon de rendu est réduit de moitié avant
  d'envisager la coupure.
- **`prefers-reduced-motion: reduce`** : le canvas n'est même pas créé.
- **Onglet caché, ou hero sorti de l'écran** (IntersectionObserver) : la boucle
  s'arrête. Rien ne tourne pendant que le visiteur lit une fiche produit.
- **Démarrage différé** : le contexte WebGL n'est ouvert qu'au premier geste du
  visiteur (souris, molette, défilement, touche, doigt), avec un repli
  automatique à 3,5 s. C'est le réglage qui, sur l'outil Client Fantôme, a fait
  passer Lighthouse de 78 à 100 sur ordinateur : ouvrir un contexte WebGL coûte
  300 à 570 ms de blocage, et ce blocage ne doit pas tomber pendant le
  chargement.
- **Budget de pixels plafonné** : 720 000 px sur ordinateur, 260 000 sur
  téléphone, boucle bridée à 30 / 22 images par seconde. Sur un écran 1920, le
  sous-échantillonnage descend tout seul à 0,53.

## Poids réel

| | brut | gzip | brotli (ce que sert Netlify) |
|---|---|---|---|
| `js/bg3d-naturesurvi.js` | 25 485 o | 9 508 o | **8 589 o** |
| `css/bg3d-naturesurvi.css` | 4 756 o | 1 833 o | **1 640 o** |
| **total ajouté à la page** | 30 241 o | 11 341 o | **10 229 o** |

Aucune image, aucune police, aucune requête vers un CDN. En 4G, ça se
télécharge pendant que le visiteur lit le titre — et de toute façon le décor
ne démarre qu'après le chargement.

## Contrastes mesurés (WCAG 2.1, pixels réels de la capture)

Méthode : le texte du hero est masqué (`visibility: hidden`, ce qui masque
aussi les emoji), on photographie le fond, on recompose les pastilles
semi-transparentes, puis on calcule le contraste **du pire pixel** de chaque
boîte de texte. Seuil visé : 4,5:1.

| Élément | Ordinateur 1280 | Téléphone 390 | Repli sans WebGL (téléphone) |
|---|---|---|---|
| Badge « Sélection printemps » (#a8d672) | 6,57 | 6,00 | 5,14 |
| Titre h1 (blanc) | 16,06 | 11,25 | 10,13 |
| « naturellement. » (#a8d672) | 9,36 | 9,25 | 9,08 |
| Paragraphe (blanc 85 %) | 12,14 | 11,01 | 10,13 |
| Chiffres 72 / 4,8 / 48h (#a8d672) | 9,85 | 9,40 | 8,36 |
| Légendes des chiffres (blanc 64 %) | 7,65 | 7,39 | 6,70 |
| Bouton « Boutique Jardinage » (blanc) | 12,19 | 12,32 | 10,62 |
| Bouton « Boutique Survie » | 10,17 — pastille opaque, indépendant du fond | | |

Le plus mauvais cas de tout le lot est à **5,14:1**. Pour comparaison, le hero
actuel du site, sans ce fichier, laisse le badge à **3,7:1** sur téléphone :
l'intégration améliore aussi ce point-là.

## Refaire les mesures soi-même

`apercu-fond-3d.html` sert à ça. Elle porte un `noindex`, n'est liée depuis
aucune page, et copie le hero d'`index.html` à l'identique.

- `apercu-fond-3d.html` — le rendu ;
- `apercu-fond-3d.html?mesure=1&boites=1` — le fond seul + les rectangles de
  texte, pour recalculer les contrastes ;
- `apercu-fond-3d.html?bg3d=off` — le repli.

Si elle gêne, elle peut être supprimée : rien ne pointe dessus.

Attention quand même : cette page et les trois PNG d'aperçu partiront sur
Netlify au prochain déploiement, comme tout le dossier. Ils ne sont liés nulle
part et la page est en `noindex`, mais si tu préfères un dépôt propre,
supprime `apercu-fond-3d.html` + les trois `apercu-fond-3d-*.png` une fois
l'intégration validée. Les deux fichiers qui comptent (`js/` et `css/`)
suffisent au fonctionnement.
