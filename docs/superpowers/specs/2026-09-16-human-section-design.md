# Human Section Design

Sub-project 1 of 5 in the full-site build-out. Approved in conversation with
Joshua on 2026-09-16; decisions are recorded in "Decisions" below.

## Goal

Bring the five Human pages up to the quality of the agriculture section: the
`/human/` hub and the Athletics, Healthcare, Schools, and Military sector
pages. "Quality" is defined by the two tiers the ag section already has:

- **Flagship** (the hog page): video hero, argument band with a headline
  stat, deployment cards, a cost-of-waiting stat band, a today-versus-
  Genesis360 comparison, related posts, closing CTA.
- **Standard** (poultry, indoor growing): video hero, argument band, related
  posts, other-markets grid, closing CTA.

Athletics is the Human flagship. Healthcare, Schools, and Military are
standard tier, each with one or two extra modules where a source supports it.

## Decisions

| Question | Decision |
| --- | --- |
| Site structure | Keep the current IA and mega-menu design. The Aug 19 deck's five-item nav is a soft-launch nav only. |
| Copy source | Claude drafts from the brochures and PDFs in `reference-files/` plus existing page copy. Marty reviews page by page. Nothing invented beyond those sources. |
| Build order | Human, HVAC, then product/about/technology, then resources/utility pages, then blog templates. Each is its own sub-project. |
| Shop | Out of scope. Get A Quote and the Pipedrive form remain the conversion path. |
| Build approach | Shared sector blocks, per-page composition (approach C). |
| Military | Kept, standard tier, lean. |
| Athletics ROI figures | Qualitative only. No dollar figures on the public page. |

## Non-goals

- No changes to the ag pages, the header, the mega-menu, or the footer.
- No changes to the soft-launch gate (`public/_redirects`,
  `src/data/launch-gate.ts`). Human pages stay gated until the full launch.
- No pricing anywhere. The Sales Pricing Guide is confidential; only its
  package names and configurations are used.
- No new blog posts. Related-reading uses the existing posts.
- No HVAC work, even though the blocks are designed to be reused there.

## Pages

| Route | Tier | File | Replaces |
| --- | --- | --- | --- |
| `/human/` | hub | `src/pages/human/index.astro` | the `human` branch of `src/pages/[...slug].astro` |
| `/human/athletics/` | flagship | `src/pages/human/athletics.astro` | `src/pages/human/[slug].astro` |
| `/human/healthcare/` | standard+ | `src/pages/human/healthcare.astro` | same |
| `/human/schools/` | standard+ | `src/pages/human/schools.astro` | same |
| `/human/military/` | standard | `src/pages/human/military.astro` | same |

When all four static sector pages exist, `human/[slug].astro` is deleted and
`'human'` is removed from the catch-all's `getStaticPaths` list along with its
branch, so no route is generated twice. (The ag section left `ag/[slug].astro`
in place as dead code; this section does not repeat that.)

## Component architecture

New shared blocks live in `src/components/sector/`. Each takes plain props, has
no knowledge of which market it is rendering, and matches the markup and
classes of the ag module it is extracted from so the two sections look
identical. The ag pages are **not** refactored onto them in this sub-project.

