# Content Depth Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the measured content-depth gap between `/ag/hogs-livestock/`
and the standard-tier pages across Human, HVAC, and Ag, using facts already
sourced and audited in this project (no new claims fabricated), plus one
genuinely new source (`Livestock Barn Visual Presentation.pdf`) for poultry.

**Spec:** `docs/superpowers/specs/2026-09-17-content-depth-parity-design.md`

## Constraints

- One local commit per task; never push.
- `Genesis360` one word; `npm run check:brand` must pass. No prices, no
  unsupported EPA category wording.
- Source comment beside every claim, matching the pattern already on every
  touched page.
- Do not restructure existing modules — only add new ones in the positions
  the spec names. Existing `ArgumentBand`/`DeploymentCards`/hero content on
  each page is untouched unless a task says otherwise.
- **Task 2 (healthcare) must not start until the separately-dispatched
  healthcare hero/copy rework (queue task, branch `healthcare-rework`) is
  merged into master.** Check `git log --oneline | grep -i healthcare` or
  ask the controller before starting Task 2 if this isn't obviously true.
- Work from `/Users/joshuariley/Sites/securelogic` (or a worktree the
  controller names).

---

### Task 1: StatBand + CompareBand for schools, military, HVAC commercial, HVAC industrial

**Files:**
- Modify: `src/pages/human/schools.astro`, `src/pages/human/military.astro`, `src/pages/hvac/commercial.astro`, `src/pages/hvac/industrial.astro`

- [ ] **Step 1: Add imports**

Each file needs `StatBand` and `CompareBand` imported from
`'../../components/sector/StatBand.astro'` and
`'.../CompareBand.astro'`, alongside the existing sector-block imports.

- [ ] **Step 2: Insert the new band after `ArgumentBand`, before `DeploymentCards`**

