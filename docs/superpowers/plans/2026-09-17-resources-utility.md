# Resources & Utility Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move `/resources/`, `/resources/brochures/`, `/resources/documentation/`,
`/resources/faqs/`, `/contact-us/`, `/get-a-quote/`, and `/privacy-policy/` off
the catch-all onto dedicated static pages built on the shared sector blocks,
self-host two documents currently linked from the WordPress media library,
and add one FAQ the BotaniMax audit flagged as missing.

**Spec:** `docs/superpowers/specs/2026-09-17-resources-utility-design.md`

## Constraints

- One local commit per task; never push.
- Do not change navigation, redirects, launch gating, ag, Human, HVAC, or the
  product/company pages.
- No prices, retired names, unsupported EPA category wording, or invented
  product claims. Do not alter the Privacy Policy's legal text.
- `Genesis360` one word; `npm run check:brand` must pass.
- Every closing `SectorCta` on these pages passes `href="/get-a-quote/"`
  (the established site-wide convention; `SectorCta`'s own default of
  `/contact-us/` exists only because the ag pages still rely on it).
- Work from `/Users/joshuariley/Sites/securelogic` (or a worktree the
  controller names).

---

### Task 1: Self-host two documents, render two new brochure covers, establish the page-count baseline

**Files:**
- Create: `public/docs/Secure-Logic-BotaniMax-EPA-Master-Label.pdf`, `public/docs/Secure-Logic-BotaniMax-SDS.pdf`, `public/docs/Secure-Logic-Athletics-Brochure.pdf`, `public/docs/Secure-Logic-HVAC-Brochure.pdf`
- Create: `src/assets/images/brochure-athletics.png`, `src/assets/images/brochure-hvac.png`

- [ ] **Step 1: Copy the two now-self-hostable documents and two new brochure PDFs**

```bash
cd /Users/joshuariley/Sites/securelogic
cp "reference-files/botanimax/EPA Master_Label - BotaniMax.pdf" "public/docs/Secure-Logic-BotaniMax-EPA-Master-Label.pdf"
cp "reference-files/botanimax/SDS - BotaniMax.pdf" "public/docs/Secure-Logic-BotaniMax-SDS.pdf"
cp "reference-files/brochures/Genesis360 Athletic E-Brochure.pdf" "public/docs/Secure-Logic-Athletics-Brochure.pdf"
cp "reference-files/brochures/Genesis360 HVAC.pdf" "public/docs/Secure-Logic-HVAC-Brochure.pdf"
ls -la public/docs/
```

- [ ] **Step 2: Render two new brochure cover thumbnails**

The three existing covers (`brochure-childcare.png` 203×262, `brochure-agriculture.png` 205×266, `brochure-fitness.png` 448×586) are portrait renders of each brochure's first page. Match that:

```bash
sips -s format png -Z 450 "public/docs/Secure-Logic-Athletics-Brochure.pdf" --out src/assets/images/brochure-athletics.png
sips -s format png -Z 450 "public/docs/Secure-Logic-HVAC-Brochure.pdf" --out src/assets/images/brochure-hvac.png
sips -g pixelWidth -g pixelHeight src/assets/images/brochure-athletics.png src/assets/images/brochure-hvac.png
```
If `sips` renders a blank or wrong page (some PDFs export multiple images per page and `sips` can pick oddly), instead render via the same PDF-frame technique used earlier in this project: `python3 -c "import pypdf; ..."` to extract page 1 as its own single-page PDF, then `sips` that. Confirm each PNG visually with your Read tool before moving on — it must show the brochure's actual cover, not a blank page or an unrelated page.

- [ ] **Step 3: Build and record the new baseline page count**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"
```
Record the exact number reported (still 43 — this task adds no new routes). Every later task in this plan states its expected count relative to this baseline; if a later task's expected count doesn't match what Step 3 recorded plus that task's new routes, stop and report the discrepancy rather than pushing through.

- [ ] **Step 4: Commit**

```bash
git add public/docs/Secure-Logic-BotaniMax-EPA-Master-Label.pdf public/docs/Secure-Logic-BotaniMax-SDS.pdf public/docs/Secure-Logic-Athletics-Brochure.pdf public/docs/Secure-Logic-HVAC-Brochure.pdf src/assets/images/brochure-athletics.png src/assets/images/brochure-hvac.png
git commit -m "Resources: self-host the BotaniMax label/SDS; add Athletics and HVAC brochure assets

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: `/resources/` hub and `/resources/brochures/`

**Files:**
- Create: `src/pages/resources/index.astro`, `src/pages/resources/brochures.astro`

- [ ] **Step 1: Create the hub**

