#!/usr/bin/env node
/**
 * generer-seo.js — regénère sitemap.xml et rss.xml depuis js/products.js.
 *
 *   node outils/generer-seo.js              # écrit les deux fichiers
 *   node outils/generer-seo.js --verifier   # + teste chaque URL en ligne (HTTP 200)
 *
 * À relancer après chaque ajout ou retrait de produit dans js/products.js.
 * Ce dossier n'est pas servi sur le web (voir _redirects).
 *
 * Le fichier products.js n'est jamais modifié : il est seulement lu.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const RACINE = path.resolve(__dirname, '..');
const BASE = 'https://naturesurvie.net/';

/* Doublons du catalogue : même produit saisi deux fois dans products.js,
   à deux prix différents. On ne publie que la fiche retenue (celle qui est
   liée depuis la boutique, sinon l'entrée la plus récente).
   Même table que celle de produit.html — les deux doivent rester alignées. */
const DOUBLONS_A_EXCLURE = [80, 81, 82, 83, 84, 85, 86, 87, 88, 89];

const PAGES = [
  { url: BASE, priorite: '1.0', frequence: 'weekly' },
  { url: BASE + 'catalogue.html', priorite: '0.9', frequence: 'weekly' },
  { url: BASE + 'jardinage.html', priorite: '0.9', frequence: 'weekly' },
  { url: BASE + 'about.html', priorite: '0.4', frequence: 'monthly' },
  { url: BASE + 'cgv.html', priorite: '0.2', frequence: 'yearly' },
];

// ---------------------------------------------------------------- catalogue

function lireCatalogue() {
  const src = fs
    .readFileSync(path.join(RACINE, 'js', 'products.js'), 'utf8')
    .replace(/^﻿+/, '');
  const ctx = { console };
  vm.createContext(ctx);
  vm.runInContext(src + '\n;globalThis.__CATALOGUE = ALL_PRODUCTS;', ctx);
  return ctx.__CATALOGUE;
}

function produitsPublies(tous) {
  const exclus = new Set(DOUBLONS_A_EXCLURE);
  return tous.filter((p) => !exclus.has(p.id));
}

// ------------------------------------------------------------------ helpers

