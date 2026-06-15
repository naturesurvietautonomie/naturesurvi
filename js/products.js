﻿// ============================================
// NatureSurvi - Base de données Produits
// ============================================

const PRODUCTS = [
  {
    id: 1,
    name: "Lampe frontale LED rechargeable Velamp",
    price: 15,
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
      { label: "350 lm — 5W", description: "Version compacte 5W/350 lm. Idéale pour la randonnée légère et les sorties nocturnes courtes. Légère, autonomie standard.", price: 15, originalPrice: 23, supplierPrice: 12.29, supplierSku: "velamp-5w-350lm", image: "img/prod2.jpg" },
      { label: "400 lm — 6W", description: "Version puissante 6W/400 lm. Pour les longues nuits en bivouac ou les sentiers techniques. Faisceau plus large et plus lumineux.", price: 19, originalPrice: 29, supplierPrice: 15.82, supplierSku: "velamp-6w-400lm", image: "img/prod1.jpg" }
    ]
  },
  {
    id: 3,
    name: "Lanterne frontale MIL-TEC tactique olive",
    price: 13,
    originalPrice: 20,
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
    price: 15,
    originalPrice: 22,
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
    price: 11,
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
      { label: "N°8 — 8,5 cm inox", description: "Le classique Opinel N°8, lame inox 8,5 cm — la taille la plus polyvalente pour la cuisine en bivouac et les usages quotidiens. Made in France.", price: 11, originalPrice: 16, supplierPrice: 8.74, supplierSku: "opinel-n8-inox", image: "img/prod5.jpg" },
      { label: "N°9 — 9 cm carbone", description: "Opinel N°9 lame carbone 9 cm — tranchant supérieur pour les pratiquants du bushcraft. Prend un fil rasoir, s'affûte facilement sur pierre.", price: 13, originalPrice: 19, supplierPrice: 10.23, supplierSku: "opinel-n9-carbone", image: "img/prod17.jpg" },
      { label: "N°10 — 10 cm inox", description: "Opinel N°10 lame inox 10 cm — pour les travaux plus lourds : taille, découpe de bois, préparation culinaire en forêt.", price: 15, originalPrice: 23, supplierPrice: 12.15, supplierSku: "opinel-n10-inox", image: "img/prod6.jpg" }
    ]
  },
  {
    id: 8,
    name: "Pelle pliable de camping",
    price: 14,
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
      { label: "Pelle noire métal", description: "Pelle pliable métal noire — robuste et compacte. Idéale pour creuser un abri, un trou de feu ou déblayer un sentier. Poignée antidérapante.", price: 14, originalPrice: 21, supplierPrice: 11.33, supplierSku: "pelle-pliable-noire", image: "img/prod8.jpg" },
      { label: "Cellfast Ideal Pro", description: "Pelle Cellfast Ideal Pro — version haut de gamme avec lame renforcée et manche ergonomique caoutchouté. Meilleure prise en main pour les sols durs.", price: 14, originalPrice: 21, supplierPrice: 11.08, supplierSku: "cellfast-ideal-pro", image: "img/prod20.jpg" }
    ]
  },
  {
    id: 9,
    name: "Tente de camping Bestway",
    price: 26,
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
      { label: "2 personnes — 205×145 cm", description: "Tente 2 places 205×145 cm — légère et rapide à monter. Parfaite pour un couple ou solo avec du matériel. Double toit imperméable.", price: 26, originalPrice: 41, supplierPrice: 22.04, supplierSku: "bestway-68084", image: "img/prod9.jpg" }
    ]
  },

  {
    id: 14,
    name: "Réchaud à gaz Open Norte camping",
    price: 29,
    originalPrice: 44,
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
    price: 32,
    originalPrice: 49,
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
    price: 26,
    originalPrice: 40,
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
    originalPrice: 17,
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
    price: 40,
    originalPrice: 62,
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
    price: 80,
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
      { label: "40 L — randonnée", description: "Mammut Cargon 40L — le compagnon idéal pour les randonnées de 2-4 jours. Dos ventilé, ceinture ergonomique, tissu Cordura résistant.", price: 80, originalPrice: 122, supplierPrice: 66.68, supplierSku: "mammut-cargon-40l", image: "img/prod22.jpg" }
    ]
  },
  {
    id: 22,
    name: "Sac à dos Mammut Alto 24L",
    price: 71,
    originalPrice: 109,
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
    price: 23,
    originalPrice: 35,
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
    price: 24,
    originalPrice: 37,
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
    price: 6,
    originalPrice: 10,
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
    price: 9,
    originalPrice: 14,
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
      { label: "240 cm — légère", description: "Canne télescopique 240 cm — légère et maniable pour la pêche en rivière étroite, lac calme ou mare. Idéale pour débuter.", price: 14, originalPrice: 22, supplierPrice: 11.84, supplierSku: "kali-blade-240", image: "img/prod30.jpg" },
      { label: "300 cm — polyvalente", description: "Canne télescopique 300 cm — portée plus longue pour accéder aux poissons en eau profonde ou berges larges. Polyvalente toutes conditions.", price: 19, originalPrice: 29, supplierPrice: 15.41, supplierSku: "kali-moana-300", image: "img/prod29.jpg" }
    ]
  },
  {
    id: 31,
    name: "Boîte de rangement pêche Kali Kunnan",
    price: 10,
    originalPrice: 15,
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
    price: 38,
    originalPrice: 59,
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
    price: 53,
    originalPrice: 82,
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
    price: 59,
    originalPrice: 91,
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
    price: 14,
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
      { label: "Légère — kaki", description: "Veste légère Alphaventure Bidinamarca kaki — coupe-vent fin pour les journées fraîches. Poids plume, tient dans la poche. Coloris militaire discret.", price: 14, originalPrice: 21, supplierPrice: 11.49, supplierSku: "alphaventure-bidinamarca-kaki", image: "img/prod35.jpg" }
    ]
  },
  {
    id: 37,
    name: "Casque d'escalade Black Diamond",
    price: 44,
    originalPrice: 67,
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
    price: 21,
    originalPrice: 32,
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
    originalPrice: 112,
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
    price: 8,
    originalPrice: 13,
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
    price: 8,
    originalPrice: 11,
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
    price: 4,
    originalPrice: 6,
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
    originalPrice: 13,
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
    price: 30,
    originalPrice: 46,
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
    price: 48,
    originalPrice: 74,
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
    price: 11,
    originalPrice: 16,
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
    price: 8,
    originalPrice: 12,
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
    price: 10,
    originalPrice: 15,
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
    price: 10,
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
      { label: "1L — Regatta noire", description: "Gourde Regatta 1L noire — grande contenance pour les longues sorties. Bouchon à vis étanche, graduation lisible, résistante aux chocs.", price: 10, originalPrice: 15, supplierPrice: 7.88, supplierSku: "regatta-rce557-800", image: "img/prod51.jpg" }
    ]
  },

  // ============================================================
  // NOUVEAUX PRODUITS SURVIE — id 60-71 (ajoutés 2026-05-24)
  // ============================================================

  {
    id: 60,
    name: "Bracelet paracord survie 7 en 1",
    price: 7,
    originalPrice: 14.9,
    category: "Outils",
    description: "Bracelet de survie paracord 7 en 1 : corde 3m, firestarter, sifflet, boussole, couteau, grattoir, lampe LED. Indispensable en randonnée et survie. Réglable.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.6,
    reviews: 412,
    image: "img/prod_paracord.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "45 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 3.20,
    variants: [
      { label: "Noir", description: "Bracelet paracord noir — discret et sobre, parfait pour un usage quotidien. 3m de corde paracord 550, firestarter, sifflet, boussole intégrés.", price: 7, originalPrice: 6, supplierPrice: 3.20, image: "img/prod_paracord.jpg" },
      { label: "Vert militaire", description: "Bracelet paracord vert militaire — coloris tactique pour les amateurs de survie et bushcraft. Kit 7-en-1 complet.", price: 7, originalPrice: 6, supplierPrice: 3.20, image: "img/prod_paracord.jpg" },
      { label: "Kaki", description: "Bracelet paracord kaki — ton neutre polyvalent. S'associe avec tout équipement outdoor. Kit survie 7 outils intégrés.", price: 7, originalPrice: 6, supplierPrice: 3.20, image: "img/prod_paracord.jpg" },
      { label: "Orange fluo", description: "Bracelet paracord orange fluo — haute visibilité pour les sports extrêmes et secours en montagne. Repérage facilité.", price: 7, originalPrice: 6, supplierPrice: 3.20, image: "img/prod_paracord.jpg" },
      { label: "Camouflage", description: "Bracelet paracord camouflage — parfait pour la chasse et les activités discrètes en forêt. Kit 7-en-1 intégral.", price: 7, originalPrice: 6, supplierPrice: 3.20, image: "img/prod_paracord.jpg" }
    ]
  },
  {
    id: 61,
    name: "Briquet de survie ferrocérium",
    price: 5,
    originalPrice: 12.9,
    category: "Outils",
    description: "Allume-feu en ferrocérium avec grattoir en acier inoxydable. Produit jusqu'à 3000°C d'étincelles. Fonctionne par tous les temps, même mouillé. Indispensable pour survivre en forêt.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.7,
    reviews: 528,
    image: "img/prod_firestarter.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "60 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 2.80,
    variants: [
      { label: "Standard 10cm", description: "Firestarter 10 cm — version standard, idéal pour débuter. Produit jusqu'à 3 000°C d'étincelles. Compact et léger pour le sac à dos.", price: 5, originalPrice: 6, supplierPrice: 2.80, image: "img/prod_firestarter.jpg" },
      { label: "Large 12cm — durée x3", description: "Firestarter 12 cm large — durée de vie 3× supérieure. Pour les sorties longues ou les kits 72h. Grattoir acier inclus.", price: 7, originalPrice: 8, supplierPrice: 4.10, image: "img/prod_firestarter.jpg" },
      { label: "XL 15cm + cordage", description: "Firestarter XL 15 cm avec cordage paracord 1m intégré — le plus endurant. Idéal pour les expéditions et l'enseignement de la survie.", price: 7, originalPrice: 10, supplierPrice: 5.50, image: "img/prod_firestarter.jpg" }
    ]
  },
  {
    id: 62,
    name: "Couverture de survie isotherme",
    price: 3,
    originalPrice: 8.9,
    category: "Survie",
    description: "Couverture de survie isotherme dorée/argentée. Réfléchit 90% de la chaleur corporelle. Légère (55g), compacte, imperméable. Essentielle en kit 72h et premiers secours.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.7,
    reviews: 654,
    image: "img/prod_couverture.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "55 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 1.80,
    variants: [
      { label: "×1 — Individuelle", description: "1 couverture de survie isotherme — à glisser dans chaque sac à dos, voiture ou kit 72h. Légère 55g, réfléchit 90% de la chaleur.", price: 3, originalPrice: 4, supplierPrice: 1.80, image: "img/prod_couverture.jpg" },
      { label: "×4 — Pack famille", description: "Pack 4 couvertures de survie — équipez toute la famille ou le groupe. Pratique en voyage, randonnée ou pour les préparateurs.", price: 8, originalPrice: 12, supplierPrice: 6.50, image: "img/prod_couverture.jpg" }
    ]
  },
  {
    id: 63,
    name: "Sifflet de survie 120 dB",
    price: 2,
    originalPrice: 7.9,
    category: "Outils",
    description: "Sifflet de survie ultra-puissant 120 dB, audible à 1 km. Sans bille (fonctionne mouillé), clip de ceinture inclus. Indispensable en randonnée, escalade et urgences.",
    badges: ["Essentiel"],
    rating: 4.6,
    reviews: 298,
    image: "img/prod_sifflet.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "15 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 1.50,
    variants: [
      { label: "Orange — 120 dB", description: "Sifflet 120 dB orange — haute visibilité et puissance maximale. Sans bille : fonctionne même mouillé. Clip de ceinture inclus.", price: 2, originalPrice: 3, supplierPrice: 1.50, image: "img/prod_sifflet.jpg" },
      { label: "Noir — 120 dB", description: "Sifflet 120 dB noir — discret et compact. Puissance identique, parfait pour intégrer à un sac ou harnais d'escalade.", price: 2, originalPrice: 3, supplierPrice: 1.50, image: "img/prod_sifflet.jpg" },
      { label: "3-en-1 boussole+sifflet+thermomètre", description: "Kit 3-en-1 : boussole, sifflet 120 dB et thermomètre — tout en un clip. L'essentiel de navigation et sécurité en format ultra-compact.", price: 4, originalPrice: 6, supplierPrice: 3.20, image: "img/prod_sifflet.jpg" }
    ]
  },
  {
    id: 64,
    name: "Couteau de survie multifonction",
    price: 20,
    originalPrice: 27.9,
    category: "Outils",
    description: "Couteau de survie lame fixe en acier inox 440, manche ergonomique. Inclus : pierre à affûter, allume-feu, sifflet, étui cordura. Polyvalent pour la chasse, le bushcraft et l'outdoor.",
    badges: ["Bestseller"],
    rating: 4.5,
    reviews: 187,
    image: "img/prod_couteau_survie.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "280 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 7.50,
    variants: [
      { label: "Lame 15cm — noir", description: "Couteau survie lame fixe 15 cm inox noire — format idéal pour le bushcraft, la cuisine en bivouac et les activités outdoor. Étui Cordura inclus.", price: 20, originalPrice: 14, supplierPrice: 7.50, image: "img/prod_couteau_survie.jpg" },
      { label: "Lame 20cm + hachette", description: "Couteau 20 cm + mini-hachette intégrée — deux outils en un pour couper du bois, débiter de la viande et construire un abri en forêt.", price: 22, originalPrice: 22, supplierPrice: 12.00, image: "img/prod_couteau_survie.jpg" },
      { label: "Machette 35cm", description: "Machette 35 cm — pour défricher, couper des branches épaisses et ouvrir un chemin en jungle ou sous-bois dense. Lame inox traitée.", price: 25, originalPrice: 30, supplierPrice: 16.50, image: "img/prod_couteau_survie.jpg" }
    ]
  },
  {
    id: 65,
    name: "Kit de survie 72h complet",
    price: 30,
    originalPrice: 44.9,
    category: "Survie",
    description: "Kit de survie 72h tout-en-un : couverture isotherme, allume-feu, sifflet, corde paracord 5m, filtre eau, boussole, couteau pliant, rations énergie. Idéal famille ou individuel.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.7,
    reviews: 389,
    image: "img/prod_kit72h.jpg",
    shipping: "Livraison 3-5 jours",
    weight: "850 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 11.50,
    variants: [
      { label: "Kit individuel — 12 pièces", description: "Kit survie 12 pièces individuel : couverture, firestarter, sifflet, paracord 5m, filtre eau, boussole, couteau pliant, rations, lampe, bâton lumineux, gants, trousse.", price: 30, originalPrice: 21, supplierPrice: 11.50, image: "img/prod_kit72h.jpg" },
      { label: "Kit famille 4 — 24 pièces", description: "Kit survie 24 pièces pour famille de 4 — tout le nécessaire pour 72h d'autonomie. Organisé dans un sac imperméable. Prêt à saisir en urgence.", price: 35, originalPrice: 37, supplierPrice: 20.00, image: "img/prod_kit72h_famille.jpg" },
      { label: "Kit pro — 32 pièces premium", description: "Kit survie 32 pièces premium — matériel de qualité professionnelle. Inclus radio d'urgence, filtre eau multi-étapes, outils multi-fonctions, rations 2000 kcal.", price: 40, originalPrice: 53, supplierPrice: 29.00, image: "img/prod_kit72h_pro.jpg" }
    ]
  },
  {
    id: 66,
    name: "Filtre à eau portable survie",
    price: 20,
    originalPrice: 29.9,
    category: "Survie",
    description: "Filtre à eau portable de survie — élimine 99,9999% des bactéries et parasites. Débit 1L/min, filtre jusqu'à 100 000 litres. Léger 57g, compatible toutes gourdes. Certifié survie.",
    badges: ["Essentiel", "Bestseller"],
    rating: 4.8,
    reviews: 456,
    image: "img/prod_filtre_eau.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "57 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 7.20,
    variants: [
      { label: "Filtre paille individuel", description: "Filtre paille individuel — buvez directement dans n'importe quelle source. Élimine 99,9999% bactéries, 0 produits chimiques. 57g, tient dans une poche.", price: 20, originalPrice: 14, supplierPrice: 7.20, image: "img/prod_filtre_eau.jpg" },
      { label: "Filtre bouteille 0.5L", description: "Filtre bouteille 500 mL — filtration intégrée dans la bouteille. Buvez partout sans traitement chimique préalable. Capacité 100 000 litres.", price: 22, originalPrice: 21, supplierPrice: 11.50, image: "img/prod_filtre_eau.jpg" },
      { label: "Kit complet paille+bouteille+pastilles", description: "Kit complet survie eau : filtre paille + bouteille filtrante + 20 pastilles purification. Triple protection pour toutes les situations d'urgence.", price: 25, originalPrice: 29, supplierPrice: 15.50, image: "img/prod_filtre_eau.jpg" }
    ]
  },
  {
    id: 67,
    name: "Talkies-walkies longue portée",
    price: 40,
    originalPrice: 49.9,
    category: "Électronique outdoor",
    description: "Talkies-walkies longue portée 5 km (terrain dégagé). 16 canaux, résistant à l'eau IPX4, VOX, lampe LED intégrée. Idéal camping, randonnée et situations d'urgence. Vendu par paire.",
    badges: ["Nouveau", "Essentiel"],
    rating: 4.4,
    reviews: 213,
    image: "img/prod_talkie.jpg",
    shipping: "Livraison 3-5 jours",
    weight: "420 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 14.50,
    variants: [
      { label: "Paire 5km — noir", description: "Paire talkies-walkies 5 km noirs — portée optimale en forêt ou montagne. 16 canaux, IPX4, VOX, lampe LED. Batteries incluses.", price: 40, originalPrice: 27, supplierPrice: 14.50, image: "img/prod_talkie.jpg" },
      { label: "Paire 8km — orange", description: "Paire talkies-walkies 8 km orange — haute visibilité et portée maximale pour les grandes distances. Idéal ski, randonnée montagne, sauvetage.", price: 42, originalPrice: 34, supplierPrice: 18.50, image: "img/prod_talkie.jpg" },
      { label: "Pack ×4 — famille", description: "Pack 4 talkies-walkies — communicez entre tous les membres de la famille ou du groupe. Parfait pour le camping, les randonnées et les situations d'urgence.", price: 48, originalPrice: 50, supplierPrice: 27.00, image: "img/prod_talkie.jpg" }
    ]
  },
  {
    id: 68,
    name: "Corde paracord 550 militaire",
    price: 7,
    originalPrice: 13.9,
    category: "Outils",
    description: "Corde paracord 550 de type III militaire. 7 fils intérieurs, résistance 249 kg. Polyvalente : abri, filet, attaches, bracelet, lasso. Indispensable en survival et bushcraft.",
    badges: ["Bestseller"],
    rating: 4.7,
    reviews: 312,
    image: "img/prod_paracord_corde.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "130 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 2.90,
    variants: [
      { label: "10m — Noir", description: "Corde paracord 10m noire — longueur idéale pour monter un abri, fixer une tarp ou créer des attaches. Résistance 249 kg.", price: 7, originalPrice: 6, supplierPrice: 2.90, image: "img/prod_paracord_corde.jpg" },
      { label: "10m — Vert militaire", description: "Corde paracord 10m vert militaire — coloris discret pour la chasse et le bushcraft. Usage : ligature, piège, ceinture d'urgence.", price: 7, originalPrice: 6, supplierPrice: 2.90, image: "img/prod_paracord_corde.jpg" },
      { label: "10m — Camouflage", description: "Corde paracord 10m camouflage — se fond dans l'environnement. Idéale pour les pièges, les cache-cache tactiques et l'outdoor discret.", price: 7, originalPrice: 6, supplierPrice: 2.90, image: "img/prod_paracord_corde.jpg" },
      { label: "30m — Noir", description: "Corde paracord 30m noire — pour les grands abris, l'escalade légère, les tyroliennes. Assez de longueur pour toutes les situations de survie.", price: 9, originalPrice: 14, supplierPrice: 7.50, image: "img/prod_paracord_corde.jpg" },
      { label: "50m — Noir", description: "Corde paracord 50m noire — le grand format pour les préparateurs et enseignants survie. Peut remplacer une corde d'escalade en urgence.", price: 14, originalPrice: 21, supplierPrice: 11.50, image: "img/prod_paracord_corde.jpg" }
    ]
  },
  {
    id: 69,
    name: "Boussole militaire de précision",
    price: 15,
    originalPrice: 22.9,
    category: "Outils",
    description: "Boussole militaire de précision lensatique avec miroir de visée. Degrés et mils, phosphorescent, boîtier métal résistant. Idéale pour la randonnée, la chasse et la navigation en forêt.",
    badges: ["Essentiel"],
    rating: 4.6,
    reviews: 178,
    image: "img/prod_boussole.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "95 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 5.50,
    variants: [
      { label: "Boussole simple", description: "Boussole militaire simple — lecture précise, boîtier métal, cadran phosphorescent. Parfaite pour la randonnée et l'orientation en forêt.", price: 15, originalPrice: 10, supplierPrice: 5.50, image: "img/prod_boussole.jpg" },
      { label: "Boussole + miroir de visée", description: "Boussole avec miroir de visée — prendre un relèvement précis sur un sommet lointain. Usage professionnel, armée et secours en montagne.", price: 17, originalPrice: 16, supplierPrice: 8.50, image: "img/prod_boussole.jpg" },
      { label: "Kit navigation : boussole+carte+sifflet", description: "Kit navigation complet : boussole militaire + porte-carte étanche + sifflet 120 dB. Tout pour se repérer et alerter dans la nature.", price: 20, originalPrice: 21, supplierPrice: 11.50, image: "img/prod_boussole.jpg" }
    ]
  },
  {
    id: 70,
    name: "Lampe torche tactique LED",
    price: 20,
    originalPrice: 27.9,
    category: "Éclairage",
    description: "Lampe torche tactique LED ultra-puissante rechargeable USB-C. 5 modes : max/mi/bas/stroboscope/SOS. Résistante IPX6, zoom ajustable, aluminium militaire. Parfaite pour la survie.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.7,
    reviews: 534,
    image: "img/prod_torche.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "180 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 6.50,
    variants: [
      { label: "1000 lm — Noire", description: "Lampe torche 1000 lm noire — puissante pour randonner de nuit. 5 modes, zoom, résistante IPX6. Parfaite pour le camping et la survie quotidienne.", price: 20, originalPrice: 12, supplierPrice: 6.50, image: "img/prod_torche.jpg" },
      { label: "2000 lm — Noire", description: "Lampe torche 2000 lm noire — pour les environnements difficiles et sombres. Portée jusqu'à 300m. Mode stroboscope SOS intégré.", price: 23, originalPrice: 19, supplierPrice: 10.00, image: "img/prod_torche.jpg" },
      { label: "2000 lm — Camouflage", description: "Lampe torche 2000 lm camouflage — haute puissance et discrétion pour la chasse nocturne ou les opérations tactiques.", price: 23, originalPrice: 19, supplierPrice: 10.00, image: "img/prod_torche_camo.jpg" },
      { label: "5000 lm — Pro", description: "Lampe torche 5000 lm Pro — la plus puissante de la gamme. Portée 500m, mode strobe aveuglant, USB-C rechargeable. Pour les professionnels.", price: 27, originalPrice: 29, supplierPrice: 15.50, image: "img/prod_torche_5000lm.jpg" }
    ]
  },
  {
    id: 71,
    name: "Sac de survie Bug Out Bag",
    price: 45,
    originalPrice: 55.9,
    category: "Sacs à dos",
    description: "Sac de survie Bug Out Bag 40L militaire. Structure MOLLE, résistant à l'eau, multi-compartiments. Idéal pour un kit 72h complet. Disponible en 3 coloris tactiques.",
    badges: ["Nouveau", "Essentiel"],
    rating: 4.5,
    reviews: 167,
    image: "img/prod_bugout.jpg",
    shipping: "Livraison 3-5 jours",
    weight: "1.1 kg",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 16.00,
    variants: [
      { label: "40L — Noir", description: "Bug Out Bag 40L noir — discret en milieu urbain, robuste en forêt. Structure MOLLE, résistant à l'eau, bretelles renforcées.", price: 45, originalPrice: 30, supplierPrice: 16.00, image: "img/prod_bugout.jpg" },
      { label: "40L — Vert militaire", description: "Bug Out Bag 40L vert militaire — se fond dans la nature. Multi-poches organisées, accès rapide aux essentiels. Idéal survivalistes.", price: 45, originalPrice: 30, supplierPrice: 16.00, image: "img/prod_bugout_vert.jpg" },
      { label: "40L — Camouflage", description: "Bug Out Bag 40L camouflage — pour les amateurs de tactique et chasse. Tissu dense résistant, frame interne rigidifié.", price: 45, originalPrice: 30, supplierPrice: 16.00, image: "img/prod_bugout_camo.jpg" },
      { label: "60L — Noir expédition", description: "Bug Out Bag 60L noir expédition — pour les évacuations longues durée. Capacité maximale, système de répartition du poids, tissu 600D.", price: 55, originalPrice: 42, supplierPrice: 23.00, image: "img/prod_bugout_60l.jpg" }
    ]
  },

  // ============================================================
  // PRODUITS JARDINAGE — id 80-89 (ajoutés 2026-05-24)
  // ============================================================
  {
    id: 80,
    name: "Gants de jardinage résistants aux épines",
    price: 7,
    originalPrice: 13.9,
    category: "Outils de jardin",
    description: "Gants de jardinage résistants aux épines et coupures. Cuir de vachette sur la paume, manchette longue anti-égratignures. Parfaits pour rosiers, ronces, travaux intensifs.",
    badges: ["Bestseller"],
    rating: 4.6,
    reviews: 312,
    image: "img/jard_gants.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "180 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 3.20,
    variants: [
      { label: "S — Kaki", description: "Gants jardinage S kaki — pour petites mains. Cuir de vachette palme, manchette longue anti-égratignures. Protège des rosiers et ronces.", price: 7, originalPrice: 6, supplierPrice: 3.20, image: "img/jard_gants.jpg" },
      { label: "M — Kaki", description: "Gants jardinage M kaki — taille universelle. Résistants, confortables, prise précise pour les travaux de plantation et désherbage.", price: 7, originalPrice: 6, supplierPrice: 3.20, image: "img/jard_gants.jpg" },
      { label: "L — Kaki", description: "Gants jardinage L kaki — pour grandes mains masculines. Robustes, bien ventilés, adaptés aux travaux intensifs de bêchage et taille.", price: 7, originalPrice: 6, supplierPrice: 3.20, image: "img/jard_gants.jpg" },
      { label: "XL — Kaki", description: "Gants jardinage XL kaki — format maximal pour les mains larges. Manchette extra-longue pour protéger le poignet lors de tailles épineuses.", price: 7, originalPrice: 6, supplierPrice: 3.20, image: "img/jard_gants.jpg" },
      { label: "M — Rose", description: "Gants jardinage M rose — version féminine élégante. Même protection cuir renforcé, coloris discret. Parfait cadeau pour jardinières.", price: 7, originalPrice: 6, supplierPrice: 3.20, image: "img/jard_gants_rose.jpg" },
      { label: "L — Rose", description: "Gants jardinage L rose — taille L pour mains plus grandes. Manchette longue, cuir vachette, joli coloris rose pour jardiner avec style.", price: 7, originalPrice: 6, supplierPrice: 3.20, image: "img/jard_gants_rose.jpg" }
    ]
  },
  {
    id: 81,
    name: "Arrosoir en acier galvanisé",
    price: 23,
    originalPrice: 31.9,
    category: "Outils de jardin",
    description: "Arrosoir classique en acier galvanisé, pomme amovible pour arrosage fin. Résistant à la rouille, équilibré et ergonomique. Idéal pour potager, fleurs et plantes en pot.",
    badges: ["Nouveau"],
    rating: 4.5,
    reviews: 145,
    image: "img/jard_arrosoir.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "780 g",
    inStock: true,
    supplier: "BigBuy",
    supplierPrice: 9.00,
    variants: [
      { label: "5L — Vert", description: "Arrosoir 5L vert — format compact pour balcon, terrasse ou serre. Idéal pour les semis et les plantes en pot. Léger et maniable.", price: 23, originalPrice: 17, supplierPrice: 9.00, image: "img/jard_arrosoir.jpg" },
      { label: "8L — Vert", description: "Arrosoir 8L vert — bon compromis entre capacité et maniabilité. Pour potager moyen et massifs de fleurs. Pomme fine amovible.", price: 25, originalPrice: 21, supplierPrice: 11.50, image: "img/jard_arrosoir.jpg" },
      { label: "10L — Vert", description: "Arrosoir 10L vert — grande contenance pour arroser tout un jardin en un trajet. Moins de déplacements, plus d'efficacité.", price: 27, originalPrice: 25, supplierPrice: 13.50, image: "img/jard_arrosoir.jpg" },
      { label: "5L — Rouge", description: "Arrosoir 5L rouge — même praticité que le vert, coloris vif pour le retrouver facilement. Bec long pour arroser sans éclabousser.", price: 23, originalPrice: 17, supplierPrice: 9.00, image: "img/jard_arrosoir_rouge.jpg" }
    ]
  },
  {
    id: 82,
    name: "Serre de jardin tunnel modulable",
    price: 45,
    originalPrice: 56.9,
    category: "Serres & Abris",
    description: "Serre tunnel de jardin en polyéthylène renforcé, armature acier galvanisé. Protège les plantes du gel et des intempéries. Montage facile sans outils. Ventilation zippée.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.5,
    reviews: 234,
    image: "img/jard_serre.jpg",
    shipping: "Livraison 3-5 jours",
    weight: "2.8 kg",
    inStock: true,
    supplier: "BigBuy",
    supplierPrice: 16.00,
    variants: [
      { label: "Petite — 100×50×80 cm", description: "Serre petite 100×50×80 cm — pour balcon ou terrasse. Protège 3-4 plants du gel et des insectes. Montage rapide, encombrement minimal.", price: 45, originalPrice: 30, supplierPrice: 16.00, image: "img/jard_serre.jpg" },
      { label: "Moyenne — 180×60×90 cm", description: "Serre moyenne 180×60×90 cm — pour 6-8 plants. Idéale pour avancer les semis de 6 semaines. Ventilation zippée sur le côté.", price: 48, originalPrice: 41, supplierPrice: 22.50, image: "img/jard_serre.jpg" },
      { label: "Grande — 240×120×200 cm", description: "Serre grande 240×120×200 cm — walk-in pour entrer et travailler debout. Protège tomates, poivrons et aubergines jusqu'aux gelées tardives.", price: 55, originalPrice: 59, supplierPrice: 32.00, image: "img/jard_serre_grande.jpg" },
      { label: "XL — 300×150×200 cm", description: "Serre XL 300×150×200 cm — la plus spacieuse, pour les jardiniers productifs. Armature acier galvanisé renforcée, bâche PE 180g/m².", price: 53, originalPrice: 81, supplierPrice: 44.50, image: "img/jard_serre_grande.jpg" }
    ]
  },
  {
    id: 83,
    name: "Tuteurs pour plantes et tomates",
    price: 7,
    originalPrice: 12.9,
    category: "Outils de jardin",
    description: "Tuteurs en bambou ou métal pour tomates, haricots et plantes grimpantes. Résistants aux intempéries, réutilisables saison après saison. Pack de 10 ou 20 pièces.",
    badges: ["Essentiel"],
    rating: 4.4,
    reviews: 198,
    image: "img/jard_tuteurs.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "350 g",
    inStock: true,
    supplier: "BigBuy",
    supplierPrice: 3.50,
    variants: [
      { label: "×10 bambou 90cm", description: "10 tuteurs bambou 90 cm — pour tomates cerises, haricots grimpants et petits arbustes. Naturels, résistants, biodégradables en fin de vie.", price: 7, originalPrice: 7, supplierPrice: 3.50, image: "img/jard_tuteurs.jpg" },
      { label: "×20 bambou 90cm", description: "20 tuteurs bambou 90 cm — pour équiper un carré potager entier. Économique, écologique, livré en lot pour un jardin bien organisé.", price: 8, originalPrice: 11, supplierPrice: 6.00, image: "img/jard_tuteurs.jpg" },
      { label: "×10 métal 120cm", description: "10 tuteurs métal 120 cm — plus solides que le bambou, indéformables. Parfaits pour les grosses tomates, poivrons et fleurs hautes.", price: 7, originalPrice: 10, supplierPrice: 5.50, image: "img/jard_tuteurs.jpg" },
      { label: "×20 métal 120cm", description: "20 tuteurs métal 120 cm — équiper un grand potager avec des supports durables saison après saison. Traitement anti-rouille.", price: 11, originalPrice: 17, supplierPrice: 9.00, image: "img/jard_tuteurs.jpg" },
      { label: "×5 spirale tomates 150cm", description: "5 spirales à tomates 150 cm — le tuteur ultime pour les grosses tomates. Enroulement naturel de la tige, soutien en continu sans attache.", price: 9, originalPrice: 13, supplierPrice: 7.00, image: "img/jard_tuteurs.jpg" }
    ]
  },
  {
    id: 84,
    name: "Terreau universel potager bio",
    price: 10,
    originalPrice: 17.9,
    category: "Terre & Amendements",
    description: "Terreau universel enrichi en compost bio pour potager, semis et rempotage. Texture aérée favorisant le développement racinaire. Sans tourbe. Enrichi en éléments nutritifs naturels.",
    badges: ["Nouveau", "Essentiel"],
    rating: 4.6,
    reviews: 312,
    image: "img/jard_terreau.jpg",
    shipping: "Livraison 3-5 jours",
    weight: "5 kg",
    inStock: true,
    supplier: "BigBuy",
    supplierPrice: 5.00,
    variants: [
      { label: "5L — semis et boutures", description: "Terreau bio 5L pour semis et boutures — texture fine ultra-légère favorisant la germination. Sans tourbe, enrichi compost. Idéal en plateau de semis.", price: 10, originalPrice: 10, supplierPrice: 5.00, image: "img/jard_terreau.jpg" },
      { label: "20L — potager", description: "Terreau bio 20L pour potager — pour remplir un carré 120×60 cm ou 4-5 grands pots. Riche en nutriments, favorise la production de légumes.", price: 10, originalPrice: 15, supplierPrice: 8.00, image: "img/jard_terreau.jpg" },
      { label: "50L — grand jardin", description: "Terreau bio 50L grand jardin — pour les grandes surfaces, plates-bandes et potagers familiaux. Économique, pH équilibré, longue tenue.", price: 19, originalPrice: 30, supplierPrice: 16.00, image: "img/jard_terreau.jpg" }
    ]
  },
  {
    id: 85,
    name: "Kit semences potager 20 légumes",
    price: 13,
    originalPrice: 22.9,
    category: "Semences & Graines",
    description: "Kit de 20 sachets de semences de légumes bio — tomates, courgettes, haricots, carottes, salades, radis, poivrons. Non traitées, reproductibles. Idéal pour démarrer un potager complet.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.7,
    reviews: 456,
    image: "img/jard_semences.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "200 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 5.50,
    variants: [
      { label: "Kit 10 légumes essentiels", description: "10 sachets de semences — les indispensables du potager débutant : tomates, courgettes, carottes, salades, radis. Non traitées, bio.", price: 13, originalPrice: 8, supplierPrice: 4.00, image: "img/jard_semences.jpg" },
      { label: "Kit 20 légumes complet", description: "20 sachets de semences bio — pour un potager diversifié toute la saison. Printemps à automne, légumes fruits et feuilles inclus.", price: 14, originalPrice: 10, supplierPrice: 5.50, image: "img/jard_semences.jpg" },
      { label: "Kit 30 légumes + herbes", description: "30 sachets semences + herbes aromatiques — basilic, persil, ciboulette, thym inclus. Le kit complet pour l'autosuffisance alimentaire.", price: 16, originalPrice: 16, supplierPrice: 8.50, image: "img/jard_semences.jpg" },
      { label: "Kit 50 variétés premium", description: "50 variétés semences premium — dont variétés anciennes rares. Pour les passionnés voulant un potager exceptionnel et des saveurs oubliées.", price: 16, originalPrice: 25, supplierPrice: 13.50, image: "img/jard_semences.jpg" }
    ]
  },
  {
    id: 86,
    name: "Composteur de jardin 300L",
    price: 40,
    originalPrice: 51.9,
    category: "Composteurs",
    description: "Composteur de jardin en plastique recyclé 300L. Trappe de récupération en bas, couvercle anti-pluie, aérations latérales. Transformez vos déchets en engrais naturel en 3 mois.",
    badges: ["Bestseller"],
    rating: 4.5,
    reviews: 198,
    image: "img/jard_composteur.jpg",
    shipping: "Livraison 3-5 jours",
    weight: "4.2 kg",
    inStock: true,
    supplier: "BigBuy",
    supplierPrice: 14.50,
    variants: [
      { label: "300L — Noir", description: "Composteur 300L noir — capacité idéale pour une famille de 4. Déchets cuisine + jardin transformés en engrais en 3 mois. Trappe récupération incluse.", price: 40, originalPrice: 27, supplierPrice: 14.50, image: "img/jard_composteur.jpg" },
      { label: "400L — Noir", description: "Composteur 400L noir — pour les gros producteurs de déchets verts. Plus de capacité, même robustesse. Couvercle vissé anti-nuisibles.", price: 43, originalPrice: 34, supplierPrice: 18.50, image: "img/jard_composteur.jpg" },
      { label: "600L — Noir", description: "Composteur 600L noir — le plus grand format, pour les grands jardins et familles nombreuses. Production de compost en continu toute l'année.", price: 50, originalPrice: 45, supplierPrice: 24.50, image: "img/jard_composteur.jpg" }
    ]
  },
  {
    id: 87,
    name: "Kit irrigation goutte à goutte 30 plantes",
    price: 20,
    originalPrice: 27.9,
    category: "Irrigation",
    description: "Kit d'irrigation goutte à goutte automatique pour 30 plantes. Tuyaux PE flexible, goutteurs réglables, connecteurs étanches. Compatible timer. Économise 70% d'eau par rapport à l'arrosoir.",
    badges: ["Nouveau", "Essentiel"],
    rating: 4.6,
    reviews: 234,
    image: "img/jard_irrigation.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "480 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 7.50,
    variants: [
      { label: "Kit 15 plantes", description: "Kit goutte-à-goutte 15 plantes — pour débuter et tester l'arrosage automatique. Idéal balcon ou petite terrasse. Économise 70% d'eau.", price: 20, originalPrice: 9, supplierPrice: 4.50, image: "img/jard_irrigation.jpg" },
      { label: "Kit 30 plantes", description: "Kit goutte-à-goutte 30 plantes — pour un carré potager complet. Tuyaux PE flexibles, goutteurs réglables 0-8L/h, connexions étanches.", price: 22, originalPrice: 14, supplierPrice: 7.50, image: "img/jard_irrigation.jpg" },
      { label: "Kit 50 plantes + timer", description: "Kit goutte-à-goutte 50 plantes + programmateur — arrosage 100% autonome. Programmez et oubliez, même pendant les vacances.", price: 25, originalPrice: 24, supplierPrice: 13.00, image: "img/jard_irrigation.jpg" },
      { label: "Kit 100 plantes pro", description: "Kit goutte-à-goutte 100 plantes pro — pour les grands potagers, serres et terrasses. Débit maîtrisé, tuyaux renforcés, raccords universels.", price: 27, originalPrice: 41, supplierPrice: 22.50, image: "img/jard_irrigation.jpg" }
    ]
  },
  {
    id: 88,
    name: "Pots géotextiles pour potager",
    price: 11,
    originalPrice: 17.9,
    category: "Bacs & Pots",
    description: "Pots géotextiles respirants pour potager hors-sol et balcon. Favorisent l'air-pruning des racines et un drainage parfait. Pliables, réutilisables, résistants aux UV. Idéals pour tomates et fraises.",
    badges: ["Nouveau"],
    rating: 4.5,
    reviews: 189,
    image: "img/jard_pots.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "350 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 4.50,
    variants: [
      { label: "×5 — 10L Noir", description: "5 pots géotextiles 10L noirs — idéal fraises, herbes aromatiques, petites tomates. Air-pruning naturel, drainage parfait. Pliables hors saison.", price: 11, originalPrice: 9, supplierPrice: 4.50, image: "img/jard_pots.jpg" },
      { label: "×5 — 20L Noir", description: "5 pots géotextiles 20L noirs — pour tomates, poivrons, aubergines. Grande contenance, racines saines, rendements supérieurs à la terre.", price: 13, originalPrice: 12, supplierPrice: 6.50, image: "img/jard_pots.jpg" },
      { label: "×5 — 30L Noir", description: "5 pots géotextiles 30L noirs — pour arbustes fruitiers, grands légumes et cultures intensives. Résistants UV, réutilisables 5+ saisons.", price: 14, originalPrice: 15, supplierPrice: 7.80, image: "img/jard_pots.jpg" },
      { label: "×5 — 10L Vert", description: "5 pots géotextiles 10L verts — même performance que le noir, coloris naturel discret pour balcon ou terrasse visible.", price: 11, originalPrice: 9, supplierPrice: 4.50, image: "img/jard_pots.jpg" },
      { label: "×5 — 20L Vert", description: "5 pots géotextiles 20L verts — capacité idéale tomates, beau coloris pour intégrer au jardin. Texture respirante anti-pourriture.", price: 13, originalPrice: 12, supplierPrice: 6.50, image: "img/jard_pots.jpg" },
      { label: "×10 — 10L Noir — lot", description: "Lot de 10 pots géotextiles 10L noirs — format économique pour équiper tout un potager. Parfait pour les semis en extérieur et fraisiers.", price: 14, originalPrice: 15, supplierPrice: 8.00, image: "img/jard_pots.jpg" }
    ]
  },
  {
    id: 89,
    name: "Programmateur d'arrosage automatique",
    price: 22,
    originalPrice: 32.9,
    category: "Irrigation",
    description: "Programmateur d'arrosage automatique digital. Jusqu'à 6 programmes par jour, durée 1 min à 24h. Résistant IPX5, raccord universel 3/4\". Économise eau et temps au jardin.",
    badges: ["Bestseller", "Essentiel"],
    rating: 4.5,
    reviews: 267,
    image: "img/jard_timer.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "195 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierPrice: 8.50,
    variants: [
      { label: "Timer simple — 1 zone", description: "Programmateur 1 zone — pour arroser un seul tuyau ou kit goutte-à-goutte. Simple à programmer, robuste IPX5, raccord universel 3/4\".", price: 22, originalPrice: 32.9, supplierPrice: 8.50, image: "img/jard_timer.jpg" },
      { label: "Timer double — 2 zones", description: "Programmateur 2 zones — pour gérer deux systèmes d'arrosage indépendants (potager + pelouse). 6 programmes/jour chacun.", price: 35, originalPrice: 51.9, supplierPrice: 13.50, image: "img/jard_timer.jpg" },
      { label: "Timer WiFi — app smartphone", description: "Programmateur WiFi avec app smartphone — contrôlez et programmez depuis n'importe où. Météo intégrée, arrosage intelligent selon la pluie.", price: 49, originalPrice: 72.9, supplierPrice: 19.00, image: "img/jard_timer.jpg" }
    ]
  }
