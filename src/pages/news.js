const { render, helpers, esc, icon, pageHero, breadcrumb, newsCard, site, altLink } = require('../layout');
const news = require('../data/news');

function index(t) {
  const h = helpers(t);
  const N = t.news;
  const body = `
${pageHero(h, {
  image: 'projects/krystal/0011.jpg',
  kicker: N.kicker,
  title: esc(N.heading),
  text: N.intro,
  breadcrumb: breadcrumb(t, h, [[t.nav.news, h.url(t.paths.news)]]),
})}
<section class="section">
  <div class="container">
    <div class="ngrid">${news.map((n, i) => newsCard(t, h, n, i)).join('')}</div>
  </div>
</section>`;
  return render(t, {
    key: 'news',
    title: N.title,
    description: N.description,
    canonical: `${site.base}/${t.paths.news}`,
    alternate: altLink(t, 'news'),
    ogImage: news[0].image,
  }, body);
}

function article(t, n) {
  const h = helpers(t);
  const N = n[t.lang];
  const others = news.filter((o) => o.id !== n.id).slice(0, 2);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: N.title,
    description: N.excerpt,
    datePublished: n.date,
    image: `${site.domain}${h.img(n.image)}`,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.domain}${h.img('brand/logo.png')}` } },
    mainEntityOfPage: `${site.domain}${h.newsPath(n)}`,
  };
  const body = `
${pageHero(h, {
  image: n.image,
  kicker: n.tag[t.lang],
  title: esc(N.title),
  cls: 'page-hero--tall',
  breadcrumb: breadcrumb(t, h, [[t.nav.news, h.url(t.paths.news)], [N.title, h.newsPath(n)]]),
  extra: `<p class="page-hero__meta" data-reveal="up" data-delay="200">${icon('calendar')} <time datetime="${n.date}">${h.fmtDate(n.date)}</time></p>`,
})}
<article class="section">
  <div class="container article">
    <div class="article__body prose" data-reveal="up">
      <p class="lead">${esc(N.excerpt)}</p>
      ${N.body}
      <p class="article__back"><a href="${h.url(t.paths.news)}">${icon('arrow', 'ico--flip')} ${esc(t.common.seeAllNews)}</a></p>
    </div>
    <aside class="article__aside" data-reveal="left">
      <div class="article__card">
        <h2>${esc(t.cta.title)}</h2>
        <p>${esc(t.cta.text)}</p>
        <a class="btn btn--primary" href="${h.url(t.paths.quote)}">${esc(t.cta.button)} ${icon('arrow')}</a>
      </div>
    </aside>
  </div>
</article>
<section class="section section--tint">
  <div class="container">
    <h2 class="section__title" data-reveal="up">${esc(t.news.otherArticles)}</h2>
    <div class="ngrid ngrid--2">${others.map((o, i) => newsCard(t, h, o, i)).join('')}</div>
  </div>
</section>`;
  return render(t, {
    key: 'article',
    title: `${N.title} | Phi & Co`,
    description: N.excerpt,
    canonical: h.newsPath(n),
    alternate: altLink(t, 'article', n),
    ogImage: n.image,
    ogType: 'article',
    jsonLd,
  }, body);
}

module.exports = { index, article };
