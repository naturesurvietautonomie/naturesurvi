# SEO Quick Wins — NatureSurvi (naturesurvie.net)

> Rédigé par l'agent **SEO & Google** — 11/07/2026.
> Objectif : croissance du trafic organique **sans refonte** et **sans toucher au checkout/paiement**.
> Périmètre audité réellement : `index.html`, `catalogue.html`, `jardinage.html`, `produit.html`, `about.html`, `cgv.html`, `panier.html`, `merci.html`, `js/products.js`, `js/cart.js`, `rss.xml`, `Comparatifs/`, `netlify.toml`.

---

## 1. Audit express (factuel)

| Élément | État constaté | Verdict |
|---|---|---|
| **Titles** | Présents sur toutes les pages, mais construits « marque d'abord » (`Catalogue Survie & Préparation — Nature Survie & Autonomie`). Le mot-clé d'achat arrive tard et la marque (26 car.) mange la longueur utile. | À réécrire (mot-clé en tête) |
| **Meta description** | Présentes et correctes sur index / catalogue / jardinage / about / cgv / panier. Avec CTA « Livraison gratuite dès 50€ ». **Absente sur `merci.html`** (peu grave, page non indexable). | Bon, ajustements mineurs |
| **Hn** | 1 seul `<h1>` par page, cohérent. `<h1>` catalogue/jardinage commencent par un emoji (🎒/🌱) — sans impact SEO négatif majeur. | OK |
| **Images / alt** | `jardinage.html` : 32 images, **toutes avec `alt`**. Cartes produit (`renderProductCard` dans `cart.js`) : `alt="${product.name}"` + `width/height` (bon pour le CLS). `index.html` / `catalogue.html` : images injectées en JS, donc `alt` = nom du produit (générique, sans contexte géo/usage). | Bon, alt enrichissables |
| **Données structurées (schema.org)** | **AUCUNE** sur tout le site (0 bloc `application/ld+json`). Pourtant `products.js` contient tout le nécessaire : `name`, `price`, `description`, `rating`, `reviews`, `category`. | **Manque majeur — fort ROI** |
| **Canonical** | **Absente sur toutes les pages** (0 balise `canonical`). Risque de duplication d'URL (ex. `?id=` / paramètres de tracking). | À ajouter |
| **Sitemap / robots** | **Aucun `sitemap.xml`, aucun `robots.txt`** avant cette intervention. Seul `rss.xml` existait. → **créés** (voir §3). | Corrigé |
| **Fiches produit** | `produit.html` est **rendu côté client** : `title`, `meta description` et `alt` sont injectés en JS depuis `products.js` (title générique `Produit — Nature Survie` dans le HTML statique). Google exécute le JS mais c'est un risque (pas de fallback statique, pas de pré-rendu). | À sécuriser avec dev-site |
| **RSS** | `rss.xml` est **désynchronisé du catalogue réel** : item `id=1` annonce « Lampe frontale rechargeable LED — 27,99€ » alors que `products.js` id=1 = Velamp à 15€ (variantes 20/24€) ; item `id=3` = « Couverture de survie » alors que `products.js` id=3 = « Lanterne MIL-TEC ». Seulement 10 items pour 133 produits. | **À régénérer** |
| **Open Graph** | Présent (index, catalogue, jardinage). MAIS `og:image` → `https://naturesurvie.net/images/og-cover.jpg` qui **n'existe pas** (`images/og-cover.jpg` absent). Aperçus sociaux cassés. | **À corriger** |
| **Comparatif** | ⚠️ `Comparatifs/NatureSurvi_Comparatif_COMPLET.html` **n'est PAS une page SEO publique** : c'est un **document interne** affichant `Prix vente / Achat (prix fournisseur) / Marge %`. Avec `publish = "."` dans `netlify.toml`, il était **accessible publiquement** et indexable. → `noindex` ajouté + `Disallow` dans robots.txt (voir §3). **Ne jamais le lier depuis le site.** | **Risque corrigé** |
| **Blog / contenu informationnel** | **Aucun** : uniquement pages produit/catégorie. Zéro contenu ciblant les requêtes « comment choisir… / meilleur… ». | Gros gisement de trafic |
| **Vitesse perçue** | CSS inline + `loading="lazy"` sur images + `width/height` sur cartes = bon socle. Fonts Google chargées en externe (2 familles). | Correct |
| **NAP / cohérence** | Marque « Nature Survie & Autonomie », exploitant « Ebrange Creation Digital SAS, RCS Paris » cohérent entre `about.html` et `cgv.html`. | OK |

