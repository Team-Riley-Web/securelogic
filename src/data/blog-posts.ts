import type { ImageMetadata } from 'astro';
import sickBuilding from '../assets/images/blog-sick-building.png';
import cannabis from '../assets/images/blog-cannabis.png';
import wrestling from '../assets/images/blog-wrestling.png';
import greenhouse from '../assets/images/blog-greenhouse.png';
import biofilmHvac from '../assets/images/blog-biofilm-hvac.png';
import schoolAirQuality from '../assets/images/blog-school-air-quality.png';
import newfieldsAg from '../assets/images/blog-newfields-ag.png';
import pigFarming from '../assets/images/blog-pig-farming.png';
import infectionsAtSea from '../assets/images/blog-infections-at-sea.png';
import lockerRoom from '../assets/images/blog-locker-room.png';
import surfaceDisinfection from '../assets/images/blog-surface-disinfection.png';
import thymolVsThyme from '../assets/images/blog-thymol-vs-thyme.png';
import poultryBiosecurity from '../assets/images/blog-poultry-biosecurity.png';
import hvacLifespan from '../assets/images/blog-hvac-lifespan.png';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  isoDate: string;
  excerpt: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
  tags: string[];
  body: string;
}

const bodies = import.meta.glob<string>('./blog-bodies/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function body(slug: string): string {
  const html = bodies[`./blog-bodies/${slug}.html`];
  if (!html) throw new Error(`Missing blog body for "${slug}"`);
  return html;
}

