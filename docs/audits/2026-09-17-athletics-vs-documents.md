# Athletics Copy Audit

Status: COMPLETE — all five sections filled in against the four required source documents plus the required site files.

## 1. Fact sheet

### Statistics

| Stat | Exact wording | Source |
|---|---|---|
| Wrestler infection rate | "Approximately 60% to 100% of wrestlers experience at least one skin infection during a typical season, depending on the level of hygiene and facility maintenance." | `Athletics Competitive Comparison.pdf`, "Wrestling Infection Statistics" |
| Bacterial survival | "Bacteria can survive 72+ hours on sweat-soaked fabrics and rubber ﬂoors if not properly sanitized." | `Athletics Competitive Comparison.pdf` |
| #1 cause of time loss | "Skin infections are the #1 reported cause of time loss in wrestling." | `Athletics Competitive Comparison.pdf` |
| ROI claim | "🍀 Up to 90% reduction in disinfection-related labor" | `Athletics Competitive Comparison.pdf` |
| ROI timeline | "ROI Realized in 12-15 Months (depending on staff hours replaced)" | `Athletics Competitive Comparison.pdf` |
| Monthly cost comparison (dollar figures — do not use per brand constraint) | "Genesis 360 Misting System average monthly cost per 5000sf = $500.00 per month compared to Manual Cleaning @ $2000.00++"; "$500/month for the Genesis 360 Misting includes a $300/month cost for the equipment & $200/month for the disinfectant liquid." | `Athletics Competitive Comparison.pdf` |
| Total monthly spend, manual | "Total Monthly Spend (for substandard disinfection): $1,500.00 - $2,500.00." | `Athletics Competitive Comparison.pdf` |
| Lab reduction (viral) | "≥6-log viral reduction" | `Laboratory Validation ... Tarleton State.pdf`, Executive Summary |
| Lab reduction (bacterial) | "≥5-log bacterial reduction" | `Laboratory Validation ... Tarleton State.pdf`, Executive Summary |
| Lab reduction (spores) | "complete eradication of highly resilient spores under controlled dwell conditions" | `Laboratory Validation ... Tarleton State.pdf` |
| C. diff spore result | 24-hour dwell, 6.61 log reduction, "PASS – Complete Kill" | `Laboratory Validation ... Tarleton State.pdf`, Full-Room Misting Study table |
| Canine Parvovirus (surrogate, full-room) | 6-hour dwell, 5.00 log reduction, PASS | same table |
| Viral TCID₅₀ results | Canine Parvovirus 9m30s → 6.25 log; Coxsackievirus B3 9m30s → ≥7.00 log; "consistent viral control between 4.75 and 6.75 logs" over longer intervals | same doc, Viral Inactivation Studies |
| Bacterial/fungal direct + HVAC | Staph aureus 5.28; Pseudomonas 5.59; MRSA 4.96; Trichophyton interdigitale 3.51–5.20 | same doc |
| EPA surface pass criteria | Staph aureus 5.43 (≥5); Pseudomonas 5.02 (≥5); Salmonella enterica 4.26 (≥4); Trichophyton interdigitale 5.15 (≥4) — "All organisms met or exceeded EPA performance thresholds." | same doc |

### Tarleton "at a glance" (Case Study)

Facility: Collegiate Wrestling & Weight Training · Size: 10,000 sq ft · Athletes: 70+ men's & women's wrestlers · Ringworm: 1 case this season · Staph / Impetigo: No new cases · Daily mopping: Eliminated · Mat time lost: None due to infections.

### Quotes and attribution (Case Study — all quotes are unattributed to a named individual in the source; generically presented as athlete/team quotes)

1. "Unheard of in collegiate wrestling." — unattributed
2. "None of us on the team have had any form of mat funk all season." — unattributed
3. "I hadn't had any skin infections since we installed the system here. I went home over break and got ringworm from another mat." — unattributed
4. "Other wrestling rooms smell rotten. Here it smells clean." — unattributed
5. "Because we're not dealing with infections, nobody has to sit out practice. That means everyone gets more mat time." — unattributed
6. "You don't have to worry about what you're laying on or what you might catch." — unattributed
7. "At my previous schools we had to clean the mats constantly. Here we don't even think about it anymore." — unattributed
8. "We stopped daily mopping the mats for sanitizing and let the system do what it does. The difference is obvious the moment you walk in—our room doesn't smell like a wrestling room anymore." — unattributed
9. "The cherry on top when showing recruits the facility." — unattributed (coach/staff, per surrounding sentence "Coaches point to the system as evidence...")