```astro
---
// src/pages/resources/index.astro
// Resources hub. Same four-card grid as the old catch-all branch, restyled
// with the shared dark hero and closing CTA. Spec:
// docs/superpowers/specs/2026-09-17-resources-utility-design.md
import { FileText, ArrowRight } from '@lucide/astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import faqRoom from '../../assets/images/faq-room.jpg';

const links = [
  ['Blog', '/blogs/', 'Insights on botanical disinfectants, Genesis360 technology, and indoor environmental quality.'],
  ['Brochures', '/resources/brochures/', 'Download industry-specific brochures for child care, agriculture, fitness, athletics, and HVAC.'],
  ['Documentation', '/resources/documentation/', 'Access labels, SDS sheets, lab reports, and technical papers.'],
  ['FAQs', '/resources/faqs/', 'Review common questions about micro-droplet physics and automated coverage.'],
] as const;
---

<BaseLayout title="Genesis360 | Resources" description="Brochures, documentation, and answers about Genesis360 and BotaniMax, all in one place.">
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />
    <main>
      <SectorHero
        eyebrow="Resources"
        headline={['Everything You Need.', 'In One Place.']}
        support="Brochures, technical documentation, and answers to the questions we hear most."
        poster={faqRoom}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
      />

      <section class="bg-white py-20 sm:py-24">
        <div class="container-page">
          <div class="reveal grid gap-5 md:grid-cols-2 lg:grid-cols-4" x-intersect.once="$el.classList.add('is-visible')">
            {links.map(([title, href, copy]) => (
              <a href={href} class="accent-card group border-t-4 border-botanical-500 p-6">
                <FileText class="h-7 w-7 text-primary-600" />
                <h2 class="mt-5 text-xl font-semibold text-slate-900">{title}</h2>
                <p class="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
                <span class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">Open <ArrowRight class="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SectorCta
        eyebrow="Still Have Questions?"
        heading="Talk To Our Team Directly."
        copy="Tell us about your facility and what you're evaluating, and we'll point you at the right documentation or the right person."
        href="/get-a-quote/"
      />
    </main>
    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Create the brochures page**

```astro
---
// src/pages/resources/brochures.astro
// Spec: docs/superpowers/specs/2026-09-17-resources-utility-design.md
import { ArrowDownToLine } from '@lucide/astro';
import { Image } from 'astro:assets';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import faqRoom from '../../assets/images/faq-room.jpg';
import childcare from '../../assets/images/brochure-childcare.png';
import agriculture from '../../assets/images/brochure-agriculture.png';
import fitness from '../../assets/images/brochure-fitness.png';
import athletics from '../../assets/images/brochure-athletics.png';
import hvac from '../../assets/images/brochure-hvac.png';

const brochures = [
  { title: 'Early Child Care Centers', image: childcare, file: '/docs/Secure-Logic-Early-Child-Care-NoBmax-Brochure.pdf', summary: 'Keeping classrooms, nap areas, and play spaces safe for the youngest and most vulnerable.' },
  { title: 'Agriculture Overview', image: agriculture, file: '/docs/Secure-Logic-AgBrochure1-General.pdf', summary: 'Automated biosecurity for barns, greenhouses, and grow rooms that protects yield and herd health.' },
  { title: 'Fitness Centers', image: fitness, file: '/docs/Secure-Logic-Fitness-Center-Brochure-Final-1.pdf', summary: 'Whole-room disinfection for locker rooms, mats, and high-touch equipment between sessions.' },
  { title: 'Athletics', image: athletics, file: '/docs/Secure-Logic-Athletics-Brochure.pdf', summary: 'Sub-10-micron dry fog for wrestling rooms, weight rooms, and shared athletic facilities.' },
  { title: 'HVAC', image: hvac, file: '/docs/Secure-Logic-HVAC-Brochure.pdf', summary: 'AeroGuard treats the coil, drain pan, and duct pathway inside residential and commercial air handlers.' },
] as const;
---

