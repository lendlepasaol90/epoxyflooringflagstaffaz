import { site } from '../site.mjs';
import { esc, md, img } from '../lib/html.mjs';
import { layout } from './layout.mjs';
import { leadForm, phoneLink } from './parts.mjs';
import { bySlug } from '../content/services/index.mjs';

const pin = `<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2 2 21h20L12 2zm0 5.2L17.6 18H6.4L12 7.2z"/></svg>`;
const topo = `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M-50 620 C150 560 260 660 470 600 S820 470 1250 560"/><path d="M-50 660 C160 600 280 700 480 645 S840 520 1250 605"/><path d="M-50 580 C140 520 240 620 460 555 S800 420 1250 515"/><path d="M-50 700 C170 645 300 740 500 690 S860 570 1250 650"/><path d="M300 120 C380 60 520 70 560 150 S520 300 420 290 S260 200 300 120Z"/><path d="M340 140 C400 100 500 110 520 170 S490 260 420 250 S310 190 340 140Z"/><path d="M380 160 C420 135 470 145 480 180 S455 230 420 222 S360 190 380 160Z"/></svg>`;
const icon = (d) => `<svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="${d}"/></svg>`;

const seasons = [
  {
    id: 'winter', label: 'Winter', image: 'snowRoad',
    title: 'Snowmelt, cinders and cold slabs',
    body: `Every car that comes home after a storm drops a load of slush onto the garage floor. That meltwater carries road cinders and deicer with it, and on bare concrete it soaks in, freezes overnight and slowly scales the surface. A sealed, textured coating keeps water on top where it can be squeegeed out the door, and the cinders stop grinding into the slab.

Winter is also the hardest time to install. Most coatings need the concrete to stay above a minimum temperature while they cure. In heated garages we can work year-round; in unheated ones we either bring in temporary heat or plan for a milder stretch.`,
  },
  {
    id: 'spring', label: 'Spring', image: 'meadow',
    title: 'Wind, mud and the thaw',
    body: `Spring in Flagstaff is windy and messy. Snowbanks melt into driveways, dirt roads turn to mud, and fine dust blows under every door. Garages and mudrooms take the brunt of it.

It is also when the damage from winter shows. Pitting, flaking and white salt stains appear on uncoated slabs once the snow is gone. If you are noticing that now, spring is a good time to book an estimate so your floor is coated before next winter.`,
  },
  {
    id: 'summer', label: 'Summer', image: 'forestPath',
    title: 'High-country sun and monsoon rain',
    body: `Summer is our busiest install season, with mild temperatures that suit most coating systems. But do not let the cool air fool you: at nearly 7,000 feet the sun is intense. Standard epoxies left in direct light, such as near a garage door or on a deck, can discolor. We use UV-stable topcoats wherever sunlight reaches.

Then the monsoon arrives, usually around July, bringing heavy afternoon storms. Outdoor projects get scheduled for mornings and watched closely against the forecast.`,
  },
  {
    id: 'fall', label: 'Fall', image: 'pineTrunks',
    title: 'The window before the first snow',
    body: `Fall brings crisp, dry days that are ideal for coatings, and it is the last good chance to protect a floor before winter. Many homeowners book now so their garage is sealed before the first storm, and cabin owners use the shoulder season to finish projects while the place is empty.

Overnight lows drop quickly in October and November, so we keep a close eye on slab temperature and favor fast-curing systems late in the season.`,
  },
];

