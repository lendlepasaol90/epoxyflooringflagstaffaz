// Site-wide configuration for Epoxy Flooring Flagstaff.

export const site = {
  name: 'Epoxy Flooring Flagstaff',
  domain: 'https://epoxyflooringflagstaffaz.com',
  city: 'Flagstaff',
  cityLong: 'Flagstaff',
  region: 'Northern Arizona',
  state: 'AZ',
  locale: 'en_US',

  // PLACEHOLDER — replace with the real business number before launch,
  // then set phoneVerified: true so it is included in structured data.
  phone: '(928) 555-0177',
  phoneHref: 'tel:+19285550177',
  phoneVerified: false,
  email: '',

  map: { query: 'Flagstaff, AZ', lat: 35.1983, lng: -111.6513, zoom: 11 },

  serviceAreas: [
    { name: 'Flagstaff', note: 'Every neighborhood, from Cheshire and Continental to Sunnyside and Southside.' },
    { name: 'Doney Park', note: 'Larger lots, detached shops and long gravel driveways east of town.' },
    { name: 'Timberline', note: 'Homes and outbuildings along the Highway 89 corridor.' },
    { name: 'Kachina Village', note: 'Cabins and full-time homes in the pines south of town.' },
    { name: 'Mountainaire', note: 'Garages and covered porches off the I-17.' },
    { name: 'Munds Park', note: 'Second homes and cabins that sit empty through the cold months.' },
    { name: 'Bellemont', note: 'Shops, storage and light industrial space west on I-40.' },
    { name: 'Williams', note: 'Homes and businesses along the old Route 66 corridor.' },
    { name: 'Winona', note: 'Rural properties, barns and workshops east of Flagstaff.' },
  ],

  projectTypes: [
    'Garage floor coating',
    'Residential interior floor',
    'Decorative flake floor',
    'Metallic epoxy floor',
    'Polyaspartic coating',
    'Polyurea coating',
    'Patio or pool deck',
    'Commercial floor',
    'Warehouse or industrial floor',
    'Not sure yet',
  ],
};

// Licensed Envato Elements photography, self-hosted as WebP in src/assets/img (key-<width>.webp).
export const images = {
  peaks: { file: 'peaks', group: 'scene', w: 1600, h: 1200, widths: [480, 800, 1200, 1600], alt: "Snow-capped peak framed by tall pines along a forest road" },
  snowPeak: { file: 'snowPeak', group: 'scene', w: 1600, h: 837, widths: [480, 800, 1200, 1600], alt: "Snow-covered mountain rising above a dense pine forest" },
  snowRoad: { file: 'snowRoad', group: 'scene', w: 1600, h: 1200, widths: [480, 800, 1200, 1600], alt: "Snow-laden pine trees lining a winding winter road" },
  forestPath: { file: 'forestPath', group: 'scene', w: 1600, h: 1200, widths: [480, 800, 1200, 1600], alt: "Dirt trail winding through a ponderosa pine forest" },
  pineTrunks: { file: 'pineTrunks', group: 'scene', w: 1600, h: 1060, widths: [480, 800, 1200, 1600], alt: "Rows of tall pine trunks in late afternoon light" },
  meadow: { file: 'meadow', group: 'scene', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Green meadow beneath forested mountains" },
  cabinSnow: { file: 'cabinSnow', group: 'scene', w: 1600, h: 1064, widths: [480, 800, 1200, 1600], alt: "Small cabin in deep snow surrounded by pine trees" },
  cabinPond: { file: 'cabinPond', group: 'scene', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Stone and timber mountain home dusted with snow" },
  porchSnow: { file: 'porchSnow', group: 'scene', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Wood-sided house with a covered porch on snowy ground" },
  lodgeInterior: { file: 'lodgeInterior', group: 'interior', w: 1600, h: 1067, widths: [480, 800, 1200, 1600], alt: "Modern room with a wood-clad wall and tall windows facing a snowy forest" },
  roomTrees: { file: 'roomTrees', group: 'interior', w: 1600, h: 900, widths: [480, 800, 1200, 1600], alt: "Bright room with a pale floor and a tall window looking out on trees" },
  greyMarble: { file: 'greyMarble', group: 'finish', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Close-up of a grey marbled surface with soft white veining" },
  hallReflect: { file: 'hallReflect', group: 'commercial', w: 1600, h: 1068, widths: [480, 800, 1200, 1600], alt: "Open hall with a glossy floor reflecting tall windows" },
  galleryWhite: { file: 'galleryWhite', group: 'commercial', w: 1600, h: 941, widths: [480, 800, 1200, 1600], alt: "Long white gallery with a smooth, reflective dark floor" },
  sportsGarage: { file: 'sportsGarage', group: 'garage', w: 1600, h: 900, widths: [480, 800, 1200, 1600], alt: "White sports car parked under bright garage lights" },
  brewery: { file: 'brewery', group: 'commercial', w: 1600, h: 1068, widths: [480, 800, 1200, 1600], alt: "Stainless fermentation tanks in a brewery" },
  barrelRoom: { file: 'barrelRoom', group: 'commercial', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Production room with stacked wooden barrels and steel tanks" },
  warehouse: { file: 'warehouse', group: 'industrial', w: 1600, h: 1067, widths: [480, 800, 1200, 1600], alt: "Spacious warehouse with a high-gloss floor reflecting the lights" },
  crew: { file: 'crew', group: 'industrial', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Installer smoothing a fresh grey self-leveling floor coating" },
  doorLight: { file: 'doorLight', group: 'interior', w: 1600, h: 1422, widths: [480, 800, 1200, 1600], alt: "Empty concrete room lit by daylight from a window" },
  xGarageStorage: { file: 'xGarageStorage', group: 'garage', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Clean garage with a grey concrete floor and a door into the house" },
  xGarageMoto: { file: 'xGarageMoto', group: 'garage', w: 1600, h: 1024, widths: [480, 800, 1200, 1600], alt: "Motorcycle parked in a busy home workshop garage" },
  xTerrazzo: { file: 'xTerrazzo', group: 'finish', w: 1600, h: 1019, widths: [480, 800, 1200, 1600], alt: "Close-up of a black, white and grey speckled floor finish" },
  xRolling: { file: 'xRolling', group: 'industrial', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Installer rolling a fresh grey coating across a glossy floor" },
  xGrinder: { file: 'xGrinder', group: 'industrial', w: 1600, h: 1067, widths: [480, 800, 1200, 1600], alt: "Installer grinding a concrete floor before coating" },
};
