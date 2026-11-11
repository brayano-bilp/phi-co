const { render, helpers, esc, icon, logoGrid, itemCard, projectCard, newsCard, site, catalog, altLink } = require('../layout');
const projects = require('../data/projects');
const news = require('../data/news');
const testimonials = require('../data/testimonials');

module.exports = function home(t) {
  const h = helpers(t);
  const H = t.home;
  const C = t.catalog;
  const stepIcons = ['handshake', 'ruler', 'drawing', 'build'];
  const whyIcons = ['factory', 'shield', 'globe', 'star'];
  const products = catalog[0];
  const flagship = ['curtainWall', 'doors', 'windows', 'pergolas'].map((id) => products.items.find((i) => i.id === id));
  const words = H.hero.title; // contient <em>…</em>

  const body = `
<section class="hero">
  <video class="hero__video" autoplay muted loop playsinline preload="auto" poster="${h.img('projects/jack/0011.jpg')}" aria-hidden="true">
    <source src="${site.base}/assets/video/hero.mp4" type="video/mp4">
  </video>
  <div class="hero__overlay"></div>
  <div class="hero__grid" aria-hidden="true"></div>
  <div class="container hero__inner">
    <p class="kicker kicker--light hero__kicker">${esc(H.hero.kicker)}</p>
    <h1 class="hero__title">${words}</h1>
    <p class="hero__text">${esc(H.hero.text)}</p>
    <div class="hero__actions">
      <a class="btn btn--primary btn--lg btn--shine" href="${h.url(t.paths.projects)}">${esc(H.hero.primary)} ${icon('arrow')}</a>
      <a class="btn btn--ghost btn--lg" href="${h.url(t.paths.products)}">${esc(H.hero.secondary)}</a>
    </div>
    <p class="hero__trust">${icon('check')} ${esc(H.hero.trust)}</p>
  </div>
  <button class="hero__toggle" type="button" aria-label="${esc(t.common.videoPause)}" data-pause="${esc(t.common.videoPause)}" data-play="${esc(t.common.videoPlay)}">
    <svg class="ico ico--pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>
    <svg class="ico ico--play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
  </button>
  <div class="hero__phi" aria-hidden="true">φ</div>
  <a class="hero__scroll" href="#figures" aria-label="${esc(t.common.scroll)}"><span></span></a>
</section>

<section class="figures" id="figures" aria-label="${esc(H.figures.title)}">
  <div class="container">
    <ul class="figures__list">
      ${H.figures.items.map((f, i) => `<li class="figures__item" data-reveal="up" data-delay="${i * 80}"><span class="figures__value"><span class="count" data-count="${f.value}">0</span>${f.suffix ? `<small>${esc(f.suffix)}</small>` : ''}</span><span class="figures__label">${esc(f.label)}</span></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section film" id="film">
  <div class="container film__grid">
    <div class="film__text" data-reveal="left">
      <p class="kicker">${esc(H.film.kicker)}</p>
      <h2 class="section__title">${esc(H.film.title)}</h2>
      <p class="section__text">${esc(H.film.text)}</p>
    </div>
    <figure class="film__player" data-reveal="right">
      <video controls playsinline preload="none" poster="${h.img('brand/film-poster.jpg')}" aria-label="${esc(H.film.caption)}">
            <source src="${site.base}/assets/video/intro.mp4" type="video/mp4">
      </video>
      <figcaption>${esc(H.film.caption)}</figcaption>
    </figure>
  </div>
</section>

<section class="section" id="categories">
  <div class="container">
    <div class="section__head" data-reveal="up">
      <p class="kicker">${esc(H.categories.kicker)}</p>
      <h2 class="section__title">${esc(H.categories.title)}</h2>
      <p class="section__text">${esc(H.categories.text)}</p>
    </div>
    <div class="cats">
      ${catalog.map((c, i) => `
      <a class="cat" href="${h.catPath(c)}" data-reveal="up" data-delay="${i * 110}" data-tilt>
        <img class="cat__bg" src="${h.img(c.banner)}" alt="" loading="lazy" width="800" height="600">
        <div class="cat__body">
          <img class="cat__icon" src="${h.img(c.icon)}" alt="" width="40" height="40" loading="lazy">
          <h3 class="cat__title">${esc(C.categories[c.id].name)}</h3>
          <p>${esc(C.categories[c.id].short)}</p>
          <ul class="cat__list">${c.items.slice(0, 4).map((it) => `<li>${esc(C.items[it.id].name)}</li>`).join('')}${c.items.length > 4 ? `<li>+${c.items.length - 4}</li>` : ''}</ul>
          <span class="cat__more">${esc(t.catalog.labels.discover)} ${icon('arrow')}</span>
        </div>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="section section--tint" id="flagship">
  <div class="container">
    <div class="section__head section__head--row" data-reveal="up">
      <div>
        <p class="kicker">${esc(H.featuredProducts.kicker)}</p>
        <h2 class="section__title">${esc(H.featuredProducts.title)}</h2>
      </div>
      <a class="btn btn--outline" href="${h.url(t.paths.products)}">${esc(t.common.seeProducts)} ${icon('arrow')}</a>
    </div>
    <div class="pgrid pgrid--4">
      ${flagship.map((it, i) => itemCard(t, h, products, it, i)).join('')}
    </div>
  </div>
</section>

<section class="section" id="projects">
  <div class="container">
    <div class="section__head section__head--row" data-reveal="up">
      <div>
        <p class="kicker">${esc(H.projects.kicker)}</p>
        <h2 class="section__title">${esc(H.projects.title)}</h2>
        <p class="section__text">${esc(H.projects.text)}</p>
      </div>
      <a class="btn btn--outline" href="${h.url(t.paths.projects)}">${esc(t.common.seeAll)} ${icon('arrow')}</a>
    </div>
    <div class="prj-grid">
      ${projects.featured.map((p, i) => projectCard(t, h, p, i, i === 0)).join('')}
    </div>
  </div>
</section>

<section class="factory" id="factory">
  <div class="factory__strip" aria-hidden="true">
    <div class="factory__track">
      ${[...projects.factory, ...projects.factory].map((f) => `<img src="${h.img(f)}" alt="" loading="lazy" width="480" height="320">`).join('')}
    </div>
  </div>
  <div class="container factory__inner">
    <div class="factory__card" data-reveal="up">
      <p class="kicker">${esc(H.factory.kicker)}</p>
      <h2 class="section__title">${esc(H.factory.title)}</h2>
      <p>${esc(H.factory.text)}</p>
      <a class="btn btn--primary" href="${h.url(t.paths.about)}#factory">${esc(H.factory.button)} ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section" id="method">
  <div class="container">
    <div class="section__head" data-reveal="up">
      <p class="kicker">${esc(H.method.kicker)}</p>
      <h2 class="section__title">${esc(H.method.title)}</h2>
    </div>
    <ol class="steps">
      ${H.method.steps.map((s, i) => `<li class="steps__item" data-reveal="up" data-delay="${i * 100}"><span class="steps__num">0${i + 1}</span>${icon(stepIcons[i], 'steps__ico')}<h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section section--dark" id="why">
  <div class="container">
    <h2 class="section__title" data-reveal="up">${esc(H.why.title)}</h2>
    <ul class="why">
      ${H.why.items.map((w, i) => `<li data-reveal="up" data-delay="${i * 90}">${icon(whyIcons[i], 'why__ico')}<h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section section--tint" id="news">
  <div class="container">
    <div class="section__head section__head--row" data-reveal="up">
      <div>
        <p class="kicker">${esc(H.news.kicker)}</p>
        <h2 class="section__title">${esc(H.news.title)}</h2>
      </div>
      <a class="btn btn--outline" href="${h.url(t.paths.news)}">${esc(t.common.seeAllNews)} ${icon('arrow')}</a>
    </div>
    <div class="ngrid">${news.slice(0, 3).map((n, i) => newsCard(t, h, n, i)).join('')}</div>
  </div>
</section>

<section class="section" id="clients">
  <div class="container">
    <div class="section__head" data-reveal="up">
      <p class="kicker">${esc(H.testimonials.kicker)}</p>
      <h2 class="section__title">${esc(H.testimonials.title)}</h2>
      <p class="section__text">${esc(H.testimonials.empty)}</p>
    </div>
    ${testimonials.length ? `<div class="quotes">${testimonials.slice(0, 3).map((q, i) => `<blockquote class="quote" data-reveal="up" data-delay="${i * 90}">${icon('quote', 'quote__ico')}<p>${esc(q[t.lang])}</p><footer><strong>${esc(q.name)}</strong><span>${esc(q.role[t.lang])} · ${esc(q.company)}</span></footer></blockquote>`).join('')}</div>` : ''}
    ${logoGrid(h, site.clients, 'logos--clients')}
  </div>
</section>

<section class="section section--tint" id="partners">
  <div class="container">
    <div class="section__head" data-reveal="up">
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
