# Technology & HVAC Copy Audit

Audit of Astro site copy against Genesis360 technology, HVAC, AthleticGuard (Compact Wall Mount) brochures and the Tarleton State lab/field report.

Status: COMPLETE.

## 1. Fact sheet

Sources: `reference-files/brochures/Technology Explainer.pdf` (p1–p2), `reference-files/brochures/Genesis360 HVAC.pdf` (p1–p2), `reference-files/brochures/Genesis360 AthleticGuard.pdf` (Compact Wall Mount sheet, p1), `reference-files/case-studies/Laboratory Validation and Field Performance ... Tarleton State.pdf`.

**Droplet size / comparison table** (Technology Explainer p1):
| Technology | Typical Droplet Size | Air Behavior |
|---|---|---|
| Pump Sprayers | 80–300 µm | Falls immediately |
| ULV Foggers | 20–50 µm | Falls within seconds |
| Electrostatic Sprayers | 40–80 µm | Rapid surface deposition |
| Genesis360 | Sub-10 µm | Suspended aerosol behavior |

Genesis360 droplets are "smaller than 10 microns" / "sub-10 micron." No numeric lower bound given (not "1–10 microns" — just "sub-10").

**Suspension time**: "These droplets suspend in the air for up to 8 hours in field studies." (Technology Explainer p1, under "Why Suspension Improves Coverage.")

**Physics claims** (Technology Explainer p1–p2):
- Droplets move via "air turbulence, thermal currents, Brownian motion, and electrostatic forces" once below ~10 microns, rather than dropping via gravity.
- "Stokes' Law explains that very small particles settle much more slowly because air resistance becomes dominant as the diameter decreases."
- Static/dust: "Static Electricity Suppression and Dust Capture" — ultra-fine microdroplets act as charge dissipators, neutralize electrostatic charge on particles, causing dust/aerosols to aggregate with droplets and settle.
- "Why Surface Area Matters": breaking liquid into billions of microdroplets increases total surface area and probability of microbial contact.
- Historical basis: Dr. Theodore Puck's 1940s propylene glycol vapor studies at University of Chicago (airborne bacteria reduction) cited as scientific foundation — not a Genesis360-specific study.

**"Dry to human touch" wording**: Exact section title is "Dry to Human Touch, Wet to Pathogens" (Technology Explainer p2). Text: droplets "do not accumulate enough moisture to feel wet to the human touch when settling on skin, equipment, or surfaces" while "remain[ing] fully liquid at the microscopic level"; microorganisms are typically 0.5–5 microns, so sub-10-micron droplets are "still large relative to microbes." HVAC sheet separately calls it "dry-droplet misting technology" / "Dry droplet distribution — moves through the HVAC system without surfaces."

**Lab figures** (Tarleton State lab/field report):
- Lab: **Element Materials Technology** (independent lab; report also says "and other validation studies").
- Headline claims: "≥6-log viral reduction," "≥5-log bacterial reduction," "complete eradication of highly resilient spores under controlled dwell conditions."
- Full-Room Misting Study (60-min misting cycle, dried carrier, heavy organic soil): Canine Parvovirus, 6-hour dwell, 5.00 log reduction, PASS; C. difficile spores, 24-hour dwell, 6.61 log reduction, PASS – Complete Kill.
- Viral Inactivation (TCID50 dried carrier): Canine Parvovirus 9m30s exposure, 6.25 log; Coxsackievirus B3 9m30s exposure, ≥7.00 log; sustained exposure over longer intervals gave 4.75–6.75 logs.
- Bacterial/Fungal (direct spray + HVAC delivery): S. aureus 30s–3min, 5.28 log; P. aeruginosa 30s–3min, 5.59 log; MRSA 9m30s–2hrs, 4.96 log; Trichophyton interdigitale 9m30s–2hrs, 3.51–5.20 log.
- Surface Disinfection (carrier-based, EPA pass criteria): S. aureus 5.43 (≥5 EPA), P. aeruginosa 5.02 (≥5), Salmonella enterica 4.26 (≥4), T. interdigitale 5.15 (≥4). "All organisms met or exceeded EPA performance thresholds."
- Field case study organism: Tarleton State University Wrestling — reported outcomes are athlete quotes (no mat-related skin infection outbreaks, no missed practice, odor elimination), explicitly a **field/anecdotal** case study, not a second lab study.
- Disinfectant used throughout is **BotaniMax™**, "EPA 25(c) Registered Broad-Spectrum Botanical Disinfectant with Tier 3 Emerging Viral Pathogen Claim," 100% botanical all-plant-oil-based (no chemicals).
- Exact platform name used in this document: "Genesis 360™" (with a space, in this one legacy PDF — the brand rule for site copy is still one word, `Genesis360`, per project instructions).

