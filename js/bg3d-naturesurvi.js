/* =============================================================================
   bg3d-naturesurvi.js — le fond animé du hero de naturesurvie.net

   LE PARTI PRIS : « lumière de sous-bois ». On regarde vers le haut, à travers
   une frondaison qui bouge ; la lumière du matin passe entre les feuilles en
   rais obliques et de la poussière de pollen monte dans les faisceaux. Rien
   d'autre. Pas de cubes de verre (c'est la signature d'ecd-digital.com), pas
   d'octaèdres facettés (c'est l'outil Client Fantôme) : ici on vend de la
   survie et du jardinage, donc de la matière végétale et de la lumière
   naturelle.

   AUCUNE DÉPENDANCE. WebGL 1 écrit à la main, deux programmes, deux appels de
   dessin par image :
     1. un quad plein écran (le sous-bois : dégradé + frondaison + rais + grain) ;
     2. ~46 points (le pollen), animés dans le vertex shader — le processeur ne
        touche à rien pendant la boucle.
   Pas de Three.js, pas de CDN : le site reste autonome, et aucune requête
   supplémentaire ne part vers un tiers.

   POIDS RÉEL, mesuré le 14/08/2026 (gzip -9 et brotli sur les fichiers livrés) :
     js/bg3d-naturesurvi.js .... 25 485 o bruts · 9 508 o gzip · 8 589 o brotli
     css/bg3d-naturesurvi.css ... 4 756 o bruts · 1 833 o gzip · 1 640 o brotli
     ------------------------------------------------------------------------
     ce que télécharge un visiteur (Netlify sert du brotli) ...... 10 229 o
   Soit 10 Ko sur le réseau, image comprise : il n'y a AUCUNE image.
   Les deux tiers du fichier brut sont ces commentaires, qui se compriment.
   Là où j'ai coupé : pas de Three.js (167 Ko), pas de post-traitement (bloom),
   pas de texture d'environnement, pas de police, pas de sprite de pollen — le
   grain de pollen est un gl.POINTS avec un halo calculé dans le shader.

   LES GARDE-FOUS (repris de Client_Fantome/outil/bg3d-fantome.js, qui tourne
   en production) :
   - repli immédiat sur le dégradé CSS si WebGL manque, si la machine rame, si
     le contexte se perd ou si la boucle se fige — le hero reste beau sans le
     canvas (voir css/bg3d-naturesurvi.css) ;
   - prefers-reduced-motion : le canvas n'est même pas créé ;
   - onglet caché OU hero sorti de l'écran → boucle arrêtée (rien ne tourne
     pendant que le visiteur lit les fiches produit) ;
   - démarrage au premier geste du visiteur (repli à 3,5 s) : la création du
     contexte WebGL coûte 300 à 570 ms de blocage, mesuré sur l'autre projet.
     Décalée après le chargement, elle ne pèse plus sur le LCP ;
   - budget de pixels plafonné (720 000 sur ordinateur, 260 000 sur téléphone)
     et boucle bridée à 30 / 22 images par seconde ;
   - un voile sombre au centre garde le texte blanc lisible par-dessus.

   RÉGLAGE SANS TOUCHER AU CODE : ?bg3d=off (coupé) / ?bg3d=on (forcé) dans
   l'URL.
   ============================================================================= */
