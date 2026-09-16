# Human Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the five Human pages (`/human/`, athletics, healthcare, schools, military) to the quality of the agriculture section, using shared sector blocks that HVAC will reuse next.

**Architecture:** Eleven presentational components under `src/components/sector/` are extracted from the ag pages' markup (same classes, same scoped CSS). Each Human page is a short static `.astro` file that composes those blocks with its own copy. `src/data/human-markets.ts` gains the fields more than one page reads. A temporary kitchen-sink page exercises each block as it lands and is deleted at the end.

**Tech Stack:** Astro 5 static build, Tailwind v4 via `@tailwindcss/vite`, Alpine.js (`x-data`, `x-intersect`), `@lucide/astro` icons, `astro:assets` `<Image>`, ffmpeg for video crops and posters, macOS `sips` for image resizing.

**Spec:** `docs/superpowers/specs/2026-09-16-human-section-design.md`

## Global Constraints

- Brand string is `Genesis360`, one word. `npm run check:brand` must pass after every task that touches copy.
- Product names exactly as the Sales Pricing Guide: Compact Wall Mount, Compact Pro, AeroGuard, Battery Powered Fogger, Rolling Stand, EnviroGuard, MediGuard Pro, PLC Smart Board/App.
- No dollar figures anywhere. No "Kinetic Systems". No "Secure Logic" in consumer copy except the case-study source line.
- Every claim gets an HTML comment naming its source file in `reference-files/` right next to the copy.
- Do not modify `src/pages/ag/*`, `Header.astro`, `Footer.astro`, `MegaMenu.astro`, `mega-menus.ts`, `public/_redirects`, or `src/data/launch-gate.ts`.
- `reference-files/` is gitignored. Never import from it; copy assets into `src/assets/` first.
- Baseline `npx astro check` has 8 errors, all in `src/pages/index.astro` and `src/pages/home-full.astro`. A task may not add to that count.
- Built page count stays 43 (five Human routes are replaced, none added) until the kitchen-sink page is deleted in the last task; while it exists the count is 44.
- Commit after every task with the message given. Commits stay local; do not push.
- Work from the repo root: `/Users/joshuariley/Sites/securelogic`.

## Verification helper

There is no test runner in this repo. The test cycle for every task is: `npm run build`, then assert on the built HTML with the helper below (created in Task 1), then `npx astro check` for the error count, then `npm run check:brand`.

---

## File Structure

| Path | Responsibility |
| --- | --- |
| `scripts/assert-html.mjs` | Test helper: asserts strings are present (or absent with a `!` prefix) in a built HTML file. |
| `src/components/sector/SectorHero.astro` | Page-top hero, `center` (sector pages) or `split` (hub) layout, video with still fallback. |
| `src/components/sector/ArgumentBand.astro` | Image + headline stat + copy band, or centered text-only variant. |
| `src/components/sector/StatBand.astro` | Dark two-figure stat band with optional slot for a CompareBand. |
| `src/components/sector/CompareBand.astro` | "Today" versus "With Genesis360" two-panel list. |
| `src/components/sector/DeploymentCards.astro` | "One Platform. N Ways To Deploy It." product cards. |
| `src/components/sector/DifferenceGrid.astro` | Three numbered mechanism cards plus closing panel. |
| `src/components/sector/CaseStudyBand.astro` | At-a-glance figures plus quotes on the dark ground. |
| `src/components/sector/SectorCards.astro` | Hub "blue box" flip-card row. |
| `src/components/sector/OtherMarkets.astro` | Grid of the sibling markets. |
| `src/components/sector/PostsRow.astro` | Related posts row; `AgPostsRow.astro` becomes a wrapper around it. |
| `src/components/sector/SectorCta.astro` | Closing CTA; `AgCta.astro` becomes a wrapper around it. |
| `src/data/human-markets.ts` | Adds `tagline`, `stat`, `package`, `hero` per market. |
| `src/assets/images/human-*.{png,jpg}` | Scene, product, and poster images copied from the reference folder. |
| `src/assets/videos/{clinic,classroom,barracks}.mp4` | Stock hero clips (Task 6), if found. |
| `src/pages/human/index.astro` | Hub page. |
| `src/pages/human/{athletics,healthcare,schools,military}.astro` | Sector pages. |
| `src/pages/dev/sector-blocks.astro` | Temporary kitchen sink, deleted in Task 12. |
| `src/pages/[...slug].astro` | `'human'` removed from `getStaticPaths` and its branch deleted (Task 11). |
| `src/pages/human/[slug].astro` | Deleted (Task 11). |

---

### Task 1: Test helper and the two generalized wrappers (PostsRow, SectorCta)

**Files:**
- Create: `scripts/assert-html.mjs`
- Create: `src/components/sector/PostsRow.astro`
- Create: `src/components/sector/SectorCta.astro`
- Modify: `src/components/AgPostsRow.astro` (whole file)
- Modify: `src/components/AgCta.astro` (whole file)

**Interfaces:**
- Produces: `node scripts/assert-html.mjs <dist-html-path> <needle> [<needle>...]` exits 0 when every needle is found; a needle prefixed with `!` must be absent. Prints one line per needle.
- Produces: `PostsRow` props `{ posts: BlogPost[]; heading?: string; showReadMore?: boolean }` (defaults `'From The Field'`, `true`).
- Produces: `SectorCta` props `{ eyebrow: string; heading: string; copy: string; href?: string; label?: string }` (defaults `'/contact-us/'`, `'Get A Quote'`).

- [ ] **Step 1: Record the ag pages' current HTML so the refactor can be proven byte-identical**

```bash
npm run build >/dev/null 2>&1 && mkdir -p /tmp/ag-baseline && for p in ag/index.html ag/hogs-livestock/index.html ag/poultry/index.html ag/indoor-growing/index.html; do cp "dist/$p" "/tmp/ag-baseline/$(echo $p | tr / _)"; done && ls /tmp/ag-baseline
```
Expected: four files listed.

- [ ] **Step 2: Create the assertion helper**

```js
// scripts/assert-html.mjs
// Usage: node scripts/assert-html.mjs dist/human/index.html "Human Health" "!Kinetic Systems"
// A needle starting with "!" must be ABSENT. Exit code 1 on any failure.
import { readFileSync } from 'node:fs';

const [file, ...needles] = process.argv.slice(2);
if (!file || needles.length === 0) {
  console.error('usage: assert-html.mjs <file> <needle> [needle...]  (prefix ! for must-be-absent)');
  process.exit(2);
}
const html = readFileSync(file, 'utf8');
let failed = 0;
for (const raw of needles) {
  const absent = raw.startsWith('!');
  const needle = absent ? raw.slice(1) : raw;
  const found = html.includes(needle);
  const ok = absent ? !found : found;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${absent ? 'absent ' : 'present'} ${JSON.stringify(needle)}`);
  if (!ok) failed++;
}
process.exit(failed ? 1 : 0);
```

- [ ] **Step 3: Run the helper against the current hog page to prove it works both ways**

```bash
node scripts/assert-html.mjs dist/ag/hogs-livestock/index.html "One Platform. Three Ways To Deploy It." "!Kinetic Systems" "this-string-does-not-exist"
```
Expected: two `ok` lines, one `FAIL present "this-string-does-not-exist"`, exit code 1.

- [ ] **Step 4: Create `PostsRow` with the exact body of today's `AgPostsRow`, plus a `heading` prop**

```astro
---
// src/components/sector/PostsRow.astro
// Related-reading row shared by every sector page. Extracted from
// AgPostsRow.astro (which now wraps this) so the Human and HVAC sections
// render the identical block. Heading is a prop because the ag pages say
// "From The Field" and other sectors will not.
import { ArrowRight } from '@lucide/astro';
import { Image } from 'astro:assets';
import type { BlogPost } from '../../data/blog-posts';

interface Props {
  posts: BlogPost[];
  heading?: string;
  /** Shown when there is more to read than the three shown here. */
  showReadMore?: boolean;
}

const { posts, heading = 'From The Field', showReadMore = true } = Astro.props;
---

{posts.length > 0 && (
  <section class="bg-white py-20 sm:py-24">
    <div class="container-page">
      <h2 class="bl-h2 reveal" x-intersect.once="$el.classList.add('is-visible')">{heading}</h2>

      <div class="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <a
            href={`/blogs/${post.slug}/`}
            class="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lift transition hover:-translate-y-1"
          >
            <Image
              src={post.image}
              alt={post.imageAlt}
              class="aspect-[16/9] w-full object-cover"
              widths={[420, 640, 860]}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
            <div class="flex flex-1 flex-col p-6">
              <time datetime={post.isoDate} class="text-xs font-bold uppercase tracking-[0.14em] text-brand-muted">
                {post.date}
              </time>
              <h3 class="mt-3 text-lg leading-7">{post.title}</h3>
              <span class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-600">
                Read article <ArrowRight class="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </a>
        ))}
      </div>

      {showReadMore && (
        <div class="mt-10 text-center">
          <a href="/blogs/" class="bl-pill-outline border-[1.5px] border-brand-600">
            Read More <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  </section>
)}
```

- [ ] **Step 5: Replace `AgPostsRow.astro` with a wrapper**

```astro
---
// src/components/AgPostsRow.astro
// Thin wrapper kept so the ag pages do not change. The block itself lives in
// sector/PostsRow.astro and is shared with the Human and HVAC sections.
import PostsRow from './sector/PostsRow.astro';
import type { BlogPost } from '../data/blog-posts';

interface Props {
  posts: BlogPost[];
  showReadMore?: boolean;
}

const { posts, showReadMore = true } = Astro.props;
---

<PostsRow posts={posts} heading="From The Field" showReadMore={showReadMore} />
```

- [ ] **Step 6: Create `SectorCta` with the exact body of today's `AgCta`, plus a `label` prop**

```astro
---
// src/components/sector/SectorCta.astro
// Closing CTA for every sector page. Extracted from AgCta.astro (which now
// wraps this). `href` defaults to /contact-us/ because /get-a-quote/ is
// unfinished; pages open during the soft launch pass the landing page's
// contact block instead.
import { ArrowRight } from '@lucide/astro';

interface Props {
  eyebrow: string;
  heading: string;
  copy: string;
  href?: string;
  label?: string;
}

const { eyebrow, heading, copy, href = '/contact-us/', label = 'Get A Quote' } = Astro.props;
---

<section class="relative isolate overflow-hidden bg-brand-100 py-20 text-center sm:py-24">
  <div
    class="reveal relative z-10 mx-auto max-w-3xl px-5 sm:px-6 lg:px-8"
    x-intersect.once="$el.classList.add('is-visible')"
  >
    <p class="bl-eyebrow">{eyebrow}</p>
    <h2 class="bl-h2 mt-4">{heading}</h2>
    <p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-brand-body">{copy}</p>

    <a href={href} class="bl-pill mt-10 shadow-lift-brand">
      {label} <ArrowRight class="h-4 w-4" aria-hidden="true" />
    </a>
  </div>
</section>
```

- [ ] **Step 7: Replace `AgCta.astro` with a wrapper**

```astro
---
// src/components/AgCta.astro
// Thin wrapper kept so the ag pages do not change. The block itself lives in
// sector/SectorCta.astro and is shared with the Human and HVAC sections.
//
// NOTE: the deck asked for two iconographic actions here ("call or email your
// sales representative" / "place an order now"). Reduced to a single Get A
// Quote at the client's request while /get-a-quote/ is unfinished.
import SectorCta from './sector/SectorCta.astro';

interface Props {
  eyebrow: string;
  heading: string;
  copy: string;
  href?: string;
}

const { eyebrow, heading, copy, href = '/contact-us/' } = Astro.props;
---

<SectorCta eyebrow={eyebrow} heading={heading} copy={copy} href={href} />
```

- [ ] **Step 8: Build and prove the four ag pages are byte-identical to the baseline**

```bash
npm run build >/dev/null 2>&1 && for p in ag/index.html ag/hogs-livestock/index.html ag/poultry/index.html ag/indoor-growing/index.html; do cmp -s "dist/$p" "/tmp/ag-baseline/$(echo $p | tr / _)" && echo "identical $p" || echo "DIFFERS  $p"; done
```
Expected: four `identical` lines. If any differs, run `diff` on it; the only acceptable difference is Astro's scoped-style hash (`data-astro-cid-*`) if a component's `<style>` moved. There are no `<style>` blocks in these two components, so expect none.

- [ ] **Step 9: Type check and brand check**

```bash
npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `8 errors` (unchanged baseline), brand check passes.

- [ ] **Step 10: Commit**