**Compact Wall Mount specs** (AthleticGuard/Compact Wall Mount sheet):
- Product name on sheet: "Genesis360™ Compact" / "Genesis360 Compact Wall Mount," subheading "For Room Misting."
- Tank: one-gallon tank.
- Runtime: ~85 minutes misting time single-nozzle; ~42 minutes with dual-nozzle setup (depends on settings/liquid/conditions).
- Cycle time: full treatment cycle "in under 10 minutes" in most applications (depends on room size, nozzle config, liquid output, facility protocol).
- Mounting: wall-mounted, tabletop, or portable via integrated carry handle; movable between rooms with additional brackets.
- Smart board: optional upgrade — "an internal smart control board that replaces the standard timer for phone or desktop control." Also optional dual nozzles for higher output/faster cycles.
- No dollar figures or warranty terms appear on this sheet.

**HVAC sheet claims** (Genesis360 HVAC p1–p2):
- Install point: inside the HVAC mechanical area — evaporator coil, drain pan, and "downstream duct pathway" — ideally after the evaporator coil has been manually cleaned.
- What it treats: targets biofilm, bacteria, mold, mildew, dust, and odor-causing buildup in the coil/drain-pan area and downstream ductwork; does not claim to disinfect the whole home, only "supports cleaner HVAC pathways."
- Mechanism: "advanced dry-droplet misting technology," automated treatment cycle "programmed to run on a schedule of your choosing," "dry droplet distribution — moves through the HVAC system without surfaces."
- Maintenance: "Ongoing annual maintenance — Suggested twice a year observation of Genesis360™, effectively running, and to refill the liquid tank."
- Disclaimer printed on sheet: "Results depend on application methods, the condition of the system, maintenance practice, and professional installation." No log-reduction or percentage figures on the HVAC sheet itself — those only appear in the lab report.
- No warranty language on any of the four source documents.

**Exact product names supported by documents**: Genesis360 (brand, one word, ™), Genesis360 Compact / Genesis360 Compact Wall Mount, Genesis360 for HVAC, BotaniMax™ (disinfectant). No mention anywhere in these four documents of AeroGuard, Compact Pro, Battery Powered Fogger, AgriGuard, EnviroGuard, MediGuard Pro, GrowGuard Pro, Rolling Stand, or "PLC Smart Board/App" by that exact name — the closest documented feature is the undifferentiated "internal smart control board."

## 2. Contradictions

Progress note: covers `src/pages/[...slug].astro`, `src/data/hvac-markets.ts`, `src/pages/hvac/[slug].astro`, `src/pages/index.astro`, `src/pages/home-full.astro` so far.

