// ---------------------------------------------------------------------------
// Gabarit commun : <head>, en-tête, pied de page, blocs réutilisables.
// ---------------------------------------------------------------------------
const site = require('./data/site');
const services = require('./data/services');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Construit un contexte d'aide pour une langue donnée. */
function helpers(t) {
  const B = site.base;
  const url = (p) => `${B}/${p}`;
  const img = (p) => `${B}/assets/img/${p}`;
  const servicePath = (s) => url(`${t.paths.services}${s.slug[t.lang]}/`);
  return { url, img, servicePath, esc, B };
}

const ICONS = {
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.4V18h16V7.4l-8 5.3zM19.3 7H4.7l7.3 4.9z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 1 7 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 0 1 7-7zm0 4.5A2.5 2.5 0 1 0 12 11.5 2.5 2.5 0 0 0 12 6.5z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1 3h2v5.4l3.5 2.1-1 1.7L11 13z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3 4.4c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.5 0 1.7-.7 2-1.4.2-.7.2-1.3.1-1.4l-.5-.3-1.9-.9c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-3.4-3c-.2-.4 0-.5.2-.7l.5-.6.3-.6c.1-.2 0-.4 0-.5L10.9 8c-.2-.4-.4-.4-.6-.4z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11h11.2l-4.6-4.6L13 5l7 7-7 7-1.4-1.4 4.6-4.6H5z"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6 12-12-1.4-1.4z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4A21 21 0 0 0 14.3 4c-2.3 0-3.9 1.4-3.9 4v2.5H8v3h2.4V21z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.3-3.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 3h3l-7.3 8.3L22 21h-6.6l-4.6-6-5.3 6H2.4l7.8-8.9L2 3h6.7l4.2 5.5zm-1.1 16.2h1.7L7.7 4.7H5.9z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.4 5 12.6 12.6-1.4 1.4L5 6.4z"/><path d="M17.6 5 5 17.6 6.4 19 19 6.4z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2c-1 0-2.3 2-2.9 5h5.8C14.3 6 13 4 12 4zm-4.9 5A8 8 0 0 1 9.6 4.6 13 13 0 0 0 7.1 9zm9.8 0h2A8 8 0 0 0 14.4 4.6 13 13 0 0 1 16.9 9zM4.3 11a8 8 0 0 0 0 2h2.5a20 20 0 0 1 0-2zm4.5 0a18 18 0 0 0 0 2h6.4a18 18 0 0 0 0-2zm8.4 0a20 20 0 0 1 0 2h2.5a8 8 0 0 0 0-2zM7.1 15h-2a8 8 0 0 0 4.5 4.4A13 13 0 0 1 7.1 15zm2 0c.6 3 1.9 5 2.9 5s2.3-2 2.9-5zm7.8 0a13 13 0 0 1-2.5 4.4A8 8 0 0 0 18.9 15z"/></svg>',
  ruler: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17 17 3l4 4L7 21zm3.4 0L17 6.4 17.6 7 7 17.6zM9 15l1.4-1.4 1.1 1.1-1.4 1.4zm2.5-2.5 1.4-1.4 2 2-1.4 1.4zm2.5-2.5 1.4-1.4 1.1 1.1-1.4 1.4z"/></svg>',
  factory: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21V9l5 3V9l5 3V9l5 3V4h3v17zm2-2h14v-5.3l-5-3v3l-5-3v3l-4-2.4z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5.3 3.4 10.2 8 11.5 4.6-1.3 8-6.2 8-11.5V5zm0 2.2 6 2.2V11c0 4.2-2.6 8.2-6 9.4-3.4-1.2-6-5.2-6-9.4V6.4zm-1 10.1-2.5-2.5 1.4-1.4 1.1 1.1 3.6-3.6 1.4 1.4z"/></svg>',
  handshake: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m11 6 1.6 1.4L8.4 11a1 1 0 0 0 1.4 1.5l4.4-3.8 5.8 5.2-1.4 1.5-1-.9-1.4 1.5-1.1-1-1.4 1.5-1.1-1-1.4 1.5-5.3-4.8A3 3 0 0 1 7.1 9zM2 7h4l5-3 6 3h5v9h-2.4l-1.3-1.3L19 14V9h-3.5L11 6.7 6.6 9H2z"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3 6.3 6.9.9-5 4.8 1.3 6.9L12 17.6 5.8 20.9 7.1 14l-5-4.8 6.9-.9z"/></svg>',
  drawing: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16v2H4zm0 16h16v2H4zM4 7h2v10H4zm14 0h2v10h-2zM8 8h8v8H8zm2 2v4h4v-4z"/></svg>',
  build: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.7 18.3 16 12.6a5.5 5.5 0 0 1-6.6-6.6l3.1 3.1 2.1-2.1-3.1-3.1a5.5 5.5 0 0 1 6.6 6.6l5.7 5.7a1 1 0 0 1 0 1.4l-.7.7a1 1 0 0 1-1.4 0zM3 18l6.4-6.4 2 2L5 20a1.4 1.4 0 0 1-2-2z"/></svg>',
};
const icon = (name, cls = '') => `<span class="ico ${cls}">${ICONS[name] || ''}</span>`;