| Component | Extracted from | Props (summary) |
| --- | --- | --- |
| `SectorHero` | hog/poultry hero, ag hub hero | `layout` (`'center'` for sector pages, `'split'` for the hub's right-hand media panel), `eyebrow`, `headline` (two lines, second in lime), `support`, `video?`, `poster`, `cta {href,label}`, `secondaryCta?`. Falls back to a still image with the same overlay when `video` is absent. |
| `ArgumentBand` | hog "The Reality In Every Barn" | `eyebrow`, `heading`, `paragraphs[]`, `image`, `imageAlt`, `stat? {value, caption}`. Variant `centered` renders the poultry-style text-only band when there is no image. |
| `StatBand` | hog "The Cost Of Waiting" | `eyebrow`, `heading`, `lede`, `figures[2] {value, label, copy}`. |
| `CompareBand` | hog Today vs With Genesis360 | `todayHeading`, `today[]`, `withHeading`, `with[]`. Rendered inside `StatBand` on the hog page; here it is its own block so standard pages can use it alone. |
| `DeploymentCards` | hog "One Platform. Three Ways To Deploy It." | `heading`, `intro`, `cards[] {device, deviceCopy, image, imageAlt, facility, facilityCopy, icon}`. |
| `DifferenceGrid` | ag hub "Deployment Is The Difference" | `eyebrow`, `heading`, `lede`, `points[] {icon, title, copy}`, `closing {lead, aside}`. |
| `CaseStudyBand` | new, for athletics | `eyebrow`, `heading`, `intro`, `glance[] {label, value}`, `quotes[] {text, attribution}`, `source`. Dark gradient ground like `StatBand`. |
| `SectorCards` | ag hub blue box row | `heading`, `prompt`, `cards[] {title, tagline, href, linkLabel, image, imageAlt, stat}`, `checklist[] {icon, label}`. |
| `OtherMarkets` | poultry "Other Agriculture Markets" | `heading`, `markets[] {slug, title, summary, icon}`, `basePath`. |
| `PostsRow` | `AgPostsRow` | `posts`, `heading` (default "From The Field"), `showReadMore`. `AgPostsRow` becomes a one-line wrapper so ag pages are untouched. |
| `SectorCta` | `AgCta` | same props as `AgCta` plus `label` (default "Get A Quote"). `AgCta` becomes a one-line wrapper. |

Coverage-map style interactive art (the hog barn cutaway) is **not** part of
this sub-project; there is no equivalent artwork for any Human sector.

## Data

`src/data/human-markets.ts` keeps its current shape (the mega-menu and blog
cross-links read `slug`, `title`, `icon`, `summary`, `heroCopy`, `image`,
`imageAlt`, `postSlugs`) and gains:

- `tagline` — the one-liner under the title on the hub's sector cards.
- `stat` — the sector card's flip-side economic case, one or two sentences.
- `package` — the Sales Pricing Guide package name for the sector
  (`'EnviroGuard'`, `'MediGuard Pro'`), or `null` for Military.
- `hero { video?, poster }` — imported assets.

Long-form page copy (paragraphs, quotes, card copy) lives in each page file,
like the hog page, not in the data file. The data file carries only what more
than one page reads.

## Page-by-page content

Every page: `SectorHero` at top, `PostsRow` and `SectorCta` at the bottom,
`OtherMarkets` above the CTA on sector pages. All CTAs go to `/get-a-quote/`
(these pages are gated, so the soft-launch `CONTACT_HREF` rewrite is not
needed; the hog page's gate awareness is not copied).

### `/human/` hub

1. `SectorHero` (hub variant, video panel on the right like the ag hub):
   eyebrow "Human Health"; headline "Healthier Rooms. Healthier Teams. /
   Healthier People."; support from the deck's mission block ("Applies
   everywhere pathogens can threaten people.").
2. Mission band (ag hub "Our mission is simple" pattern): two paragraphs
   adapted from the deck's mission block and the Tarleton report's "infection
   control challenge" framing.
3. `SectorCards` with four cards, each flipping to its `stat`.
4. `DifferenceGrid`: the seven "Genesis360 Difference" points from the
   Athletic e-brochure reduced to the three that apply everywhere (Automated
   Operation, Dry-Mist Technology, 360-Degree Coverage), plus the closing
   panel.
5. `PostsRow` with every post referenced by a Human market.
6. `SectorCta`.

### `/human/athletics/` (flagship)

1. `SectorHero`: video `gym.mp4` (already in the repo); eyebrow "Athletics";
   headline "Your Athletes Fight For Wins. / We Fight For Your Athletes."
   (e-brochure); support "Automated, whole-room disinfection for wrestling
   rooms, weight rooms, and locker rooms."
2. `ArgumentBand`: eyebrow "The Reality In Every Room"; heading "High-Traffic
   Spaces Need High-Performance Disinfection." (e-brochure); paragraphs from
   the e-brochure and the comparison sheet's opening; headline stat "72+ hrs"
   with caption "bacteria survive on sweat-soaked mats and rubber floors"
   (comparison sheet). Image: `EnviroGuard disinfecting a locker room scene` from
   `reference-files/Joshua Riley/` (the D1 gym scene is the fallback if the
   locker room render reads poorly at 50vw).
3. `DeploymentCards`: "One Platform. Three Ways To Deploy It." Cards follow
   the Sales Pricing Guide: **Battery Powered Fogger** (spot treatment of
   benches, bags, and travel gear), **EnviroGuard** (Compact Wall Mount base
   configuration, the childcare and athletics package; wall-mounted or on
   the **Rolling Stand** to move between rooms), **Compact Pro** (dual nozzle
   + PLC Smart Board/App for the largest rooms, scheduled from a phone).
   Card art: Compact renders and the Rolling Cart image from the reference
   folder.
4. `StatBand`: eyebrow "The Cost Of Waiting"; heading "Skin Infections Are
   The #1 Cause Of Lost Time In Wrestling."; figures "60–100%" (wrestlers
   with at least one skin infection per season) and "72+ hrs" (bacterial
   survival on mats), both from the comparison sheet. Lede covers athlete
   downtime, coach downtime, recruiting, and reputation, qualitative only.
5. `CompareBand`: Today (spray, mop several times a day, wait for mats to
   dry, still smell and still get infections) versus With Genesis360
   (nightly automated cycle, no daily mopping for sanitizing, mats dry for
   practice, odor gone). Both lists from the Tarleton case study.
6. `CaseStudyBand`: Tarleton State University Wrestling. Glance: 10,000 sq ft
   facility, 70+ athletes, 1 ringworm case this season, 0 new staph or
   impetigo cases, daily mopping eliminated, 0 mat time lost to infection.
   Three quotes from the case study with attribution to the program. Source
   line names the case study and the independent lab testing (≥5-log
   bacterial, ≥6-log viral reductions from the lab validation report).
7. `PostsRow`, `OtherMarkets`, `SectorCta` ("Your Rooms. Your Coverage
   Plan." / "Start With The Room That Smells Like A Wrestling Room.").

### `/human/healthcare/` (standard+)

1. `SectorHero`: still or stock clip of a clinic corridor; eyebrow
   "Healthcare"; headline "Complete Coverage. / Consistent Infection
   Control."; support from the existing heroCopy.
2. `ArgumentBand` (centered variant, no image): existing heroCopy expanded
   with the lab validation report's pathogen list (MRSA, C. diff spores,
   influenza, non-enveloped viruses) and the "human inconsistency" point.
3. `DeploymentCards` (two cards): **MediGuard Pro** (Compact Pro, two nozzles
   + PLC Smart Board/App, the healthcare package; Rolling Stand "especially
   valuable in medical settings" per the guide) and **Battery Powered
   Fogger** for exam rooms between patients.
4. `PostsRow`, `OtherMarkets`, `SectorCta`.

### `/human/schools/` (standard+)

1. `SectorHero`: stock clip of an empty classroom or gym; eyebrow "Schools &
   Childcare"; headline "Complete Coverage. / Healthy Classrooms."; support
   from the existing heroCopy.
2. `ArgumentBand` (centered): existing heroCopy plus the Compact sheet's
   list of shared spaces (classrooms, daycare spaces, gyms, breakrooms) and
   the school air-quality post's framing.
3. `DeploymentCards` (two cards): **EnviroGuard** (the childcare and early
   education package, Compact base, rotated between rooms on brackets) and
   **Battery Powered Fogger**.
4. `PostsRow`, `OtherMarkets`, `SectorCta`.

### `/human/military/` (standard)

1. `SectorHero`: still image (the police station scene from the reference
   folder is the closest available) or a stock clip of barracks; eyebrow
   "Military & First Responders"; headline "Complete Coverage. / Ready
   Personnel."; support from the existing heroCopy.
2. `ArgumentBand` (centered): existing heroCopy, no new claims.
3. `DeploymentCards` (two cards): **Battery Powered Fogger** (mobile units,
   vehicles) and **Compact Wall Mount** (barracks, common rooms). No package
   name, since the guide has none for this market.
4. `PostsRow` (the infections-at-sea post), `OtherMarkets`, `SectorCta`.

## Copy rules

- Brand: `Genesis360`, one word, everywhere. `npm run check:brand` must pass.
- Product names exactly as the Sales Pricing Guide spells them: Compact Wall
  Mount, Compact Pro, AeroGuard, Battery Powered Fogger, Rolling Stand,
  EnviroGuard, MediGuard Pro, PLC Smart Board/App.
- Tarleton quotes are reproduced verbatim from the case study and attributed
  to "Tarleton State University Wrestling" (coach or athlete as printed).
- Claims cite a source in an HTML comment next to the copy (file name in
  `reference-files/`), so Marty's review can check them.
- No dollar figures. No "Kinetic Systems". No "Secure Logic" in consumer
  copy except the case-study source line, where the legal entity is named.

## Assets

- Video: `gym.mp4` exists. Healthcare, Schools, and Military need one clip
  each, sourced from Mixkit (same license as the existing clips), cropped
  and muted like the others, recorded in `src/assets/videos/STOCK-SOURCES.md`.
  If a fitting clip is not found, the page ships with the still-image hero
  and the poster is the still.
- Posters: one JPEG frame per clip, exported at 1280 wide.
- Stills and product art: from `reference-files/Joshua Riley/` (Compact
  renders, Rolling Cart, locker room scene, D1 gym scene, classroom scene,
  police station scene). Copied into `src/assets/images/` with kebab-case
  names; the reference folder is gitignored so nothing may import from it.
- Every image gets descriptive alt text; decorative video is `aria-hidden`.

## Accessibility and performance

- Heading order is h1 → h2 → h3 on every page; the hero holds the only h1.
- Hero video: `autoplay muted loop playsinline preload="metadata"` with a
  poster, as on the ag pages. The hub uses `preload="metadata"`, sector
  pages `preload="auto"` like the hog page.
- Reveal animations reuse the existing `reveal` / `x-intersect.once`
  pattern and the `reveal-enabled` class on `<html>`.
- Text on dark grounds stays at or above `text-white/55` (AA per the
  existing token notes in `global.css`).

## Testing and QA

1. `npm run build` completes with 43 pages (count unchanged: five Human
   routes replaced, none added or removed).
2. `npx astro check` reports no new errors (baseline: 8 pre-existing in
   `index.astro` and `home-full.astro`).
3. `npm run check:brand` passes.
4. Link sweep: every internal `href` in the five built pages resolves to a
   file in `dist/`.
5. Browser QA via `/browse` on `npm run preview`: each page at 390px and
   1280px, checking hero legibility over video, card grids, the sector-card
   flip, reveal timing, and console errors.
6. Screenshots of each page attached to the TASKS.md Done note for Marty's
   review.

## Rollout

Human pages are behind the gate, so this ships to `master` with no public
effect until the full launch. The soft-launch nav question is separate and
not part of this sub-project.

## Sub-projects that follow

2. HVAC section (hub + residential, commercial, industrial), reusing the
   blocks above.
3. Product and technology pages (Genesis360 systems, BotaniMax, Technology,
   About Us).
4. Resources and utility pages (Resources hub, brochures, documentation,
   FAQs, Contact, Get A Quote, Privacy).
5. Blog index and post templates.

Each gets its own spec and plan when its turn comes.
