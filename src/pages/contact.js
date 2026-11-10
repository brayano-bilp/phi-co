const { render, helpers, esc, icon, pageHero, breadcrumb, site, altLink } = require('../layout');

/** Champs communs aux deux formulaires. */
function formShell(t, id, inner, F, kind) {
  const action = site.formEndpoint || `mailto:${site.emails[0]}`;
  return `<form class="form" id="${id}" action="${action}" method="POST" data-endpoint="${site.formEndpoint}" data-mail="${site.emails[0]}" data-kind="${kind}" novalidate>
    ${inner}
    <input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <input type="hidden" name="_language" value="${t.lang}">
    <input type="hidden" name="_form" value="${kind}">
    <button class="btn btn--primary btn--lg btn--shine" type="submit" data-label="${esc(F.send)}" data-sending="${esc(F.sending)}">${esc(F.send)} ${icon('arrow')}</button>
    <p class="form__note">${esc(F.consent)}</p>
    <p class="form__status" role="status" aria-live="polite" data-success="${esc(F.success)}" data-error="${esc(F.error)}"></p>
  </form>`;
}

function contact(t) {
  const h = helpers(t);
  const C = t.contact;
  const F = C.form;
  const mapSite = site.sites.find((s) => s.key === site.mapSite) || site.sites[0];
  const mapQ = encodeURIComponent(mapSite.map);
  const inner = `
    <div class="form__row"><label for="f-name">${esc(F.name)}</label><input id="f-name" name="name" type="text" required autocomplete="organization"></div>
    <div class="form__grid">
      <div class="form__row"><label for="f-email">${esc(F.email)}</label><input id="f-email" name="email" type="email" required autocomplete="email"></div>
      <div class="form__row"><label for="f-phone">${esc(F.phone)}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
    </div>
    <div class="form__row"><label for="f-subject">${esc(F.subject)}</label><select id="f-subject" name="subject">${F.subjects.map((s) => `<option>${esc(s)}</option>`).join('')}</select></div>
    <div class="form__row"><label for="f-message">${esc(F.message)}</label><textarea id="f-message" name="message" rows="6" required></textarea></div>`;
  const body = `
${pageHero(h, {
  image: 'banners/banner-contact.jpg',
  kicker: C.kicker,
  title: esc(C.heading),
  text: C.intro,
  breadcrumb: breadcrumb(t, h, [[t.nav.contact, h.url(t.paths.contact)]]),
  extra: `<p data-reveal="up" data-delay="240"><a class="btn btn--light" href="${h.url(t.paths.quote)}">${esc(C.quoteLink)} ${icon('arrow')}</a></p>`,
})}
<section class="section">
  <div class="container contact">
    <div class="contact__info">
      <ul class="contact__cards">
        <li data-reveal="right">${icon('phone', 'contact__ico')}<div><h2>${esc(t.common.callUs)}</h2>${site.phones.map((p) => `<a href="tel:${p.tel}">${esc(p.label)}</a>`).join('')}</div></li>
        <li data-reveal="right" data-delay="80">${icon('mail', 'contact__ico')}<div><h2>${esc(t.common.writeUs)}</h2>${site.emails.map((e) => `<a href="mailto:${e}">${e}</a>`).join('')}</div></li>
        <li data-reveal="right" data-delay="160">${icon('clock', 'contact__ico')}<div><h2>${esc(C.hours.title)}</h2><p>${esc(C.hours.text)}</p><a class="link-wa" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp')} ${esc(t.common.whatsapp)}</a></div></li>
      </ul>
      <h2 class="contact__h" data-reveal="up">${esc(C.sitesTitle)}</h2>
      <ul class="sites">
        ${site.sites.map((s, i) => `<li data-reveal="up" data-delay="${i * 70}">${icon('pin')}<div><strong>${esc(s[t.lang].title)}</strong><span>${esc(s[t.lang].area)} – ${esc(s[t.lang].detail)}</span></div></li>`).join('')}
      </ul>
      <p class="sites__postal">${esc(site.postal)}</p>
      <h2 class="contact__h" data-reveal="up">${esc(C.europeTitle)}</h2>
      <ul class="sites sites--inline" data-reveal="up">
        ${site.representations.map((r) => `<li>${icon('globe')}<div><strong>${esc(t.lang === 'fr' ? r.city : r.cityEn)}</strong><span>${esc(r.country[t.lang])}</span></div></li>`).join('')}
      </ul>
    </div>
    <div class="contact__form" data-reveal="left">
      <h2>${esc(F.title)}</h2>
      ${formShell(t, 'contact-form', inner, F, 'contact')}
    </div>
  </div>
</section>
<section class="map" aria-label="${esc(C.mapTitle)}">
  <div class="map__caption">${icon('pin')} ${esc(C.mapCaption)}</div>
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
}

function quote(t) {
  const h = helpers(t);
  const Q = t.quote;
  const F = Q.form;
  const inner = `
    <div class="form__grid">
      <div class="form__row"><label for="q-name">${esc(F.name)}</label><input id="q-name" name="name" type="text" required autocomplete="name"></div>
      <div class="form__row"><label for="q-company">${esc(F.company)}</label><input id="q-company" name="company" type="text" autocomplete="organization"></div>
    </div>
    <div class="form__grid">
      <div class="form__row"><label for="q-email">${esc(F.email)}</label><input id="q-email" name="email" type="email" required autocomplete="email"></div>
      <div class="form__row"><label for="q-phone">${esc(F.phone)}</label><input id="q-phone" name="phone" type="tel" required autocomplete="tel"></div>
    </div>
    <div class="form__grid">
      <div class="form__row"><label for="q-type">${esc(F.type)}</label><select id="q-type" name="project_type">${F.types.map((s) => `<option>${esc(s)}</option>`).join('')}</select></div>
      <div class="form__row"><label for="q-client">${esc(F.client)}</label><select id="q-client" name="client_type">${F.clients.map((s) => `<option>${esc(s)}</option>`).join('')}</select></div>
    </div>
    <div class="form__grid form__grid--3">
      <div class="form__row"><label for="q-city">${esc(F.city)}</label><input id="q-city" name="city" type="text" value="Douala"></div>
      <div class="form__row"><label for="q-area">${esc(F.area)}</label><input id="q-area" name="area" type="number" min="0" inputmode="numeric"></div>
      <div class="form__row"><label for="q-deadline">${esc(F.deadline)}</label><select id="q-deadline" name="deadline">${F.deadlines.map((s) => `<option>${esc(s)}</option>`).join('')}</select></div>
    </div>
    <div class="form__row"><label for="q-message">${esc(F.message)}</label><textarea id="q-message" name="message" rows="6" required></textarea></div>`;
  const body = `
${pageHero(h, {
  image: 'projects/jack/5900.jpg',
  kicker: Q.kicker,
  title: esc(Q.heading),
  text: Q.intro,
  breadcrumb: breadcrumb(t, h, [[t.nav.quote, h.url(t.paths.quote)]]),
})}
<section class="section">
  <div class="container quote-page">
    <aside class="quote-page__aside">
      <ol class="qsteps">
        ${Q.steps.map((s, i) => `<li data-reveal="right" data-delay="${i * 100}"><span class="qsteps__num">${i + 1}</span><div><h2>${esc(s.title)}</h2><p>${esc(s.text)}</p></div></li>`).join('')}
      </ol>
      <div class="quote-page__contact" data-reveal="right" data-delay="300">
        <p><strong>${esc(t.common.callUs)}</strong></p>
        ${site.phones.slice(0, 2).map((p) => `<a href="tel:${p.tel}">${icon('phone')} ${esc(p.label)}</a>`).join('')}
        <a class="link-wa" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp')} ${esc(t.common.whatsapp)}</a>
      </div>
    </aside>
    <div class="contact__form contact__form--wide" data-reveal="left">
      <h2>${esc(F.title)}</h2>
      ${formShell(t, 'quote-form', inner, F, 'quote')}
    </div>
  </div>
</section>`;
  return render(t, {
    key: 'quote',
    title: Q.title,
    description: Q.description,
    canonical: `${site.base}/${t.paths.quote}`,
    alternate: altLink(t, 'quote'),
    ogImage: 'projects/jack/5900.jpg',
    noCta: true,
  }, body);
}

module.exports = { contact, quote };
