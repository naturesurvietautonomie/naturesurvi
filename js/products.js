// ============================================
// NatureSurvi - Base de données Produits
// ============================================

const PRODUCTS = [
  {
    id: 1,
    name: "Lampe frontale LED rechargeable Velamp",
    price: 14.46,
    originalPrice: 18.9,
    category: "Éclairage",
    description: "Lampe frontale LED rechargeable et réglable Velamp. Idéale pour la randonnée, le camping et les situations d'urgence. Légère, robuste, bandeau réglable confortable.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.8,
    reviews: 312,
    image: "img/prod2.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "160 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "velamp-5w-350lm",
    supplierPrice: 12.29,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "350 lm — 5W", price: 21.90, originalPrice: 27.90, supplierPrice: 12.29, supplierSku: "velamp-5w-350lm", image: "img/prod2.jpg" },
      { label: "400 lm — 6W", price: 25.90, originalPrice: 32.90, supplierPrice: 15.82, supplierSku: "velamp-6w-400lm", image: "img/prod1.jpg" }
    ]
  },
  {
    id: 3,
    name: "Lanterne frontale MIL-TEC tactique olive",
    price: 12.9,
    originalPrice: 16.9,
    category: "Éclairage",
    description: "Lanterne LED frontale MIL-TEC, coloris olive militaire. Robuste et fiable pour le camping, la chasse et les activités outdoor. Légère et pratique.",
    badges: ["Essentiel"],
    rating: 4.5,
    reviews: 156,
    image: "img/prod3.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "120 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "mil-tec-15170101",
    supplierPrice: 10.52,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 4,
    name: "Lanterne frontale Nebo Einstein 250lm",
    price: 14.9,
    originalPrice: 18.9,
    category: "Éclairage",
    description: "Lanterne LED frontale Nebo Einstein 250 lumens. Compacte et puissante pour la randonnée et le camping. Plusieurs modes d'éclairage.",
    badges: ["Nouveau"],
    rating: 4.4,
    reviews: 89,
    image: "img/prod4.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "140 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "nebo-einstein-250",
    supplierPrice: 12.09,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 5,
    name: "Couteau Opinel acier inoxydable",
    price: 10.29,
    originalPrice: 13.9,
    category: "Outils",
    description: "L'iconique couteau Opinel, fabriqué en France. Lame acier inoxydable, manche en bois de hêtre, virole tournante de sécurité. Indispensable en randonnée et bushcraft. Disponible en plusieurs tailles.",
    badges: ["Bestseller"],
    rating: 4.8,
    reviews: 445,
    image: "img/prod5.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "90 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "opinel-n8-inox",
    supplierPrice: 8.74,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "N°8 — 8,5 cm inox", price: 16.90, originalPrice: 21.90, supplierPrice: 8.74, supplierSku: "opinel-n8-inox", image: "img/prod5.jpg" },
      { label: "N°9 — 9 cm carbone", price: 18.90, originalPrice: 23.90, supplierPrice: 10.23, supplierSku: "opinel-n9-carbone", image: "img/prod17.jpg" },
      { label: "N°10 — 10 cm inox", price: 20.90, originalPrice: 26.90, supplierPrice: 12.15, supplierSku: "opinel-n10-inox", image: "img/prod6.jpg" },
      { label: "N°12 — 12 cm inox", price: 24.90, originalPrice: 31.90, supplierPrice: 14.80, supplierSku: "opinel-n12-inox", image: "img/prod7.jpg" }
    ]
  },
  {
    id: 8,
    name: "Pelle pliable de camping",
    price: 16.95,
    originalPrice: 17.9,
    category: "Outils",
    description: "Pelle pliable compacte et robuste pour le camping, la survie et le jardinage. Se range facilement dans un sac à dos. Indispensable en bivouac. Disponible en 2 modèles.",
    badges: ["Essentiel"],
    rating: 4.5,
    reviews: 178,
    image: "img/prod8.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "650 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "pelle-pliable-noire",
    supplierPrice: 11.33,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "Pelle noire métal", price: 19.90, originalPrice: 24.90, supplierPrice: 11.33, supplierSku: "pelle-pliable-noire", image: "img/prod8.jpg" },
      { label: "Cellfast Ideal Pro", price: 19.90, originalPrice: 24.90, supplierPrice: 11.08, supplierSku: "cellfast-ideal-pro", image: "img/prod20.jpg" }
    ]
  },
  {
    id: 9,
    name: "Tente de camping Bestway",
    price: 72,
    originalPrice: 33.9,
    category: "Survie",
    description: "Tente de camping Bestway en polyester fibre de verre. Facile à monter, imperméable, résistante. Idéale pour le camping estival et les festivals. Disponible en 2, 3 ou 4 personnes.",
    badges: ["Promo"],
    rating: 4.4,
    reviews: 112,
    image: "img/prod9.jpg",
    shipping: "Livraison 3-5 jours",
    weight: "3.2 kg",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "bestway-68084",
    supplierPrice: 22.04,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "2 personnes — 205×145 cm", price: 34.90, originalPrice: 43.90, supplierPrice: 22.04, supplierSku: "bestway-68084", image: "img/prod9.jpg" },
      { label: "3 personnes — 210×210 cm", price: 44.90, originalPrice: 56.90, supplierPrice: 29.99, supplierSku: "bestway-68085", image: "img/prod10.jpg" },
      { label: "4 personnes — 240×200 cm", price: 52.90, originalPrice: 66.90, supplierPrice: 35.90, supplierSku: "bestway-68143", image: "img/prod11.jpg" }
    ]
  },

  {
    id: 14,
    name: "Réchaud à gaz Open Norte camping",
    price: 28.13,
    originalPrice: 35.9,
    category: "Survie",
    description: "Réchaud à gaz Open Norte compact et puissant. Idéal pour le camping et la randonnée. Allumage piézo intégré, régulateur de flamme précis. Robuste et fiable.",
    badges: ["Bestseller"],
    rating: 4.6,
    reviews: 189,
    image: "img/prod14.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "350 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "open-norte-rechaud",
    supplierPrice: 23.91,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 15,
    name: "Lampe frontale Black Diamond Spot 400",
    price: 35,
    originalPrice: 39.9,
    category: "Éclairage",
    description: "Lampe frontale Black Diamond Spot 400 lumens, rechargeable. Étanche IPX8, autonomie jusqu'à 200h. La référence des alpinistes et randonneurs exigeants.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.8,
    reviews: 312,
    image: "img/prod15.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "115 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "black-diamond-spot-400",
    supplierPrice: 26.91,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 16,
    name: "Lanterne LED Brennenstuhl frontale 200lm",
    price: 25.71,
    originalPrice: 32.9,
    category: "Éclairage",
    description: "Lanterne frontale LED Brennenstuhl 1178780, 200 lumens. Marque allemande reconnue pour sa fiabilité. Légère, réglable, idéale pour le bricolage et l'outdoor.",
    badges: ["Essentiel"],
    rating: 4.5,
    reviews: 145,
    image: "img/prod16.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "130 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "brennenstuhl-1178780",
    supplierPrice: 21.85,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },

  {
    id: 18,
    name: "Glacière isotherme Marbueno 28x20cm",
    price: 11,
    originalPrice: 13.9,
    category: "Survie",
    description: "Glacière isotherme Marbueno SUMMER, 28x20x10 cm, polyester. Maintient le froid plusieurs heures. Légère et pliable, idéale pour pique-nique et randonnée.",
    badges: ["Promo"],
    rating: 4.3,
    reviews: 76,
    image: "img/prod18.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "380 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "marbueno-10179a",
    supplierPrice: 9.09,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 19,
    name: "Lampe frontale Stak LED 10W 1200lm",
    price: 39.82,
    originalPrice: 49.9,
    category: "Éclairage",
    description: "Lampe frontale Stak 10W ultra-puissante 1200 lumens. Rechargeable USB-C, autonomie longue durée. Pour les sorties nocturnes exigeantes et la spéléologie.",
    badges: ["Nouveau", "Essentiel"],
    rating: 4.7,
    reviews: 67,
    image: "img/prod19.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "200 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "stak-10w-1200lm",
    supplierPrice: 33.84,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 21,
    name: "Sac à dos randonnée Mammut Cargon",
    price: 91,
    originalPrice: 99.9,
    category: "Sacs à dos",
    description: "Sac à dos Mammut Cargon, qualité suisse premium. Grande capacité pour les longues randonnées et expéditions. Tissu robuste, dos ventilé, bretelles ergonomiques. Disponible en 2 tailles.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.8,
    reviews: 78,
    image: "img/prod22.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "1.4 kg",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "mammut-cargon-40l",
    supplierPrice: 66.68,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "40 L — randonnée", price: 100.90, originalPrice: 125.90, supplierPrice: 66.68, supplierSku: "mammut-cargon-40l", image: "img/prod22.jpg" },
      { label: "90 L — expédition", price: 104.90, originalPrice: 131.90, supplierPrice: 76.94, supplierSku: "mammut-cargon-90l", image: "img/prod21.jpg" }
    ]
  },
  {
    id: 22,
    name: "Sac à dos Mammut Alto 24L",
    price: 79,
    originalPrice: 89.9,
    category: "Sacs à dos",
    description: "Sac à dos Mammut Alto 24L, parfait pour les randonnées à la journée. Format compact mais bien équipé. Marque suisse de référence pour l'outdoor.",
    badges: ["Nouveau"],
    rating: 4.6,
    reviews: 45,
    image: "img/prod23.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "780 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "mammut-alto-24",
    supplierPrice: 59.75,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 23,
    name: "Sac à dos Reebok Noah polyvalent",
    price: 24,
    originalPrice: 27.9,
    category: "Sacs à dos",
    description: "Sac à dos casual Reebok Noah. Polyvalent pour le sport, l'école ou les sorties en plein air. Compartiments multiples, robuste et confortable.",
    badges: ["Promo"],
    rating: 4.4,
    reviews: 132,
    image: "img/prod27.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "550 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "reebok-noah",
    supplierPrice: 18.96,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 24,
    name: "Chargeur universel Varta piles rechargeables",
    price: 23.31,
    originalPrice: 29.9,
    category: "Énergie",
    description: "Chargeur de batterie Varta universel. Compatible AA, AAA, C, D et 9V. Indispensable pour économiser et être autonome en piles. Marque allemande de référence.",
    badges: ["Essentiel"],
    rating: 4.7,
    reviews: 234,
    image: "img/prod24.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "420 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "varta-57658",
    supplierPrice: 19.81,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 25,
    name: "Pack piles rechargeables Varta AA + AAA",
    price: 6.01,
    originalPrice: 7.9,
    category: "Énergie",
    description: "Pack piles rechargeables Varta 1,2V AA et AAA. Économiques et écologiques, rechargeables jusqu'à 1000 fois. Idéal pour lampes torches, télécommandes et appareils outdoor.",
    badges: ["Bestseller"],
    rating: 4.8,
    reviews: 312,
    image: "img/prod25.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "200 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "varta-92400121810",
    supplierPrice: 5.01,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 26,
    name: "Piles Duracell Plus Power Boost AAA (12 unités)",
    price: 8.59,
    originalPrice: 10.9,
    category: "Énergie",
    description: "Pack de 12 piles Duracell Plus Power Boost AAA 1,5V. Longue durée, performance supérieure. Pour vos appareils électroniques outdoor : lampes, GPS, talkies-walkies.",
    badges: ["Essentiel"],
    rating: 4.6,
    reviews: 189,
    image: "img/prod26.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "150 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "duracell-aaa-12",
    supplierPrice: 7.30,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 29,
    name: "Canne à pêche Kali Kunnan",
    price: 19,
    originalPrice: 22.9,
    category: "Pêche",
    description: "Canne à pêche télescopique Kali Kunnan. Légère et robuste pour la pêche en rivière, lac ou mer. Se range facilement pour le transport. Disponible en 2 longueurs.",
    badges: ["Promo"],
    rating: 4.4,
    reviews: 134,
    image: "img/prod29.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "280 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "kali-moana-300",
    supplierPrice: 15.41,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "240 cm — légère", price: 21.90, originalPrice: 27.90, supplierPrice: 11.84, supplierSku: "kali-blade-240", image: "img/prod30.jpg" },
      { label: "300 cm — polyvalente", price: 25.90, originalPrice: 32.90, supplierPrice: 15.41, supplierSku: "kali-moana-300", image: "img/prod29.jpg" }
    ]
  },
  {
    id: 31,
    name: "Boîte de rangement pêche Kali Kunnan",
    price: 9.9,
    originalPrice: 11.9,
    category: "Pêche",
    description: "Boîte de rangement pour accessoires de pêche Kali Kunnan. Compartiments modulables pour hameçons, leurres et plombs. Pratique et résistante pour emporter partout.",
    badges: ["Essentiel"],
    rating: 4.3,
    reviews: 76,
    image: "img/prod31.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "320 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "kali-boite-rangement",
    supplierPrice: 8.01,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 32,
    name: "Caméra de sport 4K Sunstech Adventure",
    price: 39,
    originalPrice: 46.9,
    category: "Électronique outdoor",
    description: "Caméra de sport 4K Sunstech Adventure. Filmez vos aventures en haute définition. Résistante aux chocs, idéale pour le vélo, la randonnée, le kayak. Légère et compacte.",
    badges: ["Nouveau", "Promo"],
    rating: 4.3,
    reviews: 67,
    image: "img/prod32.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "82 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "sunstech-adventure4k",
    supplierPrice: 32.13,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 33,
    name: "Caméra de sport SK8 Elite outdoor",
    price: 54.9,
    originalPrice: 66.9,
    category: "Électronique outdoor",
    description: "Caméra de sport SK8 Elite pour l'outdoor extrême. Résistante à l'eau et aux chocs. Parfaite pour VTT, ski, escalade et plongée. Accessoires de fixation inclus.",
    badges: ["Essentiel"],
    rating: 4.4,
    reviews: 89,
    image: "img/prod33.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "95 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "sk8-camav002",
    supplierPrice: 45.01,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 34,
    name: "Bracelet connecté Xiaomi Band outdoor",
    price: 58.64,
    originalPrice: 74.9,
    category: "Électronique outdoor",
    description: "Bracelet d'activités Xiaomi 1,56\" pour le suivi sportif outdoor. GPS, cardiofréquencemètre, compteur de pas, altimètre. Étanche, autonomie 14 jours. Parfait pour la randonnée.",
    badges: ["Nouveau"],
    rating: 4.6,
    reviews: 134,
    image: "img/prod34.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "35 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "xiaomi-xmsh15hm",
    supplierPrice: 49.84,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 35,
    name: "Veste outdoor Alphaventure homme",
    price: 17,
    originalPrice: 16.9,
    category: "Vêtements outdoor",
    description: "Veste légère Alphaventure Bidinamarca pour homme, coloris kaki militaire. Coupe-vent, idéale pour la chasse, la randonnée et les activités outdoor. Poches zippées.",
    badges: ["Promo"],
    rating: 4.3,
    reviews: 78,
    image: "img/prod35.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "380 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "alphaventure-bidinamarca-kaki",
    supplierPrice: 11.49,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "Légère — kaki", price: 20.90, originalPrice: 26.90, supplierPrice: 11.49, supplierSku: "alphaventure-bidinamarca-kaki", image: "img/prod35.jpg" },
      { label: "Épaisse — Turch kaki", price: 43.90, originalPrice: 54.90, supplierPrice: 29.02, supplierSku: "alphaventure-turch-kaki", image: "img/prod36.jpg" }
    ]
  },
  {
    id: 37,
    name: "Casque d'escalade Black Diamond",
    price: 47,
    originalPrice: 54.9,
    category: "Escalade",
    description: "Casque d'escalade Black Diamond léger et résistant. Protection optimale pour l'escalade en falaise et en salle. Ventilation efficace, réglage rapide. Norme CE EN12492.",
    badges: ["Essentiel"],
    rating: 4.7,
    reviews: 156,
    image: "img/prod37.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "285 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "bd620208",
    supplierPrice: 36.63,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 38,
    name: "Harnais d'escalade Kong Sierra Duo",
    price: 24,
    originalPrice: 25.9,
    category: "Escalade",
    description: "Harnais d'escalade Kong Sierra Duo pour débutants. Confortable et sécurisé, adapté à la salle et à la falaise. Réglages rapides, ceinture ventrale renforcée.",
    badges: ["Essentiel"],
    rating: 4.5,
    reviews: 89,
    image: "img/prod38.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "420 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "kong-sierra-duo",
    supplierPrice: 17.08,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 39,
    name: "Slackline Schildkröt 15m jaune",
    price: 72,
    originalPrice: 89.9,
    category: "Escalade",
    description: "Slackline Schildkröt 15 mètres, couleur jaune vif. Kit complet avec sangle, tendeur et protège-arbre. Idéal pour la pratique en forêt, parc ou jardin. Pour tous niveaux.",
    badges: ["Nouveau"],
    rating: 4.4,
    reviews: 45,
    image: "img/prod39.jpg",
    shipping: "Livraison 3-5 jours",
    weight: "1.2 kg",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "slackline-schildkroet-15m",
    supplierPrice: 61.20,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 40,
    name: "Pain croustillant randonnée Trek'n Eat",
    price: 7.78,
    originalPrice: 9.9,
    category: "Alimentation outdoor",
    description: "Pain croustillant déshydraté Trek'n Eat 500g. Léger, longue conservation, parfait pour le bivouac et les randonnées multi-jours. Rapide à réhydrater, goût naturel.",
    badges: ["Essentiel", "Survie"],
    rating: 4.5,
    reviews: 52,
    image: "img/prod40.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "500 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "trek-n-eat-tk30101040n",
    supplierPrice: 6.61,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 41,
    name: "Céréales lyophilisées Trek'n Eat",
    price: 7.06,
    originalPrice: 8.9,
    category: "Alimentation outdoor",
    description: "Céréales lyophilisées Trek'n Eat 150g. Petit-déjeuner de bivouac complet — nutritif et ultra-léger. Prêt en 5 minutes, idéal pour toutes les aventures outdoor.",
    badges: ["Bestseller"],
    rating: 4.6,
    reviews: 78,
    image: "img/prod41.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "150 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "trek-n-eat-tk30101005n",
    supplierPrice: 6.00,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 42,
    name: "Barre énergétique Naak Ultra Energy caramel",
    price: 4.15,
    originalPrice: 4.9,
    category: "Alimentation outdoor",
    description: "Barre énergétique Naak Ultra Energy 50g, saveur caramel café. Riche en protéines et glucides complexes. Idéale avant et pendant l'effort outdoor : randonnée, course, cyclisme.",
    badges: ["Nouveau"],
    rating: 4.4,
    reviews: 34,
    image: "img/prod42.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "50 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "naak-ultra-energy-caramel",
    supplierPrice: 3.15,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 43,
    name: "Sac d'hydratation Joluvi 2,5L",
    price: 9,
    originalPrice: 10.9,
    category: "Cyclisme & Trail",
    description: "Sac d'hydratation Joluvi 2,5L léger et ergonomique. Poche à eau intégrée, tube buveur, sangles réglables. Idéal pour le trail, le VTT et la randonnée rapide.",
    badges: ["Essentiel", "Promo"],
    rating: 4.4,
    reviews: 89,
    image: "img/prod43.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "280 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "joluvi-hydratation-25l",
    supplierPrice: 7.03,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 44,
    name: "Sacoche de vélo PRO Performance 5,5L",
    price: 31,
    originalPrice: 37.9,
    category: "Cyclisme & Trail",
    description: "Sacoche de vélo PRO Performance 5,5L. Fixation rapide sur guidon ou selle. Imperméable, idéale pour les sorties longue distance. Compatible avec tous types de vélos.",
    badges: ["Nouveau"],
    rating: 4.6,
    reviews: 43,
    image: "img/prod44.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "320 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "pro-performance-55l",
    supplierPrice: 25.02,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },

  {
    id: 46,
    name: "Montre Casio Diver 100M",
    price: 47.88,
    originalPrice: 61.9,
    category: "Montres outdoor",
    description: "Montre Casio Diver 100M, boîtier 44,5mm. Étanche jusqu'à 100 mètres. Idéale pour la plongée, la natation et les activités aquatiques. Robuste et fiable.",
    badges: ["Essentiel"],
    rating: 4.6,
    reviews: 178,
    image: "img/prod46.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "68 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "casio-diver-100m",
    supplierPrice: 40.69,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 48,
    name: "Plat lyophilisé Trek'n Eat hamburger",
    price: 10.06,
    originalPrice: 13.9,
    category: "Alimentation outdoor",
    description: "Plat lyophilisé Trek'n Eat hamburgers. Repas complet pour le bivouac et la randonnée. Facile à préparer : ajoutez juste de l'eau chaude. Goût savoureux, haute valeur nutritive.",
    badges: ["Bestseller"],
    rating: 4.5,
    reviews: 89,
    image: "img/prod48.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "200 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "trek-n-eat-hamburgers",
    supplierPrice: 8.55,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 49,
    name: "Dessert lyophilisé Trek'n Eat chocolat",
    price: 7.69,
    originalPrice: 9.9,
    category: "Alimentation outdoor",
    description: "Dessert lyophilisé Trek'n Eat au chocolat 100g. Le petit plaisir sucré du bivouac. Léger, longue conservation, préparation ultra-rapide à l'eau chaude.",
    badges: ["Nouveau"],
    rating: 4.4,
    reviews: 56,
    image: "img/prod49.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "100 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "trek-n-eat-chocolat",
    supplierPrice: 6.53,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 50,
    name: "Légumes lyophilisés Trek'n Eat",
    price: 9.9,
    originalPrice: 11.9,
    category: "Alimentation outdoor",
    description: "Légumes lyophilisés Trek'n Eat. Garniture légère et nutritive pour le camp. À ajouter à vos repas en bivouac. Conservation 5 ans, poids minimal.",
    badges: ["Essentiel"],
    rating: 4.3,
    reviews: 67,
    image: "img/prod50.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "150 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "trek-n-eat-legumes",
    supplierPrice: 7.95,
    supplierUrl: "https://www.bigbuy.eu/fr"
  },
  {
    id: 51,
    name: "Gourde randonnée outdoor",
    price: 9.28,
    originalPrice: 11.9,
    category: "Cyclisme & Trail",
    description: "Gourde Regatta 1L légère et résistante. Bouchon à vis étanche, graduation intérieure. Indispensable pour la randonnée, le camping et le sport en plein air.",
    badges: ["Essentiel", "Promo"],
    rating: 4.4,
    reviews: 145,
    image: "img/prod51.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "148 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "regatta-rce557-800",
    supplierPrice: 7.88,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "1L — Regatta noire", price: 15.90, originalPrice: 19.90, supplierPrice: 7.88, supplierSku: "regatta-rce557-800", image: "img/prod51.jpg" },
      { label: "600ml — Picture blanche", price: 29.90, originalPrice: 37.90, supplierPrice: 18.98, supplierSku: "picture-campei-blanc", image: "img/prod52.jpg" }
    ]
  }
];