**`src/pages/human/schools.astro`** — insert:
```astro
      <!-- Source: Laboratory Validation and Field Performance ... Tarleton State.pdf
           (>=5-log bacterial, >=6-log viral reduction); Technology Explainer.pdf
           (sub-10-micron suspension time, up to 8 hours). -->
      <StatBand
        eyebrow="What A Clean Classroom Actually Needs"
        heading="A Wipe-Down Reaches Desks. It Doesn't Reach The Air."
        lede="Absences, substitute costs, and a school year that keeps resetting to zero every time something goes around the building."
        figures={[
          { value: '≥5-log', label: 'Bacterial reduction', copy: 'Independent laboratory testing of the Genesis360 platform, in controlled conditions.' },
          { value: 'Up to 8 hrs', label: 'Droplet suspension time', copy: 'Sub-10-micron droplets remain suspended in the air column, reaching what a cloth never touches.' },
        ]}
      >
        <CompareBand
          todayIntro="A typical classroom cleaning routine covers:"
          today={['Desks and door handles, wiped by hand', 'Shared surfaces, cleaned once a day at best', 'The air the class actually breathes for the hour — not covered at all']}
          withIntro="Genesis360 adds:"
          with={['An automated cycle after hours or between classes', 'Coverage of the air column and every surface in the same pass', 'A dry-to-the-touch room by the time the next class walks in']}
        />
      </StatBand>

```
**`src/pages/human/military.astro`** — insert:
```astro
      <!-- Source: Laboratory Validation and Field Performance ... Tarleton State.pdf
           (>=5-log bacterial, >=6-log viral reduction); Technology Explainer.pdf
           (sub-10-micron suspension time, up to 8 hours). -->
      <StatBand
        eyebrow="What Close Quarters Actually Need"
        heading="An Outbreak Doesn't Wait For The Next Cleaning Shift."
        lede="One case in a shared bunk room or briefing space can sideline a unit faster than any single point of manual cleaning can keep up with."
        figures={[
          { value: '≥6-log', label: 'Viral reduction', copy: 'Independent laboratory testing of the Genesis360 platform, in controlled conditions.' },
          { value: 'Up to 8 hrs', label: 'Droplet suspension time', copy: 'Sub-10-micron droplets stay airborne long enough to reach what manual cleaning misses.' },
        ]}
      >
        <CompareBand
          todayIntro="A typical shared-space routine covers:"
          today={['High-touch surfaces, wiped on a rotation', 'Common areas, cleaned between shifts', 'The air in a shared room — not addressed by a wipe-down']}
          withIntro="Genesis360 adds:"
          with={['A scheduled cycle that runs whether or not anyone remembers', 'Coverage of the air column and every surface in one pass', 'A room that is dry and ready the moment it is needed again']}
        />
      </StatBand>

```
**`src/pages/hvac/commercial.astro`** — insert (note: `today`/`with` prop pattern must match `hvac/residential.astro`'s `CompareBand` usage exactly — check that file if unsure of the exact prop names):
```astro
      <!-- Source: Genesis360 HVAC.pdf (four homeowner/facility concerns, adapted to a
           multi-unit building context); Laboratory Validation ... Tarleton State.pdf. -->
      <StatBand
        eyebrow="What Every Building Manager Already Knows"
        heading="One Dirty Coil Affects Every Room It Serves."
        lede="Restricted airflow, rising energy costs, and the same recycled air moving through every office the unit feeds."
        figures={[
          { value: '≥5-log', label: 'Bacterial reduction', copy: 'Independent laboratory testing of the Genesis360 platform, in controlled conditions.' },
          { value: '2×', label: 'a year is all the maintenance the system asks for', copy: 'The documented Genesis360 HVAC maintenance schedule.' },
        ]}
      >
        <CompareBand
          todayIntro="A typical building maintenance routine covers:"
          today={['A scheduled coil cleaning, a few times a year', 'Filter changes on their own cycle', 'Buildup between visits — not addressed until the next service call']}
          withIntro="Genesis360 AeroGuard adds:"
          with={['A scheduled cycle between manual service visits', 'Coverage of the coil, drain pan, and downstream duct pathway', 'One record of every cycle that ran, across every unit']}
        />
      </StatBand>

```
**`src/pages/hvac/industrial.astro`** — insert:
```astro
      <!-- Source: Genesis360 HVAC.pdf (adapted to a continuous-operation industrial
           context); Laboratory Validation ... Tarleton State.pdf. -->
      <StatBand
        eyebrow="What Runs Around The Clock Needs Around-The-Clock Coverage"
        heading="Biofilm Doesn't Take The Same Breaks Your Maintenance Team Does."
        lede="Warehouses, plants, and cold storage keep their air systems running continuously, giving buildup the same continuous conditions to grow in."
        figures={[
          { value: '≥5-log', label: 'Bacterial reduction', copy: 'Independent laboratory testing of the Genesis360 platform, in controlled conditions.' },
          { value: '2×', label: 'a year is all the maintenance the system asks for', copy: 'The documented Genesis360 HVAC maintenance schedule.' },
        ]}
      >
        <CompareBand
          todayIntro="A typical plant maintenance routine covers:"
          today={['A scheduled coil cleaning, on its own cycle', 'Filter changes tracked separately', 'The time between visits — where buildup keeps building']}
          withIntro="Genesis360 AeroGuard adds:"
          with={['A cycle that runs on the same schedule the plant does', 'Coverage across every large air handler on site', 'A maintenance record that doesn't depend on who was on shift']}
        />
      </StatBand>

```

If any of these four pages already defines local `today`/`withGenesis` (or
similarly-named) arrays elsewhere in the file for a different purpose, name
your new arrays something distinct (e.g. `statToday`/`statWithGenesis`) to
avoid a collision — check each file's frontmatter before adding.

- [ ] **Step 3: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"
node scripts/assert-html.mjs dist/human/schools/index.html "A Wipe-Down Reaches Desks" "≥5-log"
node scripts/assert-html.mjs dist/human/military/index.html "An Outbreak Doesn't Wait" "≥6-log"
node scripts/assert-html.mjs dist/hvac/commercial/index.html "One Dirty Coil Affects Every Room"
node scripts/assert-html.mjs dist/hvac/industrial/index.html "Biofilm Doesn't Take The Same Breaks"
echo "dollar figures: $(grep -oE '\$[0-9]' dist/human/schools/index.html dist/human/military/index.html dist/hvac/commercial/index.html dist/hvac/industrial/index.html | wc -l | tr -d ' ')"
npx astro check 2>&1 | tail -4
npm run check:brand
```
Expected: `43 page(s) built` (no new routes, additive markup only); five `ok`;
`dollar figures: 0`; `8 errors`; brand passes.

- [ ] **Step 4: Commit**

```bash
git add src/pages/human/schools.astro src/pages/human/military.astro src/pages/hvac/commercial.astro src/pages/hvac/industrial.astro
git commit -m "Schools, Military, HVAC Commercial/Industrial: add a stat-and-comparison band, matching the flagship pages' depth

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: StatBand + CompareBand for Healthcare (after the hero/copy rework merges)

**Files:**
- Modify: `src/pages/human/healthcare.astro`

- [ ] **Step 0: Confirm the prerequisite landed**

```bash
git log --oneline --all | grep -i "healthcare page: hero"
```
If this returns nothing, the healthcare hero/copy rework hasn't merged yet.
Stop and report BLOCKED rather than editing a version of the file that's
about to be superseded.

- [ ] **Step 1: Read the current file in full** (it changed since this plan
was written) and insert `StatBand`/`CompareBand` after `ArgumentBand`,
before `DeploymentCards`, in the same style as Task 1's four pages:

```astro
      <!-- Source: Laboratory Validation and Field Performance ... Tarleton State.pdf
           (>=5-log bacterial, >=6-log viral reduction). -->
      <StatBand
        eyebrow="What Every Patient Room Needs"
        heading="Infection Control Can't Depend On Who Cleaned The Room Last."
        lede="A missed pass, a rushed shift change, or a room turned over five minutes faster than it should have been — the gap is always human, not chemical."
        figures={[
          { value: '≥5-log', label: 'Bacterial reduction', copy: 'Independent laboratory testing of the Genesis360 platform, in controlled conditions.' },
          { value: '≥6-log', label: 'Viral reduction', copy: 'Independent laboratory testing of the Genesis360 platform, in controlled conditions.' },
        ]}
      >
        <CompareBand
          todayIntro="A typical room-turnover routine covers:"
          today={['Surfaces, wiped by hand between patients', 'The air in the room — not addressed by a wipe-down', 'Consistency that depends on who is on shift']}
          withIntro="Genesis360 adds:"
          with={['An automated cycle scheduled around patient flow', 'Coverage of the air column and every surface in the same pass', 'The same result, every time, regardless of staffing']}
        />
      </StatBand>

```
Adjust the exact heading/eyebrow wording if it clashes tonally with whatever
the merged hero rework's headline/argument-band heading now say — keep the
page's voice consistent, don't just paste this in blindly if the surrounding
copy has moved in a different direction. Use your judgment; the figures and
sourcing must stay accurate regardless.

- [ ] **Step 2: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"
node scripts/assert-html.mjs dist/human/healthcare/index.html "≥5-log" "≥6-log"
echo "dollar figures: $(grep -oE '\$[0-9]' dist/human/healthcare/index.html | wc -l | tr -d ' ')"
npx astro check 2>&1 | tail -4
npm run check:brand
```
Expected: `43 page(s) built`; two `ok`; `dollar figures: 0`; `8 errors`; brand passes.

- [ ] **Step 3: Commit**

```bash
git add src/pages/human/healthcare.astro
git commit -m "Healthcare: add a stat-and-comparison band, matching the flagship pages' depth

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: `ag/poultry.astro` — a coverage-map from new source material

**Files:**
- Modify: `src/pages/ag/poultry.astro`

- [ ] **Step 1: Read the source material**

Read `reference-files/brochures/Livestock Barn Visual Presentation.pdf`
pages 4, 6, and 8 (render each with `sips -s format png -Z 1400
<single-page-pdf> --out <name>.png` after extracting the single page with
`pypdf`, the same technique used earlier in this project — or view the
already-rendered copies if the controller has left them in the scratchpad
directory; check there first). Page 6 is the poultry-specific "Disease Can
Enter From Many Pathways" diagram (8 numbered points: Birds, People,
Vehicles, Equipment, Feed, Water, Wild Birds, Air). Page 8 is "Complete
Coverage. Healthier Flocks." (Air Space, All Surfaces, Waste Room, Every
Day; Encapsulate / Inactivate / Reduce).

