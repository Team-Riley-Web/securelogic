# HVAC Section Design

Sub-project 2 of 5 in the full-site build-out. Decisions taken with Joshua on
2026-09-17; recorded under "Decisions". Follows the Human section spec
(`2026-09-16-human-section-design.md`) and reuses its sector blocks.

## Goal

Bring the four HVAC pages to the quality of the agriculture and Human
sections: the `/hvac/` hub and the Residential, Commercial and Industrial
sector pages. Residential is the flagship; Commercial is standard+; Industrial
is a lean standard page, mirroring the Human tiers.

## Decisions

| Question | Decision |
| --- | --- |
| Markets and tiers | Residential (flagship), Commercial (standard+), Industrial (standard, lean). All three current URLs stay. |
| Audience | Homeowner voice on Residential, as in the brochure, with a contractor path: a secondary "For HVAC professionals" block. Commercial and Industrial speak to facility owners and managers. |
| Residential modules | HVAC coverage map (interactive cutaway), "What could be hiding" awareness list, "How it works" steps. No UV or IAQ-device comparison module (comparative claims need Marty; parked). |
| Footage | Free stock clips (Mixkit or Pexels), same acceptance rule and crop as the Human clips; still renders as fallback. |
| Copy source | Genesis360 HVAC brochure (2 pages), the Sales Pricing Guide (AeroGuard configurations and package, names only), the Technology Explainer and lab report for mechanism claims, existing HVAC market copy and the two HVAC blog posts. No prices. |

## Non-goals

- No changes to `Header.astro`, `Footer.astro`, `MegaMenu.astro`,
  `mega-menus.ts`, `public/_redirects`, `launch-gate.ts`, or `src/pages/ag/*`.
- No comparison against UV or other IAQ devices (parked; see Questions for
  Marty).
- No new blog posts.
- The `about-us/technology` and product pages are sub-project 3, not this.

## Pages

| Route | Tier | File | Replaces |
| --- | --- | --- | --- |
| `/hvac/` | hub | `src/pages/hvac/index.astro` | the `hvac` branch of `src/pages/[...slug].astro` |
| `/hvac/residential/` | flagship | `src/pages/hvac/residential.astro` | `src/pages/hvac/[slug].astro` |
| `/hvac/commercial/` | standard+ | `src/pages/hvac/commercial.astro` | same |
| `/hvac/industrial/` | standard | `src/pages/hvac/industrial.astro` | same |

When all three static pages exist, `hvac/[slug].astro` is deleted and `'hvac'`
is removed from the catch-all's `getStaticPaths` with its branch. Built page
count stays 43.

## Components

Existing sector blocks are reused unchanged: `SectorHero`, `ArgumentBand`
(with the `statPosition` prop added by Batch B), `StatBand`, `CompareBand`,
`DeploymentCards`, `DifferenceGrid`, `SectorCards`, `OtherMarkets`,
`PostsRow`, `SectorCta` (with the `photo` variant added by Batch A).

Two blocks are added to `src/components/sector/`:

| Component | Origin | Props (summary) |
| --- | --- | --- |
| `CoverageMap` | extracted from the hog page's coverage-map section and its `barn-*` styles, generalized (`barn-` classes become `map-`) | `eyebrow`, `heading`, `lede`, `art` (ImageMetadata), `artAlt`, `mobileHeading`, `mobileCopy`, `points[] {key, label, sub?, copy, icon, side, callout {x,y}, anchor {x,y}}`, `stageAspect` (number, default 1.98), `artWidth` (percent, default 54). The hog page is **not** refactored onto it in this sub-project; the block is a copy so the hog page stays byte-identical. |
| `StepsBand` | new | `eyebrow`, `heading`, `lede`, `steps[] {title, copy}` rendered as a numbered vertical list on the light ground with a side image (`image`, `imageAlt`) at `lg`. |

The awareness list uses `CompareBand` inside `StatBand` on the flagship, so no
new block is needed for it.

## Data

`src/data/hvac-markets.ts` keeps its fields (`mega-menus.ts` reads `slug`,
`title`, `icon`, `summary`) and gains the same additions the Human data got:
`tagline`, `stat`, `package` (`'AeroGuard' | null`), and
`hero { poster, posterAlt, video? }`. Retired names are gone already (the
audit fix wave renamed "360HVAC" to AeroGuard).

## Page-by-page content

