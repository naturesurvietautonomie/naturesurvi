// Netlify Function — Stripe Webhook
// Reçoit les événements Stripe, vérifie la signature, envoie un email Gmail

const https = require('https');
const crypto = require('crypto');

// Vérification de la signature Stripe
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
  return signatures.some(sig => crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex')));
}

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

  if (stripeEvent.type === 'checkout.session.completed' ||
      stripeEvent.type === 'payment_intent.succeeded') {

    const session = stripeEvent.data.object;

    const customerEmail = session.customer_details?.email || session.receipt_email || 'Non fourni';
    const customerName  = session.customer_details?.name  || 'Non fourni';
    const amount        = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';
    const currency      = (session.currency || 'eur').toUpperCase();
    const paymentId     = session.id;

    const shipping = session.shipping_details || session.shipping;
    let address = 'Non fournie';
    if (shipping && shipping.address) {
      const a = shipping.address;
      address = [shipping.name, a.line1, a.line2, `${a.postal_code} ${a.city}`, a.country]
        .filter(Boolean).join('\n');
    }

    const emailBody = `
🛒 NOUVELLE COMMANDE NATURESURVIE.NET

Client  : ${customerName}
Email   : ${customerEmail}
Montant : ${amount} ${currency}

Adresse de livraison :
${address}

ID Paiement Stripe : ${paymentId}

---
Voir sur : https://dashboard.stripe.com/payments/${paymentId}
`;

    console.log(emailBody);

    // Envoi email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await sendResendEmail({
          subject: `🛒 Commande ${amount}€ — NatureSurvi`,
          body: emailBody
        });
        console.log('Email envoyé via Resend');
      } catch (e) {
        console.error('Erreur Resend:', e.message);
      }
    }
    // Fallback SendGrid
    else if (process.env.SENDGRID_API_KEY) {
      try {
        await sendSendgridEmail({
          subject: `🛒 Commande ${amount}€ — NatureSurvi`,
          body: emailBody
        });
        console.log('Email envoyé via SendGrid');
      } catch (e) {
        console.error('Erreur SendGrid:', e.message);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true, amount, customerName })
    };
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};

// Envoi email via Resend
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
      res.on('end', () => { console.log('Resend response:', resp); resolve(resp); });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Envoi email via Gmail API OAuth2
async function sendGmailEmail({ subject, body }) {
  // Obtenir un access token depuis le refresh token
  const tokenData = await httpPost('oauth2.googleapis.com', '/token', {
    client_id: process.env.GMAIL_CLIENT_ID,
    client_secret: process.env.GMAIL_CLIENT_SECRET,
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    grant_type: 'refresh_token'
  });
  const { access_token } = JSON.parse(tokenData);

  // Construire le message RFC 2822
  const to = 'naturesurvi@gmail.com';
  const from = 'naturesurvi@gmail.com';
  const message = [
    `From: Nature Survi <${from}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset=utf-8`,
    '',
    body
  ].join('\r\n');

  const encoded = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  await httpPostJson('gmail.googleapis.com', '/gmail/v1/users/me/messages/send', { raw: encoded }, access_token);
}

// Envoi email via SendGrid
function sendSendgridEmail({ subject, body }) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      personalizations: [{ to: [{ email: 'naturesurvi@gmail.com' }] }],
      from: { email: 'naturesurvi@gmail.com', name: 'Nature Survi & Autonomie' },
      subject,
      content: [{ type: 'text/plain', value: body }]
    });
    const options = {
      hostname: 'api.sendgrid.com',
      path: '/v3/mail/send',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, res => resolve(res.statusCode));
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function httpPost(hostname, path, params) {
  return new Promise((resolve, reject) => {
    const body = new URLSearchParams(params).toString();
    const options = {
      hostname, path, method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) }
    };
    let data = '';
    const req = https.request(options, res => { res.on('data', d => data += d); res.on('end', () => resolve(data)); });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function httpPostJson(hostname, path, payload, token) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const options = {
      hostname, path, method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };
    let data = '';
    const req = https.request(options, res => { res.on('data', d => data += d); res.on('end', () => resolve(data)); });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}
