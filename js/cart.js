// ============================================
// NatureSurvi - Logique Panier & Wishlist
// ============================================

// ---- PANIER ----
const Cart = {
  STORAGE_KEY: 'naturesurvi_cart',

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    } catch { return []; }
  },

  saveItems(items) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateUI();
    this.dispatchEvent();
  },

  addItem(productId, quantity = 1) {
    const items = this.getItems();
    const existing = items.find(i => i.id === parseInt(productId));
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ id: parseInt(productId), quantity });
    }
    this.saveItems(items);
    this.showToast(productId);
  },

  removeItem(productId) {
    const items = this.getItems().filter(i => i.id !== parseInt(productId));
    this.saveItems(items);
  },

  updateQuantity(productId, quantity) {
    const items = this.getItems();
    const item = items.find(i => i.id === parseInt(productId));
    if (item) {
      item.quantity = Math.max(1, Math.min(99, parseInt(quantity)));
    }
    this.saveItems(items);
  },

  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateUI();
    this.dispatchEvent();
  },

  getCount() {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
  },

  getSubtotal() {
    return this.getItems().reduce((sum, item) => {
      const product = getProductById(item.id);
      return product ? sum + product.price * item.quantity : sum;
    }, 0);
  },

  getShippingCost() {
    const subtotal = this.getSubtotal();
    return subtotal >= 50 ? 0 : 5.90;
  },

  getTotal() {
    return this.getSubtotal() + this.getShippingCost();
  },

  // Met à jour tous les indicateurs panier sur la page
  updateUI() {
    // Badge compteur navbar
    const countBadges = document.querySelectorAll('.cart-count');
    const count = this.getCount();
    countBadges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });

    // Total navbar (les pages utilisent id="cartTotal", certaines la classe .cart-total-nav)
    const totalEls = document.querySelectorAll('.cart-total-nav, #cartTotal');
    totalEls.forEach(el => {
      el.textContent = formatPrice(this.getSubtotal());
    });

    // Drawer
    this.updateDrawer();

    // Page panier si présente
    if (typeof renderCartPage === 'function') {
      renderCartPage();
    }
  },

  // Drawer panier latéral
  updateDrawer() {
    const drawerItems = document.getElementById('drawer-items');
    const drawerEmpty = document.getElementById('drawer-empty');
    const drawerFooter = document.getElementById('drawer-footer');
    const drawerSubtotal = document.getElementById('drawer-subtotal');

    if (!drawerItems) return;

    const items = this.getItems();

    if (items.length === 0) {
      drawerItems.innerHTML = '';
      if (drawerEmpty) drawerEmpty.style.display = 'block';
      if (drawerFooter) drawerFooter.style.display = 'none';
      return;
    }

    if (drawerEmpty) drawerEmpty.style.display = 'none';
    if (drawerFooter) drawerFooter.style.display = 'block';

    drawerItems.innerHTML = items.map(item => {
      const product = getProductById(item.id);
      if (!product) return '';
      return `
        <div class="drawer-item" data-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" class="drawer-item-img" loading="lazy" width="70" height="70">
          <div class="drawer-item-info">
            <h4 class="drawer-item-name">${product.name}</h4>
            <div class="drawer-item-price">${formatPrice(product.price)}</div>
            <div class="drawer-item-qty">
              <button class="qty-btn" onclick="Cart.updateQuantity(${product.id}, ${item.quantity - 1})" aria-label="Diminuer la quantité">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" onclick="Cart.updateQuantity(${product.id}, ${item.quantity + 1})" aria-label="Augmenter la quantité">+</button>
            </div>
          </div>
          <button class="drawer-item-remove" onclick="Cart.removeItem(${product.id})" aria-label="Supprimer ${product.name}">✕</button>
        </div>
      `;
    }).join('');

    if (drawerSubtotal) {
      drawerSubtotal.textContent = formatPrice(this.getSubtotal());
    }
  },

  // Toast notification
  showToast(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Supprimer ancien toast
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">✅</span>
        <div class="toast-text">
          <strong>${product.name}</strong>
          <span>ajouté au panier</span>
        </div>
        <a href="panier.html" class="toast-action">Voir le panier →</a>
      </div>
      <div class="toast-progress"></div>
    `;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => toast.classList.add('show'));

    // Auto-remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  },

  // Toggle drawer
  toggleDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (!drawer) return;

    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    } else {
      this.updateDrawer();
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  },

  dispatchEvent() {
    window.dispatchEvent(new CustomEvent('cart-updated', {
      detail: { count: this.getCount(), total: this.getTotal() }
    }));
  }
};

// ---- WISHLIST / FAVORIS ----
const Wishlist = {
  STORAGE_KEY: 'naturesurvi_wishlist',

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    } catch { return []; }
  },

  toggle(productId) {
    const items = this.getItems();
    const id = parseInt(productId);
    const index = items.indexOf(id);
    if (index > -1) {
      items.splice(index, 1);
    } else {
      items.push(id);
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateUI();
    return index === -1; // true if added
  },

  isInWishlist(productId) {
    return this.getItems().includes(parseInt(productId));
  },

  updateUI() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      const id = parseInt(btn.dataset.productId);
      const inList = this.isInWishlist(id);
      btn.classList.toggle('active', inList);
      btn.setAttribute('aria-label', inList ? 'Retirer des favoris' : 'Ajouter aux favoris');
      btn.textContent = inList ? '❤️' : '🤍';
    });
  }
};

// ---- PRODUCT CARD RENDERER ----
function renderProductCard(product) {
  const isWished = Wishlist.isInWishlist(product.id);
  const hasVariants = product.variants && product.variants.length > 0;
  const variantBadge = hasVariants ? `<span style="font-size:0.75rem;color:#4a7c2d;font-weight:700;margin-top:2px;display:block;">🎨 ${product.variants.length} variante${product.variants.length > 1 ? 's' : ''} disponible${product.variants.length > 1 ? 's' : ''}</span>` : '';

  return `
    <article class="product-card" data-id="${product.id}" data-category="${product.category}"
      onclick="window.location.href='produit.html?id=${product.id}'"
      style="cursor:pointer;">
      <div class="product-card-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" width="400" height="300">
        <button class="wishlist-btn ${isWished ? 'active' : ''}" data-product-id="${product.id}" 
          onclick="event.stopPropagation(); toggleWishlist(${product.id})" 
          aria-label="${isWished ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
          ${isWished ? '❤️' : '🤍'}
        </button>
        <div class="product-badges">${renderBadges(product.badges)}</div>
      </div>
      <div class="product-card-body">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews} avis)</span>
        </div>
        <p class="product-desc-short">${product.description.substring(0, 80)}…</p>
        ${variantBadge}
        <div class="product-pricing">
          <span class="product-price">${formatPrice(product.price)}</span>
        </div>
        <div class="product-shipping">📦 ${product.shipping}</div>
        <div class="product-actions">
          <a class="btn btn-primary" href="produit.html?id=${product.id}" onclick="event.stopPropagation()">
            👁️ Voir le produit
          </a>
          <button class="btn btn-outline add-to-cart-btn" onclick="event.stopPropagation(); Cart.addItem(${product.id})" aria-label="Ajouter ${product.name} au panier">
            🛒 Panier
          </button>
        </div>
      </div>
    </article>
  `;
}

function toggleWishlist(productId) {
  const added = Wishlist.toggle(productId);
  // Mini feedback
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${added ? '❤️' : '💔'}</span>
      <div class="toast-text">
        <strong>${added ? 'Ajouté aux favoris' : 'Retiré des favoris'}</strong>
      </div>
    </div>
    <div class="toast-progress"></div>
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}

// ---- PRODUCT MODAL ----
function openProductModal(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  if (!modal) return;

  const isWished = Wishlist.isInWishlist(product.id);

  modal.innerHTML = `
    <div class="modal-overlay" onclick="closeProductModal()"></div>
    <div class="modal-content" role="dialog" aria-modal="true" aria-label="Détails du produit ${product.name}">
      <button class="modal-close" onclick="closeProductModal()" aria-label="Fermer">&times;</button>
      <div class="modal-body">
        <div class="modal-image">
          <img src="${product.image}" alt="${product.name}" width="400" height="300">
        </div>
        <div class="modal-info">
          <div class="product-badges">${renderBadges(product.badges)}</div>
          <span class="product-category">${product.category}</span>
          <h2>${product.name}</h2>
          <div class="product-rating">
            <span class="stars">${renderStars(product.rating)}</span>
            <span class="rating-count">${product.rating}/5 — ${product.reviews} avis vérifiés</span>
          </div>
          <p class="modal-description">${product.description}</p>
          <div class="product-pricing">
            <span class="product-price">${formatPrice(product.price)}</span>
          </div>
          ${product.variants && product.variants.length > 0 ? `
          <div class="modal-variants" style="margin:12px 0;">
            <label style="font-size:0.85rem;font-weight:700;color:#2d5016;display:block;margin-bottom:4px;">Choisir une variante :</label>
            <select id="modal-variant-select-${product.id}" style="width:100%;padding:8px 10px;border:2px solid #2d5016;border-radius:8px;font-size:0.9rem;background:#faf7f0;cursor:pointer;">
              ${product.variants.map((v,i) => `<option value="${i}">${v.label} — ${v.price}€</option>`).join('')}
            </select>
          </div>` : ''}
          <div class="modal-details">
            <p>📦 ${product.shipping}</p>
            <p>⚖️ Poids : ${product.weight}</p>
            <p>✅ En stock — Expédition sous 24h</p>
          </div>
          <div class="modal-actions">
            <button class="btn btn-primary btn-lg" onclick="Cart.addItem(${product.id}); closeProductModal();">
              🛒 Ajouter au panier — ${formatPrice(product.price)}
            </button>
            <button class="btn btn-outline wishlist-modal-btn ${isWished ? 'active' : ''}" onclick="toggleWishlist(${product.id}); openProductModal(${product.id});">
              ${isWished ? '❤️ Dans vos favoris' : '🤍 Ajouter aux favoris'}
            </button>
          </div>
          <div class="trust-badges-modal">
            <span>🔒 Paiement sécurisé</span>
            <span>🔄 Satisfait ou remboursé 30j</span>
            <span>🚚 Livraison suivie</span>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // ESC to close
  document.addEventListener('keydown', handleModalEsc);
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.removeEventListener('keydown', handleModalEsc);
}

function handleModalEsc(e) {
  if (e.key === 'Escape') closeProductModal();
}

// ---- NEWSLETTER ----
function handleNewsletter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  if (!email) return;

  // Simulate success
  const form = e.target;
  form.innerHTML = `
    <div class="newsletter-success">
      <span class="success-icon">🎉</span>
      <h3>Bienvenue dans la communauté !</h3>
      <p>Merci pour votre inscription. Vous recevrez bientôt nos conseils et actualités à <strong>${email}</strong></p>
    </div>
  `;
}

// ---- MOBILE MENU ----
function toggleMobileMenu() {
  const nav = document.getElementById('main-nav');
  const burger = document.querySelector('.burger-menu');
  if (!nav) return;
  nav.classList.toggle('open');
  burger.classList.toggle('open');
  burger.setAttribute('aria-expanded', nav.classList.contains('open'));
}

// ---- BACK TO TOP ----
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateUI();
  Wishlist.updateUI();
  initBackToTop();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