const entries: Omit<BlogPost, 'body'>[] = [
  {
    slug: 'how-to-identify-sick-building-syndrome-and-improve-indoor-air-quality-in-your-building',
    title: 'How to Identify Sick Building Syndrome and Improve Indoor Air Quality in Your Building',
    date: 'March 27, 2026',
    isoDate: '2026-03-27',
    excerpt:
      'Someone feels fine on the weekend. Then Monday hits: dry eyes, scratchy throat, headache, brain fog, fatigue. That pattern has a name.',
    description:
      'A building can look flawless and still create symptoms because Sick Building Syndrome often results from a combination of small issues that add up.',
    image: sickBuilding,
    imageAlt: 'Office workers in a building showing signs of poor indoor air quality',
    tags: ['Indoor Air Quality', 'Sick Building Syndrome'],
  },
  {
    slug: 'reducing-microbial-risk-to-improve-cannabis-crop-yield',
    title: 'Reducing Microbial Risk to Improve Cannabis Crop Yield',
    date: 'January 26, 2026',
    isoDate: '2026-01-26',
    excerpt:
      'Indoor cultivation gives cannabis growers consistency, but the same stable conditions that help plants thrive can also support unwanted microbial growth.',
    description:
      'Why controlled indoor cannabis environments can increase microbial risk, and how automated environmental disinfection helps protect yield and consistency.',
    image: cannabis,
    imageAlt: 'Indoor cannabis cultivation facility under controlled lighting',
    tags: ['Cannabis Cultivation', 'Microbial Control', 'Automated Disinfection'],
  },
  {
    slug: 'are-you-missing-these-3-high-risk-hotspots',
    title: 'Are You Missing These 3 High-Risk Hotspots?',
    date: 'October 8, 2025',
    isoDate: '2025-10-08',
    excerpt:
      'You scrub the mats religiously and preach shower discipline. And yet staph infections still sideline your athletes. Your mats are not the problem.',
    description:
      'Staph and ringworm outbreaks are not caused by your mats. Discover the 3 hidden hygiene hotspots every wrestling coach overlooks.',
    image: wrestling,
    imageAlt: 'Wrestling room mats where pathogens can spread between athletes',
    tags: ['Wrestling Hygiene', 'Athlete Safety', 'Staph Infection Prevention'],
  },
  {
    slug: 'indoor-growing-facilities-microbial-risk-prevention',
    title: 'How Indoor Growing Facilities Can Protect Crops from Bacterial and Fungal Threats',
    date: 'September 10, 2025',
    isoDate: '2025-09-10',
    excerpt:
      'Indoor farming has changed the landscape of agriculture, but the systems designed to protect crops can also create conditions that let pathogens thrive.',
    description:
      'Indoor farming can create the perfect environment for pathogens like bacteria, fungi, and mold. Learn how layered prevention strategies protect your crops.',
    image: greenhouse,
    imageAlt: 'Indoor greenhouse growing facility with rows of leafy crops',
    tags: ['Indoor Agriculture', 'Crop Protection', 'Pathogen Prevention'],
  },
  {
    slug: 'biofilm-hvac-prevention',
    title: 'Understanding the Impact of Biofilm on HVAC Systems and How to Prevent It',
    date: 'September 10, 2025',
    isoDate: '2025-09-10',
    excerpt:
      'Air handling systems move air across filters, coils, drip pans, and ducts. Those conditions support biofilm, and biofilm resists standard cleaning.',
    description:
      'Biofilm in HVAC systems can harm air quality and energy efficiency. Learn how it forms, why it matters, and smart strategies to prevent costly buildup.',
    image: biofilmHvac,
    imageAlt: 'HVAC air handling unit coils where biofilm can accumulate',
    tags: ['Biofilm', 'HVAC Maintenance', 'Indoor Air Quality'],
  },
  {
    slug: 'why-air-quality-in-schools-matters-more-than-you-think',
    title: 'Why Air Quality in Schools Matters More Than You Think',
    date: 'July 15, 2025',
    isoDate: '2025-07-15',
    excerpt:
      'One of the most significant risks to student health is not something we can see. Airborne viruses and irritants affect students every single day.',
    description:
      'Poor indoor air quality can harm student health and learning. Learn what is in the air, how it impacts kids, and what educators and parents can do.',
    image: schoolAirQuality,
    imageAlt: 'Students seated in a classroom where indoor air quality affects learning',
    tags: ['School Air Quality', 'Student Health', 'Indoor Air Quality'],
  },
  {
    slug: 'secure-logic-newfields-ag-botanical-disinfection-partnership',
    title: 'Press Release: Secure Logic and Newfields Ag Partner on Agricultural Disinfection',
    date: 'July 15, 2025',
    isoDate: '2025-07-15',
    excerpt:
      'Secure Logic has partnered with Newfields Ag to launch a breakthrough solution for pathogen control in agriculture, combining BotaniMax with automated misting.',
    description:
      'Secure Logic and Newfields Ag partner to launch BotaniMax, a 100% botanical disinfectant and automated misting system transforming agricultural biosecurity.',
    image: newfieldsAg,
    imageAlt: 'Secure Logic and Newfields Ag partnership announcement graphic',
    tags: ['Press Release', 'Agricultural Disinfection', 'BotaniMax'],
  },
  {
    slug: 'summer-vs-fall-rethinking-seasonal-cleaning-strategies-in-indoor-pig-farming',
    title: 'Summer vs. Fall: Rethinking Seasonal Cleaning Strategies in Indoor Pig Farming',
    date: 'July 8, 2025',
    isoDate: '2025-07-08',
    excerpt:
      'Seasonal shifts bring changes in temperature, humidity, and pathogen behavior, all of which should influence how facilities are cleaned.',
    description:
      'Disinfection in pig farming is not one-size-fits-all. Learn how to adapt your sanitation strategy from summer to fall using botanical tools and smart tech.',
    image: pigFarming,
    imageAlt: 'Indoor pig farming facility with controlled housing pens',
    tags: ['Pig Farming', 'Livestock Biosecurity', 'Seasonal Cleaning'],
  },
  {
    slug: 'how-to-stop-infections-before-they-spread-at-sea',
    title: 'How to Stop Infections Before They Spread at Sea',
    date: 'June 24, 2025',
    isoDate: '2025-06-24',
    excerpt:
      'Marine vessels present unique infection control challenges. Close quarters, shared spaces, and limited medical access let one illness become many.',
    description:
      'Confined ships and offshore platforms are hotspots for outbreaks. Discover how Secure Logic disinfection systems help stop infections before they spread.',
    image: infectionsAtSea,
    imageAlt: 'Marine vessel at sea where confined spaces increase infection risk',
    tags: ['Ship Disinfection', 'Marine Health Safety', 'Norovirus Prevention'],
  },
  {
    slug: 'dont-let-infections-bench-your-team',
    title: 'Don’t Let Infections Bench Your Team',
    date: 'June 11, 2025',
    isoDate: '2025-06-11',
    excerpt:
      'What happens when a key player is sidelined, not by injury, but by an infection picked up from the locker room floor?',
    description:
      'Infections like MRSA and ringworm can derail sports seasons. Learn how to keep athletic facilities safer with targeted disinfection tools and best practices.',
    image: lockerRoom,
    imageAlt: 'Athletic locker room requiring regular disinfection',
    tags: ['Sports Hygiene', 'MRSA in Sports', 'Infection Prevention'],
  },
  {
    slug: 'regular-surface-disinfection-in-businesses-is-an-essential-component-in-building-customer-trust',
    title: 'Regular Surface Disinfection in Businesses Is an Essential Component in Building Customer Trust',
    date: 'May 20, 2025',
    isoDate: '2025-05-20',
    excerpt:
      'Cleanliness is not just about appearances. Routine surface disinfection has become a quiet but powerful way to earn customer confidence.',
    description:
      'Discover why regular surface disinfection is more than hygiene. Learn how it becomes a trust-building strategy that protects people and your brand.',
    image: surfaceDisinfection,
    imageAlt: 'Business staff disinfecting a customer-facing counter surface',
    tags: ['Customer Trust', 'Commercial Cleaning', 'Business Cleanliness'],
  },
  {
    slug: 'synthetic-thymol-vs-botanical-thyme-whats-really-in-your-natural-cleaning-product',
    title: 'Synthetic Thymol vs. Botanical Thyme: What’s Really in Your “Natural” Cleaning Product?',
    date: 'April 22, 2025',
    isoDate: '2025-04-22',
    excerpt:
      'Thymol is a powerful natural compound found in thyme and oregano. It is frequently used in disinfectants, but not all thymol is created equally.',
    description:
      'Curious about the difference between thymol and botanical thyme in natural disinfectants? Learn which is safer and more effective for your facility.',
    image: thymolVsThyme,
    imageAlt: 'Fresh thyme sprigs beside a botanical cleaning product',
    tags: ['Botanical Disinfectant', 'Natural Cleaning Products', 'BotaniMax'],
  },
  {
    slug: 'biosecurity-in-poultry-farms-starts-with-proper-disinfection',
    title: 'Biosecurity in Poultry Farms Starts with Proper Disinfection',
    date: 'April 8, 2025',
    isoDate: '2025-04-08',
    excerpt:
      'Pathogens such as highly pathogenic avian influenza can devastate flocks and harm human health. Rigorous protocols are essential to mitigate the threat.',
    description:
      'Improve poultry farm biosecurity with eco-friendly disinfection solutions like BotaniMax and AgMist to protect flocks, workers, and productivity.',
    image: poultryBiosecurity,
    imageAlt: 'Poultry farm interior where biosecurity protocols protect the flock',
    tags: ['Poultry Biosecurity', 'HPAI Prevention', 'Farm Sanitation'],
  },
  {
    slug: 'how-to-extend-the-lifespan-of-your-hvac-system',
    title: 'How to Extend the Lifespan of Your HVAC System',
    date: 'October 28, 2024',
    isoDate: '2024-10-28',
    excerpt:
      'Your HVAC system maintains comfort, regulates air quality, and impacts energy efficiency. Like any major appliance, it needs proper care to last.',
    description:
      'Prolong your HVAC system lifespan while saving on costs with botanical disinfectant and the Genesis 360 Misting System.',
    image: hvacLifespan,
    imageAlt: 'Technician servicing an outdoor HVAC condenser unit',
    tags: ['HVAC Maintenance', 'Duct Cleaning', 'Energy Efficiency'],
  },
];

export const posts: BlogPost[] = entries.map((entry) => ({ ...entry, body: body(entry.slug) }));