```bash
git add scripts/assert-html.mjs src/components/sector/PostsRow.astro src/components/sector/SectorCta.astro src/components/AgPostsRow.astro src/components/AgCta.astro
git commit -m "Extract PostsRow and SectorCta sector blocks; AgPostsRow/AgCta wrap them

Ag pages build byte-identical. Adds scripts/assert-html.mjs for built-HTML
assertions since the repo has no test runner.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Assets and the human-markets data extension

**Files:**
- Create: `src/assets/images/human-d1-gym.png`, `human-locker-room.png`, `human-classroom.png`, `human-police-station.png`, `human-compact-front.png`, `human-compact-iso.png`, `human-rolling-stand.png`, `human-fogger.png`
- Modify: `src/data/human-markets.ts` (whole file)

**Interfaces:**
- Produces: `Market` gains `tagline: string`, `stat: string`, `package: 'EnviroGuard' | 'MediGuard Pro' | null`, `hero: { poster: ImageMetadata; video?: string }`. Existing fields keep their names; `mega-menus.ts` and the blog cross-links keep working.

- [ ] **Step 1: Copy and resize the reference art into `src/assets/images/`**

The 4800px Compact renders are far larger than any render slot; cap them at 1600px wide. Scene images are copied at their native size.

```bash
R="reference-files/Joshua Riley"; I=src/assets/images
cp "$R/G360 in a D1 Gym.png"                          "$I/human-d1-gym.png"
cp "$R/EnviroGuard disinfecting a locker room scene.png" "$I/human-locker-room.png"
cp "$R/Genesis360 Fogger in a classroom.png"          "$I/human-classroom.png"
cp "$R/Genesis360 Fogger in a police station.png"     "$I/human-police-station.png"
cp "$R/Rolling Cart Image for Genesis360.png"         "$I/human-rolling-stand.png"
cp "$R/Genesis360 Fogger.png"                         "$I/human-fogger.png"
sips -Z 1600 "$R/Genesis360_Compact_front_clear.png" --out "$I/human-compact-front.png" >/dev/null
sips -Z 1600 "$R/Genesis360_Compact_iso1_clear.png"  --out "$I/human-compact-iso.png"   >/dev/null
for f in $I/human-*.png; do printf '%-40s ' "$(basename $f)"; sips -g pixelWidth -g pixelHeight "$f" | tail -2 | awk '{printf "%s ", $2}'; echo; done
```
Expected: eight files; the two Compact files report width 1600.

- [ ] **Step 2: Rewrite `src/data/human-markets.ts`**

Copy sources: `tagline`/`stat` for athletics from `reference-files/OneDrive_1_8-13-2026/Athletics Competitive Comparison.pdf` and `Tarleton University CaseStudy.pdf`; healthcare and schools from the existing `heroCopy` and the Sales Pricing Guide package descriptions; military from the existing `heroCopy` only.

```ts
// src/data/human-markets.ts
import type { ImageMetadata } from 'astro';
import { Dumbbell, GraduationCap, HeartPulse, ShieldCheck } from '@lucide/astro';
import schoolAirQuality from '../assets/images/blog-school-air-quality.png';
import wrestling from '../assets/images/blog-wrestling.png';
import portableMist from '../assets/images/portable-mist.png';
import medicalMist from '../assets/images/medical-mist.png';
import gymScene from '../assets/images/human-d1-gym.png';
import classroomScene from '../assets/images/human-classroom.png';
import policeScene from '../assets/images/human-police-station.png';
import compactIso from '../assets/images/human-compact-iso.png';

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
  hero: { poster: ImageMetadata; video?: string };
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
    package: 'EnviroGuard',
    hero: { poster: classroomScene },
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
    package: 'EnviroGuard',
    hero: { poster: gymScene },
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
    package: null,
    hero: { poster: policeScene },
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
    package: 'MediGuard Pro',
    hero: { poster: compactIso },
  },
];
```

Note the healthcare `heroCopy` drops the old product name "Genesis360 Medical Dry Fog", which is not a Sales Pricing Guide name, and the `imageAlt` no longer says "Medical Dry Fog system product".

- [ ] **Step 3: Build, then assert the mega-menu still renders all four markets and the old product name is gone**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/about-us/index.html "/human/schools/" "/human/athletics/" "/human/military/" "/human/healthcare/" "!Medical Dry Fog system product"
```
Expected: `43 page(s) built`, five `ok` lines.

- [ ] **Step 4: Type check and brand check**

```bash
npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `8 errors`, brand passes.

- [ ] **Step 5: Commit**

```bash
git add src/assets/images/human-*.png src/data/human-markets.ts
git commit -m "Human markets: add tagline, stat, package, hero fields and scene art

Product naming follows the Sales Pricing Guide (EnviroGuard, MediGuard Pro);
drops the retired 'Medical Dry Fog' name.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: SectorHero and the kitchen-sink page

**Files:**
- Create: `src/components/sector/SectorHero.astro`
- Create: `src/pages/dev/sector-blocks.astro`

**Interfaces:**
- Produces: `SectorHero` props
  ```ts
  interface Props {
    layout?: 'center' | 'split';   // default 'center'
    eyebrow: string;
    headline: [string, string];    // second line renders in lime
    support: string;
    poster: ImageMetadata;
    video?: string;                // imported mp4 URL
    cta: { href: string; label: string };
    secondaryCta?: { href: string; label: string };
    /** split only: the longer paragraph under the support line */
    lede?: string;
  }
  ```

- [ ] **Step 1: Create `SectorHero.astro`**

The `center` markup is the hog/poultry hero verbatim. The `split` markup is the ag hub hero verbatim (media panel on the right, masked into the gradient). The still fallback keeps the same overlay so a page without footage looks like its siblings.

```astro
---
// src/components/sector/SectorHero.astro
// Sector page hero. `center` is the hog/poultry treatment (full-bleed footage,
// centred copy). `split` is the ag hub treatment (copy left, media panel
// right, masked into the gradient). Both fall back to the poster as a still
// when no video is passed, with the same overlay, so a page without footage
// still reads as part of the set.
import { ArrowRight } from '@lucide/astro';
import type { ImageMetadata } from 'astro';

interface Props {
  layout?: 'center' | 'split';
  eyebrow: string;
  /** Two lines; the second renders in lime. */
  headline: [string, string];
  support: string;
  poster: ImageMetadata;
  video?: string;
  cta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  /** split only: the longer paragraph under the support line. */
  lede?: string;
}

const { layout = 'center', eyebrow, headline, support, poster, video, cta, secondaryCta, lede } = Astro.props;
---

{layout === 'center' ? (
  <section class="relative isolate overflow-hidden text-white" style="--bl-eyebrow-color: var(--bl-lime);">
    {video ? (
      <video
        class="absolute inset-0 h-full w-full object-cover"
        src={video}
        poster={poster.src}
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        aria-hidden="true"
      ></video>
    ) : (
      <img class="absolute inset-0 h-full w-full object-cover" src={poster.src} alt="" aria-hidden="true" />
    )}
    <div class="absolute inset-0 bg-[linear-gradient(0deg,hsl(236_78%_16%/.94)_0%,hsl(229_76%_24%/.82)_48%,hsl(221_82%_20%/.78)_100%)]"></div>

    <div class="container-page relative grid min-h-[min(78vh,680px)] place-items-center py-20 text-center sm:py-24">
      <div class="mx-auto max-w-3xl">
        <p class="bl-eyebrow">{eyebrow}</p>
        <h1 class="mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
          {headline[0]}<br /><span class="text-lime-400">{headline[1]}</span>
        </h1>
        <p class="mx-auto mt-6 max-w-md text-balance text-lg font-medium leading-8 text-white/75 sm:max-w-lg sm:text-xl sm:leading-9">
          {support}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <a href={cta.href} class="bl-pill">{cta.label}</a>
          {secondaryCta && (
            <a href={secondaryCta.href} class="bl-pill-outline border-[1.5px] border-white/60">{secondaryCta.label} <ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
          )}
        </div>
      </div>
    </div>
  </section>
) : (
  <section class="relative overflow-hidden text-white" style="--bl-eyebrow-color: var(--bl-lime); background: linear-gradient(150deg, var(--bl-ink) 0%, var(--bl-ink-mid) 52%, var(--bl-ink-deep) 100%);">
    <!-- Media panel on the right. It fades into the brand gradient well before
         the text column, so the headline never sits on moving footage. -->
    <div class="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block" aria-hidden="true">
      {video ? (
        <video
          class="h-full w-full object-cover"
          style="mask-image: linear-gradient(90deg, transparent 0%, rgb(0 0 0 / 0.25) 26%, rgb(0 0 0 / 0.7) 52%, #000 78%); -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgb(0 0 0 / 0.25) 26%, rgb(0 0 0 / 0.7) 52%, #000 78%);"
          src={video}
          poster={poster.src}
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        ></video>
      ) : (
        <img
          class="h-full w-full object-cover"
          style="mask-image: linear-gradient(90deg, transparent 0%, rgb(0 0 0 / 0.25) 26%, rgb(0 0 0 / 0.7) 52%, #000 78%); -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgb(0 0 0 / 0.25) 26%, rgb(0 0 0 / 0.7) 52%, #000 78%);"
          src={poster.src}
          alt=""
        />
      )}
      <div class="absolute inset-0" style="background: linear-gradient(90deg, transparent 0%, rgb(16 32 74 / 0.28) 45%, rgb(16 32 74 / 0.42) 100%);"></div>
    </div>
    <div class="pointer-events-none absolute inset-0 opacity-40" style="background: radial-gradient(circle at 78% 12%, rgb(120 210 160 / 0.22), transparent 42%), radial-gradient(circle at 8% 92%, rgb(80 130 255 / 0.28), transparent 44%);"></div>

    <div class="container-page relative py-20 sm:py-24">
      <p class="bl-eyebrow">{eyebrow}</p>
      <h1 class="mt-5 max-w-4xl text-4xl leading-[1.06] sm:text-5xl lg:text-6xl">
        {headline[0]}<br /><span class="text-lime-400">{headline[1]}</span>
      </h1>
      <p class="mt-6 max-w-xl text-lg font-semibold text-white/75 sm:text-xl">{support}</p>
      {lede && <p class="mt-8 max-w-xl text-base leading-8 text-white/75 sm:text-lg">{lede}</p>}
      <div class="mt-10 flex flex-wrap gap-3">
        <a href={cta.href} class="bl-pill">{cta.label}</a>
        {secondaryCta && (
          <a href={secondaryCta.href} class="bl-pill-outline">{secondaryCta.label} <ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
        )}
      </div>
    </div>
  </section>
)}
```

- [ ] **Step 2: Create the kitchen-sink page with both hero layouts**

```astro
---
// src/pages/dev/sector-blocks.astro
// TEMPORARY. Exercises every sector block while they are being built so each
// one has a built page to assert against. Deleted in the last task of
// docs/superpowers/plans/2026-09-16-human-section.md. Gated in production
// like every interior page.
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import gymVideo from '../../assets/videos/gym.mp4';
import gymScene from '../../assets/images/human-d1-gym.png';
import classroomScene from '../../assets/images/human-classroom.png';
---

<BaseLayout title="DEV | Sector blocks" description="Temporary kitchen sink for the sector block components.">
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />
    <main>
      <SectorHero
        eyebrow="Kitchen Sink"
        headline={['Center Layout.', 'With Video.']}
        support="Sector page hero with footage."
        poster={gymScene}
        video={gymVideo}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
      />
      <SectorHero
        layout="split"
        eyebrow="Kitchen Sink"
        headline={['Split Layout.', 'Still Fallback.']}
        support="Hub hero without footage."
        lede="A longer paragraph that only the split layout renders."
        poster={classroomScene}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
        secondaryCta={{ href: '#sectors', label: 'Explore By Sector' }}
      />
    </main>
    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 3: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/dev/sector-blocks/index.html "<video" "Center Layout." "text-lime-400\">With Video." "Still Fallback." "A longer paragraph that only the split layout renders." "Explore By Sector"
```
Expected: `44 page(s) built`, six `ok`.

- [ ] **Step 4: Type check**

```bash
npx astro check 2>&1 | tail -4
```
Expected: `8 errors`.

- [ ] **Step 5: Commit**

```bash
git add src/components/sector/SectorHero.astro src/pages/dev/sector-blocks.astro
git commit -m "Add SectorHero block (center/split, video with still fallback) and dev kitchen sink

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: ArgumentBand, StatBand, CompareBand

**Files:**
- Create: `src/components/sector/ArgumentBand.astro`
- Create: `src/components/sector/StatBand.astro`
- Create: `src/components/sector/CompareBand.astro`
- Modify: `src/pages/dev/sector-blocks.astro`

**Interfaces:**
- Produces:
  ```ts
  // ArgumentBand
  interface Props {
    eyebrow: string; heading: string;
    /** Paragraphs render in order. Pass via the default slot instead when copy needs inline markup. */
    paragraphs?: string[];
    image?: ImageMetadata; imageAlt?: string;
    stat?: { value: string; caption: string };
    /** Optional link under the copy, e.g. to #deployments. */
    link?: { href: string; label: string };
  }
  // StatBand — default slot renders below the figures (CompareBand goes there)
  interface Props {
    eyebrow: string; heading: string; lede: string;
    figures: [Figure, Figure];  // { value: string; label: string; copy: string }
  }
  // CompareBand
  interface Props {
    todayHeading?: string;  // default 'Today'
    todayIntro: string; today: string[];
    withHeading?: string;   // default 'With Genesis360'
    withIntro: string; with: string[];
  }
  ```

- [ ] **Step 1: Create `ArgumentBand.astro`**

Image variant is the hog "Pathogens Don't Respect Walls" band; centered variant is the poultry "A Flock Doesn't Get A Warning" band. The `stat-rule` class is defined in this component's `<style>` because the hog page defined it inline.

```astro
---
// src/components/sector/ArgumentBand.astro
// The sector page's argument. With an image: half photograph (with an optional
// headline stat riding on it), half copy — the hog page's "The Reality In Every
// Barn". Without an image: the centred text band from the poultry page.
import { ArrowRight } from '@lucide/astro';
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';

