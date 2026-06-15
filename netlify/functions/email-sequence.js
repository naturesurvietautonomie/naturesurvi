// Netlify Scheduled Function — Séquence email post-achat
// Tourne toutes les heures, lit Airtable, envoie J+0/J+3/J+7/J+14
// Schedule défini dans netlify.toml

const https = require('https');

const AIRTABLE_TOKEN   = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID  || 'app7O3sIqJe5Nrb4g';
const AIRTABLE_TABLE_ID= process.env.AIRTABLE_TABLE_ID || 'tblRId6CsJPzLXUnh';
const RESEND_API_KEY   = process.env.RESEND_API_KEY;

// Délais en ms
const DELAY_J0  = 0;
const DELAY_J3  = 3  * 24 * 60 * 60 * 1000;
const DELAY_J7  = 7  * 24 * 60 * 60 * 1000;
const DELAY_J14 = 14 * 24 * 60 * 60 * 1000;
const TOLERANCE = 2  * 60 * 60 * 1000; // ±2h de tolérance

// ─── Handler principal ────────────────────────────────────────────────────────
exports.handler = async function(event, context) {
  console.log('📧 email-sequence — démarrage', new Date().toISOString());

  if (!AIRTABLE_TOKEN || !RESEND_API_KEY) {
    console.log('⚠️ Variables manquantes — skip');
    return { statusCode: 200, body: 'skip' };
  }

  try {
    // Récupérer toutes les commandes des 20 derniers jours
    const records = await getAirtableOrders();
    console.log(`📋 ${records.length} commande(s) trouvée(s)`);

    let sent = 0;
    const now = Date.now();

    for (const record of records) {
      const f = record.fields;
      const email     = f['Email client'];
      const client    = f['Client'] || '';
      const dateStr   = f['Date'];
      const stripeRef = f['Référence Stripe'] || record.id;
      const produits  = f['Produits'] || '';
      const montant   = f['Montant (€)'] || 0;

      if (!email || !dateStr) continue;

      const orderDate = new Date(dateStr).getTime();
      const elapsed   = now - orderDate;

      // Email J+0 : immédiat (dans les 2h après la commande)
      if (!f['Email J0 envoyé'] && elapsed >= DELAY_J0 && elapsed < DELAY_J0 + TOLERANCE) {
        await sendEmail({
          to: email, name: client,
          subject: 'Bienvenue dans la communauté NatureSurvi 🌿',
          html: buildEmail1(client)
        });
        await updateAirtable(record.id, { 'Email J0 envoyé': true });
        sent++;
        console.log(`✅ J+0 envoyé → ${email}`);
      }

      // Email J+3
      if (!f['Email J3 envoyé'] && elapsed >= DELAY_J3 && elapsed < DELAY_J3 + TOLERANCE) {
        await sendEmail({
          to: email, name: client,
          subject: 'Ton colis est en route — tire-en le maximum 📦',
          html: buildEmail2(client)
        });
        await updateAirtable(record.id, { 'Email J3 envoyé': true });
        sent++;
        console.log(`✅ J+3 envoyé → ${email}`);
      }

      // Email J+7
      if (!f['Email J7 envoyé'] && elapsed >= DELAY_J7 && elapsed < DELAY_J7 + TOLERANCE) {
        await sendEmail({
          to: email, name: client,
          subject: 'Tu as reçu ta commande ? On aimerait ton avis ⭐',
          html: buildEmail3(client)
        });
        await updateAirtable(record.id, { 'Email J7 envoyé': true });
        sent++;
        console.log(`✅ J+7 envoyé → ${email}`);
      }

      // Email J+14
      if (!f['Email J14 envoyé'] && elapsed >= DELAY_J14 && elapsed < DELAY_J14 + TOLERANCE) {
        await sendEmail({
          to: email, name: client,
          subject: '2 semaines — comment ça se passe ? 🎒',
          html: buildEmail4(client)
        });
        await updateAirtable(record.id, { 'Email J14 envoyé': true });
        sent++;
        console.log(`✅ J+14 envoyé → ${email}`);
      }
    }

    console.log(`📧 Séquence terminée — ${sent} email(s) envoyé(s)`);
    return { statusCode: 200, body: JSON.stringify({ sent }) };

  } catch (e) {
    console.error('❌ Erreur email-sequence:', e.message);
    return { statusCode: 500, body: e.message };
  }
};

