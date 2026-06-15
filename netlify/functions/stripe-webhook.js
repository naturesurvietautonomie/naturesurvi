// Netlify Function — Stripe Webhook + BigBuy + CJDropshipping + TikTok
// Paiement Stripe → commande auto BigBuy (survie) ou CJ (jardinage) → email → TikTok tracking

const https  = require('https');
const crypto = require('crypto');
const CJ_MAP = require('./cj-map');

// ─── Mapping BigBuy — produits Survie (IDs 1-99) ─────────────────────────────
const BIGBUY_SKU_MAP = {
  1:      "velamp-5w-350lm",
  "1_1":  "velamp-6w-400lm",
  3:      "mil-tec-olive-led",
  4:      "nebo-einstein-250lm",
  5:      "opinel-n8-inox",
  "5_1":  "opinel-n9-carbone",
  "5_2":  "opinel-n10-inox",
  "5_3":  "opinel-n12-inox",
  8:      "pelle-pliable-noire",
  "8_1":  "cellfast-ideal-pro",
  9:      "bestway-tente-2p",
  "9_1":  "bestway-tente-3p",
  "9_2":  "bestway-tente-4p",
  12:     "couverture-survie-fungo",
  13:     "malette-secours-cony",
  14:     "rechaud-open-norte",
  15:     "black-diamond-spot-400",
  16:     "brennenstuhl-200lm",
  18:     "glaciere-marbueno",
  19:     "stak-1200lm",
  21:     "mammut-cargon-40l",
  "21_1": "mammut-cargon-90l",
  22:     "mammut-alto-24l",
  23:     "reebok-noah",
  24:     "varta-chargeur-universel",
  25:     "varta-piles-rechargeables",
  26:     "duracell-aaa-12",
  28:     "deeper-start",
  29:     "kali-kunnan-300cm",
  "29_1": "kali-kunnan-240cm",
  31:     "kali-kunnan-boite",
  32:     "sunstech-4k",
  33:     "sk8-elite",
  34:     "xiaomi-band",
  35:     "alphaventure-kaki",
  "35_1": "turch-kaki",
  37:     "black-diamond-casque",
  38:     "kong-sierra-duo",
  39:     "schildkrot-slackline",
  40:     "trekneat-pain",
  41:     "trekneat-cereales",
  42:     "naak-caramel",
  43:     "joluvi-25l",
  44:     "pro-performance-55l",
  45:     "casio-gshock",
  46:     "casio-diver-100m",
  47:     "casio-a158wea",
  48:     "trekneat-hamburger",
  49:     "trekneat-chocolat",
  50:     "trekneat-legumes",
  51:     "regatta-rce557-800",
  "51_1": "picture-campei-blanc",
  52:     "picture-campei-blanc"
};

// CJ_MAP importé depuis ./cj-map.js — édite ce fichier pour ajouter les IDs CJ

