/* Epoxy Flooring Flagstaff — interactions */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hover = matchMedia('(hover: hover)');

  /* Header: collapse utility strip on scroll, show floating estimate button after hero */
  const hdr = $('[data-header]');
  const fab = $('.fab');
  const onScroll = () => {
    const y = window.scrollY;
    hdr?.classList.toggle('is-scrolled', y > 40);
    fab?.classList.toggle('is-shown', y > window.innerHeight * 0.7);
  };
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  /* Mega menu */
  const megaBtn = $('.mainnav__btn');
  const mega = $('#mega');
  const setMega = (open) => { if (!megaBtn) return; megaBtn.setAttribute('aria-expanded', String(open)); mega.classList.toggle('is-open', open); };
  if (megaBtn) {
    const li = megaBtn.parentElement;
    let timer;
    megaBtn.addEventListener('click', () => setMega(megaBtn.getAttribute('aria-expanded') !== 'true'));
    li.addEventListener('mouseenter', () => { if (hover.matches) { clearTimeout(timer); setMega(true); } });
    li.addEventListener('mouseleave', () => { if (hover.matches) timer = setTimeout(() => setMega(false), 200); });
    li.addEventListener('focusout', (e) => { if (!li.contains(e.relatedTarget)) setMega(false); });
    document.addEventListener('click', (e) => { if (!li.contains(e.target)) setMega(false); });
  }

  /* Mobile menu */
  const menuBtn = $('[data-menu]');
  const mMenu = $('#m-menu');
  const setMenu = (open) => { if (!menuBtn) return; mMenu.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); };
  menuBtn?.addEventListener('click', () => setMenu(mMenu.hidden));

  /* Estimate drawer with focus trap */
  const drawer = $('#estimate-drawer');
  let lastFocus = null;
  const focusables = () => $$('a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea', drawer).filter((el) => el.offsetParent !== null);
  const openDrawer = (e) => {
    e?.preventDefault();
    if (!drawer) return;
    lastFocus = document.activeElement;
    setMenu(false); setMega(false);
    drawer.hidden = false;
    document.body.classList.add('is-locked');
    $$('[data-drawer-open]').forEach((b) => b.setAttribute('aria-expanded', 'true'));
    requestAnimationFrame(() => { drawer.classList.add('is-open'); setTimeout(() => $('input', drawer)?.focus(), calm ? 0 : 250); });
  };
  const closeDrawer = () => {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    $$('[data-drawer-open]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    setTimeout(() => { drawer.hidden = true; }, calm ? 0 : 420);
    lastFocus?.focus?.();
  };
  $$('[data-drawer-open]').forEach((b) => b.addEventListener('click', openDrawer));
  $$('[data-drawer-close]').forEach((b) => b.addEventListener('click', closeDrawer));
  drawer?.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = focusables(); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (drawer && !drawer.hidden) closeDrawer();
    setMega(false);
    if (mMenu && !mMenu.hidden) { setMenu(false); menuBtn.focus(); }
  });

  /* Reveal */
  const rv = $$('.rv, .rv-img');
  if (calm || !('IntersectionObserver' in window)) rv.forEach((el) => el.classList.add('in'));
  else {
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
    rv.forEach((el) => io.observe(el));
  }

  /* Parallax */
  const plx = $$('[data-parallax]');
  if (plx.length && !calm) {
    let busy = false;
    const go = () => {
      const vh = innerHeight;
      plx.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        el.style.transform = `translate3d(0, ${(((r.top + r.height / 2 - vh / 2) / vh) * -70).toFixed(1)}px, 0)`;
      });
      busy = false;
    };
    addEventListener('scroll', () => { if (!busy) { busy = true; requestAnimationFrame(go); } }, { passive: true });
    go();
  }

  /* Counters */
  const count = (el) => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '';
    if (calm) { el.textContent = end.toLocaleString('en-US') + suf; return; }
    const t0 = performance.now();
    const tick = (t) => { const p = Math.min(1, (t - t0) / 1500); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('en-US') + suf; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  const cs = $$('[data-count]');
  if ('IntersectionObserver' in window) { const co = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { count(en.target); co.unobserve(en.target); } }), { threshold: 0.6 }); cs.forEach((c) => co.observe(c)); }

  /* Season tabs (ARIA tabs pattern) */
  $$('[data-tabs]').forEach((root) => {
    const tabs = $$('[role="tab"]', root);
    const select = (tab, focus) => {
      tabs.forEach((t) => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; $('#' + t.getAttribute('aria-controls')).hidden = !on; });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); }
        if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
        if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
  });

  /* Gallery strip buttons */
  $$('[data-strip-prev], [data-strip-next]').forEach((b) => b.addEventListener('click', () => {
    const strip = $('[data-strip]', b.closest('section') || document);
    const card = $('figure', strip);
    strip.scrollBy({ left: (b.hasAttribute('data-strip-next') ? 1 : -1) * ((card?.offsetWidth || 300) + 16), behavior: calm ? 'auto' : 'smooth' });
  }));

  /* Jump nav highlighting */
  const jumps = $$('.jump a');
  if (jumps.length && 'IntersectionObserver' in window) {
    const ids = new Map(jumps.map((a) => [a.hash.slice(1), a]));
    const jo = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { jumps.forEach((a) => a.classList.remove('on')); const a = ids.get(en.target.id); if (a) { a.classList.add('on'); a.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } } }), { rootMargin: '-35% 0px -55% 0px' });
    ids.forEach((_, id) => { const el = document.getElementById(id); if (el) jo.observe(el); });
  }

  /* Lead forms */
  const rules = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Add your name so we know who to ask for.'),
    phone: (v) => (v.replace(/\D/g, '').length >= 10 ? '' : 'Use a 10-digit number, area code first.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'That email address looks incomplete.'),
    project: (v) => (v ? '' : 'Pick the closest match. "Not sure yet" is fine.'),
  };
  const validate = (el) => {
    const rule = rules[el.name]; if (!rule) return true;
    const msg = rule(el.value), fld = el.closest('.fld'), err = $('.fld__err', fld);
    fld.classList.toggle('is-bad', !!msg);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) { err.id ||= el.id + '-err'; el.setAttribute('aria-describedby', err.id); err.textContent = msg; }
    return !msg;
  };
  $$('[data-lead-form]').forEach((form) => {
    const ph = form.elements.phone;
    ph?.addEventListener('input', () => {
      const d = ph.value.replace(/\D/g, '').replace(/^1/, '').slice(0, 10);
      ph.value = d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d;
    });
    $$('input, select', form).forEach((el) => {
      el.addEventListener('blur', () => el.value && validate(el));
      el.addEventListener('input', () => el.closest('.fld')?.classList.contains('is-bad') && validate(el));
    });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = $('.lead__status', form);
      const els = $$('[name]', form).filter((el) => rules[el.name]);
      if (!els.map(validate).every(Boolean)) { els.find((el) => el.getAttribute('aria-invalid') === 'true')?.focus(); return; }
      const btn = $('.lead__submit', form), lbl = $('span', btn), txt = lbl.textContent;
      btn.disabled = true; lbl.textContent = 'Sending…';
      status.className = 'lead__status'; status.textContent = '';
      const data = Object.fromEntries(new FormData(form)); data.page = location.pathname;
      try {
        const res = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        const out = await res.json().catch(() => ({}));
        if (!res.ok || !out.ok) throw new Error();
        form.classList.add('is-sent');
        status.classList.add('is-ok');
        status.textContent = `Got it, ${data.name.trim().split(' ')[0]}. We'll be in touch soon to find a time to look at your floor.`;
        status.tabIndex = -1; status.focus({ preventScroll: true });
      } catch {
        status.classList.add('is-err');
        const p = $('.hdr__strip-phone');
        status.innerHTML = `Your request didn't send. Please try again, or call <a href="${p?.getAttribute('href') || '#'}">${p?.textContent.trim() || 'us'}</a>.`;
      } finally { btn.disabled = false; lbl.textContent = txt; }
    });
  });

  $$('[data-year]').forEach((y) => (y.textContent = new Date().getFullYear()));
})();
