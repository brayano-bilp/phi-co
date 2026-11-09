const { render, helpers, esc, icon, logoGrid, site, services, altLink } = require('../layout');
const projects = require('../data/projects');

module.exports = function home(t) {
  const h = helpers(t);
  const H = t.home;
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const whyIcons = ['factory', 'shield', 'globe', 'star'];
  const stepIcons = ['handshake', 'ruler', 'drawing', 'build'];

  const body = `
<section class="hero">
  <video class="hero__video" autoplay muted loop playsinline preload="metadata" poster="${h.img('projects/proj-05.jpg')}" aria-hidden="true">
    <source src="${site.base}/assets/video/intro.webm" type="video/webm">
  </video>
  <div class="hero__overlay"></div>
  <div class="container hero__inner">
    <p class="kicker kicker--light">${esc(H.hero.kicker)}</p>
    <h1 class="hero__title">${H.hero.title}</h1>
    <p class="hero__text">${esc(H.hero.text)}</p>
    <div class="hero__actions">
      <a class="btn btn--primary btn--lg" href="${h.url(t.paths.projects)}">${esc(H.hero.primary)} ${icon('arrow')}</a>
      <a class="btn btn--ghost btn--lg" href="${h.url(t.paths.services)}">${esc(H.hero.secondary)}</a>
    </div>
    <p class="hero__trust">${icon('check')} ${esc(H.hero.trust)}</p>
  </div>
  <div class="hero__phi" aria-hidden="true">φ</div>
</section>

<section class="figures" aria-label="${esc(H.figures.title)}">
  <div class="container">
    <ul class="figures__list">
      ${H.figures.items.map((f) => `<li class="figures__item"><span class="figures__value">${esc(f.value)}${f.suffix ? `<small>${esc(f.suffix)}</small>` : ''}</span><span class="figures__label">${esc(f.label)}</span></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" id="services">
  <div class="container">
    <div class="section__head">
      <p class="kicker">${esc(H.services.kicker)}</p>
      <h2 class="section__title">${esc(H.services.title)}</h2>
      <p class="section__text">${esc(H.services.text)}</p>
    </div>
    <div class="cards cards--4">
      ${services.map((s) => `
      <a class="card card--service" href="${h.servicePath(s)}">
        <div class="card__media"><img src="${h.img(s.cover)}" alt="" loading="lazy" width="600" height="400"></div>
        <div class="card__body">
          <img class="card__icon" src="${h.img(s.icon)}" alt="" width="48" height="48" loading="lazy">
          <h3 class="card__title">${esc(t.services[s.id].name)}</h3>
          <p>${esc(t.services[s.id].short)}</p>
          <span class="card__more">${esc(t.common.readMore)} ${icon('arrow')}</span>
        </div>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="section section--tint" id="projects">
  <div class="container">
    <div class="section__head section__head--row">
      <div>
        <p class="kicker">${esc(H.projects.kicker)}</p>
        <h2 class="section__title">${esc(H.projects.title)}</h2>
        <p class="section__text">${esc(H.projects.text)}</p>
      </div>
      <a class="btn btn--outline" href="${h.url(t.paths.projects)}">${esc(t.common.seeAll)} ${icon('arrow')}</a>
    </div>
    <div class="mosaic">
      ${featured.map((p, i) => `<a class="mosaic__item${i === 0 ? ' mosaic__item--big' : ''}" href="${h.img(p.img)}" data-lightbox data-caption="${esc(t.projects.items[p.id])}"><img src="${h.img(p.img)}" alt="${esc(t.projects.items[p.id])}" loading="lazy" width="800" height="600"><span class="mosaic__cap">${esc(t.projects.items[p.id])}</span></a>`).join('')}
    </div>
  </div>
</section>

<section class="section" id="method">
  <div class="container">
    <div class="section__head">
      <p class="kicker">${esc(H.method.kicker)}</p>
      <h2 class="section__title">${esc(H.method.title)}</h2>
    </div>
    <ol class="steps">
      ${H.method.steps.map((s, i) => `<li class="steps__item"><span class="steps__num">0${i + 1}</span>${icon(stepIcons[i], 'steps__ico')}<h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section section--dark" id="why">
  <div class="container">
    <h2 class="section__title">${esc(H.why.title)}</h2>
    <ul class="why">
      ${H.why.items.map((w, i) => `<li>${icon(whyIcons[i], 'why__ico')}<h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" id="clients">
  <div class="container">
    <div class="section__head">
      <p class="kicker">${esc(H.clients.kicker)}</p>
      <h2 class="section__title">${esc(H.clients.title)}</h2>
    </div>
    ${logoGrid(h, site.clients, 'logos--clients')}
  </div>
</section>

<section class="section section--tint" id="partners">
  <div class="container">
    <div class="section__head">
      <p class="kicker">${esc(H.partners.kicker)}</p>
      <h2 class="section__title">${esc(H.partners.title)}</h2>
      <p class="section__text">${esc(H.partners.text)}</p>
    </div>
  </div>
  <div class="marquee" aria-label="${esc(H.partners.kicker)}">
    <div class="marquee__track">
      ${[...site.partners, ...site.partners].map((p) => `<img src="${h.img(p.img)}" alt="${esc(p.name)}" loading="lazy" width="160" height="80">`).join('')}
    </div>
  </div>
</section>`;

  return render(t, {
    key: 'home',
    title: H.title,
    description: H.description,
    canonical: `${site.base}/${t.paths.home}`,
    alternate: altLink(t, 'home'),
  }, body);
};
