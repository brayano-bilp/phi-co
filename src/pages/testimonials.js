const { render, helpers, esc, icon, pageHero, breadcrumb, logoGrid, site, altLink } = require('../layout');
const testimonials = require('../data/testimonials');

module.exports = function testimonialsPage(t) {
  const h = helpers(t);
  const T = t.testimonials;
  const body = `
${pageHero(h, {
  image: 'projects/krystal/0054.jpg',
  kicker: T.kicker,
  title: esc(T.heading),
  text: T.intro,
  breadcrumb: breadcrumb(t, h, [[t.nav.testimonials, h.url(t.paths.testimonials)]]),
})}
<section class="section">
  <div class="container">
    ${testimonials.length
      ? `<div class="quotes quotes--page">${testimonials.map((q, i) => `
      <blockquote class="quote" data-reveal="up" data-delay="${(i % 3) * 90}">
        ${icon('quote', 'quote__ico')}
        ${q.rating ? `<span class="quote__stars" aria-label="${q.rating}/5">${'★'.repeat(q.rating)}${'☆'.repeat(5 - q.rating)}</span>` : ''}
        <p>${esc(q[t.lang])}</p>
        <footer>${q.logo ? `<img src="${h.img(q.logo)}" alt="" loading="lazy" width="80" height="40">` : ''}<div><strong>${esc(q.name)}</strong><span>${esc(q.role[t.lang])} · ${esc(q.company)}</span></div></footer>
      </blockquote>`).join('')}</div>`
      : `<div class="empty" data-reveal="up">
        ${icon('quote', 'empty__ico')}
        <h2>${esc(T.emptyTitle)}</h2>
        <p>${esc(T.emptyText)}</p>
        <a class="btn btn--primary" href="mailto:${site.emails[0]}?subject=${encodeURIComponent(T.emptyButton)}">${esc(T.emptyButton)} ${icon('arrow')}</a>
      </div>`}
  </div>
</section>
<section class="section section--tint">
  <div class="container">
    <h2 class="section__title section__title--center" data-reveal="up">${esc(T.clientsTitle)}</h2>
    ${logoGrid(h, site.clients, 'logos--clients')}
  </div>
</section>`;
  return render(t, {
    key: 'testimonials',
    title: T.title,
    description: T.description,
    canonical: `${site.base}/${t.paths.testimonials}`,
    alternate: altLink(t, 'testimonials'),
  }, body);
};
