/* =============================================
   NATURESURVI — Analytics & Marketing
   Remplacer les IDs placeholder par les vrais
   ============================================= */

// ============ CONFIGURATION ============
// Remplace ces valeurs par tes vrais IDs
const CONFIG = {
  GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX',      // → Google Analytics 4
  META_PIXEL_ID: '000000000000000',          // → Meta/Facebook Pixel
  BREVO_FORM_URL: 'https://sibforms.com/serve/XXXXX', // → Brevo form URL
};

// ============ GOOGLE ANALYTICS 4 ============
(function initGA() {
  if (CONFIG.GOOGLE_ANALYTICS_ID === 'G-XXXXXXXXXX') return; // Skip si pas configuré

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GOOGLE_ANALYTICS_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', CONFIG.GOOGLE_ANALYTICS_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });

  console.log('✅ Google Analytics initialisé');
})();

// ============ META PIXEL ============
(function initMetaPixel() {
  if (CONFIG.META_PIXEL_ID === '000000000000000') return; // Skip si pas configuré

  !function(f,b,e,v,n,t,s) {
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  }(window,document,'script','https://connect.facebook.net/fr_FR/fbevents.js');

  fbq('init', CONFIG.META_PIXEL_ID);
  fbq('track', 'PageView');

  console.log('✅ Meta Pixel initialisé');
})();

// ============ ÉVÉNEMENTS E-COMMERCE ============

// Tracker : vue produit
function trackViewProduct(product) {
  // Google Analytics
  if (window.gtag) {
    gtag('event', 'view_item', {
      currency: 'EUR',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
      }]
    });
  }
  // Meta Pixel
  if (window.fbq) {
    fbq('track', 'ViewContent', {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'EUR',
    });
  }
}

// Tracker : ajout au panier
function trackAddToCart(product, quantity) {
  quantity = quantity || 1;
  // Google Analytics
  if (window.gtag) {
    gtag('event', 'add_to_cart', {
      currency: 'EUR',
      value: product.price * quantity,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: quantity,
      }]
    });
  }
  // Meta Pixel
  if (window.fbq) {
    fbq('track', 'AddToCart', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price * quantity,
      currency: 'EUR',
    });
  }
}

// Tracker : inscription newsletter
function trackNewsletterSignup(email) {
  if (window.gtag) {
    gtag('event', 'sign_up', { method: 'newsletter' });
  }
  if (window.fbq) {
    fbq('track', 'Lead', { content_name: 'Newsletter' });
  }
}

// Tracker : début checkout
function trackBeginCheckout(cartItems, total) {
  if (window.gtag) {
    gtag('event', 'begin_checkout', {
      currency: 'EUR',
      value: total,
      items: cartItems.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))
    });
  }
  if (window.fbq) {
    fbq('track', 'InitiateCheckout', {
      content_ids: cartItems.map(i => i.id),
      num_items: cartItems.reduce((a, i) => a + i.quantity, 0),
      value: total,
      currency: 'EUR',
    });
  }
}

console.log('📊 NatureSurvi Analytics chargé — en attente de configuration');