// ─── TikTok Events API ────────────────────────────────────────────────────────
async function sendTikTokPurchaseEvent({ email, amount, currency, orderId, ip, userAgent }) {
  const PIXEL_ID = 'D88TMA3C77UFPET8DG4G';
  const ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN || 'afebe1d85ac0cf79ceb8e9cd97a7236b7b8c284d';
  const emailHash = crypto.createHash('sha256').update((email || '').trim().toLowerCase()).digest('hex');
  const payload = {
    pixel_code: PIXEL_ID,
    event: 'CompletePayment',
    event_time: Math.floor(Date.now() / 1000),
    user: { email: [emailHash], ip: ip || '', user_agent: userAgent || '' },
    properties: { value: parseFloat(amount) || 0, currency: (currency || 'EUR').toUpperCase() },
    page: { url: 'https://naturesurvie.net/merci.html' },
    event_id: orderId || `ns-${Date.now()}`
  };
  return new Promise((resolve) => {
    const body = JSON.stringify({ data: [payload] });
    const options = {
      hostname: 'business-api.tiktok.com',
      path: '/open_api/v1.3/pixel/track/',
      method: 'POST',
      headers: { 'Access-Token': ACCESS_TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };
    let data = '';
    const req = https.request(options, res => { res.on('data', d => data += d); res.on('end', () => resolve(data)); });
    req.on('error', () => resolve(null));
    req.write(body);
    req.end();
  });
}

// ─── Vérification signature Stripe ───────────────────────────────────────────
function verifyStripeSignature(payload, sigHeader, secret) {
  const parts = sigHeader.split(',');
  let timestamp = '';
  const signatures = [];
  for (const part of parts) {
    const [key, val] = part.split('=');
    if (key === 't') timestamp = val;
    if (key === 'v1') signatures.push(val);
  }
  if (!timestamp || signatures.length === 0) return false;
  const signed = `${timestamp}.${payload}`;
  const expected = crypto.createHmac('sha256', secret).update(signed, 'utf8').digest('hex');
  return signatures.some(sig => {
    try { return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex')); }
    catch { return false; }
  });
}

// ─── Handler principal ────────────────────────────────────────────────────────
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = event.headers['stripe-signature'];

  let stripeEvent;
  try {
    if (webhookSecret && sig) {
      if (!verifyStripeSignature(event.body, sig, webhookSecret)) {
        console.error('Signature Stripe invalide');
        return { statusCode: 400, body: 'Invalid signature' };
      }
    }
    stripeEvent = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  if (stripeEvent.type !== 'checkout.session.completed' &&
      stripeEvent.type !== 'payment_intent.succeeded') {
    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  }

  const session = stripeEvent.data.object;

  // ── Infos client ──
  const customerEmail = session.customer_details?.email || session.receipt_email || '';
  const customerName  = session.customer_details?.name  || '';
  const amount        = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';
  const currency      = (session.currency || 'eur').toUpperCase();
  const paymentId     = session.id;

  // ── Adresse de livraison ──
  const shipping = session.shipping_details || session.shipping;
  let address = null;
  if (shipping?.address) {
    const a = shipping.address;
    address = {
      firstName:   (shipping.name || customerName).split(' ')[0] || 'Client',
      lastName:    (shipping.name || customerName).split(' ').slice(1).join(' ') || 'NatureSurvi',
      phone:       session.customer_details?.phone || '0600000000',
      email:       customerEmail,
      address:     a.line1 || '',
      addressMore: a.line2 || '',
      postcode:    a.postal_code || '',
      city:        a.city || '',
      country:     a.country || 'FR'
    };
  }

  // ── Récupérer les line items Stripe avec métadonnées produit ──
  let lineItems = [];
  try {
    const liData = await stripeApiGet(
      `/v1/checkout/sessions/${paymentId}/line_items?limit=20&expand[]=data.price.product`
    );
    lineItems = liData.data || [];
  } catch (e) {
    console.error('Erreur récupération line items:', e.message);
  }

  // ── Trier les produits par fournisseur ──────────────────────────────────────
  // Règles :
  //   IDs 1-99  → BigBuy en priorité. Si pas dans BIGBUY_SKU_MAP → essai CJ_MAP → sinon manuel
  //   IDs 100+  → CJ en priorité. Si pas dans CJ_MAP (ou vid vide) → sinon manuel
  const bigbuyItems  = [];
  const cjItems      = [];
  const unknownItems = [];

  for (const item of lineItems) {
    const nsId = getNsProductId(item);
    const qty  = item.quantity || 1;
    const name = item.description || (nsId ? `Produit #${nsId}` : 'Produit inconnu');

    if (!nsId) {
      unknownItems.push({ name, qty, reason: 'ns_product_id manquant dans Stripe' });
      continue;
    }

    const numId = parseInt(nsId);

    if (numId >= 100) {
      // Jardinage → CJDropshipping
      const cjRef = CJ_MAP[numId];
      if (cjRef && cjRef.vid) {
        cjItems.push({ nsId: numId, pid: cjRef.pid, vid: cjRef.vid, qty, name });
      } else {
        unknownItems.push({ name, qty, nsId: numId, reason: 'CJ_MAP vide — ajouter pid/vid dans cj-map.js' });
      }
    } else {
      // Survie → BigBuy en priorité
      const sku = BIGBUY_SKU_MAP[numId] || BIGBUY_SKU_MAP[String(nsId)] || null;
      if (sku) {
        bigbuyItems.push({ sku, qty, name });
      } else {
        // Fallback : essayer CJ_MAP pour les produits survie aussi sourcés sur CJ
        const cjRef = CJ_MAP[numId];
        if (cjRef && cjRef.vid) {
          cjItems.push({ nsId: numId, pid: cjRef.pid, vid: cjRef.vid, qty, name });
        } else {
          unknownItems.push({ name, qty, nsId: numId, reason: 'Ni BIGBUY_SKU_MAP ni CJ_MAP — à commander manuellement' });
        }
      }
    }
  }

  // ── Passer commande BigBuy (produits survie) ──
  let bigbuyOrderId = null;
  if (address && bigbuyItems.length > 0 && process.env.BIGBUY_API_KEY) {
    try {
      bigbuyOrderId = await createBigBuyOrder({ address, items: bigbuyItems, paymentId });
      console.log('✅ Commande BigBuy créée:', bigbuyOrderId);
    } catch (e) {
      console.error('❌ Erreur BigBuy:', e.message);
    }
  }

  // ── Passer commande CJDropshipping (produits jardinage) ──
  let cjOrderId = null;
  if (address && cjItems.length > 0 && process.env.CJ_API_EMAIL && process.env.CJ_API_PASSWORD) {
    try {
      cjOrderId = await createCJOrder({ address, items: cjItems, paymentId });
      console.log('✅ Commande CJ créée:', cjOrderId);
    } catch (e) {
      console.error('❌ Erreur CJ:', e.message);
    }
  } else if (cjItems.length > 0) {
    console.log('⚠️ CJ skip — CJ_API_EMAIL ou CJ_API_KEY manquant dans les variables Netlify');
  }

  // ── Envoyer email récap ──
  const addrText = address
    ? `${address.firstName} ${address.lastName}\n${address.address}\n${address.postcode} ${address.city}\n${address.country}`
    : 'Non fournie';

  const emailLines = [
    `🛒 NOUVELLE COMMANDE NATURESURVIE.NET`,
    ``,
    `Client  : ${customerName}`,
    `Email   : ${customerEmail}`,
    `Montant : ${amount} ${currency}`,
    ``,
    `Adresse de livraison :`,
    addrText,
    ``,
    `ID Paiement Stripe : ${paymentId}`,
    `Dashboard : https://dashboard.stripe.com/payments/${paymentId}`,
    ``,
    `─── Fournisseurs ───`,
  ];

  if (bigbuyItems.length > 0) {
    emailLines.push(`BigBuy (${bigbuyItems.length} réf.) : ${bigbuyOrderId ? '✅ #' + bigbuyOrderId : '❌ Échec — passer manuellement'}`);
    bigbuyItems.forEach(i => emailLines.push(`  • ${i.name} x${i.qty} [${i.sku}]`));
  }
  if (cjItems.length > 0) {
    emailLines.push(`CJDropshipping (${cjItems.length} réf.) : ${cjOrderId ? '✅ #' + cjOrderId : '❌ Échec — passer manuellement'}`);
    cjItems.forEach(i => emailLines.push(`  • ${i.name} x${i.qty} [pid:${i.pid}]`));
  }
  if (unknownItems.length > 0) {
    emailLines.push(`⚠️ Produits sans fournisseur mappé (à commander manuellement) :`);
    unknownItems.forEach(i => emailLines.push(`  • ${i.name} x${i.qty}${i.reason ? ' — ' + i.reason : ''}`));
  }

  const emailBody = emailLines.join('\n');
  console.log(emailBody);

  const allAuto   = (bigbuyItems.length === 0 || bigbuyOrderId) && (cjItems.length === 0 || cjOrderId);
  const hasManual = unknownItems.length > 0 || (bigbuyItems.length > 0 && !bigbuyOrderId) || (cjItems.length > 0 && !cjOrderId);
  const statusTag = allAuto && !hasManual ? '✅ Auto' : hasManual ? '⚠️ Partiel' : '✅ Auto';

  if (process.env.RESEND_API_KEY) {
    // Email interne récap (toi)
    try {
      await sendResendEmail({
        to:      ['naturesurvi@gmail.com'],
        subject: `🛒 Commande ${amount}€ — NatureSurvi ${statusTag}`,
        text:    emailBody
      });
    } catch (e) {
      console.error('Erreur Resend récap:', e.message);
    }

    // Email confirmation client
    if (customerEmail) {
      try {
        const itemsRows = lineItems.map(item => {
          const unitPrice = item.amount_total ? (item.amount_total / item.quantity / 100).toFixed(2) : '0.00';
          const totalItem = item.amount_total ? (item.amount_total / 100).toFixed(2) : '0.00';
          return `
            <tr>
              <td style="padding:10px 8px;border-bottom:1px solid #f0f0f0;color:#333;">${item.description || 'Produit'}</td>
              <td style="padding:10px 8px;border-bottom:1px solid #f0f0f0;text-align:center;color:#555;">${item.quantity}</td>
              <td style="padding:10px 8px;border-bottom:1px solid #f0f0f0;text-align:right;color:#333;">${unitPrice}€</td>
              <td style="padding:10px 8px;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600;color:#2d6a4f;">${totalItem}€</td>
            </tr>`;
        }).join('');

        const shippingCost = session.total_details?.amount_shipping
          ? (session.total_details.amount_shipping / 100).toFixed(2)
          : '0.00';
        const subtotalAmount = session.amount_subtotal
          ? (session.amount_subtotal / 100).toFixed(2)
          : amount;

        const addrHtml = address
          ? `${address.firstName} ${address.lastName}<br>${address.address}${address.addressMore ? '<br>' + address.addressMore : ''}<br>${address.postcode} ${address.city}<br>${address.country}`
          : 'Non fournie';

        const htmlConfirmation = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:30px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#2d6a4f,#40916c);padding:35px 40px;text-align:center;">
          <h1 style="margin:0;color:#fff;font-size:26px;letter-spacing:1px;">🌿 NatureSurvi</h1>
          <p style="margin:8px 0 0;color:#b7e4c7;font-size:14px;">naturesurvie.net</p>
        </td></tr>

        <!-- Titre -->
        <tr><td style="padding:35px 40px 20px;text-align:center;">
          <div style="font-size:48px;margin-bottom:12px;">✅</div>
          <h2 style="margin:0;color:#2d6a4f;font-size:22px;">Commande confirmée !</h2>
          <p style="margin:10px 0 0;color:#666;font-size:15px;">Merci ${customerName ? customerName.split(' ')[0] : ''} pour votre achat.</p>
          <p style="margin:6px 0 0;color:#999;font-size:13px;">Référence : <strong style="color:#333;">${paymentId.substring(0, 20)}...</strong></p>
        </td></tr>

        <!-- Produits -->
        <tr><td style="padding:0 40px 25px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e8;border-radius:8px;overflow:hidden;">
            <thead>
              <tr style="background:#f8f8f8;">
                <th style="padding:10px 8px;text-align:left;font-size:12px;color:#888;font-weight:600;text-transform:uppercase;">Produit</th>
                <th style="padding:10px 8px;text-align:center;font-size:12px;color:#888;font-weight:600;text-transform:uppercase;">Qté</th>
                <th style="padding:10px 8px;text-align:right;font-size:12px;color:#888;font-weight:600;text-transform:uppercase;">Prix</th>
                <th style="padding:10px 8px;text-align:right;font-size:12px;color:#888;font-weight:600;text-transform:uppercase;">Total</th>
              </tr>
            </thead>
            <tbody>${itemsRows}</tbody>
          </table>
        </td></tr>

        <!-- Totaux -->
        <tr><td style="padding:0 40px 25px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:5px 0;color:#666;font-size:14px;">Sous-total</td>
              <td style="padding:5px 0;text-align:right;color:#333;font-size:14px;">${subtotalAmount}€</td>
            </tr>
            <tr>
              <td style="padding:5px 0;color:#666;font-size:14px;">Livraison</td>
              <td style="padding:5px 0;text-align:right;color:#333;font-size:14px;">${parseFloat(shippingCost) === 0 ? '🎉 Gratuite' : shippingCost + '€'}</td>
            </tr>
            <tr>
              <td style="padding:12px 0 5px;color:#2d6a4f;font-size:16px;font-weight:700;border-top:2px solid #e8e8e8;">Total payé</td>
              <td style="padding:12px 0 5px;text-align:right;color:#2d6a4f;font-size:18px;font-weight:700;border-top:2px solid #e8e8e8;">${amount}€</td>
            </tr>
          </table>
        </td></tr>

        <!-- Adresse -->
        <tr><td style="padding:0 40px 30px;">
          <div style="background:#f8fffe;border:1px solid #b7e4c7;border-radius:8px;padding:18px;">
            <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#2d6a4f;text-transform:uppercase;letter-spacing:0.5px;">📦 Adresse de livraison</p>
            <p style="margin:0;color:#444;font-size:14px;line-height:1.6;">${addrHtml}</p>
          </div>
        </td></tr>

        <!-- Délai -->
        <tr><td style="padding:0 40px 30px;text-align:center;">
          <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:16px;">
            <p style="margin:0;color:#795548;font-size:14px;">🚚 <strong>Délai de livraison estimé : 5 à 10 jours ouvrés</strong></p>
            <p style="margin:6px 0 0;color:#999;font-size:12px;">Vous recevrez un email avec votre numéro de suivi dès l'expédition.</p>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8f8f8;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
          <p style="margin:0;color:#999;font-size:12px;">Une question ? Contactez-nous à <a href="mailto:naturesurvi@gmail.com" style="color:#2d6a4f;">naturesurvi@gmail.com</a></p>
          <p style="margin:8px 0 0;color:#ccc;font-size:11px;">© 2026 NatureSurvi — naturesurvie.net</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

        await sendResendEmailHtml({
          to:      [customerEmail],
          subject: `✅ Confirmation de commande — NatureSurvi`,
          html:    htmlConfirmation
        });
        console.log('✅ Email confirmation envoyé à', customerEmail);
      } catch (e) {
        console.error('Erreur email client:', e.message);
      }
    }
  }

  // ── TikTok tracking ──
  try {
    const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || '';
    const clientUA = event.headers['user-agent'] || '';
    await sendTikTokPurchaseEvent({
      email: customerEmail, amount,
      currency: session.currency || 'eur',
      orderId: paymentId,
      ip: clientIp.split(',')[0].trim(),
      userAgent: clientUA
    });
  } catch (e) {
    console.error('Erreur TikTok:', e.message);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true, amount, bigbuyOrderId, cjOrderId })
  };
};

