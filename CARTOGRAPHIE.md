# 🗺️ CARTOGRAPHIE — Ébrange Création Digital / NatureSurvi

> Carte officielle des dossiers et fichiers, maintenue par l'agent `cartographe` (`.claude/agents/cartographe.md`).
> Dernière mise à jour : 05/07/2026.

## Vue d'ensemble

- **Entreprise** : Ebrange Creation Digital, SAS — RCS Paris 105 870 315.
- **Organisation locale** (poste de la fondatrice) : `C:\Users\angel\Desktop\Entreprises\Ebrange_Creation_Digital\Activites\<Activité>\`
- **Ce dépôt** = l'activité **NatureSurvi** (boutique naturesurvie.net), hébergée sur Netlify.

## 🌐 Site web (racine du dépôt)

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil |
| `catalogue.html` | Boutique univers **Survie** |
| `jardinage.html` | Boutique univers **Jardinage** |
| `produit.html` | Fiche produit (contient la table `STRIPE_LINKS`) |
| `panier.html` | Panier |
| `merci.html` | Confirmation après achat |
| `about.html` | À propos (histoire, fondatrice) |
| `cgv.html` | CGV + mentions légales (conformes Kbis) |
| `rss.xml` | Flux RSS |

## 🎨 Assets du site

| Emplacement | Contenu |
|---|---|
| `css/style.css` | Feuille de style unique du site |
| `js/products.js` | **Base de données produits** (~119 produits : prix, variantes, liens Stripe) |
| `js/cart.js` | Logique du panier (badge `.cart-count`, total navbar) |
| `js/analytics.js` | Suivi analytique |
| `js/ui-dynamic.js` | Animations UI (composants 21st.dev) |
| `images/jardinage/`, `images/jardinage2/` | Photos produits jardinage |
| `images/pinterest/`, `images/pinterest_jardinage/` | Visuels épingles utilisés par le site |
| `img/` | Autres images produits (ex. `prod2.jpg`) |
| `videos/` | Vidéos intégrées au site |

## ⚙️ Backend (Netlify)

| Fichier | Rôle |
|---|---|
| `netlify.toml` | Configuration du déploiement Netlify |
| `netlify/functions/create-checkout.js` | Création de session de paiement Stripe |
| `netlify/functions/stripe-webhook.js` | Paiement validé → commande CJdropshipping |
| `netlify/functions/cj-map.js` | Correspondance produits ↔ CJdropshipping (119/123 mappés) |
| `netlify/functions/email-sequence.js` | Déclenchement des emails post-achat |

## 📱 Marketing & réseaux sociaux

### `TikTok/` (canal principal)
| Emplacement | Contenu |
|---|---|
| `TikTok/Scripts/` | Scripts vidéos et voix off (`SCRIPTS_TIKTOK.txt`, `SCRIPTS_VOIXOFF.txt`, un fichier par vidéo) |
| `TikTok/Videos_En_Attente/` | Vidéos montées, prêtes à publier |
| `TikTok/Videos_Publiees/` | Vidéos en ligne (+ `Archives_Versions/`) |
| `TikTok/Videos_Survie2/3/4` | Rushs campagnes Survie (`surv2_01.mp4`…) |
| `TikTok/Videos_Jardinage2/3` | Rushs campagnes Jardinage (`jard2_01.mp4`…) |
| `TikTok/Voix_Off/` + `TikTok/vo_*.mp3` | Pistes voix off par campagne |
| `TikTok/Fonds_Video/` | Fonds vidéo (forêt jour / forêt nuit) |
| `TikTok/Images_IA/` | Images IA (`Jardinage/`, `Survie_V8/`) + `logo_tiktok.png` |
| `TikTok/Images_Jardinage/` | Photos jardinage (`img_jard_01.jpg`…) |

### Autres canaux
| Emplacement | Contenu |
|---|---|
| `Facebook/` | `PAGE_FACEBOOK.txt`, `POSTS_FACEBOOK.txt`, `POSTS_JARDINAGE.txt`, bannière + visuels |
| `Instagram/` | Visuels de posts (pack 72h, essentiels, Opinel, jardinage balcon, flashlight) |
| `Pinterest/` | `pinterest_pins.csv` (import en masse), visuels dans `Pinterest/img/` et à la racine |
| `Google/` | `vitrine_google.jpg` (fiche Google Business) |
| `emails-marketing/` | Séquence : `email1-bienvenue`, `email2-colis-en-route`, `email3-avis`, `email4-upsell` (HTML) |
| `Comparatifs/` | `NatureSurvi_Comparatif_COMPLET.html` (SEO) + `generate_full_comparatif.js` |
| `Videos_En_Attente/` (racine) | Vidéos en attente hors TikTok |

## 📄 Documents & configuration

| Fichier | Rôle |
|---|---|
| `FOURNISSEURS.md` | Guide fournisseurs (BigBuy, VidaXL, Webdrop Market), marketing, hébergement |
| `CARTOGRAPHIE.md` | Cette carte |
| `.claude/agents/` | L'armée d'agents de l'entreprise (voir `.claude/agents/README.md`) |
| `.vscode/launch.json` | Configuration de debug VS Code |

## 📦 Conventions de rangement

- Nouvelle vidéo TikTok montée → `TikTok/Videos_En_Attente/` ; une fois publiée → `TikTok/Videos_Publiees/` (anciennes versions → `Archives_Versions/`).
- Nouveaux rushs → dossier de campagne `TikTok/Videos_<Univers><N>/`, numérotés.
- Nouveau visuel réseau social → dossier de la plateforme (`Facebook/`, `Instagram/`, `Pinterest/img/`).
- Nouveau produit → photo dans `images/` ou `img/`, entrée dans `js/products.js` + `produit.html` + `netlify/functions/cj-map.js`.
- Nouveau client (prestations) → nouveau dossier d'activité (demander au `cartographe`).
