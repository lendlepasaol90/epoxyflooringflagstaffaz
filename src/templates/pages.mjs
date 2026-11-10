import { site } from '../site.mjs';
import { esc, md, img } from '../lib/html.mjs';
import { layout, crumbs } from './layout.mjs';
import { leadForm, phoneLink } from './parts.mjs';
import { services } from '../content/services/index.mjs';

const head = ({ title, lede, image, trail }) => `<div class="band">${img(image, { eager: true, widths: [800, 1400, 2000], ratio: 2.8, alt: '' })}</div>
<div class="wrap"><div class="titlecard">${crumbs(trail)}<h1>${esc(title)}</h1><p class="big">${lede}</p></div></div>`;

const side = (id) => `<aside class="side-card">${leadForm({ id, heading: 'Free estimate', intro: 'Tell us a little about the floor and we will follow up to schedule a visit.', compact: true })}</aside>`;

export function renderAbout() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'About us', path: '/about-us/' }];
  const body = `${head({ title: 'About Epoxy Flooring Flagstaff', lede: 'A Northern Arizona floor coating team that plans every job around the slab, the season and the people who use the space.', image: 'pineTrunks', trail })}
<section class="sec sec--sm"><div class="wrap page-grid"><div class="rv">
${md(`Floors at altitude live a different life from floors in the desert below. Concrete freezes and thaws dozens of times a winter. Garages fill with meltwater, cinders and deicer. Sunlight is stronger than people expect, and the best weather for coating work comes in short windows between seasons.

We built our approach around those facts. It starts with understanding the slab, because a coating is only as good as the concrete under it, and it ends with a schedule that respects the weather instead of fighting it.`)}
<h2>How we work</h2>
<div class="pillars">
  <div><strong>Slab first</strong><span>We look for scaling, moisture, cracks and old sealers before suggesting any system.</span></div>
  <div><strong>Season-aware</strong><span>Every estimate includes a recommended install window and expected cure times for that time of year.</span></div>
  <div><strong>Straight talk</strong><span>Written estimates in plain language. If a cheaper option will do the job, we tell you.</span></div>
  <div><strong>Respect for the place</strong><span>Dust control, protected surfaces and tidy work, whether it is your home, cabin or business.</span></div>
</div>
${md(`## Who we work for

Homeowners make up most of our work, mainly garages, mudrooms, basements, workshops and covered porches. We also coat floors for cabin and second-home owners who need someone reliable while they are away, and for Flagstaff businesses: breweries and restaurants, shops and rental outfitters, clinics, offices, warehouses and fabrication spaces.

## What makes a good floor job

Honestly, most of it is unglamorous. Grinding the slab properly. Taking the time to repair scaled areas instead of coating over them. Testing for moisture. Waiting for the right temperature. Applying each layer at the right thickness. None of it shows in a photo on day one, but all of it shows after the third winter.

## Getting started

Call or send the form, and we will set up a visit. We will look at the floor, show you samples and explain what we would recommend and why. You get a written estimate afterward, with no pressure to decide on the spot.`)}
<p style="margin-top:1.5rem"><a class="btn btn--pine" href="/contact-us/">Contact us</a> <a class="btn btn--line" href="/service-areas/">Where we work</a></p>
</div>${side('about-form')}</div></section>`;
  return layout({ path: '/about-us/', title: 'About Us | Epoxy Flooring Flagstaff', description: 'Learn how Epoxy Flooring Flagstaff plans floor coatings around the slab, the season and mountain conditions, and what to expect from your free estimate.', body, current: 'about', image: 'pineTrunks', breadcrumbs: trail });
}

const towns = {
  Flagstaff: 'From downtown bungalows and Southside homes to Continental, Cheshire, University Heights and the newer subdivisions on the edges of town. Garages, basements, shops and businesses of every size.',
  'Doney Park': 'Large lots east of town with detached garages, pole barns and workshops. Many slabs here see big temperature swings and benefit from flexible base coats.',
  Timberline: 'Homes and outbuildings off Highway 89 north of Flagstaff. We often coat shop floors and garages that double as storage for trailers and equipment.',
  'Kachina Village': 'Full-time homes and cabins in the pines south of town. Seasonal moisture and cold, unheated garages are common, so system choice and timing matter.',
  Mountainaire: 'Neighborhoods along the I-17 corridor. Garages, mudrooms and covered entries that take a beating from snow and mud.',
  'Munds Park': 'Second homes and cabins, many unoccupied for parts of the year. We coordinate access and timing for owners who are away.',
  Bellemont: 'Light industrial, storage and distribution space west of Flagstaff on I-40, as well as nearby homes.',
  Williams: 'Homes and businesses along historic Route 66, including restaurants, lodging and retail spaces that need durable, easy-clean floors.',
  Winona: 'Rural properties east of Flagstaff, including barns, shops and garages on large parcels.',
};