(function () {
  'use strict';

  var CFG = {
    /* Le fond tourne aussi sur téléphone : il ne charge aucune bibliothèque et
       démarre après le chargement. Passer à false pour le couper en dessous de
       820 px si une mesure Lighthouse mobile le demande. */
    MOBILE_3D: true,
    DPR_MAX: 0.85,          /* le tampon est sous-échantillonné : c'est flou et doux, on ne voit rien */
    DPR_MAX_MOBILE: 0.70,
    PX_MAX: 720000,         /* plafond dur du nombre de pixels rendus */
    PX_MAX_MOBILE: 260000,
    IPS: 30,
    IPS_MOBILE: 22,
    POLLEN: 46,
    POLLEN_MOBILE: 20,
    OCTAVES: 4,             /* octaves de bruit sur ordinateur */
    OCTAVES_MOBILE: 3,
    INTRO: 1.9,             /* secondes : la lumière se lève */
    DEPART_AU_PREMIER_GESTE: true,
    SECOURS_MS: 3500
  };

  var root = document.documentElement;
  var hote = document.querySelector('[data-bg3d="naturesurvi"]') || document.querySelector('.hero');
  if (!hote) return;

  var reduce = false, small = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches; } catch (e) {}
  try { small = window.matchMedia('(max-width:820px)').matches; } catch (e) {}

  var force = null;
  try { force = (new URLSearchParams(location.search).get('bg3d') || '').toLowerCase(); } catch (e) {}

  /* Le repli : on marque la racine, le CSS reprend la main (dégradé + rais
     peints en CSS pur). Il n'y a rien à construire, rien à attendre. */
  var canvas = null;
  function statique(raison) {
    root.classList.add('bg3dns-static');
    root.classList.remove('bg3dns-on');
    if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    canvas = null;
    if (raison) { try { console.info('Fond hero : rendu statique (' + raison + ').'); } catch (e) {} }
  }

  if (force === 'off' || reduce) { statique(reduce ? 'animations réduites' : 'coupé par l’URL'); return; }
  if (small && force !== 'on' && !CFG.MOBILE_3D) { statique('mobile'); return; }

  var mob = small;
  var OCT = mob ? CFG.OCTAVES_MOBILE : CFG.OCTAVES;
  var NP = mob ? CFG.POLLEN_MOBILE : CFG.POLLEN;
  var PAS = 1000 / (mob ? CFG.IPS_MOBILE : CFG.IPS);

  /* ===================== LES SHADERS ===================== */

  var VS_FOND =
    'attribute vec2 aP;' +
    'void main(){ gl_Position = vec4(aP, 0.0, 1.0); }';

  var FS_FOND = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH',
    'precision highp float;',
    '#else',
    'precision mediump float;',
    '#endif',
    'uniform vec2 uRes; uniform float uT; uniform vec2 uPar; uniform float uIn;',

    /* bruit de valeur : le moins cher qui reste organique */
    'float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }',
    'float vn(vec2 p){',
    '  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);',
    '  float a=hash(i), b=hash(i+vec2(1.0,0.0)), c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));',
    '  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);',
    '}',
    'float fbm(vec2 p){',
    '  float s=0.0, a=0.55;',
    '  for(int i=0;i<OCT;i++){ s += a*vn(p); p = mat2(0.86,0.51,-0.51,0.86)*p*2.02; a *= 0.5; }',
    '  return s;',
    '}',
    /* Bruit ANISOTROPE, sans rotation entre les octaves : les motifs restent
       étirés dans un sens. C'est indispensable pour des faisceaux — le fbm
       classique tourne le domaine à chaque octave et transforme les rais en
       taches (essayé, c'était raté). */
    'float raies(vec2 q){',
    '  return 0.55*vn(q) + 0.28*vn(q*vec2(2.1,1.7) + 11.3) + 0.17*vn(q*vec2(4.3,2.6) + 23.7);',
    '}',

    /* UNE NAPPE DE FEUILLES. Une grille, une feuille par case, tournée,
       décalée et redimensionnée au hasard ; 3×3 cases parce qu'une feuille
       déborde de la sienne. Retourne x = la silhouette pleine, y = le liseré,
       ce bord fin que la lumière traverse et qui fait qu'on lit « feuille »
       et pas « tache ». Deux nappes de bruit ne donnaient que de la fumée
       verte — testé, jeté. */
    'vec2 h2(vec2 c){ return vec2(hash(c), hash(c + vec2(37.3, 11.7))); }',
    'vec2 nappe(vec2 P, float dens){',
    '  vec2 g = floor(P);',
    '  float m = 0.0, e = 0.0;',
    '  for(int j=-1;j<=1;j++){',
    '    for(int i=-1;i<=1;i++){',
    '      vec2 cell = g + vec2(float(i), float(j));',
    '      vec2 r = h2(cell);',
    '      float on = step(1.0 - dens, 0.62*r.x + 0.38*r.y);',
    '      vec2 c = cell + 0.5 + (r - 0.5)*0.92;',
    '      vec2 q = P - c;',
    '      float a = 6.2831*r.y;',
    '      float ca = cos(a), sa = sin(a);',
    '      q = vec2(ca*q.x - sa*q.y, sa*q.x + ca*q.y);',
    '      float k = 1.00 + 0.85*r.x;',
    /* la feuille = intersection de deux disques : ça donne les deux pointes.
       Une ellipse toute simple donnait des gélules, on les voyait. */
    '      q /= k;',
    '      float d = max(length(q - vec2(0.36,0.0)), length(q + vec2(0.36,0.0))) / 0.50;',
    '      m = max(m, on*smoothstep(1.00, 0.90, d));',
    '      e = max(e, on*(smoothstep(1.13, 1.00, d) - smoothstep(1.00, 0.90, d)));',
    '    }',
    '  }',
    '  return vec2(m, max(e, 0.0));',
    '}',

    'void main(){',
    '  vec2 uv = gl_FragCoord.xy / uRes;',
    '  vec2 p  = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;',

    /* 1. le fond : humus bleu nuit en bas à droite, mousse éclairée en haut à
          gauche. Les teintes prolongent le dégradé CSS du hero (#2d5016 →
          #1a3c2e → #1a1a2e) pour qu'aucune bascule ne se voie au démarrage. */
    '  vec3 encre = vec3(0.026,0.038,0.056);',
    '  vec3 sapin = vec3(0.045,0.128,0.100);',
    '  vec3 mousse= vec3(0.112,0.216,0.078);',
    '  float g = clamp(uv.y*0.86 + (1.0-uv.x)*0.32 - 0.06, 0.0, 1.0);',
    '  vec3 col = mix(encre, sapin, smoothstep(0.00,0.70,g));',
    '  col = mix(col, mousse, smoothstep(0.55,1.20,g)*0.58);',

    /* 2. la lumière : un soleil hors champ en haut à gauche. Les rais sont un
          bruit étiré LE LONG de la direction de la lumière (u = en travers,
          v = distance parcourue), avec un léger évasement : des faisceaux
          parallèles, pas une roue de rayons. */
    /*    La lumière est composée en coordonnées d'ÉCRAN (c), pas en unités de
          hauteur : sinon, sur le hero étroit et haut du téléphone, on ne voit
          qu'une tranche du faisceau, agrandie et deux fois trop claire — c'est
          ce qui faisait tomber le badge à 3,6:1. En coordonnées d'écran, la
          même composition arrive sur les deux formats. */
    '  vec2 c = vec2(uv.x - 0.5, uv.y - 0.5);',
    '  vec2 sun = vec2(-0.44, 0.58);',
    '  vec2 L = normalize(vec2(0.60,-1.0));',
    '  vec2 N = vec2(-L.y, L.x);',
    '  vec2 rel = c - sun;',
    '  float v = max(dot(rel, L), 0.0);',
    '  float u = dot(rel, N) / (0.26 + 0.52*v);',
    '  float ray = smoothstep(0.46, 0.74, raies(vec2(u*10.0, v*0.16 - uT*0.028)));',
    '  ray *= 0.60 + 0.40*vn(vec2(u*22.0, v*0.42 - uT*0.040));',  /* de fines nervures dans le faisceau */
    '  ray *= exp(-v*1.75);',

    /* 3. la frondaison lointaine : des masses défocalisées, en haut du cadre.
          Le bruit convient ici — c'est ce qui est HORS foyer. */
    '  float haut = smoothstep(0.18, 1.00, uv.y);',
    '  float brume = fbm(p*2.2 + vec2(uT*0.010, 0.0) + uPar*0.05);',
    '  float masse = smoothstep(0.30, 0.62, brume + haut*0.30 - 0.18);',

    /* 4. la frondaison proche : de vraies feuilles, nettes, seulement dans le
          haut du cadre. Le test sur `bande` n'est pas un luxe : il évite de
          calculer 9 cases par pixel sur les deux tiers bas de l'image, et les
          pixels voisins prennent la même branche (pas de divergence). */
    '  float bande = smoothstep(0.40, 1.02, uv.y);',
    '  vec2 F = vec2(0.0);',
    '  if (bande > 0.004) {',
    '    vec2 der = vec2(uT*0.007 + sin(uT*0.16)*0.014, cos(uT*0.13)*0.010);',
    '    vec2 P = p + uPar*0.055 + der;',
'    P = mat2(0.94,-0.34,0.34,0.94)*P;',   /* la grille est tournée : sinon on voit les rangées */
'    F = nappe(P*9.0, 0.10 + 0.72*bande*bande) * bande;',
    '  }',

    /* 5. LISIBILITÉ. Le voile couvre la colonne de texte : une boîte arrondie
          en coordonnées d'écran, parce que le hero est large et court sur
          ordinateur, haut et étroit sur téléphone, et que c'est la MÊME
          colonne de texte qu'il faut protéger dans les deux cas.
          Il n'assombrit pas tout : il éteint surtout la LUMIÈRE AJOUTÉE
          (faisceaux, halo, liserés). Les silhouettes de feuilles, elles, sont
          sombres — elles aident le texte blanc au lieu de le gêner, donc on
          les garde. Assombrir tout uniformément écrasait le décor pour rien.
          Chiffres à l'appui : sans ce traitement, le badge « Sélection
          printemps » tombait à 3,8:1 sur téléphone. */
    '  vec2 e = abs(vec2(uv.x - 0.5, uv.y - 0.50)) - vec2(0.17, 0.30);',
    '  float dbox = length(max(e, vec2(0.0)));',
    '  float voile = 1.0 - smoothstep(0.02, 0.46, dbox);',
    '  float lum = 1.0 - 0.80*voile;',        /* ce qui reste de lumière ajoutée */
    '  col *= mix(1.0, 0.66, voile);',

    /* 6. composition : les feuilles coupent le faisceau, la lumière les traverse. */
    '  ray *= (1.0 - 0.85*F.x) * (1.0 - 0.45*masse);',
    '  vec3 chaud = vec3(1.00,0.82,0.46);',
    '  col += chaud * ray * 1.02 * uIn * lum;',
    '  col += chaud * exp(-v*3.0) * 0.30 * uIn * lum;',
    '  col = mix(col, vec3(0.020,0.050,0.040), masse*0.55);',
    '  col = mix(col, vec3(0.012,0.034,0.028), F.x*0.92);',
    '  col += vec3(0.34,0.66,0.24) * F.x * (0.03 + 0.30*ray) * uIn * lum;',
    '  col += (chaud*0.42 + vec3(0.14,0.28,0.10)) * F.y * (0.10 + 0.60*ray) * (0.4+0.6*uIn) * lum;',
    '  col *= 1.0 - 0.20*smoothstep(0.35, 1.05, length(p*vec2(0.55,1.0)));',

    /* 6. un grain de matière très léger : ça casse les bandes du dégradé et ça
          donne du grain de bois plutôt qu'un aplat numérique. */
    '  col += (hash(gl_FragCoord.xy + fract(uT)*13.0) - 0.5) * 0.016;',
    '  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);',
    '}'
  ].join('\n');

  var VS_POLLEN = [
    'precision mediump float;',
    'attribute vec3 aG;',                 /* x : départ horizontal, y : phase verticale, z : profondeur */
    'uniform float uT; uniform vec2 uPar; uniform float uIn; uniform float uPx;',
    'varying float vA;',
    'void main(){',
    '  float prof = aG.z;',
    '  float y = fract(aG.y + uT*(0.010 + 0.030*prof));',
    '  float x = fract(aG.x + sin(uT*0.18 + aG.y*24.0)*0.022*(0.4+prof) + uPar.x*0.020*prof);',
    '  gl_Position = vec4(x*2.0-1.0, y*2.0-1.0, 0.0, 1.0);',
    '  gl_PointSize = (1.3 + 3.0*prof) * uPx;',
    /* LE MÊME VOILE que le fond, recalculé ici. Le pollen est additif : sans
       ça il passe par-dessus le voile. Un seul grain derrière le badge
       « Sélection printemps » suffisait à faire tomber son contraste à
       3,96:1 — c'est ce grain-là qui était le fautif, pas le décor. */
    '  vec2 eb = abs(vec2(x - 0.5, y - 0.5)) - vec2(0.17, 0.30);',
    '  float voile = 1.0 - smoothstep(0.02, 0.46, length(max(eb, vec2(0.0))));',
    '  vA = (0.13 + 0.17*prof) * (1.0 - 0.88*voile) * smoothstep(0.0,0.14,y) * (1.0-smoothstep(0.78,1.0,y)) * uIn;',
    '}'
  ].join('\n');

  var FS_POLLEN = [
    'precision mediump float;',
    'varying float vA;',
    'void main(){',
    '  vec2 c = gl_PointCoord - 0.5;',
    '  float m = exp(-dot(c,c)*13.0) - 0.03;',
    '  if (m <= 0.0) discard;',
    '  gl_FragColor = vec4(vec3(1.0,0.94,0.72) * m * vA, 1.0);',
    '}'
  ].join('\n');

  /* ===================== DÉMARRAGE DIFFÉRÉ ===================== */

  function auRepos(fn) {
    var go = function () {
      if (window.requestIdleCallback) window.requestIdleCallback(fn, { timeout: 2000 });
      else setTimeout(fn, 100);
    };
    requestAnimationFrame(function () { requestAnimationFrame(go); });
  }

  var EVS = ['pointermove', 'pointerdown', 'wheel', 'keydown', 'touchstart', 'scroll'];
  var lance = false, secours = 0;
  function auPremierGeste() {
    if (lance) return;
    lance = true;
    EVS.forEach(function (ev) { window.removeEventListener(ev, auPremierGeste, true); });
    clearTimeout(secours);
    auRepos(demarrer);
  }
  function armer() {
    if (!CFG.DEPART_AU_PREMIER_GESTE) { auRepos(demarrer); return; }
    EVS.forEach(function (ev) { window.addEventListener(ev, auPremierGeste, { passive: true, capture: true }); });
    secours = setTimeout(auPremierGeste, CFG.SECOURS_MS);
  }
  if (document.readyState === 'complete') armer();
  else window.addEventListener('load', armer, { once: true });

  /* ===================== LA SCÈNE ===================== */

  function compiler(gl, type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      var log = gl.getShaderInfoLog(sh);
      gl.deleteShader(sh);
      throw new Error('shader : ' + log);
    }
    return sh;
  }
  function programme(gl, vs, fs) {
    var pr = gl.createProgram();
    gl.attachShader(pr, compiler(gl, gl.VERTEX_SHADER, vs));
    gl.attachShader(pr, compiler(gl, gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error('link : ' + gl.getProgramInfoLog(pr));
    return pr;
  }

  function demarrer() {
    /* Le canvas est créé ici, pas dans le HTML : l'intégration se limite à une
       feuille de style et une balise script. */
    canvas = document.createElement('canvas');
    canvas.id = 'bg3d-ns';
    canvas.setAttribute('aria-hidden', 'true');
    hote.insertBefore(canvas, hote.firstChild);

    var ATTR = {
      alpha: false, antialias: false, depth: false, stencil: false,
      powerPreference: 'low-power', preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false
    };
    var gl = null;
    try { gl = canvas.getContext('webgl', ATTR) || canvas.getContext('experimental-webgl', ATTR); } catch (e) { gl = null; }
    if (!gl) { statique('WebGL indisponible'); return; }

    var prFond, prPol;
    try {
      prFond = programme(gl, VS_FOND, '#define OCT ' + OCT + '\n' + FS_FOND);
      prPol = programme(gl, VS_POLLEN, FS_POLLEN);
    } catch (err) {
      try { console.warn('Fond hero :', err.message); } catch (e) {}
      statique('shader refusé'); return;
    }

    /* quad plein écran */
    var quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var aP = gl.getAttribLocation(prFond, 'aP');

    /* pollen : trois graines par grain, envoyées une fois pour toutes */
    var graines = new Float32Array(NP * 3);
    for (var i = 0; i < NP; i++) {
      graines[i * 3] = Math.random();
      graines[i * 3 + 1] = Math.random();
      graines[i * 3 + 2] = Math.random();
    }
    var bufPol = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufPol);
    gl.bufferData(gl.ARRAY_BUFFER, graines, gl.STATIC_DRAW);
    var aG = gl.getAttribLocation(prPol, 'aG');

    var uF = {
      res: gl.getUniformLocation(prFond, 'uRes'),
      t: gl.getUniformLocation(prFond, 'uT'),
      par: gl.getUniformLocation(prFond, 'uPar'),
      intro: gl.getUniformLocation(prFond, 'uIn')
    };
    var uP = {
      t: gl.getUniformLocation(prPol, 'uT'),
      par: gl.getUniformLocation(prPol, 'uPar'),
      intro: gl.getUniformLocation(prPol, 'uIn'),
      px: gl.getUniformLocation(prPol, 'uPx')
    };

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    /* ---- Taille : le canvas suit le hero, avec un plafond de pixels ---- */
    var W = 1, H = 1, dpr = 1;
    function taille() {
      var r = hote.getBoundingClientRect();
      var w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
      var d = Math.min(window.devicePixelRatio || 1, mob ? CFG.DPR_MAX_MOBILE : CFG.DPR_MAX);
      var maxi = mob ? CFG.PX_MAX_MOBILE : CFG.PX_MAX;
      if (w * h * d * d > maxi) d = Math.sqrt(maxi / (w * h));
      dpr = d;
      W = Math.max(1, Math.round(w * d)); H = Math.max(1, Math.round(h * d));
      if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
      gl.viewport(0, 0, W, H);
    }
    taille();
    window.addEventListener('resize', taille, { passive: true });
    if (window.ResizeObserver) { try { new ResizeObserver(taille).observe(hote); } catch (e) {} }

    /* ---- Parallaxe souris (rien sur téléphone : pas de pointeur) ---- */
    var cx = 0, cy = 0, px = 0, py = 0;
    if (!mob) {
      window.addEventListener('pointermove', function (e) {
        cx = e.clientX / Math.max(1, window.innerWidth) - 0.5;
        cy = e.clientY / Math.max(1, window.innerHeight) - 0.5;
      }, { passive: true });
    }

    /* ---- La boucle ---- */
    var vivant = true, tourne = false, t0 = 0, dernier = -1e9, images = 0, visible = true;

    /* Petite sonde de diagnostic, sans coût : elle permet de vérifier en
       console (ou depuis un script de mesure) le nombre d'images rendues, la
       taille réelle du tampon et le sous-échantillonnage retenu.
       Ex. : __bg3dns.images() puis à nouveau 2 s plus tard. */
    try {
      window.__bg3dns = {
        images: function () { return images; },
        tampon: function () { return [W, H, dpr]; },
        vivant: function () { return vivant && visible && !document.hidden; }
      };
    } catch (e) {}

    function relance() {
      if (vivant && !tourne && !document.hidden && visible) { tourne = true; requestAnimationFrame(boucle); }
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) relance(); });

    /* Hero sorti de l'écran : on arrête. Le visiteur passe l'essentiel de sa
       visite plus bas, dans les fiches produit. */
    if (window.IntersectionObserver) {
      try {
        new IntersectionObserver(function (ent) {
          visible = ent[0].isIntersecting;
          if (visible) relance();
        }, { rootMargin: '80px' }).observe(hote);
      } catch (e) {}
    }

    function image(now) {
      if (!t0) t0 = now;
      var t = (now - t0) / 1000;
      var intro = Math.min(1, t / CFG.INTRO);
      intro = 1 - Math.pow(1 - intro, 3);                 /* la lumière se lève en douceur */
      px += (cx - px) * 0.05; py += (cy - py) * 0.05;

      gl.useProgram(prFond);
      gl.uniform2f(uF.res, W, H);
      gl.uniform1f(uF.t, t);
      gl.uniform2f(uF.par, px, -py);
      gl.uniform1f(uF.intro, intro);
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(aP);
      gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);
      gl.disable(gl.BLEND);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.useProgram(prPol);
      gl.uniform1f(uP.t, t);
      gl.uniform2f(uP.par, px, -py);
      gl.uniform1f(uP.intro, intro);
      gl.uniform1f(uP.px, Math.max(1, dpr * 2.0));
      gl.bindBuffer(gl.ARRAY_BUFFER, bufPol);
      gl.enableVertexAttribArray(aG);
      gl.vertexAttribPointer(aG, 3, gl.FLOAT, false, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);                        /* additif : de la lumière, pas de la peinture */
      gl.drawArrays(gl.POINTS, 0, NP);

      images++;
      if (!root.classList.contains('bg3dns-on')) root.classList.add('bg3dns-on');
    }

    function boucle(now) {
      tourne = false;
      if (!vivant || document.hidden || !visible) return;
      if (now - dernier < PAS) { tourne = true; requestAnimationFrame(boucle); return; }
      dernier = now;
      try { image(now); }
      catch (err) {
        try { console.warn('Fond hero arrêté :', err); } catch (e) {}
        nettoyer(); statique('erreur dans la boucle'); return;
      }
      tourne = true; requestAnimationFrame(boucle);
    }
    relance();

    /* ---- Perte du contexte WebGL : 2 s de patience, puis le dégradé CSS ---- */
    var perte = 0;
    canvas.addEventListener('webglcontextlost', function (e) {
      e.preventDefault(); vivant = false; tourne = false;
      clearTimeout(perte);
      perte = setTimeout(function () { nettoyer(); statique('contexte WebGL perdu'); }, 2000);
    }, false);

    /* ---- Battement de cœur : une boucle figée ne lève aucune exception ---- */
    var derniere = -1;
    var pouls = setInterval(function () {
      if (!vivant) { clearInterval(pouls); return; }
      if (document.hidden || !visible) { derniere = -1; return; }
      if (derniere === images) { clearInterval(pouls); nettoyer(); statique('boucle figée'); return; }
      derniere = images;
    }, 3000);

    /* ---- Santé : si la machine ne suit pas, on allège une fois, puis on coupe ---- */
    var allege = false;
    setTimeout(function mesure() {
      if (!vivant) return;
      if (document.hidden || !visible) { setTimeout(mesure, 2500); return; }
      var i0 = images, h0 = performance.now();
      setTimeout(function () {
        if (!vivant) return;
        var ips = (images - i0) / ((performance.now() - h0) / 1000);
        if (ips >= 12 || ips <= 0) return;
        if (ips >= 6 && !allege) {
          allege = true;
          CFG.PX_MAX = Math.round(CFG.PX_MAX * 0.45);
          CFG.PX_MAX_MOBILE = Math.round(CFG.PX_MAX_MOBILE * 0.45);
          taille();
          try { console.info('Fond hero allégé (' + ips.toFixed(1) + ' img/s).'); } catch (e) {}
          setTimeout(mesure, 3000);
        } else {
          nettoyer(); statique('machine trop lente (' + ips.toFixed(1) + ' img/s)');
        }
      }, 2500);
    }, 2500);

    function nettoyer() {
      vivant = false; tourne = false;
      try {
        gl.deleteBuffer(quad); gl.deleteBuffer(bufPol);
        gl.deleteProgram(prFond); gl.deleteProgram(prPol);
        var ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
      } catch (e) {}
    }
  }
})();
