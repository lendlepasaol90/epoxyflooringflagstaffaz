import { site } from '../site.mjs';
import { esc } from '../lib/html.mjs';
import { services } from '../content/services/index.mjs';

const phoneIcon = `<svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z"/></svg>`;

export const phoneLink = (cls = '') => `<a class="${cls}" href="${site.phoneHref}">${esc(site.phone)}</a>`;

export function leadForm({ id, heading, intro, button = 'Send my request', withMessage = false, preset = '', compact = false }) {
  const f = (n) => `${id}-${n}`;
  const options = site.projectTypes.map((t) => `<option${t === preset ? ' selected' : ''}>${esc(t)}</option>`).join('');
  return `<form class="lead${compact ? ' lead--compact' : ''}" id="${id}" action="/api/lead" method="post" novalidate data-lead-form>
  ${heading ? `<p class="lead__title">${esc(heading)}</p>` : ''}
  ${intro ? `<p class="lead__intro">${esc(intro)}</p>` : ''}
  <div class="lead__fields">
    <div class="fld"><label for="${f('name')}">Your name</label><input id="${f('name')}" name="name" type="text" autocomplete="name" required maxlength="80"><p class="fld__err" aria-live="polite"></p></div>
    <div class="fld"><label for="${f('phone')}">Phone</label><input id="${f('phone')}" name="phone" type="tel" autocomplete="tel" inputmode="tel" required><p class="fld__err" aria-live="polite"></p></div>
    <div class="fld"><label for="${f('email')}">Email</label><input id="${f('email')}" name="email" type="email" autocomplete="email" required maxlength="120"><p class="fld__err" aria-live="polite"></p></div>
    <div class="fld"><label for="${f('project')}">What are we coating?</label><select id="${f('project')}" name="project" required><option value="">Select a project</option>${options}</select><p class="fld__err" aria-live="polite"></p></div>
    ${withMessage ? `<div class="fld fld--full"><label for="${f('message')}">Anything we should know? <span class="fld__opt">Optional</span></label><textarea id="${f('message')}" name="message" rows="3" maxlength="2000" placeholder="Garage size, heated or not, existing coating, timing"></textarea></div>` : ''}
    <div class="hp" aria-hidden="true"><label for="${f('company')}">Company</label><input id="${f('company')}" name="company" type="text" tabindex="-1" autocomplete="off"></div>
  </div>
  <button class="btn btn--pine lead__submit" type="submit"><span>${esc(button)}</span></button>
  <p class="lead__fine">We only use these details to reply about your floor. <a href="/privacy-policy/">Privacy policy</a>.</p>
  <div class="lead__status" role="status" aria-live="polite"></div>
</form>`;
}

const groups = [
  { label: 'For your home', slugs: ['garage-floor-coatings', 'residential-epoxy-flooring', 'patio-concrete-coatings'] },
  { label: 'Finishes and systems', slugs: ['decorative-flake-flooring', 'metallic-epoxy-flooring', 'polyaspartic-floor-coatings', 'polyurea-floor-coatings'] },
  { label: 'For business', slugs: ['commercial-epoxy-flooring', 'warehouse-floor-coatings'] },
];

