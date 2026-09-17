# Blog Index & Post Template — Design Specification

Build-out 5/5, the last sub-project. Smaller in scope than the four before
it: the post template and the 14 existing post bodies are already close to
the site's quality bar (dark image hero, tags, an audio-narration player,
clean prose, a related-posts row) — confirmed by viewing a live post and by
sweeping all 14 bodies for the compliance issues found elsewhere in the site
(EPA category codes, retired product names, "Genesis 360" with a space,
patent claims, dollar figures). All clean; the two dollar figures present
(an FAO crop/livestock loss estimate, an Indoor Air productivity-gains
estimate) are cited industry statistics, the same pattern already accepted
on the ag pages, not pricing.

## Goal

The one real gap: `/blogs/` (the index) still uses the flat, light `PageHero`
component every other page in the site has already moved off of. Replace it
with `SectorHero` so the blog matches the dark-hero convention the rest of
the site now follows. Leave the featured-post/grid layout below it and the
individual post template's own hero alone — both already work.

## Locked decisions

| Decision | Ruling |
| --- | --- |
| Post bodies | Untouched. All 14 passed the compliance sweep; no content rewrite is in scope. |
| Post template hero | Untouched. Already a dark image hero with overlay, tags, and back-link; already matches the bar. |
| Index hero | Replace `PageHero` with `SectorHero`, `layout="center"`, on a still (no dedicated blog footage exists). |
| Index hero image | A neutral, non-sector-specific still — reuse `contact-bg.jpeg` (already established as a generic "clean indoor environment" image, used on `/contact-us/`); if it doesn't read well at the wider hero crop, pick whichever existing brand still does, by eye. |
| Copy | `Genesis360` one word; no prices; no invented claims. The index's existing eyebrow/title/support text carries over almost unchanged into the new hero's props. |
| Rollout | Static output, soft-launch gated, local commits only. |

## Page content

### `/blogs/` (index)
Replace the `PageHero` call with:
```
SectorHero
  eyebrow="Blog"
  headline={['Genesis360', 'Blog.']}
  support="Tips and insights on botanical disinfectants, Genesis360 dry fog systems, indoor air quality, and microbial risk reduction."
  poster={<chosen still>}
  cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
```
Everything below the hero (featured post, three-column grid, `QuoteForm`
band) is unchanged.

### `/blogs/[slug]/` (post template)
No changes.

## Testing and QA

Build stays at 43 pages (no routes added or removed — this only edits an
existing file's markup). `astro check` stays at the 8-error baseline. Brand
check passes. One `h1` per page (confirm the new hero doesn't introduce a
second one alongside the featured-post's own `<h2>`, which it won't since
`SectorHero` renders the page's only `h1` and the index's own content never
did). Visual review of `/blogs/` at 500 and 1280 wide; spot-check two post
pages to confirm they render unaffected.

## Rollout

Behind the soft-launch gate until full launch; commit local, nothing pushed.

## Questions parked for Marty

None new. The existing flags (all copy needs his read) already cover blog
content.
