# Product, Company, and Technology Implementation Plan

**Goal:** Replace the four legacy product/company catch-all branches with
source-grounded static pages at the quality of the sector build-outs.

**Spec:** `docs/superpowers/specs/2026-09-17-product-company-design.md`

## Constraints

- One local commit per logical unit; never push.
- Do not change navigation, redirects, launch gating, ag, Human, or HVAC.
- No prices, retired names, unsupported EPA category wording, or invented
  product claims.
- Keep the 43-page static output and eight-error `astro check` baseline.

## Task 1 — Shared hero and static route skeletons

- Add `src/components/product/ProductHero.astro`.
- Create the four route files with the approved composition and source
  comments.
- Build and confirm all four static routes shadow nothing unexpectedly.

## Task 2 — Systems and BotaniMax flagship pages

- Complete the five-product system selector, Compact specifications, and
  documented droplet comparison on `/genesis360mistingsystems/`.
- Complete ingredients, label-backed performance, usage note, and documents
  on `/botanimax/`.
- Assert required copy, forbidden names, prices, and one h1 per page.

## Task 3 — About and Technology pages

- Complete the company narrative and principles on `/about-us/`.
- Complete the comparison, physics, controls, and lab-validation modules on
  `/about-us/technology/`.
- Assert required copy and quantitative-source markers.

## Task 4 — Retire catch-all branches

- Remove the four slugs, branches, task-specific constants, and unused imports
  from `src/pages/[...slug].astro`.
- Build and confirm exactly 43 pages with no route-collision warning.

## Task 5 — QA and queue record

- Run build, check, brand, link, h1, forbidden-copy, and diff checks.
- Review all four routes at 500px and 1280px.
- Fix the smallest source issue for every genuine defect and re-run affected
  checks.
- Check off Build-out 3/5 in `TASKS.md` with page tiers, claims decisions,
  QA evidence, gating status, and Marty Questions 1–8.
- Commit the verified result, re-read `TASKS.md`, and start Build-out 4/5.
