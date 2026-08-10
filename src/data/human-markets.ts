import { Dumbbell, GraduationCap, HeartPulse, ShieldCheck } from '@lucide/astro';
import schoolAirQuality from '../assets/images/blog-school-air-quality.png';
import wrestling from '../assets/images/blog-wrestling.png';
import portableMist from '../assets/images/portable-mist.png';
import medicalMist from '../assets/images/medical-mist.png';

export interface Market {
  slug: string;
  title: string;
  icon: typeof GraduationCap;
  summary: string;
  heroCopy: string;
  image: typeof schoolAirQuality;
  imageAlt: string;
  postSlugs: string[];
}

export const humanMarkets: Market[] = [
  {
    slug: 'schools',
    title: 'Schools',
    icon: GraduationCap,
    summary: 'Classrooms, cafeterias, and buses where indoor air quality affects learning and attendance.',
    heroCopy: 'Airborne viruses, mold in HVAC systems, and poor ventilation quietly affect student health and attendance. Genesis 360 delivers repeatable, automated coverage across classrooms, cafeterias, and transport fleets without disrupting the school day.',
    image: schoolAirQuality,
    imageAlt: 'School entrance sign, a setting for indoor air quality treatment',
    postSlugs: ['why-air-quality-in-schools-matters-more-than-you-think', 'how-to-identify-sick-building-syndrome-and-improve-indoor-air-quality-in-your-building'],
  },
  {
    slug: 'athletics',
    title: 'Athletics',
    icon: Dumbbell,
    summary: 'Wrestling rooms, weight rooms, and locker rooms where staph and ringworm spread fastest.',
    heroCopy: 'Staph infections and ringworm outbreaks do not come from the mats alone. Genesis 360 and BotaniMax treat mats, weight rooms, and locker rooms with automated, whole-room coverage that manual wipe-downs cannot match.',
    image: wrestling,
    imageAlt: 'Two wrestlers training in a gym with illustrated pathogens nearby',
    postSlugs: ['are-you-missing-these-3-high-risk-hotspots', 'dont-let-infections-bench-your-team'],
  },
  {
    slug: 'military',
    title: 'Military',
    icon: ShieldCheck,
    summary: 'Barracks, common rooms, and mobile units where outbreaks travel through close quarters.',
    heroCopy: 'Close quarters and shared equipment let illness move fast through barracks, common rooms, and mobile units. Portable and fixed Genesis 360 systems bring automated, no-touch disinfection to mission-critical spaces.',
    image: portableMist,
    imageAlt: 'Portable Genesis 360 misting system unit',
    postSlugs: ['how-to-stop-infections-before-they-spread-at-sea'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    icon: HeartPulse,
    summary: 'Patient rooms, clinics, and isolation areas where infection control is non-negotiable.',
    heroCopy: 'Patient rooms, dialysis clinics, and isolation areas demand infection control that does not depend on manual consistency. Genesis 360 Medical Mist delivers automated, programmable cycles built for clinical environments.',
    image: medicalMist,
    imageAlt: 'Genesis 360 Medical Mist system product',
    postSlugs: ['regular-surface-disinfection-in-businesses-is-an-essential-component-in-building-customer-trust'],
  },
];
