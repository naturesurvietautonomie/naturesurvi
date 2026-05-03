// ============================================
// NatureSurvi - Base de données Produits
// ============================================

const PRODUCTS = [
  {
    id: 1,
    name: "Kit de survie complet 72h",
    price: 97.90,
    originalPrice: 119.90,
    category: "Survie",
    description: "Kit complet pour survivre 72h en autonomie. Contient nourriture lyophilisée, eau, abri d'urgence, outils essentiels et trousse de premiers soins. Idéal pour les situations d'urgence.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.8,
    reviews: 342,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Kit+Survie+72h",
    shipping: "Livraison gratuite",
    weight: "4.2 kg",
    inStock: true,
    supplier: "BigBuy",
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 2,
    name: "Purificateur d'eau portable LifeStraw",
    price: 34.90,
    originalPrice: 42.90,
    category: "Survie",
    description: "Filtre jusqu'à 4000 litres d'eau. Élimine 99,99% des bactéries et parasites. Ultra-léger (56g), parfait pour la randonnée et les situations d'urgence.",
    badges: ["Bestseller", "Bio"],
    rating: 4.9,
    reviews: 528,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=LifeStraw",
    shipping: "Livraison 2-3 jours",
    weight: "56 g",
    inStock: true,
    supplier: "Survival Dropship",
    supplierUrl: "https://survivaldropship.com"
  },
  {
    id: 3,
    name: "Couteau bushcraft Mora Companion",
    price: 27.90,
    originalPrice: 34.90,
    category: "Outils",
    description: "Lame en acier inoxydable de 10,4 cm. Manche ergonomique en caoutchouc. Étui rigide inclus. Le couteau de référence pour le bushcraft et la survie.",
    badges: ["Bestseller"],
    rating: 4.7,
    reviews: 276,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Mora+Companion",
    shipping: "Livraison 2-3 jours",
    weight: "116 g",
    inStock: true,
    supplier: "Survie-Bushcraft.fr",
    supplierUrl: "https://survie-bushcraft.fr"
  },
  {
    id: 4,
    name: "Kit de graines potager 4 saisons",
    price: 38.90,
    originalPrice: 47.90,
    category: "Jardinage",
    description: "30 variétés de graines reproductibles pour un potager autonome toute l'année. Tomates, courgettes, salades, herbes aromatiques et plus. Guide de plantation inclus.",
    badges: ["Bio", "Nouveau"],
    rating: 4.6,
    reviews: 189,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Kit+Graines",
    shipping: "Livraison gratuite",
    weight: "350 g",
    inStock: true,
    supplier: "Webdrop Market",
    supplierUrl: "https://www.webdrop-market.com"
  },
  {
    id: 5,
    name: "Bac potager surélevé en bois 120x60cm",
    price: 84.90,
    originalPrice: 109.90,
    category: "Jardinage",
    description: "Bac en bois traité autoclave, hauteur 80cm pour jardiner sans se baisser. Feutre géotextile inclus. Montage facile sans outils. Idéal balcon et terrasse.",
    badges: ["Promo"],
    rating: 4.5,
    reviews: 134,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Bac+Potager",
    shipping: "Livraison 5-7 jours",
    weight: "12 kg",
    inStock: true,
    supplier: "VidaXL",
    supplierUrl: "https://www.vidaxl.fr"
  },
  {
    id: 6,
    name: "Lampe solaire rechargeable 3-en-1",
    price: 22.90,
    originalPrice: 28.90,
    category: "Énergie",
    description: "Lampe LED + chargeur USB + lumière SOS. Panneau solaire intégré, autonomie 12h. Résistante à l'eau IPX4. Parfaite pour le camping et les coupures de courant.",
    badges: ["Promo", "Essentiel"],
    rating: 4.4,
    reviews: 203,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Lampe+Solaire",
    shipping: "Livraison 2-3 jours",
    weight: "280 g",
    inStock: true,
    supplier: "AliExpress",
    supplierUrl: "https://fr.aliexpress.com"
  },
  {
    id: 7,
    name: "Panneau solaire portable 60W pliable",
    price: 139.90,
    originalPrice: 169.90,
    category: "Énergie",
    description: "Panneau solaire monocristallin 60W pliable. Sorties USB-A, USB-C et DC. Rendement 23%. Se plie comme un livre pour le transport. Compatible toutes batteries portables.",
    badges: ["Nouveau"],
    rating: 4.6,
    reviews: 97,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Panneau+Solaire+60W",
    shipping: "Livraison gratuite",
    weight: "1.8 kg",
    inStock: true,
    supplier: "Alibaba",
    supplierUrl: "https://french.alibaba.com"
  },
  {
    id: 8,
    name: "Déshydrateur alimentaire 5 plateaux",
    price: 74.90,
    originalPrice: 94.90,
    category: "Conservation",
    description: "5 plateaux empilables, température réglable 35-70°C. Timer 72h. Idéal pour fruits, légumes, viandes et herbes. Conservez vos récoltes toute l'année.",
    badges: ["Bestseller"],
    rating: 4.7,
    reviews: 215,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=D%C3%A9shydrateur",
    shipping: "Livraison gratuite",
    weight: "3.5 kg",
    inStock: true,
    supplier: "BigBuy",
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 9,
    name: "Kit de bocaux pour conserves (12 pièces)",
    price: 44.90,
    originalPrice: 54.90,
    category: "Conservation",
    description: "12 bocaux en verre Le Parfait 1L avec joints neufs. Pince à bocaux et entonnoir inclus. Parfait pour confitures, conserves de légumes et fermentation.",
    badges: ["Bio", "Essentiel"],
    rating: 4.5,
    reviews: 167,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Kit+Bocaux",
    shipping: "Livraison 3-5 jours",
    weight: "6.8 kg",
    inStock: true,
    supplier: "Webdrop Market",
    supplierUrl: "https://www.webdrop-market.com"
  },
  {
    id: 10,
    name: "Hache de survie multi-usage 38cm",
    price: 49.90,
    originalPrice: 62.90,
    category: "Outils",
    description: "Tête en acier forgé, manche en hickory. 38cm de long, parfaite pour fendre du petit bois, tailler et construire un abri. Étui en cuir inclus.",
    badges: ["Essentiel"],
    rating: 4.6,
    reviews: 143,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Hache+Survie",
    shipping: "Livraison 2-3 jours",
    weight: "800 g",
    inStock: true,
    supplier: "Survie-Bushcraft.fr",
    supplierUrl: "https://survie-bushcraft.fr"
  },
  {
    id: 11,
    name: "Tente ultra-légère 2 personnes",
    price: 159.90,
    originalPrice: 199.90,
    category: "Survie",
    description: "Tente 3 saisons, double-toit imperméable 3000mm. Poids plume 1,6kg. Montage rapide avec arceaux en aluminium. 2 absides pour le rangement.",
    badges: ["Promo", "Nouveau"],
    rating: 4.7,
    reviews: 88,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Tente+Ultra-L%C3%A9g%C3%A8re",
    shipping: "Livraison gratuite",
    weight: "1.6 kg",
    inStock: true,
    supplier: "BigBuy",
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 12,
    name: "Filtre à eau gravité 10L",
    price: 64.90,
    originalPrice: 79.90,
    category: "Survie",
    description: "Système de filtration par gravité, capacité 10L. Filtre céramique + charbon actif. Élimine bactéries, virus et métaux lourds. Autonomie : 10 000 litres.",
    badges: ["Essentiel"],
    rating: 4.8,
    reviews: 196,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Filtre+Gravit%C3%A9+10L",
    shipping: "Livraison gratuite",
    weight: "1.2 kg",
    inStock: true,
    supplier: "Survival Dropship",
    supplierUrl: "https://survivaldropship.com"
  },
  {
    id: 13,
    name: "Composteur rotatif 160L",
    price: 94.90,
    originalPrice: 119.90,
    category: "Jardinage",
    description: "Double chambre rotative 160L. Compostage rapide en 4-6 semaines. Structure en acier galvanisé, tambour en PP recyclé. Aération optimale intégrée.",
    badges: ["Bio"],
    rating: 4.4,
    reviews: 112,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Composteur+Rotatif",
    shipping: "Livraison 5-7 jours",
    weight: "9.5 kg",
    inStock: true,
    supplier: "VidaXL",
    supplierUrl: "https://www.vidaxl.fr"
  },
  {
    id: 14,
    name: "Serre de jardin tunnel 3x2m",
    price: 124.90,
    originalPrice: 154.90,
    category: "Jardinage",
    description: "Serre tunnel 6m² avec bâche 140g/m² anti-UV. Structure acier galvanisé. Porte zippée et fenêtres d'aération. Prolongez vos saisons de culture.",
    badges: ["Promo"],
    rating: 4.3,
    reviews: 78,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Serre+Tunnel+3x2m",
    shipping: "Livraison 5-7 jours",
    weight: "14 kg",
    inStock: true,
    supplier: "VidaXL",
    supplierUrl: "https://www.vidaxl.fr"
  },
  {
    id: 15,
    name: "Batterie externe solaire 20000mAh",
    price: 44.90,
    originalPrice: 54.90,
    category: "Énergie",
    description: "Powerbank 20000mAh avec panneau solaire intégré. 2 ports USB + USB-C. Résistante aux chocs et à l'eau (IP65). Lampe LED intégrée avec mode SOS.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.5,
    reviews: 312,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Batterie+Solaire",
    shipping: "Livraison 2-3 jours",
    weight: "420 g",
    inStock: true,
    supplier: "AliExpress",
    supplierUrl: "https://fr.aliexpress.com"
  },
  {
    id: 16,
    name: "Réchaud portable multi-combustible",
    price: 54.90,
    originalPrice: 67.90,
    category: "Survie",
    description: "Fonctionne au gaz, essence, pétrole et alcool. Pare-vent intégré, allumage piézo. Puissance 3000W, fait bouillir 1L en 3 min. Compact et robuste.",
    badges: ["Essentiel"],
    rating: 4.6,
    reviews: 156,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=R%C3%A9chaud+Portable",
    shipping: "Livraison 2-3 jours",
    weight: "350 g",
    inStock: true,
    supplier: "BigBuy",
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 17,
    name: "Kit premiers secours complet IFAK",
    price: 59.90,
    originalPrice: 74.90,
    category: "Survie",
    description: "Trousse IFAK tactique : garrot tourniquet, pansements hémostatiques, bandage israélien, ciseaux trauma, couverture de survie et 50+ composants essentiels.",
    badges: ["Essentiel", "Nouveau"],
    rating: 4.8,
    reviews: 231,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Kit+IFAK",
    shipping: "Livraison 2-3 jours",
    weight: "650 g",
    inStock: true,
    supplier: "Survival Dropship",
    supplierUrl: "https://survivaldropship.com"
  },
  {
    id: 18,
    name: "Sécateur professionnel bypass",
    price: 24.90,
    originalPrice: 31.90,
    category: "Jardinage",
    description: "Lames en acier SK5, coupe nette jusqu'à 25mm. Poignées ergonomiques antidérapantes. Verrouillage de sécurité. Garantie 5 ans. L'outil indispensable du jardinier.",
    badges: ["Bio"],
    rating: 4.5,
    reviews: 198,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=S%C3%A9cateur+Pro",
    shipping: "Livraison 2-3 jours",
    weight: "220 g",
    inStock: true,
    supplier: "Iriso.fr",
    supplierUrl: "https://iriso.fr"
  },
  {
    id: 19,
    name: "Gourde isotherme inox 1L",
    price: 29.90,
    originalPrice: 37.90,
    category: "Survie",
    description: "Double paroi inox 18/8 sans BPA. Garde chaud 12h, froid 24h. Bouchon sport + bouchon bambou. Compatible mousqueton. Robuste et élégante.",
    badges: ["Bio", "Promo"],
    rating: 4.6,
    reviews: 267,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Gourde+Isotherme",
    shipping: "Livraison 2-3 jours",
    weight: "380 g",
    inStock: true,
    supplier: "BigBuy",
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 20,
    name: "Guide de survie illustré (livre)",
    price: 19.90,
    originalPrice: 26.90,
    category: "Formation",
    description: "320 pages illustrées : orientation, feu, abri, eau, nourriture, premiers secours. Par un ancien instructeur militaire. Le manuel de référence pour l'autonomie.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.9,
    reviews: 445,
    image: "https://placehold.co/400x300/2d5016/a8d672?text=Guide+Survie",
    shipping: "Livraison 2-3 jours",
    weight: "520 g",
    inStock: true,
    supplier: "Survie-Bushcraft.fr",
    supplierUrl: "https://survie-bushcraft.fr"
  }
];

