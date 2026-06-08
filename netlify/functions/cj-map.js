// ─────────────────────────────────────────────────────────────────────────────
// CJ_MAP.js — Mapping produits NatureSurvi → CJDropshipping
// ─────────────────────────────────────────────────────────────────────────────
//
// COMMENT TROUVER LES IDs CJ :
//   1. Connecte-toi sur app.cjdropshipping.com
//   2. Va dans "My Products" → clique sur un produit
//   3. Dans l'URL tu vois : /product/detail?pid=CJXXXXXX  → c'est le pid
//   4. Dans la page produit, clique sur la variante voulue
//      L'URL change avec &vid=CJVXXXXXX → c'est le vid
//   5. Si le produit n'a qu'une seule variante, pid = vid généralement
//
// FORMAT : { pid: "CJXXXXXX", vid: "CJVXXXXXX" }
//   - pid : Product ID CJ (obligatoire pour identifier le produit)
//   - vid : Variant ID CJ (obligatoire pour passer la commande)
//
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {

  // ── Boutique JARDINAGE (IDs 101-136) ──────────────────────────────────────

  101: { pid: "", vid: "" }, // Set d'outils de jardinage 3 pièces        — 23€
  102: { pid: "", vid: "" }, // Bêche de jardin professionnelle            — 30€
  103: { pid: "", vid: "" }, // Sécateur professionnel à lame franche      — 22€
  104: { pid: "", vid: "" }, // Serre de balcon 4 étagères                 — 36€
  105: { pid: "", vid: "" }, // Mini serre tunnel de jardin 6m²            — 59€
  106: { pid: "", vid: "" }, // Composteur de jardin 300L                  — 47€
  107: { pid: "", vid: "" }, // Lombricomposteur 3 niveaux                 — 44€
  108: { pid: "", vid: "" }, // Arrosoir 10L bec long en zinc              — 27€
  109: { pid: "", vid: "" }, // Kit goutte-à-goutte 50 plantes             — 32€
  110: { pid: "", vid: "" }, // Carré potager surélevé en bois 120x60cm   — 50€
  111: { pid: "", vid: "" }, // Tour à fraises & plantes aromatiques       — 22€
  112: { pid: "", vid: "" }, // Filet anti-insectes 2x5m                  — 19€
  113: { pid: "", vid: "" }, // Voile d'hivernage 30g/m² - 10x2m          — 17€
  114: { pid: "", vid: "" }, // Débroussailleuse électrique filaire 600W   — 52€
  115: { pid: "", vid: "" }, // Débroussailleuse sans fil batterie 20V     — 79€
  116: { pid: "", vid: "" }, // Taille-haie électrique 450W 45cm          — 47€
  117: { pid: "", vid: "" }, // Souffleur-aspirateur de feuilles 2800W     — 42€
  118: { pid: "", vid: "" }, // Tondeuse à gazon électrique 1400W 32cm    — 91€
  119: { pid: "", vid: "" }, // Scarificateur aérateur 2-en-1 1300W       — 69€
  120: { pid: "", vid: "" }, // Coupe-bordures électrique 350W             — 33€
  121: { pid: "", vid: "" }, // Pulvérisateur à pression 16L sur roues    — 39€
  122: { pid: "", vid: "" }, // Bâche de jardin imperméable 4x6m          — 30€
  123: { pid: "", vid: "" }, // Brouette pliante en acier galvanisé 100L  — 59€
  124: { pid: "", vid: "" }, // Sécateur Pro Tête Rotative                — 7€
  125: { pid: "", vid: "" }, // Étagère Plantes Multi-niveaux Nordique    — 32€
  126: { pid: "", vid: "" }, // Lampe Solaire Jardin 3 Têtes IP65          — 32€
  127: { pid: "", vid: "" }, // Gants de jardinage résistants aux épines  — 9€
  128: { pid: "", vid: "" }, // Arrosoir en acier galvanisé               — 22€
  129: { pid: "", vid: "" }, // Serre de jardin tunnel modulable           — 39€
  130: { pid: "", vid: "" }, // Tuteurs pour plantes et tomates            — 9€
  131: { pid: "", vid: "" }, // Terreau universel potager bio              — 12€
  132: { pid: "", vid: "" }, // Kit semences potager 20 légumes            — 10€
  133: { pid: "", vid: "" }, // Composteur de jardin 300L (grande gamme)  — 35€
  134: { pid: "", vid: "" }, // Kit irrigation goutte à goutte 30 plantes — 12€
  135: { pid: "", vid: "" }, // Pots géotextiles pour potager              — 12€
  136: { pid: "", vid: "" }, // Programmateur d'arrosage automatique       — 22€

  // ── Boutique SURVIE — produits éventuellement sourcés sur CJ (IDs 1-99) ───
  // (laisser vide si sourcé sur BigBuy — le webhook utilise BigBuy en priorité)
  // Exemple : 7: { pid: "CJXXXXXX", vid: "CJVXXXXXX" }, // Couteau de survie

};
