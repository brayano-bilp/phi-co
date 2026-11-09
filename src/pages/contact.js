const { render, helpers, esc, icon, pageHero, breadcrumb, site, altLink } = require('../layout');

module.exports = function contact(t) {
  const h = helpers(t);
  const C = t.contact;
  const F = C.form;
  const mapQ = encodeURIComponent(site.sites[0].map);
  const action = site.formEndpoint || `mailto:${site.emails[0]}`;
  const body = `
${pageHero(h, {
  image: 'banners/banner-contact.jpg',
  kicker: C.kicker,
  title: esc(C.heading),
  text: C.intro,
  breadcrumb: breadcrumb(t, h, [[t.nav.contact, h.url(t.paths.contact)]]),
})}
<section class="section">
  <div class="container contact">
    <div class="contact__info">
      <ul class="contact__cards">
        <li>${icon('phone', 'contact__ico')}<div><h2>${esc(t.common.callUs)}</h2>${site.phones.map((p) => `<a href="tel:${p.tel}">${esc(p.label)}</a>`).join('')}</div></li>
        <li>${icon('mail', 'contact__ico')}<div><h2>${esc(t.common.writeUs)}</h2>${site.emails.map((e) => `<a href="mailto:${e}">${e}</a>`).join('')}</div></li>
        <li>${icon('clock', 'contact__ico')}<div><h2>${esc(C.hours.title)}</h2><p>${esc(C.hours.text)}</p><a class="link-wa" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp')} ${esc(t.common.whatsapp)}</a></div></li>
      </ul>
      <h2 class="contact__h">${esc(C.sitesTitle)}</h2>
      <ul class="sites">
        ${site.sites.map((s) => `<li>${icon('pin')}<div><strong>${esc(s[t.lang].title)}</strong><span>${esc(s[t.lang].area)} – ${esc(s[t.lang].detail)}</span></div></li>`).join('')}
      </ul>
      <p class="sites__postal">${esc(site.postal)}</p>
      <h2 class="contact__h">${esc(C.europeTitle)}</h2>
      <ul class="sites sites--inline">
        ${site.representations.map((r) => `<li>${icon('globe')}<div><strong>${esc(t.lang === 'fr' ? r.city : r.cityEn)}</strong><span>${esc(r.country[t.lang])}</span></div></li>`).join('')}
      </ul>
    </div>
    <div class="contact__form">
      <h2>${esc(F.title)}</h2>
      <form class="form" id="contact-form" action="${action}" method="POST" data-endpoint="${site.formEndpoint}" data-mail="${site.emails[0]}" novalidate>
        <div class="form__row">
          <label for="f-name">${esc(F.name)}</label>
          <input id="f-name" name="name" type="text" required autocomplete="organization">
        </div>
        <div class="form__grid">
          <div class="form__row">
            <label for="f-email">${esc(F.email)}</label>
            <input id="f-email" name="email" type="email" required autocomplete="email">
          </div>
          <div class="form__row">
            <label for="f-phone">${esc(F.phone)}</label>
            <input id="f-phone" name="phone" type="tel" autocomplete="tel">
          </div>
        </div>
        <div class="form__row">
          <label for="f-subject">${esc(F.subject)}</label>
          <select id="f-subject" name="subject">${F.subjects.map((s) => `<option>${esc(s)}</option>`).join('')}</select>
        </div>
        <div class="form__row">
          <label for="f-message">${esc(F.message)}</label>
          <textarea id="f-message" name="message" rows="6" required></textarea>
        </div>
        <input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <input type="hidden" name="_language" value="${t.lang}">
        <button class="btn btn--primary btn--lg" type="submit" data-label="${esc(F.send)}" data-sending="${esc(F.sending)}">${esc(F.send)} ${icon('arrow')}</button>
        <p class="form__note">${esc(F.consent)}</p>
        <p class="form__status" role="status" aria-live="polite" data-success="${esc(F.success)}" data-error="${esc(F.error)}"></p>
      </form>
    </div>
  </div>
</section>
<section class="map" aria-label="${esc(C.mapTitle)}">
  <h2 class="visually-hidden">${esc(C.mapTitle)}</h2>
  <iframe title="${esc(C.mapTitle)}" src="https://www.google.com/maps?q=${mapQ}&z=15&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
</section>`;
  return render(t, {
    key: 'contact',
    title: C.title,
    description: C.description,
    canonical: `${site.base}/${t.paths.contact}`,
    alternate: altLink(t, 'contact'),
    ogImage: 'banners/banner-contact.jpg',
    noCta: true,
  }, body);
};
