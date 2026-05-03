// Netlify Function — Stripe Webhook
// Reçoit les événements Stripe et envoie un email de commande

const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let stripeEvent;

  try {
    stripeEvent = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  // On traite uniquement les paiements réussis
  if (stripeEvent.type === 'checkout.session.completed' || 
      stripeEvent.type === 'payment_intent.succeeded') {

    const session = stripeEvent.data.object;

    const customerEmail = session.customer_details?.email || session.receipt_email || 'Non fourni';
    const customerName = session.customer_details?.name || 'Non fourni';
    const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';
    const currency = (session.currency || 'eur').toUpperCase();
    const paymentId = session.id;

    // Récupérer les articles commandés
    let items = 'Non disponible';
    if (session.metadata && session.metadata.product_name) {
      items = `${session.metadata.product_name} x${session.metadata.quantity || 1}`;
    }

    // Récupérer l'adresse de livraison
    const shipping = session.shipping_details || session.shipping;
    let address = 'Non fournie';
    if (shipping && shipping.address) {
      const a = shipping.address;
      address = `${shipping.name || ''}\n${a.line1 || ''}\n${a.line2 ? a.line2 + '\n' : ''}${a.postal_code || ''} ${a.city || ''}\n${a.country || ''}`;
    }

    // Envoyer email via EmailJS ou Netlify Email (si configuré)
    // Pour l'instant on log la commande
    console.log('=== NOUVELLE COMMANDE ===');
    console.log(`Client: ${customerName} <${customerEmail}>`);
    console.log(`Montant: ${amount} ${currency}`);
    console.log(`Produit: ${items}`);
    console.log(`Adresse: ${address}`);
    console.log(`ID Paiement: ${paymentId}`);
    console.log('========================');

    // Envoyer notification email via SendGrid (si SENDGRID_API_KEY configuré)
    if (process.env.SENDGRID_API_KEY) {
      await sendEmail({
        to: 'naturesurvi@gmail.com',
        subject: `🛒 Nouvelle commande — ${amount} ${currency}`,
        body: `
NOUVELLE COMMANDE REÇUE !

Client : ${customerName}
Email  : ${customerEmail}
Montant: ${amount} ${currency}
Produit: ${items}

Adresse de livraison :
${address}

ID Paiement Stripe : ${paymentId}

---
Connecte-toi sur dashboard.stripe.com pour voir les détails.
`
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true, order: { customerName, customerEmail, amount, currency } })
    };
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};

// Fonction d'envoi email via SendGrid
function sendEmail({ to, subject, body }) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
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

    const req = https.request(options, (res) => {
      resolve(res.statusCode);
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}