,

  // ── Énergie solaire (IDs 90-96) ──
  {id:90,name:"Station d'énergie portable 300Wh",price:189,originalPrice:269,category:"Énergie",description:"Station LiFePO4 300Wh. Sortie AC 220V + USB-C 60W + DC 12V. Recharge solaire, voiture ou secteur. Silencieuse. Idéale coupures, camping, van.",badges:["Nouveau","Essentiel"],rating:4.7,reviews:0,image:"img/station_300wh.jpg",shipping:"Livraison 5-7 jours",weight:"3.5 kg",inStock:true,supplier:"CJdropshipping",supplierSku:"cj-station-300wh",supplierPrice:130,supplierUrl:"https://www.cjdropshipping.com",variants:[{label:"300Wh — AC+USB-C+DC",description:"Station 300Wh LiFePO4. Sortie 220V+USB-C 60W+DC. 500+ cycles. Recharge solaire en 3-4h.",price:189,originalPrice:269,supplierPrice:130,supplierSku:"cj-station-300wh",image:"img/station_300wh.jpg"},{label:"500Wh — version pro",description:"Station 500Wh. Sortie 220V 500W+USB-C 100W+DC. Pour usage intensif.",price:299,originalPrice:429,supplierPrice:210,supplierSku:"cj-station-500wh",image:"img/station_300wh.jpg"}]},{id:91,name:"Panneau solaire pliable 100W monocristallin",price:79,originalPrice:115,category:"Énergie",description:"Panneau solaire pliable 100W monocristallin. Efficacité 23%, ETFE, USB-A+USB-C+MC4. IPX4. Compatible toutes stations portables.",badges:["Nouveau"],rating:4.6,reviews:0,image:"img/panneau_100w.jpg",shipping:"Livraison 5-7 jours",weight:"2.1 kg",inStock:true,supplier:"CJdropshipping",supplierSku:"cj-panel-100w",supplierPrice:56,supplierUrl:"https://www.cjdropshipping.com",variants:[{label:"100W — 2 panneaux",description:"Panneau 100W pliable. USB-A+C+MC4. IPX4. Efficacité 23%.",price:79,originalPrice:115,supplierPrice:56,supplierSku:"cj-panel-100w",image:"img/panneau_100w.jpg"},{label:"200W — 4 panneaux",description:"Panneau 200W pliable en 4. MC4+USB. Recharge station 300Wh en 1,5-2h.",price:139,originalPrice:199,supplierPrice:98,supplierSku:"cj-panel-200w",image:"img/panneau_100w.jpg"}]},{id:92,name:"Kit solaire 200W + station 300Wh",price:249,originalPrice:359,category:"Énergie",description:"Kit solaire complet : panneau 200W + station portative 300Wh LiFePO4. Recharge en 2-3h de soleil. Zéro installation.",badges:["Nouveau","Essentiel"],rating:4.8,reviews:0,image:"img/kit_solaire_200w.jpg",shipping:"Livraison 5-7 jours",weight:"5.6 kg",inStock:true,supplier:"CJdropshipping",supplierSku:"cj-kit-solar-200w",supplierPrice:175,supplierUrl:"https://www.cjdropshipping.com",variants:[{label:"Kit 200W + 300Wh",description:"Panneau 200W + station 300Wh. Recharge en 2-3h. Prêt à l'emploi.",price:249,originalPrice:359,supplierPrice:175,supplierSku:"cj-kit-solar-200w",image:"img/kit_solaire_200w.jpg"}]},{id:93,name:"Chargeur solaire USB pliable 21W",price:32,originalPrice:45,category:"Énergie",description:"Chargeur solaire pliable 21W. 2× USB-A + USB-C. Efficacité 22%. 380g. Pour smartphones, GPS et lampes.",badges:[],rating:4.5,reviews:0,image:"img/chargeur_solaire_21w.jpg",shipping:"Livraison 3-5 jours",weight:"380 g",inStock:true,supplier:"CJdropshipping",supplierSku:"cj-charger-solar-21w",supplierPrice:22,supplierUrl:"https://www.cjdropshipping.com",variants:[{label:"21W — 3 panneaux",description:"Chargeur 21W pliable. USB-A×2+USB-C. 380g. Charge smartphone en 1,5h.",price:32,originalPrice:45,supplierPrice:22,supplierSku:"cj-charger-solar-21w",image:"img/chargeur_solaire_21w.jpg"},{label:"40W — 4 panneaux",description:"Chargeur 40W. USB-A×2+USB-C 45W+DC 18V. Charge ordinateur portable au soleil.",price:52,originalPrice:75,supplierPrice:37,supplierSku:"cj-charger-solar-40w",image:"img/chargeur_solaire_21w.jpg"}]},{id:94,name:"Batterie solaire de secours 20000mAh",price:28,originalPrice:39,category:"Énergie",description:"Batterie solaire 20000mAh panneau 5W intégré, IP66, lampe SOS LED. Charge 5 smartphones. Idéale randonnée et urgence.",badges:[],rating:4.5,reviews:0,image:"img/batterie_solaire_20000.jpg",shipping:"Livraison 3-5 jours",weight:"410 g",inStock:true,supplier:"CJdropshipping",supplierSku:"cj-solar-bank-sec",supplierPrice:20,supplierUrl:"https://www.cjdropshipping.com",variants:[{label:"20000mAh — noir IP66",description:"Batterie solaire 20000mAh IP66. Panneau 5W. USB-A×2+Micro-USB. Lampe SOS. 5 charges smartphone.",price:28,originalPrice:39,supplierPrice:20,supplierSku:"cj-solar-bank-sec",image:"img/batterie_solaire_20000.jpg"}]},{id:95,name:"Lampe solaire outdoor 2000 lm",price:22,originalPrice:32,category:"Énergie",description:"Lampe solaire outdoor 2000 lm. LFP 6000mAh. IP65. Autonomie 8-12h. Détecteur mouvement. Pour jardin, terrasse, camping.",badges:["Nouveau"],rating:4.5,reviews:0,image:"img/lampe_solaire_2000.jpg",shipping:"Livraison 3-5 jours",weight:"520 g",inStock:true,supplier:"CJdropshipping",supplierSku:"cj-lamp-solar-2000",supplierPrice:16,supplierUrl:"https://www.cjdropshipping.com",variants:[{label:"2000 lm + détecteur mouvement",description:"Lampe solaire 2000lm + détecteur mouvement IP65. Batterie 6000mAh. Nuit : 8-12h automatique.",price:22,originalPrice:32,supplierPrice:16,supplierSku:"cj-lamp-solar-2000",image:"img/lampe_solaire_2000.jpg"}]},{id:96,name:"Contrôleur de charge solaire MPPT 30A",price:25,originalPrice:37,category:"Énergie",description:"Régulateur MPPT 30A. 12V/24V. LCD. Jusqu'à 400W de panneaux. Protection intégrée. Pour chalet, camping-car, bateau.",badges:["Nouveau"],rating:4.4,reviews:0,image:"img/controleur_mppt.jpg",shipping:"Livraison 3-5 jours",weight:"320 g",inStock:true,supplier:"CJdropshipping",supplierSku:"cj-mppt-30a",supplierPrice:18,supplierUrl:"https://www.cjdropshipping.com",variants:[{label:"MPPT 30A — 12V/24V",description:"Contrôleur MPPT 30A. 12/24V auto. LCD. Jusqu'à 400W panneaux.",price:25,originalPrice:37,supplierPrice:18,supplierSku:"cj-mppt-30a",image:"img/controleur_mppt.jpg"},{label:"MPPT 60A — 12/24/48V + Bluetooth",description:"MPPT 60A tri-tension. Jusqu'à 800W. Bluetooth + app smartphone.",price:49,originalPrice:72,supplierPrice:35,supplierSku:"cj-mppt-60a",image:"img/controleur_mppt.jpg"}]}
];