const faqs = [
  { q: 'Can you install a floor coating in the winter?', a: 'Yes, with planning. In heated garages and interior rooms we install year-round. Unheated spaces need the slab and air kept above the product minimum while it cures, which we handle with temporary heat or by choosing a cold-tolerant system such as polyaspartic. We will be upfront if waiting a few weeks would give you a better result.' },
  { q: 'Will deicer and road cinders damage the coating?', a: 'A properly built system with a chemical-resistant topcoat handles deicer and meltwater far better than bare concrete. Cinders are abrasive, so we recommend a flake or textured finish that hides wear and a mat or squeegee routine in the worst months.' },
  { q: 'My garage floor is flaking and pitted. Can it be coated?', a: 'Usually, yes. That surface damage is called scaling and is common here. We grind away the loose material, fill the pits with a repair mortar or resin and then coat. Severe cases add some repair time, which we price in the estimate.' },
  { q: 'Is a coated floor slippery with snow and ice on it?', a: 'Any floor is slick with ice on it, but texture makes a big difference with water and slush. We add slip-resistant aggregate to topcoats in garages and entries, and flake floors have natural grip.' },
  { q: 'Do you work on cabins and second homes?', a: 'Often. Many cabin owners in Munds Park, Kachina Village and around Flagstaff schedule work while they are away. We can coordinate access, send photos as the work progresses and confirm cure times before you return.' },
  { q: 'How long until I can park in the garage?', a: 'Fast-cure systems are often ready for vehicles in a day or two in mild weather. Colder temperatures slow curing, so winter projects may need extra time. Your written estimate lists the expected times for your floor and season.' },
  { q: 'What does a garage floor coating cost in Flagstaff?', a: 'It depends on size, slab condition, the amount of scaling or crack repair and the system you choose. Because winter damage varies so much from garage to garage, we price each floor after seeing it, and you get a written estimate with options.' },
];