// Catégories disponibles
const CATEGORIES = [
  { id: "all", name: "Tous les produits", emoji: "🏷️", count: 40 },
  { id: "Survie", name: "Survie", emoji: "🏕️", count: 6 },
  { id: "Éclairage", name: "Éclairage", emoji: "🔦", count: 4 },
  { id: "Alimentation outdoor", name: "Alimentation outdoor", emoji: "🥾", count: 6 },
  { id: "Montres outdoor", name: "Montres outdoor", emoji: "⌚", count: 2 },
  { id: "Sacs à dos", name: "Sacs à dos", emoji: "🎒", count: 3 },
  { id: "Pêche", name: "Pêche", emoji: "🎣", count: 2 },
  { id: "Énergie", name: "Énergie", emoji: "⚡", count: 3 },
  { id: "Électronique outdoor", name: "Électronique outdoor", emoji: "📡", count: 3 },
  { id: "Escalade", name: "Escalade", emoji: "🧗", count: 3 },
  { id: "Cyclisme & Trail", name: "Cyclisme & Trail", emoji: "🚵", count: 3 },
  { id: "Vêtements outdoor", name: "Vêtements outdoor", emoji: "🧥", count: 1 },
  { id: "Outils", name: "Outils", emoji: "🔪", count: 2 }
];

