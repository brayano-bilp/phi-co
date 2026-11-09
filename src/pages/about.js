const { render, helpers, esc, icon, pageHero, breadcrumb, logoGrid, site, altLink } = require('../layout');

module.exports = function about(t) {
  const h = helpers(t);
  const A = t.about;
  const valueIcons = ['star', 'ruler', 'shield', 'handshake'];

  const body = `
${pageHero(h, {
  image: 'banners/banner-about.jpg',
  kicker: A.kicker,
  title: esc(A.heading),
  breadcrumb: breadcrumb(t, h, [[t.nav.about, h.url(t.paths.about)]]),
})}

<section class="section">
  <div class="container split">
    <div class="split__text">
      ${A.intro.map((p) => `<p class="lead">${esc(p)}</p>`).join('')}
      <ul class="ticks">
        <li>${icon('check')} ${esc(t.home.figures.items[1].value)} ${esc(t.home.figures.items[1].suffix)} ${esc(t.home.figures.items[1].label)}</li>
        <li>${icon('check')} ${esc(t.home.figures.items[2].value)} ${esc(t.home.figures.items[2].label)}</li>
        <li>${icon('check')} ${esc(t.home.figures.items[3].value)} ${esc(t.home.figures.items[3].label)}</li>
      </ul>
    </div>
    <div class="split__media">
      <img src="${h.img('projects/proj-09.jpg')}" alt="" loading="lazy" width="800" height="600">
      <div class="split__badge"><strong>${esc(t.common.since)} ${site.founded}</strong><span>${esc(t.common.douala)}</span></div>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <h2 class="section__title section__title--center">${esc(A.history.title)}</h2>
    <ol class="timeline">
      ${A.history.items.map((it) => `<li class="timeline__item"><span class="timeline__year">${esc(it.year)}</span><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head">
      <h2 class="section__title">${esc(A.infra.title)}</h2>
      <p class="section__text">${esc(A.infra.text)}</p>
    </div>
    <div class="cards cards--4">
      ${site.sites.map((s) => `<div class="card card--site">${icon('factory', 'card__ico')}<h3 class="card__title">${esc(s[t.lang].title)}</h3><p><strong>${esc(s[t.lang].area)}</strong><br>${esc(s[t.lang].detail)}</p></div>`).join('')}
    </div>
    <div class="europe">
      <div class="europe__item">${icon('globe')}<div><h3>${esc(A.infra.europe)}</h3><p>${site.representations.map((r) => `${esc(t.lang === 'fr' ? r.city : r.cityEn)} (${esc(r.country[t.lang])})`).join(' · ')}</p></div></div>
      <div class="europe__item">${icon('handshake')}<div><h3>${esc(t.home.partners.kicker)}</h3><p>${esc(A.infra.partnersLine)}</p></div></div>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container split split--reverse">
    <div class="split__text">
      <h2 class="section__title">${esc(A.method.title)}</h2>
      <p>${esc(A.method.intro)}</p>
      <ol class="numbered">${A.method.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
      <p>${esc(A.method.outro)}</p>
    </div>
    <div class="split__media split__media--plain">
      <img src="${h.img('services/fac-murrideau-1.jpg')}" alt="" loading="lazy" width="800" height="600">
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section__title section__title--center">${esc(A.values.title)}</h2>
    <ul class="why why--light">
      ${A.values.items.map((v, i) => `<li>${icon(valueIcons[i], 'why__ico')}<h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <div class="section__head">
      <p class="kicker">${esc(t.home.partners.kicker)}</p>
      <h2 class="section__title">${esc(t.home.partners.title)}</h2>
    </div>
    ${logoGrid(h, site.partners, 'logos--partners')}
  </div>
</section>
`;

  return render(t, {
    key: 'about',
    title: A.title,
    description: A.description,
    canonical: `${site.base}/${t.paths.about}`,
    alternate: altLink(t, 'about'),
    ogImage: 'banners/banner-about.jpg',
  }, body);
};
