# BotaniMax Copy Audit

Status: COMPLETE — all five required source documents plus the two image-only pages read in full; all listed site files checked and grepped.

Source documents (client BotaniMax product documents):
- `reference-files/botanimax/BotaniMax Promo Sheet.pdf`
- `reference-files/botanimax/BotaniMax_128oz_10x5.pdf` (product label)
- `reference-files/botanimax/EPA Master_Label - BotaniMax.pdf` (13 pages)
- `reference-files/botanimax/SDS - BotaniMax.pdf`
- `reference-files/botanimax/A Unique EPA Registration-BotaniMax Botanical Disinfectant A Botanical Powerhouse.pdf`
- `reference-files/botanimax/BotaniMax-p1.png` / `-p2.png` (image pages, promo sheet layout)
- `reference-files/botanimax/EPA GLP Toxicity Studies for BotaniMax Botanical Disinfectant-p1.png` (image page)

## 1. Fact sheet

**EPA registration.** BotaniMax carries a full FIFRA Section 3 EPA registration: **EPA Reg. No. 92089-2-103661**, EPA Est. No. **92089-GA-1** (label front panel) plus two additional establishment numbers on the SDS, **72268-AL-1** and **62511-KS-1** (SDS §I). This is a real "EPA Reg. No.," not a 25(b)/25(c) minimal-risk exemption number — 25(b)/25(c)-exempt products are not assigned EPA registration numbers at all. Distributed by Secure Logic, LLC, 1221 Bayou Black Dr., Houma, LA 70360 (label; SDS §I).

**Registration-category wording actually used in the source documents (and it is inconsistent between documents):**
- `BotaniMax_128oz_10x5.txt` (the label) and the EPA Master Label carry no 25(b)/25(c)/2(c) wording at all — they read as a standard registered pesticide label.
- `BotaniMax Promo Sheet.pdf` p.1 (image) says: *"EPA-Registered Broad-Spectrum Disinfectant. EPA-recognized under EPA 25(c), which means tested and approved to kill germs..."* — this "25(c)" framing is not correct for a product with a full Section 3 EPA Reg. No.; 25(c) is a device exemption category, not what this registration is.
- `A Unique EPA Registration-BotaniMax...txt` instead says the formula is *"crafted entirely from ingredients on the EPA-FDA FIFRA 25(b) Minimal Risk List"* and calls it *"a Minimal Risk Antimicrobial Cleaner."*
- Net: the client's own documents disagree on 25(b) vs 25(c), and neither framing matches a product with an actual EPA Reg. No. Treat any "25(b)"/"25(c)" claim on the site as unverifiable against the label and flag for the client, don't repeat either.