// ============================================
// Produits Jardinage (IDs 101-136)
// ============================================
const PRODUCTS_JARDINAGE = [
  { id: 101, name: "Set d'outils de jardinage 3 pièces", price: 23.00, category: "Jardinage", description: "Truelle, transplantoir et cultivateur. Manches ergonomiques antidérapants. Acier inoxydable.", badges: ["Essentiel"], rating: 4.5, reviews: 89, image: "images/jardinage/outils_set.jpg", shipping: "Livraison 3-5 jours", weight: "600 g", inStock: true },
  { id: 102, name: "Bêche de jardin professionnelle", price: 30.00, category: "Jardinage", description: "Lame acier trempé, manche en bois de frêne 120cm. Idéale pour retourner la terre et creuser.", badges: ["Essentiel"], rating: 4.6, reviews: 67, image: "images/jardinage/beche.jpg", shipping: "Livraison 3-5 jours", weight: "1.8 kg", inStock: true },
  { id: 103, name: "Sécateur professionnel à lame franche", price: 22.00, category: "Jardinage", description: "Lame en acier SK5 trempé, poignée ergonomique. Coupe nette jusqu'à 25mm de diamètre.", badges: ["Bio"], rating: 4.7, reviews: 145, image: "images/jardinage/secateur.jpg", shipping: "Livraison 2-3 jours", weight: "220 g", inStock: true },
  { id: 104, name: "Serre de balcon 4 étagères", price: 36.00, category: "Jardinage", description: "Structure acier + housse PE transparente. 143x73x61cm. Parfaite pour balcon ou terrasse.", badges: ["Nouveau"], rating: 4.4, reviews: 112, image: "images/jardinage/serre_balcon.jpg", shipping: "Livraison 3-5 jours", weight: "3.2 kg", inStock: true },
  { id: 105, name: "Mini serre tunnel de jardin 6m²", price: 59.00, category: "Jardinage", description: "Armature galvanisée, bâche 180 microns UV. 300x200x200cm. Protège contre le gel et les insectes.", badges: [], rating: 4.3, reviews: 78, image: "images/jardinage/serre_tunnel.jpg", shipping: "Livraison 5-7 jours", weight: "8 kg", inStock: true },
  { id: 106, name: "Composteur de jardin 300L", price: 47.00, category: "Jardinage", description: "Plastique recyclé 100%, trappe de récupération en bas. Transforme vos déchets en engrais naturel.", badges: ["Bio"], rating: 4.5, reviews: 134, image: "images/jardinage/composteur.jpg", shipping: "Livraison 5-7 jours", weight: "4.5 kg", inStock: true },
  { id: 107, name: "Lombricomposteur 3 niveaux", price: 44.00, category: "Jardinage", description: "Compostage aux vers de terre. Produit un engrais liquide ultra-concentré. Idéal appartement.", badges: ["Bio", "Nouveau"], rating: 4.4, reviews: 56, image: "images/jardinage/lombri.jpg", shipping: "Livraison 3-5 jours", weight: "2.8 kg", inStock: true },
  { id: 108, name: "Arrosoir 10L bec long en zinc", price: 27.00, category: "Jardinage", description: "Zinc galvanisé anticorrosion, bec long pour atteindre le pied des plantes. Contenance 10 litres.", badges: [], rating: 4.5, reviews: 98, image: "images/jardinage/arrosoir.jpg", shipping: "Livraison 3-5 jours", weight: "1.1 kg", inStock: true },
  { id: 109, name: "Kit goutte-à-goutte 50 plantes", price: 32.00, category: "Jardinage", description: "Système d'irrigation automatique. 15m de tuyau, 50 goutteurs réglables. Économise 70% d'eau.", badges: ["Essentiel"], rating: 4.6, reviews: 203, image: "images/jardinage/goutte.jpg", shipping: "Livraison 2-3 jours", weight: "800 g", inStock: true },
  { id: 110, name: "Carré potager surélevé en bois 120x60cm", price: 50.00, category: "Jardinage", description: "Bois de pin traité autoclave. Hauteur 30cm. Idéal terrasse, balcon ou jardin. Montage facile.", badges: ["Essentiel"], rating: 4.5, reviews: 167, image: "images/jardinage/carre_potager.jpg", shipping: "Livraison 5-7 jours", weight: "6 kg", inStock: true },
  { id: 111, name: "Tour à fraises & plantes aromatiques", price: 22.00, category: "Jardinage", description: "5 poches de plantation empilables. Culture verticale, gain de place. Parfait pour balcon.", badges: ["Nouveau"], rating: 4.3, reviews: 44, image: "images/jardinage/tour_fraises.jpg", shipping: "Livraison 2-3 jours", weight: "400 g", inStock: true },
  { id: 112, name: "Filet anti-insectes 2x5m", price: 19.00, category: "Jardinage", description: "Maille fine 0,8mm, protège légumes et fruits des insectes et oiseaux. Laisse passer lumière et pluie.", badges: ["Bio"], rating: 4.4, reviews: 88, image: "images/jardinage/filet.jpg", shipping: "Livraison 2-3 jours", weight: "300 g", inStock: true },
  { id: 113, name: "Voile d'hivernage 30g/m² - 10x2m", price: 17.00, category: "Jardinage", description: "Protège vos cultures jusqu'à -6°C. Perméable à l'eau et à la lumière. Réutilisable plusieurs saisons.", badges: ["Essentiel"], rating: 4.5, reviews: 121, image: "images/jardinage/voile.jpg", shipping: "Livraison 2-3 jours", weight: "250 g", inStock: true },
  { id: 114, name: "Débroussailleuse électrique filaire 600W", price: 52.00, category: "Jardinage", description: "Tête de coupe rotative, fil nylon ø1,6mm, poignée ergonomique. Légère (~2,5 kg), câble 10m inclus.", badges: [], rating: 4.3, reviews: 67, image: "images/jardinage2/debroussailleuse_filaire.jpg", shipping: "Livraison 3-5 jours", weight: "2.5 kg", inStock: true },
  { id: 115, name: "Débroussailleuse sans fil batterie 20V", price: 79.00, category: "Jardinage", description: "Li-Ion 20V, tête à double fil, autonomie ~35 min, 2,8 kg. Démarrage instantané, rechargeable en 1h.", badges: ["Nouveau"], rating: 4.4, reviews: 53, image: "images/jardinage2/debroussailleuse_batterie.jpg", shipping: "Livraison 3-5 jours", weight: "2.8 kg", inStock: true },
  { id: 116, name: "Taille-haie électrique 450W 45cm", price: 47.00, category: "Jardinage", description: "Lame double action 45cm, espacement dents 16mm, poignée rotative 180°. Léger (2,2 kg).", badges: [], rating: 4.4, reviews: 78, image: "images/jardinage2/taillehaie.jpg", shipping: "Livraison 3-5 jours", weight: "2.2 kg", inStock: true },
  { id: 117, name: "Souffleur-aspirateur de feuilles 3-en-1 2800W", price: 42.00, category: "Jardinage", description: "Souffle, aspire et broie. Sac collecteur 45L, vitesse d'air 290 km/h. Rapport broyage 10:1.", badges: [], rating: 4.3, reviews: 45, image: "images/jardinage2/souffleur.jpg", shipping: "Livraison 3-5 jours", weight: "3.1 kg", inStock: true },
  { id: 118, name: "Tondeuse à gazon électrique 1400W 32cm", price: 91.00, category: "Jardinage", description: "Largeur de coupe 32cm, 5 hauteurs (25-70mm), bac 30L. Idéale jusqu'à 200 m². Légère (8 kg).", badges: ["Bestseller"], rating: 4.5, reviews: 134, image: "images/jardinage2/tondeuse.jpg", shipping: "Livraison 5-7 jours", weight: "8 kg", inStock: true },
  { id: 119, name: "Scarificateur aérateur 2-en-1 1300W 32cm", price: 69.00, category: "Jardinage", description: "Largeur 32cm, profondeur réglable sur 5 niveaux, bac 30L. Régénère la pelouse, élimine le feutre.", badges: [], rating: 4.4, reviews: 56, image: "images/jardinage2/scarificateur.jpg", shipping: "Livraison 5-7 jours", weight: "5.5 kg", inStock: true },
  { id: 120, name: "Coupe-bordures électrique 350W", price: 33.00, category: "Jardinage", description: "Tête pivotante 180°, bobine automatique, manche télescopique. Ultra-léger (1,4 kg).", badges: [], rating: 4.3, reviews: 67, image: "images/jardinage2/coupebordures.jpg", shipping: "Livraison 3-5 jours", weight: "1.4 kg", inStock: true },
  { id: 121, name: "Pulvérisateur à pression 16L sur roues", price: 39.00, category: "Jardinage", description: "Chariot à roues, lance télescopique 1,2m, jet continu/brumisation. Grande capacité 16L.", badges: [], rating: 4.4, reviews: 89, image: "images/jardinage2/pulverisateur.jpg", shipping: "Livraison 3-5 jours", weight: "2.8 kg", inStock: true },
  { id: 122, name: "Bâche de jardin imperméable 4x6m", price: 30.00, category: "Jardinage", description: "90g/m², oeillets tous les 50cm, résistante UV. Couvre bois, compost, potager, terrasse.", badges: [], rating: 4.3, reviews: 56, image: "images/jardinage2/bache.jpg", shipping: "Livraison 3-5 jours", weight: "1.2 kg", inStock: true },
  { id: 123, name: "Brouette pliante en acier galvanisé 100L", price: 59.00, category: "Jardinage", description: "Roue pneumatique anti-crevaison, charge max 150 kg. Pliable pour stockage compact. Sans outil.", badges: ["Essentiel"], rating: 4.5, reviews: 112, image: "images/jardinage2/brouette.jpg", shipping: "Livraison 5-7 jours", weight: "9 kg", inStock: true },
  { id: 124, name: "Sécateur Pro Tête Rotative", price: 7.00, category: "Jardinage", description: "Sécateur à tête rotative pour réduire la fatigue. Lame inox tranchante, ressort anti-retour. Taille précise branches jusqu'à 2 cm.", badges: ["Nouveau"], rating: 4.5, reviews: 34, image: "https://oss-cf.cjdropshipping.com/product/2026/05/11/06/6f6e968a-7d4d-42a6-a31f-ca0c7006a187_trans.jpeg", shipping: "Livraison 5-7 jours", weight: "120 g", inStock: true },
  { id: 125, name: "Étagère Plantes Multi-niveaux Style Nordique", price: 32.00, category: "Jardinage", description: "Présentoir à plantes intérieur 4 niveaux, style scandinave. Idéal pour succulentes, plantes grasses et pothos.", badges: ["Nouveau"], rating: 4.4, reviews: 28, image: "https://cf.cjdropshipping.com/quick/product/f4c78289-239f-4259-846f-f2d022ba1255.jpg", shipping: "Livraison 5-7 jours", weight: "2 kg", inStock: true },
  { id: 126, name: "Lampe Solaire Jardin 3 Têtes - Étanche IP65", price: 32.00, category: "Jardinage", description: "Lampe de jardin solaire 3 têtes orientables. Charge automatique le jour, éclairage la nuit. Imperméable IP65.", badges: ["Nouveau"], rating: 4.5, reviews: 42, image: "https://cf.cjdropshipping.com/quick/product/f354d75d-6fcc-4c87-8f37-9b6f24b921a3.jpg", shipping: "Livraison 5-7 jours", weight: "350 g", inStock: true },
  { id: 127, name: "Gants de jardinage résistants aux épines", price: 9.00, category: "Jardinage", description: "Cuir de vachette paume, manchette longue. S / M / L / XL en kaki ou rose.", badges: [], rating: 4.4, reviews: 67, image: "img/jard_gants.jpg", shipping: "Livraison 2-3 jours", weight: "150 g", inStock: true },
  { id: 128, name: "Arrosoir en acier galvanisé", price: 22.00, category: "Jardinage", description: "Pomme amovible, résistant rouille. 5L vert/rouge, 8L, 10L.", badges: [], rating: 4.5, reviews: 89, image: "img/jard_arrosoir.jpg", shipping: "Livraison 3-5 jours", weight: "900 g", inStock: true },
  { id: 129, name: "Serre de jardin tunnel modulable", price: 39.00, category: "Jardinage", description: "Polyéthylène renforcé, armature acier galvanisé, ventilation zippée. 4 tailles disponibles.", badges: [], rating: 4.3, reviews: 56, image: "img/jard_serre.jpg", shipping: "Livraison 5-7 jours", weight: "5 kg", inStock: true },
  { id: 130, name: "Tuteurs pour plantes et tomates", price: 9.00, category: "Jardinage", description: "Bambou ou métal. ×10/×20 pièces, 90-150cm. Réutilisables.", badges: [], rating: 4.3, reviews: 45, image: "img/jard_tuteurs.jpg", shipping: "Livraison 2-3 jours", weight: "500 g", inStock: true },
  { id: 131, name: "Terreau universel potager bio", price: 12.00, category: "Jardinage", description: "Compost bio, sans tourbe, texture aérée. 5L / 20L / 50L.", badges: ["Bio"], rating: 4.6, reviews: 178, image: "img/jard_terreau.jpg", shipping: "Livraison 3-5 jours", weight: "5 kg", inStock: true },
  { id: 132, name: "Kit semences potager 20 légumes", price: 10.00, category: "Jardinage", description: "Bio, non traitées, reproductibles. De 10 à 50 variétés de légumes.", badges: ["Bio", "Nouveau"], rating: 4.7, reviews: 234, image: "img/jard_semences.jpg", shipping: "Livraison 2-3 jours", weight: "200 g", inStock: true },
  { id: 133, name: "Composteur de jardin 300L (grande gamme)", price: 35.00, category: "Jardinage", description: "Plastique recyclé, trappe récupération, couvercle anti-pluie. 300L / 400L / 600L.", badges: ["Bio"], rating: 4.5, reviews: 134, image: "img/jard_composteur.jpg", shipping: "Livraison 5-7 jours", weight: "4 kg", inStock: true },
  { id: 134, name: "Kit irrigation goutte à goutte 30 plantes", price: 12.00, category: "Jardinage", description: "Goutteurs réglables, économise 70% d'eau. 15 à 100 plantes.", badges: ["Essentiel"], rating: 4.6, reviews: 189, image: "img/jard_irrigation.jpg", shipping: "Livraison 2-3 jours", weight: "600 g", inStock: true },
  { id: 135, name: "Pots géotextiles pour potager", price: 12.00, category: "Jardinage", description: "Air-pruning, drainage parfait, UV-résistants. ×5 : 10L / 20L / 30L, noir ou vert.", badges: [], rating: 4.4, reviews: 98, image: "img/jard_pots.jpg", shipping: "Livraison 2-3 jours", weight: "400 g", inStock: true },
  { id: 136, name: "Programmateur d'arrosage automatique", price: 22.00, category: "Jardinage", description: "6 programmes/jour, IPX5, raccord universel. Version WiFi disponible.", badges: ["Nouveau"], rating: 4.5, reviews: 67, image: "img/jard_timer.jpg", shipping: "Livraison 2-3 jours", weight: "250 g", inStock: true },

  // ── Nouveaux produits Jardinage (juin 2026) ──────────────────────────────
  // ── Nouveaux produits Jardinage (IDs 137-143) ──
  {
    id: 137,
    name: "Cuve récupération eau de pluie 300L",
    price: 59.00,
    originalPrice: 85.00,
    category: "Jardinage",
    description: "Cuve de récupération d'eau de pluie 300 litres en polyéthylène recyclé. Raccord gouttière universel, robinet de soutirage 3/4\", couvercle anti-moustiques. Idéale pour arroser un potager en autonomie. Économisez jusqu'à 50% sur votre consommation d'eau.",
    badges: ["Nouveau", "Essentiel"],
    rating: 4.6,
    reviews: 0,
    image: "img/jard_cuve_pluie.jpg",
    shipping: "Livraison 5-7 jours",
    weight: "8 kg",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "cuve-pluie-300l",
    supplierPrice: 44.00,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "300L — Verte", description: "Cuve 300L verte — coloris naturel discret, s'intègre au jardin. Raccord gouttière universel, robinet 3/4\", couvercle anti-moustiques. Poids vide : 8kg.", price: 59, originalPrice: 85, supplierPrice: 44.00, supplierSku: "cuve-pluie-300l-verte", image: "img/jard_cuve_pluie.jpg" },
      { label: "300L — Noire", description: "Cuve 300L noire — absorbe la chaleur, réduit les algues. Même équipement que le modèle vert. Idéale pour les emplacements ensoleillés.", price: 59, originalPrice: 85, supplierPrice: 44.00, supplierSku: "cuve-pluie-300l-noire", image: "img/jard_cuve_pluie.jpg" },
      { label: "500L — Verte", description: "Cuve 500L verte — pour les grands potagers et vergers. Couvercle renforcé, double robinet. Autonomie arrosage 2-3 semaines selon consommation.", price: 89, originalPrice: 129, supplierPrice: 67.00, supplierSku: "cuve-pluie-500l-verte", image: "img/jard_cuve_pluie.jpg" }
    ]
  },
  {
    id: 138,
    name: "Lampe horticole LED spectre complet",
    price: 34.00,
    originalPrice: 49.00,
    category: "Jardinage",
    description: "Lampe de croissance LED 45W spectre complet (380-780nm). Couvre 60×60cm. Efficacité 2,7 µmol/J. Ideal semis, bouturage, culture indoor toute l'année. Durée de vie 50 000h. Consomme 5× moins qu'une lampe sodium.",
    badges: ["Nouveau"],
    rating: 4.7,
    reviews: 0,
    image: "img/jard_lampe_horticole.jpg",
    shipping: "Livraison 5-7 jours",
    weight: "1.2 kg",
    inStock: true,
    supplier: "CJdropshipping",
    supplierSku: "cj-led-grow-45w",
    supplierPrice: 25.00,
    supplierUrl: "https://www.cjdropshipping.com",
    variants: [
      { label: "45W — 60×60cm", description: "LED 45W spectre complet — parfaite pour une surface de 60×60cm. Intensité réglable 0-100%. Idéale semis, herbes aromatiques, jeunes plants.", price: 34, originalPrice: 49, supplierPrice: 25.00, supplierSku: "cj-led-grow-45w", image: "img/jard_lampe_horticole.jpg" },
      { label: "100W — 90×90cm", description: "LED 100W spectre complet — couvre 90×90cm. Assez puissante pour tomates, poivrons, fraises en phase de floraison et fructification.", price: 59, originalPrice: 85, supplierPrice: 43.00, supplierSku: "cj-led-grow-100w", image: "img/jard_lampe_horticole.jpg" },
      { label: "200W — 120×120cm", description: "LED 200W pro — couvre 120×120cm. Pour la production intensive indoor. Rendement lumino équivalent à 600W HPS. Timer intégré 16/8h.", price: 99, originalPrice: 149, supplierPrice: 74.00, supplierSku: "cj-led-grow-200w", image: "img/jard_lampe_horticole.jpg" }
    ]
  },
  {
    id: 139,
    name: "Engrais bio guano de chauve-souris 1L",
    price: 14.00,
    originalPrice: 19.00,
    category: "Jardinage",
    description: "Engrais biologique liquide à base de guano de chauve-souris. Riche en NPK naturel (7-3-1). Stimule la croissance, améliore la résistance aux maladies. 1L concentré = 100L de solution. Compatible agriculture biologique — certification AB.",
    badges: ["Nouveau", "Bio"],
    rating: 4.5,
    reviews: 0,
    image: "img/jard_engrais_guano.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "1.1 kg",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "engrais-guano-1l",
    supplierPrice: 10.50,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "1L — Croissance (N fort)", description: "Formule croissance NPK 7-3-1 — riche en azote pour maximiser la végétation. Pour légumes feuilles, herbes, jeunes plants. 1L = 100L dilué.", price: 14, originalPrice: 19, supplierPrice: 10.50, supplierSku: "engrais-guano-1l-croissance", image: "img/jard_engrais_guano.jpg" },
      { label: "1L — Floraison (P fort)", description: "Formule floraison NPK 3-7-4 — riche en phosphore pour booster fleurs et fruits. Tomates, poivrons, fraises, concombres. 1L = 100L dilué.", price: 14, originalPrice: 19, supplierPrice: 10.50, supplierSku: "engrais-guano-1l-floraison", image: "img/jard_engrais_guano.jpg" },
      { label: "5L — Croissance (économique)", description: "Bidon 5L formule croissance — format économique pour grands potagers. 5L = 500L de solution d'arrosage. 5 mois d'utilisation pour 20m².", price: 49, originalPrice: 72, supplierPrice: 37.00, supplierSku: "engrais-guano-5l-croissance", image: "img/jard_engrais_guano.jpg" }
    ]
  },
  {
    id: 140,
    name: "Testeur pH et humidité sol numérique",
    price: 19.00,
    originalPrice: 27.00,
    category: "Jardinage",
    description: "Testeur de sol numérique 3-en-1 : pH (3,5-9), humidité (10-80%), luminosité (0-2000 lux). Sans batterie pour pH/humidité. Sonde acier inox 20cm. Résultats en 60 secondes. Indispensable pour optimiser les cultures et éviter carences.",
    badges: ["Nouveau"],
    rating: 4.5,
    reviews: 0,
    image: "img/jard_testeur_ph.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "80 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierSku: "cj-ph-meter-3in1",
    supplierPrice: 14.00,
    supplierUrl: "https://www.cjdropshipping.com",
    variants: [
      { label: "3-en-1 — pH + Humidité + Lumière", description: "Testeur 3-en-1 sans pile (pH + humidité). Module lumière sur batterie. Sonde 20cm inox. Idéal jardinage courant et potager.", price: 19, originalPrice: 27, supplierPrice: 14.00, supplierSku: "cj-ph-meter-3in1", image: "img/jard_testeur_ph.jpg" },
      { label: "Digital LCD — pH seul haute précision", description: "pH-mètre numérique haute précision ±0,05 pH. Écran LCD rétroéclairé. Calibration automatique. Idéal pour hydroponique et aquaponie.", price: 24, originalPrice: 35, supplierPrice: 18.00, supplierSku: "cj-ph-meter-digital", image: "img/jard_testeur_ph.jpg" }
    ]
  },
  {
    id: 141,
    name: "Désherbeur thermique à gaz 2000W",
    price: 39.00,
    originalPrice: 55.00,
    category: "Jardinage",
    description: "Désherbeur thermique à gaz butane/propane 2000W. Lance-flamme orientable 360°, allumage piézo-électrique. Manche télescopique 85-105cm. Sans herbicide, écologique. Détruit les mauvaises herbes en 2-3 secondes. Compatible cartouches 220g standard.",
    badges: ["Nouveau"],
    rating: 4.4,
    reviews: 0,
    image: "img/jard_desherbeur_gaz.jpg",
    shipping: "Livraison 3-5 jours",
    weight: "850 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "desherbeur-gaz-2000w",
    supplierPrice: 29.00,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "2000W — manche télescopique seul", description: "Désherbeur 2000W avec manche télescopique 85-105cm. Allumage piézo. Sans cartouche incluse (cartouche butane 220g standard en commerce).", price: 39, originalPrice: 55, supplierPrice: 29.00, supplierSku: "desherbeur-gaz-2000w", image: "img/jard_desherbeur_gaz.jpg" },
      { label: "2000W — kit complet + 3 cartouches", description: "Désherbeur 2000W avec 3 cartouches butane 220g incluses — prêt à l'emploi. Environ 3h de désherbeur total. Housse de transport incluse.", price: 52, originalPrice: 75, supplierPrice: 39.00, supplierSku: "desherbeur-gaz-2000w-kit", image: "img/jard_desherbeur_gaz.jpg" }
    ]
  },
  {
    id: 142,
    name: "Couvercles conservation sous vide — lot de 8",
    price: 12.00,
    originalPrice: 17.00,
    category: "Jardinage",
    description: "Set de 8 couvercles de conservation sous vide pour bocaux à large ouverture (86mm). Compatibles bocaux Le Parfait, Mason Jar, Ball. Extension jusqu'à 5× la durée de conservation. Pompe manuelle incluse. Sans BPA, réutilisables.",
    badges: ["Nouveau"],
    rating: 4.5,
    reviews: 0,
    image: "img/jard_couvercles_vide.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "200 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierSku: "cj-vacuum-lids-8",
    supplierPrice: 8.50,
    supplierUrl: "https://www.cjdropshipping.com",
    variants: [
      { label: "×8 — 86mm (large) + pompe", description: "8 couvercles 86mm + pompe manuelle. Compatible bocaux large ouverture : Le Parfait, Mason Jar, Ball. Jusqu'à 5× la durée de conservation.", price: 12, originalPrice: 17, supplierPrice: 8.50, supplierSku: "cj-vacuum-lids-8-86mm", image: "img/jard_couvercles_vide.jpg" },
      { label: "×8 — 70mm (standard) + pompe", description: "8 couvercles 70mm + pompe manuelle. Pour bocaux à ouverture standard (70mm) les plus courants. Même performance de conservation.", price: 12, originalPrice: 17, supplierPrice: 8.50, supplierSku: "cj-vacuum-lids-8-70mm", image: "img/jard_couvercles_vide.jpg" },
      { label: "×16 — mix 70mm + 86mm + pompe électrique", description: "16 couvercles (8×70mm + 8×86mm) + pompe électrique USB. Conservez toutes vos conserves d'un geste. Batterie intégrée 400 cycles.", price: 29, originalPrice: 42, supplierPrice: 22.00, supplierSku: "cj-vacuum-lids-16-elec", image: "img/jard_couvercles_vide.jpg" }
    ]
  },
  {
    id: 143,
    name: "Agenouilloir pliable 2-en-1 jardinier",
    price: 22.00,
    originalPrice: 32.00,
    category: "Jardinage",
    description: "Agenouilloir/tabouret 2-en-1 : retourné devient assise. Mousse EPE 5cm anti-fatigue, structure acier tubulaire Ø25mm, charge max 120 kg. Poids : 1,1 kg. Pliable en 5 secondes. Poignées latérales facilitent les relevés. Idéal arthrose et jardinage prolongé.",
    badges: ["Nouveau"],
    rating: 4.5,
    reviews: 0,
    image: "img/jard_agenouilloir.jpg",
    shipping: "Livraison 3-5 jours",
    weight: "1.1 kg",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "agenouilloir-2en1",
    supplierPrice: 16.50,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "Standard — mousse verte", description: "Agenouilloir 2-en-1 mousse verte 5cm. Charge max 120kg. Poignées acier pour se relever. Pliable. Livré avec sacoche de rangement.", price: 22, originalPrice: 32, supplierPrice: 16.50, supplierSku: "agenouilloir-2en1-vert", image: "img/jard_agenouilloir.jpg" },
      { label: "Large — mousse grise + poches outils", description: "Version large (+10cm) avec 2 poches latérales pour ranger sécateur, gants et outils. Mousse grise 6cm extra-confort. Idéal jardinage intensif.", price: 29, originalPrice: 42, supplierPrice: 22.00, supplierSku: "agenouilloir-2en1-large", image: "img/jard_agenouilloir.jpg" }
    ]
  }
