/* PHI & CO — interactions (menu mobile, lightbox, filtres, formulaire, animations) */
(function () {
  'use strict';

  /* ----- En-tête : ombre au défilement + menu mobile ----- */
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const burger = document.querySelector('.burger');
  const mobileNav = document.getElementById('mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mobileNav.hidden = open;
      document.body.classList.toggle('no-scroll', !open);
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
      if (e.matches) { mobileNav.hidden = true; burger.setAttribute('aria-expanded', 'false'); document.body.classList.remove('no-scroll'); }
    });
  }

  /* ----- Lightbox ----- */
  const lb = document.getElementById('lightbox');
  if (lb) {
    const imgEl = lb.querySelector('img');
    const capEl = lb.querySelector('figcaption');
    let items = [];
    let index = 0;
    let lastFocus = null;

    const show = (i) => {
      index = (i + items.length) % items.length;
      const a = items[index];
      imgEl.src = a.getAttribute('href');
      imgEl.alt = a.dataset.caption || '';
      capEl.textContent = a.dataset.caption || '';
      lb.querySelectorAll('.lightbox__nav').forEach((b) => (b.style.display = items.length > 1 ? '' : 'none'));
    };
    const open = (a) => {
      // Le groupe = les images de la même galerie (ou de la page si isolée)
      const group = a.closest('.gallery, .mosaic, .grid-projects') || document;
      items = Array.from(group.querySelectorAll('[data-lightbox]')).filter((el) => !el.classList.contains('is-hidden'));
      lastFocus = document.activeElement;
      show(items.indexOf(a));
      lb.hidden = false;
      document.body.classList.add('no-scroll');
      lb.querySelector('.lightbox__close').focus();
    };
    const close = () => {
      lb.hidden = true;
      imgEl.src = '';
      document.body.classList.remove('no-scroll');
      if (lastFocus) lastFocus.focus();
    };

    document.addEventListener('click', (e) => {
      const a = e.target.closest('[data-lightbox]');
      if (a) { e.preventDefault(); open(a); }
    });
    lb.querySelector('.lightbox__close').addEventListener('click', close);
    lb.querySelector('.lightbox__nav--prev').addEventListener('click', () => show(index - 1));
    lb.querySelector('.lightbox__nav--next').addEventListener('click', () => show(index + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
    // Balayage tactile
    let x0 = null;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ----- Filtres de réalisations ----- */
  const filters = document.querySelectorAll('.filters__btn');
  if (filters.length) {
    const cards = document.querySelectorAll('#projects-grid .project');
    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        filters.forEach((b) => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        const f = btn.dataset.filter;
        cards.forEach((c) => c.classList.toggle('is-hidden', f !== 'all' && c.dataset.cat !== f));
      });
    });
  }

  /* ----- Formulaire de contact ----- */
  const form = document.getElementById('contact-form');
  if (form) {
    const status = form.querySelector('.form__status');
    const button = form.querySelector('button[type="submit"]');
    const endpoint = form.dataset.endpoint;
    const mail = form.dataset.mail;

    const validate = () => {
      let ok = true;
      form.querySelectorAll('[required]').forEach((f) => {
        const valid = f.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value) : f.value.trim() !== '';
        f.classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
      });
      return ok;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      status.className = 'form__status';
      if (!validate()) { form.querySelector('.is-invalid').focus(); return; }
      const data = new FormData(form);
      if (data.get('_gotcha')) return; // anti-spam

      // Sans service de formulaire configuré : on ouvre le client mail pré-rempli.
      if (!endpoint) {
        const subject = encodeURIComponent(`[phi-co.com] ${data.get('subject')} – ${data.get('name')}`);
        const body = encodeURIComponent(`${data.get('message')}\n\n—\n${data.get('name')}\n${data.get('email')}\n${data.get('phone') || ''}`);
        window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
        return;
      }

      button.disabled = true;
      button.firstChild.textContent = button.dataset.sending + ' ';
      try {
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(res.statusText);
        status.textContent = status.dataset.success;
        status.classList.add('is-ok');
        form.reset();
      } catch (err) {
        status.innerHTML = `${status.dataset.error} <a href="mailto:${mail}">${mail}</a>`;
        status.classList.add('is-err');
      } finally {
        button.disabled = false;
        button.firstChild.textContent = button.dataset.label + ' ';
      }
    });
  }

  /* ----- Apparition progressive ----- */
  const toReveal = document.querySelectorAll('.card, .steps__item, .mosaic__item, .project, .why li, .timeline__item, .logos__item, .gallery__item, .service-row, .figures__item, .contact__cards li');
  if ('IntersectionObserver' in window && toReveal.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    toReveal.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 6) * 60}ms`;
      io.observe(el);
    });
  }

  /* ----- Vidéo d'accueil : ne pas la charger sur connexion lente / données économisées ----- */
  const video = document.querySelector('.hero__video');
  if (video) {
    const c = navigator.connection;
    const slow = c && (c.saveData || /2g/.test(c.effectiveType || ''));
    if (slow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.removeAttribute('autoplay');
      video.pause();
      video.querySelectorAll('source').forEach((s) => s.remove());
      video.load();
    }
  }
})();
