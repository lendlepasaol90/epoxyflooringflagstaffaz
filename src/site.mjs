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

// Licensed Unsplash photography (Unsplash License). Replace `id` with `src` to self-host.
export const images = {
  peaks: { id: 'photo-1722280227003-2f574f6f4fe5', alt: 'Ponderosa pine forest stretching toward a mountain peak' },
  snowPeak: { id: 'photo-1571851607492-5556c9080346', alt: 'Snow-covered mountain rising above a pine forest' },
  snowRoad: { id: 'photo-1765742432551-b916687093fa', alt: 'Snow-laden pine trees beside a closed winter road' },
  forestPath: { id: 'photo-1766548872806-87dd7ae209fe', alt: 'Dirt path winding through a dense pine forest' },
  pineTrunks: { id: 'photo-1603061296080-35d47d0c2301', alt: 'Tall pine trunks in late afternoon light' },
  meadow: { id: 'photo-1719765796310-08aa25866174', alt: 'Open meadow beneath a forested mountain' },
  cabinSnow: { id: 'photo-1578222784726-7e10e19e00f9', alt: 'Snow-covered home tucked among pine trees' },
  cabinPond: { id: 'photo-1510798831971-661eb04b3739', alt: 'Wood home near pine trees and a snowy pond' },
  porchSnow: { id: 'photo-1613525041465-88225ec0122a', alt: 'Wood-sided house on snowy ground surrounded by trees' },
  lodgeInterior: { id: 'photo-1786895108322-e81febb2dfb3', alt: 'Modern interior with a polished floor, glass walls and a wood ceiling' },
  roomTrees: { id: 'photo-1770086962009-475699f5633d', alt: 'Empty room with a seamless floor and large windows looking out on trees' },
  greyMarble: { id: 'photo-1515895309288-a3815ab7cf81', alt: 'Close-up of a grey marbled floor surface' },
  hallReflect: { id: 'photo-1774021793488-f2902f8e1321', alt: 'Open hall with a reflective floor under bright lights' },
  galleryWhite: { id: 'photo-1774021792172-5f78c2e17ca8', alt: 'White room with a smooth, reflective floor' },
  sportsGarage: { id: 'photo-1786531568638-600731a4a224', alt: 'White sports car parked on a smooth concrete garage floor' },
  brewery: { id: 'photo-1792955104636-be03d0fb1756', alt: 'Stainless fermentation tanks in a brewery over a wet concrete floor' },
  barrelRoom: { id: 'photo-1781510550278-a056b48098da', alt: 'Production room with wooden barrels, equipment and exposed beams' },
  warehouse: { id: 'photo-1772300704502-410f0fbd43bb', alt: 'Spacious warehouse interior with a smooth concrete floor' },
  crew: { id: 'photo-1772298783095-be38fa901232', alt: 'Two installers working in a large empty warehouse' },
  doorLight: { id: 'photo-1780362507424-a624df756101', alt: 'Concrete room lit by daylight from an open doorway' },
};