1. **`src/pages/[...slug].astro:77`** — Site: `'EPA 2(c) Registered'` (in the `features` array on the `botanimax` page). Document: Tarleton lab report calls BotaniMax "EPA 25(c) Registered Broad-Spectrum Botanical Disinfectant." The site's own blog body (`src/data/blog-bodies/synthetic-thymol-vs-botanical-thyme-whats-really-in-your-natural-cleaning-product.html:30`) correctly says "EPA 25(c) certified." `EPA 2(c)` is not a real registration category — it's a dropped digit. Replace with `EPA 25(c) Registered`.
2. **`src/pages/index.astro:81`** and **`src/pages/home-full.astro:46`** — Same error, in `trustStats`: `{ label: 'EPA 2(c)', copy: 'Registered botanical disinfectant formula', ... }`. Same fix: `EPA 25(c)`.
3. **`src/pages/[...slug].astro:176-177`** (FAQ answer) and **`src/pages/[...slug].astro:129`** (Physics-Based Precision paragraph) — Site: "Traditional foggers and pump sprayers produce larger wet droplets (30–120 microns)" / "conventional foggers or sprayers that produce 30–120 µm droplets." Document (Technology Explainer p1 comparison table): Pump Sprayers are 80–300 µm, ULV Foggers 20–50 µm, Electrostatic Sprayers 40–80 µm — none of the three documented technologies is "30–120 µm," and the true range across all three is 20–300 µm, not 30–120. Replace with the documented, technology-specific figures (or the accurate combined range 20–300 µm) rather than an invented single band.
4. **`src/pages/[...slug].astro:157`** — Site (Sub-10 Micron Dynamics, "Extended Suspension"): "Smaller droplets remain airborne 10–20× longer, maximizing contact time." Document: Technology Explainer only states droplets "suspend in the air for up to 8 hours in field studies" and generally "far longer than conventional spray droplets" — it gives no "10–20×" multiplier anywhere. This is a fabricated precision figure; see also Compliance flags.
5. **`src/pages/[...slug].astro:160`** — Site ("Surface Adhesion"): "Droplets form at a low contact angle (≈ 4–12%)." No document supports this figure, and a contact angle is not properly expressed as a percentage (it's measured in degrees). Unsupported/incoherent claim.
6. **`src/pages/[...slug].astro:137`** — Site: "Each precision nozzle atomizes fluid at roughly ⅓ oz per minute." Not supported by any of the four source documents (only the Compact Wall Mount sheet gives flow-adjacent figures: one-gallon tank lasting ~85 min single-nozzle / ~42 min dual-nozzle, which implies a different per-nozzle rate; see Fact sheet). Recommend citing the tank/runtime figures actually in the Compact Wall Mount sheet instead of an unsupported per-nozzle oz/min number.
7. **`src/pages/[...slug].astro:217-218`** — Site FAQ: "Most systems require low monthly maintenance, such as inspecting filters, verifying nozzle performance, and checking fluid levels." Document (Genesis360 HVAC sheet p2, "Ongoing annual maintenance"): "Suggested twice a year observation of Genesis360™, effectively running, and to refill the liquid tank." The HVAC unit's documented cadence is semi-annual, not monthly. If this FAQ is meant to cover the HVAC unit, "monthly" contradicts the brochure; at minimum it should not state a cadence more frequent than what the HVAC sheet documents.
8. **`src/pages/[...slug].astro:150`** — Site ("Automated Intelligence"): "An industrial-grade PLC controller regulates dry fog duration, interval, and density" described as a standard, universal platform feature. Document (Compact Wall Mount sheet): the smart control board is explicitly an *optional upgrade* that "replaces the standard timer" — the base unit ships with a standard timer, not a PLC controller. Site overstates it as a baseline feature rather than an upgrade.

## Outdated naming detail moves to Section 3 below (naming is not double-counted here except where the name itself is also a factual/technology claim, as in #3 above).

## 3. Outdated or retired naming

Ground truth for renames: the site itself already uses the correct current names consistently in `src/pages/index.astro`, `src/pages/home-full.astro`, `src/pages/human/*.astro`, and `src/pages/ag/hogs-livestock.astro` (e.g. `Compact Wall Mount`, `AeroGuard`, `EnviroGuard`, `MediGuard Pro`, `Compact Pro`, `Battery Powered Fogger`, `Rolling Stand`, `PLC Smart Board/App`). The retired names below are stragglers in older files that were not updated when the rest of the site was renamed.

| Retired name | Occurrences (file:line) | Current name to use |
|---|---|---|
| `InRoom Dry Fog` | `src/pages/[...slug].astro:55` (also `src/data/blog-bodies/how-to-stop-infections-before-they-spread-at-sea.html:34`, outside the required review list but same issue) | `Genesis360 Compact Wall Mount` — this is the room-misting product documented in the AthleticGuard/Compact Wall Mount sheet; no separate "InRoom" product exists in current docs or elsewhere on the site. |
| `Compact Dry Fog` | `src/pages/[...slug].astro:57` | `Genesis360 Compact Wall Mount` (matches `index.astro`/`home-full.astro` systems lineup and the product sheet). |
| `Mobile Dry Fog` | `src/pages/[...slug].astro:58` (also blog-bodies/how-to-stop-infections-before-they-spread-at-sea.html:30) | `Battery Powered Fogger` — matches the "portable spot-treatment" device used consistently in `src/pages/human/athletics.astro:43`, `src/pages/ag/hogs-livestock.astro:67`, `src/pages/human/schools.astro:46`, `src/pages/human/military.astro:31`, `src/pages/human/healthcare.astro:45`. |
| `Medical Dry Fog` (alt text also says `Kinetic Systems Medical Dry Fog`) | `src/pages/[...slug].astro:59` (also blog-bodies/how-to-stop-infections-before-they-spread-at-sea.html:26) | `MediGuard Pro` — matches `src/pages/human/healthcare.astro:33-36`, which documents MediGuard Pro as the Compact Pro configured for clinical spaces. |
| `Portable Dry Fog` (alt text also says `Kinetic Systems Portable Dry Fog`) | `src/pages/[...slug].astro:60` | `Battery Powered Fogger` (or `Rolling Stand` if the intent is a wheeled/moved Compact unit rather than the handheld battery unit — recommend confirming with the client which physical product this image/name was meant to represent). |
| `Kinetic Systems` | `src/pages/[...slug].astro:59-60` (alt text on Medical/Portable images) | Remove — this is not the company name anywhere else in the codebase or documents. The company is `Secure Logic`; the product brand is `Genesis360`. Replace with `Genesis360`. |
| `360HVAC` / `360HVAC Dry Fog` | `src/pages/[...slug].astro:270`; `src/data/hvac-markets.ts:23, 33, 43` (3 occurrences, all in `heroCopy` strings for Residential/Commercial/Industrial) | `AeroGuard` (or "Genesis360 AeroGuard") — matches the HVAC-integrated product already named consistently in `src/pages/index.astro:94` and `src/pages/home-full.astro:57`, and aligns with the Genesis360 HVAC brochure's install point (evaporator coil, drain pan, downstream duct pathway). |
| `AggreGuard` | No occurrences found in `src/` (grepped case-insensitively for `aggreguard`). Not an issue on this site currently. | n/a |

Note: `AgriGuard` (correct spelling, used at `src/pages/[...slug].astro:61`) is fine as-is and is not a naming defect.

## 4. Missing but valuable

1. **Droplet comparison table** (Pump Sprayers 80–300 µm / ULV Foggers 20–50 µm / Electrostatic Sprayers 40–80 µm / Genesis360 sub-10 µm) — a concrete, document-sourced differentiator that isn't used anywhere on the site. Currently the site substitutes a vaguer, inaccurate "30–120 micron" catch-all for competitors (see fix list). This table would strengthen `about-us/technology` and `genesis360mistingsystems`.
2. **Compact Wall Mount concrete specs** — one-gallon tank, ~85 min runtime single-nozzle / ~42 min dual-nozzle, full treatment cycle under 10 minutes, wall/tabletop/portable mounting. None of this appears anywhere in `src/pages` or `src/data`, despite being exactly the kind of concrete spec a facilities buyer looks for.
3. **Tarleton/Element Materials Technology lab figures** — ≥6-log viral reduction, ≥5-log bacterial reduction, C. difficile spore complete kill at 24-hour dwell, and the EPA pass-criteria table. The site currently only makes generic claims ("controls harmful bacteria, viruses, and fungi"); the real logged numbers would substantiate those claims with a named independent lab.
4. **HVAC maintenance cadence and install point** — the documented "twice a year observation... and refill the liquid tank" cadence and the evaporator-coil/drain-pan/downstream-duct install point aren't stated anywhere in `hvac-markets.ts` or the `hvac` branch of `[...slug].astro`. Adding it sets correct buyer expectations and matches the brochure's own disclaimer language.
5. **"Dry to Human Touch, Wet to Pathogens" mechanism** — the explanation that droplets are sub-10 microns while microbes are 0.5–5 microns (so droplets are "still large relative to microbes") is a strong, document-sourced explainer currently reduced to a one-line paraphrase ("Dry to the touch, wet to a microbe" in `src/pages/human/index.astro:50`). Worth a fuller callout on the rebuilt technology page.
6. **Cross-sell opportunity**: `src/data/blog-bodies/how-to-extend-the-lifespan-of-your-hvac-system.html` is a generic HVAC-maintenance article that never mentions Genesis360 or AeroGuard, despite being exactly on-topic for the HVAC product line — a missed internal link/CTA.

## 5. Compliance flags

- **`src/pages/[...slug].astro:157`** — "Smaller droplets remain airborne 10–20× longer" — fabricated multiplier; no document gives a "10–20×" figure (the only supported duration claim is "up to 8 hours in field studies").
- **`src/pages/[...slug].astro:160`** — "Droplets form at a low contact angle (≈ 4–12%)" — fabricated figure, and contact angle is conventionally measured in degrees, not percent; not supported by any source document.
- **`src/pages/[...slug].astro:137`** — "roughly ⅓ oz per minute" nozzle flow rate — no document supports this precise figure.
- **`src/pages/[...slug].astro:129` and `:176-177`** — "30–120 microns" attributed generally to "conventional foggers or sprayers" / "traditional foggers and pump sprayers" — the documented range across the three named competing technologies is actually 20–300 µm, and each technology has its own documented figure; the blended "30–120" number appears nowhere in the source documents.
- **`src/pages/[...slug].astro:77`, `src/pages/index.astro:81`, `src/pages/home-full.astro:46`** — "EPA 2(c) Registered" — not a real EPA registration category; the documents and the site's own blog body consistently say "EPA 25(c)." A wrong regulatory citation is a compliance risk, not just a typo.
- **`src/pages/[...slug].astro:217-218`** — "Most systems require low monthly maintenance" — contradicts the HVAC brochure's documented twice-yearly cadence; overstating attentiveness (i.e., understating how infrequently it can be serviced) either way is a claim without documentary support.
- **`src/pages/[...slug].astro:150`** — "An industrial-grade PLC controller regulates dry fog duration, interval, and density" stated as a baseline feature — the source brochure frames the smart control board as an optional upgrade over a standard timer. Describing an upgrade as standard is a specification-accuracy issue.
- **Dollar figures**: `src/pages/ag/index.astro:42` ("$1.2 billion a year" PRRS cost) and `:51` ("$1.4 billion" HPAI cost) are third-party industry statistics, not Genesis360 pricing or ROI claims, and are outside the four technology/HVAC/lab source documents reviewed for this audit — no source document was available to verify or refute these two figures; flagging only for awareness, not as a contradiction.
- **No unsupported "kills X%" or bare-percentage efficacy claims** were found tied to Genesis360 on any of the required pages — the site generally uses "controls"/"reduces" language rather than percentage kill claims, which is good practice given the actual data is expressed in log reductions, not percentages.
- **No instances of the literal string "Genesis 360" (with a space)** were found in `src/` outside of the one legacy source PDF's own filename — confirmed via repo-wide grep. No fix needed; noted as a clean pass against the constraint.
- **No warranty language** appears anywhere in `src/`, consistent with the fact that none of the four source documents make any warranty claims either. No fix needed.

## 6. Prioritized fix list

## 5. Compliance flags

(pending)

## 6. Prioritized fix list

These are pages/data NOT slated for the HVAC/technology rebuild, so they should be fixed now. All replacement text avoids the literal string "Genesis 360" and uses the one-word `Genesis360` brand form, and introduces no prices.

1. **`src/pages/[...slug].astro:77`** (botanimax page `features` array)
   Old: `'EPA 2(c) Registered',`
   New: `'EPA 25(c) Registered',`
   Source: Tarleton lab report — "EPA 25(c) Registered Broad-Spectrum Botanical Disinfectant."

2. **`src/pages/index.astro:81`** (homepage `trustStats`)
   Old: `{ label: 'EPA 2(c)', copy: 'Registered botanical disinfectant formula', icon: 'shield' },`
   New: `{ label: 'EPA 25(c)', copy: 'Registered botanical disinfectant formula', icon: 'shield' },`
   Source: same as #1.

3. **`src/pages/home-full.astro:46`** (mirrors #2)
   Old: `{ label: 'EPA 2(c)', copy: 'Registered botanical disinfectant formula', icon: 'shield' },`
   New: `{ label: 'EPA 25(c)', copy: 'Registered botanical disinfectant formula', icon: 'shield' },`
   Source: same as #1.

4. **`src/pages/[...slug].astro:55`** (`genesis360mistingsystems` page `systems` lineup)
   Old: `{ name: 'InRoom Dry Fog', image: inroom, alt: 'Genesis360 InRoom Dry Fog' },`
   New: `{ name: 'Compact Wall Mount', image: inroom, alt: 'Genesis360 Compact Wall Mount' },`
   Source: AthleticGuard/Compact Wall Mount brochure. Caveat: this creates two "Compact Wall Mount" cards once #5 is also applied (the `inroom` and `compact` images may depict the same physical unit). Recommend the team confirm whether these are duplicate assets to merge into one card, or two genuinely distinct configurations that need distinct names before publishing.

5. **`src/pages/[...slug].astro:57`**
   Old: `{ name: 'Compact Dry Fog', image: compact, alt: 'Genesis360 Compact dry fog unit' },`
   New: `{ name: 'Compact Wall Mount', image: compact, alt: 'Genesis360 Compact Wall Mount' },`
   Source: same as #4; matches the naming already used in `index.astro:89` and `home-full.astro:52`.

6. **`src/pages/[...slug].astro:58`**
   Old: `{ name: 'Mobile Dry Fog', image: mobile, alt: 'Genesis360 Mobile Dry Fog' },`
   New: `{ name: 'Battery Powered Fogger', image: mobile, alt: 'Genesis360 Battery Powered Fogger' },`
   Source: naming already established in `src/pages/human/athletics.astro:43`, `src/pages/ag/hogs-livestock.astro:67`, `src/pages/human/schools.astro:46`, `src/pages/human/military.astro:31`, `src/pages/human/healthcare.astro:45`.

7. **`src/pages/[...slug].astro:59`**
   Old: `{ name: 'Medical Dry Fog', image: medical, alt: 'Kinetic Systems Medical Dry Fog' },`
   New: `{ name: 'MediGuard Pro', image: medical, alt: 'Genesis360 MediGuard Pro' },`
   Source: naming already established in `src/pages/human/healthcare.astro:33-36`. Also removes the incorrect "Kinetic Systems" company reference (not the company anywhere else in the codebase or documents — the company is Secure Logic, the brand is Genesis360).

8. **`src/pages/[...slug].astro:60`**
   Old: `{ name: 'Portable Dry Fog', image: portable, alt: 'Kinetic Systems Portable Dry Fog' },`
   New: `{ name: 'Battery Powered Fogger', image: portable, alt: 'Genesis360 Battery Powered Fogger' },`
   Source: same naming source as #6. Caveat: this duplicates the "Battery Powered Fogger" name from #6 with a different image (`mobile` vs `portable`) — recommend confirming with the client whether `portable` is actually meant to depict the `Rolling Stand` accessory instead, and using that name if so, to avoid two identically-named cards in the lineup grid.

9. **`src/pages/[...slug].astro:176-177`** (`resources/faqs` page)
   Old: `answer: 'Traditional foggers and pump sprayers produce larger wet droplets (30–120 microns) that fall quickly and leave gaps. Genesis360 droplets remain suspended long enough to fill the room or duct volume, wrap around objects, and reach hidden zones — without relying on a person to aim the sprayer.',`
   New: `answer: 'Traditional pump sprayers produce 80–300 micron droplets that fall immediately, ULV foggers produce 20–50 micron droplets that fall within seconds, and electrostatic sprayers produce 40–80 micron droplets with rapid surface deposition. Genesis360 droplets are sub-10 microns and remain suspended long enough to fill the room or duct volume, wrap around objects, and reach hidden zones — without relying on a person to aim the sprayer.',`
   Source: Technology Explainer brochure comparison table.

10. **`src/pages/[...slug].astro:217-218`** (`resources/faqs` page)
    Old: `answer: 'Most systems require low monthly maintenance, such as inspecting filters, verifying nozzle performance, and checking fluid levels.',`
    New: `answer: 'Most systems require low maintenance. The HVAC platform's documented schedule is a twice-yearly check to confirm the unit is running correctly and refill the liquid tank; other deployments should follow the maintenance schedule in their product documentation.',`
    Source: Genesis360 HVAC brochure — "Ongoing annual maintenance — Suggested twice a year observation of Genesis360™, effectively running, and to refill the liquid tank."

11. **`src/data/blog-bodies/how-to-stop-infections-before-they-spread-at-sea.html:26,30,34`** (bonus find outside the required blog list, same defect class as #6–#8)
    Old: `<p>Medical Dry Fog</p>` / `<p>Mobile Dry Fog</p>` / `<p>InRoom Dry Fog</p>`
    New: `<p>MediGuard Pro</p>` / `<p>Battery Powered Fogger</p>` / `<p>Compact Wall Mount</p>`
    Source: same naming ground truth as #4–#8.

### Rebuild-scope items (HVAC and technology pages will be rebuilt later)

These live in the `hvac` and `about-us/technology` branches of `src/pages/[...slug].astro`, plus `src/data/hvac-markets.ts` (feeds both the `/hvac/` hub and `/hvac/[slug]/` pages) — flagged for the rebuild rather than fixed in place now.

R1. **`src/pages/[...slug].astro:270`** (`hvac` branch hero copy)
   Old: `copy="360HVAC Dry Fog infuses air-handling systems with ultra-fine BotaniMax dry fog, keeping coils, ducts, and vents clear of the biofilm that spreads facility-wide."`
   New: `copy="Genesis360 AeroGuard infuses air-handling systems with ultra-fine BotaniMax dry fog, treating the evaporator coil, drain pan, and downstream duct pathway to keep coils, ducts, and vents clear of the biofilm that spreads facility-wide."`
   Source: Genesis360 HVAC brochure; `AeroGuard` naming already established in `index.astro:94` / `home-full.astro:57`.

R2. **`src/data/hvac-markets.ts:23`** (Residential heroCopy)
   Old: `'Your HVAC system is one of the largest investments in your home. 360HVAC Dry Fog treats coils and ductwork with botanical disinfectant, helping extend equipment life and keep everyday indoor air cleaner.'`
   New: `'Your HVAC system is one of the largest investments in your home. Genesis360 AeroGuard treats coils and ductwork with botanical disinfectant, helping extend equipment life and keep everyday indoor air cleaner.'`
   Source: same as R1.

R3. **`src/data/hvac-markets.ts:33`** (Commercial heroCopy)
   Old: `'Biofilm hidden inside coils, drain pans, and ductwork can quietly cut energy efficiency and air quality across an entire building. 360HVAC Dry Fog runs scheduled, automated cycles for air handlers serving offices, schools, and other shared buildings.'`
   New: `'Biofilm hidden inside coils, drain pans, and ductwork can quietly cut energy efficiency and air quality across an entire building. Genesis360 AeroGuard runs scheduled, automated cycles for air handlers serving offices, schools, and other shared buildings.'`
   Source: same as R1.

R4. **`src/data/hvac-markets.ts:43`** (Industrial heroCopy)
   Old: `'Warehouses, manufacturing plants, and cold storage facilities run air handling systems around the clock, giving biofilm and airborne contaminants constant conditions to build up in. 360HVAC Dry Fog scales to large-volume air systems with the same automated, programmable coverage as our other platforms.'`
   New: `'Warehouses, manufacturing plants, and cold storage facilities run air handling systems around the clock, giving biofilm and airborne contaminants constant conditions to build up in. Genesis360 AeroGuard scales to large-volume air systems with the same automated, programmable coverage as our other platforms.'`
   Source: same as R1.

R5. **`src/pages/[...slug].astro:129`** (`about-us/technology`, Physics-Based Precision)
   Old: `'Unlike conventional foggers or sprayers that produce 30–120 µm droplets which fall rapidly and leave gaps, Genesis360™ micro-droplets remain suspended long enough to reach hidden zones, under equipment, and behind obstacles — achieving true volumetric saturation.'`
   New: `'Unlike pump sprayers (80–300 µm, falls immediately), ULV foggers (20–50 µm, falls within seconds), or electrostatic sprayers (40–80 µm, rapid surface deposition), Genesis360™ micro-droplets are sub-10 µm and remain suspended long enough to reach hidden zones, under equipment, and behind obstacles — achieving true volumetric saturation.'`
   Source: Technology Explainer comparison table.

R6. **`src/pages/[...slug].astro:137`** (`about-us/technology`, Intelligent Nozzle Architecture)
   Old: `'Each precision nozzle atomizes fluid at roughly ⅓ oz per minute, maintaining consistent particle size distribution and eliminating over-application. The result is a dry fog that is perfectly even — dry to the touch, residue-free, and safe for electronics, optics, and sensitive surfaces.'`
   New: `'Each precision nozzle delivers a consistent, low flow rate — enough that a one-gallon tank runs roughly 85 minutes on a single nozzle or 42 minutes with dual nozzles — maintaining consistent particle size distribution and eliminating over-application. The result is a dry fog that is perfectly even — dry to the touch, residue-free, and safe for electronics, optics, and sensitive surfaces.'`
   Source: Compact Wall Mount / AthleticGuard brochure.

R7. **`src/pages/[...slug].astro:150`** (`about-us/technology`, Automated Intelligence)
   Old: `'Genesis360™ replaces human variability with programmable logic. An industrial-grade PLC controller regulates dry fog duration, interval, and density. Once configured, each cycle runs autonomously — set the schedule, press start, walk away.'`
   New: `'Genesis360™ replaces human variability with programmable logic. Systems run on a standard timer, with an optional PLC Smart Board/App upgrade that adds phone or desktop control over dry fog duration, interval, and density. Once configured, each cycle runs autonomously — set the schedule, press start, walk away.'`
   Source: Compact Wall Mount brochure (smart control board is described as an upgrade that "replaces the standard timer," not a baseline feature).

R8. **`src/pages/[...slug].astro:157`** (`about-us/technology`, Sub-10 Micron Dynamics — "Extended Suspension")
   Old: `{ title: 'Extended Suspension', copy: 'Smaller droplets remain airborne 10–20× longer, maximizing contact time.' },`
   New: `{ title: 'Extended Suspension', copy: 'Sub-10-micron droplets can remain suspended in the air for up to 8 hours in field studies, maximizing contact time.' },`
   Source: Technology Explainer — "These droplets suspend in the air for up to 8 hours in field studies."

R9. **`src/pages/[...slug].astro:160`** (`about-us/technology`, Sub-10 Micron Dynamics — "Surface Adhesion")
   Old: `{ title: 'Surface Adhesion', copy: 'Droplets form at a low contact angle (≈ 4–12%), clinging evenly across vertical, horizontal, and underside planes.' },`
   New: `{ title: 'Surface Adhesion', copy: 'Droplets act as charge dissipators, neutralizing electrostatic charge on airborne particles so they aggregate and settle evenly across vertical, horizontal, and underside planes.' },`
   Source: Technology Explainer — "Static Electricity Suppression and Dust Capture."

---
Audit complete. All required source documents and site copy locations listed in the task have been read and cross-checked.