/** Lien vers la même page dans l'autre langue. */
function altLink(t, pathKey, slug) {
  const other = t.lang === 'fr' ? require('./i18n/en') : require('./i18n/fr');
  if (pathKey === 'service') return `${site.base}/${other.paths.services}${slug[other.lang]}/`;
  return `${site.base}/${other.paths[pathKey]}`;
}

function head(t, page, h) {
  const canonical = `${site.domain}${page.canonical}`;
  const alt = `${site.domain}${page.alternate}`;
  const ogImg = `${site.domain}${h.img(page.ogImage || 'projects/proj-05.jpg')}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: site.name,
    url: site.domain,
    logo: `${site.domain}${h.img('brand/logo.png')}`,
    image: ogImg,
    foundingDate: String(site.founded),
    telephone: site.phones[0].tel,
    email: site.emails[0],
    address: { '@type': 'PostalAddress', streetAddress: 'Boulevard de la République, Bali', postOfficeBoxNumber: '15792', addressLocality: 'Douala', addressRegion: 'Littoral', addressCountry: 'CM' },
    areaServed: 'CM',
    sameAs: site.social.map((s) => s.url),
  };
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="${t.lang}" href="${canonical}">
<link rel="alternate" hreflang="${t.otherLang.code}" href="${alt}">
<link rel="alternate" hreflang="x-default" href="${site.domain}${site.base}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.shortName)}">
<meta property="og:locale" content="${t.locale}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImg}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b2b4c">
<link rel="icon" href="${h.img('brand/favicon.png')}" type="image/png">
<link rel="apple-touch-icon" href="${h.img('brand/favicon.png')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="${site.base}/assets/css/style.css">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>`;
}

function header(t, page, h) {
  const nav = [
    ['home', t.nav.home],
    ['about', t.nav.about],
    ['services', t.nav.services],
    ['projects', t.nav.projects],
    ['contact', t.nav.contact],
  ];
  const links = nav
    .map(([k, label]) => {
      const active = page.key === k || (k === 'services' && page.key === 'service');
      const sub = k === 'services'
        ? `<ul class="nav__sub">${services.map((s) => `<li><a href="${h.servicePath(s)}">${esc(t.services[s.id].name)}</a></li>`).join('')}</ul>`
        : '';
      return `<li class="nav__item${sub ? ' has-sub' : ''}"><a href="${h.url(t.paths[k])}"${active ? ' aria-current="page"' : ''}>${esc(label)}</a>${sub}</li>`;
    })
    .join('');
  return `
<a class="skip" href="#main">${esc(t.nav.skip)}</a>
<header class="site-header" id="top">
  <div class="container site-header__inner">
    <a class="brand" href="${h.url(t.paths.home)}" aria-label="${esc(site.name)}">
      <img src="${h.img('brand/logo.png')}" width="191" height="45" alt="${esc(site.name)} – ${esc(site.tagline)}">
    </a>
    <nav class="nav" aria-label="${esc(t.nav.menu)}">
      <ul class="nav__list">${links}</ul>
    </nav>
    <div class="site-header__actions">
      <a class="lang" href="${page.alternate}" hreflang="${t.otherLang.code}" lang="${t.otherLang.code}" title="${esc(t.otherLang.name)}">${icon('globe')}<span>${t.otherLang.label}</span></a>
      <a class="btn btn--primary btn--sm" href="${h.url(t.paths.contact)}">${esc(t.nav.quote)}</a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="${esc(t.nav.menu)}">${icon('menu', 'ico--open')}${icon('close', 'ico--close')}</button>
    </div>
  </div>
  <div class="mobile-nav" id="mobile-nav" hidden>
    <ul class="mobile-nav__list">${links}</ul>
    <div class="mobile-nav__footer">
      <a class="btn btn--primary" href="${h.url(t.paths.contact)}">${esc(t.nav.quote)}</a>
      <a class="lang lang--block" href="${page.alternate}" hreflang="${t.otherLang.code}" lang="${t.otherLang.code}">${icon('globe')}<span>${esc(t.otherLang.name)}</span></a>
    </div>
  </div>
</header>`;
}

function ctaBand(t, h) {
  const p = site.phones[0];
  return `
<section class="cta" aria-labelledby="cta-title">
  <div class="container cta__inner">
    <div>
      <h2 id="cta-title" class="cta__title">${esc(t.cta.title)}</h2>
      <p class="cta__text">${esc(t.cta.text)}</p>
    </div>
    <div class="cta__actions">
      <a class="btn btn--light" href="${h.url(t.paths.contact)}">${esc(t.cta.button)} ${icon('arrow')}</a>
      <span class="cta__call">${esc(t.cta.call)} <a href="tel:${p.tel}">${esc(p.label)}</a></span>
    </div>
  </div>
</section>`;
}

