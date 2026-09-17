# Product, Company, and Technology Pages — Design Specification

**Date:** 2026-09-17
**Status:** Approved by the standing site-build decisions in `TASKS.md`

## Goal

Replace the four legacy catch-all pages for Genesis360 systems, BotaniMax,
About Us, and Technology with polished static Astro pages at the quality level
of the agriculture, Human, and HVAC sections. The pages must help a facilities
buyer understand what the products are, how the delivery physics differ, what
is documented, and where to continue without inventing product or compliance
claims.

## Locked decisions

| Decision | Ruling |
| --- | --- |
| Information architecture | Keep the current routes and full-launch mega-menu. |
| Copy | Draft from current page copy, the BotaniMax label/SDS/promo sheets, Technology Explainer, AthleticGuard sheet, and existing copy audits. Marty reviews later. |
| Product names | Compact Wall Mount, AeroGuard, MediGuard Pro, Battery Powered Fogger, AgriGuard. No retired names. |
| Regulatory wording | `EPA Registered (Reg. No. 92089-2-103661)`. Do not use a 25(b), 25(c), or 2(c) category claim. |
| Pricing | No prices or ROI figures. |
| Claims | Use label contact times and document-backed physics/specs only. Avoid unconditional safety, patent, emerging-pathogen, and comparative-superiority claims. |
| Rollout | Static output, soft-launch gated, local commits only. |

## Routes and tiers

| Route | Tier | Purpose |
| --- | --- | --- |
| `/genesis360mistingsystems/` | flagship | Product-family overview and system selector. |
| `/botanimax/` | flagship | Botanical disinfectant, ingredients, label-backed performance, documentation. |
| `/about-us/` | standard+ | Secure Logic story, operating principles, company direction. |
| `/about-us/technology/` | flagship technical | Droplet comparison, sub-10-micron behavior, controls, independent validation. |

All four become static files and are removed from `src/pages/[...slug].astro`.
The production page count remains 43.

## Shared component

Add `src/components/product/ProductHero.astro`, a two-column product/company
hero with:

- `eyebrow`, `headline[]`, `copy`
- `image`, `imageAlt`, optional `logo`
- primary and optional secondary CTA
- `tone="blue" | "green"`
- contained product art at desktop and a compact art panel on mobile

The remainder uses the existing sector primitives (`DifferenceGrid`,
`SectorCta`) and focused page markup. No new dependency is needed.

## Page content

### Genesis360 systems

1. Product hero: “One Platform. Built For Every Space.”
2. Family thesis: the same sub-10-micron delivery principle, configured for
   room, HVAC, clinical, portable, and agricultural deployments.
3. Five-card lineup using current product names and existing renders.
4. Three-point difference grid: droplet behavior, repeatable scheduling,
   configurable deployment.
5. Compact Wall Mount spec panel using the AthleticGuard sheet: one-gallon
   tank, about 85 minutes single-nozzle / 42 minutes dual-nozzle, and a full
   treatment cycle under ten minutes in most applications, with the source
   caveat beside the figures.
6. Documented droplet comparison table shared conceptually with Technology.
7. Closing quote CTA.

### BotaniMax

1. Green product hero with bottle and logo: “Botanical By Design. Registered
   To Perform.”
2. Proof strip: EPA registration number, 100% botanical formula, three named
   botanical ingredients.
3. Ingredient story: thyme oil, wintergreen oil, citrus extracts.
4. Label-backed organism/contact-time cards with the hard, non-porous-surface
   context and a direction to follow the product label.
5. Three-point product grid: multi-modal botanical formula, labeled cleaning /
   disinfecting / deodorizing uses, ready-to-use format.
6. Documentation links and a clear CAUTION/label-use note.
7. Closing CTA.

### About Us

1. Company hero: “Field Experience. Engineered Into A Better System.”
2. Preserve the existing founder story and roles, clearly framed as company
   history rather than a technical claim.
3. Four recurring field problems and the automation response.
4. Principles: precision, repeatability, practicality.
5. A four-step company path: field work, engineering, Genesis360, next.
6. Closing CTA with real product photography.

### Technology

1. Technical hero: “Small Droplets. Whole-Space Behavior.”
2. Documented comparison table: pump 80–300 µm, ULV 20–50 µm,
   electrostatic 40–80 µm, Genesis360 sub-10 µm.
3. Four transport forces named by the Technology Explainer: air turbulence,
   thermal currents, Brownian motion, electrostatic forces.
4. “Dry to Human Touch, Wet to Pathogens” explanation without converting that
   phrase into an unconditional safety claim.
5. Standard timer vs optional smart-control-board explanation.
6. Independent validation panel: Element Materials Technology; at least
   6-log viral and 5-log bacterial reductions in the cited controlled tests.
7. Closing CTA.

## Copy and compliance rules

- `Genesis360` is one word in site copy.
- Source comments sit next to every quantitative or regulatory claim.
- Label contact times apply only under the labeled conditions. Never translate
  log reductions into a made-up percentage.
- Do not say BotaniMax is approved for fogging/misting; the source label does
  not substantiate that wording.
- Do not present emerging-pathogen wording as a standing certification.
- Do not say the BotaniMax formula is patented or patent pending.
- Do not call optional smart controls standard equipment.
- No “safe for electronics,” “no corrosion,” or “environmentally neutral”
  absolute without qualification.

## QA and acceptance

- `npm run build`: 43 pages.
- `npm run check`: no new diagnostics beyond the eight existing homepage
  errors.
- `npm run check:brand` passes.
- No broken internal links; exactly one `h1` per new page.
- No price figures, retired names, `Genesis 360`, or unsupported EPA category
  codes on the four pages.
- Visual review at 500px and 1280px for all four routes; no overflow, broken
  images, clipped product art, unreadable tables, or genuine console errors.

## Questions parked for Marty

The existing Questions 1–8 in `docs/QUESTIONS-FOR-MARTY.md` cover regulatory
wording, BotaniMax/Genesis360 pairing, patent status, kill claims, and final
lineup confirmation. All copy needs his read.