- [ ] **Step 2: Check for existing poultry-house render art**

```bash
ls reference-files/renders | grep -i "poultry\|chicken\|flock"
```
`CoverageMap` needs a cutaway-style `art` image. If nothing suitable exists,
use the best available poultry-house photo/render as the map art even if
it's not a literal cutaway (the callouts will still work positioned over a
real barn interior photo) — note in your report which image you used and
why. Do not block on missing art the way `indoor-growing` is blocked; a
non-cutaway photo is an acceptable fallback here.

- [ ] **Step 3: Read `src/pages/hvac/residential.astro`'s `CoverageMap` usage** in full as your template for exact prop shapes (`points`, `stageAspect`, `artWidth`, `mobileIcon`, etc.) — `CoverageMap.astro` itself lives at `src/components/sector/CoverageMap.astro`, read it too if any prop is unclear.

- [ ] **Step 4: Add the `CoverageMap` to `poultry.astro`**, positioned after
its `ArgumentBand`-equivalent argument section, before its deployment/cards
section (read the file to find the exact boundary — it does not use the
shared `ArgumentBand` component the way Human/HVAC pages do; it has its own
inline markup, matching the ag pages' established pattern before the
`SectorHero` consolidation — do not convert the whole page to shared
components, just insert `CoverageMap` as an additional section). Use 8
points from page 6's pathway diagram (Birds, People, Vehicles, Equipment,
Feed, Water, Wild Birds, Air) as the callouts — pick reasonable icons from
`@lucide/astro` for each (e.g. `Bird`, `User`, `Truck`, `Wrench`, `Wheat` or
similar for feed, `Droplet` for water, `Bird` again or `CloudRain` for wild
birds — check what's actually exported by `@lucide/astro` before committing
to a name), each with a one-sentence `copy` naming the pathway. Heading and
lede should use the source page's own framing: eyebrow "Biosecurity",
heading "Disease Can Enter From Many Pathways.", lede "One goal: keep
pathogens out. Every entry point the flock doesn't control is one the
system does." (adjust wording to taste; keep the meaning). Source comment
citing `reference-files/brochures/Livestock Barn Visual Presentation.pdf`
(pages 6 and 8).

