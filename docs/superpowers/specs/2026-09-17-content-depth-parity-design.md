# Content Depth Parity — Design Specification

Joshua's ask (via `/task`): "we want the indexes (human, hvac, and ag) and the
subpages of each to have as much content as the /ag/hogs-livestock/ page - do
your best, make notes to marty if we need something more."

## What "depth" means here, measured

A rough prose-word count (long quoted string literals, excluding CSS/attrs)
across every sector page, taken before this spec was written:

| Page | Prose words | Modules |
| --- | --- | --- |
| `ag/hogs-livestock.astro` (the reference) | ~7,600 | hero, argument, deployments, cost-of-waiting+compare, coverage-map, posts, CTA — 6 hand-built sections |
| `ag/index.astro` (hub) | ~1,800 | hero, mission, sector cards, difference band, posts, CTA |
| `human/athletics.astro` (flagship) | ~1,440 | 9 shared components |
| `hvac/residential.astro` (flagship) | ~1,550 | 10 shared components |
| `human/index.astro` (hub) | ~850 | 5 shared components |
| `hvac/index.astro` (hub) | ~800 | 5 shared components |
| `ag/poultry.astro`, `ag/indoor-growing.astro` | ~620–680 each | hero + argument only |
| `human/healthcare.astro`, `schools.astro` | ~480–520 each | hero, argument, deployment cards, posts, CTA — no stat/compare band |
| `human/military.astro` | ~380 | same shape as healthcare/schools |
| `hvac/commercial.astro`, `industrial.astro` | ~390–460 each | same shape, one fewer module than residential |

The gap is real and consistent: every "standard tier" page across all three
sections is missing one module class the flagships and the hog page have —
a stat-and-comparison band ("the cost of not doing this" / "today vs. with
Genesis360") — and, for two ag pages, a whole coverage-map module the hog
page has and they don't.

## What's genuinely available to close the gap (no fabrication)

- **Every standard-tier Human and HVAC page** can get a `StatBand` +
  `CompareBand` — the same pattern already proven on `human/athletics.astro`
  and `hvac/residential.astro` — using facts already sourced and audited
  earlier in this build (the lab report's log-reduction figures, the
  Technology Explainer's droplet-comparison facts, the HVAC brochure's
  homeowner-concern list adapted per market). This is the highest-leverage,
  lowest-risk addition: reusing a component and facts already fact-checked,
  not writing anything new from scratch.
- **`reference-files/brochures/Livestock Barn Visual Presentation.pdf`** is a
  9-page infographic deck **never mined by any prior audit or task in this
  project** — confirmed by grep, its "Every Barn Has Gaps" (Enter / Spread /
  Persist; six named gap points: incoming animals, manure pits, transport
  and crews, waste room, shared equipment, rodents and pests, barn downtime)
  and a **poultry-specific** 8-pathway biosecurity diagram (birds, people,
  vehicles, equipment, feed, water, wild birds, air) plus a poultry
  "Complete Coverage" diagram (air space, all surfaces, waste room, every
  day; encapsulate/inactivate/reduce) do not appear anywhere in
  `hogs-livestock.astro` or `poultry.astro` today. This unlocks a genuine,
  sourced `CoverageMap`-style module for `ag/poultry.astro` — the one ag
  subpage that can close its module gap with new source material, not just
  reused facts.
- **`ag/indoor-growing.astro`**'s coverage-map gap stays blocked: confirmed
  again (grep of `reference-files/renders/` for greenhouse/cutaway art)
  that no photoreal greenhouse cutaway exists, matching the `BACKLOG` item
  Joshua deferred on 2026-09-01. Carry that item forward unchanged; do not
  attempt a coverage-map for this page without the art.
- **`human/schools.astro`, `military.astro`, `healthcare.astro`** and
  **`hvac/commercial.astro`, `industrial.astro`** have no market-specific
  brochure (confirmed: only Athletics, HVAC, and general Technology/
  AthleticGuard documents exist in `reference-files/brochures/`). Their
  `StatBand`/`CompareBand` additions reuse the same general facts their
  `ArgumentBand` already cites — this deepens the page without inventing a
  new claim, but it does not give these pages anything as market-specific as
  the hog page's own barn-biosecurity content. That gap is real and goes to
  Marty as a note, not a workaround.

## Locked decisions

| Decision | Ruling |
| --- | --- |
| Scope | Standard-tier subpages first (the clearest, most measurable gap): `human/{healthcare,schools,military}.astro`, `hvac/{commercial,industrial}.astro`. Then `ag/poultry.astro` (new coverage-map content). Then the three hub indexes get one added band each for richness, lighter-touch than the subpages since they're already reasonably built. `ag/indoor-growing.astro` is out of scope (art-blocked, unchanged). `ag/hogs-livestock.astro`, `human/athletics.astro`, `hvac/residential.astro`, `ag/index.astro` are already at or near the target depth and are not touched. |
| Dependency | `human/healthcare.astro` is being reworked by a separate, already-dispatched queue task (hero/video/copy for hospital admin + family audience). This plan's healthcare work happens AFTER that merges, editing the same file a second time rather than in parallel. |
| New content per standard page | One `StatBand` + `CompareBand` pair (matching `athletics.astro`'s and `residential.astro`'s existing pattern exactly: two figures, a "today" list, a "with Genesis360" list), sourced from facts already established for that page's `ArgumentBand`. No new fact is introduced that wasn't already audited. |
| Poultry's new module | A `CoverageMap` (the same component built for HVAC residential) themed to the barn-gap/pathway diagram from the Livestock Barn Visual Presentation, with callouts drawn from its named gap points, adapted to poultry (the deck's second diagram is already poultry-specific: birds, people, vehicles, equipment, feed, water, wild birds, air). Reuses the render already available for the barn cutaway if a poultry-house equivalent exists in `reference-files/renders/`; if not, use the closest existing poultry render as the map art and say so. |
| Hub additions | One new small band per hub (Human, HVAC) — not a full page rebuild. Likely a `DifferenceGrid`-style "why this platform" band already partially present, extended with one more point, or a short testimonial/stat callout using an already-sourced fact. Kept deliberately lighter than the subpage work. |
| Copy rules | Same as every prior sub-project: `Genesis360` one word; no prices; no unsupported EPA category wording; source comment beside every claim; no invented market-specific claim where none exists in source material. |
| Rollout | Behind the soft-launch gate; local commits only. |