<BaseLayout title="Genesis360 | Brochures" description="Download Genesis360 brochures for child care, agriculture, fitness, athletics, and HVAC facilities.">
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />
    <main>
      <SectorHero
        eyebrow="Brochures"
        headline={['Download Genesis360', 'Brochures.']}
        support="Learn how Genesis360 and BotaniMax keep the people around you healthy."
        poster={faqRoom}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
      />

      <section class="bg-white py-20 sm:py-24">
        <div class="container-page">
          <p class="reveal mx-auto max-w-3xl text-center text-lg leading-8 text-slate-600" x-intersect.once="$el.classList.add('is-visible')">
            Don't see a brochure that meets your needs? <a href="/contact-us/" class="font-semibold text-primary-700 underline decoration-botanical-400 underline-offset-4">Reach out to our team</a> for more information.
          </p>
          <div class="mt-14 grid gap-6 md:grid-cols-3">
            {brochures.map(({ title, image, file, summary }) => (
              <article class="card flex flex-col p-6 text-center">
                <Image src={image} alt={`${title} brochure cover`} class="mx-auto h-72 object-contain" widths={[240, 360, 520]} sizes="(min-width: 768px) 33vw, 100vw" />
                <h2 class="mt-5 text-lg font-semibold text-slate-900">{title}</h2>
                <p class="mt-3 flex-1 text-sm leading-6 text-slate-600">{summary}</p>
                <a href={file} download class="button-primary mt-6 justify-center">Download <ArrowDownToLine class="h-4 w-4" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectorCta
        eyebrow="Ready To See It In Person?"
        heading="Request A Facility Walkthrough."
        copy="A brochure is a starting point. Tell us about your space and we'll map the right configuration."
        href="/get-a-quote/"
      />
    </main>
    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 3: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"
node scripts/assert-html.mjs dist/resources/index.html "Everything You Need." "Brochures</h2>" "/resources/brochures/"
node scripts/assert-html.mjs dist/resources/brochures/index.html "Download Genesis360" "Athletics</h2>" "HVAC</h2>" "Secure-Logic-Athletics-Brochure.pdf" "Secure-Logic-HVAC-Brochure.pdf"
ls dist/docs/ | grep -c "Secure-Logic-Athletics-Brochure.pdf\|Secure-Logic-HVAC-Brochure.pdf"
echo "dollar figures: $(grep -oE '\$[0-9]' dist/resources/index.html dist/resources/brochures/index.html | wc -l | tr -d ' ')"
npx astro check 2>&1 | tail -4
npm run check:brand
```
Expected: baseline+2 pages; six `ok`; `2` (both new PDFs copied into the dist output by Astro's static asset handling — if this is `0`, confirm `public/docs/` is the right location, since files there are copied verbatim to `dist/` root); `dollar figures: 0`; `8 errors`; brand passes.

- [ ] **Step 4: Commit**

```bash
git add src/pages/resources/index.astro src/pages/resources/brochures.astro
git commit -m "Resources: rebuild the hub and brochures page on the sector blocks; add Athletics and HVAC brochures

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: `/resources/documentation/` and `/resources/faqs/`

**Files:**
- Create: `src/pages/resources/documentation.astro`, `src/pages/resources/faqs.astro`

- [ ] **Step 1: Create the documentation page**

```astro
---
// src/pages/resources/documentation.astro
// The Efficacy Lab Report, Staph Efficacy Lab Report, and Industrial Hygiene
// White Paper are not present in any reference folder available to this
// build, so their links still point at the WordPress media library; see
// docs/QUESTIONS-FOR-MARTY.md for the ask to get local copies before the
// DNS cutover. The EPA Master Label and SDS are now self-hosted.
// Spec: docs/superpowers/specs/2026-09-17-resources-utility-design.md
import { ArrowDownToLine } from '@lucide/astro';
import { Image } from 'astro:assets';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import faqRoom from '../../assets/images/faq-room.jpg';
import label from '../../assets/images/botanimax-label.png';

const docGroups: { heading: string; items: [string, string][] }[] = [
  {
    heading: 'Documentation',
    items: [
      ['EPA Registration for the Label', '/docs/Secure-Logic-BotaniMax-EPA-Master-Label.pdf'],
      ['BotaniMax SDS Sheet', '/docs/Secure-Logic-BotaniMax-SDS.pdf'],
    ],
  },
  {
    heading: 'Lab Reports',
    items: [
      ['Efficacy Lab Report', 'https://securelogicusa.com/wp-content/uploads/2025/04/Pathogen-Report.pdf'],
      ['Staph Efficacy Lab Report', 'https://securelogicusa.com/wp-content/uploads/2025/04/Staph-Final-Report.pdf'],
    ],
  },
  {
    heading: 'White Paper',
    items: [
      ['Industrial Hygiene White Paper', 'https://securelogicusa.com/wp-content/uploads/2025/04/INDUSTRIAL-HYGIENE-White-Paper-Genesis-misting-Trial-BotaniMax.pdf'],
    ],
  },
];
---

<BaseLayout title="Genesis360 | Documentation" description="Lab reports, product labels, and technical papers behind Genesis360 and BotaniMax.">
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />
    <main>
      <SectorHero
        eyebrow="Documentation"
        headline={['Supporting Data For', 'Genesis360.']}
        support="Lab test results, product labels, and technical papers behind the platform."
        poster={faqRoom}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
      />

      <section class="bg-white py-20 sm:py-24">
        <div class="container-page grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <Image src={label} alt="BotaniMax product label" class="h-max rounded-lg bg-slate-100 shadow-lift lg:sticky lg:top-28" widths={[640, 960, 1200]} sizes="(min-width: 1024px) 42vw, 100vw" />
          <div class="grid gap-10">
            {docGroups.map(({ heading, items }) => (
              <div>
                <h2 class="text-sm font-semibold uppercase tracking-[0.16em] text-botanical-600">{heading}</h2>
                <div class="mt-4 grid gap-4">
                  {items.map(([title, file]) => (
                    <a href={file} class="accent-card group flex items-center justify-between gap-4 p-5" target="_blank" rel="noopener">
                      <span class="font-semibold text-slate-900">{title}</span>
                      <span class="inline-flex items-center gap-2 text-sm font-semibold text-primary-700">Download <ArrowDownToLine class="h-5 w-5 text-primary-600 transition group-hover:translate-y-0.5" /></span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectorCta
        eyebrow="Want The Full Picture?"
        heading="Talk To Our Team About Your Facility."
        copy="We can walk through which reports and specs are most relevant to your deployment."
        href="/get-a-quote/"
      />
    </main>
    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Create the FAQs page**

```astro
---
// src/pages/resources/faqs.astro
// Spec: docs/superpowers/specs/2026-09-17-resources-utility-design.md
import { ArrowRight, Check } from '@lucide/astro';
import { Image } from 'astro:assets';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import SectorHero from '../../components/sector/SectorHero.astro';
import SectorCta from '../../components/sector/SectorCta.astro';
import faqRoom from '../../assets/images/faq-room.jpg';

const faqs: { question: string; answer: string; bullets?: string[] }[] = [
  {
    question: 'What is the Genesis360™ Dry Fog System Platform?',
    answer: 'Genesis360 is an automated environmental dry fog platform that uses sub-10 micron dry fog droplets and intelligent controls to deliver consistent 360-degree coverage in the air and on surfaces — the same way, every cycle.',
  },
  {
    question: 'How is Genesis360 different from traditional foggers or spray systems?',
    answer: 'Traditional pump sprayers produce 80–300 micron droplets that fall immediately, ULV foggers produce 20–50 micron droplets that fall within seconds, and electrostatic sprayers produce 40–80 micron droplets with rapid surface deposition. Genesis360 droplets are sub-10 microns and remain suspended long enough to fill the room or duct volume, wrap around objects, and reach hidden zones — without relying on a person to aim the sprayer.',
  },
  {
    question: 'What problems does Genesis360 solve for facilities?',
    answer: 'It removes the human variability that undermines manual disinfection, addressing the issues facilities struggle with most:',
    bullets: [
      'Inconsistent coverage from manual cleaning',
      'Labor dependence and rising labor costs',
      'Unpredictable chemical use and overspray',
    ],
  },
  {
    question: 'What does "sub-10 micron droplets" mean, and why does it matter?',
    answer: 'It means each droplet is smaller than ten microns across. At that size, droplets remain airborne far longer, make contact with airborne particles, reach hidden and underside surfaces, and evaporate before pooling — enabling true volumetric coverage instead of wet, uneven spray.',
  },
  {
    question: 'What is meant by "360-degree coverage"?',
    answer: 'The system treats the entire three-dimensional space rather than just the surfaces a person can reach. In practice, the dry fog works to:',
    bullets: [
      'Fill the entire room or duct volume',
      'Wrap around and underneath surfaces',
      'Make contact with airborne particles and contaminants',
    ],
  },
  {
    question: 'Can Genesis360 products be customized for different buildings or processes?',
    answer: 'Yes. Genesis360 is a configurable platform, not a single fixed device. Deployments can be tuned by:',
    bullets: [
      'Number and placement of nozzles',
      'Flow rates and droplet density',
      'Cycle durations and dwell times',
      'Zone configurations for large or multi-building sites',
      'Control inputs such as schedules and optional sensors',
    ],
  },
  {
    question: 'Is the technology safe for electronics, medical equipment, and sensitive surfaces?',
    answer: 'The dry fog is engineered to remain vapor-phase and evaporate quickly without standing moisture, condensation, or pooling when installed and operated as directed — making it suitable for electronics, optics, and other sensitive equipment.',
  },
  {
    question: 'What kind of maintenance does Genesis360 require?',
    answer: 'Most systems require low maintenance. The HVAC platform’s documented schedule is a twice-yearly check to confirm the unit is running correctly and refill the liquid tank; other deployments should follow the maintenance schedule in their product documentation.',
  },
  {
    // Source: reference-files/botanimax/BotaniMax_128oz_10x5.pdf (label front panel, EPA Reg. No.).
    question: 'Is BotaniMax EPA registered?',
    answer: 'Yes. BotaniMax carries EPA Reg. No. 92089-2-103661, a full federal registration under FIFRA. Every claim on the label — organisms, contact times, use directions — applies only when the product is used exactly as labeled.',
  },
];
---

<BaseLayout title="Genesis360 | FAQs" description="Answers about micro-droplet physics, 360-degree coverage, intelligent automation, maintenance, and BotaniMax registration.">
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />
    <main>
      <SectorHero
        eyebrow="FAQ"
        headline={['Frequently Asked', 'Questions.']}
        support="Micro-droplet physics, 360-degree coverage, automation, and maintenance."
        poster={faqRoom}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
      />

      <section class="bg-white py-20 sm:py-24">
        <div class="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <Image src={faqRoom} alt="Clean indoor facility room used for environmental control" class="rounded-lg shadow-deep lg:sticky lg:top-28" widths={[520, 760, 1040]} sizes="(min-width: 1024px) 38vw, 100vw" />
          <div class="grid gap-4">
            {faqs.map(({ question, answer, bullets }) => (
              <details class="group rounded-lg bg-slate-50 p-5 shadow-sm open:bg-white open:shadow-lift">
                <summary class="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                  {question}
                  <ArrowRight class="h-4 w-4 shrink-0 text-primary-600 transition group-open:rotate-90" />
                </summary>
                <p class="mt-4 text-sm leading-6 text-slate-600">{answer}</p>
                {bullets && (
                  <ul class="mt-3 grid gap-2">
                    {bullets.map((b) => (
                      <li class="flex items-start gap-2 text-sm leading-6 text-slate-600">
                        <Check class="mt-0.5 h-4 w-4 shrink-0 text-botanical-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>

      <SectorCta
        eyebrow="Still Have A Question?"
        heading="Ask Our Team Directly."
        copy="If your question isn't answered here, send it our way and we'll get back to you within one business day."
        href="/get-a-quote/"
      />
    </main>
    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 3: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"
node scripts/assert-html.mjs dist/resources/documentation/index.html "Supporting Data For" "Secure-Logic-BotaniMax-EPA-Master-Label.pdf" "Secure-Logic-BotaniMax-SDS.pdf" "wp-content/uploads/2025/04/Pathogen-Report.pdf"
node scripts/assert-html.mjs dist/resources/faqs/index.html "Frequently Asked" "Is BotaniMax EPA registered?" "92089-2-103661" "!25(b)" "!25(c)" "!2(c)"
ls dist/docs/ | grep -c "Secure-Logic-BotaniMax-EPA-Master-Label.pdf\|Secure-Logic-BotaniMax-SDS.pdf"
echo "dollar figures: $(grep -oE '\$[0-9]' dist/resources/documentation/index.html dist/resources/faqs/index.html | wc -l | tr -d ' ')"
npx astro check 2>&1 | tail -4
npm run check:brand
```
Expected: baseline+4 pages total (this task's two, plus Task 2's two); nine `ok`; `2`; `dollar figures: 0`; `8 errors`; brand passes.

- [ ] **Step 4: Commit**

```bash
git add src/pages/resources/documentation.astro src/pages/resources/faqs.astro
git commit -m "Resources: rebuild documentation and FAQs on the sector blocks; self-host the label/SDS; add a BotaniMax registration FAQ

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: `/contact-us/` and `/get-a-quote/`

**Files:**
- Create: `src/pages/contact-us.astro`, `src/pages/get-a-quote.astro`

- [ ] **Step 1: Create the contact page**

```astro
---
// src/pages/contact-us.astro
// Spec: docs/superpowers/specs/2026-09-17-resources-utility-design.md
import { Mail, Phone } from '@lucide/astro';
import { Image } from 'astro:assets';
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import SectorHero from '../components/sector/SectorHero.astro';
import QuoteForm from '../components/QuoteForm.astro';
import contactBg from '../assets/images/contact-bg.jpeg';
---

<BaseLayout title="Genesis360 | Contact Us" description="Connect directly with the Genesis360 team for product questions, quotes, or partnership inquiries.">
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />
    <main>
      <SectorHero
        eyebrow="Contact Us"
        headline={['Connect Directly To', 'The Genesis360 Team.']}
        support="Questions about products, help with a quote, or a partnership to explore — the team is here to help."
        poster={contactBg}
        cta={{ href: '/get-a-quote/', label: 'Get A Quote' }}
      />

      <section class="bg-white py-20 sm:py-24">
        <div class="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div class="rounded-lg bg-slate-900 p-8 text-white shadow-deep">
            <Image src={contactBg} alt="Clean indoor environment for Genesis360 contact page" class="-mx-8 -mt-8 mb-8 h-56 w-[calc(100%+4rem)] rounded-t-lg object-cover opacity-80" widths={[520, 760]} sizes="(min-width: 1024px) 36vw, 100vw" />
            <a href="tel:18889974310" class="flex items-center gap-3"><Phone class="h-5 w-5 text-botanical-300" />1-888-997-4310</a>
            <a href="mailto:info@securelogicUSA.com" class="mt-4 flex items-center gap-3"><Mail class="h-5 w-5 text-botanical-300" />info@securelogicUSA.com</a>
          </div>
          <QuoteForm title="Contact Genesis360" />
        </div>
      </section>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Create the get-a-quote page**

```astro
---
// src/pages/get-a-quote.astro
// Spec: docs/superpowers/specs/2026-09-17-resources-utility-design.md
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import SectorHero from '../components/sector/SectorHero.astro';
import QuoteForm from '../components/QuoteForm.astro';
import fogger from '../assets/images/human-fogger.png';
---

<BaseLayout title="Genesis360 | Get A Quote" description="Request a quote to evaluate Genesis360 botanical disinfection and automated dry fog systems for your facility.">
  <div class="bl bg-white" x-data x-init="document.documentElement.classList.add('reveal-enabled')">
    <Header />
    <main>
      <SectorHero
        eyebrow="Get A Quote"
        headline={['Get A Quote For', 'Your Facility.']}
        support="Tell us about the space and we'll map the right Genesis360 configuration."
        poster={fogger}
        cta={{ href: '#quote', label: 'Start Below' }}
      />

      <section id="quote" class="bg-slate-100 py-20 sm:py-24">
        <div class="container-page">
          <p class="reveal mx-auto mb-10 max-w-2xl text-center text-lg leading-8 text-slate-600" x-intersect.once="$el.classList.add('is-visible')">
            Every quote starts with a facility walkthrough and a coverage plan, not a guess.
          </p>
          <QuoteForm />
        </div>
      </section>
    </main>
    <Footer />
  </div>
</BaseLayout>
```
If `human-fogger.png` is not a real export (check `ls src/assets/images/ | grep fogger`), use whichever existing brand still reads best as a neutral facility image — judge by eye, don't force this specific file.

- [ ] **Step 3: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"
node scripts/assert-html.mjs dist/contact-us/index.html "Connect Directly To" "1-888-997-4310" "info@securelogicUSA.com"
node scripts/assert-html.mjs dist/get-a-quote/index.html "Get A Quote For" "facility walkthrough and a coverage plan"
echo "dollar figures: $(grep -oE '\$[0-9]' dist/contact-us/index.html dist/get-a-quote/index.html | wc -l | tr -d ' ')"
npx astro check 2>&1 | tail -4
npm run check:brand
```
Expected: baseline+6 pages total; five `ok`; `dollar figures: 0`; `8 errors`; brand passes.

- [ ] **Step 4: Commit**

```bash
git add src/pages/contact-us.astro src/pages/get-a-quote.astro
git commit -m "Rebuild /contact-us/ and /get-a-quote/ on the sector blocks

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: `/privacy-policy/`

**Files:**
- Create: `src/pages/privacy-policy.astro`

- [ ] **Step 1: Create the page**

The legal text below is copied verbatim from the current catch-all branch.
Do not add, remove, or reword a single sentence of it — only the surrounding
page shell changes.

```astro
---
// src/pages/privacy-policy.astro
// Legal text is unchanged from the original WordPress privacy policy
// content; only the page shell (hero, container, typography) is new. This
// is generic WordPress-default boilerplate, not counsel-reviewed text for
// this site — see docs/QUESTIONS-FOR-MARTY.md.
// Spec: docs/superpowers/specs/2026-09-17-resources-utility-design.md
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="Genesis360 | Privacy Policy" description="Genesis360 privacy policy.">
  <div class="bl bg-white">
    <Header />
    <main>
      <section class="relative overflow-hidden bg-white">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(104_48%_89%/.55),transparent_34%),radial-gradient(circle_at_80%_0%,hsl(211_92%_92%/.7),transparent_30%)]"></div>
        <div class="container-page relative py-20 sm:py-24">
          <p class="eyebrow">Genesis360</p>
          <h1 class="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">Privacy Policy</h1>
        </div>
      </section>
      <section class="bg-white pb-20">
        <div class="container-page prose prose-slate max-w-3xl">
          <h2>Who we are</h2>
          <p>Our website address is: https://securelogicusa.com.</p>
          <h2>Comments</h2>
          <p>When visitors leave comments on the site, we collect the data shown in the comments form, the visitor's IP address, and browser user agent string to help spam detection.</p>
          <h2>Media</h2>
          <p>If you upload images to the website, avoid uploading images with embedded location data included.</p>
          <h2>Cookies</h2>
          <p>If you leave a comment, you may opt in to saving your name, email address, and website in cookies for convenience.</p>
          <h2>Embedded content from other websites</h2>
          <p>Articles may include embedded content from other websites. Embedded content behaves as if the visitor has visited the other website.</p>
          <h2>How long we retain your data</h2>
          <p>If you leave a comment, the comment and its metadata are retained indefinitely to recognize and approve follow-up comments automatically.</p>
          <h2>What rights you have over your data</h2>
          <p>You can request an exported file of the personal data held about you or request that personal data be erased, excluding data retained for administrative, legal, or security purposes.</p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</BaseLayout>
```
This deliberately does NOT use `SectorHero` or `x-data`/`reveal` (no video, no CTA, no scroll animation — a legal page should load as plain, static text). Compare the rendered legal section byte-for-byte against the catch-all's current output (`curl` or view the current `dist/privacy-policy/index.html` before this task's build, if still available, or diff the prose text directly against the source above) to confirm nothing was altered.

- [ ] **Step 2: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"
node scripts/assert-html.mjs dist/privacy-policy/index.html "Privacy Policy" "Who we are" "https://securelogicusa.com" "What rights you have over your data"
grep -c "<h1" dist/privacy-policy/index.html
npx astro check 2>&1 | tail -4
npm run check:brand
```
Expected: baseline+7 pages total; four `ok`; h1 count 1; `8 errors`; brand passes.

- [ ] **Step 3: Commit**

```bash
git add src/pages/privacy-policy.astro
git commit -m "Rebuild /privacy-policy/ page shell; legal text unchanged

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 6: Retire the seven catch-all branches; add the `/faqs/` redirect

**Files:**
- Modify: `src/pages/[...slug].astro`
- Create: `src/pages/faqs.astro`
- Modify: `src/components/sector/SectorCta.astro` (comment only)

- [ ] **Step 1: Add the `/faqs/` redirect**

```astro
---
// src/pages/faqs.astro
// The old short URL. Kept as a redirect so external links and the footer's
// historical use of /faqs/ (if any) don't 404.
return Astro.redirect('/resources/faqs/', 301);
---
```

- [ ] **Step 2: Remove the seven branches from the catch-all**

In `src/pages/[...slug].astro`, remove these seven entries from the
`getStaticPaths` array: `'resources'`, `'resources/brochures'`,
`'resources/documentation'`, `'resources/faqs'`, `'faqs'`, `'contact-us'`,
`'get-a-quote'`, `'privacy-policy'` (leave `'home-page'`). Remove the seven
matching `{canonicalSlug === '...' && (...)}` blocks. Remove the
`docGroups`, `brochures`, and `faqs` constants (now unused) and any imports
that become unused as a result — check `botanimaxLogo`... wait, that import
doesn't exist here; check the actual remaining imports (`ArrowDownToLine`,
`ArrowRight`, `Check`, `FileText`, `Mail`, `Phone`, `faqRoom`, `contactBg`,
`label`, `childcare`, `agriculture`, `fitness`) against what the retained
`home-page` branch still uses (likely none of them — `home-page` only uses
`PageHero` and `ArrowRight`). Remove every import this file no longer
references. Keep `PageHero` and `QuoteForm` imports only if `home-page`
still uses them (it doesn't use `QuoteForm`; check before removing).

- [ ] **Step 3: Fix the stale comment in `SectorCta.astro`**

Its top comment says `href` defaults to `/contact-us/` "because
`/get-a-quote/` is unfinished" — that's no longer true after this plan.
Update the comment to explain the default exists only so the ag pages (which
still pass no `href`) keep working, not because the route is unfinished. Do
not change the default value itself or any call site.

- [ ] **Step 4: Build and assert**

```bash
npm run build 2>&1 | grep -i "error\|page(s) built"
grep -n "'resources'\|'contact-us'\|'get-a-quote'\|'privacy-policy'\|canonicalSlug === 'resources\|canonicalSlug === 'contact-us'\|canonicalSlug === 'get-a-quote'\|canonicalSlug === 'privacy-policy'" "src/pages/[...slug].astro"
node scripts/assert-html.mjs dist/faqs/index.html "!<h1"
curl -sI "http://localhost:4321/faqs/" 2>/dev/null | head -1 || true
npx astro check 2>&1 | tail -4
npm run check:brand
git status --short
```
Expected: the grep for retired slugs/branches returns nothing; `43 page(s) built` (the retired dynamic routes are replaced 1:1 by the seven new static files plus the tiny `/faqs/` redirect page — confirm against Task 1's recorded baseline, since the exact math depends on whether `/faqs/` counts as its own built page); `8 errors`; brand passes. (The `curl` line only works if a preview server happens to be running; skip it if not — instead confirm the redirect by reading `dist/faqs/index.html`'s `<meta http-equiv="refresh">` or checking Astro's redirect output format directly.)

- [ ] **Step 5: Commit**

```bash
git add "src/pages/[...slug].astro" src/pages/faqs.astro src/components/sector/SectorCta.astro
git commit -m "Retire the resources/contact/quote/privacy catch-all branches; add the /faqs/ redirect

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 7: QA, questions for Marty, and the queue record

**Files:**
- Modify: `docs/QUESTIONS-FOR-MARTY.md`, `TASKS.md`

- [ ] **Step 1: Link sweep and heading check on all seven pages**

```bash
for p in resources/index.html resources/brochures/index.html resources/documentation/index.html resources/faqs/index.html contact-us/index.html get-a-quote/index.html privacy-policy/index.html; do
  grep -o 'href="/[^"#]*"' "dist/$p" | sed 's/href="//; s/"$//' | sort -u | while read -r h; do
    f="dist${h%/}/index.html"; [ -f "$f" ] || [ -f "dist$h" ] || echo "BROKEN in $p: $h"
  done
  printf '%-38s h1=%s\n' "$p" "$(grep -o '<h1' "dist/$p" | wc -l | tr -d ' ')"
done
```
Expected: no `BROKEN`, `h1=1` each.

- [ ] **Step 2: Browser QA**

Serve `dist/` on a free port and capture all seven pages at 500 and 1280
wide with headless Chrome (same method as every prior sub-project this
plan follows). View each; confirm hero legibility, card grids, the FAQ
accordion opens sensibly, the documentation page's sticky label image, and
the privacy-policy page's plain typography. Fix the smallest thing for any
genuine defect, rebuild, re-run that page's assertion.

- [ ] **Step 3: Add the two Marty questions from the spec**

Append to `docs/QUESTIONS-FOR-MARTY.md` under a new `## Resources & Documentation` heading, continuing the existing numbering:
1. The Efficacy Lab Report, Staph Efficacy Lab Report, and Industrial Hygiene White Paper still link to the WordPress media library, scheduled to change in the DNS cutover. Ask for local copies to self-host them like the EPA label and SDS.
2. `/privacy-policy/` is still the generic WordPress default text. Ask whether counsel-reviewed policy text exists or should stay placeholder.

- [ ] **Step 4: Final checks**

```bash
npx astro check 2>&1 | tail -4
npm run check:brand
git status --short
```

- [ ] **Step 5: Record in `TASKS.md`**

Check off `- [ ] Build-out 4/5 — Resources and utility pages ...` with a
`Done YYYY-MM-DD:` note in the file's established style: the seven pages and
their tiers, the self-hosted label/SDS and the three documents still
external (with the reason), the two new brochures, the new FAQ, the
`/faqs/` redirect, QA findings, gating status, and a pointer at the two new
Marty questions. Leave the umbrella "Build out the entire site" entry
unchecked (Build-out 5/5 remains).

- [ ] **Step 6: Commit**

```bash
git add docs/QUESTIONS-FOR-MARTY.md TASKS.md
git commit -m "Resources & utility pages complete: QA, Marty questions, TASKS.md record

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Self-review notes

- Every closing CTA points at `/get-a-quote/`, including on `/get-a-quote/`'s
  own page? No — that page's hero CTA is an anchor-link to its own form
  (`#quote`), not a `SectorCta`; it has no closing CTA to worry about.
- The self-hosted PDF filenames in Task 1 exactly match what Task 2 and
  Task 3's page code reference — cross-checked.
- Task 6's import-cleanup step is the one place a careless implementer could
  break the retained `home-page` branch; the step explicitly says to check
  what that branch still uses before deleting anything.
- Privacy Policy's legal text is reproduced in the plan itself (Task 5),
  so the implementer doesn't need to extract it from the file being
  replaced — removes one chance to introduce a transcription error.
