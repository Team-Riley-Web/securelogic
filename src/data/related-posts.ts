import { posts, type BlogPost } from './blog-posts';

/**
 * A market's own posts first, then fill from a generic list, deduplicated,
 * capped at `n`. Every "From The Field" row shows the same number of cards.
 */
export function relatedPosts(primary: string[], fill: string[], n = 3): BlogPost[] {
  const slugs = [...primary, ...fill].filter((s, i, a) => a.indexOf(s) === i);
  return slugs.map((s) => posts.find((p) => p.slug === s)).filter((p): p is BlogPost => Boolean(p)).slice(0, n);
}

/** Generic human-health fill, most broadly relevant first. */
export const HUMAN_FILL = [
  'regular-surface-disinfection-in-businesses-is-an-essential-component-in-building-customer-trust',
  'how-to-identify-sick-building-syndrome-and-improve-indoor-air-quality-in-your-building',
  'synthetic-thymol-vs-botanical-thyme-whats-really-in-your-natural-cleaning-product',
  'dont-let-infections-bench-your-team',
  'are-you-missing-these-3-high-risk-hotspots',
  'why-air-quality-in-schools-matters-more-than-you-think',
];