,

  // ── Produits jardinage supplémentaires (IDs 144-150) ──
  {id:144,name:"Grelinette bio 3 dents",price:38,originalPrice:55,category:"Jardinage",description:"Grelinette bio 3 dents en acier forgé, manche hêtre 120cm. Ameublit sans retourner, préserve vers et vie du sol. L'outil bio par excellence.",badges:["Nouveau","Bio"],rating:4.8,reviews:0,image:"img/grelinette.jpg",shipping:"Livraison 5-7 jours",weight:"1.8 kg",inStock:true,supplier:"BigBuy",supplierSku:"grelinette-3dents",supplierPrice:27,supplierUrl:"https://www.bigbuy.eu/fr",variants:[{label:"3 dents — manche hêtre 120cm",description:"Grelinette 3 dents. Acier forgé + manche hêtre 120cm. Ameublit sans retourner, préserve la vie du sol.",price:38,originalPrice:55,supplierPrice:27,supplierSku:"grelinette-3dents",image:"img/grelinette.jpg"},{label:"5 dents — manche hêtre 130cm",description:"Grelinette 5 dents pour sols lourds et argileux. Manche hêtre 130cm. Travail profond sans effort.",price:52,originalPrice:75,supplierPrice:37,supplierSku:"grelinette-5dents",image:"img/grelinette.jpg"}]},{id:145,name:"Couteau désherbeur en acier inox",price:12,originalPrice:17,category:"Jardinage",description:"Couteau désherbeur lame acier inox 18cm. Tranche les racines au ras du sol sans les arracher. Poignée ergonomique. Idéal allées, bordures, potager.",badges:["Nouveau"],rating:4.5,reviews:0,image:"img/couteau_desherbage.jpg",shipping:"Livraison 2-3 jours",weight:"180 g",inStock:true,supplier:"BigBuy",supplierSku:"couteau-desherbage-inox",supplierPrice:8.50,supplierUrl:"https://www.bigbuy.eu/fr",variants:[{label:"Couteau désherbeur 18cm",description:"Couteau désherbeur 18cm inox. Tranche racines et mauvaises herbes proprement. Poignée ergonomique.",price:12,originalPrice:17,supplierPrice:8.50,supplierSku:"couteau-desherbage-inox",image:"img/couteau_desherbage.jpg"}]},{id:146,name:"Système hydroponique 12 sites DWC",price:35,originalPrice:52,category:"Jardinage",description:"Système hydroponique DWC 12 sites. Bac 30L, pompe à air, pierre diffusante, 12 godets + filets. Culture laitues, herbes, fraises. 3× plus rapide qu'en terre.",badges:["Nouveau"],rating:4.6,reviews:0,image:"img/hydro_dwc.jpg",shipping:"Livraison 5-7 jours",weight:"2.4 kg",inStock:true,supplier:"CJdropshipping",supplierSku:"cj-hydro-dwc-12",supplierPrice:25,supplierUrl:"https://www.cjdropshipping.com",variants:[{label:"12 sites — bac 30L",description:"DWC 12 sites, bac 30L. Pompe air, diffuseur, 12 godets filets. Pour laitues, herbes, fraises.",price:35,originalPrice:52,supplierPrice:25,supplierSku:"cj-hydro-dwc-12",image:"img/hydro_dwc.jpg"},{label:"24 sites — bac 60L",description:"DWC 24 sites, bac 60L. Double pompe. Idéal production intensive herbes et petits légumes.",price:59,originalPrice:85,supplierPrice:42,supplierSku:"cj-hydro-dwc-24",image:"img/hydro_dwc.jpg"}]},{id:147,name:"Thermohygromètre digital pour serre",price:14,originalPrice:20,category:"Jardinage",description:"Thermohygromètre digital pour serre et culture indoor. Plage -50°C à +70°C, humidité 10-99%. Mémoire min/max, icône confort. Écran LCD rétroéclairé.",badges:["Nouveau"],rating:4.5,reviews:0,image:"img/thermohygrometre.jpg",shipping:"Livraison 2-3 jours",weight:"60 g",inStock:true,supplier:"CJdropshipping",supplierSku:"cj-thermo-hygro",supplierPrice:9.50,supplierUrl:"https://www.cjdropshipping.com",variants:[{label:"Digital LCD — température + humidité",description:"Thermohygromètre LCD. Temp -50 à +70°C, HR 10-99%. Mémoire min/max. Idéal serre et chambre de culture.",price:14,originalPrice:20,supplierPrice:9.50,supplierSku:"cj-thermo-hygro",image:"img/thermohygrometre.jpg"},{label:"WiFi — app smartphone",description:"Thermohygromètre WiFi avec app smartphone. Historique 30 jours, alertes température. Idéal pour surveiller à distance.",price:22,originalPrice:32,supplierPrice:15,supplierSku:"cj-thermo-hygro-wifi",image:"img/thermohygrometre.jpg"}]},{id:148,name:"Engrais biostimulant orties fermentées 1L",price:12,originalPrice:17,category:"Jardinage",description:"Purin d'orties concentré fermenté. 1L = 20L de solution d'arrosage. Stimule croissance, renforce résistance aux maladies, repousse insectes. 100% bio certifié.",badges:["Nouveau","Bio"],rating:4.6,reviews:0,image:"img/purin_orties.jpg",shipping:"Livraison 2-3 jours",weight:"1.05 kg",inStock:true,supplier:"BigBuy",supplierSku:"purin-orties-1l",supplierPrice:8.50,supplierUrl:"https://www.bigbuy.eu/fr",variants:[{label:"1L concentré — orties",description:"Purin d'orties 1L concentré. 1L = 20L solution. Stimule croissance + repousse pucerons.",price:12,originalPrice:17,supplierPrice:8.50,supplierSku:"purin-orties-1l",image:"img/purin_orties.jpg"},{label:"5L — lot économique",description:"Purin d'orties 5L. 5× plus économique. 5L = 100L de solution. Pour grand potager.",price:48,originalPrice:70,supplierPrice:34,supplierSku:"purin-orties-5l",image:"img/purin_orties.jpg"}]},{id:149,name:"Minuterie électrique 7 jours programmable",price:9,originalPrice:13,category:"Jardinage",description:"Minuterie électrique programmable 7 jours 16A. Pour lampe horticole, pompe hydroponique, chauffage serre. 20 programmes par jour. LCD, charge max 3680W.",badges:["Nouveau"],rating:4.5,reviews:0,image:"img/minuterie_16a.jpg",shipping:"Livraison 2-3 jours",weight:"80 g",inStock:true,supplier:"CJdropshipping",supplierSku:"cj-timer-16a",supplierPrice:6,supplierUrl:"https://www.cjdropshipping.com",variants:[{label:"Minuterie 16A — 20 programmes",description:"Minuterie mécanique 16A 7 jours. 20 programmes/jour. Max 3680W. Pour lampe de culture, pompe, chauffage.",price:9,originalPrice:13,supplierPrice:6,supplierSku:"cj-timer-16a",image:"img/minuterie_16a.jpg"}]},{id:150,name:"Substrat coco/coir culture premium 50L",price:18,originalPrice:26,category:"Jardinage",description:"Substrat de culture coco/coir premium 50L. Lavé et tamponné pH 5,8-6,2. Utilisable seul, en mélange sol ou hydroponique. Certifié OMRI bio. Excellent drainage et rétention.",badges:["Nouveau","Bio"],rating:4.5,reviews:0,image:"img/substrat_coco.jpg",shipping:"Livraison 5-7 jours",weight:"5.5 kg",inStock:true,supplier:"BigBuy",supplierSku:"substrat-coco-50l",supplierPrice:13,supplierUrl:"https://www.bigbuy.eu/fr",variants:[{label:"50L — bloc compressé",description:"Substrat coco 50L bloc compressé. pH 5,8-6,2. Sol, mélange ou hydro. Certifié OMRI bio.",price:18,originalPrice:26,supplierPrice:13,supplierSku:"substrat-coco-50l",image:"img/substrat_coco.jpg"},{label:"100L — lot de 2",description:"Lot de 2 blocs 50L = 100L substrat coco. Pour équiper entièrement une chambre de culture ou un grand potager.",price:34,originalPrice:49,supplierPrice:24,supplierSku:"substrat-coco-100l",image:"img/substrat_coco.jpg"}]}
];