export function renderAreas() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Service areas', path: '/service-areas/' }];
  const body = `${head({ title: 'Service areas in Flagstaff and Northern Arizona', lede: 'We cover Flagstaff and the surrounding high country for residential projects, and travel further for commercial and industrial floors.', image: 'meadow', trail })}
<section class="sec sec--sm"><div class="wrap">
  <div class="measure rv">${md(`Distance matters on coating jobs here. Mountain weather changes quickly, and many systems have tight temperature and timing windows. Staying close to Flagstaff lets us start early, watch the forecast and adjust plans without losing a day.

The communities below are where we work most often. If you are outside them, give us a call; larger jobs and commercial work often make a longer trip worthwhile.`)}</div>
  <div class="town-grid">${site.serviceAreas.map((a) => `<article class="rv"><h2>${esc(a.name)}</h2><p>${esc(towns[a.name] || a.note)}</p></article>`).join('')}</div>
  <div class="measure rv" style="margin-top:3rem"><h2>Every service, in every area</h2><ul>${services.map((s) => `<li><a href="/${s.slug}/">${esc(s.name)}</a>: ${esc(s.tagline)}</li>`).join('')}</ul></div>
</div></section>
<section class="sec close" id="estimate"><div class="wrap close__grid"><div><h2>Not sure if you are in range?</h2><p>Send your details and we will confirm when we follow up. Or call ${phoneLink()}.</p></div><div class="close__card">${leadForm({ id: 'areas-form', heading: 'Request an estimate', withMessage: true })}</div></div></section>`;
  return layout({ path: '/service-areas/', title: 'Service Areas | Epoxy Flooring Flagstaff & Northern Arizona', description: 'Floor coatings in Flagstaff, Doney Park, Timberline, Kachina Village, Mountainaire, Munds Park, Bellemont, Williams and Winona.', body, current: 'areas', image: 'meadow', breadcrumbs: trail });
}

export function renderContact() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact-us/' }];
  const body = `${head({ title: 'Contact us', lede: 'Ask a question or book a free estimate. Tell us about the floor and we will take it from there.', image: 'forestPath', trail })}
<section class="sec sec--sm" id="estimate"><div class="wrap close__grid" style="align-items:start">
  <div class="rv">
    <h2>Before you send the form</h2>
    <p>A few details help us plan a useful first visit:</p>
    <ul><li>The rough size of the space and whether it is heated</li><li>Any existing coating, paint or sealer</li><li>Visible damage such as flaking, pitting or cracks</li><li>When you would like the work done, or when the space will be empty</li></ul>
    <p><strong>Phone:</strong> ${phoneLink()}${site.email ? `<br><strong>Email:</strong> <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>` : ''}</p>
    <h3>What happens next</h3>
    <ol><li>We reach out to arrange a time.</li><li>We visit, inspect the slab and bring samples.</li><li>You receive a written estimate with a recommended install window.</li></ol>
  </div>
  <div class="side-card rv d1" style="position:static">${leadForm({ id: 'contact-form', heading: 'Request your free estimate', withMessage: true })}</div>
</div></section>`;
  return layout({ path: '/contact-us/', title: 'Contact Us | Free Floor Coating Estimates in Flagstaff', description: 'Request a free, in-person estimate for garage, home or commercial floor coatings in Flagstaff and nearby Northern Arizona communities.', body, current: 'contact', image: 'forestPath', breadcrumbs: trail });
}

export function renderPrivacy() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Privacy policy', path: '/privacy-policy/' }];
  const body = `${head({ title: 'Privacy policy', lede: 'What happens to the information you send us through this site.', image: 'doorLight', trail })}
<section class="sec sec--sm"><div class="wrap measure">${md(`## Information you send

Our forms collect your name, phone number, email address, project type and any message you choose to include, along with the page you submitted from. This site does not use advertising or tracking cookies.

## How it is used

We use these details only to respond to you, arrange an estimate and communicate about your project. We do not sell, rent or trade your information.

## Services that help run the site

Form submissions may pass through an email or workflow service so they reach us. The footer map is provided by Google Maps. Those providers may receive standard technical information such as your IP address, under their own policies.

## Your choices

To update or delete information you have sent us, get in touch through our [contact page](/contact-us/).

## Updates

This policy may change over time. The latest version always lives on this page.`)}</div></section>`;
  return layout({ path: '/privacy-policy/', title: 'Privacy Policy | Epoxy Flooring Flagstaff', description: 'How Epoxy Flooring Flagstaff collects, uses and protects details submitted through the estimate and contact forms on this website.', body, breadcrumbs: trail });
}

export function render404() {
  const body = `<section class="lost"><div class="wrap measure center"><h1>Trail ends here</h1><p class="big">That page does not exist or has moved. These will get you back on track.</p><p><a class="btn btn--pine" href="/">Homepage</a> <a class="btn btn--line" href="/garage-floor-coatings/">Garage coatings</a> <a class="btn btn--line" href="/contact-us/">Contact</a></p></div></section>`;
  return layout({ path: '/404.html', title: 'Page not found | Epoxy Flooring Flagstaff', description: 'The page you were looking for could not be found.', body }).replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex">');
}