export function renderHome() {
  const tile = (slug, cls = '', photo) => {
    const s = bySlug[slug];
    return `<a class="tile ${cls}${photo ? ' tile--photo' : ''} rv" href="/${slug}/">${photo ? `<span class="tile__bg">${img(s.image, { sizes: '(max-width: 640px) 92vw, 600px', widths: [500, 900], alt: '' })}</span>` : ''}
      <span class="tile__go" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></span>
      <h3>${esc(s.name)}</h3><p>${esc(s.summary)}</p></a>`;
  };

  const body = `
<section class="hero" aria-labelledby="hero-h">
  <div class="wrap">
    <div class="hero__panel">
      <div class="hero__img" aria-hidden="true">${img('peaks', { eager: true, widths: [800, 1400, 2000, 2600], alt: '' })}</div>
      <div class="hero__topo" aria-hidden="true">${topo}</div>
      <p class="hero__elev">${pin} Elevation near 7,000 ft</p>
      <div class="hero__card rv in">
        <h1 id="hero-h">Concrete floors made for mountain winters</h1>
        <p class="big">Garage, home and commercial floor coatings for Flagstaff and Northern Arizona. We repair winter-damaged slabs and seal them against snowmelt, cinders, deicer and high-country sun.</p>
        <div class="hero__btns">
          <button class="btn btn--pine" type="button" data-drawer-open aria-controls="estimate-drawer">Request a free estimate</button>
          <a class="btn btn--line" href="#services">Explore coatings</a>
        </div>
      </div>
    </div>
    <div class="markers">
      <div><b><span data-count="7000">7,000</span> ft</b><span class="markers__lbl">Roughly the elevation our floors are built for, sun and all</span></div>
      <div><b><span data-count="80" data-suffix="+">80+</span> in.</b><span class="markers__lbl">Of snow in a typical Flagstaff winter, much of it melting in garages</span></div>
      <div><b><span data-count="9">9</span></b><span class="markers__lbl">Coating systems, from flake garages to warehouse floors</span></div>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="intro-h">
  <div class="wrap intro">
    <div class="intro__aside rv"><p>A floor that lasts in Flagstaff has to handle snow in November, mud in April and sun in July.</p></div>
    <div class="rv d1">
      <h2 id="intro-h">Epoxy and resin floors for high-country homes and businesses</h2>
      <p>We coat concrete for people who live and work at altitude. That means garages that see snowmelt for half the year, cabins that sit empty through the cold months, breweries and shops downtown, and warehouses out along I-40. Each one asks something different from a floor.</p>
      <p>Our job is to figure out what that is. We look at the slab first: how old it is, whether it is scaling or cracked, whether it holds moisture, and whether the space is heated. Then we recommend a system that will actually hold up, whether that is a <a href="/garage-floor-coatings/">garage floor coating</a> with a textured flake finish, a fast-curing <a href="/polyaspartic-floor-coatings/">polyaspartic</a> build for a cold-season install, a flexible <a href="/polyurea-floor-coatings/">polyurea</a> base for a cracked slab or a seamless <a href="/commercial-epoxy-flooring/">commercial floor</a> that stays easy to clean.</p>
      <p>Every estimate is free and done in person. You get a written quote, an honest read on the slab, and a clear timeline based on the season.</p>
    </div>
  </div>
</section>

<section class="sec sec--sage" id="services" aria-labelledby="svc-h">
  <div class="wrap">
    <div class="row-head sec__head" style="max-width:none">
      <div style="max-width:620px"><h2 id="svc-h" class="rv">What we coat</h2><p class="soft rv">Nine coating services, each with a dedicated page covering finishes, cure times, costs and how it handles Flagstaff conditions.</p></div>
    </div>
    <div class="bento">
      ${tile('garage-floor-coatings', 'tile--big', true)}
      ${tile('residential-epoxy-flooring', '', false)}
      ${tile('decorative-flake-flooring', 'tile--sage', false)}
      ${tile('commercial-epoxy-flooring', 'tile--wide', true)}
      ${tile('polyaspartic-floor-coatings', '', false)}
      ${tile('metallic-epoxy-flooring', '', true)}
      ${tile('polyurea-floor-coatings', 'tile--sage', false)}
      ${tile('patio-concrete-coatings', '', false)}
      ${tile('warehouse-floor-coatings', 'tile--wide', true)}
      <button class="tile tile--wide tile--cta rv" type="button" data-drawer-open aria-controls="estimate-drawer"><span class="tile__go" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></span><h3>Not sure which system fits?</h3><p>Book a free visit. We will test the slab, check whether the space is heated and recommend a coating that suits it.</p></button>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="seasons-h">
  <div class="topo-bg" aria-hidden="true">${topo}</div>
  <div class="wrap">
    <div class="sec__head rv">
      <h2 id="seasons-h">Four seasons, four ways a floor gets tested</h2>
      <p class="soft">Flagstaff's climate is the main reason floors fail here, and the main thing we plan around. Choose a season to see what it does to concrete and how we deal with it.</p>
    </div>
    <div class="seasons rv" data-tabs>
      <div class="seasons__tabs" role="tablist" aria-label="Seasons">
        ${seasons.map((s, i) => `<button class="seasons__tab" type="button" role="tab" id="tab-${s.id}" aria-controls="panel-${s.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(s.label)}</button>`).join('')}
      </div>
      ${seasons
        .map(
          (s, i) => `<div class="seasons__panel" role="tabpanel" id="panel-${s.id}" aria-labelledby="tab-${s.id}"${i ? ' hidden' : ''}>
        <figure>${img(s.image, { sizes: '(max-width: 980px) 92vw, 520px', widths: [500, 900], alt: '' })}</figure>
        <div class="seasons__text"><h3 style="font-size:1.5rem">${esc(s.title)}</h3>${md(s.body)}</div>
      </div>`,
        )
        .join('')}
    </div>
  </div>
</section>

<section class="sec sec--paper" aria-labelledby="garage-h">
  <div class="wrap feature">
    <div class="feature__pair">
      <div class="feature__img rv-img">${img('sportsGarage', { sizes: '(max-width: 980px) 60vw, 380px', widths: [400, 700], ratio: 0.8 })}</div>
      <div class="feature__img rv-img">${img('cabinSnow', { sizes: '(max-width: 980px) 40vw, 240px', widths: [300, 500], ratio: 0.75 })}</div>
    </div>
    <div class="rv">
      <h2 id="garage-h">Garage floors that shrug off a Flagstaff winter</h2>
      <p>The garage is where winter comes indoors. Snow packed into wheel wells melts into puddles, and those puddles carry cinders, grit and deicing chemicals. On bare concrete, the cycle of soaking, freezing and thawing gradually breaks down the surface, which is why so many local garages have pitted, flaky patches near where the cars park.</p>
      <p>A coating stops that cycle. The slab is ground, the scaling is repaired, and a sealed, textured surface goes over the top so water stays where you can push it out. We pick systems that tolerate cold slabs and resist deicer, then finish with a UV-stable topcoat so the strip of floor by the door does not fade in summer.</p>
      <ul class="ticks">
        <li>Repair of scaling, pitting and cracks is part of the quote</li>
        <li>Textured finishes for grip when the floor is wet with slush</li>
        <li>Options for unheated garages, including cold-season installs</li>
      </ul>
      <a class="link" href="/garage-floor-coatings/">Garage coatings in detail</a>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="res-h">
  <div class="wrap feature feature--rev">
    <div class="feature__img rv-img">${img('roomTrees', { sizes: '(max-width: 980px) 92vw, 560px', widths: [500, 800, 1100], ratio: 1.25 })}<span class="tag">Seamless floors for lived-in spaces</span></div>
    <div class="rv">
      <h2 id="res-h">Residential epoxy for mudrooms, basements and cabins</h2>
      <p>Mountain living is hard on floors. Boots, skis, wet dogs, firewood and the occasional muddy bike all come through the door, and the rooms that take the abuse are often on a concrete slab: mudrooms, basements, laundry rooms, workshops and the lower level of many hillside homes.</p>
      <p>A residential coating gives those spaces a seamless, washable surface that does not mind water or grit. It can be practical and simple, like a satin solid color in a laundry room, or a design feature, like a metallic finish in a finished basement. Moisture testing matters even more indoors, since some older Flagstaff slabs were poured without a good vapor barrier. Learn more on our <a href="/residential-epoxy-flooring/">residential epoxy flooring</a> page.</p>
    </div>
  </div>
</section>

<section class="sec sec--sm" aria-labelledby="deco-h">
  <div class="wrap">
    <div class="deco">
      <div class="deco__bg" aria-hidden="true">${img('greyMarble', { widths: [800, 1400], alt: '' })}</div>
      <div class="rv">
        <h2 id="deco-h">Decorative and metallic epoxy flooring</h2>
        <p>Floors can be beautiful as well as tough. Decorative flake systems scatter colored chips through the coating for a speckled stone look that hides grit. Metallic epoxy goes further, using reflective pigments worked by hand into swirls and drifts that look like polished stone or a frozen lake surface.</p>
        <p>We often suggest palettes drawn from the landscape around town: basalt greys, pine and moss greens, the warm tan of ponderosa bark and the gold of the aspens in October. See <a href="/decorative-flake-flooring/">decorative flake</a> and <a href="/metallic-epoxy-flooring/">metallic epoxy</a>.</p>
      </div>
      <div class="swatches rv d1">
        <div class="swatch"><i style="background:linear-gradient(135deg,#55595a,#2b2e2f)"></i><strong>Basalt</strong><span>Charcoal flake or slate metallic. Hides cinders and tire marks well.</span></div>
        <div class="swatch"><i style="background:linear-gradient(135deg,#c7a679,#8a6a45)"></i><strong>Ponderosa</strong><span>Warm tans and browns that sit naturally beside wood trim.</span></div>
        <div class="swatch"><i style="background:linear-gradient(135deg,#d8dcd6,#9aa59c)"></i><strong>Snowfield</strong><span>Light greys and whites that brighten basements and shops.</span></div>
        <div class="swatch"><i style="background:linear-gradient(135deg,#e2c46d,#9c7a26)"></i><strong>Aspen</strong><span>Gold and bronze metallics for a statement room.</span></div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--sage" aria-labelledby="biz-h">
  <div class="wrap">
    <div class="sec__head rv"><h2 id="biz-h">Commercial and industrial flooring</h2><p class="soft">Flagstaff businesses deal with the same snow, mud and grit as homeowners, multiplied by customers, staff and equipment. We plan projects around your hours and pick systems for the traffic you actually get.</p></div>
    <div class="biz">
      <article class="biz__card rv">
        <figure>${img('brewery', { sizes: '(max-width: 980px) 92vw, 600px', widths: [500, 900, 1200], ratio: 2 })}</figure>
        <div class="biz__body">
          <h3 style="font-size:1.45rem">Commercial epoxy flooring</h3>
          <p>From breweries and restaurants to outdoor gear shops, clinics and offices, commercial floors here need to handle constant washdown, tracked-in snow and heavy foot traffic. Seamless resin floors clean quickly, resist chemicals and can be made slip-resistant where floors get wet.</p>
          <ul><li>Breweries and taprooms</li><li>Restaurant kitchens</li><li>Retail and rental shops</li><li>Clinics and offices</li><li>Fitness studios</li><li>Hotel back-of-house</li></ul>
          <a class="link" href="/commercial-epoxy-flooring/">Commercial floors</a>
        </div>
      </article>
      <article class="biz__card rv d1">
        <figure>${img('warehouse', { sizes: '(max-width: 980px) 92vw, 600px', widths: [500, 900, 1200], ratio: 2 })}</figure>
        <div class="biz__body">
          <h3 style="font-size:1.45rem">Industrial flooring solutions</h3>
          <p>Warehouses, distribution space, fabrication shops and maintenance bays around the airport, east Flagstaff and Bellemont need floors that take forklift traffic and stop concrete dust. We use high-build epoxy and polyurea systems, repair joints and add safety striping, scheduled in phases so work keeps moving.</p>
          <ul><li>Warehouses and storage</li><li>Fabrication shops</li><li>Fleet and equipment bays</li><li>Joint repair</li><li>Lane and zone striping</li><li>Dust-proofing</li></ul>
          <a class="link" href="/warehouse-floor-coatings/">Warehouse coatings</a>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="why-h">
  <div class="wrap">
    <div class="sec__head rv"><h2 id="why-h">Why choose our epoxy flooring services?</h2><p class="soft">No made-up awards or inflated claims. Just the working habits that decide whether a floor lasts at altitude.</p></div>
    <dl class="ledger">
      <div class="rv">${icon('M3 17l6-6 4 4 8-8M14 7h7v7')}<dt>We prepare for the climate, not the brochure</dt><dd>Systems are chosen for freeze-thaw, deicer, moisture and high UV, not because they are what we always install.</dd></div>
      <div class="rv d1">${icon('M12 3v18M3 12h18')}<dt>Mechanical prep on every floor</dt><dd>Diamond grinding removes scaling, sealers and weak concrete so the coating bonds to sound material.</dd></div>
      <div class="rv">${icon('M4 7h16M4 12h16M4 17h10')}<dt>Plain, written estimates</dt><dd>Every layer, repair and cure time is listed, so you can compare quotes and plan around the season.</dd></div>
      <div class="rv d1">${icon('M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z')}<dt>Honest timing advice</dt><dd>If your floor would be better done in May than in January, we will say so, even if it means waiting.</dd></div>
      <div class="rv">${icon('M3 21h18M5 21V9l7-5 7 5v12')}<dt>Care for homes and cabins</dt><dd>Protected walls and doors, contained dust, and reliable communication for owners who are away.</dd></div>
      <div class="rv d1">${icon('M5 12l5 5L20 7')}<dt>Clear care instructions</dt><dd>You get written guidance on cure times, cleaning and winter care so the floor keeps looking right.</dd></div>
    </dl>
  </div>
</section>

<section class="bleed" aria-labelledby="bleed-h">
  <div class="bleed__bg" data-parallax aria-hidden="true">${img('snowPeak', { widths: [800, 1400, 2000, 2600], alt: '' })}</div>
  <div class="bleed__in rv">
    <h2 id="bleed-h">Get your floor sealed before the first snow</h2>
    <p>Fall fills up quickly. Book an estimate early and we can plan your project for the best window of the year, while slabs are dry and days are mild.</p>
    <ul class="bleed__row"><li>Free on-site estimates</li><li>Repairs for scaled, pitted concrete</li><li>Cold-season install options</li></ul>
    <button class="btn btn--aspen" type="button" data-drawer-open aria-controls="estimate-drawer">Book my estimate</button>
  </div>
</section>

<section class="sec" aria-labelledby="proc-h">
  <div class="wrap process">
    <div class="process__media"><div class="feature__img rv-img">${img('crew', { sizes: '(max-width: 980px) 92vw, 480px', widths: [480, 800], ratio: 0.8 })}</div></div>
    <div>
      <div class="sec__head rv" style="margin-bottom:2rem"><h2 id="proc-h">Our flooring installation process</h2><p class="soft">Most residential garages are finished in one to three days, depending on repairs and temperature. Here is how a project moves from first call to first parked car.</p></div>
      <ol class="timeline">
        <li class="rv"><h3>Site visit and slab check</h3><p>We measure, look for scaling and cracks, test for moisture, check whether the space is heated and talk through how you use it.</p></li>
        <li class="rv"><h3>Written estimate and scheduling</h3><p>You get options with prices and a recommended install window based on the season and the system.</p></li>
        <li class="rv"><h3>Grinding and repairs</h3><p>Dust-controlled diamond grinding, then pit, spall and crack repairs so the surface is sound and even.</p></li>
        <li class="rv"><h3>Coating layers</h3><p>Primer or base coat, flake or color layers, and a protective topcoat with texture where it is needed.</p></li>
        <li class="rv"><h3>Cure, walkthrough and care plan</h3><p>We confirm cure times for the current temperature, walk the floor with you and leave written winter-care instructions.</p></li>
      </ol>
    </div>
  </div>
</section>

<section class="sec sec--paper" aria-labelledby="ben-h">
  <div class="wrap">
    <div class="sec__head rv"><h2 id="ben-h">Benefits of professional epoxy flooring</h2><p class="soft">The clearest way to see the difference is to imagine the same garage after its first full winter.</p></div>
    <div class="contrast">
      <div class="contrast__col contrast__col--bare rv">
        <h3>Bare or DIY-painted concrete</h3>
        <ul>
          <li><strong>Surface scaling</strong>Meltwater soaks in, freezes and pops off flakes of concrete.</li>
          <li><strong>Salt and mineral stains</strong>White rings and crust where slush dried.</li>
          <li><strong>Peeling paint</strong>Thin coatings lift where tires park and water sits.</li>
          <li><strong>Constant grit</strong>Cinders and concrete dust tracked into the house.</li>
        </ul>
      </div>
      <div class="contrast__col contrast__col--coated rv d1">
        <h3>A professionally installed system</h3>
        <ul>
          <li><strong>Sealed surface</strong>Water stays on top and can be pushed out the door.</li>
          <li><strong>Chemical resistance</strong>Deicer, oil and antifreeze wipe up without staining.</li>
          <li><strong>Bonded, not painted on</strong>Ground concrete and multi-layer builds that stay put.</li>
          <li><strong>Easy cleaning</strong>Sweep or squeegee, then mop. Grit stops grinding into the slab.</li>
        </ul>
      </div>
    </div>
    <p class="measure rv" style="margin-top:2rem">There are quieter benefits too. Coated floors reflect light, which helps in garages and basements during short winter days. They make a home or cabin easier to keep clean, and a finished garage or shop floor tends to stand out when a property is shown.</p>
  </div>
</section>

<section class="sec" aria-labelledby="local-h">
  <div class="wrap local">
    <div class="rv">
      <h2 id="local-h">Why property owners in Flagstaff choose us</h2>
      <p>Flagstaff is not like the rest of Arizona, and floors here should not be treated like Phoenix floors. Slabs freeze. Garages fill with slush. Many homes sit on rocky or volcanic ground, older neighborhoods have decades-old concrete, and plenty of cabins in the pines are only used part of the year.</p>
      <p>Owners tell us they want three things: a floor that will not fail after one winter, a clear plan that respects the season, and a crew that treats a home or cabin with care. That is how we work, whether the job is a single-car garage near downtown or a shop floor out past the airport.</p>
      <p>We regularly work in neighborhoods including:</p>
      <ul class="hoods"><li>Continental</li><li>Cheshire</li><li>University Heights</li><li>Ponderosa Trails</li><li>Pine Canyon</li><li>Coconino Estates</li><li>Fort Valley</li><li>Sunnyside</li><li>Country Club</li><li>Lower Greenlaw</li></ul>
    </div>
    <aside class="note-card rv d1">
      <h3>A note for cabin and second-home owners</h3>
      <p>Garages and lower levels in seasonal homes often sit cold and damp for months. Moisture can build up in the slab, and a floor that looked fine in summer can start to flake by spring.</p>
      <p>We can schedule work while you are away, coordinate access with a neighbor or property manager and send updates as the job progresses. Fast-curing systems mean the floor is usually ready well before your next visit.</p>
      <button class="btn btn--pine btn--sm" type="button" data-drawer-open aria-controls="estimate-drawer">Plan a project</button>
    </aside>
  </div>
</section>

<section class="sec sec--sm" aria-labelledby="gal-h" style="padding-inline:0">
  <div class="wrap row-head">
    <div><h2 id="gal-h" class="rv">Featured finishes and floor styles</h2><p class="soft rv" style="margin:0">Typical surfaces we install. Physical samples come with every estimate.</p></div>
    <div class="strip-nav"><button type="button" data-strip-prev aria-label="Scroll gallery left">←</button><button type="button" data-strip-next aria-label="Scroll gallery right">→</button></div>
  </div>
  <div class="strip" data-strip tabindex="0" aria-label="Finish gallery">
    <figure><div>${img('sportsGarage', { widths: [400, 700], sizes: '400px', ratio: 0.8 })}</div><figcaption><b>Smooth garage finish</b>Solid color with a clear, hard-wearing topcoat</figcaption></figure>
    <figure><div>${img('greyMarble', { widths: [400, 700], sizes: '400px', ratio: 4 / 4.2 })}</div><figcaption><b>Stone-look metallic</b>Grey and silver movement for interiors</figcaption></figure>
    <figure><div>${img('lodgeInterior', { widths: [400, 700], sizes: '400px', ratio: 0.8 })}</div><figcaption><b>Satin interior floor</b>Calm, seamless and easy to clean</figcaption></figure>
    <figure><div>${img('brewery', { widths: [400, 700], sizes: '400px', ratio: 4 / 4.2 })}</div><figcaption><b>Production and washdown</b>Textured resin for wet commercial floors</figcaption></figure>
    <figure><div>${img('hallReflect', { widths: [400, 700], sizes: '400px', ratio: 0.8 })}</div><figcaption><b>High-gloss showroom</b>Bright, reflective finish for retail</figcaption></figure>
    <figure><div>${img('warehouse', { widths: [400, 700], sizes: '400px', ratio: 4 / 4.2 })}</div><figcaption><b>Light-reflective industrial</b>Brighter aisles with high-build coatings</figcaption></figure>
  </div>
</section>

<section class="sec sec--sage" aria-labelledby="areas-h">
  <div class="topo-bg" aria-hidden="true">${topo}</div>
  <div class="wrap areas">
    <div class="rv">
      <h2 id="areas-h">Service areas</h2>
      <p>We work throughout Flagstaff and the communities within a reasonable drive in the pines. Projects further afield, especially commercial ones, are welcome too. Just ask.</p>
      <a class="link" href="/service-areas/">More about our service areas</a>
    </div>
    <ul class="areas__list rv d1">${site.serviceAreas.map((a) => `<li><strong>${esc(a.name)}</strong><span>${esc(a.note)}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="sec" aria-labelledby="faq-h">
  <div class="wrap">
    <div class="sec__head rv"><h2 id="faq-h">Frequently asked questions</h2><p class="soft">What Flagstaff homeowners and business owners ask us most. Still wondering about something? Call ${phoneLink()}.</p></div>
    <div class="qa">${faqs.map((f) => `<details class="rv"><summary>${esc(f.q)}</summary><div class="qa__a">${md(f.a)}</div></details>`).join('')}</div>
  </div>
</section>

<section class="sec close" id="estimate" aria-labelledby="est-h">
  <div class="close__bg" aria-hidden="true">${img('cabinPond', { widths: [800, 1400, 2000], alt: '' })}</div>
  <div class="wrap close__grid">
    <div class="rv">
      <h2 id="est-h">Let's look at your floor</h2>
      <p>Tell us about the space and we will set up a free visit. You will come away with a written estimate, an honest assessment of the slab and a recommended window for the work.</p>
      <ul class="close__facts"><li>Phone <b>${phoneLink()}</b></li><li>Estimates <b>Free and in person</b></li><li>Coverage <b>Flagstaff and nearby</b></li></ul>
    </div>
    <div class="close__card rv d1">${leadForm({ id: 'home-form', heading: 'Request your free estimate', intro: 'A minute to fill in. We will follow up to schedule a visit.', withMessage: true })}</div>
  </div>
</section>`;

  return layout({
    path: '/',
    title: 'Epoxy Flooring Flagstaff | Garage & Concrete Floor Coatings',
    description: 'Garage, home and commercial floor coatings in Flagstaff, AZ. We repair winter-damaged concrete and seal it against snowmelt, cinders, deicer and mountain sun.',
    body,
    image: 'lodgeInterior',
    schema: [{ '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }],
  });
}
