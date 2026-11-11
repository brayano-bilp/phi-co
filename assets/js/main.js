/* PHI & CO — interactions & animations
   (menu, en-tête intelligent, barre de progression, apparitions au défilement,
   compteurs, cartes 3D, lightbox, filtres, formulaires, vidéo) */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----- En-tête : ombre, masquage au défilement vers le bas, barre de progression ----- */
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.progress span');
  let lastY = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 10);
      const goingDown = y > lastY && y > 300;
      header.classList.toggle('is-hidden', goingDown && !document.body.classList.contains('menu-open'));
    }
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    }
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  /* ----- Menu mobile ----- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.getElementById('mobile-nav');
  if (burger && mobileNav) {
    const setOpen = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      mobileNav.hidden = !open;
      document.body.classList.toggle('no-scroll', open);
      document.body.classList.toggle('menu-open', open);
      if (open && header) header.classList.remove('is-hidden');
    };
    burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  /* ----- Apparition au défilement ----- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const delay = Number(el.dataset.delay || 0);
        setTimeout(() => el.classList.add('is-visible'), delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
  // Frise chronologique : trait qui se dessine
  const timeline = document.querySelector('.timeline');
  if (timeline && 'IntersectionObserver' in window) {
    new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { timeline.classList.add('is-visible'); o.disconnect(); } }, { threshold: 0.3 }).observe(timeline);
  }

  /* ----- Spirale d'or des galeries : se dessine à l'apparition ----- */
  const spirals = document.querySelectorAll('.mosaic--golden');
  if (spirals.length) {
    if ('IntersectionObserver' in window && !reduce) {
      const so = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-drawn'); so.unobserve(en.target); } }), { threshold: 0.35 });
      spirals.forEach((m) => so.observe(m));
    } else spirals.forEach((m) => m.classList.add('is-drawn'));
  }

  /* ----- Compteurs animés ----- */
  const counters = document.querySelectorAll('.count[data-count]');
  if (counters.length) {
    const fmt = (n) => n.toLocaleString(document.documentElement.lang === 'fr' ? 'fr-FR' : 'en-GB');
    const run = (el) => {
      const target = Number(el.dataset.count);
      if (reduce || !Number.isFinite(target)) { el.textContent = fmt(target); return; }
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => { entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }); }, { threshold: 0.5 });
      counters.forEach((c) => io.observe(c));
    } else counters.forEach(run);
  }

  /* ----- Cartes 3D (inclinaison au survol) ----- */
  if (!reduce && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      let raf = null;
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => { card.style.transform = `perspective(1200px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-6px)`; });
      });
      card.addEventListener('pointerleave', () => { if (raf) cancelAnimationFrame(raf); card.style.transform = ''; });
    });
  }

  /* ----- Lightbox ----- */
  const lb = document.getElementById('lightbox');
  if (lb) {
    const imgEl = lb.querySelector('img');
    const capEl = lb.querySelector('figcaption');
    const countEl = lb.querySelector('.lightbox__count');
    let items = [];
    let index = 0;
    let lastFocus = null;

    const show = (i) => {
      index = (i + items.length) % items.length;
      const a = items[index];
      imgEl.classList.remove('is-switching');
      void imgEl.offsetWidth; // relance l'animation
      imgEl.classList.add('is-switching');
      imgEl.src = a.getAttribute('href');
      imgEl.alt = a.dataset.caption || '';
      capEl.textContent = a.dataset.caption || '';
      countEl.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
      lb.querySelectorAll('.lightbox__nav').forEach((b) => (b.style.display = items.length > 1 ? '' : 'none'));
      // Préchargement des voisines
      [items[(index + 1) % items.length], items[(index - 1 + items.length) % items.length]].forEach((n) => { if (n) new Image().src = n.getAttribute('href'); });
    };
    const open = (a) => {
      const group = a.closest('.gallery, .mosaic, .grid-projects, .item-hero__gallery') || document;
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
    let x0 = null;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ----- Filtres de réalisations (avec transition) ----- */
  const filters = document.querySelectorAll('.filters__btn');
  if (filters.length) {
    const cards = document.querySelectorAll('#projects-grid .project');
    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        filters.forEach((b) => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        const f = btn.dataset.filter;
        cards.forEach((c) => {
          const hide = f !== 'all' && c.dataset.cat !== f;
          if (hide) { c.classList.add('is-leaving'); setTimeout(() => c.classList.add('is-hidden'), reduce ? 0 : 250); }
          else { c.classList.remove('is-hidden'); requestAnimationFrame(() => c.classList.remove('is-leaving')); c.classList.add('is-visible'); }
        });
      });
    });
  }

  /* ----- Formulaires (contact + devis) ----- */
  document.querySelectorAll('form.form').forEach((form) => {
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
    form.querySelectorAll('[required]').forEach((f) => f.addEventListener('input', () => f.classList.remove('is-invalid')));
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      status.className = 'form__status';
      if (!validate()) { form.querySelector('.is-invalid').focus(); return; }
      const data = new FormData(form);
      if (data.get('_gotcha')) return;
      if (!endpoint) {
        const kind = form.dataset.kind === 'quote' ? 'Devis' : 'Contact';
        const lines = [];
        data.forEach((v, k) => { if (!k.startsWith('_') && v) lines.push(`${k}: ${v}`); });
        const subject = encodeURIComponent(`[phi-co.com] ${kind} – ${data.get('subject') || data.get('project_type') || ''} – ${data.get('name')}`);
        window.location.href = `mailto:${mail}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`;
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
  });

  /* ----- Vidéo d'accueil : toujours visible, avec bouton pause/lecture -----
     (seuls les visiteurs qui demandent « moins d'animations » ne la voient pas démarrer seule) */
  const video = document.querySelector('.hero__video');
  const toggle = document.querySelector('.hero__toggle');
  if (video) {
    const sync = () => {
      const paused = video.paused;
      if (toggle) {
        toggle.classList.toggle('is-paused', paused);
        toggle.setAttribute('aria-label', paused ? toggle.dataset.play : toggle.dataset.pause);
      }
    };
    let userPaused = false;
    if (reduce) { video.removeAttribute('autoplay'); video.pause(); userPaused = true; }
    if (toggle) {
      toggle.addEventListener('click', () => {
        if (video.paused) { userPaused = false; video.play().catch(() => {}); } else { userPaused = true; video.pause(); }
      });
    }
    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    sync();
    // Économise la batterie : pause quand la vidéo n'est plus à l'écran
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { if (!userPaused) video.play().catch(() => {}); }
          else if (!video.paused) video.pause();
        });
      }, { threshold: 0.05 }).observe(video);
    }
  }
  // Le film complet (lecteur avec commandes) met le fond d'accueil en pause pendant la lecture
  const film = document.querySelector('.film__player video');
  if (film && video) film.addEventListener('play', () => video.pause());

  /* ----- Parallaxe légère sur les bannières ----- */
  const heroBg = document.querySelector('.page-hero__bg');
  if (heroBg && !reduce) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < 900) heroBg.style.translate = `0 ${y * 0.25}px`;
    }, { passive: true });
  }
})();