// ─── Extraire ns_product_id depuis un line item Stripe ───────────────────────
function getNsProductId(item) {
  // Via métadonnées du produit (expandé)
  if (item.price?.product?.metadata?.ns_product_id) {
    return item.price.product.metadata.ns_product_id;
  }
  // Via métadonnées du prix
  if (item.price?.metadata?.ns_product_id) {
    return item.price.metadata.ns_product_id;
  }
  // Via SKU explicite (anciens liens Stripe fixes)
  if (item.price?.metadata?.sku) {
    return null; // SKU direct BigBuy — géré séparément
  }
  return null;
}

// ─── Créer commande BigBuy ────────────────────────────────────────────────────
async function createBigBuyOrder({ address, items, paymentId }) {
  const orderPayload = {
    order: {
      internalReference: `NS-BB-${paymentId.substring(0, 10)}`,
      language: 'fr',
      paymentMethod: 'moneybox',
      carriers: [{ name: 'correos' }],
      shippingAddress: {
        firstName:   address.firstName,
        lastName:    address.lastName,
        country:     address.country,
        postcode:    address.postcode,
        town:        address.city,
        address:     address.address,
        addressMore: address.addressMore || '',
        phone:       address.phone,
        email:       address.email,
        vatNumber:   ''
      },
      products: items.map(i => ({ reference: i.sku, quantity: i.qty }))
    }
  };

  const result = await httpPostJson({
    hostname: 'api.bigbuy.eu',
    path: '/rest/order/create.json',
    headers: { 'Authorization': `Bearer ${process.env.BIGBUY_API_KEY}` }
  }, orderPayload);

  if (result.id) return result.id;
  if (result.errors) throw new Error(JSON.stringify(result.errors));
  throw new Error('Réponse BigBuy inattendue: ' + JSON.stringify(result));
}

