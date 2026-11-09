const { render, helpers, esc, icon, pageHero, breadcrumb, site, altLink } = require('../layout');

function legal(t) {
  const h = helpers(t);
  const L = t.legal;
  const body = `
${pageHero(h, {
  image: 'banners/bg-blueprint.jpg',
  title: esc(L.heading),
  breadcrumb: breadcrumb(t, h, [[L.heading, h.url(t.paths.legal)]]),
})}
<section class="section">
  <div class="container prose">
    ${L.sections.map((s) => `<h2>${esc(s.title)}</h2>${s.html}`).join('')}
  </div>
</section>`;
  return render(t, {
    key: 'legal',
    title: L.title,
    description: L.description,
    canonical: `${site.base}/${t.paths.legal}`,
    alternate: altLink(t, 'legal'),
    noCta: true,
  }, body);
}

function notFound(t) {
  const h = helpers(t);
  const N = t.notFound;
  const body = `
<section class="section section--tall">
  <div class="container center">
    <p class="nf">404</p>
    <h1 class="section__title">${esc(N.heading)}</h1>
    <p class="section__text">${esc(N.text)}</p>
    <a class="btn btn--primary" href="${h.url(t.paths.home)}">${esc(t.common.backHome)} ${icon('arrow')}</a>
  </div>
</section>`;
  return render(t, {
    key: 'notfound',
    title: N.title,
    description: N.text,
    canonical: `${site.base}/${t.paths.notFound}`,
    alternate: altLink(t, 'notFound'),
    noCta: true,
  }, body);
}

module.exports = { legal, notFound };
