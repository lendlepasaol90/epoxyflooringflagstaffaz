// Service registry: order here drives the menu, footer and homepage index.
import garage from './winter-garage-floor-coatings.mjs';
import residential from './home-floor-coatings.mjs';
import flake from './flake-chip-floors.mjs';
import polyaspartic from './polyaspartic-coatings.mjs';
import polyurea from './polyurea-coatings.mjs';
import patio from './porch-patio-concrete-coatings.mjs';
import commercial from './commercial-flooring.mjs';
import warehouse from './industrial-floor-coatings.mjs';

export const services = [garage, residential, flake, polyaspartic, polyurea, patio, commercial, warehouse];
export const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
