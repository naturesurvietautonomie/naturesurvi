// Netlify Function — Stripe Webhook + BigBuy Auto-Order
// Reçoit les paiements Stripe, vérifie la signature, passe la commande BigBuy, envoie un email

const https = require('https');
const crypto = require('crypto');

// ─── Mapping SKU BigBuy par produit NatureSurvi ───────────────────────────────
// Clé = id produit (ou "id_varianteIdx"), valeur = SKU BigBuy
const SKU_MAP = {
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
      firstName: (shipping.name || customerName).split(' ')[0] || 'Client',
      lastName:  (shipping.name || customerName).split(' ').slice(1).join(' ') || 'NatureSurvi',
      phone:     session.customer_details?.phone || '0600000000',
      email:     customerEmail,
      address:   a.line1 || '',
      addressMore: a.line2 || '',
      postcode:  a.postal_code || '',
      city:      a.city || '',
      country:   a.country || 'FR'
    };
  }

  // ── Récupérer les line items Stripe ──
  let lineItems = [];
  try {
    const liData = await stripeApiGet(`/v1/checkout/sessions/${paymentId}/line_items?limit=10`);
    lineItems = liData.data || [];
  } catch (e) {
    console.error('Erreur récupération line items:', e.message);
  }

  // ── Texte email ──
  const addrText = address
    ? `${address.firstName} ${address.lastName}\n${address.address}\n${address.postcode} ${address.city}\n${address.country}`
    : 'Non fournie';

  const emailBody = `
🛒 NOUVELLE COMMANDE NATURESURVIE.NET

Client  : ${customerName}
Email   : ${customerEmail}
Montant : ${amount} ${currency}

Adresse de livraison :
${addrText}

ID Paiement Stripe : ${paymentId}
Dashboard : https://dashboard.stripe.com/payments/${paymentId}
`;

  console.log(emailBody);

  // ── Passer commande BigBuy ──
  let bigbuyOrderId = null;
  if (address && lineItems.length > 0 && process.env.BIGBUY_API_KEY) {
    try {
      bigbuyOrderId = await createBigBuyOrder({ address, lineItems, paymentId });
      console.log('Commande BigBuy créée:', bigbuyOrderId);
    } catch (e) {
      console.error('Erreur BigBuy:', e.message);
    }
  } else {
    console.log('BigBuy skip — adresse manquante ou pas de line items');
  }

  // ── Envoyer email notification ──
  const finalEmail = emailBody + (bigbuyOrderId ? `\nCommande BigBuy : #${bigbuyOrderId}` : '\n⚠️ Commande BigBuy à passer manuellement');

  if (process.env.RESEND_API_KEY) {
    try {
      await sendResendEmail({
        subject: `🛒 Commande ${amount}€ — NatureSurvi${bigbuyOrderId ? ' ✅ Auto-commandé' : ' ⚠️ Manuel'}`,
        body: finalEmail
      });
    } catch (e) {
      console.error('Erreur Resend:', e.message);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true, amount, bigbuyOrderId })
  };
};

// ─── Créer commande BigBuy ────────────────────────────────────────────────────
async function createBigBuyOrder({ address, lineItems, paymentId }) {
  const BB_KEY = process.env.BIGBUY_API_KEY;

  // Construire les produits à commander
  // On cherche le SKU BigBuy depuis les métadonnées ou le nom du produit Stripe
  const products = [];
  for (const item of lineItems) {
    const productName = item.description || '';
    // Chercher le SKU dans notre map par correspondance de nom
    let sku = null;
    for (const [key, skuVal] of Object.entries(SKU_MAP)) {
      // On fait confiance aux métadonnées si disponibles
      if (item.price?.metadata?.sku) {
        sku = item.price.metadata.sku;
        break;
      }
    }
    if (!sku) {
      console.log(`SKU non trouvé pour: ${productName} — commande manuelle nécessaire`);
      continue;
    }
    products.push({
      reference: sku,
      quantity: item.quantity || 1
    });
  }

  if (products.length === 0) {
    throw new Error('Aucun produit avec SKU trouvé — commande manuelle');
  }

  const orderPayload = {
    order: {
      internalReference: `NS-${paymentId.substring(0, 12)}`,
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
      products
    }
  };

  const result = await httpPostJsonBigBuy('/rest/order/create.json', orderPayload, BB_KEY);
  const parsed = JSON.parse(result);

  if (parsed.id) return parsed.id;
  if (parsed.errors) throw new Error(JSON.stringify(parsed.errors));
  throw new Error('Réponse BigBuy inattendue: ' + result);
}

// ─── Helpers HTTP ─────────────────────────────────────────────────────────────
function stripeApiGet(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.stripe.com',
      path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`
      }
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

function httpPostJsonBigBuy(path, payload, apiKey) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const options = {
      hostname: 'api.bigbuy.eu',
      path,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
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

function sendResendEmail({ subject, body }) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      from: 'NatureSurvi <onboarding@resend.dev>',
      to: ['naturesurvi@gmail.com'],
      subject,
      text: body
    });
    const options = {
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
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
