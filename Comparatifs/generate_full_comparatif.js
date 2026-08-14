const fs = require('fs');
const path = require('path');

// Le chemin d'origine pointait vers un espace de travail Genspark qui n'existe
// plus : ce script ne tournait donc plus du tout. Il lit maintenant le catalogue
// du dépôt, à côté de lui.
const racine = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(racine, 'js/products.js'), 'utf8');
eval(src.split('const CATEGORIES')[0].replace('const PRODUCTS', 'var PRODUCTS'));

// Les prix d'achat ont été SORTIS de js/products.js le 14/08/2026 : ce fichier
// est servi publiquement, et 119 prix fournisseur y étaient lisibles par
// n'importe quel visiteur — la marge de chaque produit se calculait en deux
// lignes. C'était le même secret que /Comparatifs/ protège depuis le 11/07,
// qui sortait par la porte de service.
// Ils vivent désormais ici, dans un dossier déjà coupé du web par _redirects.
const PRIX_ACHAT = JSON.parse(fs.readFileSync(path.join(__dirname, 'prix-achat.json'), 'utf8'));
const achatDe = (id) => {
  const v = PRIX_ACHAT[String(id)];
  return Array.isArray(v) ? v[0] : (v || 0);
};

const survie = PRODUCTS.filter(p => p.id < 80);
const jardinage = PRODUCTS.filter(p => p.id >= 80);

function getVariants(p) {
  if (p.variants && p.variants.length > 0) return p.variants;
  return [{ label: 'Standard', price: p.price, supplierPrice: achatDe(p.id) }];
}

function analyse(prods) {
  let rows = [], ca = 0, profit = 0, hm = [];
  prods.forEach(p => {
    getVariants(p).forEach(v => {
      const achat = v.supplierPrice || achatDe(p.id) || 0;
      const prix = v.price || p.price;
      const marge = achat > 0 ? Math.round((prix - achat) / prix * 100) : 0;
      if (marge < 15) { hm.push({ id: p.id, name: p.name, label: v.label, prix, achat, marge }); return; }
      ca += prix; profit += (prix - achat);
      rows.push({ id: p.id, name: p.name, label: v.label || '', prix, achat, marge });
    });
  });
  return { rows, ca: Math.round(ca), profit: Math.round(profit), hm };
}

const s = analyse(survie);
const j = analyse(jardinage);
const total = { ca: s.ca + j.ca, profit: s.profit + j.profit };
const allHM = [...s.hm, ...j.hm];

function margeColor(m) {
  if (m >= 40) return '#1b5e20';
  if (m >= 25) return '#2d5016';
  if (m >= 15) return '#f57f17';
  return '#c62828';
}
function margeBg(m) {
  if (m >= 40) return '#e8f5e9';
  if (m >= 25) return '#f1f8e9';
  if (m >= 15) return '#fff8e1';
  return '#ffebee';
}

function tableRows(rows) {
  return rows.map(r => `
    <tr>
      <td style="color:#666;font-size:0.8rem;">id${r.id}</td>
      <td style="font-weight:600;">${r.name}</td>
      <td style="color:#555;">${r.label}</td>
      <td style="font-weight:700;color:#2d5016;">${r.prix}€</td>
      <td style="color:#888;">${r.achat.toFixed(2)}€</td>
      <td style="font-weight:700;color:${margeColor(r.marge)};background:${margeBg(r.marge)};border-radius:4px;padding:2px 6px;">${r.marge}%</td>
    </tr>`).join('');
}

