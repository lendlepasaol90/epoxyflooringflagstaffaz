import { site } from '../site.mjs';
import { esc, md, inline, img, abs } from '../lib/html.mjs';
import { layout, crumbs } from './layout.mjs';
import { leadForm, phoneLink } from './parts.mjs';
import { bySlug } from '../content/services/index.mjs';

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function block(b) {
  const id = b.id || slugify(b.heading);
  const h = `<h2 id="${id}">${esc(b.heading)}</h2>`;
  switch (b.kind) {
    case 'split':
      return `<section class="blk blk--wide blk--split${b.flip ? ' flip' : ''}" aria-labelledby="${id}">
  <div class="rv">${h}${md(b.body)}</div>
  <figure class="rv-img">${img(b.image, { sizes: '(max-width: 980px) 92vw, 560px', widths: [480, 760, 1100], ratio: 0.8 })}</figure>
</section>`;
    case 'options':
      return `<section class="blk" aria-labelledby="${id}"><div class="rv">${h}${md(b.body || '')}</div>
  <div class="cards2">${b.items.map((o, i) => `<article class="rv d${i % 3}"><h3>${esc(o.name)}</h3><p>${inline(o.body)}</p></article>`).join('')}</div>
  ${b.after ? `<div class="rv" style="margin-top:1.5rem">${md(b.after)}</div>` : ''}</section>`;
    case 'uses':
      return `<section class="blk" aria-labelledby="${id}"><div class="rv">${h}${md(b.body || '')}</div>
  <div class="chiplist rv">${b.items.map((u) => `<div><strong>${esc(u.name)}</strong><span>${inline(u.body)}</span></div>`).join('')}</div></section>`;
    case 'steps':
      return `<section class="blk" aria-labelledby="${id}"><div class="rv">${h}${md(b.body || '')}</div>
  <ol class="tl-sm">${b.items.map((s) => `<li class="rv"><div><h3>${esc(s.name)}</h3><p>${inline(s.body)}</p></div></li>`).join('')}</ol></section>`;
    case 'callout':
      return `<section class="blk aside-note rv" aria-labelledby="${id}">${h}${md(b.body)}</section>`;
    case 'local':
      return `<section class="blk blk--wide season-note" aria-labelledby="${id}">
  <div class="season-note__bg" aria-hidden="true">${img(b.image || 'snowPeak', { widths: [800, 1400], alt: '' })}</div>
  <div class="measure">${h}${md(b.body)}</div></section>`;
    case 'table':
      return `<section class="blk" aria-labelledby="${id}"><div class="rv">${h}${md(b.body || '')}</div>
  <div class="tbl-wrap rv"><table class="tbl"><thead><tr>${b.cols.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${b.rows
    .map((r) => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
    .join('')}</tbody></table></div>
  ${b.after ? `<div class="rv" style="margin-top:1.5rem">${md(b.after)}</div>` : ''}</section>`;
    default:
      return `<section class="blk rv" aria-labelledby="${id}">${h}${md(b.body)}</section>`;
  }
}

export function renderService(s) {
  const path = `/${s.slug}/`;
  const related = (s.related || []).map((r) => bySlug[r]).filter(Boolean);
  const jump = s.blocks.map((b) => `<li><a href="#${b.id || slugify(b.heading)}">${esc(b.toc || b.heading)}</a></li>`).join('');
  const body = `
<div class="band">${img(s.image, { eager: true, widths: [800, 1400, 2000], ratio: 2.8 })}</div>
<div class="wrap">
  <div class="titlecard">
    ${crumbs([{ name: 'Home', path: '/' }, { name: s.name, path }])}
    <div class="titlecard__grid">
      <div>
        <h1>${esc(s.h1)}</h1>
        <p class="big">${inline(s.lede)}</p>
      </div>
      <div class="titlecard__side">
        ${s.chips ? `<ul class="facts-list">${s.chips.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
        <button class="btn btn--pine" type="button" data-drawer-open aria-controls="estimate-drawer">Book a free estimate</button>
        <a class="btn btn--line" href="${site.phoneHref}">Call ${esc(site.phone)}</a>
      </div>
    </div>
  </div>
</div>
<nav class="jump" aria-label="On this page"><div class="wrap"><ul>${jump}<li><a href="#faq">FAQs</a></li><li><a href="#estimate">Estimate</a></li></ul></div></nav>

<div class="sec sec--sm">
  <div class="wrap">
    <article class="article">
      <div class="opening rv">${md(s.intro)}</div>
      ${s.blocks.map(block).join('\n')}
    </article>
  </div>
</div>

<section class="sec sec--sage" id="faq" aria-labelledby="faq-h">
  <div class="wrap">
    <div class="sec__head rv"><h2 id="faq-h">${esc(s.faqHeading)}</h2>${s.faqIntro ? `<p class="soft">${inline(s.faqIntro)}</p>` : ''}</div>
    <div class="qa">${s.faqs.map((f) => `<details class="rv"><summary>${esc(f.q)}</summary><div class="qa__a">${md(f.a)}</div></details>`).join('')}</div>
  </div>
</section>

${related.length ? `<section class="sec sec--sm" aria-labelledby="rel-h"><div class="wrap">
  <h2 id="rel-h" class="rv" style="font-size:1.6rem">${esc(s.relatedHeading || 'You might also be weighing')}</h2>
  <div class="rel">${related.map((r) => `<a class="rv" href="/${r.slug}/"><figure>${img(r.image, { widths: [200, 300], sizes: '96px', ratio: 1, alt: '' })}</figure><div><strong>${esc(r.name)}</strong><span>${esc(r.tagline)}</span></div></a>`).join('')}</div>
</div></section>` : ''}

<section class="sec close" id="estimate" aria-labelledby="est-h">
  <div class="close__bg" aria-hidden="true">${img(s.closerImage || 'pineTrunks', { widths: [800, 1400], alt: '' })}</div>
  <div class="wrap close__grid">
    <div class="rv">
      <h2 id="est-h">${esc(s.cta.heading)}</h2>
      ${md(s.cta.body)}
      <ul class="close__facts"><li>Phone <b>${phoneLink()}</b></li><li>Estimate visits <b>Free, in person</b></li><li>Coverage <b><a href="/service-areas/">Flagstaff and nearby</a></b></li></ul>
    </div>
    <div class="close__card rv d1">${leadForm({ id: `${s.slug}-form`, heading: 'Tell us about the floor', withMessage: true, preset: s.formPreset })}</div>
  </div>
</section>`;
  const schema = [
    { '@type': 'Service', '@id': abs(path) + '#service', name: s.name, serviceType: s.serviceType, description: s.description, provider: { '@id': abs('/#business') }, areaServed: site.serviceAreas.map((a) => ({ '@type': 'Place', name: `${a.name}, AZ` })), url: abs(path) },
    { '@type': 'FAQPage', mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '') } })) },
  ];
  return layout({ path, title: s.title, description: s.description, body, current: s.slug, image: s.image, schema, breadcrumbs: [{ name: 'Home', path: '/' }, { name: s.name, path }] });
}
