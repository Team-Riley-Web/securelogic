import { Beef, Bird, Sprout } from '@lucide/astro';
import pigFarming from '../assets/images/blog-pig-farming.png';
import poultryBiosecurity from '../assets/images/blog-poultry-biosecurity.png';
import greenhouse from '../assets/images/blog-greenhouse.png';

export interface Market {
  slug: string;
  title: string;
  icon: typeof Beef;
  summary: string;
  heroCopy: string;
  image: typeof pigFarming;
  imageAlt: string;
  postSlugs: string[];
}

export const agMarkets: Market[] = [
  {
    slug: 'hogs-livestock',
    title: 'Hogs & Livestock',
    icon: Beef,
    summary: 'Seasonal disinfection strategy for farrowing houses and grow-finish barns, built around ROI and herd health.',
    heroCopy: 'Seasonal shifts in temperature and humidity change how pathogens behave in farrowing houses and grow-finish barns. AgGriGuard Mist and BAC Ag deliver a disinfection strategy built around herd health and measurable return on investment.',
    image: pigFarming,
    imageAlt: 'Indoor pig farming facility with controlled housing pens',
    postSlugs: ['summer-vs-fall-rethinking-seasonal-cleaning-strategies-in-indoor-pig-farming'],
  },
  {
    slug: 'poultry',
    title: 'Poultry',
    icon: Bird,
    summary: 'Biosecurity protocols that protect flocks from HPAI and other pathogens without disrupting operations.',
    heroCopy: 'Highly Pathogenic Avian Influenza and other pathogens can devastate a flock without warning. Genesis 360 AgMist and BotaniMax bring automated biosecurity protocols to poultry farms without disrupting daily operations.',
    image: poultryBiosecurity,
    imageAlt: 'Poultry farm interior where biosecurity protocols protect the flock',
    postSlugs: ['biosecurity-in-poultry-farms-starts-with-proper-disinfection'],
  },
  {
    slug: 'indoor-growing',
    title: 'Indoor Growing',
    icon: Sprout,
    summary: 'Microbial risk reduction for cannabis, greenhouse, and vertical farming operations under controlled conditions.',
    heroCopy: 'Controlled environments give growers consistency that outdoor farming cannot, but the same stable conditions that help plants thrive can also support unwanted microbial growth. Automated misting reduces that risk without wetting foliage or disrupting production.',
    image: greenhouse,
    imageAlt: 'Indoor greenhouse growing facility with rows of leafy crops',
    postSlugs: ['indoor-growing-facilities-microbial-risk-prevention', 'reducing-microbial-risk-to-improve-cannabis-crop-yield'],
  },
];