const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8">
<meta name="robots" content="noindex, nofollow">
<title>NatureSurvi — Comparatif Prix Complet</title>
<style>
  body { font-family: 'Segoe UI', sans-serif; background: #f5f5f5; color: #333; margin: 0; padding: 20px; }
  h1 { color: #2d5016; text-align: center; margin-bottom: 4px; }
  .subtitle { text-align:center; color:#888; font-size:0.9rem; margin-bottom:30px; }
  .stats { display:flex; gap:16px; flex-wrap:wrap; justify-content:center; margin-bottom:30px; }
  .stat { background:white; border-radius:12px; padding:16px 24px; text-align:center; box-shadow:0 2px 8px rgba(0,0,0,0.08); min-width:130px; }
  .stat-num { font-size:2rem; font-weight:800; color:#2d5016; }
  .stat-lbl { font-size:0.8rem; color:#888; }
  h2 { color:#2d5016; border-left:4px solid #d4a55a; padding-left:12px; margin-top:40px; }
  table { width:100%; border-collapse:collapse; background:white; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08); margin-bottom:30px; }
  th { background:#2d5016; color:white; padding:10px 12px; text-align:left; font-size:0.85rem; }
  td { padding:8px 12px; border-bottom:1px solid #f0f0f0; font-size:0.85rem; }
  tr:hover td { background:#fafaf5; }
  .hm-table td { color:#c62828; }
  .hm-table th { background:#c62828; }
</style>
</head><body>
<h1>🌿 NatureSurvi — Comparatif Prix Complet</h1>
<p class="subtitle">Généré le ${new Date().toLocaleDateString('fr-FR')} — ${s.rows.length + j.rows.length} variantes valides | ${allHM.length} hors marché</p>

<div class="stats">
  <div class="stat"><div class="stat-num">${s.rows.length + j.rows.length}</div><div class="stat-lbl">Variantes valides</div></div>
  <div class="stat"><div class="stat-num">${total.ca}€</div><div class="stat-lbl">CA potentiel</div></div>
  <div class="stat"><div class="stat-num">${total.profit}€</div><div class="stat-lbl">Profit potentiel</div></div>
  <div class="stat"><div class="stat-num">${Math.round(total.profit/total.ca*100)}%</div><div class="stat-lbl">Marge moyenne</div></div>
  <div class="stat"><div class="stat-num">${s.rows.length}</div><div class="stat-lbl">Variantes survie</div></div>
  <div class="stat"><div class="stat-num">${j.rows.length}</div><div class="stat-lbl">Variantes jardinage</div></div>
  <div class="stat"><div class="stat-num">${s.ca}€</div><div class="stat-lbl">CA survie</div></div>
  <div class="stat"><div class="stat-num">${j.ca}€</div><div class="stat-lbl">CA jardinage</div></div>
</div>

<h2>🏕️ Boutique Survie (${s.rows.length} variantes — CA ${s.ca}€ — Profit ${s.profit}€ — Marge ${Math.round(s.profit/s.ca*100)}%)</h2>
<table>
  <thead><tr><th>ID</th><th>Produit</th><th>Variante</th><th>Prix vente</th><th>Achat</th><th>Marge</th></tr></thead>
  <tbody>${tableRows(s.rows)}</tbody>
</table>

<h2>🌱 Boutique Jardinage (${j.rows.length} variantes — CA ${j.ca}€ — Profit ${j.profit}€ — Marge ${Math.round(j.profit/j.ca*100)}%)</h2>
<table>
  <thead><tr><th>ID</th><th>Produit</th><th>Variante</th><th>Prix vente</th><th>Achat</th><th>Marge</th></tr></thead>
  <tbody>${tableRows(j.rows)}</tbody>
</table>

${allHM.length > 0 ? `
<h2 style="color:#c62828;">⛔ Variantes Hors Marché (${allHM.length} — marge &lt;15%)</h2>
<table class="hm-table">
  <thead><tr><th>ID</th><th>Produit</th><th>Variante</th><th>Prix vente</th><th>Achat</th><th>Marge</th></tr></thead>
  <tbody>${tableRows(allHM)}</tbody>
</table>` : '<p style="color:#2e7d32;font-weight:700;text-align:center;font-size:1.1rem;">✅ Aucune variante hors marché !</p>'}

</body></html>`;

fs.writeFileSync('C:/Users/angel/Desktop/NatureSurvi_Comparatif_COMPLET.html', html);
console.log('✅ Comparatif généré : C:/Users/angel/Desktop/NatureSurvi_Comparatif_COMPLET.html');
console.log(`\nSURVIE   : ${s.rows.length} variantes | CA ${s.ca}€ | Profit ${s.profit}€ | Marge ${Math.round(s.profit/s.ca*100)}%`);
console.log(`JARDINAGE: ${j.rows.length} variantes | CA ${j.ca}€ | Profit ${j.profit}€ | Marge ${Math.round(j.profit/j.ca*100)}%`);
console.log(`TOTAL    : ${s.rows.length+j.rows.length} variantes | CA ${total.ca}€ | Profit ${total.profit}€ | Marge ${Math.round(total.profit/total.ca*100)}%`);
if (allHM.length > 0) {
  console.log(`\n⚠️ ${allHM.length} variantes hors marché :`);
  allHM.forEach(r => console.log(`  - id${r.id} "${r.name}" ${r.label} : ${r.prix}€ (achat ${r.achat}€, marge ${r.marge}%)`));
}
