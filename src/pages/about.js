const { render, helpers, esc, icon, pageHero, breadcrumb, logoGrid, gallery, goldenGallery, goldenSvg, site, altLink } = require('../layout');
const projects = require('../data/projects');

module.exports = function about(t) {
  const h = helpers(t);
  const A = t.about;
  const valueIcons = ['star', 'ruler', 'shield', 'handshake'];
  const infraIcons = ['factory', 'build', 'handshake', 'globe'];
  const F = t.home.figures.items;

  const body = `
${pageHero(h, {
  image: 'factory/capture.jpg',
  kicker: A.kicker,
  title: esc(A.heading),
  breadcrumb: breadcrumb(t, h, [[t.nav.about, h.url(t.paths.about)]]),
})}

<section class="section">
  <div class="container split">
    <div class="split__text" data-reveal="right">
      ${A.intro.map((p) => `<p class="lead">${esc(p)}</p>`).join('')}
      <ul class="ticks">
        <li>${icon('check')} ${F[1].value} ${esc(F[1].suffix)} ${esc(F[1].label)}</li>
        <li>${icon('check')} ${F[2].value} ${esc(F[2].label)}</li>
        <li>${icon('check')} ${F[3].value} ${esc(F[3].label)}</li>
      </ul>
    </div>
    <div class="split__media" data-reveal="left">
      <img src="${h.img('projects/krystal/0054.jpg')}" alt="" loading="lazy" width="800" height="600">
      <div class="split__badge"><strong>${esc(t.common.since)} ${site.founded}</strong><span>${esc(t.common.douala)}</span></div>
    </div>
  </div>
</section>

<section class="section phi" id="pourquoi-phi">
  <div class="container phi__grid">
    <div class="phi__text" data-reveal="right">
      <p class="kicker">${esc(A.phi.kicker)}</p>
      <h2 class="section__title">${esc(A.phi.title)}</h2>
      ${A.phi.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
      <ul class="phi__facts">${A.phi.facts.map((f) => `<li>${f}</li>`).join('')}</ul>
    </div>
    <figure class="phi__figure" data-reveal="zoom">
      ${goldenSvg()}
      <figcaption><span class="phi__symbol">φ</span> = (1 + √5) / 2 ≈ ${t.lang === 'fr' ? '1,618' : '1.618'}…</figcaption>
    </figure>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <h2 class="section__title section__title--center" data-reveal="up">${esc(A.history.title)}</h2>
    <ol class="timeline">
      ${A.history.items.map((it, i) => `<li class="timeline__item" data-reveal="up" data-delay="${i * 120}"><span class="timeline__year">${esc(it.year)}</span><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head" data-reveal="up">
      <h2 class="section__title">${esc(A.infra.title)}</h2>
      <p class="section__text">${esc(A.infra.text)}</p>
    </div>
    <div class="cards cards--4">
      ${A.infra.items.map((s, i) => `<div class="card card--site" data-reveal="up" data-delay="${i * 90}">${icon(infraIcons[i], 'card__ico')}<h3 class="card__title">${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section section--dark" id="factory">
  <div class="container">
    <div class="section__head" data-reveal="up">
      <p class="kicker kicker--light">${esc(A.factory.kicker)}</p>
      <h2 class="section__title">${esc(A.factory.title)}</h2>
      <p class="section__text">${esc(A.factory.text)}</p>
    </div>
    ${goldenGallery(h, ['factory/capture.jpg', 'factory/1800.jpg', 'factory/1846.jpg', 'factory/1712.jpg', 'factory/1765.jpg', 'factory/1809.jpg', 'factory/1701.jpg', 'factory/1877.jpg', 'factory/1823.jpg', 'factory/1733.jpg', 'factory/capture-2.jpg'], () => A.factory.kicker, 'gallery--3')}
  </div>
</section>

<section class="section">
  <div class="container split split--reverse">
    <div class="split__text" data-reveal="left">
      <h2 class="section__title">${esc(A.method.title)}</h2>
      <p>${esc(A.method.intro)}</p>
      <ol class="numbered numbered--light">${A.method.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
      <p>${esc(A.method.outro)}</p>
    </div>
    <div class="split__media split__media--plain" data-reveal="right">
      <img src="${h.img('factory/18.jpg')}" alt="" loading="lazy" width="800" height="600">
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <h2 class="section__title section__title--center" data-reveal="up">${esc(A.values.title)}</h2>
    <ul class="why why--light">
      ${A.values.items.map((v, i) => `<li data-reveal="up" data-delay="${i * 90}">${icon(valueIcons[i], 'why__ico')}<h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head" data-reveal="up">
      <p class="kicker">${esc(t.home.partners.kicker)}</p>
      <h2 class="section__title">${esc(t.home.partners.title)}</h2>
    </div>
    ${logoGrid(h, site.partners, 'logos--partners')}
  </div>
</section>`;

  return render(t, {
    key: 'about',
    title: A.title,
    description: A.description,
    canonical: `${site.base}/${t.paths.about}`,
    alternate: altLink(t, 'about'),
    ogImage: 'factory/capture.jpg',
  }, body);
};