// ─── CJDropshipping — Auth ────────────────────────────────────────────────────
// Authentification via email + clé API (format: email@api@apikey)
// Variables Netlify requises : CJ_API_EMAIL + CJ_API_KEY
async function getCJAccessToken() {
  const email  = process.env.CJ_API_EMAIL;
  const apiKey = process.env.CJ_API_KEY; // ex: CJ5496793@api@91c3671885c94af3b7cd8a4b022d0454
  const body = JSON.stringify({ email, password: apiKey });
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'developers.cjdropshipping.com',
      path:     '/api2.0/v1/authentication/getAccessToken',
      method:   'POST',
      headers:  { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };
    let data = '';
    const req = https.request(options, res => {
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.result && parsed.data?.accessToken) {
            resolve(parsed.data.accessToken);
          } else {
            reject(new Error('CJ auth failed: ' + data));
          }
        } catch { reject(new Error('CJ auth JSON invalide: ' + data)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── CJDropshipping — Créer commande ─────────────────────────────────────────
async function createCJOrder({ address, items, paymentId }) {
  const token = await getCJAccessToken();

  const orderPayload = {
    orderNumber:      `NS-CJ-${paymentId.substring(0, 10)}`,
    shippingZip:      address.postcode,
    shippingCountry:  address.country,     // code ISO 2 lettres ex: "FR"
    shippingCity:     address.city,
    shippingAddress:  address.address,
    shippingAddress2: address.addressMore || '',
    shippingCustomerName: `${address.firstName} ${address.lastName}`.trim(),
    shippingPhone:    address.phone,
    // Logistique : CJ choisit automatiquement le meilleur transporteur
    // Pour forcer: logisticName: "CJPacket"
    products: items.map(i => ({
      vid:      i.vid,   // CJ Variant ID (obligatoire)
      quantity: i.qty
    }))
  };

  const result = await httpPostJsonCJ(
    '/api2.0/v1/shopping/order/createOrderV2',
    token,
    orderPayload
  );

  if (result.result && result.data?.orderId) {
    return result.data.orderId;
  }
  throw new Error('CJ order failed: ' + JSON.stringify(result));
}

// ─── Helpers HTTP ─────────────────────────────────────────────────────────────
function stripeApiGet(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.stripe.com',
      path,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}` }
    };
    let data = '';
    const req = https.request(options, res => {
      res.on('data', d => data += d);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error('JSON invalide: ' + data)); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function httpPostJson({ hostname, path, headers }, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const options = {
      hostname, path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), ...headers }
    };
    let data = '';
    const req = https.request(options, res => {
      res.on('data', d => data += d);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error('JSON invalide: ' + data)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function httpPostJsonCJ(path, token, payload) {
  return httpPostJson({
    hostname: 'developers.cjdropshipping.com',
    path,
    headers: { 'CJ-Access-Token': token }
  }, payload);
}

function sendResendEmail({ to, subject, text }) {
  return sendResendRaw({
    from:    'NatureSurvi <onboarding@resend.dev>',
    to:      to || ['naturesurvi@gmail.com'],
    subject,
    text
  });
}

function sendResendEmailHtml({ to, subject, html }) {
  return sendResendRaw({
    from:    'NatureSurvi <onboarding@resend.dev>',
    to,
    subject,
    html
  });
}

function sendResendRaw(payload) {
  // Forcer l'expéditeur sur le domaine vérifié
  payload.from = 'NatureSurvi <commandes@naturesurvie.net>';
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: 'api.resend.com',
      path:     '/emails',
      method:   'POST',
      headers: {
        'Authorization':  `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    let resp = '';
    const req = https.request(options, res => {
      res.on('data', d => resp += d);
      res.on('end', () => resolve(resp));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}
