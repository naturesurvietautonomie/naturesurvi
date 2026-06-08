// Netlify Function — Crée une Stripe Checkout Session dynamique
// Appelée depuis panier.html avec la liste des produits du panier

const https = require('https');

// Prix Stripe par produit (price_xxx = Price ID Stripe)
// Si le produit n'a pas de Price ID, on crée un prix à la volée avec le montant
const STRIPE_PRICE_IDS = {
  // Survie
  1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null,
  9: null, 10: null, 11: null, 12: null, 13: null, 14: null, 15: null,
  16: null, 17: null, 18: null, 19: null, 20: null,
  // Jardinage 101-136 : pas de Price ID fixe → prix dynamiques
};

function stripeRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? new URLSearchParams(body).toString() : '';
    const options = {
      hostname: 'api.stripe.com',
      path,
      method,
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(bodyStr)
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
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  let cartItems;
  try {
    cartItems = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Corps invalide' }) };
  }

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Panier vide' }) };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Stripe non configuré' }) };
  }

  try {
    // Construire les line_items pour Stripe Checkout
    // On utilise price_data (prix dynamique) pour tous les produits
    const lineItems = cartItems.map((item, i) => {
      return [
        [`line_items[${i}][price_data][currency]`, 'eur'],
        [`line_items[${i}][price_data][product_data][name]`, item.name],
        [`line_items[${i}][price_data][product_data][images][0]`, item.image || ''],
        [`line_items[${i}][price_data][unit_amount]`, Math.round(item.price * 100)],
        [`line_items[${i}][quantity]`, item.quantity],
      ];
    }).flat();

    const params = Object.fromEntries([
      ['mode', 'payment'],
      ['success_url', 'https://naturesurvie.net/merci.html?session_id={CHECKOUT_SESSION_ID}'],
      ['cancel_url', 'https://naturesurvie.net/panier.html'],
      ['shipping_address_collection[allowed_countries][0]', 'FR'],
      ['shipping_address_collection[allowed_countries][1]', 'BE'],
      ['shipping_address_collection[allowed_countries][2]', 'CH'],
      ['shipping_address_collection[allowed_countries][3]', 'LU'],
      ['shipping_address_collection[allowed_countries][4]', 'MC'],
      ['shipping_options[0][shipping_rate_data][type]', 'fixed_amount'],
      ['shipping_options[0][shipping_rate_data][fixed_amount][amount]', '0'],
      ['shipping_options[0][shipping_rate_data][fixed_amount][currency]', 'eur'],
      ['shipping_options[0][shipping_rate_data][display_name]', 'Livraison standard (5-7 jours)'],
      ['locale', 'fr'],
      ...lineItems
    ]);

    const session = await stripeRequest('POST', '/v1/checkout/sessions', params);

    if (session.error) {
      console.error('Erreur Stripe:', session.error);
      return { statusCode: 400, headers, body: JSON.stringify({ error: session.error.message }) };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url })
    };

  } catch (err) {
    console.error('Erreur create-checkout:', err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
