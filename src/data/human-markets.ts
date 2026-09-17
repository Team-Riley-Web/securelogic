import type { ImageMetadata } from 'astro';
import { Dumbbell, GraduationCap, HeartPulse, ShieldCheck } from '@lucide/astro';
import schoolAirQuality from '../assets/images/blog-school-air-quality.png';
import wrestling from '../assets/images/blog-wrestling.png';
import portableMist from '../assets/images/portable-mist.png';
import medicalMist from '../assets/images/medical-mist.png';
import gymPoster from '../assets/images/hero-gym-poster.jpg';
import militaryPoster from '../assets/images/hero-military-poster.jpg';
import classroomVideo from '../assets/videos/classroom.mp4';
import classroomPoster from '../assets/images/hero-classroom-poster.jpg';
import clinicVideo from '../assets/videos/clinic.mp4';
import clinicPoster from '../assets/images/hero-clinic-poster.jpg';

/** Sales Pricing Guide application package that covers a market, or null. */
export type HumanPackage = 'EnviroGuard' | 'MediGuard Pro' | null;

export interface Market {
  slug: string;
  title: string;
  icon: typeof GraduationCap;
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
  /** The sector card's flip side: the economic case, one or two sentences. */
  stat: string;
  package: HumanPackage;
  /** Hero media. `video` is a Vite asset URL string; absent = still hero. */
  hero: { poster: ImageMetadata; posterAlt: string; video?: string };
}

export const humanMarkets: Market[] = [
  {
    slug: 'schools',
    title: 'Schools',
    icon: GraduationCap,
    summary: 'Classrooms, cafeterias, and buses where indoor air quality affects learning and attendance.',
    heroCopy: 'Airborne viruses, mold in HVAC systems, and poor ventilation quietly affect student health and attendance. Genesis360 delivers repeatable, automated coverage across classrooms, cafeterias, and transport fleets without disrupting the school day.',
    image: schoolAirQuality,
    imageAlt: 'School entrance sign, a setting for indoor air quality treatment',
    postSlugs: ['why-air-quality-in-schools-matters-more-than-you-think', 'how-to-identify-sick-building-syndrome-and-improve-indoor-air-quality-in-your-building'],
    tagline: 'Healthy classrooms, from the first bell to the last bus.',
    stat: 'Shared desks, shared air, and a room that turns over every period. Illness moves through a school faster than any wipe-down schedule can follow, and every sick day is a day of learning lost.',
    // Source: Genesis360 Pricing Model - External.docx — EnviroGuard: daycare / early childcare, athletics, fitness, contact sports, and other human spaces.
    package: 'EnviroGuard',
    hero: { poster: classroomPoster, posterAlt: 'Empty school library aisle with tables and bookcases', video: classroomVideo },
  },
  {
    slug: 'athletics',
    title: 'Athletics',
    icon: Dumbbell,
    summary: 'Wrestling rooms, weight rooms, and locker rooms where staph and ringworm spread fastest.',
    heroCopy: 'Staph infections and ringworm outbreaks do not come from the mats alone. Genesis360 and BotaniMax treat mats, weight rooms, and locker rooms with automated, whole-room coverage that manual wipe-downs cannot match.',
    image: wrestling,
    imageAlt: 'Two wrestlers training in a gym with illustrated pathogens nearby',
    postSlugs: ['are-you-missing-these-3-high-risk-hotspots', 'dont-let-infections-bench-your-team'],
    tagline: 'Keeping athletes on the mat, in the weight room, and in the game.',
    // Source: Athletics Competitive Comparison.pdf ("Wrestling Infection Statistics").
    stat: 'Between 60% and 100% of wrestlers pick up at least one skin infection in a typical season, and skin infections are the number one reported cause of lost time in the sport.',
    // Source: Genesis360 Pricing Model - External.docx — EnviroGuard: daycare / early childcare, athletics, fitness, contact sports, and other human spaces.
    package: 'EnviroGuard',
    hero: { poster: gymPoster, posterAlt: 'Genesis360 Compact Wall Mount unit releasing dry mist against a block wall' },
  },
  {
    slug: 'military',
    title: 'Military',
    icon: ShieldCheck,
    summary: 'Barracks, common rooms, and mobile units where outbreaks travel through close quarters.',
    heroCopy: 'Close quarters and shared equipment let illness move fast through barracks, common rooms, and mobile units. Portable and fixed Genesis360 systems bring automated, no-touch disinfection to mission-critical spaces.',
    image: portableMist,
    imageAlt: 'Portable Genesis360 dry fog system unit',
    postSlugs: ['how-to-stop-infections-before-they-spread-at-sea'],
    tagline: 'Ready personnel in the spaces they share.',
    stat: 'Close quarters, shared equipment, and constant turnover make barracks and common rooms the fastest route an outbreak can take through a unit.',
    // Source: Genesis360 Pricing Model - External.docx lists no package for this market.
    package: null,
    hero: { poster: militaryPoster, posterAlt: 'Genesis360 Compact unit mounted in a police station briefing room' },
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    icon: HeartPulse,
    summary: 'Patient rooms, clinics, and isolation areas where infection control is non-negotiable.',
    heroCopy: 'Patient rooms, dialysis clinics, and isolation areas demand infection control that does not depend on manual consistency. Genesis360 delivers automated, programmable cycles built for clinical environments.',
    image: medicalMist,
    imageAlt: 'Genesis360 Compact dry fog system in a clinical setting',
    postSlugs: ['regular-surface-disinfection-in-businesses-is-an-essential-component-in-building-customer-trust'],
    tagline: 'Consistent infection control that does not depend on who is on shift.',
    stat: 'Infection control in a clinic is only as consistent as the last person who cleaned the room. Automated whole-room cycles take the variability, and the labor, out of it.',
    // Source: Genesis360 Pricing Model - External.docx — MediGuard Pro: healthcare, urgent care, dialysis, aging care, outpatient, family practice, dental / orthodontics.
    package: 'MediGuard Pro',
    hero: { poster: clinicPoster, posterAlt: 'Clinician in full PPE sterilizing dental instruments in an autoclave', video: clinicVideo },
  },
];
