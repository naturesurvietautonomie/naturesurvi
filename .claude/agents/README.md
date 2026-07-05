# 🪖 L'Armée d'Agents — Ébrange Création Digital

Cette armée d'agents Claude Code couvre toutes les activités de la société **Ebrange Creation Digital** (SAS, RCS Paris 105 870 315) : la boutique NatureSurvi et les prestations pour clients (rédaction web, vidéo, sites internet).

## Comment ça marche

Chaque fichier `.md` de ce dossier définit un agent spécialisé. Claude Code les détecte automatiquement : il suffit de demander, en langage naturel, et le bon agent est mobilisé. On peut aussi nommer un agent explicitement (« demande au cartographe où sont les voix off »).

**Réflexe recommandé** : pour toute demande large ou multi-domaines, commencer par le `chef-de-projet` — il découpe le travail et désigne les agents à mobiliser.

## L'organigramme

```
                    ┌─────────────────────┐
                    │   chef-de-projet    │  ← pilote tout le monde
                    └──────────┬──────────┘
           ┌───────────────────┼───────────────────┐
           │                   │                   │
   ┌───────┴──────┐   ┌────────┴────────┐   ┌──────┴───────────┐
   │ cartographe  │   │ agent-commercial│   │agent-administratif│
   │ (sait où est │   │ (devis, offres) │   │ (juridique, CGV) │
   │ chaque fichier)  └─────────────────┘   └──────────────────┘
   └──────────────┘

   PÔLE E-COMMERCE          PÔLE MARKETING           PÔLE PRESTATIONS
   (NatureSurvi)            & ACQUISITION            CLIENTS
   ├─ boutique-produits     ├─ agent-tiktok          ├─ redacteur-web
   ├─ dev-site              ├─ agent-facebook        ├─ createur-video
   └─ backend-netlify       ├─ agent-instagram       └─ dev-web-clients
                            ├─ agent-pinterest
                            ├─ agent-seo-google
                            └─ agent-email-marketing
```

## Annuaire rapide

| Agent | Quand l'appeler |
|---|---|
| `chef-de-projet` | Demande large ou multi-domaines — il fait le plan et distribue |
| `cartographe` | « Où est… ? », « Où ranger… ? », mise à jour de `CARTOGRAPHIE.md` |
| `boutique-produits` | Ajouter/modifier/supprimer un produit, prix, marges, fournisseurs |
| `dev-site` | HTML/CSS/JS de la boutique NatureSurvi, bugs d'affichage, panier |
| `backend-netlify` | Stripe, webhook, CJdropshipping, fonctions Netlify |
| `agent-tiktok` | Scripts et vidéos TikTok, organisation des publications |
| `agent-facebook` | Posts et page Facebook |
| `agent-instagram` | Posts, Reels et grille Instagram |
| `agent-pinterest` | Épingles, `pinterest_pins.csv`, tableaux |
| `agent-seo-google` | Référencement, fiche Google, comparatifs, rss.xml |
| `agent-email-marketing` | Séquence emails post-achat, campagnes email |
| `redacteur-web` | Contenus écrits SEO pour les **clients** de l'entreprise |
| `createur-video` | Conception/production vidéo (NatureSurvi et clients) |
| `dev-web-clients` | Sites internet pour le compte de **tiers** |
| `agent-commercial` | Prospection, devis, offres de services |
| `agent-administratif` | Mentions légales, CGV, RGPD, facturation, obligations SAS |

## Règles communes à toute l'armée

1. Tout le monde répond en **français**.
2. La carte du projet est `CARTOGRAPHIE.md` (racine) — maintenue par le `cartographe`.
3. Prix et produits : `js/products.js`, `produit.html` (STRIPE_LINKS) et `netlify/functions/cj-map.js` restent toujours synchronisés.
4. Ton de marque : préparation sereine et autonomie — jamais anxiogène.
5. Jamais de secret (clés Stripe, identifiants) en dur dans le code.
