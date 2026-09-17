# HVAC Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the four HVAC pages (`/hvac/`, residential, commercial, industrial) on the shared sector blocks to the quality of the agriculture and Human sections, with Residential as the flagship.

**Architecture:** The eleven `src/components/sector/` blocks from the Human section are reused as-is. Two blocks are added: `CoverageMap` (a generalized copy of the hog page's interactive cutaway; the hog page itself is untouched) and `StepsBand`. `src/data/hvac-markets.ts` gains the same fields the Human data has. Each page is a short static `.astro` file; a temporary kitchen-sink page exercises the two new blocks and is deleted at the end.

**Tech Stack:** Astro 5 static build, Tailwind v4, Alpine.js (`x-data`, `x-intersect`, `x-on`, `x-bind`), `@lucide/astro`, `astro:assets`, ffmpeg, macOS `sips`.

**Spec:** `docs/superpowers/specs/2026-09-17-hvac-section-design.md`

## Global Constraints

- **Prerequisite:** branches `batch-a-hog-header` (adds `SectorCta` `variant="photo"` + `image`/`imageAlt` props) and `batch-b-athletics` (adds `ArgumentBand` `statPosition` prop; `CaseStudyBand` `video` prop) are merged into master before Task 1 starts. Task 1 Step 1 verifies both props exist.
- Brand string is `Genesis360`, one word. `npm run check:brand` must pass after every task.
- Product names exactly as the Sales Pricing Guide: AeroGuard, AeroGuard + Dual Nozzle, AeroGuard + Smart/App, AeroGuard + Dual + Smart/App, Battery Powered Fogger, PLC Smart Board/App, Compact Wall Mount.
- No dollar figures. No "Kinetic Systems", "360HVAC", "HVAC Dry Fog". "Secure Logic" only where the legal entity speaks.
- Every claim gets a comment naming its source file in `reference-files/` beside the copy. Source short-codes for this plan: **H** `reference-files/brochures/Genesis360 HVAC.pdf`; **G** the Sales Pricing Guide (`Genesis360 Pricing Model - External.docx`, names and configurations only); **E** `reference-files/brochures/Technology Explainer.pdf`; **L** `reference-files/case-studies/Laboratory Validation and Field Performance ... Tarleton State.pdf` (always elided like that; the real name contains a string the brand check forbids); **A** `reference-files/brochures/Genesis360 AthleticGuard.pdf` (Compact sheet).
- Do not modify `src/pages/ag/*`, `src/pages/human/*`, `Header.astro`, `Footer.astro`, `MegaMenu.astro`, `mega-menus.ts`, `public/_redirects`, `launch-gate.ts`, or any existing `src/components/sector/*` block.
- `reference-files/` is gitignored; copy assets into `src/assets/` first, never import from it.
- Baseline `npx astro check` has 8 errors in `index.astro`/`home-full.astro`; no task may add to that count.
- Built page count is 43, 44 while the kitchen sink exists, 43 again after Task 7.
- Test helper: `node scripts/assert-html.mjs <dist file> <needle> ["!absent"...]`. Never use a bare `!$` needle (Alpine's `$el` is in every page); check for prices with `grep -oE '\$[0-9]' <file> | wc -l` expecting 0.
- Commits local only, one per task, messages given.
- Work from `/Users/joshuariley/Sites/securelogic` (or the worktree the controller names).

---

## File Structure

| Path | Responsibility |
| --- | --- |
| `src/components/sector/CoverageMap.astro` | Interactive cutaway with margin callouts (desktop) and a card grid (mobile). Generalized copy of the hog page module. |
| `src/components/sector/StepsBand.astro` | Numbered how-it-works steps beside an image. |
| `src/data/hvac-markets.ts` | Adds `tagline`, `stat`, `package`, `hero {poster, posterAlt, video?}`. |
| `src/assets/images/hvac-*.{png,jpg}` | Renders and posters copied from the reference folder. |
| `src/assets/videos/{home-interior,rooftop-unit,plant-air}.mp4` | Stock hero clips (Task 1), if found. |
| `src/pages/hvac/index.astro` | Hub. |
| `src/pages/hvac/{residential,commercial,industrial}.astro` | Sector pages. |
| `src/pages/dev/hvac-blocks.astro` | Temporary kitchen sink, deleted in Task 7. |
| `src/pages/[...slug].astro` | `'hvac'` removed from `getStaticPaths` and its branch deleted (Task 6). |
| `src/pages/hvac/[slug].astro` | Deleted (Task 6). |

---

### Task 1: Assets, footage, and the hvac-markets data extension

**Files:**
- Create: `src/assets/images/hvac-whole-house.png`, `hvac-aeroguard-on-handler.png`, `hvac-clean-vs-dirty.png`, `hvac-rooftop-package.png`, `hvac-closet-unit.png`, `hvac-mechanical-room.png`, `hvac-family-home.png`, `hvac-aeroguard-render.png`, `hero-hvac-residential-poster.jpg`, `hero-hvac-commercial-poster.jpg`, `hero-hvac-industrial-poster.jpg`, `hero-hvac-hub-poster.jpg`
- Create (if found): `src/assets/videos/home-interior.mp4`, `rooftop-unit.mp4`, `plant-air.mp4`
- Modify: `src/data/hvac-markets.ts` (whole file), `src/assets/videos/STOCK-SOURCES.md`

**Interfaces:**
- Produces: `Market` gains `tagline: string`, `stat: string`, `package: 'AeroGuard' | null`, `hero: { poster: ImageMetadata; posterAlt: string; video?: string }`.

- [ ] **Step 1: Verify the prerequisites landed**

```bash
grep -n "statPosition" src/components/sector/ArgumentBand.astro | head -2; grep -n "variant" src/components/sector/SectorCta.astro | head -2
```
Expected: at least one line each. If either is empty, stop and report BLOCKED: the batches have not merged.

- [ ] **Step 2: Copy and size the renders**

```bash
R="reference-files/renders"; I=src/assets/images
cp "$R/HVAC Diagram of whole HVAC system setup.png"   "$I/hvac-whole-house.png"
cp "$R/AeroGuard on HVAC.png"                          "$I/hvac-aeroguard-on-handler.png"
cp "$R/Clean HVAC vs Dirty.png"                        "$I/hvac-clean-vs-dirty.png"
cp "$R/HVAC Commercial RoofTop Package.png"            "$I/hvac-rooftop-package.png"
cp "$R/HVAC Residential Closet Unit.png"               "$I/hvac-closet-unit.png"
cp "$R/Genesis360 Fogger in HVAC Mechanical.png"       "$I/hvac-mechanical-room.png"
cp "$R/Image of a family happy in home with better IAQ.png" "$I/hvac-family-home.png"
sips -Z 1600 "$R/Genesis360_Compact_HVAC_iso1_clear1.png" --out "$I/hvac-aeroguard-render.png" >/dev/null
for f in $I/hvac-*.png; do printf '%-36s ' "$(basename $f)"; sips -g pixelWidth -g pixelHeight "$f" | tail -2 | awk '{printf "%s ", $2}'; echo; done
```
Expected: eight files; the render reports width 1600.

- [ ] **Step 3: Source stock clips** (same method and acceptance rule as the Human section; Mixkit category pages carry JSON-LD with `contentUrl`; Pexels search pages are Cloudflare-blocked for curl but their `videos.pexels.com/video-files/...mp4` URLs download fine once found via WebFetch)

Targets, in order of preference, all people-light, wide, slow:
- `home-interior.mp4`: a bright living room or hallway with a ceiling vent or thermostat; fallback still `hvac-aeroguard-on-handler.png`.
- `rooftop-unit.mp4`: commercial rooftop HVAC units or a mechanical room; fallback still `hvac-rooftop-package.png`.
- `plant-air.mp4`: warehouse or plant ceiling with ducts and air handlers; fallback still `hvac-mechanical-room.png`.
For each accepted clip: `ffmpeg -y -loglevel error -i <src> -t 12 -an -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" -c:v libx264 -crf 26 -preset slow -movflags +faststart src/assets/videos/<name>.mp4` (under 4 MB), then a poster `ffmpeg -y -loglevel error -ss 1 -i src/assets/videos/<name>.mp4 -frames:v 1 -q:v 3 src/assets/images/hero-hvac-<market>-poster.jpg`. For a market with no clip, make the poster from the fallback still: `sips -Z 1280 -s format jpeg -s formatOptions 82 <still> --out src/assets/images/hero-hvac-<market>-poster.jpg`. The hub poster is always `sips -Z 1280 ... "$I/hvac-aeroguard-on-handler.png" --out "$I/hero-hvac-hub-poster.jpg"`. Append one line per clip to `STOCK-SOURCES.md` in the file's format (title, page URL, author for Pexels, license, `— hero, /hvac/<slug>/`) and a sentence naming any market on a still.

- [ ] **Step 4: Rewrite `src/data/hvac-markets.ts`**

```ts
// src/data/hvac-markets.ts
import type { ImageMetadata } from 'astro';
import { Building2, Factory, House } from '@lucide/astro';
import hvacLifespan from '../assets/images/blog-hvac-lifespan.png';
import biofilmHvac from '../assets/images/blog-biofilm-hvac.png';
import hvacMist from '../assets/images/hvac-mist.png';
import residentialPoster from '../assets/images/hero-hvac-residential-poster.jpg';
import commercialPoster from '../assets/images/hero-hvac-commercial-poster.jpg';
import industrialPoster from '../assets/images/hero-hvac-industrial-poster.jpg';
// Add `import xVideo from '../assets/videos/<name>.mp4';` for each clip Task 1 Step 3 produced,
// and set `video: xVideo` on that market. Markets without a clip omit `video`.

/** Sales Pricing Guide application package that covers a market, or null. */
export type HvacPackage = 'AeroGuard' | null;

export interface Market {
  slug: string;
  title: string;
  icon: typeof House;
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
  /** The sector card's flip side: the case for this market, one or two sentences. */
  stat: string;
  package: HvacPackage;
  /** Hero media. `video` is a Vite asset URL string; absent = still hero. */
  hero: { poster: ImageMetadata; posterAlt: string; video?: string };
}

export const hvacMarkets: Market[] = [
  {
    slug: 'residential',
    title: 'Residential',
    icon: House,
    summary: 'Whole-home coil and duct treatment that extends system life and improves everyday air quality.',
    heroCopy: 'Your HVAC system is one of the largest investments in your home. Genesis360 AeroGuard treats coils and ductwork with botanical disinfectant, helping extend equipment life and keep everyday indoor air cleaner.',
    image: hvacLifespan,
    imageAlt: 'Technician servicing an outdoor HVAC condenser unit',
    postSlugs: ['how-to-extend-the-lifespan-of-your-hvac-system'],
    tagline: 'Clean air starts inside your HVAC system.',
    // Source H, p.1: "Most odors start in the HVAC ... if the odor originates within the HVAC system, masking it does not solve the problem."
    stat: 'Most household odors start inside the HVAC system. Candles, sprays and plug-ins mask them; if the odor begins at the coil or drain pan, masking it does not solve the problem.',
    // Source G: AeroGuard — "Residential / commercial HVAC", AeroGuard Base, 1 nozzle / digital timer.
    package: 'AeroGuard',
    hero: { poster: residentialPoster, posterAlt: 'Bright home interior with a ceiling air vent' },
  },
  {
    slug: 'commercial',
    title: 'Commercial',
    icon: Building2,
    summary: 'Scheduled, automated coverage for air handlers serving offices, schools, and shared buildings.',
    heroCopy: 'Biofilm hidden inside coils, drain pans, and ductwork can quietly cut energy efficiency and air quality across an entire building. Genesis360 AeroGuard runs scheduled, automated cycles for air handlers serving offices, schools, and shared buildings.',
    image: biofilmHvac,
    imageAlt: 'HVAC air handling unit coils where biofilm can accumulate',
    postSlugs: ['biofilm-hvac-prevention'],
    tagline: 'Every air handler, on a schedule nobody has to remember.',
    // Source H, p.2: "Restricted airflow from dirty coils and buildup cause increased operating costs."
    stat: 'Dirty coils and drain-pan buildup restrict airflow, so the system works harder, uses more energy and circulates the same contaminants through every room it serves.',
    // Source G: AeroGuard — "Residential / commercial HVAC".
    package: 'AeroGuard',
    hero: { poster: commercialPoster, posterAlt: 'Commercial rooftop HVAC unit against a city skyline' },
  },
  {
    slug: 'industrial',
    title: 'Industrial',
    icon: Factory,
    summary: 'Large-scale automated coverage for warehouses, plants, and cold storage air systems.',
    heroCopy: 'Warehouses, manufacturing plants, and cold storage facilities run air handling systems around the clock, giving biofilm and airborne contaminants constant conditions to build up in. Genesis360 AeroGuard scales to large air handlers and runs on its own schedule.',
    image: hvacMist,
    imageAlt: 'Genesis360 AeroGuard installed on a large air handling unit',
    postSlugs: [],
    tagline: 'Air systems that never switch off need protection that never does either.',
    stat: 'Around-the-clock air handling gives biofilm constant moisture and airflow to grow in. Scheduled treatment keeps the pathway clean between manual service visits.',
    // Source G lists no industrial package; AeroGuard configurations apply.
    package: null,
    hero: { poster: industrialPoster, posterAlt: 'Genesis360 unit in an industrial mechanical room beside a large air handler' },
  },
];
```
Adjust each `posterAlt` to describe the clip or still actually chosen in Step 3.

- [ ] **Step 5: Build and assert the mega-menu still renders all three markets**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/about-us/index.html "/hvac/residential/" "/hvac/commercial/" "/hvac/industrial/"; npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `43 page(s) built`, three `ok`, `8 errors`, brand passes.

- [ ] **Step 6: Commit**

```bash
git add src/assets/images/hvac-*.png src/assets/images/hero-hvac-*-poster.jpg src/assets/videos src/data/hvac-markets.ts
git commit -m "HVAC markets: tagline, stat, package, hero fields; renders, posters and stock clips

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: CoverageMap and StepsBand blocks, with a kitchen sink

**Files:**
- Create: `src/components/sector/CoverageMap.astro`
- Create: `src/components/sector/StepsBand.astro`
- Create: `src/pages/dev/hvac-blocks.astro`

**Interfaces:**
- Produces:
  ```ts
  // CoverageMap
  interface Point { key: string; label: string; sub?: string /* default 'Coverage' */; copy: string; icon: typeof Cloud; side: 'left' | 'right'; callout: { x: number; y: number }; anchor: { x: number; y: number } }
  interface Props { id?: string /* default 'coverage-map' */; eyebrow: string; heading: string; lede: string; art: ImageMetadata; artAlt: string; mobileHeading: string; mobileCopy: string; mobileIcon: typeof Cloud; points: Point[]; stageAspect?: number /* default 1.98 */; artWidth?: number /* percent, default 54 */ }
  // StepsBand
  interface Props { eyebrow: string; heading: string; lede: string; steps: { title: string; copy: string }[]; image: ImageMetadata; imageAlt: string; source?: string /* small-type line under the steps */ }
  ```

- [ ] **Step 1: Create `CoverageMap.astro`**

This is the hog page's coverage-map section (`#protective-cloud`) and its `barn-*` styles with `barn` renamed to `map`, the ground kept (`bg-gradient-to-b from-brand-50 to-brand-100`), and the stage geometry made configurable. Copy the hog page's CSS rules for `.barn-stage`, `.barn-art`, `.barn-anchor`, `.barn-dot` (and its `::after`, the nth-of-type delays, hover/active), `@keyframes barn-ping`, `.barn-callout`, `.barn-callout-right`, `.barn-ring`, `.barn-text`, `.barn-label`, `.barn-name`, `.barn-sub`, `.barn-detail`, and the `@media (max-width: 1279px)` block from `src/pages/ag/hogs-livestock.astro`'s `<style>` exactly, renaming every `barn-` to `map-` and `barn-ping` to `map-ping`, into this component's `<style>`; then replace the two geometry values with CSS variables: `.map-stage { aspect-ratio: var(--map-aspect); }` and `.map-art { width: var(--map-art-width); }`.

```astro
---
// src/components/sector/CoverageMap.astro
// Interactive cutaway: ringed callouts in the margins, a leader dot on the
// feature, the description held back until hover. Generalized copy of the hog
// page's coverage map (that page keeps its own inline version). Below 1280px
// the artwork runs full width and the points become a list; on phones a card
// grid replaces the infographic.
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { Cloud } from '@lucide/astro';

interface Point {
  key: string;
  label: string;
  sub?: string;
  copy: string;
  icon: typeof Cloud;
  side: 'left' | 'right';
  callout: { x: number; y: number };
  anchor: { x: number; y: number };
}

interface Props {
  id?: string;
  eyebrow: string;
  heading: string;
  lede: string;
  art: ImageMetadata;
  artAlt: string;
  mobileHeading: string;
  mobileCopy: string;
  mobileIcon: typeof Cloud;
  points: Point[];
  stageAspect?: number;
  artWidth?: number;
}

const {
  id = 'coverage-map', eyebrow, heading, lede, art, artAlt, mobileHeading, mobileCopy,
  mobileIcon: MobileIcon, points, stageAspect = 1.98, artWidth = 54,
} = Astro.props;
---

<style>
  /* Paste the hog page's coverage-map CSS here with barn- -> map-, then: */
  .map-stage { aspect-ratio: var(--map-aspect); }
  .map-art { width: var(--map-art-width); }
</style>

<section id={id} class="relative overflow-hidden bg-gradient-to-b from-brand-50 to-brand-100 py-20 sm:py-24">
  <div class="container-page">
    <div class="reveal mx-auto max-w-3xl text-center" x-intersect.once="$el.classList.add('is-visible')">
      <p class="bl-eyebrow">{eyebrow}</p>
      <h2 class="bl-h2 mt-4">{heading}</h2>
      <p class="mt-6 text-base leading-8 text-brand-body sm:text-lg">{lede}</p>
    </div>

    <div class="mt-10 sm:hidden">
      <div class="rounded-[1.75rem] bg-brand-900 px-6 py-7 text-center text-white shadow-[0_20px_45px_-30px_rgb(16_32_74_/_0.7),0_2px_8px_rgb(16_32_74_/_0.14)]">
        <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-lime-400 ring-1 ring-inset ring-white/15">
          <MobileIcon class="h-7 w-7" aria-hidden="true" />
        </span>
        <p class="mt-4 text-xs font-extrabold uppercase tracking-[0.16em] text-lime-400">{mobileHeading}</p>
        <p class="mt-2 text-sm leading-6 text-white/75">{mobileCopy}</p>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-3">
        {points.map(({ label, copy, icon: Icon }) => (
          <article class="relative flex min-h-52 flex-col items-center overflow-hidden rounded-2xl bg-white px-4 pb-5 pt-6 text-center shadow-[0_16px_35px_-28px_rgb(16_32_74_/_0.55),0_2px_7px_rgb(16_32_74_/_0.08)]">
            <span class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600 via-brand-400 to-lime-400" aria-hidden="true"></span>
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 ring-1 ring-inset ring-brand-200">
              <Icon class="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 class="mt-4 text-sm font-extrabold uppercase tracking-[0.08em] text-brand-950">{label}</h3>
            <p class="mt-2 text-xs leading-5 text-brand-body">{copy}</p>
          </article>
        ))}
      </div>
    </div>

    <div class="map-stage mt-6 hidden sm:block" style={`--map-aspect: ${stageAspect}; --map-art-width: ${artWidth}%;`} x-data="{ active: null }">
      <Image src={art} alt={artAlt} class="map-art" widths={[720, 1080, 1440]} sizes="(min-width: 1280px) 40rem, 100vw" />

      {points.map(({ key, anchor }) => (
        <button
          type="button"
          class="map-anchor"
          style={`left: ${anchor.x}%; top: ${anchor.y}%;`}
          tabindex="-1"
          aria-hidden="true"
          x-on:mouseenter={`active = '${key}'`}
          x-on:mouseleave="active = null"
          x-on:click={`active = active === '${key}' ? null : '${key}'`}
          x-bind:class={`active === '${key}' && 'is-active'`}
        >
          <span class="map-dot" aria-hidden="true"></span>
        </button>
      ))}

      {points.map(({ key, label, sub = 'Coverage', copy, icon: Icon, callout, side }) => (
        <button
          type="button"
          class:list={['map-callout', `map-callout-${side}`]}
          style={`left: ${callout.x}%; top: ${callout.y}%;`}
          aria-label={`${label} ${sub.toLowerCase()}`}
          x-bind:aria-expanded={`(active === '${key}').toString()`}
          x-on:mouseenter={`active = '${key}'`}
          x-on:mouseleave="active = null"
          x-on:focus={`active = '${key}'`}
          x-on:blur="active = null"
          x-on:click={`active = active === '${key}' ? null : '${key}'`}
          x-bind:class={`active === '${key}' && 'is-active'`}
        >
          <span class="map-ring"><Icon class="h-6 w-6" aria-hidden="true" /></span>
          <span class="map-text">
            <span class="map-label">
              <span class="map-name">{label}</span>
              <span class="map-sub">{sub}</span>
            </span>
            <span class="map-detail">{copy}</span>
          </span>
        </button>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `StepsBand.astro`**

```astro
---
// src/components/sector/StepsBand.astro
// Numbered steps beside an image on the light ground. New for the HVAC section
// ("How It Works" from the HVAC brochure); type and grounds match ArgumentBand.
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';

interface Props {
  eyebrow: string;
  heading: string;
  lede: string;
  steps: { title: string; copy: string }[];
  image: ImageMetadata;
  imageAlt: string;
  source?: string;
}

const { eyebrow, heading, lede, steps, image, imageAlt, source } = Astro.props;
---

<section class="relative overflow-hidden bg-white py-20 sm:py-24">
  <div class="container-page">
    <div class="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
      <div class="reveal" x-intersect.once="$el.classList.add('is-visible')">
        <p class="bl-eyebrow">{eyebrow}</p>
        <h2 class="bl-h2 mt-4">{heading}</h2>
        <p class="mt-6 text-base leading-8 text-brand-body sm:text-lg">{lede}</p>

        <ol class="mt-10 space-y-6">
          {steps.map(({ title, copy }, i) => (
            <li class="flex gap-5">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-extrabold text-brand-700 ring-1 ring-inset ring-brand-200" aria-hidden="true">{i + 1}</span>
              <div>
                <h3 class="text-lg font-bold text-brand-900">{title}</h3>
                <p class="mt-1 text-sm leading-6 text-brand-body">{copy}</p>
              </div>
            </li>
          ))}
        </ol>
        {source && <p class="mt-8 text-xs leading-5 text-brand-muted">{source}</p>}
      </div>

      <div class="reveal lg:sticky lg:top-28" x-intersect.once="$el.classList.add('is-visible')">
        <Image src={image} alt={imageAlt} class="w-full rounded-2xl shadow-lift" widths={[640, 960, 1280]} sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create the kitchen sink**

```astro
---
// src/pages/dev/hvac-blocks.astro
// TEMPORARY. Exercises CoverageMap and StepsBand while they are built. Deleted
// in the last task of docs/superpowers/plans/2026-09-17-hvac-section.md.
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import CoverageMap from '../../components/sector/CoverageMap.astro';
import StepsBand from '../../components/sector/StepsBand.astro';
import { Cloud, Fan, Snowflake, Waves, Wind, AirVent, ThermometerSun } from '@lucide/astro';
import wholeHouse from '../../assets/images/hvac-whole-house.png';
import cleanDirty from '../../assets/images/hvac-clean-vs-dirty.png';

// Provisional anchors for the 1536x1024 cutaway; Task 5 tunes them from screenshots.
const points = [
  { key: 'handler', label: 'Attic Air Handler', icon: Fan, side: 'left' as const, copy: 'Handler copy.', callout: { x: 1.5, y: 14 }, anchor: { x: 24, y: 15 } },
  { key: 'coil', label: 'Evaporator Coil', icon: Snowflake, side: 'left' as const, copy: 'Coil copy.', callout: { x: 1.5, y: 44 }, anchor: { x: 19, y: 56 } },
  { key: 'pan', label: 'Drain Pan', icon: Waves, side: 'left' as const, copy: 'Pan copy.', callout: { x: 1.5, y: 74 }, anchor: { x: 18, y: 78 } },
  { key: 'ducts', label: 'Ductwork', icon: Wind, side: 'right' as const, copy: 'Duct copy.', callout: { x: 98.5, y: 14 }, anchor: { x: 62, y: 14 } },
  { key: 'vents', label: 'Supply Vents', icon: AirVent, side: 'right' as const, copy: 'Vent copy.', callout: { x: 98.5, y: 44 }, anchor: { x: 52, y: 39 } },
  { key: 'condenser', label: 'Outdoor Condenser', icon: ThermometerSun, side: 'right' as const, copy: 'Condenser copy.', callout: { x: 98.5, y: 74 }, anchor: { x: 5, y: 83 } },
];
---

<BaseLayout title="DEV | HVAC blocks" description="Temporary kitchen sink for the HVAC blocks.">
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />
    <main>
      <CoverageMap
        eyebrow="Kitchen Sink"
        heading="Coverage Map."
        lede="Lede."
        art={wholeHouse}
        artAlt="Cutaway of a house showing the attic air handler, ductwork, vents and closet furnace"
        mobileHeading="Whole-System Coverage"
        mobileCopy="Mobile copy."
        mobileIcon={Cloud}
        points={points}
        stageAspect={1.7}
        artWidth={50}
      />
      <StepsBand
        eyebrow="Kitchen Sink"
        heading="Steps Band."
        lede="Lede."
        steps={[{ title: 'Step one', copy: 'Copy one.' }, { title: 'Step two', copy: 'Copy two.' }]}
        image={cleanDirty}
        imageAlt="Clean and dirty HVAC coil comparison"
        source="Source line."
      />
    </main>
    <Footer />
  </div>
</BaseLayout>
```
If any lucide icon name above does not exist in `@lucide/astro`, substitute the nearest (check `node_modules/@lucide/astro/dist/` names) and note it.

- [ ] **Step 4: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/dev/hvac-blocks/index.html "Coverage Map." "map-stage" "map-callout-right" "Attic Air Handler" "Steps Band." "Step two" "Source line."; npx astro check 2>&1 | tail -4
```
Expected: `44 page(s) built`, seven `ok`, `8 errors`.

- [ ] **Step 5: Commit**

```bash
git add src/components/sector/CoverageMap.astro src/components/sector/StepsBand.astro src/pages/dev/hvac-blocks.astro
git commit -m "Add CoverageMap and StepsBand sector blocks (HVAC), with a dev kitchen sink

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: `/hvac/industrial/` page (standard)

**Files:**
- Create: `src/pages/hvac/industrial.astro`

- [ ] **Step 1: Create the page**

```astro
---
// src/pages/hvac/industrial.astro
// Industrial — standard tier, lean: the only sources are the existing market
// copy and the Sales Pricing Guide's AeroGuard configurations (no industrial
// package). Spec: docs/superpowers/specs/2026-09-17-hvac-section-design.md
import { Factory, Truck } from '@lucide/astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import ArgumentBand from '../../components/sector/ArgumentBand.astro';
import DeploymentCards from '../../components/sector/DeploymentCards.astro';
import PostsRow from '../../components/sector/PostsRow.astro';
import OtherMarkets from '../../components/sector/OtherMarkets.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import { hvacMarkets } from '../../data/hvac-markets';
import { posts } from '../../data/blog-posts';
import aeroguardRender from '../../assets/images/hvac-aeroguard-render.png';
import fogger from '../../assets/images/human-fogger.png';

const market = hvacMarkets.find((m) => m.slug === 'industrial')!;
// Always three posts (Joshua): this market has none of its own, so the HVAC
// posts lead and the sick-building post fills the row.
const FILL = ['biofilm-hvac-prevention', 'how-to-extend-the-lifespan-of-your-hvac-system', 'how-to-identify-sick-building-syndrome-and-improve-indoor-air-quality-in-your-building'];
const relatedPosts = [...market.postSlugs, ...FILL].filter((s, i, a) => a.indexOf(s) === i).map((s) => posts.find((p) => p.slug === s)!).filter(Boolean).slice(0, 3);
const otherMarkets = hvacMarkets.filter((m) => m.slug !== market.slug);

const deployments = [
  {
    // Source G: AeroGuard + Dual + Smart/App — 2 nozzles + PLC Smart Board/App.
    device: 'AeroGuard + Dual + Smart/App',
    deviceCopy: 'Two nozzles for large air handlers and PLC Smart Board/App control, so cycles are scheduled and monitored from a phone across every unit on site.',
    image: aeroguardRender,
    imageAlt: 'Genesis360 AeroGuard unit',
    facility: 'Plant & Warehouse Air Handlers',
    facilityCopy: 'Rooftop and mechanical-room units that run around the clock.',
    icon: Factory,
  },
  {
    // Source G: Battery Powered Fogger — "Portable spot-treatment device".
    device: 'Battery Powered Fogger',
    deviceCopy: 'A portable, cordless fogger for spot treatment of mechanical rooms, filter banks and equipment between scheduled cycles.',
    image: fogger,
    imageAlt: 'Genesis360 Battery Powered Fogger',
    facility: 'Mechanical Rooms & Equipment',
    facilityCopy: 'The spaces around the air handlers that manual cleaning reaches last.',
    icon: Truck,
  },
];
---

<BaseLayout title="Genesis360 | HVAC | Industrial" description={market.summary}>
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />
    <main>
      <SectorHero
        eyebrow="Industrial"
        headline={['Complete Coverage.', 'Around The Clock.']}
        support="Automated treatment for air systems that never switch off."
        poster={market.hero.poster}
        video={market.hero.video}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
      />

      <!-- Source: existing market copy (src/data/hvac-markets.ts heroCopy). Paragraph 2: Source E
           (sub-10-micron droplets move with airflow) and Source L (delivery through HVAC systems
           extends coverage across ventilation pathways). -->
      <ArgumentBand
        eyebrow="The Reality In Every Plant"
        heading="Biofilm Never Takes A Shift Off."
        paragraphs={[
          market.heroCopy,
          'Genesis360 releases a sub-10-micron dry mist into the air handler, where it moves with the airflow across the coil, the drain pan and the downstream ductwork, on a schedule, without a technician in the room.',
        ]}
        link={{ href: '#deployments', label: 'See The Systems' }}
      />

      <DeploymentCards
        heading="One Platform. Two Ways To Deploy It."
        intro="Fixed on the air handlers that run all day, portable for everything around them."
        cards={deployments}
      />

      <PostsRow posts={relatedPosts} heading="From The Field" />
      <OtherMarkets heading="Other HVAC Markets" basePath="/hvac/" markets={otherMarkets} />
      <SectorCta
        eyebrow="Your Plant. Your Coverage Plan."
        heading="Start With The Units That Never Stop."
        copy="Tell us how the air systems run and where the buildup shows up first, and our team will map the right AeroGuard configuration and build a coverage plan around it."
        href="/get-a-quote/"
      />
    </main>
    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/hvac/industrial/index.html "Around The Clock." "Biofilm Never Takes A Shift Off." "AeroGuard + Dual + Smart/App" "Battery Powered Fogger" "biofilm-hvac-prevention" "how-to-identify-sick-building-syndrome" "/hvac/residential/" "/hvac/commercial/" "!Related reading"; echo "dollar figures: $(grep -oE '\$[0-9]' dist/hvac/industrial/index.html | wc -l | tr -d ' ')"; grep -c "<article\|<a href=\"/blogs/" dist/hvac/industrial/index.html; npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `44 page(s) built`, nine `ok`, `dollar figures: 0`, three post links, `8 errors`, brand passes. (`!Related reading` proves the static route shadows `hvac/[slug].astro`; a route-collision warning is acceptable until Task 6.)

- [ ] **Step 3: Commit**

```bash
git add src/pages/hvac/industrial.astro
git commit -m "HVAC: rebuild /hvac/industrial/ on the sector blocks (standard tier)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: `/hvac/commercial/` page (standard+)

**Files:**
- Create: `src/pages/hvac/commercial.astro`

- [ ] **Step 1: Create the page**

```astro
---
// src/pages/hvac/commercial.astro
// Commercial — standard tier plus an image argument band and deployment cards.
// Sources: existing market copy; Source H (coil, drain pan, duct pathway;
// restricted airflow raises operating costs); Source G (AeroGuard
// configurations); Source L (HVAC delivery extends coverage across ventilation
// pathways). Spec: docs/superpowers/specs/2026-09-17-hvac-section-design.md
import { Building2, Fan } from '@lucide/astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import ArgumentBand from '../../components/sector/ArgumentBand.astro';
import DeploymentCards from '../../components/sector/DeploymentCards.astro';
import PostsRow from '../../components/sector/PostsRow.astro';
import OtherMarkets from '../../components/sector/OtherMarkets.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import { hvacMarkets } from '../../data/hvac-markets';
import { posts } from '../../data/blog-posts';
import rooftop from '../../assets/images/hvac-rooftop-package.png';
import aeroguardRender from '../../assets/images/hvac-aeroguard-render.png';
import closetUnit from '../../assets/images/hvac-closet-unit.png';

const market = hvacMarkets.find((m) => m.slug === 'commercial')!;
const FILL = ['how-to-extend-the-lifespan-of-your-hvac-system', 'how-to-identify-sick-building-syndrome-and-improve-indoor-air-quality-in-your-building'];
const relatedPosts = [...market.postSlugs, ...FILL].filter((s, i, a) => a.indexOf(s) === i).map((s) => posts.find((p) => p.slug === s)!).filter(Boolean).slice(0, 3);
const otherMarkets = hvacMarkets.filter((m) => m.slug !== market.slug);

const deployments = [
  {
    // Source G: AeroGuard + Dual Nozzle — 2 nozzles + digital timer.
    device: 'AeroGuard + Dual Nozzle',
    deviceCopy: 'Two nozzles on a digital timer for rooftop units and large air handlers, installed at the handler and running scheduled cycles on their own.',
    image: rooftop,
    imageAlt: 'Genesis360 AeroGuard mounted on a commercial rooftop HVAC unit',
    facility: 'Rooftop Units & Air Handlers',
    facilityCopy: 'The units serving offices, schools and shared buildings, treated where the moisture collects.',
    icon: Building2,
  },
  {
    // Source G: AeroGuard + Smart/App — 1 nozzle + PLC Smart Board/App.
    device: 'AeroGuard + Smart/App',
    deviceCopy: 'PLC Smart Board/App control for building managers: schedule, monitor and adjust every unit from a phone or desktop, with low-liquid and power alerts.',
    image: closetUnit,
    imageAlt: 'Genesis360 AeroGuard beside an indoor air handler',
    facility: 'Multi-Unit Buildings',
    facilityCopy: 'Several handlers, one schedule, and a record that each cycle ran.',
    icon: Fan,
  },
];
---

<BaseLayout title="Genesis360 | HVAC | Commercial" description={market.summary}>
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />
    <main>
      <SectorHero
        eyebrow="Commercial"
        headline={['Complete Coverage.', 'Every Air Handler.']}
        support="Scheduled, automated treatment for the units a whole building breathes through."
        poster={market.hero.poster}
        video={market.hero.video}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
      />

      <!-- Sources: existing market copy; Source H p.2 ("the coil and drain pan naturally collect
           moisture, these areas may collect biofilm, bacteria, mold, mildew, dust, and odor-causing
           buildup"; "Restricted airflow from dirty coils and buildup cause increased operating
           costs"); Source L (delivery through HVAC systems to extend coverage across ventilation
           pathways). -->
      <ArgumentBand
        eyebrow="The Reality In Every Building"
        heading="Biofilm Doesn't Stay In The Mechanical Room."
        image={rooftop}
        imageAlt="Genesis360 AeroGuard treating the coil inside a commercial rooftop unit"
        paragraphs={[
          market.heroCopy,
          'The coil and drain pan collect moisture by design, so they collect biofilm, mold and odor-causing buildup by default. Every time the system runs, the air moves across those surfaces and into every room it serves, and a dirty coil makes the unit work harder and cost more to run.',
          'Genesis360 AeroGuard installs at the air handler and releases a sub-10-micron dry mist on a schedule, treating the coil, the drain pan and the downstream duct pathway between manual service visits.',
        ]}
        link={{ href: '#deployments', label: 'See The Systems' }}
      />

      <DeploymentCards
        heading="One Platform. Two Ways To Deploy It."
        intro="Timer-driven on a single unit, app-driven across a building."
        cards={deployments}
      />

      <PostsRow posts={relatedPosts} heading="From The Field" />
      <OtherMarkets heading="Other HVAC Markets" basePath="/hvac/" markets={otherMarkets} />
      <SectorCta
        eyebrow="Your Building. Your Coverage Plan."
        heading="Start With The Units Serving The Most People."
        copy="Tell us how many air handlers the building runs and how they are maintained today, and our team will map the right AeroGuard configuration and build a coverage plan around it."
        href="/get-a-quote/"
      />
    </main>
    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/hvac/commercial/index.html "Every Air Handler." "Biofilm Doesn’t Stay In The Mechanical Room." "AeroGuard + Dual Nozzle" "AeroGuard + Smart/App" "PLC Smart Board/App" "biofilm-hvac-prevention" "!Related reading"; echo "dollar figures: $(grep -oE '\$[0-9]' dist/hvac/commercial/index.html | wc -l | tr -d ' ')"; npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `44 page(s) built`, seven `ok` (the heading needle uses the curly apostrophe Astro emits; if it fails, check the built HTML and match what is there), `dollar figures: 0`, `8 errors`, brand passes.

- [ ] **Step 3: Commit**

```bash
git add src/pages/hvac/commercial.astro
git commit -m "HVAC: rebuild /hvac/commercial/ on the sector blocks (standard+)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5: `/hvac/residential/` flagship page

**Files:**
- Create: `src/pages/hvac/residential.astro`

**Interfaces:**
- Consumes: `CoverageMap`, `StepsBand` (Task 2); `ArgumentBand` with `statPosition` and `SectorCta` with `variant="photo"` (prerequisite batches); all other sector blocks.

- [ ] **Step 1: Create the page**

All copy is from Source H (the two brochure pages) unless a comment says otherwise. The brochure's disclaimer appears once, under the steps.

```astro
---
// src/pages/hvac/residential.astro
// Residential — the HVAC section's flagship. Speaks to homeowners in the
// brochure's voice, with a contractor block near the end. Sources cited beside
// the copy: H = Genesis360 HVAC.pdf, G = Sales Pricing Guide (names only),
// E = Technology Explainer.pdf, L = the Tarleton lab report, A = the Compact
// sheet (Genesis360 AthleticGuard.pdf). Spec:
// docs/superpowers/specs/2026-09-17-hvac-section-design.md
import { AirVent, Cloud, Fan, House, Snowflake, Smartphone, ThermometerSun, Waves, Wind, ArrowRight } from '@lucide/astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import ArgumentBand from '../../components/sector/ArgumentBand.astro';
import CoverageMap from '../../components/sector/CoverageMap.astro';
import DeploymentCards from '../../components/sector/DeploymentCards.astro';
import StatBand from '../../components/sector/StatBand.astro';
import CompareBand from '../../components/sector/CompareBand.astro';
import StepsBand from '../../components/sector/StepsBand.astro';
import PostsRow from '../../components/sector/PostsRow.astro';
import OtherMarkets from '../../components/sector/OtherMarkets.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import { hvacMarkets } from '../../data/hvac-markets';
import { posts } from '../../data/blog-posts';
import aeroguardOnHandler from '../../assets/images/hvac-aeroguard-on-handler.png';
import wholeHouse from '../../assets/images/hvac-whole-house.png';
import cleanDirty from '../../assets/images/hvac-clean-vs-dirty.png';
import aeroguardRender from '../../assets/images/hvac-aeroguard-render.png';
import closetUnit from '../../assets/images/hvac-closet-unit.png';
import familyHome from '../../assets/images/hvac-family-home.png';

const market = hvacMarkets.find((m) => m.slug === 'residential')!;
const FILL = ['biofilm-hvac-prevention', 'how-to-identify-sick-building-syndrome-and-improve-indoor-air-quality-in-your-building'];
const relatedPosts = [...market.postSlugs, ...FILL].filter((s, i, a) => a.indexOf(s) === i).map((s) => posts.find((p) => p.slug === s)!).filter(Boolean).slice(0, 3);
const otherMarkets = hvacMarkets.filter((m) => m.slug !== market.slug);

// Source H p.2 (the air path: coil, drain pan, cabinet, ductwork, vents) and
// Source L ("deliver disinfectant through HVAC systems to extend coverage across
// ventilation pathways"). Anchors are percentages of the 1536x1024 cutaway and
// are tuned from screenshots in this task's QA step.
const coveragePoints = [
  { key: 'handler', label: 'Air Handler', icon: Fan, side: 'left' as const,
    copy: 'Genesis360 installs here, after the coil has been manually cleaned, and releases its dry mist into the cabinet where the air is moving.',
    callout: { x: 1.5, y: 14 }, anchor: { x: 24, y: 15 } },
  { key: 'coil', label: 'Evaporator Coil', icon: Snowflake, side: 'left' as const,
    copy: 'A wet environment by design. Biofilm, bacteria and mold begin here; the mist reaches the fins and the moisture film on them.',
    callout: { x: 1.5, y: 44 }, anchor: { x: 19, y: 56 } },
  { key: 'pan', label: 'Drain Pan', icon: Waves, side: 'left' as const,
    copy: 'Standing water and buildup that can clog drain lines and back up into the home. Treated every cycle.',
    callout: { x: 1.5, y: 74 }, anchor: { x: 18, y: 78 } },
  { key: 'ducts', label: 'Ductwork', icon: Wind, side: 'right' as const,
    copy: 'The dry droplets move with the airflow into the downstream duct pathway instead of settling at the source.',
    callout: { x: 98.5, y: 14 }, anchor: { x: 62, y: 14 } },
  { key: 'vents', label: 'Supply Vents', icon: AirVent, side: 'right' as const,
    copy: 'Where the recycled air enters every room. What reaches the vents is what the household breathes.',
    callout: { x: 98.5, y: 44 }, anchor: { x: 52, y: 39 } },
  { key: 'thermostat', label: 'Every Cycle', icon: ThermometerSun, side: 'right' as const, sub: 'Schedule',
    copy: 'The system is programmed to run on a schedule of your choosing, so treatment happens whether or not anyone remembers.',
    callout: { x: 98.5, y: 74 }, anchor: { x: 84, y: 60 } },
];

// Source G: AeroGuard Base (1 nozzle + digital timer); AeroGuard + Smart/App
// (1 nozzle + PLC Smart Board/App); dual-nozzle upgrade. Source H: installs
// into the HVAC system after a manual coil clean.
const deployments = [
  {
    device: 'AeroGuard',
    deviceCopy: 'One nozzle on a digital timer, installed at the air handler after a manual coil clean. Set the schedule once and the cycles run on their own.',
    image: aeroguardRender,
    imageAlt: 'Genesis360 AeroGuard unit',
    facility: 'Most Homes',
    facilityCopy: 'A single air handler in a closet, attic or garage.',
    icon: House,
  },
  {
    device: 'AeroGuard + Smart/App',
    deviceCopy: 'The same unit with PLC Smart Board/App control: schedule and monitor from a phone, with low-liquid and power alerts. A dual-nozzle upgrade covers larger handlers.',
    image: closetUnit,
    imageAlt: 'Genesis360 AeroGuard beside a residential closet air handler',
    facility: 'Larger Homes & Second Systems',
    facilityCopy: 'Two handlers, a large one, or a homeowner who wants the record on their phone.',
    icon: Smartphone,
  },
];

// Source H p.2, "Homeowners should be aware of" (Today) and p.1 "Why
// homeowners should ask for Genesis360" (With Genesis360), both verbatim
// in substance.
const today = [
  'Indoor air quality concerns for sensitive individuals and those with a compromised immune system',
  'Clogged drain pans or drain lines that overflow or back up and damage the home',
  'Restricted airflow from dirty coils and buildup, and the higher operating costs that follow',
  'Musty or stale odors from mold and bacteria build-up',
];
const withGenesis = [
  'Supports cleaner HVAC pathways',
  'Helps reduce odor-causing buildup',
  'Helps target hidden wet mechanical areas',
  'Supports long-term HVAC cleanliness and comfort',
];

// Source H p.2, "How it works", five steps; titles verbatim.
const steps = [
  { title: 'Installed into the HVAC system', copy: 'Ideally after your evaporator coil has been manually cleaned, so the system starts from a clean slate.' },
  { title: 'Touches more of the pathway', copy: 'Once the system is manually cleaned, Genesis360 helps prevent future buildup across the coil, drain pan and duct pathway rather than one spot.' },
  { title: 'Automated treatment cycle', copy: 'The system is programmed to run on a schedule of your choosing.' },
  { title: 'Dry droplet distribution', copy: 'Sub-10-micron droplets move through the HVAC system with the airflow and settle without wetting surfaces.' },
  { title: 'Ongoing annual maintenance', copy: 'A suggested twice-a-year check that Genesis360 is running effectively, and a refill of the liquid tank.' },
];
---

<BaseLayout
  title="Genesis360 | HVAC | Residential"
  description="Clean air starts inside your HVAC system. Genesis360 AeroGuard treats the coil, drain pan and duct pathway on a schedule, so the air your family breathes starts cleaner."
>
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />
    <main>
      <!-- Source H p.1: headline verbatim; support from the opening paragraph. -->
      <SectorHero
        eyebrow="Residential"
        headline={['Clean Air Starts Inside', 'Your HVAC System.']}
        support="Your air conditioner moves the air your family lives, sleeps, works and breathes in every day."
        poster={market.hero.poster}
        video={market.hero.video}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
        secondaryCta={{ href: '#coverage-map', label: 'See Where It Reaches' }}
      />

      <!-- Source H p.2: heading verbatim; paragraphs from the air-path explanation. Stat: H p.2
           "Ongoing annual maintenance — Suggested twice a year observation ... and to refill the
           liquid tank." -->
      <ArgumentBand
        eyebrow="The Reality In Every Home"
        heading="What Could Be Hiding Inside Your HVAC System?"
        image={aeroguardOnHandler}
        imageAlt="Genesis360 AeroGuard releasing dry mist across the evaporator coil inside an air handler"
        statPosition="right"
        stat={{ value: '2×', caption: 'a year is all the maintenance the system asks for' }}
        paragraphs={[
          'Inside your HVAC system, air from your home is drawn into the air conditioner, cycles across the evaporator coil in a wet environment, through the mechanical cabinet, into the ductwork, and out through the vents in every room. Because the coil and drain pan naturally collect moisture, they collect biofilm, bacteria, mold, mildew, dust and odor-causing buildup over time.',
          'When the system turns on, the recycled air moves across those same areas and circulates through the home again. Genesis360 for HVAC targets the mechanical areas where that buildup begins, so cleaner air starts where the air starts.',
        ]}
        link={{ href: '#deployments', label: 'See The Systems' }}
      />

      <CoverageMap
        eyebrow="Coverage Map"
        heading="One System To Reach The Whole HVAC Pathway."
        lede="Most indoor air quality devices treat one spot. Genesis360 releases a dry mist inside the air handler that travels with the air itself, through the mechanical area and down the duct pathway."
        art={wholeHouse}
        artAlt="Cutaway of a house showing the attic air handler, ductwork, supply vents, closet furnace and outdoor condenser"
        mobileHeading="Whole-Pathway Coverage"
        mobileCopy="One unit at the air handler reaches the coil, the drain pan and the ductwork beyond."
        mobileIcon={Cloud}
        points={coveragePoints}
        stageAspect={1.7}
        artWidth={50}
      />

      <DeploymentCards
        heading="One Platform. Two Ways To Deploy It."
        intro="A timer for most homes, an app for the rest. Both install at the air handler and run on their own."
        cards={deployments}
      />

      <!-- Source H p.1 (odor paragraph) and p.2 (four concerns). -->
      <StatBand
        eyebrow="What Homeowners Should Know"
        heading="Masking An Odor Doesn't Fix Where It Starts."
        lede="Most odors start in the HVAC. Candles, sprays, plug-ins and deodorizers cover them up; if the odor originates inside the system, masking it does not solve the problem."
        figures={[
          { value: '4', label: 'Things to be aware of', copy: 'Sensitive occupants, clogged drain pans, restricted airflow and musty odors all trace back to the same wet mechanical areas.' },
          { value: '1', label: 'Place it all begins', copy: 'The evaporator coil and drain pan collect moisture by design, and everything the air carries with it.' },
        ]}
      >
        <CompareBand
          todayIntro="Homeowners should be aware of:"
          today={today}
          withIntro="Genesis360 for HVAC:"
          with={withGenesis}
        />
      </StatBand>

      <StepsBand
        eyebrow="How It Works"
        heading="Installed Once. Working Every Cycle."
        lede="Genesis360 fits into the maintenance your system already needs, then keeps working between visits."
        steps={steps}
        image={cleanDirty}
        imageAlt="Side-by-side comparison of a clean HVAC coil and drain pan with a dirty one"
        source="Results depend on application methods, the condition of the system, maintenance practice, and professional installation."
      />

      <!-- Contractor path. Source H p.2: "Ask your HVAC professional about adding Genesis360 to
           your home as a part of a cleaner indoor air and HVAC maintenance strategy." No pricing. -->
      <section class="bg-brand-100 py-16 sm:py-20">
        <div class="container-page">
          <div class="reveal grid items-center gap-8 rounded-2xl p-8 text-white sm:p-10 lg:grid-cols-[1.25fr_1fr]" style="background: linear-gradient(135deg, var(--bl-ink) 0%, var(--bl-ink-mid) 62%, var(--bl-ink-deep) 100%);" x-intersect.once="$el.classList.add('is-visible')">
            <div>
              <p class="bl-eyebrow" style="--bl-eyebrow-color: var(--bl-lime);">For HVAC Professionals</p>
              <h2 class="mt-3 text-2xl leading-snug sm:text-3xl">Add Genesis360 to the maintenance you already sell.</h2>
              <p class="mt-4 text-sm leading-7 text-white/75">Install it after the coil clean, set the schedule, and the system keeps the pathway clean between your visits. Homeowners are told to ask their HVAC professional about it; be the one they ask.</p>
            </div>
            <div class="lg:border-l lg:border-white/20 lg:pl-8">
              <a href="/get-a-quote/" class="bl-pill bl-pill-invert">Talk To Us About Dealer Pricing <ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>

      <PostsRow posts={relatedPosts} heading="From The Field" />
      <OtherMarkets heading="Other HVAC Markets" basePath="/hvac/" markets={otherMarkets} />
      <SectorCta
        variant="photo"
        image={familyHome}
        imageAlt="Family relaxing at home with clean indoor air"
        eyebrow="Your Home. Your Coverage Plan."
        heading="A Cleaner HVAC System. Fresher Air. Better Peace Of Mind."
        copy="Tell us about your system and who lives in the house, and our team will map the right AeroGuard configuration and connect you with an installer."
        href="/get-a-quote/"
      />
    </main>
    <Footer />
  </div>
</BaseLayout>
```
If a lucide icon name does not exist, substitute the nearest and note it.

- [ ] **Step 2: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/hvac/residential/index.html "Clean Air Starts Inside" "What Could Be Hiding Inside Your HVAC System?" "One System To Reach The Whole HVAC Pathway." "map-stage" "AeroGuard + Smart/App" "Homeowners should be aware of:" "Installed into the HVAC system" "Results depend on application methods" "For HVAC Professionals" "Talk To Us About Dealer Pricing" "A Cleaner HVAC System. Fresher Air. Better Peace Of Mind." "how-to-extend-the-lifespan-of-your-hvac-system" "!Related reading"; echo "dollar figures: $(grep -oE '\$[0-9]' dist/hvac/residential/index.html | wc -l | tr -d ' ')"; grep -c "<h1" dist/hvac/residential/index.html; npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `44 page(s) built`, thirteen `ok`, `dollar figures: 0`, h1 count 1, `8 errors`, brand passes.

- [ ] **Step 3: Tune the coverage-map anchors from a screenshot**

Serve and capture at 1280 wide (`python3 -m http.server 4399 --directory dist &`, then `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1280,7000 --virtual-time-budget=6000 --screenshot=<scratch>/hvac-res-1280.png http://127.0.0.1:4399/hvac/residential/`), view it, and adjust each `anchor {x,y}` until the dot sits on the feature it names (air handler cabinet in the attic, the closet cabinet's upper section for the coil, its base for the pan, the main trunk duct, a ceiling vent, the thermostat wall area or a vent for "Every Cycle"). Rebuild and re-capture until it reads right at 1280 and 1440; record the final values in the report. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/hvac/residential.astro
git commit -m "HVAC: rebuild /hvac/residential/ as the flagship page

Brochure copy, whole-house coverage map, two AeroGuard cards, homeowner
awareness band, how-it-works steps, contractor block, photo CTA. No pricing.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: `/hvac/` hub, and retire the old templates

**Files:**
- Create: `src/pages/hvac/index.astro`
- Modify: `src/pages/[...slug].astro` (remove the `'hvac'` entry from `getStaticPaths` and the whole `{canonicalSlug === 'hvac' && (...)}` block, which sits between the `human`-less `home-page` block and the `genesis360mistingsystems` block; remove the `hvacMarkets` import if nothing else in the file uses it)
- Delete: `src/pages/hvac/[slug].astro`

- [ ] **Step 1: Create the hub**

```astro
---
// src/pages/hvac/index.astro
// HVAC hub. Mirrors the ag and Human hubs on the shared sector blocks.
// Sources: H = Genesis360 HVAC.pdf (mission paragraphs, the "why homeowners
// should ask" list); the hero footage is the existing homepage rooftop clip.
// Spec: docs/superpowers/specs/2026-09-17-hvac-section-design.md
import { ClipboardList, FileText, TrendingUp } from '@lucide/astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import SectorCards from '../../components/sector/SectorCards.astro';
import DifferenceGrid from '../../components/sector/DifferenceGrid.astro';
import PostsRow from '../../components/sector/PostsRow.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import { hvacMarkets } from '../../data/hvac-markets';
import { posts } from '../../data/blog-posts';
import heroVideo from '../../assets/videos/application-hvac.mp4';
import heroPoster from '../../assets/images/hero-hvac-hub-poster.jpg';

const sectorCards = hvacMarkets.map((m) => ({
  title: m.title,
  tagline: m.tagline,
  href: `/hvac/${m.slug}/`,
  linkLabel: `Explore ${m.title.toLowerCase()}`,
  image: m.hero.poster,
  imageAlt: m.hero.posterAlt,
  stat: m.stat,
}));

const checklist = [
  { icon: FileText, label: 'Product & system use guides' },
  { icon: TrendingUp, label: 'Coverage and maintenance guidance' },
  { icon: ClipboardList, label: 'Industry resources' },
];

// Source H p.1, "Why homeowners should ask for Genesis360", three of four.
const points: { icon: 'droplet' | 'coverage' | 'cycle' | 'shield'; title: string; copy: string }[] = [
  { icon: 'coverage', title: 'Cleaner HVAC pathways', copy: 'The dry mist travels with the air through the mechanical area and down the duct pathway, not just the spot where it is released.' },
  { icon: 'droplet', title: 'Hidden wet areas, targeted', copy: 'The coil and drain pan collect moisture by design. Treatment reaches them every cycle, where buildup begins.' },
  { icon: 'cycle', title: 'Odor-causing buildup, reduced', copy: 'Most odors start in the HVAC. Treating the source beats masking the result.' },
];

const HVAC_POSTS = ['biofilm-hvac-prevention', 'how-to-extend-the-lifespan-of-your-hvac-system', 'how-to-identify-sick-building-syndrome-and-improve-indoor-air-quality-in-your-building'];
const hvacPosts = HVAC_POSTS.map((s) => posts.find((p) => p.slug === s)!).filter(Boolean);
---

<BaseLayout
  title="Genesis360 | HVAC"
  description="One platform for every air handler. Genesis360 AeroGuard treats the coil, drain pan and duct pathway on a schedule, from a single home to a plant that never switches off."
>
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />
    <main>
      <!-- Source H p.1 opening and "One system to reach the HVAC pathway". -->
      <SectorHero
        layout="split"
        eyebrow="HVAC"
        headline={['Cleaner Coils. Cleaner Ducts.', 'Cleaner Air.']}
        support="One Platform. Every Air Handler."
        lede="Your air handler does more than heat and cool. It moves the air people breathe every day across a wet coil, through a cabinet and down the ducts. Genesis360 keeps the inside of that system cleaner by targeting the mechanical areas where biofilm, bacteria, mold and odors begin."
        poster={heroPoster}
        video={heroVideo}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
        secondaryCta={{ href: '#sectors', label: 'Explore By Sector' }}
      />

      <!-- Mission band, same pattern as the ag and Human hubs. Source H p.1. -->
      <section class="relative overflow-hidden bg-white py-20 sm:py-24">
        <div class="particle-field particle-field-light" aria-hidden="true">
          <span class="particle"></span><span class="particle"></span><span class="particle"></span><span class="particle"></span><span class="particle"></span>
          <span class="particle"></span><span class="particle"></span><span class="particle"></span><span class="particle"></span><span class="particle"></span>
        </div>
        <div class="container-page relative">
          <h2 class="bl-h2 reveal mx-auto text-center" x-intersect.once="$el.classList.add('is-visible')">
            Our mission is simple.<br /><span class="text-brand-600">Genesis360 makes the air you breathe cleaner from the source.</span>
          </h2>
          <div class="reveal mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-2" x-intersect.once="$el.classList.add('is-visible')">
            <p class="text-base leading-8 text-brand-body">
              Most odors start in the HVAC. Homes and buildings reach for candles, sprays, plug-ins and deodorizers to cover them, but if the odor originates inside the system, masking it does not solve the problem. The coil and drain pan collect moisture by design, and with it the biofilm, bacteria and mold that ride the air into every room.
            </p>
            <p class="text-base leading-8 text-brand-body">
              Most indoor air quality devices treat one part of the system. Genesis360 uses a sub-10-micron dry mist released inside the air handler, so treatment travels with the air through the mechanical area and the downstream duct pathway, on a schedule, without anyone in the room.
            </p>
          </div>
        </div>
      </section>

      <SectorCards
        heading="One platform, from a hall closet to a rooftop."
        prompt="Select a sector to see what is at stake"
        cards={sectorCards}
        checklist={checklist}
      />

      <DifferenceGrid
        eyebrow="The Difference"
        heading="Delivery Is The Difference."
        lede="Genesis360 suspends BotaniMax sub-10-micron vapor in the moving air of the handler itself, treating the coil, the pan and the pathway at the same time."
        points={points}
        closing={{
          lead: 'The result: a cleaner system, fresher air and equipment that runs the way it was designed to.',
          aside: 'Every air handler is carrying the same wet, dark, dusty conditions. Genesis360 gives you a way to get ahead of the buildup instead of cleaning it out later.',
        }}
      />

      <PostsRow posts={hvacPosts} heading="From The Field" />

      <SectorCta
        eyebrow="Your Building. Your Coverage Plan."
        heading="Put Genesis360 To Work On Every Air Handler."
        copy="Tell us what the system serves and how it is maintained today. Our team will map the right AeroGuard configuration and build a practical coverage plan around it."
        href="/get-a-quote/"
      />
    </main>
    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Remove the `hvac` route from the catch-all and delete the old template**

Delete `    'hvac',` from the `getStaticPaths` array and the whole `{canonicalSlug === 'hvac' && ( ... )}` block in `src/pages/[...slug].astro`. Then:
```bash
grep -n "'hvac'\|canonicalSlug === 'hvac'\|hvacMarkets" "src/pages/[...slug].astro"; git rm -q "src/pages/hvac/[slug].astro"; ls src/pages/hvac/
```
Expected: no `'hvac'` or `canonicalSlug === 'hvac'` lines; if `hvacMarkets` is now unreferenced, remove its import too; `ls` shows `commercial.astro industrial.astro index.astro residential.astro`.

- [ ] **Step 3: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/hvac/index.html "Cleaner Air." "Genesis360 makes the air you breathe cleaner from the source." "sector-card" "/hvac/residential/" "/hvac/commercial/" "/hvac/industrial/" "Delivery Is The Difference." "Put Genesis360 To Work On Every Air Handler." "!Cleaner Air. Longer Equipment Life."; ls dist/hvac/; echo "dollar figures: $(grep -oE '\$[0-9]' dist/hvac/index.html | wc -l | tr -d ' ')"; npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `44 page(s) built`, nine `ok`, `ls` shows `commercial index.html industrial residential`, `dollar figures: 0`, `8 errors`, brand passes.

- [ ] **Step 4: Commit**

```bash
git add src/pages/hvac/index.astro "src/pages/[...slug].astro"
git commit -m "HVAC: rebuild the /hvac/ hub on the sector blocks; retire the old HVAC templates

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7: QA, cleanup, and the queue record

**Files:**
- Delete: `src/pages/dev/hvac-blocks.astro`
- Modify: `TASKS.md` (the "Build-out 2/5 — HVAC section" entry)

- [ ] **Step 1: Delete the kitchen sink; confirm 43 pages**

```bash
git rm -q src/pages/dev/hvac-blocks.astro; rmdir src/pages/dev 2>/dev/null; npm run build 2>&1 | grep -i "error\|page(s) built"
```

- [ ] **Step 2: Link sweep and heading check on the four pages**

```bash
for p in hvac/index.html hvac/residential/index.html hvac/commercial/index.html hvac/industrial/index.html; do grep -o 'href="/[^"#]*"' "dist/$p" | sed 's/href="//; s/"$//' | sort -u | while read -r h; do f="dist${h%/}/index.html"; [ -f "$f" ] || [ -f "dist$h" ] || echo "BROKEN in $p: $h"; done; printf '%-32s h1=%s\n' "$p" "$(grep -o '<h1' dist/$p | wc -l | tr -d ' ')"; done; echo "sweep done"
```
Expected: no `BROKEN`, `h1=1` each.

- [ ] **Step 3: Browser QA**

Serve `dist/` on a free port (check with `lsof -i :4399` first) and capture each of the four pages at 500 and 1280 wide with headless Chrome (this machine clamps widths under 500). Also capture a forced-hover probe of the hub (inject a `<style>` forcing `.sector-reveal` open and `.reveal` visible into a throwaway copy under `dist/hvac/hover-probe/`) and a forced-open probe of the residential coverage map (inject `.map-callout .map-detail{max-height:12rem!important;opacity:1!important;margin-top:.5rem!important}`). View every capture and judge: hero legibility, card grids (two across at 1280, stacked at 500), coverage-map dots on the right features with the six callouts readable, steps beside the image at 1280 and stacked at 500, contractor block, photo CTA two-column at 1280. Fix the smallest thing if something is off, rebuild, re-run that page's assert. Remove the probe directories. Stop the server.

- [ ] **Step 4: Final checks**

```bash
npx astro check 2>&1 | tail -4; npm run check:brand; git status --short
```

- [ ] **Step 5: Record in `TASKS.md`**

Check off `- [ ] Build-out 2/5 — HVAC section to ag/hog quality: ...` and indent a `Done YYYY-MM-DD:` note in the file's style: the four pages and tiers; the two new blocks; the data fields; which markets got footage and which use stills; the template retirement; QA findings and screenshot location; that everything is gated and unpushed; and a FLAG FOR MARTY line pointing at Questions 21–23 in `docs/QUESTIONS-FOR-MARTY.md` plus "all copy is drafted from the brochure and needs his read". Leave the umbrella "Build out the entire site" entry unchecked.

- [ ] **Step 6: Commit**

```bash
git add TASKS.md
git commit -m "HVAC section complete: remove dev kitchen sink, record outcome in TASKS.md

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

## Self-review notes

- Spec coverage: pages (3–6), CoverageMap/StepsBand (2), data + assets + footage (1), contractor block (5), disclaimer (5), copy rules (constraints + comments), QA (7), rollout (gated, unpushed).
- Interface consistency: `CoverageMap` props in Task 2 match the call in Task 5 (`points` with `sub?` used once, `stageAspect`, `artWidth`, `mobileIcon`); `StepsBand` `source` used in Task 5; `hero.posterAlt` from Task 1 consumed by the hub cards in Task 6; `market.hero.video` optional throughout.
- Prerequisite props (`statPosition`, `variant="photo"`) come from the merged batches and are verified in Task 1 Step 1.