Every sector page: `SectorHero`, then the modules below, then `PostsRow`
(three posts; HVAC has only two HVAC posts, so the sick-building post fills
the third, per Joshua's "always three" rule), `OtherMarkets`, `SectorCta`.
All CTAs go to `/get-a-quote/`. Every claim carries a source comment.

### `/hvac/` hub

1. `SectorHero` split layout; eyebrow "HVAC"; headline "Cleaner Coils.
   Cleaner Ducts. / Cleaner Air."; support "One Platform. Every Air Handler."
   Lede adapted from the brochure's "Clean Air Starts Inside Your HVAC System"
   opening. Footage: the existing `application-hvac.mp4` rooftop clip until a
   better hub clip is sourced; poster from `AeroGuard on HVAC.png`.
2. Mission band (ag/Human pattern): brochure's "Most odors start in the HVAC"
   paragraph and the "One system to reach the HVAC pathway" paragraph.
3. `SectorCards` with three cards (Residential first), each with its `stat`.
4. `DifferenceGrid`: the brochure's "Why homeowners should ask for Genesis360"
   list reduced to three: cleaner pathways, reduced odor-causing buildup,
   hidden wet mechanical areas targeted.
5. `PostsRow`, `SectorCta` (default variant, "Your Building. Your Coverage
   Plan.").

### `/hvac/residential/` (flagship)

1. `SectorHero`: stock clip of a bright home interior with a ceiling vent or
   air handler; eyebrow "Residential"; headline "Clean Air Starts Inside /
   Your HVAC System." (brochure, verbatim); support "Your air conditioner
   moves the air your family breathes every day."
2. `ArgumentBand` with image `AeroGuard on HVAC.png`, stat right: value
   "Twice a year", caption "is all the maintenance the system asks for"
   (brochure: "Suggested twice a year observation ... and to refill the
   liquid tank"); heading "What Could Be Hiding Inside Your HVAC System?"
   (brochure); paragraphs from the brochure's page-2 explanation of the
   coil, drain pan and duct pathway.
3. `CoverageMap`: art `HVAC Diagram of whole HVAC system setup.png`
   (1536x1024); six points: Outdoor Condenser (context only), Air Handler /
   Furnace Cabinet, Evaporator Coil, Drain Pan, Ductwork, Supply Vents.
   Copy per point from the brochure and the lab report's HVAC delivery
   sentence. Mobile falls back to the card grid like the hog page.
4. `DeploymentCards`, two cards from the Sales Pricing Guide: **AeroGuard**
   (Base: one nozzle, digital timer; installs at the air handler after a
   manual coil clean; render `Genesis360_Compact_HVAC_iso1_clear1.png`) and
   **AeroGuard + Smart/App** (PLC Smart Board/App: schedule and monitor from
   a phone; dual-nozzle upgrade for larger handlers; render
   `HVAC Residential Closet Unit.png`). Heading "One Platform. Two Ways To
   Deploy It."
5. `StatBand` + `CompareBand` as the awareness module: eyebrow "What
   Homeowners Should Know"; heading "Masking An Odor Doesn't Fix Where It
   Starts."; figures: "4" ("things homeowners should be aware of", brochure)
   and "2×" ("a year: the suggested check and refill"); Today list = the
   brochure's four concerns (sensitive occupants, clogged drain pans,
   restricted airflow and cost, musty odors); With Genesis360 list = the
   brochure's four benefits. Image pairing: `Clean HVAC vs Dirty.png` is
   used in `StepsBand` below, not here.
6. `StepsBand`: "How It Works", the brochure's five steps verbatim in title,
   paraphrased in copy; side image `Clean HVAC vs Dirty.png`.
7. Contractor path: a short two-column band (reuse the `DifferenceGrid`
   closing panel style) titled "For HVAC Professionals": one paragraph on
   adding Genesis360 to a maintenance offering, install-after-clean note, and
   a link to `/get-a-quote/` labelled "Talk To Us About Dealer Pricing"
   (no figures).
8. `PostsRow`, `OtherMarkets`, `SectorCta` photo variant with
   `Image of a family happy in home with better IAQ.png`.

### `/hvac/commercial/` (standard+)

1. `SectorHero`: stock clip of a rooftop unit or mechanical room; eyebrow
   "Commercial"; headline "Complete Coverage. / Every Air Handler."
2. `ArgumentBand` with image `HVAC Commercial RoofTop Package.png`, no stat;
   heading "Biofilm Doesn't Stay In The Mechanical Room."; existing heroCopy
   plus the lab report's HVAC-delivery sentence.
3. `DeploymentCards`, two cards: AeroGuard + Dual Nozzle for rooftop and
   large air handlers; AeroGuard + Smart/App for scheduled, monitored cycles
   across a building.
4. `PostsRow`, `OtherMarkets`, `SectorCta`.

### `/hvac/industrial/` (standard)

1. `SectorHero`: stock clip of a plant or warehouse air system, else the
   still `Genesis360 Fogger in HVAC Mechanical.png`; eyebrow "Industrial";
   headline "Complete Coverage. / Around The Clock."
2. `ArgumentBand` centered: existing heroCopy; no new claims.
3. `DeploymentCards`, two cards: AeroGuard + Dual + Smart/App; Battery
   Powered Fogger for mechanical rooms and equipment.
4. `PostsRow`, `OtherMarkets`, `SectorCta`.

## Copy rules

Same as the Human spec: `Genesis360` one word; product names exactly as the
pricing guide (AeroGuard, AeroGuard + Dual Nozzle, AeroGuard + Smart/App,
Battery Powered Fogger, PLC Smart Board/App); no prices; source comment
beside every claim; the brochure's disclaimer "Results depend on application
methods, the condition of the system, maintenance practice, and professional
installation." appears once on the residential page in small type.

## Assets

Renders copied from `reference-files/renders/` into `src/assets/images/`
with kebab-case `hvac-` names; posters exported as 1280-wide JPEGs; stock
clips cropped to 1280x720, muted, about 12 s, recorded in `STOCK-SOURCES.md`.

## Testing and QA

Same as the Human spec: build at 43 pages, `astro check` at the 8-error
baseline, brand check, link sweep, one h1 per page, headless-Chrome captures
at 500 and 1280 wide plus a forced-hover probe of the hub cards and the
coverage map callouts, and the assert-html helper for copy.

## Rollout

Behind the gate until full launch; commits local. Built with the
subagent-driven process, in a worktree if other batches are still running.

## Questions parked for Marty

Comparison against UV and IAQ devices; whether the residential page should
carry the brochure's homeowner CTA ("Ask your HVAC professional") verbatim;
dealer pricing language. Added to `docs/QUESTIONS-FOR-MARTY.md`.