// Catégories disponibles
const CATEGORIES = [
  { id: "all", name: "Tous les produits", emoji: "🏷️", count: 20 },
  { id: "Survie", name: "Survie", emoji: "🏕️", count: 8 },
  { id: "Jardinage", name: "Jardinage", emoji: "🌱", count: 6 },
  { id: "Énergie", name: "Énergie", emoji: "⚡", count: 3 },
  { id: "Conservation", name: "Conservation", emoji: "🫙", count: 2 },
  { id: "Outils", name: "Outils", emoji: "🔧", count: 2 },
  { id: "Formation", name: "Formation", emoji: "📚", count: 1 }
];

// Couleurs des badges
const BADGE_COLORS = {
  "Bio": { bg: "#e8f5e9", color: "#2e7d32", emoji: "🌿" },
  "Promo": { bg: "#fff3e0", color: "#e65100", emoji: "🔥" },
  "Bestseller": { bg: "#fce4ec", color: "#c62828", emoji: "⭐" },
  "Nouveau": { bg: "#e3f2fd", color: "#1565c0", emoji: "✨" },
  "Essentiel": { bg: "#f3e5f5", color: "#6a1b9a", emoji: "💎" }
};

// Fonctions utilitaires produits
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function getProductsByCategory(category) {
  if (category === "all") return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.badges.includes("Bestseller")).slice(0, 4);
}

function getNewProducts() {
  return PRODUCTS.filter(p => p.badges.includes("Nouveau"));
}

function getPromoProducts() {
  return PRODUCTS.filter(p => p.badges.includes("Promo"));
}

function searchProducts(query) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
}

function sortProducts(products, sortBy) {
  const sorted = [...products];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "reviews":
      return sorted.sort((a, b) => b.reviews - a.reviews);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    default:
      return sorted;
  }
}

function formatPrice(price) {
  return price.toFixed(2).replace('.', ',') + ' €';
}

function getDiscountPercent(price, originalPrice) {
  return Math.round((1 - price / originalPrice) * 100);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function renderBadges(badges) {
  return badges.map(badge => {
    const config = BADGE_COLORS[badge];
    return `<span class="badge" style="background:${config.bg};color:${config.color}">${config.emoji} ${badge}</span>`;
  }).join('');
}

function renderSupplier(product) {
  if (!product.supplier) return '';
  return `<div class="product-supplier" title="Fournisseur : ${product.supplier}">
    🏭 <span>${product.supplier}</span>
  </div>`;
}
