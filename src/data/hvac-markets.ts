// src/data/hvac-markets.ts
import type { ImageMetadata } from 'astro';
import { Building2, Factory, House } from '@lucide/astro';
import hvacLifespan from '../assets/images/blog-hvac-lifespan.png';
import biofilmHvac from '../assets/images/blog-biofilm-hvac.png';
import hvacMist from '../assets/images/hvac-mist.png';
import residentialPoster from '../assets/images/hero-hvac-residential-poster.jpg';
import commercialPoster from '../assets/images/hero-hvac-commercial-poster.jpg';
import industrialPoster from '../assets/images/hero-hvac-industrial-poster.jpg';
import homeInteriorVideo from '../assets/videos/home-interior.mp4';
import rooftopUnitVideo from '../assets/videos/rooftop-unit.mp4';
import plantAirVideo from '../assets/videos/plant-air.mp4';
import residentialCard from '../assets/images/hvac-card-residential.jpg';
import commercialCard from '../assets/images/hvac-card-commercial.jpg';
import industrialCard from '../assets/images/hvac-rooftop-package.png';

/** Sales Pricing Guide application package that covers a market, or null. */
export type HvacPackage = 'AeroGuard' | null;

export interface Market {
  slug: string;
  title: string;
  icon: typeof House;
  /** One line for the mega-menu and other-markets cards. */
  summary: string;
  /** Opening paragraph; the sector page's argument band starts from it. */
  heroCopy: string;
  /** Thumbnail used by the mega-menu and older cross-links. */
  image: ImageMetadata;
  imageAlt: string;
  postSlugs: string[];
  /** Under the title on the hub's sector card. */
  tagline: string;
  /** The sector card's flip side: the case for this market, one or two sentences. */
  stat: string;
  package: HvacPackage;
  /** Hero media. `video` is a Vite asset URL string; absent = still hero. */
  hero: { poster: ImageMetadata; posterAlt: string; video?: string };
  /** The hub's sector-card photo, when it differs from the hero poster (Marty, Userback 2026-09-25). */
  card?: { image: ImageMetadata; alt: string };
}

export const hvacMarkets: Market[] = [
  {
    slug: 'residential',
    title: 'Residential',
    icon: House,
    summary: 'Whole-home coil and duct treatment that extends system life and improves everyday air quality.',
    heroCopy: 'Your HVAC system is one of the largest investments in your home. Genesis360 AeroGuard treats coils and ductwork with botanical disinfectant, helping extend equipment life and keep everyday indoor air cleaner.',
    image: hvacLifespan,
    imageAlt: 'Technician servicing an outdoor HVAC condenser unit',
    postSlugs: ['how-to-extend-the-lifespan-of-your-hvac-system'],
    tagline: 'Clean air starts inside your HVAC system.',
    // Source H, p.1: "Most odors start in the HVAC ... if the odor originates within the HVAC system, masking it does not solve the problem."
    stat: 'Most household odors start inside the HVAC system. Candles, sprays and plug-ins mask them; if the odor begins at the coil or drain pan, masking it does not solve the problem.',
    // Source G: AeroGuard — "Residential / commercial HVAC", AeroGuard Base, 1 nozzle / digital timer.
    package: 'AeroGuard',
    hero: { poster: residentialPoster, posterAlt: 'Empty, sunlit living room with a ceiling fan and floor air vents', video: homeInteriorVideo },
    // Cropped from hvac-family-home.png (the "Breathe Better" art), family only.
    card: { image: residentialCard, alt: 'A smiling family on the living-room sofa as fresh air flows from a ceiling vent' },
  },
  {
    slug: 'commercial',
    title: 'Commercial',
    icon: Building2,
    summary: 'Scheduled, automated coverage for air handlers serving offices, schools, and shared buildings.',
    heroCopy: 'Biofilm hidden inside coils, drain pans, and ductwork can quietly cut energy efficiency and air quality across an entire building. Genesis360 AeroGuard runs scheduled, automated cycles for air handlers serving offices, schools, and shared buildings.',
    image: biofilmHvac,
    imageAlt: 'HVAC air handling unit coils where biofilm can accumulate',
    postSlugs: ['biofilm-hvac-prevention'],
    tagline: 'Every air handler, on a schedule nobody has to remember.',
    // Source H, p.2: "Restricted airflow from dirty coils and buildup cause increased operating costs."
    stat: 'Dirty coils and drain-pan buildup restrict airflow, so the system works harder, uses more energy and circulates the same contaminants through every room it serves.',
    // Source G: AeroGuard — "Residential / commercial HVAC".
    package: 'AeroGuard',
    hero: { poster: commercialPoster, posterAlt: 'Aerial view of commercial rooftop packaged HVAC units and ductwork', video: rooftopUnitVideo },
    // Unsplash 376KN_ISplE (Unsplash License).
    card: { image: commercialCard, alt: 'Two coworkers sharing a high-five at a desk in a bright, plant-filled office' },
  },
  {
    slug: 'industrial',
    title: 'Industrial',
    icon: Factory,
    summary: 'Large-scale automated coverage for warehouses, plants, and cold storage air systems.',
    heroCopy: 'Warehouses, manufacturing plants, and cold storage facilities run air handling systems around the clock, giving biofilm and airborne contaminants constant conditions to build up in. Genesis360 AeroGuard scales to large air handlers and runs on its own schedule.',
    image: hvacMist,
    imageAlt: 'Genesis360 AeroGuard installed on a large air handling unit',
    postSlugs: [],
    tagline: 'Air systems that never switch off need protection that never does either.',
    stat: 'Around-the-clock air handling gives biofilm constant moisture and airflow to grow in. Scheduled treatment keeps the pathway clean between manual service visits.',
    // Source G lists no industrial package; AeroGuard configurations apply.
    package: null,
    hero: { poster: industrialPoster, posterAlt: 'Warehouse interior with steel roof trusses, support columns, and racking stocked with cable reels and conduit', video: plantAirVideo },
    card: { image: industrialCard, alt: 'Genesis360 AeroGuard mounted on a commercial rooftop HVAC unit, misting the coil' },
  },
];