interface Props {
  eyebrow: string;
  heading: string;
  paragraphs?: string[];
  image?: ImageMetadata;
  imageAlt?: string;
  stat?: { value: string; caption: string };
  link?: { href: string; label: string };
}

const { eyebrow, heading, paragraphs = [], image, imageAlt = '', stat, link } = Astro.props;
---

<style>
  .stat-rule {
    height: 3px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--bl-lime), rgb(166 217 96 / 0));
  }
</style>

{image ? (
  <section class="relative isolate overflow-hidden bg-brand-100">
    <div class="grid lg:grid-cols-2">
      <div class="relative min-h-[22rem] lg:min-h-full">
        <Image
          src={image}
          alt={imageAlt}
          class="absolute inset-0 h-full w-full object-cover"
          widths={[640, 960, 1280]}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <span class="absolute inset-0" aria-hidden="true" style="background: linear-gradient(105deg, rgb(16 32 74 / 0.42) 0%, rgb(16 32 74 / 0.28) 58%, rgb(16 32 74 / 0.06) 100%);"></span>

        {stat && (
          <div class="absolute bottom-0 left-0 p-8 text-white sm:p-10">
            <p class="text-[5.5rem] font-extrabold leading-[0.85] tracking-tight sm:text-[7.5rem] lg:text-[9.5rem]">{stat.value}</p>
            <div class="stat-rule mt-4 w-32 sm:w-44 lg:w-56"></div>
            <p class="mt-4 max-w-[15rem] text-base font-semibold text-white/75">{stat.caption}</p>
          </div>
        )}
      </div>

      <div class="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
        <p class="bl-eyebrow">{eyebrow}</p>
        <h2 class="bl-h2 mt-4">{heading}</h2>
        <div class="mt-7 space-y-6 text-base leading-8 text-brand-body sm:text-lg">
          {paragraphs.map((p) => <p>{p}</p>)}
          <slot />
        </div>
        {link && (
          <div class="mt-9 flex justify-center lg:justify-start">
            <a href={link.href} class="bl-pill-outline border-[1.5px] border-brand-600">{link.label} <ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
          </div>
        )}
      </div>
    </div>
  </section>
) : (
  <section class="bg-brand-100 py-20 sm:py-24">
    <div class="container-page">
      <div class="mx-auto max-w-3xl text-center">
        <p class="bl-eyebrow">{eyebrow}</p>
        <h2 class="bl-h2 mt-4 text-balance">{heading}</h2>
        <div class="mx-auto mt-7 space-y-6 text-balance text-base leading-8 text-brand-body sm:text-lg">
          {paragraphs.map((p) => <p>{p}</p>)}
          <slot />
        </div>
        {link && (
          <div class="mt-9">
            <a href={link.href} class="bl-pill-outline border-[1.5px] border-brand-600">{link.label} <ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
          </div>
        )}
      </div>
    </div>
  </section>
)}
```

- [ ] **Step 2: Create `StatBand.astro`**

```astro
---
// src/components/sector/StatBand.astro
// Two big figures on the dark gradient — the hog page's "The Cost Of Waiting".
// Whatever is slotted in renders below the figures; CompareBand is the usual
// occupant, exactly as on the hog page.
interface Figure {
  value: string;
  label: string;
  copy: string;
}

interface Props {
  eyebrow: string;
  heading: string;
  lede: string;
  figures: [Figure, Figure];
}

const { eyebrow, heading, lede, figures } = Astro.props;
---

<section class="relative overflow-hidden py-20 text-white sm:py-24" style="--bl-eyebrow-color: var(--bl-lime); background: linear-gradient(160deg, var(--bl-ink) 0%, var(--bl-ink-mid) 58%, var(--bl-ink-deep) 100%);">
  <div class="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" style="background: radial-gradient(circle at 84% 8%, rgb(82 194 76 / 0.14), transparent 44%), radial-gradient(circle at 6% 92%, rgb(62 103 232 / 0.4), transparent 46%);"></div>

  <div class="container-page relative">
    <div class="reveal mx-auto max-w-3xl text-center" x-intersect.once="$el.classList.add('is-visible')">
      <p class="bl-eyebrow">{eyebrow}</p>
      <h2 class="bl-h2 mt-4">{heading}</h2>
      <p class="mx-auto mt-6 max-w-lg text-balance text-base leading-8 text-white/75 sm:max-w-xl sm:text-lg sm:leading-9">{lede}</p>
    </div>

    <!-- The two figures, unboxed, separated by a hairline. -->
    <div class="reveal mx-auto mt-14 grid max-w-2xl gap-10 border-y border-white/15 py-10 sm:grid-cols-2 sm:gap-0" x-intersect.once="$el.classList.add('is-visible')">
      <div class="text-center sm:pr-8 sm:text-left">
        <p class="text-5xl font-extrabold leading-none text-lime-400 sm:text-6xl">{figures[0].value}</p>
        <p class="mt-4 text-sm font-bold uppercase tracking-[0.12em]">{figures[0].label}</p>
        <p class="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/55 sm:mx-0">{figures[0].copy}</p>
      </div>
      <div class="text-center sm:border-l sm:border-white/15 sm:pl-8 sm:text-left">
        <p class="text-5xl font-extrabold leading-none text-lime-400 sm:text-6xl">{figures[1].value}</p>
        <p class="mt-4 text-sm font-bold uppercase tracking-[0.12em]">{figures[1].label}</p>
        <p class="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/55 sm:mx-0">{figures[1].copy}</p>
      </div>
    </div>

    <slot />
  </div>
</section>
```

- [ ] **Step 3: Create `CompareBand.astro`**

```astro
---
// src/components/sector/CompareBand.astro
// "Today" versus "With Genesis360" — the hog page's Module 3 panels. Designed
// to sit inside StatBand's slot (dark ground); the Genesis360 side is lifted
// by a lime edge and glow instead of a different fill.
import { Check, X } from '@lucide/astro';

interface Props {
  todayHeading?: string;
  todayIntro: string;
  today: string[];
  withHeading?: string;
  withIntro: string;
  with: string[];
}

const { todayHeading = 'Today', todayIntro, today, withHeading = 'With Genesis360', withIntro, with: withItems } = Astro.props;
---

<style>
  .genesis-panel {
    position: relative;
    box-shadow: 0 0 0 1px rgb(166 217 96 / 0.4), 0 14px 34px -26px rgb(82 194 76 / 0.5);
  }

  .genesis-panel::before {
    content: '';
    position: absolute;
    left: 2rem;
    right: 2rem;
    top: -1px;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, var(--bl-lime), transparent);
  }
</style>

<div class="mt-12 grid gap-6 lg:grid-cols-2">
  <div class="rounded-2xl border border-white/15 bg-white/[0.07] p-8">
    <p class="text-sm font-bold uppercase tracking-[0.12em] text-white">{todayHeading}</p>
    <p class="mt-2 text-lg text-white">{todayIntro}</p>
    <ul class="mt-7 space-y-5">
      {today.map((item) => (
        <li class="flex gap-3">
          <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20">
            <X class="h-3 w-3 text-red-400" aria-hidden="true" />
          </span>
          <span class="text-sm leading-7 text-white">{item}</span>
        </li>
      ))}
    </ul>
  </div>

  <div class="genesis-panel rounded-2xl border border-white/15 bg-white/[0.07] p-8">
    <p class="text-sm font-bold uppercase tracking-[0.12em] text-lime-400">{withHeading}</p>
    <p class="mt-2 text-lg text-white">{withIntro}</p>
    <ul class="mt-7 space-y-5">
      {withItems.map((item) => (
        <li class="flex gap-3">
          <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-400/20">
            <Check class="h-3 w-3 text-lime-400" aria-hidden="true" />
          </span>
          <span class="text-sm leading-7 text-white">{item}</span>
        </li>
      ))}
    </ul>
  </div>
</div>
```

- [ ] **Step 4: Add all three to the kitchen sink**

Add the imports after the `SectorHero` import and the markup after the second `SectorHero`:

```astro
import ArgumentBand from '../../components/sector/ArgumentBand.astro';
import StatBand from '../../components/sector/StatBand.astro';
import CompareBand from '../../components/sector/CompareBand.astro';
```

```astro
      <ArgumentBand
        eyebrow="Kitchen Sink"
        heading="Argument With Image."
        paragraphs={['First paragraph of the argument.', 'Second paragraph of the argument.']}
        image={gymScene}
        imageAlt="Genesis360 unit in a college gym"
        stat={{ value: '72+', caption: 'hours bacteria survive on mats' }}
        link={{ href: '#deployments', label: 'See The Systems' }}
      />
      <ArgumentBand
        eyebrow="Kitchen Sink"
        heading="Argument Centered."
        paragraphs={['Text-only variant.']}
      />
      <StatBand
        eyebrow="Kitchen Sink"
        heading="Two Figures."
        lede="Lede under the heading."
        figures={[
          { value: '60–100%', label: 'Figure one label', copy: 'Figure one copy.' },
          { value: '#1', label: 'Figure two label', copy: 'Figure two copy.' },
        ]}
      >
        <CompareBand
          todayIntro="Today means:"
          today={['Today item one', 'Today item two']}
          withIntro="You have the ability to:"
          with={['With item one', 'With item two']}
        />
      </StatBand>
```

- [ ] **Step 5: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/dev/sector-blocks/index.html "Argument With Image." "hours bacteria survive on mats" "See The Systems" "Argument Centered." "Two Figures." "Figure two label" "Today item two" "With item one" "genesis-panel"
```
Expected: `44 page(s) built`, nine `ok`.

- [ ] **Step 6: Type check**

```bash
npx astro check 2>&1 | tail -4
```
Expected: `8 errors`.

- [ ] **Step 7: Commit**

```bash
git add src/components/sector/ArgumentBand.astro src/components/sector/StatBand.astro src/components/sector/CompareBand.astro src/pages/dev/sector-blocks.astro
git commit -m "Add ArgumentBand, StatBand, CompareBand sector blocks

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5: DeploymentCards, DifferenceGrid, CaseStudyBand, SectorCards, OtherMarkets

**Files:**
- Create: `src/components/sector/DeploymentCards.astro`
- Create: `src/components/sector/DifferenceGrid.astro`
- Create: `src/components/sector/CaseStudyBand.astro`
- Create: `src/components/sector/SectorCards.astro`
- Create: `src/components/sector/OtherMarkets.astro`
- Modify: `src/pages/dev/sector-blocks.astro`

**Interfaces:**
- Consumes: `AnimatedStatIcon` (`src/components/AnimatedStatIcon.astro`) with `kind: 'droplet' | 'coverage' | 'cycle' | 'shield'`.
- Produces:
  ```ts
  // DeploymentCards
  interface Card { device: string; deviceCopy: string; image: ImageMetadata; imageAlt: string; facility: string; facilityCopy: string; icon: typeof Truck }
  interface Props { id?: string /* default 'deployments' */; heading: string; intro: string; cards: Card[] }
  // DifferenceGrid
  interface Point { icon: 'droplet' | 'coverage' | 'cycle' | 'shield'; title: string; copy: string }
  interface Props { eyebrow: string; heading: string; lede: string; points: Point[]; closing: { lead: string; aside: string } }
  // CaseStudyBand
  interface Props { eyebrow: string; heading: string; intro: string; glance: { label: string; value: string }[]; quotes: { text: string; attribution: string }[]; source: string }
  // SectorCards
  interface Card { title: string; tagline: string; href: string; linkLabel: string; image: ImageMetadata; imageAlt: string; stat: string }
  interface Props { id?: string /* default 'sectors' */; heading: string; prompt: string; cards: Card[]; checklist: { icon: typeof FileText; label: string }[] }
  // OtherMarkets
  interface Props { heading: string; basePath: string /* e.g. '/human/' */; markets: { slug: string; title: string; summary: string; icon: typeof Dumbbell }[] }
  ```

- [ ] **Step 1: Create `DeploymentCards.astro`** (hog Module 2, verbatim markup; `product-card` styles moved in)

```astro
---
// src/components/sector/DeploymentCards.astro
// "One Platform. N Ways To Deploy It." Front of each card is the Genesis360
// unit, the strip beneath is the facility it serves — the hog page's Module 2.
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';
// Value import (not `import type`): `typeof Truck` needs the runtime binding.
import { Truck } from '@lucide/astro';