// ── Nouveaux produits Survie (IDs 200-207) ─────────────────────────────────
const PRODUCTS_SURVIE_NEW = [
  {
    id: 200,
    name: "Filtre à eau portable LifeStraw 1000L",
    price: 19.00,
    originalPrice: 27.00,
    category: "Survie",
    description: "Filtre à eau LifeStraw certifié. Élimine 99,9999% des bactéries (E.coli, Salmonella) et 99,9% des parasites (Giardia, Cryptosporidium). Capacité 1000 litres — zéro produit chimique, zéro pile. Poids 56g. Boire directement dans rivières et sources. Le filtre de survie le plus vendu au monde.",
    badges: ["Nouveau", "Essentiel"],
    rating: 4.9,
    reviews: 0,
    image: "img/surv_lifestraw.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "56 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierSku: "cj-lifestraw-1000l",
    supplierPrice: 14.00,
    supplierUrl: "https://www.cjdropshipping.com",
    variants: [
      { label: "Filtre paille 1000L — bleu", description: "Filtre paille individuel 1000L — bleu. Boire directement depuis une source. Élimine 99,9999% bactéries. Poids 56g. Incontournable du kit 72h.", price: 19, originalPrice: 27, supplierPrice: 14.00, supplierSku: "cj-lifestraw-1000l-bleu", image: "img/surv_lifestraw.jpg" },
      { label: "Filtre paille 1000L — vert", description: "Filtre paille individuel 1000L — vert. Même performance que le bleu. Coloris discret pour usage outdoor et randonnée.", price: 19, originalPrice: 27, supplierPrice: 14.00, supplierSku: "cj-lifestraw-1000l-vert", image: "img/surv_lifestraw.jpg" },
      { label: "Bouteille filtrante 650mL + filtre 4000L", description: "Bouteille filtrante 650mL avec filtre 4000L intégré. Boire en déplaçant la pression. Idéale randonnée et voyage. Inclus adaptateur pour poche à eau.", price: 29, originalPrice: 42, supplierPrice: 21.00, supplierSku: "cj-filter-bottle-650ml", image: "img/surv_lifestraw.jpg" }
    ]
  },
  {
    id: 201,
    name: "Batterie solaire 20000mAh panneau 5W",
    price: 34.00,
    originalPrice: 49.00,
    category: "Énergie",
    description: "Power bank solaire 20000mAh avec panneau 5W intégré. 2 sorties USB-A (5V/2.1A) + 1 USB-C (5V/3A). Rechargeable par soleil en 15-20h ou secteur en 8h. Indicateur LED, imperméable IPX5. Charge smartphone jusqu'à 5× ou tablette 2×. Parfait camping, randonnée, panne de courant.",
    badges: ["Nouveau", "Essentiel"],
    rating: 4.7,
    reviews: 0,
    image: "img/surv_batterie_solaire.jpg",
    shipping: "Livraison 5-7 jours",
    weight: "420 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierSku: "cj-solar-bank-20000",
    supplierPrice: 25.00,
    supplierUrl: "https://www.cjdropshipping.com",
    variants: [
      { label: "20000mAh — noir", description: "Power bank solaire 20000mAh noir. Panneau 5W, USB-A×2 + USB-C, IPX5. Charge 5× smartphone ou recharge lampe/radio de survie en coupure.", price: 34, originalPrice: 49, supplierPrice: 25.00, supplierSku: "cj-solar-bank-20000-noir", image: "img/surv_batterie_solaire.jpg" },
      { label: "20000mAh — vert kaki", description: "Power bank solaire 20000mAh vert kaki — coloris discret outdoor. Mêmes performances. Idéal randonnée et usage discret en milieu naturel.", price: 34, originalPrice: 49, supplierPrice: 25.00, supplierSku: "cj-solar-bank-20000-kaki", image: "img/surv_batterie_solaire.jpg" },
      { label: "40000mAh — double panneau 10W", description: "Power bank solaire 40000mAh + double panneau 10W. Recharge solaire 2× plus rapide. Pour les longues expéditions ou pour alimenter un groupe.", price: 59, originalPrice: 85, supplierPrice: 43.00, supplierSku: "cj-solar-bank-40000", image: "img/surv_batterie_solaire.jpg" }
    ]
  },
  {
    id: 202,
    name: "Trousse premiers secours 42 pièces",
    price: 18.00,
    originalPrice: 25.00,
    category: "Survie",
    description: "Kit premiers secours complet 42 pièces en pochette imperméable nylon. Inclus : pansements (18 tailles), compresses stériles, bandes élastiques, ciseaux, épingles de sûreté, gants nitrile, masque RCP, garrot, couverture survie. Conforme EN 13157. Idéal randonnée, voiture, bivouac.",
    badges: ["Nouveau", "Essentiel"],
    rating: 4.7,
    reviews: 0,
    image: "img/surv_trousse_secours.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "280 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "kit-secours-42pcs",
    supplierPrice: 13.50,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "42 pièces — pochette nylon", description: "Trousse 42 pièces en pochette nylon imperméable compacte (21×15cm). Conforme EN 13157. Poids 280g. Idéal sac à dos, voiture, bivouac.", price: 18, originalPrice: 25, supplierPrice: 13.50, supplierSku: "kit-secours-42pcs", image: "img/surv_trousse_secours.jpg" },
      { label: "72 pièces — mallette rigide", description: "Trousse 72 pièces en mallette rigide ABS avec compartiments. Inclut défibrillateur bidon de diagnostic, attelle, couverture mylar. Pour famille ou groupe.", price: 29, originalPrice: 42, supplierPrice: 22.00, supplierSku: "kit-secours-72pcs-mallette", image: "img/surv_trousse_secours.jpg" },
      { label: "Kit auto — norme DIN13164", description: "Kit automobile obligatoire norme DIN 13164 + supplément survie (couverture mylar, garrot, masque). Valable contrôle technique. Poids 320g.", price: 22, originalPrice: 32, supplierPrice: 16.50, supplierSku: "kit-secours-auto-din13164", image: "img/surv_trousse_secours.jpg" }
    ]
  },
  {
    id: 203,
    name: "Kit allume-feu survie 3-en-1",
    price: 14.00,
    originalPrice: 19.00,
    category: "Survie",
    description: "Kit allume-feu de survie 3-en-1 : briquet tempête rechargeable USB résistant vent jusqu'à 80 km/h + pierre à feu ferrocerium 12cm (12 000 frappes) + bâtonnet d'amadou. Étui imperméable inclus. Fonctionne sous la pluie, à -20°C, à toute altitude. Le trio indispensable du kit 72h.",
    badges: ["Nouveau"],
    rating: 4.6,
    reviews: 0,
    image: "img/surv_kit_feu.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "180 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierSku: "cj-fire-kit-3in1",
    supplierPrice: 10.00,
    supplierUrl: "https://www.cjdropshipping.com",
    variants: [
      { label: "Kit 3-en-1 — étui noir", description: "Briquet tempête USB + pierre à feu 12cm + amadou + étui imperméable noir. Tout-en-un pour allumer feu sous pluie et vent. 12 000 frappes garanties.", price: 14, originalPrice: 19, supplierPrice: 10.00, supplierSku: "cj-fire-kit-3in1-noir", image: "img/surv_kit_feu.jpg" },
      { label: "Kit 3-en-1 — étui kaki", description: "Même kit en étui kaki militaire — plus discret en outdoor. Identique en performance. Clip ceinture inclus pour attache rapide au sac.", price: 14, originalPrice: 19, supplierPrice: 10.00, supplierSku: "cj-fire-kit-3in1-kaki", image: "img/surv_kit_feu.jpg" },
      { label: "Kit étendu — + allume-feu magnésium + sifflet", description: "Kit 5-en-1 : briquet tempête + ferrocerium + amadou + barreau magnésium + sifflet 120dB. Le kit allume-feu le plus complet pour survivaliste.", price: 19, originalPrice: 27, supplierPrice: 14.00, supplierSku: "cj-fire-kit-5in1", image: "img/surv_kit_feu.jpg" }
    ]
  },
  {
    id: 204,
    name: "Couvertures survie mylar — lot de 4",
    price: 9.00,
    originalPrice: 13.00,
    category: "Survie",
    description: "Couvertures de survie mylar 160×210cm. Réfléchissent 90% de la chaleur corporelle. Film aluminium double face (or/argent). Imperméables, légères (50g chacune), format poche. Certifiées CE. Protègent aussi contre le soleil et le vent. Lot de 4 — pour toute la famille.",
    badges: ["Nouveau", "Essentiel"],
    rating: 4.6,
    reviews: 0,
    image: "img/surv_couverture_mylar.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "200 g",
    inStock: true,
    supplier: "BigBuy",
    supplierSku: "couverture-mylar-x4",
    supplierPrice: 6.50,
    supplierUrl: "https://www.bigbuy.eu/fr",
    variants: [
      { label: "×4 — 160×210cm or/argent", description: "Lot de 4 couvertures mylar 160×210cm double face or/argent. 50g chacune, format poche. Certifiées CE. Utilisables aussi comme bâche réfléchissante.", price: 9, originalPrice: 13, supplierPrice: 6.50, supplierSku: "couverture-mylar-x4", image: "img/surv_couverture_mylar.jpg" },
      { label: "×10 — format lot économique", description: "Lot de 10 couvertures mylar 160×210cm — format associatif ou longue préparation. Idéal pour équiper un groupe ou constituer un stock multi-années.", price: 19, originalPrice: 28, supplierPrice: 14.00, supplierSku: "couverture-mylar-x10", image: "img/surv_couverture_mylar.jpg" },
      { label: "Sac de couchage mylar réutilisable", description: "Sac de couchage mylar format momie — plus robuste que les couvertures jetables. 4 saisons, réfléchit 90% chaleur. Lavable et réutilisable.", price: 22, originalPrice: 32, supplierPrice: 16.50, supplierSku: "couverture-mylar-sac", image: "img/surv_couverture_mylar.jpg" }
    ]
  },
  {
    id: 205,
    name: "Radio météo manivelle solaire DAB+/FM",
    price: 39.00,
    originalPrice: 55.00,
    category: "Électronique outdoor",
    description: "Radio d'urgence multi-énergie DAB+/FM/AM/SW. 4 modes d'alimentation : manivelle dynamo (1 min → 20 min autonomie), panneau solaire, batterie intégrée 2000mAh, micro-USB. Lampe LED 3W. Alerte météo NOAA. Imperméable IPX3. Fonctionne sans électricité ni réseau.",
    badges: ["Nouveau"],
    rating: 4.5,
    reviews: 0,
    image: "img/surv_radio_manivelle.jpg",
    shipping: "Livraison 5-7 jours",
    weight: "450 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierSku: "cj-radio-solar-dab",
    supplierPrice: 29.00,
    supplierUrl: "https://www.cjdropshipping.com",
    variants: [
      { label: "DAB+/FM/AM — vert kaki", description: "Radio urgence DAB+/FM/AM + manivelle + solaire + batterie 2000mAh. Lampe LED 3W. Coloris kaki discret outdoor. Alerte météo NOAA.", price: 39, originalPrice: 55, supplierPrice: 29.00, supplierSku: "cj-radio-solar-dab-kaki", image: "img/surv_radio_manivelle.jpg" },
      { label: "DAB+/FM/AM — orange", description: "Même radio en orange haute visibilité — plus facile à localiser en situation d'urgence. Idéal kit de survie voiture et trousse 72h.", price: 39, originalPrice: 55, supplierPrice: 29.00, supplierSku: "cj-radio-solar-dab-orange", image: "img/surv_radio_manivelle.jpg" },
      { label: "Version Pro — batterie 5000mAh + BT", description: "Radio Pro : mêmes ondes + batterie 5000mAh + Bluetooth + chargeur sans fil Qi. Peut recharger smartphone. Autonomie 3× supérieure.", price: 59, originalPrice: 85, supplierPrice: 44.00, supplierSku: "cj-radio-solar-pro-5000", image: "img/surv_radio_manivelle.jpg" }
    ]
  },
  {
    id: 206,
    name: "Sac de couchage compact 0°C / -5°C",
    price: 44.00,
    originalPrice: 62.00,
    category: "Survie",
    description: "Sac de couchage 3 saisons coupe momie. Garnissage fibre creuse thermique 250g/m². Fermeture éclair YKK double sens anti-accrochage. Compression 3,8L, poids 900g. Température confort 0°C / limite -5°C. Doublure polyester doux. Idéal bivouac, camping, kit d'urgence.",
    badges: ["Nouveau"],
    rating: 4.5,
    reviews: 0,
    image: "img/surv_sac_couchage.jpg",
    shipping: "Livraison 5-7 jours",
    weight: "900 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierSku: "cj-sleeping-bag-0c",
    supplierPrice: 32.00,
    supplierUrl: "https://www.cjdropshipping.com",
    variants: [
      { label: "Confort 0°C — bleu — 900g", description: "Sac momie confort 0°C / limite -5°C. Bleu, 900g, compression 3,8L. YKK double sens. Pour 3 saisons printemps/été/automne.", price: 44, originalPrice: 62, supplierPrice: 32.00, supplierSku: "cj-sleeping-bag-0c-bleu", image: "img/surv_sac_couchage.jpg" },
      { label: "Confort 0°C — vert kaki — 900g", description: "Identique, coloris kaki discret pour bivouac. Même performance thermique. Filet de transport inclus.", price: 44, originalPrice: 62, supplierPrice: 32.00, supplierSku: "cj-sleeping-bag-0c-kaki", image: "img/surv_sac_couchage.jpg" },
      { label: "Confort -10°C — hiver — 1100g", description: "Sac d'hiver confort -10°C / limite -15°C. Garnissage 400g/m² + col thermique réglable. Pour bivouac hivernal et randonnée hivernale. 1100g.", price: 64, originalPrice: 92, supplierPrice: 48.00, supplierSku: "cj-sleeping-bag-minus10", image: "img/surv_sac_couchage.jpg" }
    ]
  },
  {
    id: 207,
    name: "Corde paracorde 550 — 30m + kit survie",
    price: 14.00,
    originalPrice: 19.00,
    category: "Survie",
    description: "Corde paracorde militaire MIL-C-5040H type III — résistance 250kg (550 lbs). 30 mètres. Gaine nylon 32 fuseaux, 7 brins intérieurs réutilisables (ligature, suture urgence, fabrication filet). Kit survie inclus : briquet, sifflet 120dB, boussole, grattoir ferro. Coloris olive/noir/camo.",
    badges: ["Nouveau"],
    rating: 4.6,
    reviews: 0,
    image: "img/surv_paracorde.jpg",
    shipping: "Livraison 2-3 jours",
    weight: "250 g",
    inStock: true,
    supplier: "CJdropshipping",
    supplierSku: "cj-paracord-30m-kit",
    supplierPrice: 10.00,
    supplierUrl: "https://www.cjdropshipping.com",
    variants: [
      { label: "30m — Olive + kit survie 4-en-1", description: "30m paracorde olive + kit survie : briquet USB, sifflet 120dB, boussole, grattoir ferrocerium. Livré sur bobine. Résistance 250kg.", price: 14, originalPrice: 19, supplierPrice: 10.00, supplierSku: "cj-paracord-30m-olive", image: "img/surv_paracorde.jpg" },
      { label: "30m — Noir + kit survie 4-en-1", description: "Même corde en noir — plus discret. Identique performance. Kit survie inclus. Idéal randonnée, camping, kit d'urgence voiture.", price: 14, originalPrice: 19, supplierPrice: 10.00, supplierSku: "cj-paracord-30m-noir", image: "img/surv_paracorde.jpg" },
      { label: "30m — Camo + kit survie 4-en-1", description: "Corde camouflage 30m + kit survie. Coloris militaire discret pour bushcraft et survival en milieu naturel.", price: 14, originalPrice: 19, supplierPrice: 10.00, supplierSku: "cj-paracord-30m-camo", image: "img/surv_paracorde.jpg" },
      { label: "100m — bobine pro olive", description: "Bobine pro 100m paracorde olive — pour équiper un groupe ou stocker. Sans kit survie. Prix au mètre imbattable. Résistance 250kg.", price: 34, originalPrice: 49, supplierPrice: 25.00, supplierSku: "cj-paracord-100m-olive", image: "img/surv_paracorde.jpg" }
    ]
  }
];
// Fusionner tous les produits
const ALL_PRODUCTS = [...PRODUCTS, ...PRODUCTS_JARDINAGE, ...PRODUCTS_SURVIE_NEW];
// Catégories disponibles
const CATEGORIES = [
  { id: "all", name: "Tous les produits", emoji: "🏷️", count: 63 },
  { id: "Survie", name: "Survie", emoji: "🏕️", count: 13 },
  { id: "Éclairage", name: "Éclairage", emoji: "🔦", count: 6 },
  { id: "Alimentation outdoor", name: "Alimentation outdoor", emoji: "🥾", count: 6 },
  { id: "Montres outdoor", name: "Montres outdoor", emoji: "⌚", count: 2 },
  { id: "Sacs à dos", name: "Sacs à dos", emoji: "🎒", count: 4 },
  { id: "Pêche", name: "Pêche", emoji: "🎣", count: 2 },
  { id: "Énergie", name: "Énergie", emoji: "⚡", count: 4 },
  { id: "Électronique outdoor", name: "Électronique outdoor", emoji: "📡", count: 5 },
  { id: "Escalade", name: "Escalade", emoji: "🧗", count: 3 },
  { id: "Cyclisme & Trail", name: "Cyclisme & Trail", emoji: "🚵", count: 3 },
  { id: "Vêtements outdoor", name: "Vêtements outdoor", emoji: "🧥", count: 1 },
  { id: "Outils", name: "Outils", emoji: "🔪", count: 8 },
  { id: "Jardinage", name: "Jardinage", emoji: "🌱", count: 30 }
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
  return ALL_PRODUCTS.find(p => p.id === parseInt(id));
}

function getProductsByCategory(category) {
  if (category === "all") return ALL_PRODUCTS;
  return ALL_PRODUCTS.filter(p => p.category === category);
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

