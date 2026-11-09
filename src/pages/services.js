const { render, helpers, esc, icon, pageHero, breadcrumb, gallery, site, services, altLink } = require('../layout');

/** Page "Nos services" (vue d'ensemble). */
function overview(t) {
  const h = helpers(t);
  const S = t.servicesPage;
  const body = `
${pageHero(h, {
  image: 'banners/bg-design.jpg',
  kicker: S.kicker,
  title: esc(S.heading),
  text: S.intro,
  breadcrumb: breadcrumb(t, h, [[t.nav.services, h.url(t.paths.services)]]),
})}
<section class="section">
  <div class="container">
    <div class="service-list">
      ${services.map((s, i) => {
        const T = t.services[s.id];
        return `
      <article class="service-row${i % 2 ? ' service-row--reverse' : ''}" id="${s.id}">
        <a class="service-row__media" href="${h.servicePath(s)}"><img src="${h.img(s.cover)}" alt="" loading="lazy" width="800" height="600"></a>
        <div class="service-row__body">
          <img class="card__icon" src="${h.img(s.icon)}" alt="" width="48" height="48" loading="lazy">
          <h2>${esc(T.name)}</h2>
          <p>${esc(T.intro)}</p>
          <ul class="ticks ticks--2">${s.items.map((it) => `<li>${icon('check')} ${esc(T.items[it.id].title)}</li>`).join('')}</ul>
          <a class="btn btn--outline" href="${h.servicePath(s)}">${esc(t.common.readMore)} ${icon('arrow')}</a>
        </div>
      </article>`;
      }).join('')}
    </div>
  </div>
</section>`;
  return render(t, {
    key: 'services',
    title: S.title,
    description: S.description,
    canonical: `${site.base}/${t.paths.services}`,
    alternate: altLink(t, 'services'),
  }, body);
}

/** Page d'un service. */
function detail(t, s) {
  const h = helpers(t);
  const T = t.services[s.id];
  const others = services.filter((o) => o.id !== s.id);
  const body = `
${pageHero(h, {
  image: s.banner,
  kicker: t.nav.services,
  title: esc(T.name),
  text: T.short,
  breadcrumb: breadcrumb(t, h, [[t.nav.services, h.url(t.paths.services)], [T.name, h.servicePath(s)]]),
})}
<section class="section">
  <div class="container">
    <div class="service-intro">
      <p class="lead">${esc(T.intro)}</p>
      <div class="brands">
        <h2 class="brands__title">${esc(t.common.brands)}</h2>
        <ul class="brands__list">${T.brands.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      </div>
    </div>
    <nav class="subnav" aria-label="${esc(T.name)}">
      <ul>${s.items.map((it) => `<li><a href="#${it.id}">${esc(T.items[it.id].title)}</a></li>`).join('')}</ul>
    </nav>
  </div>
</section>
${s.items.map((it, i) => `
<section class="section section--item${i % 2 ? ' section--tint' : ''}" id="${it.id}">
  <div class="container">
    <div class="item">
      <div class="item__text">
        <h2>${esc(T.items[it.id].title)}</h2>
        <p>${esc(T.items[it.id].text)}</p>
      </div>
      ${gallery(h, it.images, () => T.items[it.id].title, `gallery--${Math.min(it.images.length, 3)}`)}
    </div>
  </div>
</section>`).join('')}
<section class="section">
  <div class="container">
    <h2 class="section__title section__title--center">${esc(t.nav.services)}</h2>
    <div class="cards cards--3">
      ${others.map((o) => `
      <a class="card card--service" href="${h.servicePath(o)}">
        <div class="card__media"><img src="${h.img(o.cover)}" alt="" loading="lazy" width="600" height="400"></div>
        <div class="card__body"><h3 class="card__title">${esc(t.services[o.id].name)}</h3><p>${esc(t.services[o.id].short)}</p><span class="card__more">${esc(t.common.readMore)} ${icon('arrow')}</span></div>
      </a>`).join('')}
    </div>
  </div>
</section>`;
  return render(t, {
    key: 'service',
    title: T.title,
    description: T.description,
    canonical: h.servicePath(s),
    alternate: altLink(t, 'service', s.slug),
    ogImage: s.cover,
  }, body);
}

module.exports = { overview, detail };