---

## 2. Les 10 quick wins priorisés (impact / effort)

| # | Quick win | Impact | Effort | Qui |
|---|---|:---:|:---:|---|
| 1 | **`robots.txt` + `sitemap.xml`** (indexation + protection du doc de marges interne) | Élevé | Faible | ✅ **Fait** |
| 2 | **Protéger le comparatif interne** (`noindex` + `Disallow`) pour ne pas exposer les marges/prix fournisseurs sur Google | Élevé (risque) | Faible | ✅ **Fait** |
| 3 | **Données structurées `Product` + `Offer` + `AggregateRating`** sur `produit.html` (données déjà dans `products.js`) → étoiles/prix dans Google | Élevé | Moyen | dev-site (snippet §3) |
| 4 | **Réécrire les `title`/`meta` des pages stratégiques** (mot-clé d'intention d'achat en tête) | Élevé | Faible | prêt à copier §3 |
| 5 | **Régénérer `rss.xml` depuis `products.js`** (corriger prix/produits désynchronisés) | Moyen | Faible | SEO + dev-site |
| 6 | **Ajouter les URLs produit au `sitemap.xml`** (génération auto depuis `products.js`) | Moyen | Moyen | dev-site |
| 7 | **Créer/uploader `images/og-cover.jpg`** (1200×630) pour réparer les aperçus sociaux | Moyen | Faible | design |
| 8 | **Balise `canonical`** sur chaque page (self-canonical) pour neutraliser les paramètres d'URL | Moyen | Faible | dev-site |
| 9 | **Créer 2-3 pages de contenu** « comment choisir / meilleur … » (guides d'achat, voir §4) avec maillage vers les fiches | Élevé | Moyen | rédacteur-web |
| 10 | **Enrichir les fiches produit** (300-400 mots utiles : usages, entretien, FAQ) + fallback `<title>` statique par catégorie | Moyen | Moyen | boutique-produits |

---

## 3. Les quick wins les plus rentables — réalisés / prêts à copier

### ✅ Quick win nº1 — `robots.txt` + `sitemap.xml` (fait)

Créés à la racine (servie publiquement, `publish = "."`) :
- `robots.txt` : autorise le site, **bloque `/Comparatifs/`, `/netlify/`, `/emails-marketing/`**, panier/merci, et déclare le sitemap.
- `sitemap.xml` : pages publiques (accueil, catalogue, jardinage, about, cgv) + note pour ajouter les URLs produit.

**Action de suivi (humain)** : après déploiement, soumettre `https://naturesurvie.net/sitemap.xml` dans Google Search Console.

### ✅ Quick win nº2 — Protection du comparatif interne (fait)

`Comparatifs/NatureSurvi_Comparatif_COMPLET.html` affiche les **marges et prix d'achat fournisseur** et était accessible en ligne.
- Ajout de `<meta name="robots" content="noindex, nofollow">` dans le HTML **et** dans le générateur `generate_full_comparatif.js` (durabilité lors d'une régénération).
- `Disallow: /Comparatifs/` dans `robots.txt`.
- **Recommandation forte** : idéalement, ne pas déployer ce dossier du tout (à voir avec dev-site / backend-netlify). Ne JAMAIS créer de lien vers ce fichier depuis le site.

### 🅰️ Quick win nº3 — Données structurées produit (prêt à intégrer, à confier à dev-site)

À injecter dynamiquement dans `produit.html`, dans la fonction qui remplit la fiche (juste après `document.getElementById('page-desc').content = product.description;`, lignes ~579 / ~1279). **Additif, ne touche ni au panier ni au checkout Stripe :**

```js
// --- Données structurées SEO (schema.org Product) ---
(function injectProductSchema(){
  var ratingBlock = product.rating ? {
    "@type": "AggregateRating",
    "ratingValue": product.rating,
    "reviewCount": product.reviews || 1
  } : undefined;
  var jsonld = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": "https://naturesurvie.net/" + product.image,
    "description": product.description,
    "category": product.category,
    "brand": { "@type": "Brand", "name": "Nature Survie & Autonomie" },
    "offers": {
      "@type": "Offer",
      "url": "https://naturesurvie.net/produit.html?id=" + product.id,
      "priceCurrency": "EUR",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    }
  };
  if (ratingBlock) jsonld.aggregateRating = ratingBlock;
  var s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(jsonld);
  document.head.appendChild(s);
})();
```

> Note conformité : n'afficher `AggregateRating` que pour les produits ayant de vrais avis. Les `rating`/`reviews` de `products.js` doivent correspondre à des avis réels affichés sur la page (Google sanctionne les étoiles fictives).

### 🅱️ Quick win nº4 — Titles & metas réécrits (prêts à copier)

Mot-clé d'intention en tête, marque en fin, ≤ 60 caractères, description 140-160 car. avec CTA.

**`index.html`**
```html
<title>Kit survie & autonomie — matériel testé | NatureSurvi</title>
<meta name="description" content="Kits de survie, éclairage, jardinage et autosuffisance. Équipements testés pour préparer votre autonomie au quotidien. Livraison gratuite dès 50€.">
```

**`catalogue.html`**
```html
<title>Kit survie 72h, couteaux, réchauds & éclairage | NatureSurvi</title>
<meta name="description" content="Boutique survie : kits 72h, couteaux, réchauds, tentes, lampes et rations. Matériel fiable pour le terrain et les situations d'urgence. Livraison offerte dès 50€.">
```

**`jardinage.html`**
```html
<title>Potager, composteur & outils de jardin bio | NatureSurvi</title>
<meta name="description" content="Carrés potager, composteurs d'appartement, serres et outils pour cultiver en autonomie, même sur balcon. Sélection bio et durable. Livraison gratuite dès 50€.">
```

**`about.html`**
```html
<title>Notre histoire & mission autonomie | NatureSurvi</title>
```

> Ces réécritures sont **prêtes à coller** mais non appliquées (le contenu visible et la structure des `<head>` sont partagés avec dev-site). À valider/poser avec dev-site pour rester cohérent multi-pages.

---

## 4. Mini-plan de contenu SEO (5 sujets à fort potentiel)

Pages/guides à créer (format article, maillage interne vers les fiches et catégories concernées). Intention informationnelle → capte le haut de tunnel et alimente les fiches produit.

1. **« Kit de survie 72h : la checklist complète (que mettre dedans) »**
   → cible « kit survie 72h », « sac d'évacuation ». Maille vers couteaux, lampes, réchauds, rations du catalogue.
2. **« Comment choisir sa lampe frontale rechargeable (lumens, autonomie, usages) »**
   → cible « meilleure lampe frontale survie », « lampe frontale rechargeable ». Maille vers la catégorie Éclairage.
3. **« Composteur d'appartement : lequel choisir en 2026 (lombricomposteur vs bokashi) »**
   → cible « composteur appartement », « lombricomposteur balcon ». Maille vers Jardinage.
4. **« Carré potager sur balcon : guide débutant pour cultiver en ville »**
   → cible « carré potager balcon », « potager balcon débutant ». Maille vers serres/carrés potager.
5. **« Autonomie électrique nomade : batteries et panneaux solaires portables »**
   → cible « batterie solaire camping », « panneau solaire portable survie ». Maille vers l'énergie solaire du catalogue.

> Chaque article = 1 intention principale, ~1000-1500 mots utiles d'abord (naturel, non bourré de mots-clés), 3-5 liens internes contextuels, 1 encart « Nos produits recommandés » vers les fiches. À confier à `rédacteur-web`.

---

## Récapitulatif fichiers touchés/créés

- ✅ Créé : `robots.txt`
- ✅ Créé : `sitemap.xml`
- ✅ Modifié : `Comparatifs/NatureSurvi_Comparatif_COMPLET.html` (ajout `noindex`)
- ✅ Modifié : `Comparatifs/generate_full_comparatif.js` (ajout `noindex` — durable à la régénération)
- 📄 Non appliqué (proposé ici) : schema.org produit, réécritures title/meta, canonical, régénération RSS, `og-cover.jpg`, sitemap produits.

**Rien mis en ligne. Aucune modification du panier, du checkout ou des fonctions Stripe/Netlify.**
