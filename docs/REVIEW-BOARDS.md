# Review boards (MarkLayer)

One link covers every page of the site. Share this with reviewers:

    https://marklayer.app/p/securelogic-review-68bc8c4c10bf

A page switcher in the board moves between all 43 pages, and every comment
lands in the shared board regardless of which page it was left on.

**Give reviewers this index instead of the raw board link:**

    https://claude.ai/artifact/4i9KbUEgTu5cvrqsq7VzBa

MarkLayer's own switcher is a horizontal strip of 43 tabs labelled with
truncated URLs (`2. securelogic.netlify.app/about...`), and the labels cannot be
changed: ProjectTabs.tsx derives them from the url via hostnameOf() + pathOf(),
and no title field exists in the schema. There is no sidebar or vertical mode
either. The index page works around that with real page titles, grouped by
section, each deep-linking to `?page=N` in the same shared project. The artifact
is private until shared from its own Share menu.

## Why this file exists

Projects cannot be claimed. Annotation rooms grew per-link ownership (they
show up at marklayer.app/app once claimed); projects never did — see
MarkLayer migration 0006_drop_projects_owner_id.sql. Nothing can list a
project back, so this file is the only record of the link. Do not delete it.

## Rules for reviewers

- Use the page switcher, never the site nav. Clicking a link inside the
  board spawns a private project at a new URL, unique per visitor, and
  those comments are invisible to everyone else. Verified: three visits
  to one board produced three different project ids.
- Boards point at securelogic.netlify.app, never genesis360.com. On the
  live domain every interior URL 302s to / (public/_redirects), so a board
  there silently annotates the landing page instead.

## Rebuilding

Rooms were minted one per page (POST /api/<id> with the page url), then
bundled with POST /api/p/<project-id> and a pageIds array. Cap is 50 pages;
ids need 12+ chars of [A-Za-z0-9_-] and are the access token, so keep them
unguessable. Page order below is the switcher order.

| # | Page | Room id |
|---|---|---|
| 0 | / | `sl-b97931f9eb94c7c7` |
| 1 | /about-us | `sl-d8118f4ed7e71d5f` |
| 2 | /about-us/technology | `sl-7d28a8ccd1e947b6` |
| 3 | /ag | `sl-8ebf0bb9ff9f7ae3` |
| 4 | /ag/hogs-livestock | `sl-ffb88afe21c0f07a` |
| 5 | /ag/indoor-growing | `sl-0eec96d6dbd0d202` |
| 6 | /ag/poultry | `sl-32f73073688a6b1d` |
| 7 | /botanimax | `sl-63c94c4d98c4dee1` |
| 8 | /contact-us | `sl-a659450bbdc37764` |
| 9 | /faqs | `sl-d11bb3b0b1c379bc` |
| 10 | /genesis360mistingsystems | `sl-dbc3121d0f48645d` |
| 11 | /get-a-quote | `sl-a2e37b310a75aed6` |
| 12 | /home-full | `sl-a5639a2282cd8211` |
| 13 | /home-page | `sl-5f31b22902abdbb0` |
| 14 | /human | `sl-c2a0e0614b1251e0` |
| 15 | /human/athletics | `sl-bfc9dd63be6f2e25` |
| 16 | /human/healthcare | `sl-b905c31a949ac0df` |
| 17 | /human/military | `sl-5bd5d5fd592cb878` |
| 18 | /human/schools | `sl-536beb9250175a50` |
| 19 | /hvac | `sl-6dda2f43aca4c2ef` |
| 20 | /hvac/commercial | `sl-2b6569e7815b86c8` |
| 21 | /hvac/industrial | `sl-7ecb0cf2cfcd4c78` |
| 22 | /hvac/residential | `sl-a254d7dc4275dbd8` |
| 23 | /privacy-policy | `sl-b1d2a834c0546351` |
| 24 | /resources | `sl-8bc0bb586dba6263` |
| 25 | /resources/brochures | `sl-255f61b6686a1b81` |
| 26 | /resources/documentation | `sl-8b79ad721deafae4` |
| 27 | /resources/faqs | `sl-348b93d764e8583c` |
| 28 | /blogs | `sl-344f980daf4aedc3` |
| 29 | /blogs/are-you-missing-these-3-high-risk-hotspots | `sl-378aa443a90ad578` |
| 30 | /blogs/biofilm-hvac-prevention | `sl-e0a44030b38a8504` |
| 31 | /blogs/biosecurity-in-poultry-farms-starts-with-proper-disinfection | `sl-58f0d31899a7e7c4` |
| 32 | /blogs/dont-let-infections-bench-your-team | `sl-7a5c5fa1f5c3041b` |
| 33 | /blogs/how-to-extend-the-lifespan-of-your-hvac-system | `sl-95be381ef98e46fa` |
| 34 | /blogs/how-to-identify-sick-building-syndrome-and-improve-indoor-air-quality-in-your-building | `sl-e0bd141c61bc43d5` |
| 35 | /blogs/how-to-stop-infections-before-they-spread-at-sea | `sl-054a7ba7a131c5ba` |
| 36 | /blogs/indoor-growing-facilities-microbial-risk-prevention | `sl-5a0e7ccdbc7f5e9b` |
| 37 | /blogs/reducing-microbial-risk-to-improve-cannabis-crop-yield | `sl-f867b26b887895fa` |
| 38 | /blogs/regular-surface-disinfection-in-businesses-is-an-essential-component-in-building-customer-trust | `sl-5e535d1714ebe62e` |
| 39 | /blogs/secure-logic-newfields-ag-botanical-disinfection-partnership | `sl-52b599a7ad8a571d` |
| 40 | /blogs/summer-vs-fall-rethinking-seasonal-cleaning-strategies-in-indoor-pig-farming | `sl-9096dbb9855e66f4` |
| 41 | /blogs/synthetic-thymol-vs-botanical-thyme-whats-really-in-your-natural-cleaning-product | `sl-7adce030dcb65004` |
| 42 | /blogs/why-air-quality-in-schools-matters-more-than-you-think | `sl-af1ffc5b714e9ac5` |
