#!/usr/bin/env node
/**
 * Générateur du site phi-co.com — aucune dépendance npm.
 *
 *   node build.js          → régénère toutes les pages HTML (FR + EN)
 *   node build.js --serve  → idem, puis sert le site sur http://localhost:8080
 *
 * Les pages sont écrites à la racine du dépôt (index.html, a-propos/index.html,
 * en/index.html…) : il suffit ensuite d'envoyer le dossier complet sur
 * l'hébergement (FTP, cPanel, Netlify, GitHub Pages…).
 */
const fs = require('fs');
const path = require('path');

const site = require('./src/data/site');
const services = require('./src/data/services');
const langs = [require('./src/i18n/fr'), require('./src/i18n/en')];

const home = require('./src/pages/home');
const about = require('./src/pages/about');
const servicesPages = require('./src/pages/services');
const projects = require('./src/pages/projects');
const contact = require('./src/pages/contact');
const misc = require('./src/pages/misc');

const ROOT = __dirname;
const written = [];

function write(rel, html) {
  const file = rel.endsWith('.html') ? rel : path.join(rel, 'index.html');
  const abs = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, html);
  written.push(file.replace(/\\/g, '/'));
}

for (const t of langs) {
  write(t.paths.home, home(t));
  write(t.paths.about, about(t));
  write(t.paths.services, servicesPages.overview(t));
  for (const s of services) write(`${t.paths.services}${s.slug[t.lang]}/`, servicesPages.detail(t, s));
  write(t.paths.projects, projects(t));
  write(t.paths.contact, contact(t));
  write(t.paths.legal, misc.legal(t));
  write(t.paths.notFound, misc.notFound(t));
}

// sitemap.xml + robots.txt
const today = new Date().toISOString().slice(0, 10);
const urls = written
  .filter((f) => !f.includes('404'))
  .map((f) => `${site.domain}${site.base}/${f.replace(/index\.html$/, '')}`);
fs.writeFileSync(
  path.join(ROOT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.domain}${site.base}/sitemap.xml\n`);

console.log(`✔ ${written.length} pages générées + sitemap.xml + robots.txt`);

// --serve : petit serveur statique de prévisualisation
if (process.argv.includes('--serve')) {
  const http = require('http');
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webm': 'video/webm', '.xml': 'application/xml', '.txt': 'text/plain' };
  const port = Number(process.env.PORT) || 8080;
  http
    .createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (site.base && p.startsWith(site.base)) p = p.slice(site.base.length) || '/';
      let file = path.join(ROOT, p);
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!fs.existsSync(file)) { file = path.join(ROOT, '404.html'); res.statusCode = 404; }
      res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
      fs.createReadStream(file).pipe(res);
    })
    .listen(port, () => console.log(`→ http://localhost:${port}${site.base}/`));
}