The Lab Validation doc repeats several of the same quotes (#2, #5, #6, #8-topic paraphrased as "We don't even think about cleaning mats anymore" — NOTE: this is a paraphrase/variant, not identical wording — see Contradictions) attributed loosely to "Athletes" / "One athlete."

### Coach's name, spelled per source

- Case study (`Tarleton University CaseStudy.pdf`): **"Head Coach Grant Leath"** (Leath) — the only document that names the coach.
- Lab Validation report: coach is not named at all; only "Tarleton State University Wrestling Program" / "athletes."
- Athletics Competitive Comparison: coach is not named.
- Video filename: `Coach Grant Leeth @ Tarleton State University.MOV` — spelled **"Leeth."**
- Site (`athletics.astro`): does not name the coach at all.

So there is a spelling conflict between the case-study PDF ("Leath") and the video filename ("Leeth"); the site currently sidesteps this by never naming him.

### E-Brochure "Genesis360 Difference" — seven points, verbatim (from `Genesis360 Athletic E-Brochure.pdf`, image p1)

1. **Automated Operation** — "Programmable misting cycles reduce manual effort and support repeatable operation."
2. **Dry-Mist Technology** — "Ultra-fine mist droplets help deliver broad coverage while reducing excess wetness, dripping, and pooling."
3. **360-Degree Coverage** — "Mist moves throughout the environment, helping reach around, under, behind, and across exposed areas."
4. **Odor Control** — "Genesis360 supports a fresher, cleaner, more welcoming environment for athletes, staff, and guests."
5. **Reduced Labor** — "Less manual spraying means less repetitive work, faster workflows, and better use of staff time."
6. **Scalable Deployment** — "The platform can support different spaces, layouts, room sizes, and operational needs."
7. **Workflow Integration** — "Genesis360 fits into daily routines, scheduled processes, and facility-wide operating procedures."

E-Brochure headline (verbatim): "Your Athletes Fight For Wins. We Fight For Your Athletes." Sub-heading: "HIGH-TRAFFIC FITNESS SPACES NEED HIGH-PERFORMANCE DISINFECTION." Body paragraph matches `src/pages/human/athletics.astro` ArgumentBand paragraph verbatim (confirmed against image).

Note the E-Brochure itself already writes the brand as "Genesis360" (one word) throughout — consistent with the brand rule.

### Deployment/package names (out of this audit's document scope)

`src/pages/human/athletics.astro`'s deployment cards (Battery Powered Fogger, EnviroGuard, Compact Pro) are sourced in-file to "Source G" (`Genesis360 Pricing Model - External.docx`) and "Source A" (`Genesis360 AthleticGuard.pdf`) — neither is one of the four documents this audit was scoped to (E-Brochure, Competitive Comparison, Tarleton Case Study, Lab Validation extract), so their factual accuracy is **not verified here**. Flagged under Missing-but-valuable for a follow-up pass.

### Blog posts (site copy, not source documents — checked for consistency against the fact sheet above)

- `are-you-missing-these-3-high-risk-hotspots.html:28`: "**7 to 14 days** of lost training time (minimum)" per infection — this figure does not appear in any of the four Athletics source documents.
- `dont-let-infections-bench-your-team.html:4`: cites an external 2020 journal article (Advances in Clinical and Experimental Medicine) for "skin infections are responsible for **up to 20%** of lost training and competition time in contact sports" and "the incidence among wrestlers alone ranges from **8.5% to 20.9%**." This is a different source than the four client documents and its incidence figures conflict with them — see Contradictions #1.

### FAQs (`src/pages/[...slug].astro`)

The `faqs` array (lines 170–220) is entirely generic Genesis360-platform Q&A (droplet size, automation, customization, maintenance). **No athletics-specific question or answer exists in this array** — nothing to check against the wrestling/athletics source documents.

Fact sheet complete.

## 2. Contradictions

**#1 — Blog wrestler-infection-rate stat contradicts the Athletics page's own sourced figure.**
- File: `src/data/blog-bodies/dont-let-infections-bench-your-team.html:4`
- Site text: "the incidence among wrestlers alone ranges from **8.5% to 20.9%**" (also: "skin infections are responsible for up to **20%** of lost training and competition time in contact sports," citing an external 2020 journal article)
- Document text: `Athletics Competitive Comparison.pdf`, "Wrestling Infection Statistics": "**Approximately 60% to 100%** of wrestlers experience at least one skin infection during a typical season" — the same figure the rest of the site uses verbatim (`src/data/human-markets.ts:65`, `src/pages/human/athletics.astro:154`).
- These are the same metric (season incidence rate among wrestlers) reported at wildly different magnitudes on the same site. Correct replacement: either drop the external citation's incidence figure and use the client-documented "60% to 100%" range for consistency, or clearly attribute the 8.5–20.9% figure to the named external study and keep it separate from (not blended with) the client's own "60–100%" claim so the two are not read as the same number restated.

**#2 — Coach's name spelled two different ways across the client's own materials.**
- Files: `Tarleton University CaseStudy.pdf` ("Head Coach **Grant Leath**") vs. `reference-files/video/Coach Grant Leeth @ Tarleton State University.MOV` (filename spells it "**Leeth**")
- Neither the Lab Validation report nor the Competitive Comparison names the coach at all. The site itself never names him, so there is no site-vs-document error today — but this is a live landmine for whoever adds the video or names the coach next.

**#3 — "Kinetic Systems" alt text contradicts the "Genesis360" branding used everywhere else on the site.**
- File: `src/pages/[...slug].astro:59-60`
- Site text: `alt: 'Kinetic Systems Medical Dry Fog'` and `alt: 'Kinetic Systems Portable Dry Fog'`
- Every other entry in the same `systems` array (lines 55–61) uses `'Genesis360 ...'` for its alt text ("Genesis360 InRoom Dry Fog," "Genesis360 HVAC Dry Fog system image," "Genesis360 Compact dry fog unit," "Genesis360 Mobile Dry Fog," "Genesis360 Grey AgriGuard"). "Kinetic Systems" does not appear in any of the four Athletics source documents, the E-Brochure, or anywhere else in `src/`. This reads as a leftover/copy-paste brand name and should be "Genesis360" to match the rest of the array and the brand rule in this repo's `CLAUDE.md`.

**#4 — Minor: headline drops the source's hedge ("reported").**
- File: `src/pages/human/athletics.astro:151` ("Skin Infections Are The #1 Cause Of Lost Time In Wrestling.") and the page `description` at line 107 ("Skin infections are the number one cause of lost time in wrestling.")
- Document text: `Athletics Competitive Comparison.pdf`: "Skin infections are the **#1 reported** cause of time loss in wrestling."
- Low severity — a stylized headline, not a quoted claim — but it converts a hedged, survey-based claim into an unqualified assertion. Consider keeping "reported" in the meta description (not user-facing) if this copy is ever tightened for a compliance review.

## 3. Missing but valuable

1. **Resolve the coach's name spelling before it ever reaches the site.** Case study PDF: "Grant Leath." Video filename: "Grant Leeth." Confirm the correct spelling with the client before naming him in copy, captioning the video, or using it as testimonial b-roll — right now the two client-supplied assets disagree with each other.
2. **The coach video is unused and technically rough for a marketing placement.** `Coach Grant Leeth @ Tarleton State University.MOV` is 2:16 of portrait phone footage at 320x568 — very low resolution and the wrong aspect ratio for a landscape site hero or case-study band. It would need a proper re-shoot or at minimum a vertical-clip treatment (e.g., a small embedded portrait player) rather than being dropped into a widescreen slot.
3. **Four of the E-Brochure's seven "Difference" points are unused on the flagship Athletics page.** `athletics.astro` and the Human hub's `DifferenceGrid` only reuse "Automated Operation," "Dry-Mist Technology," and "360-Degree Coverage." "Odor Control" is the one most directly evidenced by the Tarleton case study's own quotes ("Other wrestling rooms smell rotten. Here it smells clean.") and the Lab Validation report's dedicated odor-control section, yet it's not called out as its own point on the athletics page. "Reduced Labor," "Scalable Deployment," and "Workflow Integration" are also unused there.
4. **Stronger lab results are available but not used on the athletics page.** The Lab Validation report's most striking figures — C. diff spore "PASS – Complete Kill" at 6.61 log reduction (24 hr dwell) and Coxsackievirus B3 at ≥7.00 log reduction — are more concrete and higher-impact than the generic "five log or better / six log or better" line currently used in `CaseStudyBand`'s `source` prop.
5. **Named pathogens aren't used on the Athletics page even though the source documents name them for exactly this context.** The Lab Validation report explicitly ties Trichophyton (ringworm), MRSA/Staph aureus, and HSV-1 ("Herpes Gladiatorum, commonly referred to as Mat Herpes") to wrestling. The Athletics page currently stays generic ("bacteria, fungus, viruses") while `healthcare.astro` gets the named-pathogen treatment instead.
6. **A labor/ROI claim exists that could be used without violating the no-price rule.** "Up to 90% reduction in disinfection-related labor" (`Athletics Competitive Comparison.pdf`) is a qualitative-enough claim to use on the "Reduced Labor" E-Brochure point without introducing a dollar figure — currently unused anywhere on the site.
7. **Deployment package names (EnviroGuard, Compact Pro, Battery Powered Fogger) are sourced to documents outside this audit's scope** (`Genesis360 Pricing Model - External.docx`, `Genesis360 AthleticGuard.pdf`) and were not verified here — worth a follow-up pass against those two documents specifically.

## 4. Compliance flags

- **"Kinetic Systems" wrong-brand alt text** — `src/pages/[...slug].astro:59-60`. Not found in any source document; contradicts "Genesis360" used everywhere else on the site. See Contradiction #3.
- **Unsupported claims not traceable to any of the four source documents:**
  - `src/data/blog-bodies/are-you-missing-these-3-high-risk-hotspots.html:28` — "7 to 14 days of lost training time (minimum)."
  - `src/data/blog-bodies/dont-let-infections-bench-your-team.html:4` — "up to 20% of lost training and competition time," "8.5% to 20.9%" incidence (sourced to a third-party journal article, not the client documents, and conflicts with the client's own 60–100% figure — see Contradiction #1).
- **Dollar figures**: none found in the audited athletics site copy (`athletics.astro`, `human-markets.ts`, the two athletics blog bodies, `human/index.astro`). The source `Athletics Competitive Comparison.pdf` is full of them ($600–$900/mo, $1,500–$2,500/mo, $500/mo, "$300/month," "$200/month," "$2000.00++") and a code comment in `athletics.astro:147-148` confirms they were deliberately excluded. Compliant — no action needed, flagged only to confirm the constraint is already being honored.
- **"Genesis 360" with a space**: none found anywhere in `src/` (verified by repo-wide grep). Compliant. Note the source documents themselves are inconsistent — the Lab Validation report and Competitive Comparison both write "Genesis 360" (with a space) throughout, while the Tarleton Case Study and E-Brochure write "Genesis360" (one word) — but the site correctly normalizes to "Genesis360" everywhere.
- **Adjacent issue found outside this audit's scope, flagged for the parallel BotaniMax audit**: `src/pages/[...slug].astro:77` lists a product feature "EPA 2(c) Registered." Per `.superpowers/audits/botanimax.md`, BotaniMax's actual documentation shows a full FIFRA Section 3 EPA Reg. No. (92089-2-103661), not a "2(c)" category, and the client's own marketing materials are already inconsistent on 25(b) vs 25(c) framing. "2(c)" doesn't match any registration category in either audit's source documents and looks like a typo. Not counted in this audit's contradiction total since it isn't sourced from any of the four Athletics documents, but worth fixing.

## 5. Prioritized fix list

1. **File**: `src/pages/[...slug].astro:59`
   **Old**: `{ name: 'Medical Dry Fog', image: medical, alt: 'Kinetic Systems Medical Dry Fog' },`
   **New**: `{ name: 'Medical Dry Fog', image: medical, alt: 'Genesis360 Medical Dry Fog' },`
   **Source**: brand consistency — every other entry in the same `systems` array (lines 55–61) already uses "Genesis360"; "Kinetic Systems" appears in none of the four Athletics source documents.

2. **File**: `src/pages/[...slug].astro:60`
   **Old**: `{ name: 'Portable Dry Fog', image: portable, alt: 'Kinetic Systems Portable Dry Fog' },`
   **New**: `{ name: 'Portable Dry Fog', image: portable, alt: 'Genesis360 Portable Dry Fog' },`
   **Source**: same as #1.

3. **File**: `src/data/blog-bodies/dont-let-infections-bench-your-team.html:4`
   **Old**: `In the U.S., the incidence among wrestlers alone ranges from 8.5% to 20.9%.`
   **New**: `In the U.S., 60% to 100% of wrestlers experience at least one skin infection during a typical season, depending on facility hygiene.`
   **Source**: `Athletics Competitive Comparison.pdf`, "Wrestling Infection Statistics" — brings this post in line with the figure already used site-wide (`src/data/human-markets.ts:65`, `src/pages/human/athletics.astro:154`) instead of contradicting it with a different-magnitude number on the same metric. (The surrounding "up to 20% of lost training and competition time" sentence is a different metric from a named external study and can stay, but should not be read as restating the same number.)

4. **Before adding the coach video or naming the coach anywhere on the site**: confirm the correct spelling with Secure Logic — the case study PDF says "Grant Leath," the video file is named "Grant Leeth." Do not publish either spelling until confirmed.
   **Source**: `Tarleton University CaseStudy.pdf` vs. `reference-files/video/Coach Grant Leeth @ Tarleton State University.MOV`.

All four fixes are factual/brand corrections only; no pricing language is introduced or removed, and the brand string used throughout is `Genesis360` (one word), per the constraint.