// Couleurs des badges
const BADGE_COLORS = {
  "Bio": { bg: "#e8f5e9", color: "#2e7d32", emoji: "🌿" },
  "Promo": { bg: "#fff3e0", color: "#e65100", emoji: "🔥" },
  "Bestseller": { bg: "#fce4ec", color: "#c62828", emoji: "⭐" },
  "Nouveau": { bg: "#e3f2fd", color: "#1565c0", emoji: "✨" },
  "Essentiel": { bg: "#f3e5f5", color: "#6a1b9a", emoji: "💎" },
  "Survie": { bg: "#e8f5e9", color: "#1b5e20", emoji: "🏕️" }
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

function renderProductCard(product) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const badge = (product.badges && product.badges[0]) ? product.badges[0] : product.category;
  return `
    <div class="jard-card" onclick="window.location='produit.html?id=${product.id}'" style="cursor:pointer">
      <img class="jard-card-img" src="${product.image}" alt="${product.name}" loading="lazy">
      <div class="jard-card-body">
        <span class="jard-cat-badge">🎒 ${badge}</span>
        <h3 class="jard-card-title">${product.name}</h3>
        <p class="jard-card-desc">${product.description ? product.description.substring(0, 90) + (product.description.length > 90 ? '…' : '') : ''}</p>
        <div style="color:#f59e0b;font-size:0.82rem;margin-bottom:8px;">${renderStars(product.rating)} <span style="color:#888;font-size:0.78rem;">(${product.reviews})</span></div>
        <div class="jard-card-footer">
          <div>
            <span class="jard-price">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span style="font-size:0.8rem;color:#999;text-decoration:line-through;margin-left:6px;">${formatPrice(product.originalPrice)}</span>` : ''}
            ${discount > 0 ? `<span style="background:#c0392b;color:#fff;font-size:0.72rem;font-weight:700;padding:2px 7px;border-radius:10px;margin-left:6px;">-${discount}%</span>` : ''}
          </div>
          <button onclick="event.stopPropagation();Cart.add(${product.id})" class="jard-btn" type="button">🛒 Ajouter au panier</button>
        </div>
      </div>
    </div>
  `;
}