// ─── Airtable — Récupérer commandes récentes ─────────────────────────────────
function getAirtableOrders() {
  // Filtre : commandes des 20 derniers jours
  const since = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString();
  const formula = encodeURIComponent(`IS_AFTER({Date}, '${since}')`);
  const fields = [
    'Email client', 'Client', 'Date', 'Référence Stripe', 'Produits', 'Montant (€)',
    'Email J0 envoyé', 'Email J3 envoyé', 'Email J7 envoyé', 'Email J14 envoyé'
  ].map(f => `fields[]=${encodeURIComponent(f)}`).join('&');

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.airtable.com',
      path: `/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}?filterByFormula=${formula}&${fields}`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${AIRTABLE_TOKEN}` }
    };
    let data = '';
    const req = https.request(options, res => {
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.records || []);
        } catch { reject(new Error('Airtable GET JSON invalide: ' + data)); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// ─── Airtable — Mettre à jour un record ──────────────────────────────────────
function updateAirtable(recordId, fields) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ fields });
    const options = {
      hostname: 'api.airtable.com',
      path: `/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${recordId}`,
      method: 'PATCH',
      headers: {
        'Authorization':  `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    let data = '';
    const req = https.request(options, res => {
      res.on('data', d => data += d);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── Resend — Envoyer un email ────────────────────────────────────────────────
function sendEmail({ to, name, subject, html }) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      from:    'NatureSurvi <commandes@naturesurvie.net>',
      to:      [to],
      subject,
      html
    });
    const options = {
      hostname: 'api.resend.com',
      path:     '/emails',
      method:   'POST',
      headers: {
        'Authorization':  `Bearer ${RESEND_API_KEY}`,
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    let resp = '';
    const req = https.request(options, res => {
      res.on('data', d => resp += d);
      res.on('end', () => resolve(resp));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ─── Templates HTML ───────────────────────────────────────────────────────────
function prenom(name) {
  return (name || '').split(' ')[0] || 'toi';
}

function emailWrapper(content) {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f7f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f4;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);max-width:600px;width:100%;">
<tr><td style="background:linear-gradient(135deg,#2d6a4f 0%,#1b4332 100%);padding:36px 40px;text-align:center;">
  <h1 style="margin:0;color:#fff;font-size:24px;font-weight:800;">🌿 NatureSurvi</h1>
  <p style="margin:6px 0 0;color:#b7e4c7;font-size:13px;">Autonomie · Survie · Nature</p>
</td></tr>
${content}
<tr><td style="background:#f8fdf9;border-top:1px solid #e8f5e9;padding:20px 40px;text-align:center;">
  <p style="margin:0;color:#999;font-size:12px;line-height:1.7;">NatureSurvi · <a href="https://naturesurvie.net" style="color:#2d6a4f;">naturesurvie.net</a><br>
  Tu reçois cet email car tu as passé une commande sur notre boutique.</p>
</td></tr>
</table></td></tr></table></body></html>`;
}

function buildEmail1(name) {
  return emailWrapper(`
<tr><td style="padding:36px 40px 20px;">
  <h2 style="margin:0 0 12px;color:#1b4332;font-size:21px;">Bienvenue ${prenom(name)} ! 🎉</h2>
  <p style="margin:0 0 20px;color:#444;font-size:15px;line-height:1.7;">Ta commande est confirmée — merci pour ta confiance.<br>Tu fais maintenant partie des gens qui prennent leur <strong style="color:#2d6a4f;">autonomie au sérieux</strong>.</p>
</td></tr>
<tr><td style="padding:0 40px 20px;">
  <div style="background:#f0faf4;border-left:4px solid #2d6a4f;border-radius:0 8px 8px 0;padding:18px 22px;margin-bottom:14px;">
    <strong style="color:#1b4332;font-size:14px;">🎒 Prépare ton sac de 72h</strong>
    <p style="margin:6px 0 0;color:#555;font-size:13px;line-height:1.6;">Eau, nourriture, lampe frontale, trousse de secours, couverture de survie. Le strict minimum pour tenir 3 jours en autonomie.</p>
  </div>
  <div style="background:#f0faf4;border-left:4px solid #2d6a4f;border-radius:0 8px 8px 0;padding:18px 22px;margin-bottom:14px;">
    <strong style="color:#1b4332;font-size:14px;">🗺️ Identifie tes ressources locales</strong>
    <p style="margin:6px 0 0;color:#555;font-size:13px;line-height:1.6;">Eau, forêt, voisins de confiance. Cartographie ton environnement immédiat — c'est là que tout commence.</p>
  </div>
  <div style="background:#f0faf4;border-left:4px solid #2d6a4f;border-radius:0 8px 8px 0;padding:18px 22px;">
    <strong style="color:#1b4332;font-size:14px;">📱 Rejoins la communauté TikTok</strong>
    <p style="margin:6px 0 0;color:#555;font-size:13px;line-height:1.6;">Conseils, tutos et retours d'expérience sur <strong>@nature_survie_fr</strong>.</p>
  </div>
</td></tr>
<tr><td style="padding:0 40px 36px;text-align:center;">
  <a href="https://www.tiktok.com/@nature_survie_fr" style="display:inline-block;background:#2d6a4f;color:#fff;text-decoration:none;padding:13px 30px;border-radius:8px;font-size:14px;font-weight:700;">🎯 Rejoindre la communauté</a>
</td></tr>`);
}

function buildEmail2(name) {
  return emailWrapper(`
<tr><td style="padding:36px 40px 20px;text-align:center;">
  <div style="font-size:44px;margin-bottom:16px;">📦</div>
  <h2 style="margin:0 0 12px;color:#1b4332;font-size:21px;">Ton colis est en route, ${prenom(name)} !</h2>
  <p style="margin:0 0 20px;color:#444;font-size:15px;line-height:1.7;">Tu recevras un email avec ton numéro de tracking dès que ton colis est expédié.</p>
</td></tr>
<tr><td style="padding:0 40px 20px;">
  <h3 style="margin:0 0 14px;color:#1b4332;font-size:16px;">En attendant — tire le maximum de ton achat :</h3>
  <div style="border-bottom:1px solid #f0f0f0;padding:12px 0;"><strong style="color:#1b4332;font-size:14px;">🔋 Première charge complète</strong><p style="margin:4px 0 0;color:#666;font-size:13px;line-height:1.5;">Pour tout produit rechargeable, fais une charge complète à 100% avant première utilisation. Ça prolonge la durée de vie de la batterie.</p></div>
  <div style="border-bottom:1px solid #f0f0f0;padding:12px 0;"><strong style="color:#1b4332;font-size:14px;">🧪 Teste avant d'en avoir besoin</strong><p style="margin:4px 0 0;color:#666;font-size:13px;line-height:1.5;">Une lampe qui ne s'allume pas en pleine forêt, c'est problématique. Teste dans des conditions normales d'abord.</p></div>
  <div style="padding:12px 0;"><strong style="color:#1b4332;font-size:14px;">📋 Range-le toujours au même endroit</strong><p style="margin:4px 0 0;color:#666;font-size:13px;line-height:1.5;">En situation de stress, ton cerveau n'a pas à chercher — il sait.</p></div>
</td></tr>
<tr><td style="padding:0 40px 36px;text-align:center;">
  <a href="https://naturesurvie.net/catalogue.html" style="display:inline-block;background:#2d6a4f;color:#fff;text-decoration:none;padding:13px 30px;border-radius:8px;font-size:14px;font-weight:700;">🛒 Voir d'autres équipements essentiels</a>
  <p style="margin:14px 0 0;color:#888;font-size:13px;">Un problème avec ta commande ? Réponds directement à cet email.</p>
</td></tr>`);
}

function buildEmail3(name) {
  return emailWrapper(`
<tr><td style="padding:36px 40px 20px;text-align:center;">
  <div style="font-size:44px;margin-bottom:16px;">⭐</div>
  <h2 style="margin:0 0 12px;color:#1b4332;font-size:21px;">Tu as reçu ta commande, ${prenom(name)} ?</h2>
  <p style="margin:0;color:#444;font-size:15px;line-height:1.7;">J'espère que tout est arrivé en parfait état !<br>Un petit avis nous aide <strong style="color:#2d6a4f;">énormément</strong>.</p>
</td></tr>
<tr><td style="padding:0 40px 20px;">
  <div style="background:#fffbea;border:2px solid #f59e0b;border-radius:12px;padding:22px;text-align:center;">
    <p style="margin:0 0 8px;color:#92400e;font-size:13px;font-weight:600;">TON AVIS EN 30 SECONDES</p>
    <div style="font-size:32px;margin-bottom:12px;">★ ★ ★ ★ ★</div>
    <p style="margin:0 0 14px;color:#555;font-size:13px;line-height:1.6;">Chaque avis aide d'autres personnes à trouver les bons équipements pour leur autonomie.</p>
    <a href="https://www.tiktok.com/@nature_survie_fr" style="display:inline-block;background:#f59e0b;color:#fff;text-decoration:none;padding:11px 26px;border-radius:8px;font-size:13px;font-weight:700;">⭐ Laisser un avis</a>
  </div>
</td></tr>
<tr><td style="padding:16px 40px 36px;">
  <div style="background:#fff5f5;border-left:4px solid #e53e3e;border-radius:0 8px 8px 0;padding:18px 22px;">
    <strong style="color:#c53030;font-size:14px;">Quelque chose ne va pas ?</strong>
    <p style="margin:6px 0 8px;color:#666;font-size:13px;line-height:1.6;">Colis abîmé, produit défectueux — réponds à cet email. On règle ça immédiatement.</p>
    <a href="mailto:naturesurvi@gmail.com" style="color:#c53030;font-size:13px;font-weight:600;text-decoration:none;">→ Contacter le support</a>
  </div>
</td></tr>`);
}

function buildEmail4(name) {
  return emailWrapper(`
<tr><td style="padding:36px 40px 20px;">
  <h2 style="margin:0 0 12px;color:#1b4332;font-size:21px;">2 semaines — comment ça se passe, ${prenom(name)} ? 🎒</h2>
  <p style="margin:0;color:#444;font-size:15px;line-height:1.7;">Beaucoup de nos clients complètent leur kit après leur premier achat. Voilà les 4 essentiels qu'ils ajoutent en priorité :</p>
</td></tr>
<tr><td style="padding:0 40px 20px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
      <table width="100%"><tr>
        <td width="44" style="font-size:28px;vertical-align:middle;">☀️</td>
        <td style="vertical-align:middle;"><strong style="color:#1b4332;font-size:14px;">Station d'énergie solaire</strong><p style="margin:3px 0 0;color:#666;font-size:13px;">Recharge tout sans prise. Indispensable coupures de courant.</p></td>
        <td width="70" style="text-align:right;vertical-align:middle;"><a href="https://naturesurvie.net/produit.html?id=90" style="background:#2d6a4f;color:#fff;text-decoration:none;padding:7px 12px;border-radius:6px;font-size:12px;font-weight:700;">Voir →</a></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
      <table width="100%"><tr>
        <td width="44" style="font-size:28px;vertical-align:middle;">🧰</td>
        <td style="vertical-align:middle;"><strong style="color:#1b4332;font-size:14px;">Trousse de secours 35 pièces</strong><p style="margin:3px 0 0;color:#666;font-size:13px;">Pansements, compresses, couverture survie. La base.</p></td>
        <td width="70" style="text-align:right;vertical-align:middle;"><a href="https://naturesurvie.net/produit.html?id=75" style="background:#2d6a4f;color:#fff;text-decoration:none;padding:7px 12px;border-radius:6px;font-size:12px;font-weight:700;">Voir →</a></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
      <table width="100%"><tr>
        <td width="44" style="font-size:28px;vertical-align:middle;">🔦</td>
        <td style="vertical-align:middle;"><strong style="color:#1b4332;font-size:14px;">Lampe frontale rechargeable</strong><p style="margin:3px 0 0;color:#666;font-size:13px;">Mains libres, USB-C, 8h autonomie.</p></td>
        <td width="70" style="text-align:right;vertical-align:middle;"><a href="https://naturesurvie.net/produit.html?id=1" style="background:#2d6a4f;color:#fff;text-decoration:none;padding:7px 12px;border-radius:6px;font-size:12px;font-weight:700;">Voir →</a></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:10px 0;">
      <table width="100%"><tr>
        <td width="44" style="font-size:28px;vertical-align:middle;">💧</td>
        <td style="vertical-align:middle;"><strong style="color:#1b4332;font-size:14px;">Gourde filtrante 0.65L</strong><p style="margin:3px 0 0;color:#666;font-size:13px;">Bois depuis n'importe quelle source. Filtre 4000L.</p></td>
        <td width="70" style="text-align:right;vertical-align:middle;"><a href="https://naturesurvie.net/produit.html?id=79" style="background:#2d6a4f;color:#fff;text-decoration:none;padding:7px 12px;border-radius:6px;font-size:12px;font-weight:700;">Voir →</a></td>
      </tr></table>
    </td></tr>
  </table>
</td></tr>
<tr><td style="padding:0 40px 36px;text-align:center;">
  <a href="https://naturesurvie.net/catalogue.html" style="display:inline-block;background:#2d6a4f;color:#fff;text-decoration:none;padding:14px 34px;border-radius:8px;font-size:15px;font-weight:700;">🛒 Voir tous les essentiels</a>
</td></tr>`);
}
