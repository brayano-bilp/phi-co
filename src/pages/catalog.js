const { render, helpers, esc, icon, pageHero, breadcrumb, gallery, itemCard, site, catalog, altLink } = require('../layout');

/** Page d'une catégorie (Produits / Services / Accessoires & travaux divers). */
function category(t, c) {
  const h = helpers(t);
  const C = t.catalog;
  const K = C.categories[c.id];
  const others = catalog.filter((o) => o.id !== c.id);
  const body = `
${pageHero(h, {
  image: c.banner,
  kicker: t.nav.categories,
  title: esc(K.heading),
  text: K.intro,
  breadcrumb: breadcrumb(t, h, [[K.name, h.catPath(c)]]),
  extra: `<nav class="cat-switch" aria-label="${esc(t.nav.categories)}" data-reveal="up" data-delay="240">${catalog.map((o) => `<a href="${h.catPath(o)}"${o.id === c.id ? ' aria-current="page"' : ''}>${esc(C.categories[o.id].name)}</a>`).join('')}</nav>`,
})}
<section class="section">
  <div class="container">
    <div class="pgrid pgrid--3">
      ${c.items.map((it, i) => itemCard(t, h, c, it, i)).join('')}
    </div>
  </div>
</section>
<section class="section section--tint">
  <div class="container">
    <h2 class="section__title section__title--center" data-reveal="up">${esc(C.labels.allCategories)}</h2>
    <div class="cats cats--2">
      ${others.map((o, i) => `
      <a class="cat" href="${h.catPath(o)}" data-reveal="up" data-delay="${i * 110}" data-tilt>
        <img class="cat__bg" src="${h.img(o.banner)}" alt="" loading="lazy" width="800" height="600">
        <div class="cat__body">
          <img class="cat__icon" src="${h.img(o.icon)}" alt="" width="40" height="40" loading="lazy">
          <h3 class="cat__title">${esc(C.categories[o.id].name)}</h3>
          <p>${esc(C.categories[o.id].short)}</p>
          <span class="cat__more">${esc(C.labels.discover)} ${icon('arrow')}</span>
        </div>
      </a>`).join('')}
    </div>
  </div>
</section>`;
  return render(t, {
    key: c.id,
    title: K.title,
    description: K.description,
    canonical: h.catPath(c),
    alternate: altLink(t, c.id),
    ogImage: c.banner,
  }, body);
}

