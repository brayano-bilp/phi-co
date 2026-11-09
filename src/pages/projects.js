const { render, helpers, esc, icon, pageHero, breadcrumb, logoGrid, site, altLink } = require('../layout');
const projects = require('../data/projects');

module.exports = function projectsPage(t) {
  const h = helpers(t);
  const P = t.projects;
  const cats = ['all', 'facades', 'aluminium', 'interior', 'site'];
  const body = `
${pageHero(h, {
  image: 'banners/banner-projects.jpg',
  kicker: P.kicker,
  title: esc(P.heading),
  text: P.intro,
  breadcrumb: breadcrumb(t, h, [[t.nav.projects, h.url(t.paths.projects)]]),
})}
<section class="section">
  <div class="container">
    <div class="filters" role="tablist" aria-label="${esc(P.kicker)}">
      ${cats.map((c, i) => `<button type="button" class="filters__btn${i === 0 ? ' is-active' : ''}" data-filter="${c}" aria-pressed="${i === 0}">${esc(P.filters[c])}</button>`).join('')}
    </div>
    <div class="grid-projects" id="projects-grid">
      ${projects.map((p) => `
      <a class="project" href="${h.img(p.img)}" data-cat="${p.cat}" data-lightbox data-caption="${esc(P.items[p.id])}">
        <img src="${h.img(p.img)}" alt="${esc(P.items[p.id])}" loading="lazy" width="800" height="600">
        <span class="project__cap"><span class="project__tag">${esc(P.filters[p.cat])}</span>${esc(P.items[p.id])}</span>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container highlight">
    <div class="highlight__text">
      <p class="kicker kicker--light">${esc(P.highlight.kicker)}</p>
      <h2 class="section__title">${esc(P.highlight.title)}</h2>
      <p>${esc(P.highlight.text)}</p>
      <ul class="brands__list brands__list--dark"><li>Schüco FWS 50</li><li>Saint-Gobain</li><li>Douala · 2024</li></ul>
    </div>
    <div class="highlight__logo"><img src="${h.img('clients/bgfi.jpg')}" alt="BGFIBank" loading="lazy" width="240" height="120"></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section__title section__title--center">${esc(P.clients)}</h2>
    ${logoGrid(h, site.clients, 'logos--clients')}
    <p class="center"><a class="btn btn--primary" href="${h.url(t.paths.contact)}">${esc(t.cta.button)} ${icon('arrow')}</a></p>
  </div>
</section>`;
  return render(t, {
    key: 'projects',
    title: P.title,
    description: P.description,
    canonical: `${site.base}/${t.paths.projects}`,
    alternate: altLink(t, 'projects'),
    ogImage: 'projects/proj-05.jpg',
  }, body);
};