function footer(t, h) {
  const year = new Date().getFullYear();
  return `
<footer class="site-footer">
  <div class="container site-footer__grid">
    <div class="site-footer__brand">
      <img src="${h.img('brand/logo.png')}" width="191" height="45" alt="${esc(site.name)}" loading="lazy">
      <p>${esc(t.footer.about)}</p>
      <ul class="social">${site.social.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener" aria-label="${esc(s.name)}">${icon(s.icon)}</a></li>`).join('')}</ul>
    </div>
    <nav aria-label="${esc(t.footer.navTitle)}">
      <h3 class="site-footer__title">${esc(t.footer.navTitle)}</h3>
      <ul class="site-footer__links">
        <li><a href="${h.url(t.paths.home)}">${esc(t.nav.home)}</a></li>
        <li><a href="${h.url(t.paths.about)}">${esc(t.nav.about)}</a></li>
        <li><a href="${h.url(t.paths.projects)}">${esc(t.nav.projects)}</a></li>
        <li><a href="${h.url(t.paths.contact)}">${esc(t.nav.contact)}</a></li>
        <li><a href="${h.url(t.paths.legal)}">${esc(t.common.legal)}</a></li>
      </ul>
    </nav>
    <nav aria-label="${esc(t.footer.servicesTitle)}">
      <h3 class="site-footer__title">${esc(t.footer.servicesTitle)}</h3>
      <ul class="site-footer__links">${services.map((s) => `<li><a href="${h.servicePath(s)}">${esc(t.services[s.id].name)}</a></li>`).join('')}</ul>
    </nav>
    <div>
      <h3 class="site-footer__title">${esc(t.footer.contactTitle)}</h3>
      <ul class="site-footer__contact">
        <li>${icon('pin')}<span>Boulevard de la République, Bali<br>${esc(site.postal)}</span></li>
        <li>${icon('phone')}<span>${site.phones.slice(0, 2).map((p) => `<a href="tel:${p.tel}">${esc(p.label)}</a>`).join('<br>')}</span></li>
        <li>${icon('mail')}<span><a href="mailto:${site.emails[0]}">${site.emails[0]}</a></span></li>
      </ul>
    </div>
  </div>
  <div class="site-footer__bottom">
    <div class="container site-footer__bottom-inner">
      <span>© ${year} ${esc(site.name)} – ${esc(t.common.rights)}</span>
      <span class="site-footer__ratio" title="φ = 1,618…">φ · ${esc(site.tagline)}</span>
    </div>
  </div>
</footer>
<a class="whatsapp" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener" aria-label="${esc(t.common.whatsapp)}">${icon('whatsapp')}</a>
<div class="lightbox" id="lightbox" hidden role="dialog" aria-modal="true" aria-label="${esc(t.common.gallery)}">
  <button class="lightbox__close" type="button" aria-label="${esc(t.common.close)}">${icon('close')}</button>
  <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="${esc(t.common.previous)}">${icon('arrow')}</button>
  <figure class="lightbox__figure"><img src="" alt=""><figcaption></figcaption></figure>
  <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="${esc(t.common.next)}">${icon('arrow')}</button>
</div>
<script src="${site.base}/assets/js/main.js" defer></script>
</body>
</html>`;
}

/** Bannière de page intérieure. */
function pageHero(h, { kicker, title, text, image, breadcrumb }) {
  return `
<section class="page-hero" style="--hero:url('${h.img(image)}')">
  <div class="container page-hero__inner">
    ${breadcrumb || ''}
    ${kicker ? `<p class="kicker kicker--light">${esc(kicker)}</p>` : ''}
    <h1 class="page-hero__title">${title}</h1>
    ${text ? `<p class="page-hero__text">${esc(text)}</p>` : ''}
  </div>
</section>`;
}

function breadcrumb(t, h, items) {
  const all = [[t.nav.home, h.url(t.paths.home)], ...items];
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${all
    .map(([label, href], i) => (i === all.length - 1 ? `<li aria-current="page">${esc(label)}</li>` : `<li><a href="${href}">${esc(label)}</a></li>`))
    .join('')}</ol></nav>`;
}

/** Grille de logos (clients / partenaires). */
function logoGrid(h, list, cls = '') {
  return `<ul class="logos ${cls}">${list
    .map((c) => `<li class="logos__item"><img src="${h.img(c.img)}" alt="${esc(c.name)}" loading="lazy" width="200" height="100"></li>`)
    .join('')}</ul>`;
}

/** Galerie d'images avec lightbox. */
function gallery(h, images, captionFn, cls = '') {
  return `<div class="gallery ${cls}">${images
    .map((im, i) => {
      const cap = captionFn ? captionFn(im, i) : '';
      return `<a class="gallery__item" href="${h.img(im.img || im)}" data-lightbox data-caption="${esc(cap)}"><img src="${h.img(im.img || im)}" alt="${esc(cap)}" loading="lazy" width="600" height="400"><span class="gallery__cap">${esc(cap)}</span></a>`;
    })
    .join('')}</div>`;
}

function render(t, page, body) {
  const h = helpers(t);
  return `${head(t, page, h)}
<body class="page-${page.key}">
${header(t, page, h)}
<main id="main">
${body}
</main>
${page.noCta ? '' : ctaBand(t, h)}
${footer(t, h)}`;
}

module.exports = { render, helpers, esc, icon, pageHero, breadcrumb, logoGrid, gallery, altLink, site, services };