interface Card {
  device: string;
  deviceCopy: string;
  image: ImageMetadata;
  imageAlt: string;
  facility: string;
  facilityCopy: string;
  icon: typeof Truck;
}

interface Props {
  id?: string;
  heading: string;
  intro: string;
  cards: Card[];
}

const { id = 'deployments', heading, intro, cards } = Astro.props;
---

<style>
  /* The product cards grow on hover. Scaling the card would blur its text, so
     the frame lifts and the render inside it scales. */
  .product-card {
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease;
  }

  .product-card:hover {
    transform: translateY(-6px);
  }

  .product-card img {
    transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .product-card:hover img {
    transform: scale(1.1);
  }

  @media (prefers-reduced-motion: reduce) {
    .product-card,
    .product-card img,
    .product-card:hover,
    .product-card:hover img {
      transform: none;
      transition: none;
    }
  }
</style>

<section id={id} class="relative overflow-hidden bg-white py-20 sm:py-24">
  <div class="particle-field particle-field-light" aria-hidden="true">
    <span class="particle"></span>
    <span class="particle"></span>
    <span class="particle"></span>
    <span class="particle"></span>
    <span class="particle"></span>
    <span class="particle"></span>
    <span class="particle"></span>
    <span class="particle"></span>
    <span class="particle"></span>
    <span class="particle"></span>
  </div>
  <div class="container-page relative">
    <div class="reveal mx-auto max-w-3xl text-center" x-intersect.once="$el.classList.add('is-visible')">
      <h2 class="bl-h2">{heading}</h2>
      <p class="mt-5 text-base leading-7 text-brand-body">{intro}</p>
    </div>

    <div class:list={['mt-12 grid gap-6', cards.length === 2 ? 'md:grid-cols-2 lg:mx-auto lg:max-w-4xl' : 'md:grid-cols-3']}>
      {cards.map(({ facility, facilityCopy, icon: Icon, device, deviceCopy, image, imageAlt }) => (
        <div class="product-card flex flex-col overflow-hidden rounded-2xl border border-brand-200/55 bg-white shadow-lift">
          <div class="flex h-52 items-center justify-center bg-white p-6">
            <Image src={image} alt={imageAlt} class="max-h-40 w-auto object-contain mix-blend-multiply" widths={[150, 300]} sizes="180px" />
          </div>
          <div class="flex flex-1 flex-col p-7">
            <p class="bl-eyebrow">Genesis360</p>
            <h3 class="mt-1 text-2xl">{device}</h3>
            <p class="mt-3 text-sm leading-6 text-brand-body">{deviceCopy}</p>
            <div class="mt-6 flex items-start gap-3 border-t border-brand-200/55 pt-5">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-100">
                <Icon class="h-4 w-4 text-brand-600" aria-hidden="true" />
              </span>
              <span>
                <span class="block text-sm font-bold text-brand-900">{facility}</span>
                <span class="mt-1 block text-sm leading-6 text-brand-muted">{facilityCopy}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `DifferenceGrid.astro`** (ag hub "Deployment Is The Difference", verbatim)

```astro
---
// src/components/sector/DifferenceGrid.astro
// Three numbered mechanism cards and a closing two-column panel — the ag hub's
// "Deployment Is The Difference" section.
import AnimatedStatIcon from '../AnimatedStatIcon.astro';

interface Point {
  icon: 'droplet' | 'coverage' | 'cycle' | 'shield';
  title: string;
  copy: string;
}

interface Props {
  eyebrow: string;
  heading: string;
  lede: string;
  points: Point[];
  closing: { lead: string; aside: string };
}

const { eyebrow, heading, lede, points, closing } = Astro.props;
---

<section class="relative overflow-hidden py-20 sm:py-24 bg-brand-100">
  <div class="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" style="background: radial-gradient(circle at 88% 6%, rgb(29 63 214 / 0.1), transparent 46%), radial-gradient(circle at 4% 96%, rgb(82 194 76 / 0.09), transparent 44%);"></div>

  <div class="container-page relative">
    <div class="reveal max-w-3xl" x-intersect.once="$el.classList.add('is-visible')">
      <p class="bl-eyebrow">{eyebrow}</p>
      <h2 class="bl-h2 mt-4">{heading}</h2>
      <p class="mt-6 text-base leading-8 text-brand-body sm:text-lg">{lede}</p>
    </div>

    <div class="reveal mt-14 grid gap-5 md:grid-cols-3" x-intersect.once="$el.classList.add('is-visible')">
      {points.map(({ icon, title, copy }, i) => (
        <div class="relative flex flex-col rounded-2xl bg-white p-8 shadow-lift">
          <span class="absolute right-7 top-7 text-5xl font-extrabold leading-none text-brand-100" aria-hidden="true">0{i + 1}</span>
          <span class="flex h-14 w-14 items-center justify-center text-brand-600" style="--ai-accent: var(--bl-green);">
            <AnimatedStatIcon kind={icon} class="h-14 w-14" />
          </span>
          <h3 class="mt-6 text-xl">{title}</h3>
          <p class="mt-3 text-sm leading-6 text-brand-body">{copy}</p>
        </div>
      ))}
    </div>

    <div class="mt-12 grid items-center gap-8 rounded-2xl p-8 text-white sm:p-10 lg:grid-cols-[1.25fr_1fr]" style="background: linear-gradient(135deg, var(--bl-ink) 0%, var(--bl-ink-mid) 62%, var(--bl-ink-deep) 100%);">
      <p class="text-xl leading-9 sm:text-2xl">{closing.lead}</p>
      <p class="text-sm leading-7 text-white/75 lg:border-l lg:border-white/20 lg:pl-8">{closing.aside}</p>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create `CaseStudyBand.astro`** (new; reuses StatBand's ground and the CompareBand panel style)

```astro
---
// src/components/sector/CaseStudyBand.astro
// A field result on the dark ground: at-a-glance figures in a hairline grid,
// then the people who were there. New for the Human section (the ag pages
// have no case study yet); grounds and type match StatBand.
import { Quote } from '@lucide/astro';

interface Props {
  eyebrow: string;
  heading: string;
  intro: string;
  glance: { label: string; value: string }[];
  quotes: { text: string; attribution: string }[];
  /** One line naming the document(s) the figures come from. */
  source: string;
}

const { eyebrow, heading, intro, glance, quotes, source } = Astro.props;
---

<section class="relative overflow-hidden py-20 text-white sm:py-24" style="--bl-eyebrow-color: var(--bl-lime); background: linear-gradient(160deg, var(--bl-ink) 0%, var(--bl-ink-mid) 58%, var(--bl-ink-deep) 100%);">
  <div class="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" style="background: radial-gradient(circle at 12% 10%, rgb(82 194 76 / 0.14), transparent 44%), radial-gradient(circle at 92% 90%, rgb(62 103 232 / 0.4), transparent 46%);"></div>

  <div class="container-page relative">
    <div class="reveal mx-auto max-w-3xl text-center" x-intersect.once="$el.classList.add('is-visible')">
      <p class="bl-eyebrow">{eyebrow}</p>
      <h2 class="bl-h2 mt-4">{heading}</h2>
      <p class="mx-auto mt-6 max-w-xl text-balance text-base leading-8 text-white/75 sm:text-lg sm:leading-9">{intro}</p>
    </div>

    <dl class="reveal mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-3 lg:grid-cols-6" x-intersect.once="$el.classList.add('is-visible')">
      {glance.map(({ label, value }) => (
        <div class="bg-[rgb(16_32_74_/_0.85)] px-5 py-6 text-center">
          <dd class="text-2xl font-extrabold leading-none text-lime-400 sm:text-3xl">{value}</dd>
          <dt class="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/70">{label}</dt>
        </div>
      ))}
    </dl>

    <div class="reveal mt-12 grid gap-6 lg:grid-cols-3" x-intersect.once="$el.classList.add('is-visible')">
      {quotes.map(({ text, attribution }) => (
        <figure class="flex flex-col rounded-2xl border border-white/15 bg-white/[0.07] p-8">
          <Quote class="h-6 w-6 text-lime-400" aria-hidden="true" />
          <blockquote class="mt-5 flex-1 text-lg leading-8 text-white">{text}</blockquote>
          <figcaption class="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-white/55">{attribution}</figcaption>
        </figure>
      ))}
    </div>

    <p class="mx-auto mt-10 max-w-3xl text-center text-xs leading-6 text-white/55">{source}</p>
  </div>
</section>
```

- [ ] **Step 4: Create `SectorCards.astro`** (ag hub blue box row; the `.sector-*` styles move in verbatim)

```astro
---
// src/components/sector/SectorCards.astro
// The hub's "blue box" row. Full-bleed, one column per sector, flipping to
// that sector's economic case on hover (everything visible on touch).
// Extracted from the ag hub.
import { ArrowRight } from '@lucide/astro';
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';
// Value import (not `import type`): `typeof FileText` needs the runtime binding.
import { FileText } from '@lucide/astro';

interface Card {
  title: string;
  tagline: string;
  href: string;
  linkLabel: string;
  image: ImageMetadata;
  imageAlt: string;
  stat: string;
}

interface Props {
  id?: string;
  heading: string;
  prompt: string;
  cards: Card[];
  checklist: { icon: typeof FileText; label: string }[];
}

const { id = 'sectors', heading, prompt, cards, checklist } = Astro.props;
---

<style>
  /* Sector cards.
     Mobile has no hover, so the card is laid out as picture-then-panel with
     everything visible. From 1024px up (real pointer only) the panel goes
     transparent and sits over the image, the copy hides, and hovering reveals
     it — the title grows and rides up as the revealed block pushes it. */
  .sector-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    isolation: isolate;
  }

  .sector-media {
    position: relative;
    display: block;
    aspect-ratio: 4 / 3;
    flex: none;
    overflow: hidden;
    background: #0c193c;
  }

  .sector-image {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    object-fit: contain;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sector-card:hover .sector-image {
    transform: scale(1.05);
  }

  .sector-scrim {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(180deg, rgb(16 32 74 / 0.5) 0%, rgb(16 32 74 / 0.82) 58%, rgb(11 20 55 / 0.95) 100%);
    transition: opacity 0.45s ease;
  }

  .sector-content {
    display: flex;
    flex-direction: column;
    padding: 1.75rem;
    background: linear-gradient(180deg, rgb(12 25 60 / 0.92) 0%, rgb(16 32 74 / 0.96) 100%);
    color: #fff;
  }

  .sector-title {
    display: block;
    font-size: clamp(2.15rem, 1.35rem + 2.6vw, 3.4rem);
    font-weight: 800;
    line-height: 1.03;
    letter-spacing: -0.015em;
    text-transform: uppercase;
    transition: font-size 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sector-tagline {
    display: block;
    margin-top: 0.9rem;
    max-width: 22rem;
    font-size: 1rem;
    line-height: 1.4;
    color: rgb(255 255 255 / 0.75);
  }

  .sector-reveal {
    display: block;
    margin-top: 1.4rem;
  }

  .sector-explore {
    margin-top: 1.6rem;
    align-self: flex-start;
  }

  @media (min-width: 1024px) and (hover: hover) and (pointer: fine) {
    .sector-card {
      min-height: 30rem;
    }

    .sector-media {
      position: absolute;
      inset: 0;
      z-index: -2;
      aspect-ratio: auto;
    }

    .sector-image {
      object-fit: cover;
    }

    .sector-content {
      background: transparent;
    }

    .sector-reveal {
      margin-top: 0;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transform: translateY(0.5rem);
      transition: max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease, transform 0.55s ease,
        margin-top 0.55s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .sector-card:hover .sector-scrim,
    .sector-card:focus-visible .sector-scrim {
      opacity: 1;
    }

    .sector-card:hover .sector-reveal,
    .sector-card:focus-visible .sector-reveal {
      max-height: 26rem;
      margin-top: 1.3rem;
      opacity: 1;
      transform: translateY(0);
    }

    .sector-card:hover .sector-title,
    .sector-card:focus-visible .sector-title {
      font-size: clamp(2.6rem, 1.6rem + 3.1vw, 4rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sector-image,
    .sector-title,
    .sector-reveal,
    .sector-tagline,
    .sector-explore {
      transition: opacity 0.2s ease;
    }

    .sector-card:hover .sector-image {
      transform: none;
    }
  }
</style>

<section id={id} class="pb-4 bg-brand-900">
  <div class="reveal container-page pb-12 pt-20 text-center sm:pt-24" x-intersect.once="$el.classList.add('is-visible')">
    <h2 class="bl-h2 mx-auto max-w-3xl text-white">{heading}</h2>
    <p class="mx-auto mt-5 max-w-xl text-sm font-semibold uppercase tracking-[0.12em] text-white/55">{prompt}</p>
  </div>

  <div class:list={['grid gap-px bg-white/10', cards.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'lg:grid-cols-3']}>
    {cards.map(({ title, tagline, href, linkLabel, image, imageAlt, stat }) => (
      <a href={href} class="sector-card group">
        <span class="sector-media">
          <Image src={image} alt={imageAlt} class="sector-image" widths={[480, 720, 1080]} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" />
        </span>
        <span class="sector-scrim" aria-hidden="true"></span>

        <span class="sector-content">
          <span class="sector-title">{title}</span>
          <span class="sector-tagline">{tagline}</span>

          <span class="sector-reveal">
            <span class="block text-base leading-6 text-white">{stat}</span>
            <span class="mt-5 block space-y-1.5">
              {checklist.map(({ icon: Icon, label }) => (
                <span class="flex items-center gap-2 text-xs text-white/55">
                  <Icon class="h-3.5 w-3.5 shrink-0 text-lime-400" aria-hidden="true" /> {label}
                </span>
              ))}
            </span>
          </span>

          <span class="sector-explore bl-pill bl-pill-invert">
            {linkLabel} <ArrowRight class="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </span>
      </a>
    ))}
  </div>
</section>
```

- [ ] **Step 5: Create `OtherMarkets.astro`** (poultry "Other Agriculture Markets", verbatim; column count follows the item count)

```astro
---
// src/components/sector/OtherMarkets.astro
// Sibling-market grid at the bottom of a sector page. Extracted from the
// poultry page's "Other Agriculture Markets".
// Dumbbell is a value import (not `import type`) because `typeof Dumbbell` needs the runtime binding.
import { ArrowRight, Dumbbell } from '@lucide/astro';

interface Props {
  heading: string;
  basePath: string;
  markets: { slug: string; title: string; summary: string; icon: typeof Dumbbell }[];
}

const { heading, basePath, markets } = Astro.props;
---

<section class="bg-white py-20 sm:py-24">
  <div class="container-page">
    <h2 class="bl-h2">{heading}</h2>
    <div class:list={['mt-10 grid gap-6', markets.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2']}>
      {markets.map(({ icon: Icon, slug, title, summary }) => (
        <a href={`${basePath}${slug}/`} class="group rounded-2xl border border-brand-200/55 bg-white p-7 shadow-lift transition hover:-translate-y-1">
          <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100">
            <Icon class="h-5 w-5 text-brand-600" aria-hidden="true" />
          </span>
          <h3 class="mt-5 text-xl text-brand-900">{title}</h3>
          <p class="mt-3 text-sm leading-6 text-brand-body">{summary}</p>
          <span class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-600">
            Learn more <ArrowRight class="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </a>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 6: Add all five to the kitchen sink**

Imports:

```astro
import DeploymentCards from '../../components/sector/DeploymentCards.astro';
import DifferenceGrid from '../../components/sector/DifferenceGrid.astro';
import CaseStudyBand from '../../components/sector/CaseStudyBand.astro';
import SectorCards from '../../components/sector/SectorCards.astro';
import OtherMarkets from '../../components/sector/OtherMarkets.astro';
import { Dumbbell, FileText, Truck, Warehouse } from '@lucide/astro';
import { humanMarkets } from '../../data/human-markets';
import compactFront from '../../assets/images/human-compact-front.png';
import fogger from '../../assets/images/human-fogger.png';
```

Markup, after the `StatBand`:

```astro
      <DeploymentCards
        heading="Two Cards."
        intro="Two-card layout centres itself."
        cards={[
          { device: 'Battery Powered Fogger', deviceCopy: 'Fogger copy.', image: fogger, imageAlt: 'Genesis360 Battery Powered Fogger', facility: 'Vehicles', facilityCopy: 'Facility copy.', icon: Truck },
          { device: 'Compact Wall Mount', deviceCopy: 'Compact copy.', image: compactFront, imageAlt: 'Genesis360 Compact Wall Mount', facility: 'Rooms', facilityCopy: 'Facility copy.', icon: Warehouse },
        ]}
      />
      <DifferenceGrid
        eyebrow="Kitchen Sink"
        heading="Difference Grid."
        lede="Lede."
        points={[
          { icon: 'coverage', title: 'Point one', copy: 'Copy one.' },
          { icon: 'droplet', title: 'Point two', copy: 'Copy two.' },
          { icon: 'cycle', title: 'Point three', copy: 'Copy three.' },
        ]}
        closing={{ lead: 'Closing lead.', aside: 'Closing aside.' }}
      />
      <CaseStudyBand
        eyebrow="Kitchen Sink"
        heading="Case Study."
        intro="Intro."
        glance={[{ label: 'Facility', value: '10,000 sq ft' }, { label: 'Athletes', value: '70+' }, { label: 'Ringworm', value: '1 case' }]}
        quotes={[{ text: 'Quote one.', attribution: 'Attribution one' }, { text: 'Quote two.', attribution: 'Attribution two' }]}
        source="Source line."
      />
      <SectorCards
        heading="Four Sector Cards."
        prompt="Select a sector"
        cards={humanMarkets.map((m) => ({ title: m.title, tagline: m.tagline, href: `/human/${m.slug}/`, linkLabel: `Explore ${m.title.toLowerCase()}`, image: m.hero.poster, imageAlt: m.imageAlt, stat: m.stat }))}
        checklist={[{ icon: FileText, label: 'Checklist item' }]}
      />
      <OtherMarkets heading="Other Markets." basePath="/human/" markets={humanMarkets.slice(0, 3)} />
```

- [ ] **Step 7: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/dev/sector-blocks/index.html "Two Cards." "Battery Powered Fogger" "product-card" "Difference Grid." "Closing aside." "Case Study." "10,000 sq ft" "Attribution two" "Four Sector Cards." "sector-card" "Explore athletics" "Other Markets." "/human/schools/"
```
Expected: `44 page(s) built`, thirteen `ok`.

- [ ] **Step 8: Type check and brand check**

```bash
npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `8 errors`, brand passes.

- [ ] **Step 9: Commit**

```bash
git add src/components/sector/ src/pages/dev/sector-blocks.astro
git commit -m "Add DeploymentCards, DifferenceGrid, CaseStudyBand, SectorCards, OtherMarkets sector blocks

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: Stock hero footage for healthcare, schools, military

**Files:**
- Create: `src/assets/videos/clinic.mp4`, `src/assets/videos/classroom.mp4`, `src/assets/videos/barracks.mp4` (only those found)
- Create: `src/assets/images/hero-clinic-poster.jpg`, `hero-classroom-poster.jpg`, `hero-barracks-poster.jpg` (matching the clips found)
- Modify: `src/assets/videos/STOCK-SOURCES.md`
- Modify: `src/data/human-markets.ts` (`hero` for each market that got a clip)

**Interfaces:**
- Consumes: `Market.hero: { poster: ImageMetadata; video?: string }` from Task 2.
- Produces: markets with footage get `hero: { poster: <poster import>, video: <mp4 import> }`; markets without keep the still.

The existing clips are Mixkit (free license, see `STOCK-SOURCES.md`). Mixkit category pages embed direct `.mp4` URLs. A clip is acceptable if it is a wide, slow, people-light interior shot that reads under the dark overlay: an empty hospital corridor or exam room, an empty classroom or school hallway, an empty barracks or a military building corridor. If no acceptable clip exists for a market, skip it; the page ships with the still hero.

- [ ] **Step 1: List candidate clips per market**

```bash
for q in hospital classroom military; do echo "== $q"; curl -sL "https://mixkit.co/free-stock-video/$q/" | grep -o 'https://assets.mixkit.co/videos/[^"]*-large\.mp4' | sort -u | head -12; done
```
Expected: a list of URLs per category. If a category returns nothing, try `curl -sL "https://mixkit.co/free-stock-video/?q=$q"`.

- [ ] **Step 2: Preview the first few candidates by grabbing a frame from each**

```bash
S=/private/tmp/claude-502/-Users-joshuariley-Sites-securelogic/8e8c58b0-3037-4ea5-b012-91fb8caff343/scratchpad/clips; mkdir -p "$S"; i=0; for u in <paste 3-4 URLs>; do i=$((i+1)); curl -sL "$u" -o "$S/cand-$i.mp4"; ffmpeg -y -loglevel error -ss 2 -i "$S/cand-$i.mp4" -frames:v 1 "$S/cand-$i.jpg"; echo "$i $u"; done; ls "$S"
```
Then view each `cand-N.jpg` with the Read tool and pick one per market by the acceptance rule above. Record the clip's Mixkit page URL (the `-large.mp4` file name minus the suffix, searched on mixkit.co) for the sources file.

- [ ] **Step 3: Crop, mute, and trim the chosen clips to match the existing ones (1280x720, no audio, 12 seconds)**

```bash
ffmpeg -y -loglevel error -i "$S/cand-1.mp4" -t 12 -an -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" -c:v libx264 -crf 26 -preset slow -movflags +faststart src/assets/videos/clinic.mp4
ffmpeg -y -loglevel error -ss 1 -i src/assets/videos/clinic.mp4 -frames:v 1 -q:v 3 src/assets/images/hero-clinic-poster.jpg
```
Repeat with `classroom` and `barracks` for the other two chosen clips. Then check sizes are in line with the existing clips (under 4 MB each):

```bash
ls -la src/assets/videos/*.mp4 | awk '{print $5, $9}'
```

- [ ] **Step 4: Record the sources**

Append to `src/assets/videos/STOCK-SOURCES.md` one line per clip in the existing format:

```markdown
- `clinic.mp4`: [<Mixkit clip title>](<mixkit page url>) — hero, /human/healthcare/
- `classroom.mp4`: [<Mixkit clip title>](<mixkit page url>) — hero, /human/schools/
- `barracks.mp4`: [<Mixkit clip title>](<mixkit page url>) — hero, /human/military/
```
Omit any line for a market that got no clip, and add a sentence saying that market uses its still poster.

- [ ] **Step 5: Wire the clips into `human-markets.ts`**

For each market with a clip, add imports at the top and change its `hero`:

```ts
import clinicVideo from '../assets/videos/clinic.mp4';
import clinicPoster from '../assets/images/hero-clinic-poster.jpg';
// ...
hero: { poster: clinicPoster, video: clinicVideo },
```
Markets without a clip keep `hero: { poster: <scene> }`.

- [ ] **Step 6: Build and check the asset landed**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; ls dist/_astro/ | grep -E "^(clinic|classroom|barracks)\." 
```
Expected: `44 page(s) built`; one `.mp4` line per clip added (unimported clips are not emitted, so only the wired ones appear).

- [ ] **Step 7: Commit**

```bash
git add src/assets/videos src/assets/images/hero-*-poster.jpg src/data/human-markets.ts
git commit -m "Add stock hero footage and posters for the Human sector pages

Mixkit free-license clips, cropped to 1280x720 and muted like the existing
ones; sources recorded in STOCK-SOURCES.md.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7: `/human/military/` page

**Files:**
- Create: `src/pages/human/military.astro`

**Interfaces:**
- Consumes: `SectorHero`, `ArgumentBand`, `DeploymentCards`, `PostsRow`, `OtherMarkets`, `SectorCta` (Tasks 1, 3, 4, 5); `humanMarkets` (Task 2).
- Produces: the static route `/human/military/`, which shadows `human/[slug].astro` for this slug (Astro gives static routes precedence).

- [ ] **Step 1: Create the page**

```astro
---
// src/pages/human/military.astro
// Military — standard tier. The only source is the existing market copy plus
// the infections-at-sea post; the Sales Pricing Guide has no package for this
// market, so the deployment cards name the base products only. Composed from
// the shared sector blocks; see
// docs/superpowers/specs/2026-09-16-human-section-design.md.
import { Truck, Warehouse } from '@lucide/astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import ArgumentBand from '../../components/sector/ArgumentBand.astro';
import DeploymentCards from '../../components/sector/DeploymentCards.astro';
import PostsRow from '../../components/sector/PostsRow.astro';
import OtherMarkets from '../../components/sector/OtherMarkets.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import { humanMarkets } from '../../data/human-markets';
import { posts } from '../../data/blog-posts';
import fogger from '../../assets/images/human-fogger.png';
import compactFront from '../../assets/images/human-compact-front.png';

const market = humanMarkets.find((m) => m.slug === 'military')!;
const relatedPosts = posts.filter((p) => market.postSlugs.includes(p.slug));
const otherMarkets = humanMarkets.filter((m) => m.slug !== market.slug);

// Source: Genesis360 AthleticGuard.pdf (Compact Wall Mount sheet) for the
// Compact description; the Sales Pricing Guide for the fogger.
const deployments = [
  {
    device: 'Battery Powered Fogger',
    deviceCopy: 'A portable, cordless fogger for spot treatment wherever a unit is working: vehicles, tents, and gear that moves between sites.',
    image: fogger,
    imageAlt: 'Genesis360 Battery Powered Fogger',
    facility: 'Mobile & Field',
    facilityCopy: 'Transport, temporary quarters, and shared equipment that never sits in one room long enough for a fixed system.',
    icon: Truck,
  },
  {
    device: 'Compact Wall Mount',
    deviceCopy: 'A fixed, automated dry-mist system that runs scheduled cycles on its own timer. Wall-mount it, or rotate one unit between rooms on brackets.',
    image: compactFront,
    imageAlt: 'Genesis360 Compact Wall Mount unit',
    facility: 'Barracks & Common Rooms',
    facilityCopy: 'Sleeping quarters, day rooms, and fitness spaces where close quarters do the spreading.',
    icon: Warehouse,
  },
];
---

<BaseLayout title="Genesis360 | Human | Military" description={market.summary}>
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />

    <main>
      <SectorHero
        eyebrow="Military & First Responders"
        headline={['Complete Coverage.', 'Ready Personnel.']}
        support="Automated, no-touch disinfection for the spaces a unit shares."
        poster={market.hero.poster}
        video={market.hero.video}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
      />

      <!-- Source: existing market copy (src/data/human-markets.ts heroCopy). No new claims. -->
      <ArgumentBand
        eyebrow="The Reality In Close Quarters"
        heading="An Outbreak Moves At The Speed Of A Shared Room."
        paragraphs={[
          market.heroCopy,
          'Genesis360 fills the room with a sub-10-micron dry mist that treats the air and every surface at once, on a schedule, without anyone spraying or wiping. It runs while the room is empty and is dry to the touch by the time it is not.',
        ]}
        link={{ href: '#deployments', label: 'See The Systems' }}
      />

      <DeploymentCards
        heading="One Platform. Two Ways To Deploy It."
        intro="Fixed where people sleep and gather, portable for everything that moves."
        cards={deployments}
      />

      <PostsRow posts={relatedPosts} heading="From The Field" />

      <OtherMarkets heading="Other Human Health Markets" basePath="/human/" markets={otherMarkets} />

      <SectorCta
        eyebrow="Your Quarters. Your Coverage Plan."
        heading="Start With The Rooms Everyone Shares."
        copy="Tell us how the installation runs and where people spend their time, and our team will map the right portable or fixed deployment and build a coverage plan around it."
      />
    </main>

    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/human/military/index.html "Ready Personnel." "An Outbreak Moves At The Speed Of A Shared Room." "One Platform. Two Ways To Deploy It." "Battery Powered Fogger" "Compact Wall Mount" "how-to-stop-infections-before-they-spread-at-sea" "/human/athletics/" "/human/healthcare/" "/human/schools/" "Start With The Rooms Everyone Shares." "!Related reading" "!Kinetic"
```
Expected: `44 page(s) built`, twelve `ok`. `Related reading` was the old template's heading; its absence proves the static route won.

- [ ] **Step 3: Type check and brand check**

```bash
npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `8 errors`, brand passes.

- [ ] **Step 4: Commit**

```bash
git add src/pages/human/military.astro
git commit -m "Human: rebuild /human/military/ on the sector blocks (standard tier)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 8: `/human/schools/` page

**Files:**
- Create: `src/pages/human/schools.astro`

**Interfaces:**
- Consumes: same blocks as Task 7 plus `market.package` (`'EnviroGuard'`).

- [ ] **Step 1: Create the page**

```astro
---
// src/pages/human/schools.astro
// Schools & childcare — standard tier plus deployment cards. Sources: existing
// market copy; Genesis360 AthleticGuard.pdf (the Compact Wall Mount sheet,
// which lists schools, daycare spaces, gyms and breakrooms among its rooms);
// the Sales Pricing Guide (EnviroGuard is the daycare / early childcare
// package); the school air-quality blog post.
import { Bus, School } from '@lucide/astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import ArgumentBand from '../../components/sector/ArgumentBand.astro';
import DeploymentCards from '../../components/sector/DeploymentCards.astro';
import PostsRow from '../../components/sector/PostsRow.astro';
import OtherMarkets from '../../components/sector/OtherMarkets.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import { humanMarkets } from '../../data/human-markets';
import { posts } from '../../data/blog-posts';
import fogger from '../../assets/images/human-fogger.png';
import compactFront from '../../assets/images/human-compact-front.png';

const market = humanMarkets.find((m) => m.slug === 'schools')!;
const relatedPosts = posts.filter((p) => market.postSlugs.includes(p.slug));
const otherMarkets = humanMarkets.filter((m) => m.slug !== market.slug);

const deployments = [
  {
    // Source: Sales Pricing Guide, Market-Specific Application Packages —
    // EnviroGuard, "Daycare / early childcare, athletics ... and other human
    // spaces", Compact Base, 1 nozzle / digital timer.
    device: 'EnviroGuard',
    deviceCopy: 'The Compact Wall Mount configured for childcare and school spaces: a fixed, automated dry-mist system on a digital timer. Install brackets in several rooms and rotate one unit where it is needed.',
    image: compactFront,
    imageAlt: 'Genesis360 EnviroGuard compact wall mount unit',
    facility: 'Classrooms, Gyms & Cafeterias',
    facilityCopy: 'The rooms that turn over every period and hold the most children for the longest.',
    icon: School,
  },
  {
    device: 'Battery Powered Fogger',
    deviceCopy: 'A portable, cordless fogger for spot treatment between uses: the nurse’s office after a sick visit, a bus at the end of a route, shared PE equipment.',
    image: fogger,
    imageAlt: 'Genesis360 Battery Powered Fogger',
    facility: 'Buses & Between-Use Spaces',
    facilityCopy: 'Transport and the small rooms that see a different child every hour.',
    icon: Bus,
  },
];
---

<BaseLayout title="Genesis360 | Human | Schools" description={market.summary}>
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />

    <main>
      <SectorHero
        eyebrow="Schools & Childcare"
        headline={['Complete Coverage.', 'Healthy Classrooms.']}
        support="Automated, whole-room air and surface treatment that runs when the room is empty."
        poster={market.hero.poster}
        video={market.hero.video}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
      />

      <!-- Sources: existing market copy; Genesis360 AthleticGuard.pdf ("scheduled
           room treatment after hours, between uses, overnight"; "dry to the
           touch"); why-air-quality-in-schools-matters-more-than-you-think post. -->
      <ArgumentBand
        eyebrow="The Reality In Every Classroom"
        heading="Every Sick Day Is A Day Of Learning Lost."
        paragraphs={[
          market.heroCopy,
          'Wipe-downs reach desks and door handles. They do not reach the air a class of thirty breathes for an hour, or the underside of a table, or a cafeteria between lunch periods. Genesis360 fills the room with a sub-10-micron dry mist that treats the air and every surface at once, after hours or between uses, and is dry to the touch when the next class walks in.',
        ]}
        link={{ href: '#deployments', label: 'See The Systems' }}
      />

      <DeploymentCards
        heading="One Platform. Two Ways To Deploy It."
        intro="Fixed in the rooms children spend the day in, portable for everything in between."
        cards={deployments}
      />

      <PostsRow posts={relatedPosts} heading="From The Field" />

      <OtherMarkets heading="Other Human Health Markets" basePath="/human/" markets={otherMarkets} />

      <SectorCta
        eyebrow="Your School. Your Coverage Plan."
        heading="Start With The Rooms That Never Sit Empty."
        copy="Tell us how the building runs, from the first bell to the last bus, and our team will map the right EnviroGuard and portable deployment and build a coverage plan around it."
      />
    </main>

    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/human/schools/index.html "Healthy Classrooms." "Every Sick Day Is A Day Of Learning Lost." "EnviroGuard" "Battery Powered Fogger" "why-air-quality-in-schools-matters-more-than-you-think" "Start With The Rooms That Never Sit Empty." "!Related reading" "!\$"
```
Expected: `44 page(s) built`, eight `ok` (the last needle proves there is no dollar sign anywhere in the page).

- [ ] **Step 3: Type check and brand check**

```bash
npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `8 errors`, brand passes.

- [ ] **Step 4: Commit**

```bash
git add src/pages/human/schools.astro
git commit -m "Human: rebuild /human/schools/ on the sector blocks (EnviroGuard package)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 9: `/human/healthcare/` page

**Files:**
- Create: `src/pages/human/healthcare.astro`

**Interfaces:**
- Consumes: same blocks as Task 7; `market.package` (`'MediGuard Pro'`); `human-rolling-stand.png` (Task 2).

- [ ] **Step 1: Create the page**

```astro
---
// src/pages/human/healthcare.astro
// Healthcare — standard tier plus deployment cards. Sources: existing market
// copy; Laboratory Validation and Field Performance ... Tarleton State.pdf
// (pathogen classes, "human inconsistency in cleaning practices", ≥5-log /
// ≥6-log reductions); the Sales Pricing Guide (MediGuard Pro = Compact Pro, 2
// nozzles + PLC Smart Board/App; Rolling Stand "especially valuable in medical
// settings"); Genesis360 AthleticGuard.pdf for the Compact description.
import { Stethoscope, BedDouble } from '@lucide/astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import ArgumentBand from '../../components/sector/ArgumentBand.astro';
import DeploymentCards from '../../components/sector/DeploymentCards.astro';
import PostsRow from '../../components/sector/PostsRow.astro';
import OtherMarkets from '../../components/sector/OtherMarkets.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import { humanMarkets } from '../../data/human-markets';
import { posts } from '../../data/blog-posts';
import rollingStand from '../../assets/images/human-rolling-stand.png';
import fogger from '../../assets/images/human-fogger.png';

const market = humanMarkets.find((m) => m.slug === 'healthcare')!;
const relatedPosts = posts.filter((p) => market.postSlugs.includes(p.slug));
const otherMarkets = humanMarkets.filter((m) => m.slug !== market.slug);

const deployments = [
  {
    // Source: Sales Pricing Guide — MediGuard Pro: Compact Pro, 2 nozzles /
    // PLC/App, "Healthcare, urgent care, dialysis, aging care, outpatient,
    // family practice, dental / orthodontics"; Rolling Stand upgrade.
    device: 'MediGuard Pro',
    deviceCopy: 'The Compact Pro configured for clinical spaces: two nozzles and PLC Smart Board/App control, so cycles are scheduled and monitored from a phone. Put it on the Rolling Stand to move room to room without carrying it.',
    image: rollingStand,
    imageAlt: 'Genesis360 MediGuard Pro unit on its rolling stand',
    facility: 'Patient Rooms, Clinics & Dialysis',
    facilityCopy: 'Exam rooms, treatment bays, waiting areas, and aging-care common rooms, on a schedule that does not depend on who is on shift.',
    icon: BedDouble,
  },
  {
    device: 'Battery Powered Fogger',
    deviceCopy: 'A portable, cordless fogger for spot treatment between patients: an exam room after a sick visit, a dental operatory between appointments, transport equipment.',
    image: fogger,
    imageAlt: 'Genesis360 Battery Powered Fogger',
    facility: 'Between-Patient Turnover',
    facilityCopy: 'The minutes between one patient leaving and the next one sitting down.',
    icon: Stethoscope,
  },
];
---

<BaseLayout title="Genesis360 | Human | Healthcare" description={market.summary}>
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />

    <main>
      <SectorHero
        eyebrow="Healthcare"
        headline={['Complete Coverage.', 'Consistent Infection Control.']}
        support="Automated, programmable whole-room cycles built for clinical environments."
        poster={market.hero.poster}
        video={market.hero.video}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
      />

      <!-- Sources: existing market copy; Laboratory Validation and Field
           Performance of the Genesis 360 @ Tarleton State.pdf — pathogen list
           (Staphylococcus aureus, MRSA, Pseudomonas aeruginosa, influenza,
           non-enveloped viruses, Clostridioides difficile spores) and the four
           failure modes of manual cleaning. -->
      <ArgumentBand
        eyebrow="The Reality In Every Clinic"
        heading="Infection Control Is Only As Consistent As The Last Person Who Cleaned The Room."
        paragraphs={[
          market.heroCopy,
          'Manual wiping and spraying leave the same gaps everywhere: the air itself, irregular and hard-to-reach surfaces, recontamination between cleanings, and the ordinary inconsistency of people doing a repetitive job. The organisms that matter here, MRSA and other staph, Pseudomonas, influenza and non-enveloped viruses, C. diff spores, live in exactly those gaps.',
          'Genesis360 fills the room with a sub-10-micron dry mist of BotaniMax, an EPA-registered botanical disinfectant, treating the air column and every surface in the same cycle. Independent laboratory testing of the platform has shown bacterial reductions of five log or better and viral reductions of six log or better.',
        ]}
        link={{ href: '#deployments', label: 'See The Systems' }}
      />

      <DeploymentCards
        heading="One Platform. Two Ways To Deploy It."
        intro="Scheduled and monitored where patients stay, portable for the turnover in between."
        cards={deployments}
      />

      <PostsRow posts={relatedPosts} heading="From The Field" />

      <OtherMarkets heading="Other Human Health Markets" basePath="/human/" markets={otherMarkets} />

      <SectorCta
        eyebrow="Your Facility. Your Coverage Plan."
        heading="Start With The Rooms That Turn Over Fastest."
        copy="Tell us how the facility runs, from exam rooms to dialysis chairs, and our team will map the right MediGuard Pro and portable deployment and build a coverage plan around it."
      />
    </main>

    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/human/healthcare/index.html "Consistent Infection Control." "MediGuard Pro" "Rolling Stand" "PLC Smart Board/App" "Battery Powered Fogger" "five log or better" "regular-surface-disinfection-in-businesses" "!Medical Dry Fog" "!Related reading" "!\$"
```
Expected: `44 page(s) built`, ten `ok`.

- [ ] **Step 3: Type check and brand check**

```bash
npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `8 errors`, brand passes.

- [ ] **Step 4: Commit**

```bash
git add src/pages/human/healthcare.astro
git commit -m "Human: rebuild /human/healthcare/ on the sector blocks (MediGuard Pro package)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 10: `/human/athletics/` flagship page

**Files:**
- Create: `src/pages/human/athletics.astro`

**Interfaces:**
- Consumes: every block from Tasks 1, 3, 4, 5; `gym.mp4` (exists); `human-d1-gym.png`, `human-compact-front.png`, `human-compact-iso.png`, `human-rolling-stand.png`, `human-fogger.png` (Task 2).

- [ ] **Step 1: Create the page**

All quotes are verbatim from `reference-files/OneDrive_1_8-13-2026/Tarleton University CaseStudy.pdf`. Statistics are from `Athletics Competitive Comparison.pdf` and the case study's "At a glance" panel. The lab figures are from `Laboratory Validation and Field Performance of the Genesis 360 @ Tarleton State.pdf`.

```astro
---
// src/pages/human/athletics.astro
// Athletics — the Human section's flagship, the way the hog page is the ag
// section's. Sources, each cited beside the copy it feeds:
//   E   Genesis360 Athletic E-Brochure.pdf
//   C   Athletics Competitive Comparison.pdf
//   T   Tarleton University CaseStudy.pdf
//   L   Laboratory Validation and Field Performance of the Genesis 360 @ Tarleton State.pdf
//   G   Genesis360 Pricing Model - External.docx (product names and configurations only; no prices)
//   A   Genesis360 AthleticGuard.pdf (Compact Wall Mount sheet)
// Spec: docs/superpowers/specs/2026-09-16-human-section-design.md
import { Dumbbell, Footprints, Truck } from '@lucide/astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import ArgumentBand from '../../components/sector/ArgumentBand.astro';
import DeploymentCards from '../../components/sector/DeploymentCards.astro';
import StatBand from '../../components/sector/StatBand.astro';
import CompareBand from '../../components/sector/CompareBand.astro';
import CaseStudyBand from '../../components/sector/CaseStudyBand.astro';
import PostsRow from '../../components/sector/PostsRow.astro';
import OtherMarkets from '../../components/sector/OtherMarkets.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import { humanMarkets } from '../../data/human-markets';
import { posts } from '../../data/blog-posts';
import gymVideo from '../../assets/videos/gym.mp4';
import gymScene from '../../assets/images/human-d1-gym.png';
import fogger from '../../assets/images/human-fogger.png';
import compactFront from '../../assets/images/human-compact-front.png';
import compactIso from '../../assets/images/human-compact-iso.png';

const market = humanMarkets.find((m) => m.slug === 'athletics')!;
const relatedPosts = posts.filter((p) => market.postSlugs.includes(p.slug));
const otherMarkets = humanMarkets.filter((m) => m.slug !== market.slug);

// Source G (package names, configurations), A (Compact behaviour).
const deployments = [
  {
    device: 'Battery Powered Fogger',
    deviceCopy: 'A portable, cordless fogger for spot treatment: benches, bags, travel gear, and the visiting locker room. Sold on its own or added on to a fixed system.',
    image: fogger,
    imageAlt: 'Genesis360 Battery Powered Fogger',
    facility: 'Travel & Equipment',
    facilityCopy: 'Team buses, equipment bags, and the gear that goes on the road and comes back.',
    icon: Truck,
  },
  {
    device: 'EnviroGuard',
    deviceCopy: 'The Compact Wall Mount configured for athletics: a fixed, automated dry-mist system on a digital timer. Mount it in the room, or put it on the Rolling Stand and move it between the mat room, the weight room, and the lockers.',
    image: compactFront,
    imageAlt: 'Genesis360 EnviroGuard compact wall mount unit',
    facility: 'Mat Rooms & Locker Rooms',
    facilityCopy: 'The rooms where skin meets mat and sweat meets fabric, treated nightly without a mop in sight.',
    icon: Footprints,
  },
  {
    device: 'Compact Pro',
    deviceCopy: 'Two nozzles and PLC Smart Board/App control for the largest rooms: faster cycles, more output, scheduled and monitored from a phone.',
    image: compactIso,
    imageAlt: 'Genesis360 Compact Pro unit',
    facility: 'Weight Rooms & Training Centers',
    facilityCopy: 'Big, open rooms with a lot of equipment, where a single-nozzle unit would run long.',
    icon: Dumbbell,
  },
];

// Source T, "Before Secure Logic" / "After Secure Logic".
const today = [
  'Spray disinfectant on the mats before and after practice',
  'Mop surfaces, often several times a day',
  'Wait for the mats to dry before anyone can train',
  'Still smell the room from the hallway, and still see infections',
];
const withGenesis = [
  'One automated cycle every night, on a schedule, with nobody in the room',
  'No daily mopping of the mats for sanitizing',
  'Mats dry and ready for the first practice',
  'Whole-room coverage: mats, walls, benches, weights, and the air itself',
];

// Source T, "At a glance".
const glance = [
  { label: 'Facility', value: '10,000 sq ft' },
  { label: 'Athletes', value: '70+' },
  { label: 'Ringworm this season', value: '1 case' },
  { label: 'New staph / impetigo', value: '0' },
  { label: 'Daily mopping', value: 'Eliminated' },
  { label: 'Mat time lost to infection', value: 'None' },
];

// Source T, verbatim.
const quotes = [
  { text: '“We stopped daily mopping the mats for sanitizing and let the system do what it does. The difference is obvious the moment you walk in—our room doesn’t smell like a wrestling room anymore.”', attribution: 'Tarleton State University Wrestling' },
  { text: '“Because we’re not dealing with infections, nobody has to sit out practice. That means everyone gets more mat time.”', attribution: 'Tarleton State University Wrestling' },
  { text: '“The cherry on top when showing recruits the facility.”', attribution: 'Tarleton State University Wrestling' },
];
---

<BaseLayout
  title="Genesis360 | Human | Athletics"
  description="Skin infections are the number one cause of lost time in wrestling. Genesis360 and BotaniMax bring automated, whole-room disinfection to mat rooms, weight rooms, and locker rooms."
>
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />

    <main>
      <!-- Source E: headline verbatim. -->
      <SectorHero
        eyebrow="Athletics"
        headline={['Your Athletes Fight For Wins.', 'We Fight For Your Athletes.']}
        support="Automated, whole-room disinfection for wrestling rooms, weight rooms, and locker rooms."
        poster={gymScene}
        video={gymVideo}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
        secondaryCta={{ href: '#deployments', label: 'See The Systems' }}
      />

      <!-- Source E ("High-traffic fitness spaces need high-performance
           disinfection" and its paragraph), C (opening paragraph; "bacteria
           can survive 72+ hours on sweat-soaked fabrics and rubber floors"). -->
      <ArgumentBand
        eyebrow="The Reality In Every Room"
        heading="High-Traffic Spaces Need High-Performance Disinfection."
        image={gymScene}
        imageAlt="Genesis360 Compact unit mounted in a college weight room"
        stat={{ value: '72+', caption: 'hours bacteria survive on sweat-soaked mats and rubber floors' }}
        paragraphs={[
          'Athletic performance training facilities, health and wellness clubs, fitness centers, and recovery and rehabilitation rooms, including weight rooms and locker rooms, are breeding grounds for bacteria, viruses, and fungi, as well as odors. Maintaining a disinfected, odor-free environment is crucial to protecting the health and well-being of your athletes, members, and staff.',
          'Manual disinfection varies with human effort and leaves gaps. Genesis360 fills the room with an ultra-fine botanical mist that reaches every surface, crack, and crevice, including walls, mats, equipment, and the air, on a schedule, with the same result every cycle. No amount of hired staff can match its speed, precision, or consistency.',
        ]}
        link={{ href: '#deployments', label: 'See The Systems' }}
      />

      <DeploymentCards
        heading="One Platform. Three Ways To Deploy It."
        intro="Every room in an athletic facility has a different footprint and a different problem. Genesis360 scales to each one, from a fogger you can carry to a two-nozzle system scheduled from your phone."
        cards={deployments}
      />

      <!-- Source C ("Wrestling Infection Statistics", "Invisible Costs of Poor
           Disinfection"). Qualitative only; the sheet's dollar figures are
           deliberately left off the page. -->
      <StatBand
        eyebrow="The Cost Of Waiting"
        heading="Skin Infections Are The #1 Cause Of Lost Time In Wrestling."
        lede="Athlete downtime, sidelined coaches, missed competitions, and a reputation that follows the program into every recruiting visit."
        figures={[
          { value: '60–100%', label: 'Of wrestlers, every season', copy: 'The share of wrestlers who pick up at least one skin infection in a typical season, depending on facility hygiene.' },
          { value: '72+ hrs', label: 'Bacterial survival on mats', copy: 'How long bacteria persist on sweat-soaked fabrics and rubber floors that are not properly sanitized.' },
        ]}
      >
        <CompareBand
          todayIntro="Keeping a wrestling room clean means:"
          today={today}
          withIntro="You have the ability to:"
          with={withGenesis}
        />
      </StatBand>

      <!-- Source T (all figures and quotes), L (lab reductions in the source line). -->
      <CaseStudyBand
        eyebrow="From The Field"
        heading="One Season At Tarleton State. One Case Of Ringworm."
        intro="A collegiate wrestling program with more than seventy athletes replaced daily mopping with a nightly Genesis360 cycle. This is what the season looked like."
        glance={glance}
        quotes={quotes}
        source="Figures and quotations from the Secure Logic case study “Environmental Hygiene & Athlete Performance, Tarleton State University.” Independent laboratory testing of the Genesis360 platform with BotaniMax has shown bacterial reductions of five log or better and viral reductions of six log or better."
      />

      <PostsRow posts={relatedPosts} heading="From The Field" />

      <OtherMarkets heading="Other Human Health Markets" basePath="/human/" markets={otherMarkets} />

      <SectorCta
        eyebrow="Your Rooms. Your Coverage Plan."
        heading="Start With The Room That Smells Like A Wrestling Room."
        copy="Tell us how the facility runs, from the mat room to the lockers, and our team will map the right portable, fixed, or Compact Pro deployment and build a coverage plan around it."
      />
    </main>

    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/human/athletics/index.html "We Fight For Your Athletes." "High-Traffic Spaces Need High-Performance Disinfection." "One Platform. Three Ways To Deploy It." "EnviroGuard" "Compact Pro" "Battery Powered Fogger" "Skin Infections Are The #1 Cause Of Lost Time In Wrestling." "No daily mopping of the mats for sanitizing" "One Season At Tarleton State. One Case Of Ringworm." "10,000 sq ft" "The cherry on top when showing recruits the facility." "are-you-missing-these-3-high-risk-hotspots" "dont-let-infections-bench-your-team" "!Related reading" "!\$" "!Kinetic"
```
Expected: `44 page(s) built`, sixteen `ok`.

- [ ] **Step 3: Type check and brand check**

```bash
npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `8 errors`, brand passes.

- [ ] **Step 4: Commit**

```bash
git add src/pages/human/athletics.astro
git commit -m "Human: rebuild /human/athletics/ as the flagship page

Tarleton State case study, wrestling infection stats, three-tier deployment
cards (Battery Powered Fogger, EnviroGuard, Compact Pro). No pricing.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 11: `/human/` hub, and retire the old templates

**Files:**
- Create: `src/pages/human/index.astro`
- Modify: `src/pages/[...slug].astro` (remove the `'human'` entry from the `getStaticPaths` array near the top; delete the whole `{canonicalSlug === 'human' && (...)}` block, which sits between the `home-page` and `hvac` blocks)
- Delete: `src/pages/human/[slug].astro`

**Interfaces:**
- Consumes: `SectorHero` (`split`), `SectorCards`, `DifferenceGrid`, `PostsRow`, `SectorCta`; `humanMarkets`.

- [ ] **Step 1: Create the hub page**

```astro
---
// src/pages/human/index.astro
// Human Health hub. Mirrors the ag hub (src/pages/ag/index.astro) on the shared
// sector blocks. Sources: SL_master-site-page-copy_08-19-26.docx (mission
// block, "Applies everywhere pathogens can threaten people"); Genesis360
// Athletic E-Brochure.pdf ("The Genesis360 Difference" list); Laboratory
// Validation and Field Performance ... Tarleton State.pdf (the four failure
// modes of manual cleaning). Spec: docs/superpowers/specs/2026-09-16-human-section-design.md
import { ClipboardList, FileText, TrendingUp } from '@lucide/astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import SectorCards from '../../components/sector/SectorCards.astro';
import DifferenceGrid from '../../components/sector/DifferenceGrid.astro';
import PostsRow from '../../components/sector/PostsRow.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import { humanMarkets } from '../../data/human-markets';
import { posts } from '../../data/blog-posts';
import heroVideo from '../../assets/videos/gym.mp4';
import heroPoster from '../../assets/images/human-d1-gym.png';

// Hub order: the flagship first, then the rest as listed in the data file.
const ordered = [
  humanMarkets.find((m) => m.slug === 'athletics')!,
  ...humanMarkets.filter((m) => m.slug !== 'athletics'),
];

const sectorCards = ordered.map((m) => ({
  title: m.title,
  tagline: m.tagline,
  href: `/human/${m.slug}/`,
  linkLabel: `Explore ${m.title.toLowerCase()} solutions`,
  image: m.hero.poster,
  imageAlt: m.imageAlt,
  stat: m.stat,
}));

// What each sector page holds — same three lines as the ag hub.
const checklist = [
  { icon: FileText, label: 'Product & system use guides' },
  { icon: TrendingUp, label: 'Field results and case studies' },
  { icon: ClipboardList, label: 'Industry resources' },
];

// Source: Athletic E-Brochure "The Genesis360 Difference", reduced to the
// three points that apply to every human-health room.
const points: { icon: 'droplet' | 'coverage' | 'cycle' | 'shield'; title: string; copy: string }[] = [
  { icon: 'cycle', title: 'Automated operation', copy: 'Programmable misting cycles run on their own schedule, so coverage does not depend on staff hours or stamina.' },
  { icon: 'droplet', title: 'Dry-mist technology', copy: 'Ultra-fine droplets deliver broad coverage without wetness, dripping, or pooling. Dry to the touch, wet to a microbe.' },
  { icon: 'coverage', title: '360-degree coverage', copy: 'The mist moves through the environment, reaching around, under, behind, and across every exposed area, and the air itself.' },
];

const humanPosts = posts.filter((p) => humanMarkets.some((m) => m.postSlugs.includes(p.slug))).slice(0, 3);
---

<BaseLayout
  title="Genesis360 | Human Health"
  description="Wherever people gather, train, learn, or heal, Genesis360 pairs automated dry-mist delivery with EPA-registered BotaniMax to control pathogens in the air and on every surface."
>
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />

    <main>
      <!-- Source: master copy deck mission block. -->
      <SectorHero
        layout="split"
        eyebrow="Human Health"
        headline={['Healthier Rooms. Healthier Teams.', 'Healthier People.']}
        support="One Platform. Every Room People Share."
        lede="Pathogens don’t respect boundaries. They move through a wrestling room, a clinic, or a classroom the same way they move through a barn. They are invisible, relentless, and costly. Conventional disinfection fights them after an outbreak. Genesis360 is a proven, proactive system that helps prevent the outbreak in the first place."
        poster={heroPoster}
        video={heroVideo}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
        secondaryCta={{ href: '#sectors', label: 'Explore By Sector' }}
      />

      <!-- Mission band, same pattern as the ag hub. Sources: master copy deck;
           lab validation report (the four failure modes). -->
      <section class="relative overflow-hidden bg-white py-20 sm:py-24">
        <div class="particle-field particle-field-light" aria-hidden="true">
          <span class="particle"></span>
          <span class="particle"></span>
          <span class="particle"></span>
          <span class="particle"></span>
          <span class="particle"></span>
          <span class="particle"></span>
          <span class="particle"></span>
          <span class="particle"></span>
          <span class="particle"></span>
          <span class="particle"></span>
        </div>
        <div class="container-page relative">
          <h2 class="bl-h2 reveal mx-auto text-center" x-intersect.once="$el.classList.add('is-visible')">
            Our mission is simple.<br /><span class="text-brand-600">Genesis360 makes the rooms people share safer.</span>
          </h2>

          <div class="reveal mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-2" x-intersect.once="$el.classList.add('is-visible')">
            <p class="text-base leading-8 text-brand-body">
              Manual cleaning was designed for surfaces, and it leaves the same four gaps in every building: the air people breathe, the irregular and hard-to-reach surfaces a cloth never meets, the recontamination that starts the moment the room is back in use, and the plain inconsistency of people doing a repetitive job under time pressure.
            </p>
            <p class="text-base leading-8 text-brand-body">
              Genesis360 is engineered for every room. An automated distribution platform pairs with BotaniMax, a 100% botanical, EPA-registered disinfectant, to deliver a sub-10 micron dry vapor that flows on, around, under and behind every surface and treats the air column at the same time. No harsh chemistry. No surprises. Precise pathogen control that runs whether or not anyone remembers to.
            </p>
          </div>
        </div>
      </section>

      <SectorCards
        heading="Different rooms, different people, the same invisible problem."
        prompt="Select a sector to see what it costs"
        cards={sectorCards}
        checklist={checklist}
      />

      <DifferenceGrid
        eyebrow="The Difference"
        heading="Delivery Is The Difference."
        lede="Genesis360 suspends BotaniMax sub-10-micron vapor in the air of the room, controlling pathogens at the source by treating surfaces and air simultaneously."
        points={points}
        closing={{
          lead: 'The result: a measurably cleaner room, a lighter pathogen load, and people who stay healthy enough to train, learn, work, and heal.',
          aside: 'Every gym, every clinic, every classroom is carrying the same risk. Genesis360 gives you a way to get ahead of it instead of cleaning up after it.',
        }}
      />

      <PostsRow posts={humanPosts} heading="From The Field" />

      <SectorCta
        eyebrow="Your Building. Your Coverage Plan."
        heading="Put Genesis360 To Work Where People Gather."
        copy="Tell us what you are protecting and how the building runs. Our team will map the right portable, fixed, or Compact Pro deployment and build a practical coverage plan around it."
      />
    </main>

    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Remove the `human` route from the catch-all**

In `src/pages/[...slug].astro`, delete the line `    'human',` from the `getStaticPaths` array, and delete the whole block from `    {canonicalSlug === 'human' && (` through its closing `    )}` (it ends just before `    {canonicalSlug === 'hvac' && (`). Then confirm nothing else in the file referenced only that block:

```bash
grep -n "'human'\|canonicalSlug === 'human'\|humanMarkets" "src/pages/[...slug].astro"
```
Expected: no `'human'` or `canonicalSlug === 'human'` lines. If `humanMarkets` is now unused in that file, remove its import line too.

- [ ] **Step 3: Delete the old sector template**

```bash
git rm -q "src/pages/human/[slug].astro" && ls src/pages/human/
```
Expected: `athletics.astro healthcare.astro index.astro military.astro schools.astro`.

- [ ] **Step 4: Build and assert the hub, and that nothing else moved**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"; node scripts/assert-html.mjs dist/human/index.html "Healthier People." "Genesis360 makes the rooms people share safer." "sector-card" "/human/athletics/" "/human/healthcare/" "/human/schools/" "/human/military/" "Delivery Is The Difference." "Put Genesis360 To Work Where People Gather." "!Protecting People Everywhere They Gather"; ls dist/human/
```
Expected: `44 page(s) built` (the five Human routes still exist, the kitchen sink is still there), ten `ok`, and `ls` shows `athletics healthcare index.html military schools`.

- [ ] **Step 5: Type check and brand check**

```bash
npx astro check 2>&1 | tail -4; npm run check:brand
```
Expected: `8 errors`, brand passes.

- [ ] **Step 6: Commit**

```bash
git add src/pages/human/index.astro "src/pages/[...slug].astro"
git commit -m "Human: rebuild the /human/ hub on the sector blocks; retire the old human templates

Removes the human branch from the catch-all and deletes human/[slug].astro
now that all four markets have static routes.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 12: QA, cleanup, and the queue record

**Files:**
- Delete: `src/pages/dev/sector-blocks.astro`
- Modify: `TASKS.md` (the "Build-out 1/5 — Human section" entry)

- [ ] **Step 1: Delete the kitchen sink and confirm the page count returns to 43**

```bash
git rm -q src/pages/dev/sector-blocks.astro && rmdir src/pages/dev 2>/dev/null; npm run build 2>&1 | grep -i "error\|page(s) built"
```
Expected: `43 page(s) built`.

- [ ] **Step 2: Internal link sweep on the five pages**

Every internal `href` must resolve to a built file. Anchors (`#...`), `tel:`, `mailto:`, and external URLs are skipped.

```bash
for p in human/index.html human/athletics/index.html human/healthcare/index.html human/schools/index.html human/military/index.html; do grep -o 'href="/[^"#]*"' "dist/$p" | sed 's/href="//; s/"$//' | sort -u | while read -r h; do f="dist${h%/}/index.html"; [ -f "$f" ] || [ -f "dist$h" ] || echo "BROKEN in $p: $h"; done; done; echo "sweep done"
```
Expected: only `sweep done`. Fix any `BROKEN` line before continuing.

- [ ] **Step 3: Heading order and h1 count**

```bash
for p in human/index.html human/athletics/index.html human/healthcare/index.html human/schools/index.html human/military/index.html; do printf '%-32s h1=%s h2=%s h3=%s\n' "$p" "$(grep -o '<h1' dist/$p | wc -l | tr -d ' ')" "$(grep -o '<h2' dist/$p | wc -l | tr -d ' ')" "$(grep -o '<h3' dist/$p | wc -l | tr -d ' ')"; done
```
Expected: `h1=1` on every page.

- [ ] **Step 4: Browser QA at phone and desktop widths**

Start the preview server in the background, then use the `/browse` skill to open each of the five pages at 390px and 1280px wide. On each: the hero copy is legible over the footage or still; the deployment cards line up (two or three across at 1280, stacked at 390); the hub's sector cards show the stat on hover at 1280 and show everything at 390; the reveal animations fire on scroll; the browser console has no errors. Take one screenshot per page per width into the scratchpad.

```bash
npm run preview -- --port 4321 &
```
Pages: `http://localhost:4321/human/`, `/human/athletics/`, `/human/healthcare/`, `/human/schools/`, `/human/military/`. Stop the server afterwards.

Fix anything found before continuing, re-running the build and the relevant `assert-html.mjs` command.

- [ ] **Step 5: Final checks**

```bash
npx astro check 2>&1 | tail -4; npm run check:brand; git status --short
```
Expected: `8 errors`, brand passes, and `git status` shows only the deletion staged plus `TASKS.md` once edited in the next step.

- [ ] **Step 6: Record the outcome in `TASKS.md`**

Check off the entry `- [ ] Build-out 1/5 — Human section to ag/hog quality: ...` and indent a `Done YYYY-MM-DD:` note under it listing: the five pages and their tiers, the eleven components under `src/components/sector/` with `AgPostsRow`/`AgCta` now wrapping two of them, the new `human-markets.ts` fields, which markets got footage and which stayed on a still, the deletion of `human/[slug].astro` and the catch-all branch, that the ag pages were verified byte-identical after Task 1, that no pricing appears, that everything is behind the gate until full launch, that commits are local and unpushed, and where the QA screenshots are. Flag for Marty's review: the drafted copy on every page, the three Tarleton quotes and their attribution, and the still-image heroes if any market got no footage.

- [ ] **Step 7: Commit**

```bash
git add TASKS.md
git commit -m "Human section complete: remove dev kitchen sink, record outcome in TASKS.md

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

## Self-review notes

- Spec coverage: pages (Tasks 7–11), components (1, 3, 4, 5), data (2, 6), assets (2, 6), copy rules (global constraints + per-page source comments), a11y (SectorHero `aria-hidden` video, h1 check in 12), QA (12), rollout (gated, unpushed; noted in 12).
- The spec's `SectorHero` `secondaryCta` and `lede` props exist (Task 3); `CompareBand` is nested in `StatBand` via slot (Task 4), matching the spec's note that the hog page renders it that way.
- Names used consistently: `PostsRow`, `SectorCta`, `SectorHero`, `ArgumentBand`, `StatBand`, `CompareBand`, `DeploymentCards`, `DifferenceGrid`, `CaseStudyBand`, `SectorCards`, `OtherMarkets`; data fields `tagline`, `stat`, `package`, `hero.poster`, `hero.video`.
