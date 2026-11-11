const { render, helpers, esc, icon, pageHero, breadcrumb, logoGrid, gallery, goldenGallery, projectCard, site, altLink } = require('../layout');
const projects = require('../data/projects');

function index(t) {
  const h = helpers(t);
  const P = t.projects;
  const cats = ['all', ...['facades', 'aluminium', 'interior', 'site'].filter((c) => projects.gallery.some((g) => g.cat === c))];
  const body = `
${pageHero(h, {
  image: 'projects/tradex/0053.jpg',
  kicker: P.kicker,
  title: esc(P.heading),
  text: P.intro,
  breadcrumb: breadcrumb(t, h, [[t.nav.projects, h.url(t.paths.projects)]]),
})}
<section class="section">
  <div class="container">
    <h2 class="section__title" data-reveal="up">${esc(P.featuredTitle)}</h2>
    <div class="prj-grid prj-grid--3">
      ${projects.featured.map((p, i) => projectCard(t, h, p, i)).join('')}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container highlight">
    <div class="highlight__text" data-reveal="right">
      <p class="kicker kicker--light">${esc(P.highlight.kicker)}</p>
      <h2 class="section__title">${esc(P.highlight.title)}</h2>
      <p>${esc(P.highlight.text)}</p>
      <ul class="brands__list brands__list--dark"><li>Schüco FWS 50</li><li>Saint-Gobain</li><li>Douala · 2024</li></ul>
    </div>
    <div class="highlight__logo" data-reveal="left"><img src="${h.img('clients/bgfi.jpg')}" alt="BGFIBank" loading="lazy" width="240" height="120"></div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <h2 class="section__title" data-reveal="up">${esc(P.galleryTitle)}</h2>
    <div class="filters" data-reveal="up">
      ${cats.map((c, i) => `<button type="button" class="filters__btn${i === 0 ? ' is-active' : ''}" data-filter="${c}" aria-pressed="${i === 0}">${esc(P.filters[c])}</button>`).join('')}
    </div>
    <div class="grid-projects" id="projects-grid">
      ${projects.gallery.map((p, i) => `
      <a class="project" href="${h.img(p.img)}" data-cat="${p.cat}" data-lightbox data-caption="${esc(P.items[p.id])}" data-reveal="zoom" data-delay="${(i % 3) * 80}">
        <img src="${h.img(p.img)}" alt="${esc(P.items[p.id])}" loading="lazy" width="800" height="600">
        <span class="project__cap"><span class="project__tag">${esc(P.filters[p.cat])}</span>${esc(P.items[p.id])}</span>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section__title section__title--center" data-reveal="up">${esc(P.clients)}</h2>
    ${logoGrid(h, site.clients, 'logos--clients')}
  </div>
</section>`;
  return render(t, {
    key: 'projects',
    title: P.title,
    description: P.description,
    canonical: `${site.base}/${t.paths.projects}`,
    alternate: altLink(t, 'projects'),
    ogImage: 'projects/jack/0011.jpg',
  }, body);
}

function detail(t, p) {
  const h = helpers(t);
  const P = t.projects;
  const F = P.featured[p.id];
  const others = projects.featured.filter((o) => o.id !== p.id);
  const body = `
${pageHero(h, {
  image: p.hero,
  kicker: P.kicker,
  title: esc(F.name),
  text: F.subtitle,
  cls: 'page-hero--tall',
  breadcrumb: breadcrumb(t, h, [[t.nav.projects, h.url(t.paths.projects)], [F.name, h.projectPath(p)]]),
})}
<section class="section">
  <div class="container prj-detail">
    <aside class="prj-detail__facts" data-reveal="right">
      <dl>
        <div><dt>${esc(t.common.location)}</dt><dd>${esc(p.location)}</dd></div>
        ${p.year ? `<div><dt>${esc(t.common.year)}</dt><dd>${p.year}</dd></div>` : ''}
        <div><dt>${esc(t.common.category)}</dt><dd>${p.cats.map((c) => esc(P.filters[c])).join(' · ')}</dd></div>
        <div><dt>${esc(t.common.gallery)}</dt><dd>${p.gallery.length} ${esc(t.common.photos)}</dd></div>
      </dl>
      <h2>${esc(t.common.works)}</h2>
      <ul class="ticks">${F.works.map((w) => `<li>${icon('check')} ${esc(w)}</li>`).join('')}</ul>
      <a class="btn btn--primary" href="${h.url(t.paths.quote)}">${esc(t.nav.quote)} ${icon('arrow')}</a>
    </aside>
    <div class="prj-detail__text" data-reveal="left">
      <p class="lead">${esc(F.summary)}</p>
      ${F.description.map((d) => `<p>${esc(d)}</p>`).join('')}
    </div>
  </div>
</section>
<section class="section section--tint">
  <div class="container">
    <h2 class="section__title" data-reveal="up">${esc(t.common.gallery)}</h2>
    ${goldenGallery(h, p.gallery, (im, i) => `${F.name} – ${i + 1}/${p.gallery.length}`, 'gallery--3')}
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section__head section__head--row" data-reveal="up">
      <h2 class="section__title">${esc(P.otherProjects)}</h2>
      <a class="btn btn--outline" href="${h.url(t.paths.projects)}">${esc(t.common.seeAll)} ${icon('arrow')}</a>
    </div>
    <div class="prj-grid prj-grid--2">${others.map((o, i) => projectCard(t, h, o, i)).join('')}</div>
  </div>
</section>`;
  return render(t, {
    key: 'project',
    title: `${F.name} – ${F.subtitle} | Phi & Co`,
    description: F.summary,
    canonical: h.projectPath(p),
    alternate: altLink(t, 'project', p),
    ogImage: p.cover,
    ogType: 'article',
  }, body);
}

module.exports = { index, detail };
