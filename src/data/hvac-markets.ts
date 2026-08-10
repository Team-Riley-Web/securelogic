import { Building2, Factory, House } from '@lucide/astro';
import hvacLifespan from '../assets/images/blog-hvac-lifespan.png';
import biofilmHvac from '../assets/images/blog-biofilm-hvac.png';
import hvacMist from '../assets/images/hvac-mist.png';

export interface Market {
  slug: string;
  title: string;
  icon: typeof House;
  summary: string;
  heroCopy: string;
  image: typeof hvacLifespan;
  imageAlt: string;
  postSlugs: string[];
}

export const hvacMarkets: Market[] = [
  {
    slug: 'residential',
    title: 'Residential',
    icon: House,
    summary: 'Whole-home coil and duct treatment that extends system life and improves everyday air quality.',
    heroCopy: 'Your HVAC system is one of the largest investments in your home. 360HVAC Mist treats coils and ductwork with botanical disinfectant, helping extend equipment life and keep everyday indoor air cleaner.',
    image: hvacLifespan,
    imageAlt: 'Technician servicing an outdoor HVAC condenser unit',
    postSlugs: ['how-to-extend-the-lifespan-of-your-hvac-system'],
  },
  {
    slug: 'commercial',
    title: 'Commercial',
    icon: Building2,
    summary: 'Scheduled, automated coverage for air handlers serving offices, schools, and shared buildings.',
    heroCopy: 'Biofilm hidden inside coils, drain pans, and ductwork can quietly cut energy efficiency and air quality across an entire building. 360HVAC Mist runs scheduled, automated cycles for air handlers serving offices, schools, and other shared buildings.',
    image: biofilmHvac,
    imageAlt: 'HVAC air handling unit coils where biofilm can accumulate',
    postSlugs: ['biofilm-hvac-prevention'],
  },
  {
    slug: 'industrial',
    title: 'Industrial',
    icon: Factory,
    summary: 'Large-scale automated coverage for warehouses, plants, and cold storage air systems.',
    heroCopy: 'Warehouses, manufacturing plants, and cold storage facilities run air handling systems around the clock, giving biofilm and airborne contaminants constant conditions to build up in. 360HVAC Mist scales to large-volume air systems with the same automated, programmable coverage as our other platforms.',
    image: hvacMist,
    imageAlt: 'Genesis 360 HVAC misting system installed on a large air handling unit',
    postSlugs: [],
  },
];