- [ ] **Step 5: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"
node scripts/assert-html.mjs dist/ag/poultry/index.html "Disease Can Enter From Many Pathways" "map-stage"
echo "dollar figures: $(grep -oE '\$[0-9]' dist/ag/poultry/index.html | wc -l | tr -d ' ')"
npx astro check 2>&1 | tail -4
npm run check:brand
```
Expected: `43 page(s) built`; two `ok`; `dollar figures: 0`; `8 errors`;
brand passes.

- [ ] **Step 6: Tune the anchor positions from a screenshot**, the same way
`hvac/residential.astro`'s coverage map was tuned — serve `dist/`, capture
`/ag/poultry/` at 1280 wide, view it, adjust `anchor` coordinates until each
dot sits on a sensible spot on the art, rebuild, re-capture, repeat until it
reads right.

- [ ] **Step 7: Commit**

```bash
git add src/pages/ag/poultry.astro
git commit -m "Poultry: add a biosecurity coverage map from the Livestock Barn Visual Presentation

New source material, not previously used anywhere on the site: the deck's
poultry-specific 8-pathway diagram and Complete Coverage framework.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Light-touch depth for the Human and HVAC hubs

**Files:**
- Modify: `src/pages/human/index.astro`, `src/pages/hvac/index.astro`

- [ ] **Step 1: Read both files' mission-band section in full.**

`DifferenceGrid`'s `icon` prop is a fixed 4-option union
(`droplet | coverage | cycle | shield`) and both hubs already use all four —
do not try to add a fifth point; the component would need a real change for
that, which is out of scope here. Instead, add ONE additional paragraph to
each hub's mission band (currently two paragraphs each), citing an
already-established platform-wide fact not yet mentioned in that band:

