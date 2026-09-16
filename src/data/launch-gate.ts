// Soft-launch switchboard.
//
// The public site is gated: public/_redirects sends every interior page back to
// the landing page at / on the live domains, and the pages that ARE open render
// the shared Header/Footer in `minimal` mode so no nav link leads into a gated
// page. Pages currently open: / and /ag/hogs-livestock/. Soft-launch only: the
// ag section (/ag, /ag/*) forwards to the hog page instead of / -- see the
// `# ag` block in public/_redirects.
//
// When the full site goes live, flip SOFT_LAUNCH to false, delete
// public/_redirects, and copy src/pages/home-full.astro over
// src/pages/index.astro. Nothing else changes.
export const SOFT_LAUNCH = true;

// Enquiries route to the general info@ inbox on the Genesis360 domain, matching
// the rest of the site. (The landing page previously pointed at Marty directly
// to get people confused by the old messaging straight to a decision-maker.)
export const CONTACT_EMAIL = 'info@genesis360.com';

// Where the minimal chrome's Contact links go. The landing page owns the only
// #contact block, so open interior pages point back at it.
export const CONTACT_HREF = '/#contact';

// Every CTA that used to link into a gated interior page now says this.
export const CTA_LABEL = 'Contact Us To Learn More';