export function header(current = '') {
  const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
  const mega = groups
    .map((g) => `<div class="mega__col"><p class="mega__label">${esc(g.label)}</p><ul>${g.slugs
      .map((sl) => bySlug[sl])
      .map((s) => `<li><a href="/${s.slug}/"${current === s.slug ? ' aria-current="page"' : ''}>${esc(s.name)}</a></li>`)
      .join('')}</ul></div>`)
    .join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="hdr" data-header>
  <div class="hdr__strip">
    <div class="wrap hdr__strip-in">
      <p>Garage, home and commercial floor coatings across Flagstaff and Northern Arizona</p>
      <a class="hdr__strip-phone" href="${site.phoneHref}">${phoneIcon}<span>${esc(site.phone)}</span></a>
    </div>
  </div>
  <div class="hdr__main">
    <div class="wrap hdr__bar">
      <a class="brand" href="/" aria-label="${esc(site.name)} home">
        <!-- Logo placeholder: swap these spans for the final logo image. -->
        <span class="brand__mark" aria-hidden="true"></span>
        <span class="brand__name">${esc(site.name)}</span>
      </a>
      <nav class="mainnav" aria-label="Main">
        <ul>
          <li class="mainnav__has"><button type="button" class="mainnav__btn" aria-expanded="false" aria-controls="mega">Services<svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></button>
            <div class="mega" id="mega"><div class="mega__in">${mega}<a class="mega__cta" href="#estimate-drawer" data-drawer-open><strong>Not sure which system?</strong><span>Book a free visit and we will test the slab and recommend one.</span></a></div></div>
          </li>
          <li><a href="/about-us/"${current === 'about' ? ' aria-current="page"' : ''}>About us</a></li>
          <li><a href="/service-areas/"${current === 'areas' ? ' aria-current="page"' : ''}>Service areas</a></li>
          <li><a href="/contact-us/"${current === 'contact' ? ' aria-current="page"' : ''}>Contact</a></li>
        </ul>
      </nav>
      <a class="hdr__call" href="${site.phoneHref}" aria-label="Call ${esc(site.phone)}">${phoneIcon}</a>
      <button class="btn btn--pine btn--sm hdr__cta" type="button" data-drawer-open aria-controls="estimate-drawer" aria-expanded="false">Get an estimate</button>
      <button class="menu-btn" type="button" data-menu aria-expanded="false" aria-controls="m-menu"><span class="visually-hidden">Menu</span><i></i><i></i><i></i></button>
    </div>
  </div>
  <div class="m-menu" id="m-menu" hidden>
    <div class="wrap">
      ${groups.map((g) => `<p class="m-menu__label">${esc(g.label)}</p><ul>${g.slugs.map((sl) => `<li><a href="/${sl}/">${esc(bySlug[sl].name)}</a></li>`).join('')}</ul>`).join('')}
      <ul class="m-menu__pages"><li><a href="/">Home</a></li><li><a href="/about-us/">About us</a></li><li><a href="/service-areas/">Service areas</a></li><li><a href="/contact-us/">Contact</a></li></ul>
      <a class="btn btn--pine btn--block" href="${site.phoneHref}">Call ${esc(site.phone)}</a>
    </div>
  </div>
</header>
<div class="drawer" id="estimate-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" hidden>
  <div class="drawer__scrim" data-drawer-close></div>
  <div class="drawer__panel">
    <button class="drawer__x" type="button" data-drawer-close aria-label="Close">×</button>
    <p class="drawer__eyebrow">Free, no-obligation visit</p>
    <h2 class="drawer__title" id="drawer-title">Request a floor estimate</h2>
    <p class="drawer__text">Share a few details and we will reach out to find a time to see the space. Winter or summer, the visit is free.</p>
    ${leadForm({ id: 'drawer-form', withMessage: true, compact: true })}
    <p class="drawer__call">Rather talk it through? ${phoneLink()}</p>
  </div>
</div>`;
}

export function footer() {
  const m = site.map;
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(m.query)}&ll=${m.lat},${m.lng}&z=${m.zoom}&output=embed`;
  return `<footer class="ftr">
  <svg class="ftr__topo" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120 C200 60 320 140 520 90 S860 30 1200 80" /><path d="M0 140 C220 90 340 160 540 115 S880 60 1200 105" /><path d="M0 100 C180 40 300 120 500 65 S840 0 1200 55" /></svg>
  <div class="wrap ftr__grid">
    <div class="ftr__about">
      <a class="brand brand--light" href="/"><span class="brand__mark" aria-hidden="true"></span><span class="brand__name">${esc(site.name)}</span></a>
      <p>Floor coatings for mountain homes, cabins, shops and businesses in Flagstaff and the communities around it.</p>
      <a class="ftr__phone" href="${site.phoneHref}">${esc(site.phone)}</a>
    </div>
    <div class="ftr__col">
      <p class="ftr__h">Services</p>
      <ul>${services.map((s) => `<li><a href="/${s.slug}/">${esc(s.name)}</a></li>`).join('')}</ul>
    </div>
    <div class="ftr__col">
      <p class="ftr__h">Company</p>
      <ul><li><a href="/about-us/">About us</a></li><li><a href="/service-areas/">Service areas</a></li><li><a href="/contact-us/">Contact</a></li><li><a href="/privacy-policy/">Privacy policy</a></li></ul>
    </div>
    <div class="ftr__map">
      <p class="ftr__h">Serving Flagstaff and nearby</p>
      <div class="ftr__frame"><iframe title="Map of Flagstaff, Arizona" src="${src}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </div>
  </div>
  <div class="wrap ftr__base"><p>© <span data-year>2026</span> ${esc(site.name)}</p><p><a href="/sitemap.xml">Sitemap</a></p></div>
</footer>
<button class="fab" type="button" data-drawer-open aria-controls="estimate-drawer">Free estimate</button>`;
}