function echapper(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function aujourdhui() {
  return new Date().toISOString().slice(0, 10);
}

// Trois fiches pointent encore vers une image hébergée chez le fournisseur
// (URL absolue dans products.js). On la reprend telle quelle plutôt que de
// la préfixer par le domaine, ce qui produirait une URL invalide.
function urlImage(p) {
  return /^https?:\/\//i.test(p.image) ? p.image : BASE + p.image;
}

function prixAffiche(p) {
  // Le prix mis en avant sur la fiche est product.price, même quand il existe
  // des variantes plus chères. Le flux dit donc la même chose que la page.
  return p.price.toFixed(2);
}

// ------------------------------------------------------------------ sitemap

function ecrireSitemap(produits) {
  const d = aujourdhui();
  const lignes = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!-- Généré par outils/generer-seo.js — ne pas éditer à la main. -->',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const page of PAGES) {
    lignes.push(
      '  <url>',
      `    <loc>${echapper(page.url)}</loc>`,
      `    <lastmod>${d}</lastmod>`,
      `    <changefreq>${page.frequence}</changefreq>`,
      `    <priority>${page.priorite}</priority>`,
      '  </url>'
    );
  }

  for (const p of produits) {
    lignes.push(
      '  <url>',
      `    <loc>${echapper(BASE + 'produit.html?id=' + p.id)}</loc>`,
      `    <lastmod>${d}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      '    <priority>0.7</priority>',
      '  </url>'
    );
  }

  lignes.push('</urlset>', '');
  const chemin = path.join(RACINE, 'sitemap.xml');
  fs.writeFileSync(chemin, lignes.join('\n'), 'utf8');
  return { chemin, total: PAGES.length + produits.length };
}

// ---------------------------------------------------------------------- rss

function ecrireRss(produits) {
  const maintenant = new Date().toUTCString();
  const lignes = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!-- Généré par outils/generer-seo.js — ne pas éditer à la main. -->',
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
    '  <channel>',
    '    <title>Nature Survie &amp; Autonomie — catalogue</title>',
    `    <link>${BASE}</link>`,
    '    <description>Matériel de survie, énergie portable et jardinage. Livraison offerte dès 50 € en France métropolitaine.</description>',
    '    <language>fr-FR</language>',
    `    <lastBuildDate>${maintenant}</lastBuildDate>`,
    `    <image><url>${BASE}img/favicon-512.png</url><title>Nature Survie &amp; Autonomie</title><link>${BASE}</link></image>`,
  ];

  for (const p of produits) {
    const url = BASE + 'produit.html?id=' + p.id;
    lignes.push(
      '    <item>',
      `      <title>${echapper(p.name)}</title>`,
      `      <link>${echapper(url)}</link>`,
      `      <guid isPermaLink="true">${echapper(url)}</guid>`,
      `      <description>${echapper(p.description)}</description>`,
      `      <category>${echapper(p.category)}</category>`,
      `      <enclosure url="${echapper(urlImage(p))}" type="image/jpeg" length="0"/>`,
      `      <g:id>NS-${p.id}</g:id>`,
      `      <g:title>${echapper(p.name)}</g:title>`,
      `      <g:description>${echapper(p.description)}</g:description>`,
      `      <g:link>${echapper(url)}</g:link>`,
      `      <g:image_link>${echapper(urlImage(p))}</g:image_link>`,
      `      <g:price>${prixAffiche(p)} EUR</g:price>`,
      '      <g:availability>in stock</g:availability>',
      '      <g:condition>new</g:condition>',
      '      <g:brand>Nature Survie</g:brand>',
      '      <g:identifier_exists>no</g:identifier_exists>',
      `      <g:product_type>${echapper(p.category)}</g:product_type>`,
      '    </item>'
    );
  }

  lignes.push('  </channel>', '</rss>', '');
  const chemin = path.join(RACINE, 'rss.xml');
  fs.writeFileSync(chemin, lignes.join('\n'), 'utf8');
  return { chemin, total: produits.length };
}

// --------------------------------------------------------------- contrôles

function verifierImagesLocales(produits) {
  return produits.filter(
    (p) =>
      !/^https?:\/\//i.test(p.image) &&
      !fs.existsSync(path.join(RACINE, p.image.replace(/\//g, path.sep)))
  );
}

function imagesDistantes(produits) {
  return produits.filter((p) => /^https?:\/\//i.test(p.image));
}

function statutHttp(url) {
  return new Promise((resolve) => {
    https
      .get(url, { headers: { 'User-Agent': 'generer-seo/1.0' } }, (res) => {
        res.resume();
        resolve(res.statusCode);
      })
      .on('error', () => resolve(0));
  });
}

async function verifierEnLigne(produits) {
  const urls = PAGES.map((p) => p.url).concat(
    produits.map((p) => BASE + 'produit.html?id=' + p.id)
  );
  const echecs = [];
  // Séquentiel volontairement : en parallèle, Netlify coupe les connexions
  // et on lit des faux négatifs (« HTTP 0 ») qui font croire à des 404.
  for (const url of urls) {
    let code = await statutHttp(url);
    if (code === 0) {
      await new Promise((r) => setTimeout(r, 800));
      code = await statutHttp(url);
    }
    if (code !== 200) echecs.push(url + ' → ' + (code === 0 ? 'pas de réponse' : 'HTTP ' + code));
  }
  return { total: urls.length, echecs };
}

// -------------------------------------------------------------------- main

(async function main() {
  const tous = lireCatalogue();
  const produits = produitsPublies(tous);

  const manquantes = verifierImagesLocales(produits);
  if (manquantes.length) {
    console.log('Images absentes du disque (' + manquantes.length + ') :');
    manquantes.forEach((p) => console.log('  id ' + p.id + ' → ' + p.image));
  }
  const distantes = imagesDistantes(produits);
  if (distantes.length) {
    console.log('Images hébergées chez le fournisseur (' + distantes.length + ') :');
    distantes.forEach((p) => console.log('  id ' + p.id + ' → ' + p.image));
  }

  const s = ecrireSitemap(produits);
  const r = ecrireRss(produits);

  console.log('Catalogue lu      : ' + tous.length + ' produits');
  console.log('Doublons exclus   : ' + (tous.length - produits.length));
  console.log('sitemap.xml       : ' + s.total + ' URL');
  console.log('rss.xml           : ' + r.total + ' articles');

  if (process.argv.includes('--verifier')) {
    console.log('\nTest HTTP de chaque URL du sitemap...');
    const v = await verifierEnLigne(produits);
    if (v.echecs.length === 0) {
      console.log('  ' + v.total + '/' + v.total + ' en HTTP 200.');
    } else {
      console.log('  ' + v.echecs.length + ' URL en échec sur ' + v.total + ' :');
      v.echecs.forEach((e) => console.log('    ' + e));
      process.exitCode = 1;
    }
  }
})();