## Per-page plan

### `human/schools.astro`
Add `StatBand` + `CompareBand` after `ArgumentBand`, before `DeploymentCards`
(matching `athletics.astro`'s ordering). Figures: reuse the lab report's
log-reduction figures (already cited in this page's `ArgumentBand`) and the
Technology Explainer's droplet-suspension fact. Today/with-Genesis lists:
adapt the HVAC brochure's "what to be aware of" framing to a school
custodial-staff context (shared surfaces, high-touch objects, absentee
tracking) — reasoned extrapolation of the same general facts already used
elsewhere, not a new claim about schools specifically.

### `human/military.astro`
Same shape. This market has the thinnest source base of the three (no
brochure, no case study) — the `StatBand` reuses the same lab-report/
Technology-Explainer facts as schools; the today/with-Genesis lists lean on
the general "manual cleaning is inconsistent" argument already on the page.
Flag for Marty: this market has no dedicated source material at all, unlike
Athletics (E-Brochure, comparison sheet, case study) or even Schools/
Healthcare's general documents — ask whether more military-specific
material exists or whether this market should stay this general.

### `human/healthcare.astro`
Same shape, done AFTER the in-flight hero/copy rework merges. `StatBand`
figures can reuse this page's own already-cited five-log/six-log reduction
facts (repackaged as the headline figures, not just prose) plus a
maintenance or turnover-time fact if one exists in source material — check
before inventing.

### `hvac/commercial.astro`, `hvac/industrial.astro`
Same shape, reusing the HVAC brochure/Technology Explainer facts already
cited (droplet comparison table, biofilm/coil argument) as the `StatBand`
figures, and adapting `hvac/residential.astro`'s existing today/with-Genesis
lists to a commercial/industrial framing (multi-unit buildings, continuous-
operation air handlers) rather than inventing new facts.

### `ag/poultry.astro`
Add a `CoverageMap` after `ArgumentBand`, sourced from the Livestock Barn
Visual Presentation's poultry-specific 8-pathway diagram (birds, people,
vehicles, equipment, feed, water, wild birds, air) and "Complete Coverage"
framework (air space, all surfaces, waste room, every day). This is the one
page in this plan gaining genuinely new sourced content, not a reuse.

### `human/index.astro`, `hvac/index.astro`
One additional band each — likely extending the existing `DifferenceGrid`
from three points to four (matching `ag/index.astro`'s richer version, if it
has more points — check before writing) or adding a short stat callout using
an already-established platform-wide fact (e.g. the sub-10-micron suspension
time). Kept to a single new block, not a full restructure.

## Testing and QA

Build stays at 43 pages (no new routes — every change is additive markup on
existing pages). `astro check` stays at the 8-error baseline. Brand check
passes. No prices, no unsupported EPA wording. Visual review at 500 and 1280
wide for every touched page. Source comment beside every new claim.

## Questions parked for Marty

1. Military has no dedicated source material (no brochure, no case study,
   no comparison sheet) unlike Athletics. Is there more to draw on, or
   should this market's copy stay general?
2. Schools has general facts but no schools-specific document (attendance
   impact, nurse-visit data, etc.) the way Athletics has a comparison sheet.
   Is there a schools-specific source to add?
3. HVAC Commercial and Industrial share one brochure with Residential; there
   is no commercial- or industrial-specific case study or spec sheet. Is
   there more to draw on for these two markets specifically?
4. The `ag/indoor-growing.astro` coverage-map stays blocked on art (deferred
   2026-09-01, reconfirmed 2026-09-17 — no greenhouse cutaway render exists
   yet). Still waiting on that commission.