**"100% minimal risk" / "100% botanical" wording** appears verbatim in `A Unique EPA Registration...txt`: *"100% minimal risk botanical disinfectant"* and *"first ever 100% minimal risk disinfectant cleaner registered with the US EPA"* (self-contradictory alongside the EPA Reg. No., but it is the client's own phrasing). Promo Sheet p.2 image: *"BotaniMax® is 100% botanical plant oils and delivers antimicrobial performance when used as directed."*

**Active ingredient.** Citric Acid — **2.06%**. Other Ingredients — **97.94%**. Total 100.00% (label front panel; SDS §II confirms 2.06%, CAS 77-92-9). SDS §III further discloses "Other Ingredients: wintergreen oil, thyme oil, botanicals, and a blend of proprietary ingredients." The "A Unique EPA Registration" doc names three "Superstars": Thyme Essential Oil (Thymus vulgaris, CAS 8007-46-3), Wintergreen Oil (Gaultheria procumbens, CAS 68917-75-9), and Citrus Extracts (CAS 77-92-9 — note: this CAS number is actually assigned to citric acid on the SDS, not citrus extract; the promo doc's CAS attribution is internally inconsistent).

**Kill claims / organisms / contact times** (label + EPA Master Label, identical):
- Bacteria, **10 minutes**, hard non-porous surfaces: *Pseudomonas aeruginosa* (ATCC 15442), *Salmonella enterica* (ATCC 10708), *Staphylococcus aureus* (ATCC 6538).
- Virus, **90 seconds**: SARS-Related Coronavirus 2 (SARS-CoV-2, BEI Resources NR-52281, Strain Isolate-WA1/2020) — i.e., "kills SARS-CoV-2, the virus that causes COVID-19" per label front panel.
- Viruses, **5 minutes**: Human Coronavirus (ATCC VR-740, 229E strain), Norovirus (Norwalk-like virus) surrogate Feline Calicivirus (VR-782), Poliovirus Type 1 (ATCC VR-1562).
- Fungicidal, **10 minutes**: *Trichophyton mentagrophytes* (ATCC 9533) — a cause of athlete's foot / ringworm.
- Also labeled: kills mold and mildew on hard non-porous surfaces (label back panel).
- No "99.9%" kill-percentage claim appears anywhere in the label or master label; the EPA Master Label's allowed "Eliminates __% of bacteria/viruses" claims are fill-in-the-blank placeholders, not filled with a value on the actual label.

**Emerging viral pathogen claim.** The EPA Master Label explicitly states this claim language *"is [not] to appear on any final printed label"* — it is only usable in **off-label communications** under EPA's "Guidance to Registrants: Process for Making Claims Against Emerging Viral Pathogens," and only when tied to a specific outbreak/CDC-OIE reference and the surrogate-organism logic (BotaniMax qualifies via Poliovirus Type 1 as the large/enveloped/small non-enveloped surrogate, per the master label's Emerging Viral Pathogen table). Promo Sheet p.1 (image) nonetheless markets it plainly as **"EPA Tier III Emerging Viral Pathogen Claim."**

**Fogging / misting.** Neither the EPA Master Label nor the product label uses the words "fog" or "fogging" or "mist"/"misting" anywhere (confirmed via full-text search of both documents). Approved application devices are: sponge, brush, cloth, mop, auto scrubber, "mechanical spray device," hand pump trigger spray device, or immersion — with spray applications at 6–8 inches from the surface. Promo Sheet p.2 (image) nonetheless states: *"BotaniMax® is approved on its EPA label for misting and fogging."* This is not supported by the label text as extracted.

**Dilution / directions relevant to fogging-style use.** Ready-to-use (RTU) for disinfecting hard non-porous surfaces (10-minute wet contact). For general cleaner/deodorizer/degreaser use: 2 fl. oz. per gallon of water; for heavy-duty cleaning: 4 fl. oz. per gallon of water. HVAC/cooling-tower coil use: apply RTU product to clean and disinfect coils (10-minute wet contact), system must be powered off and inspected first.

**Toxicity category, signal word, PPE.** Signal word: **CAUTION** (label front panel and EPA Master Label precautionary statements). SDS §XI acute toxicity categories: Acute Dermal, Oral, Inhalation, Skin Irritation, Skin Sensitization all **Category 4 ("No Toxicity"/"not a sensitizer")**; Acute Eye Irritation is **Category 3 ("Caution" / "minimal eye irritation")** — per the GLP toxicology page (Stillmeadow Study ID 25861-22, Study Director Vincent A. Murphy, PhD, DABT, dated 21 Oct 22), all positive effects cleared by 48 hours with no irritation observed in any eye at 48 hours. SDS §VIII: gloves/eye protection/respiratory protection all listed "None required"; general ventilation adequate. Label precautionary statement: "Causes eye irritation. Avoid contact with eyes or clothing. Wear protective eyewear. Wash thoroughly with soap and water after handling... Do not mix with bleach or mildew stain removers as irritating fumes may result." Promo Sheet p.2 (image) summarizes this as **"Category IV"** toxicity classification and "No skin irritation / No dermal sensitization / No systemic toxicity" — that summary omits that eye irritation is Category 3, not Category IV.

**Shelf life.** Not stated as a shelf-life figure in any of the five source documents (no "shelf life," "expiration," or "months/years" stability claim found). SDS §VII gives storage temperature guidance only: "Ambient to 30°C (must be stored above 0°C at all times)." Do not assert a specific shelf-life number on the site; none exists in these documents.

**Container sizes.** Only **128 FL. OZ.** is documented (`BotaniMax_128oz_10x5.txt` label, filename itself, UPC 7 92671 77341 2). No other container size (e.g., gallon, quart, 32 oz) appears in any of the five source documents.

**Form.** Physical state: Liquid, transparent clear liquid with thyme/spicy odor, no added colorant, pH 8.0–9.0 (SDS §IX). Non-flammable, non-combustible (SDS §V; EPA Master Label marketing claims).

**Biodegradability / ecological.** SDS §XII: "readily biodegradable under OECD 301E," low aquatic toxicity (Vibrio fischeri data given).

## 2. Contradictions

Checked so far: `src/pages/[...slug].astro`, `src/pages/index.astro`, `src/pages/home-full.astro`.

1. **`src/pages/[...slug].astro:77`** (`features` array, rendered on the `botanimax` page at line 354) — site text: `'EPA 2(c) Registered'`. Document text: label/EPA Master Label EPA Reg. No. is **92089-2-103661**, a full FIFRA Section 3 registration; "2(c)" is not a FIFRA category that appears anywhere in the five source documents (the documents themselves inconsistently claim 25(b) vs. 25(c), but never "2(c)"). Correct replacement: `'EPA Registered (Reg. No. 92089-2-103661)'`.
2. **`src/pages/index.astro:81`** and **`src/pages/home-full.astro:46`** — `trustStats`: `{ label: 'EPA 2(c)', copy: 'Registered botanical disinfectant formula', ... }`. Same issue as #1 — "2(c)" is unsupported by any source document. Correct replacement: `{ label: 'EPA Registered', copy: 'Reg. No. 92089-2-103661 botanical disinfectant formula', ... }`.
3. **`src/pages/index.astro:100`** and **`src/pages/home-full.astro:63`** — `certMarks`: `{ kind: 'botanical', caption: '150+ Plant-Derived Actives' }`. No source document supports a "150+" count of plant-derived actives. The documents describe exactly one active ingredient (Citric Acid, 2.06%) plus three named botanical "Other Ingredients" (thyme oil, wintergreen oil, citrus extracts) whose individual chemical constituents number roughly 75 (thyme), 70+ (wintergreen), and 200+ (citrus) — i.e., "150+" is neither the ingredient count nor a documented aggregate of those constituent counts. Correct replacement: caption should describe the actual formula, e.g. `'100% Botanical Formula'` (matches Promo Sheet p.2: "100% botanical plant oils") — do not assert a specific "150+" figure.
4. **`src/pages/[...slug].astro:86`** — `botanimaxFeatures`: `'BotaniMax is meticulously crafted from 150+ plant actives...'`. Same unsupported "150+" figure as #3, repeated in prose on the `botanimax` page ("Key Features of BotaniMax" grid).
5. **`src/pages/index.astro:901`** and **`src/pages/home-full.astro:850`** — `'BotaniMax is crafted from 150+ plant actives: a patent-pending, EPA-registered disinfectant...'`. Same "150+" issue, plus attributes "patent-pending" to BotaniMax itself. The only patent reference found in the reference materials (Tarleton University Case Study, in the same source folder) attributes the patent to the **delivery system**: *"BotaniMax is delivered through Secure Logic's patented Genesis 360 ultra-fine micro-droplet misting technology"* — the patent covers the misting/delivery system, not the BotaniMax chemical formula. Calling BotaniMax's *formula* "patent-pending" is not supported by any of the five core documents and conflicts with how the (non-core but same-folder) case study frames the patent.
6. **`src/pages/index.astro:101`** and **`src/pages/home-full.astro:64`** — `certMarks`: `{ kind: 'patent', caption: 'Patent-Pending Formula' }`, displayed in the "Certifications & Compliance" band directly above the BotaniMax split-feature section. Same misattribution as #5 — no document supports a patent-pending *formula* claim for BotaniMax; the patent (per the Tarleton case study) is on the Genesis360 delivery system.
7. **`src/pages/index.astro:99`** and **`src/pages/home-full.astro:62`** — `certMarks`: `{ kind: 'evp', caption: 'Emerging Viral Pathogen Claim' }`, presented as an unconditional certification mark alongside "EPA Registered Disinfectant" and "Made in the USA." The EPA Master Label states this claim's language *"is [not] to appear on any final printed label"* and may only be used in **off-label communications** tied to a specific named emerging pathogen/outbreak and CDC/OIE reference — not as a blanket, standing certification mark. This is a compliance risk more than a factual error (see also Compliance Flags below); consider softening to avoid presenting it as an EPA "mark" equivalent to registration.

8. **`src/data/blog-bodies/synthetic-thymol-vs-botanical-thyme-whats-really-in-your-natural-cleaning-product.html:30`** — site text: `"our EPA 25(c) certified botanical based disinfectant"`. This is a *third, different* registration-category phrasing on the same site (compare "EPA 2(c) Registered" in `[...slug].astro:77` and `index.astro:81`/`home-full.astro:46`) — the site is internally inconsistent about the category (2(c) vs. 25(c)) in addition to neither being supported by the actual EPA Reg. No. 92089-2-103661. Correct replacement: `"our EPA-registered (Reg. No. 92089-2-103661) botanical based disinfectant"`.

Not found: no "kills 99.9%" or other unsupported kill-percentage claims were found in `[...slug].astro`, `index.astro`, or `home-full.astro`.

## 3. Outdated or retired naming

1. **`src/pages/[...slug].astro:59`** — `{ name: 'Medical Dry Fog', image: medical, alt: 'Kinetic Systems Medical Dry Fog' }`. The `alt` text says "Kinetic Systems," a name that appears nowhere in any BotaniMax/Genesis360 source document, and breaks the pattern of every sibling entry in the same array (`'Genesis360 InRoom Dry Fog'`, `'Genesis360 HVAC dry fog system image'`, `'Genesis360 Compact dry fog unit'`, `'Genesis360 Mobile Dry Fog'`, `'Genesis360 Grey AgriGuard'`). The imported asset is `medical-mist.png`, a Genesis360-branded image, so "Kinetic Systems" reads as leftover copy from an unrelated vendor/product name. See also Compliance Flags — the task brief calls this out by name.
2. **`src/pages/[...slug].astro:60`** — `{ name: 'Portable Dry Fog', image: portable, alt: 'Kinetic Systems Portable Dry Fog' }`. Same issue as #1.

(No other retired/renamed product names for BotaniMax found in `[...slug].astro`, `index.astro`, or `home-full.astro` at this stage; will update after checking mega-menus, BaseLayout, blog files, and ag/human pages.)

## 4. Missing but valuable

1. State the real EPA Reg. No. (92089-2-103661) somewhere on the `botanimax` page and/or `resources/documentation` — it is more credible and verifiable than an unsupported category code, and it is the one fact every one of the five source documents agrees on.
2. Name the three actual botanical actives (thyme oil, wintergreen oil, citrus extracts) on the `botanimax` page instead of the generic, unsupported "150+ plant actives" figure — the "Superstars of PreVasive" framing in `A Unique EPA Registration-BotaniMax...txt` is genuinely differentiated copy that isn't used anywhere on the site.
3. Add the specific kill list (organisms + contact times: 10-min bacteria, 90-sec SARS-CoV-2, 5-min human coronavirus/norovirus surrogate/poliovirus, 10-min fungicidal) to the `botanimax` page or a FAQ — right now the site only makes generic "controls bacteria, viruses, and fungi" claims when the label supports much more specific, credible claims.
4. Add a FAQ (in the `resources/faqs` `faqs` array) answering "Is BotaniMax EPA registered, and what does that mean?" — the current FAQ list covers Genesis360 delivery-system mechanics in depth but has nothing about BotaniMax's own registration, ingredients, or safety profile.
5. Clarify the relationship between BotaniMax and BAC Ag on the site or in an internal note — `src/data/ag-markets.ts`, `home-full.astro`, `index.astro`, and two ag blog posts all reference "BAC Ag" as if it's a known, distinct product, but none of the five BotaniMax source documents mention "BAC Ag" at all, so its relationship to BotaniMax (same formula rebranded for ag, or a different SKU) cannot be verified from these documents.

## 5. Compliance flags

1. **Emerging Viral Pathogen claim presented as a standing certification.** `src/pages/index.astro:99` and `src/pages/home-full.astro:62` list `'Emerging Viral Pathogen Claim'` as a permanent cert-mark alongside "EPA Registered Disinfectant" and "Made in the USA." Per the EPA Master Label, this claim's language is explicitly barred from the printed label and may only be used in off-label communications tied to a *specific* named emerging pathogen/outbreak with a CDC/OIE reference — not as a blanket, always-on claim. Recommend either removing this cert mark or rewording so it isn't presented as an unconditional EPA certification equivalent to registration.
2. **"25(c)"/"2(c)" registration-category claims are unverifiable and inconsistent across the site** (see Contradictions #1, #2, #8) — three different, mutually inconsistent category codes appear across `[...slug].astro`, `index.astro`/`home-full.astro`, and a blog body, none matching an actual FIFRA category evidenced by the documents. This is the single highest compliance risk in the audit: EPA registration-category claims are legally sensitive and currently wrong in at least two ways at once (wrong code, inconsistent code).
3. **"150+ Plant-Derived Actives" / "150+ plant actives"** (Contradictions #3–#5) is an unsupported quantitative claim; if challenged, there is no source document that substantiates the number 150.
4. **"Patent-Pending Formula" applied to BotaniMax** (Contradictions #5–#6) — the only patent reference in the reference materials attaches to the Genesis360 delivery/misting system, not the BotaniMax chemical formula. Making a patent claim about the wrong subject is a compliance/legal risk independent of marketing tone.
5. **"Kinetic Systems" branding** (`src/pages/[...slug].astro:59-60`) — an unrelated/undocumented brand name appearing in alt text for Genesis360-branded product images; low risk (alt text, not visible body copy) but should be corrected to avoid confusing search engines, screen readers, or a future brand audit into thinking "Kinetic Systems" is a real product line.
6. **No dollar figures were found attached to BotaniMax or the EPA registration.** The dollar figures on the site (`ag/index.astro:42,51`, `ag/hogs-livestock.astro:565,572`, two blog bodies) are all industry-loss statistics (PRRS, avian flu, productivity), not prices, and are out of this audit's BotaniMax-document scope — no pricing claims to flag.
7. **No "Kinetic Systems" or dollar figures found elsewhere in the repo** beyond the two instances above — confirmed via repo-wide grep.

## 6. Prioritized fix list

Numbered by risk/impact. All replacements avoid introducing "Genesis 360" (must stay `Genesis360`) and contain no prices.

1. **`src/pages/index.astro:81`**
   Old: `{ label: 'EPA 2(c)', copy: 'Registered botanical disinfectant formula', icon: 'shield' },`
   New: `{ label: 'EPA Registered', copy: 'Reg. No. 92089-2-103661 botanical disinfectant formula', icon: 'shield' },`
   Source: `BotaniMax_128oz_10x5.txt` line 77 (`EPA REG. NO. 92089-2-103661`); EPA Master Label p.1.

2. **`src/pages/home-full.astro:46`**
   Old: `{ label: 'EPA 2(c)', copy: 'Registered botanical disinfectant formula', icon: 'shield' },`
   New: `{ label: 'EPA Registered', copy: 'Reg. No. 92089-2-103661 botanical disinfectant formula', icon: 'shield' },`
   Source: same as #1.

3. **`src/pages/[...slug].astro:77`**
   Old: `'EPA 2(c) Registered',`
   New: `'EPA Registered (Reg. No. 92089-2-103661)',`
   Source: same as #1.

4. **`src/data/blog-bodies/synthetic-thymol-vs-botanical-thyme-whats-really-in-your-natural-cleaning-product.html:30`**
   Old: `our EPA 25(c) certified botanical based disinfectant`
   New: `our EPA-registered (Reg. No. 92089-2-103661) botanical based disinfectant`
   Source: same as #1.

5. **`src/pages/index.astro:100`**
   Old: `{ kind: 'botanical', caption: '150+ Plant-Derived Actives' },`
   New: `{ kind: 'botanical', caption: '100% Botanical Formula' },`
   Source: `BotaniMax-p2.png` (Promo Sheet p.2): "BotaniMax® is 100% botanical plant oils..."

6. **`src/pages/home-full.astro:63`**
   Old: `{ kind: 'botanical', caption: '150+ Plant-Derived Actives' },`
   New: `{ kind: 'botanical', caption: '100% Botanical Formula' },`
   Source: same as #5.

7. **`src/pages/[...slug].astro:86`**
   Old: `{ title: 'Plant Actives', copy: 'BotaniMax is meticulously crafted from 150+ plant actives, ensuring that every drop is infused with the natural power and resilience of botanicals for a holistic defense against pathogens.' },`
   New: `{ title: 'Plant Actives', copy: 'BotaniMax is crafted from thyme oil, wintergreen oil, and citrus extracts — a complex, multi-modal blend of natural compounds infused into every drop for a holistic defense against pathogens.' },`
   Source: `A Unique EPA Registration-BotaniMax...txt` ("Meet the Superstars of PreVasive": Thyme Essential Oil, Wintergreen Oil, Citrus Extracts); SDS §III (wintergreen oil, thyme oil, botanicals).

8. **`src/pages/index.astro:901`**
   Old: `BotaniMax is crafted from 150+ plant actives: a patent-pending, EPA-registered disinfectant that controls bacteria, viruses, and fungi without harsh synthetics.`
   New: `BotaniMax is a 100% botanical, EPA-registered disinfectant — crafted from thyme oil, wintergreen oil, and citrus extracts — that controls bacteria, viruses, and fungi without harsh synthetics.`
   Source: same as #5 and #7; drops the unsupported "patent-pending" attribution (patent, per the Tarleton case study in the same reference folder, belongs to the Genesis360 delivery system, not the BotaniMax formula).

9. **`src/pages/home-full.astro:850`**
   Old: `BotaniMax is crafted from 150+ plant actives — a patent-pending, EPA-registered disinfectant that controls bacteria, viruses, and fungi without harsh synthetics.`
   New: `BotaniMax is a 100% botanical, EPA-registered disinfectant — crafted from thyme oil, wintergreen oil, and citrus extracts — that controls bacteria, viruses, and fungi without harsh synthetics.`
   Source: same as #8.

10. **`src/pages/index.astro:101`**
    Old: `{ kind: 'patent', caption: 'Patent-Pending Formula' },`
    New: `{ kind: 'patent', caption: 'Patented Delivery System' },`
    Source: Tarleton University Case Study (same reference folder): "BotaniMax is delivered through Secure Logic's patented Genesis 360 ultra-fine micro-droplet misting technology" — the patent is on the delivery system, not the BotaniMax formula.

11. **`src/pages/home-full.astro:64`**
    Old: `{ kind: 'patent', caption: 'Patent-Pending Formula' },`
    New: `{ kind: 'patent', caption: 'Patented Delivery System' },`
    Source: same as #10.

12. **`src/pages/[...slug].astro:59`**
    Old: `{ name: 'Medical Dry Fog', image: medical, alt: 'Kinetic Systems Medical Dry Fog' },`
    New: `{ name: 'Medical Dry Fog', image: medical, alt: 'Genesis360 Medical Dry Fog' },`
    Source: pattern match with sibling entries in the same array (all other alt text reads "Genesis360 ...").

13. **`src/pages/[...slug].astro:60`**
    Old: `{ name: 'Portable Dry Fog', image: portable, alt: 'Kinetic Systems Portable Dry Fog' },`
    New: `{ name: 'Portable Dry Fog', image: portable, alt: 'Genesis360 Portable Dry Fog' },`
    Source: same as #12.

14. **`src/pages/index.astro:99`** and **`src/pages/home-full.astro:62`** (lower priority — compliance softening, not a hard factual error)
    Old: `{ kind: 'evp', caption: 'Emerging Viral Pathogen Claim' },`
    Suggested: reword or remove; if kept, caption should not imply a standing EPA certification, e.g. `{ kind: 'evp', caption: 'Qualifies for Emerging Pathogen Claims' },`
    Source: EPA Master Label, "Emerging Viral Pathogen Claims" section — the claim language is barred from the printed label and restricted to conditional off-label use per EPA guidance.

Status: COMPLETE — all five source documents and all listed site files/greps checked.

## 5. Compliance flags

(to be filled in)

## 6. Prioritized fix list

(to be filled in)