/** Page d'un produit / service / accessoire. */
function item(t, c, it) {
  const h = helpers(t);
  const C = t.catalog;
  const K = C.categories[c.id];
  const T = C.items[it.id];
  const idx = c.items.indexOf(it);
  const prev = c.items[(idx - 1 + c.items.length) % c.items.length];
  const next = c.items[(idx + 1) % c.items.length];
  const others = c.items.filter((o) => o.id !== it.id).slice(0, 3);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': c.id === 'products' ? 'Product' : 'Service',
    name: T.name,
    description: T.description,
    image: `${site.domain}${h.img(it.images[0])}`,
    brand: { '@type': 'Organization', name: site.name },
    provider: { '@type': 'Organization', name: site.name, url: site.domain },
    areaServed: 'CM',
  };
  const body = `
${pageHero(h, {
  image: it.images[0],
  kicker: K.name,
  title: esc(T.name),
  text: T.tagline,
  cls: 'page-hero--item',
  breadcrumb: breadcrumb(t, h, [[K.name, h.catPath(c)], [T.name, h.itemPath(c, it)]]),
})}

<section class="section section--item-top">
  <div class="container">
    <div class="item-hero">
      <div class="item-hero__gallery">
        <a class="item-hero__main" href="${h.img(it.images[0])}" data-lightbox data-caption="${esc(T.name)}" data-reveal="zoom"><img src="${h.img(it.images[0])}" alt="${esc(T.name)}" width="1000" height="750"></a>
        <div class="item-hero__thumbs">${it.images.slice(1).map((im, i) => `<a href="${h.img(im)}" data-lightbox data-caption="${esc(T.name)} – ${i + 2}" data-reveal="zoom" data-delay="${(i + 1) * 80}"><img src="${h.img(im)}" alt="${esc(T.name)} – ${i + 2}" loading="lazy" width="400" height="300"></a>`).join('')}</div>
      </div>
      <div class="item-hero__text" data-reveal="left">
        <p class="lead">${esc(T.intro)}</p>
        ${T.uses ? `<p class="item-uses"><strong>${esc(C.labels.uses)} :</strong> ${esc(T.uses)}</p>` : ''}
        ${it.brands.length ? `<div class="brands brands--inline"><span class="brands__title">${esc(t.common.brands)}</span><ul class="brands__list">${it.brands.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>` : ''}
        <a class="btn btn--primary" href="${h.url(t.paths.quote)}">${esc(t.nav.quote)} ${icon('arrow')}</a>
      </div>
    </div>
  </div>
</section>

${T.types ? `
<section class="section section--tint">
  <div class="container">
    <h2 class="section__title section__title--center" data-reveal="up">${esc(C.labels.types)}</h2>
    <ul class="types">
      ${T.types.map((ty, i) => `<li class="types__item" data-reveal="up" data-delay="${i * 80}"><span class="types__num">${String(i + 1).padStart(2, '0')}</span><h3>${esc(ty.name)}</h3><p>${esc(ty.text)}</p></li>`).join('')}
    </ul>
  </div>
</section>` : ''}

<section class="section">
  <div class="container adv">
    <div class="adv__head" data-reveal="right">
      <p class="kicker">${esc(C.labels.advantages)}</p>
      <h2 class="section__title">${esc(T.name)}</h2>
      <img src="${h.img(it.images[1] || it.images[0])}" alt="" loading="lazy" width="600" height="450" class="adv__img">
    </div>
    <ul class="adv__list">
      ${T.advantages.map((a, i) => `<li data-reveal="left" data-delay="${i * 90}">${icon('check', 'adv__ico')}<div><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></div></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section section--dark why-band">
  <div class="container why-band__inner" data-reveal="up">
    ${icon('quote', 'why-band__ico')}
    <h2 class="section__title">${esc(C.labels.why)}</h2>
    <p class="lead">${esc(T.why)}</p>
    <div class="why-band__actions">
      <a class="btn btn--light" href="${h.url(t.paths.quote)}">${esc(t.nav.quote)} ${icon('arrow')}</a>
      <a class="btn btn--ghost" href="${h.url(t.paths.projects)}">${esc(t.nav.projects)}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head section__head--row" data-reveal="up">
      <h2 class="section__title">${esc(C.labels.otherItems)}</h2>
      <a class="btn btn--outline" href="${h.catPath(c)}">${esc(K.name)} ${icon('arrow')}</a>
    </div>
    <div class="pgrid pgrid--3">${others.map((o, i) => itemCard(t, h, c, o, i)).join('')}</div>
    <nav class="pager" aria-label="${esc(K.name)}">
      <a href="${h.itemPath(c, prev)}" rel="prev"><span>${icon('arrow', 'ico--flip')} ${esc(t.common.previous)}</span><strong>${esc(C.items[prev.id].name)}</strong></a>
      <a href="${h.itemPath(c, next)}" rel="next" class="pager__next"><span>${esc(t.common.next)} ${icon('arrow')}</span><strong>${esc(C.items[next.id].name)}</strong></a>
    </nav>
  </div>
</section>`;
  return render(t, {
    key: 'item',
    title: T.title,
    description: T.description,
    canonical: h.itemPath(c, it),
    alternate: altLink(t, 'item', { cat: c, item: it }),
    ogImage: it.images[0],
    jsonLd,
  }, body);
}

module.exports = { category, item };
