# Resources & Utility Pages — Design Specification

Build-out 4/5. Brings `/resources/`, `/resources/brochures/`, `/resources/documentation/`,
`/resources/faqs/` (and its `/faqs/` alias), `/contact-us/`, `/get-a-quote/`, and
`/privacy-policy/` off the catch-all and up to the quality of the ag/Human/HVAC/
product sections.

## Goal

These are utility pages, not sales pages, so the bar is clarity and trust, not
a sales argument. Replace the flat `PageHero` + light-gray-band template with
the site's dark hero treatment and componentized bands, keep every existing
fact (FAQ answers, brochure summaries, legal text) unless it's wrong, and fix
one real reliability problem found while investigating: the documentation
page's five downloads link to `securelogicusa.com/wp-content/uploads/...`
(the WordPress media library) instead of a local `/docs/` file. Two of those
five documents are already sitting in `reference-files/`; self-host those.
The other three aren't in any reference folder available to this build, so
they keep their external link and go on the Marty list.

## Locked decisions

| Decision | Ruling |
| --- | --- |
| Hero treatment | `SectorHero`, `layout="center"`, on a still (no page here has dedicated footage) or a light variant for the two pages that are pure utility (`Get A Quote`, `Contact Us`) — see per-page notes. |
| FAQ content | Keep the existing 8 Q&As verbatim (they were already corrected against the label/Explainer in the 2026-09-17 audit pass); add one new Q&A about BotaniMax's EPA registration, a gap the BotaniMax audit flagged and nothing has filled yet. |
| Brochures | Keep the 3 existing brochures (Early Child Care, Agriculture, Fitness) and add the sections built since: Athletics/Human and HVAC. No new brochure PDF is authored — link to the existing `reference-files/brochures/` PDFs, copied into `public/docs/`. |
| Documentation | Self-host the EPA Master Label and SDS (both present in `reference-files/botanimax/`) at `/docs/`. The Efficacy Lab Report, Staph Efficacy Lab Report, and Industrial Hygiene White Paper are not present in any reference folder; their links stay pointed at the existing WordPress URL, unchanged, with a Marty question asking for local copies before the DNS cutover. |
| Privacy Policy | Legal text is unchanged, word for word — this is not marketing copy to improve, and altering it without counsel review would be worse than leaving it generic. Only the visual container changes. A Marty question asks whether real counsel-reviewed policy text exists. |
| Contact Us / Get A Quote | Keep `QuoteForm`/`PipedriveForm` untouched (it already works and is not visual debt). Add a short trust band above the form on each so the page doesn't read as just a bare form. |
| Copy | `Genesis360` one word; no unsupported EPA category wording (`25(b)/25(c)/2(c)`); no prices; source comment beside every quantitative FAQ answer, matching the standard already set on the sector pages. |
| Rollout | Static output, soft-launch gated, local commits only. |

## Routes

| Route | File | Tier |
| --- | --- | --- |
| `/resources/` | `src/pages/resources/index.astro` | standard+ (hub) |
| `/resources/brochures/` | `src/pages/resources/brochures.astro` | standard |
| `/resources/documentation/` | `src/pages/resources/documentation.astro` | standard |
| `/resources/faqs/` | `src/pages/resources/faqs.astro` | standard |
| `/contact-us/` | `src/pages/contact-us.astro` | standard |
| `/get-a-quote/` | `src/pages/get-a-quote.astro` | standard |
| `/privacy-policy/` | `src/pages/privacy-policy.astro` | standard (legal) |

`/faqs/` stays as an alias that redirects to `/resources/faqs/` (it already
soft-redirects via `canonicalSlug` in the catch-all; once these become static
files, add a one-line `src/pages/faqs.astro` that 301s to `/resources/faqs/`
via `Astro.redirect`, so the old alias keeps working). All seven files leave
`src/pages/[...slug].astro`, which then loses these seven `getStaticPaths`
entries and their branches, plus the `docGroups`/`brochures`/`faqs` constants
and now-unused imports. The `home-page` branch (a WordPress-redirect stub) is
out of scope and stays in the catch-all.

Page count: 43 static pages today; +7 new files, −1 (`/faqs/` is now a tiny
redirect file instead of sharing the catch-all) nets to 50 (the catch-all
route itself, `[...slug].astro`, still generates the remaining stub paths it
retains: `home-page`). Confirm the exact number at build time in Task 1 and
treat that as the new baseline for this plan's remaining tasks.

## Assets