**`human/index.astro`** — add a third paragraph after the existing two:
```
Independent laboratory testing of the Genesis360 platform has shown bacterial reductions of five log or better and viral reductions of six log or better — the same standard every Human market page on this site cites for its own deployment.
```
(Source: Laboratory Validation and Field Performance ... Tarleton State.pdf — already cited on every Human subpage; this just states it once at the hub level too.)

**`hvac/index.astro`** — add a third paragraph after the existing two:
```
Sub-10-micron droplets remain suspended in the air column for up to 8 hours in field studies, moving with the airflow through the mechanical area and the downstream duct pathway instead of settling at the source.
```
(Source: Technology Explainer.pdf — already cited on `hvac/residential.astro`.)

Adjust the grid layout class if adding a third paragraph breaks the existing
`md:grid-cols-2` two-column balance (a `md:grid-cols-2` with 3 children will
leave one orphaned on its own row at desktop width, which is fine and
common, but check it looks acceptable in Step 3's screenshot rather than
assuming).

- [ ] **Step 2: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"
node scripts/assert-html.mjs dist/human/index.html "five log or better and viral reductions of six log"
node scripts/assert-html.mjs dist/hvac/index.html "up to 8 hours in field studies"
npx astro check 2>&1 | tail -4
npm run check:brand
```
Expected: `43 page(s) built`; two `ok`; `8 errors`; brand passes.

- [ ] **Step 3: Screenshot both hubs at 1280 wide** and confirm the third
mission paragraph doesn't look orphaned or awkward; adjust the grid class if
it does.

- [ ] **Step 4: Commit**

```bash
git add src/pages/human/index.astro src/pages/hvac/index.astro
git commit -m "Human and HVAC hubs: one more sourced fact in the mission band

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: QA, Marty questions, and the queue record

**Files:**
- Modify: `docs/QUESTIONS-FOR-MARTY.md`, `TASKS.md`

- [ ] **Step 1: Visual review** of all seven touched pages
(`human/{schools,military,healthcare}`, `hvac/{commercial,industrial,index}`,
`human/index`, `ag/poultry`) at 500 and 1280 wide. Fix the smallest thing for
any genuine defect.

- [ ] **Step 2: Final checks**

```bash
npx astro check 2>&1 | tail -4
npm run check:brand
git status --short
```

- [ ] **Step 3: Append to `docs/QUESTIONS-FOR-MARTY.md`** under a new
`## Content Depth` heading, continuing the numbering, the four questions
from the spec's "Questions parked for Marty" section (Military has no
dedicated source material; Schools has none either; HVAC Commercial/
Industrial share Residential's one brochure; `ag/indoor-growing`'s
coverage-map is still blocked on art).

- [ ] **Step 4: Record in `TASKS.md`.** Re-read the file fresh (other queue
items may have landed since this plan started). Check off
`- [ ] Bring the Human, HVAC, and Ag section indexes and their subpages up
to the same content depth as /ag/hogs-livestock/...` with a `Done
2026-09-17:` note: which pages got a new `StatBand`/`CompareBand` and which
facts they reused (schools, military, healthcare, HVAC commercial/
industrial); poultry's new coverage-map and its genuinely-new source
(`Livestock Barn Visual Presentation.pdf`, never mined before this task);
the light mission-band addition on both hubs; what was deliberately left
alone (`ag/hogs-livestock`, `human/athletics`, `hvac/residential`,
`ag/index` — already at depth; `ag/indoor-growing` — still art-blocked); the
four new Marty questions; QA findings; gating status.

- [ ] **Step 5: Commit, staging carefully**

Other queue items may have uncommitted changes sitting in `TASKS.md` at the
same time as this task's own edit (check `git status --short` and
`git diff TASKS.md` before staging). Use `git add -p TASKS.md` and select
only this task's own hunk if anything else is present; stage
`docs/QUESTIONS-FOR-MARTY.md` whole if nothing else is touching it.

```bash
git commit -m "Content depth parity complete: QA, Marty questions, TASKS.md record

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```
