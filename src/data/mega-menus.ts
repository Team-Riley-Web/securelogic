import { CircleQuestionMark, Cpu, FileCheck, FileText, Leaf, Newspaper, Phone, SprayCan } from '@lucide/astro';
import { humanMarkets } from './human-markets';
import { hvacMarkets } from './hvac-markets';
import { agMarkets } from './ag-markets';

export interface MegaMenuItem {
  icon: typeof Cpu;
  title: string;
  summary: string;
  href: string;
}

export interface MegaMenuGroup {
  label: string;
  href: string;
  /** Column count for this panel's item grid. */
  gridClass: string;
  items: MegaMenuItem[];
}

/**
 * Shared nav taxonomy, mirroring the production Header. Extracted here so the
 * Blueland design tests can render the same information architecture without
 * duplicating it per page. (Header.astro still holds its own copy; it can adopt
 * this module whenever that refactor is wanted.)
 */
export const megaMenus: MegaMenuGroup[] = [
  {
    label: 'Human',
    href: '/human/',
    gridClass: 'sm:grid-cols-2 lg:grid-cols-4',
    items: humanMarkets.map((m) => ({ icon: m.icon, title: m.title, summary: m.summary, href: `/human/${m.slug}/` })),
  },
  {
    label: 'HVAC',
    href: '/hvac/',
    gridClass: 'sm:grid-cols-3',
    items: hvacMarkets.map((m) => ({ icon: m.icon, title: m.title, summary: m.summary, href: `/hvac/${m.slug}/` })),
  },
  {
    label: 'Ag',
    href: '/ag/',
    gridClass: 'sm:grid-cols-3',
    items: agMarkets.map((m) => ({ icon: m.icon, title: m.title, summary: m.summary, href: `/ag/${m.slug}/` })),
  },
  {
    label: 'Resources',
    href: '/resources/',
    gridClass: 'sm:grid-cols-2 lg:grid-cols-4',
    items: [
      { icon: Newspaper, title: 'Blog', summary: 'Insights on botanical disinfectants, misting systems, and indoor air quality.', href: '/blogs/' },
      { icon: FileText, title: 'Brochures', summary: 'Download industry-specific brochures for agriculture, child care, and fitness.', href: '/resources/brochures/' },
      { icon: FileCheck, title: 'Documentation', summary: 'Labels, SDS sheets, lab reports, and technical white papers.', href: '/resources/documentation/' },
      { icon: CircleQuestionMark, title: 'FAQs', summary: 'Answers about micro-droplet physics, coverage, and maintenance.', href: '/resources/faqs/' },
    ],
  },
  {
    label: 'About Us',
    href: '/about-us/',
    gridClass: 'sm:grid-cols-2 lg:grid-cols-4',
    items: [
      { icon: Cpu, title: 'Technology', summary: 'The science behind Genesis 360’s sub-10 micron dry mist.', href: '/about-us/technology/' },
      { icon: Phone, title: 'Contact Us', summary: 'Connect directly with the Genesis 360 team.', href: '/contact-us/' },
      { icon: SprayCan, title: 'Genesis 360', summary: 'Automated misting systems for whole-room disinfection.', href: '/genesis360mistingsystems/' },
      { icon: Leaf, title: 'BotaniMax', summary: '100% botanical disinfectant, EPA registered.', href: '/botanimax/' },
    ],
  },
];