Copy into `public/docs/`: `Secure-Logic-BotaniMax-EPA-Master-Label.pdf` (from
`reference-files/botanimax/EPA Master_Label - BotaniMax.pdf`) and
`Secure-Logic-BotaniMax-SDS.pdf` (from `reference-files/botanimax/SDS -
BotaniMax.pdf`). Copy two new brochure cover images from the existing pattern
(`brochure-childcare.png` etc.) — reuse `Genesis360 Athletic E-Brochure.pdf`'s
first page and `Genesis360 HVAC.pdf`'s first page as cover art the same way
the three existing brochure covers were made (check how `brochure-childcare.png`
etc. were produced — likely a cropped/rendered first page — and match that
process), or use an existing hero still if a page-render doesn't look right;
judge by eye. Copy the two new brochure PDFs themselves into `public/docs/`
as `Secure-Logic-Athletics-Brochure.pdf` and `Secure-Logic-HVAC-Brochure.pdf`.

## Page content

### `/resources/` hub
`SectorHero` center, eyebrow "Resources", headline `['Everything You Need.', 'In One Place.']`,
support from the existing copy, no video (a still — reuse an existing brand
image, e.g. the FAQ room photo already in `src/assets/images/faq-room.jpg`).
Below: the existing four-card grid (Blog, Brochures, Documentation, FAQs),
kept as-is content-wise but restyled to the site's `card`/`accent-card`
system already used elsewhere (it already uses this — mostly a hero/visual
upgrade, not a content rewrite). Closing `SectorCta`.

### `/resources/brochures/`
`SectorHero` center (still). Five-card grid (was three): Early Child Care,
Agriculture, Fitness, Athletics (new), HVAC (new). Same card markup as today
(image, title, summary, download button) for all five. Closing `SectorCta`.

### `/resources/documentation/`
`SectorHero` center (still). Keep the three document groups (Documentation,
Lab Reports, White Paper) and the sticky label image. Update only the two
now-self-hosted links to point at `/docs/Secure-Logic-BotaniMax-EPA-Master-Label.pdf`
and `/docs/Secure-Logic-BotaniMax-SDS.pdf`; leave the other three external
links untouched (with a code comment explaining why, pointing at the Marty
question). Closing `SectorCta`.

### `/resources/faqs/`
`SectorHero` center (still, reuse `faq-room.jpg`). Keep all 8 existing FAQs
verbatim. Add a 9th:
```
question: 'Is BotaniMax EPA registered?'
answer: 'Yes. BotaniMax carries EPA Reg. No. 92089-2-103661, a full federal
registration under FIFRA. Every claim on the label — organisms, contact
times, use directions — applies only when the product is used exactly as
labeled.'
// Source: reference-files/botanimax/BotaniMax_128oz_10x5.pdf (label front panel).
```
Closing `SectorCta`.

### `/contact-us/`
`SectorHero` center (still, reuse `contact-bg.jpeg` as the poster), support
line from the existing copy. Below the hero: a short two-column band — the
existing phone/email card on the left (keep its content, restyle to the
current card system) and `QuoteForm` on the right, same layout the catch-all
already uses, just inside the new hero/section shell instead of `PageHero`.

### `/get-a-quote/`
`SectorHero` center (still, reuse an existing brand image — the D1 gym or a
neutral facility shot, judge by eye), a short one-paragraph trust line above
`QuoteForm` (the three points `QuoteForm`'s own aside already states, so
don't duplicate them here — keep this addition to one sentence, e.g. "Every
quote starts with a facility walkthrough and a coverage plan, not a
guess."). Then `QuoteForm`.

### `/privacy-policy/`
A plain, lighter-toned hero (no video/dark gradient needed for a legal page —
use `SectorHero` center with a neutral still, or the plain light header if a
dark hero reads wrong for a legal document; judge by eye and pick whichever
reads more trustworthy, not flashier). Legal body copy unchanged, in a
`prose` container matching the current one, restyled only for spacing/type
scale consistency with the rest of the site. No `SectorCta` (a legal page
shouldn't end with a sales pitch).

## Copy rules

Same as every prior sub-project: `Genesis360` one word; no `25(b)/25(c)/2(c)`;
no prices; source comment beside every quantitative claim, including the new
FAQ. Do not touch the privacy-policy legal text's wording.

## Testing and QA

Build stays at the new baseline page count (recorded in Task 1). `astro
check` stays at the 8-error baseline. Brand check passes. One `h1` per page.
Link sweep across all seven pages, including the two new self-hosted PDF
links (confirm the files exist in `dist/docs/` after build) and the `/faqs/`
redirect (confirm it 301s, not 404s). Visual review at 500 and 1280 wide.

## Rollout

Behind the soft-launch gate until full launch; commits local, nothing
pushed.

## Questions parked for Marty

1. The Efficacy Lab Report, Staph Efficacy Lab Report, and Industrial Hygiene
   White Paper links still point at the WordPress media library
   (`securelogicusa.com/wp-content/uploads/...`), which is scheduled to be
   replaced in the DNS cutover. Can you send local copies of these three so
   they can be self-hosted like the EPA label and SDS?
2. `/privacy-policy/` is still the generic WordPress default text (comments,
   embeds, cookies boilerplate that doesn't describe what this site actually
   collects). Do you have counsel-reviewed policy text, or should this stay
   placeholder until you do?
