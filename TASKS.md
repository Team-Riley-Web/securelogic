# Tasks

Queue of work for Claude. Add new tasks to the bottom. Do not remove or edit an
unchecked task unless you are starting it.

## Rules
- Work on only one task at a time.
- New tasks go at the bottom of the list.
- Do not abandon or interrupt the current task unless the user explicitly says "interrupt".
- Finish, test, and verify the current task before starting the next.
- Before starting another task, re-read this file and select the oldest pending (unchecked) task.
- After completing a task, check it off, briefly tell the user it's done, and state which task is starting next.
- Do not combine unrelated tasks into one implementation.

## Queue
- [x] Hog page M1: change "Healthier Pigs." to "Healthy Pigs." in the hero
- [x] Hog page M1: fix the hero subhead orphan (sizing/measure/balance)
- [x] Hog page M2: enlarge the 38% figure to ~1/4 of the image, keep lower-left
- [x] Hog page M3: reword the copy under "One Platform. Three Ways To Deploy It."
- [x] Hog page M4: fix the "Even small losses..." orphan (sizing/measure/balance)
- [x] Interim landing page: park full homepage as `_home-full.astro`, build one-page
      landing (who we are / what we do / what's coming + phone & email)
- [x] Gate every interior page behind 302 redirects in netlify.toml; pages still
      build and stay in the repo. /privacy-policy left reachable on purpose
- [x] Swap `CONTACT_EMAIL` to marty@securelogicusa.com
- [x] Scope the gate to production only — moved from netlify.toml to
      public/_redirects with host-scoped rules, so securelogic.netlify.app
      stays fully browsable and only the live domain is blocked
- [x] Un-park the full homepage to /home-full/ so it stays reviewable on Netlify
- [x] REDO of the landing page — the first attempt was built from scratch and
      threw away the homepage design. Rebuilt src/pages/index.astro as a copy of
      the real homepage with every interior link retargeted at the on-page
      #contact block reading "Contact Us To Learn More". Added a `minimal` prop
      to Header.astro and Footer.astro so the shared chrome renders identically
      minus the gated nav links; the full site is unaffected. Dropped only the
      blog teaser, whose every card linked to a gated post
- [ ] DNS cutover. genesis360.com is the primary domain; securelogicusa.com is
      expected to redirect to it at the registrar. The gate in public/_redirects
      covers apex + www for BOTH domains (104 rules, 26 per host) and arms
      itself at cutover with no redeploy. After DNS lands, verify it actually
      fired:
        curl -sI https://genesis360.com/ag/ | grep -i '^location'
          -> expect  location: /
        curl -sI https://genesis360.com/ | head -1
          -> expect  HTTP/2 200   (landing page must NOT redirect)
        curl -sI https://securelogicusa.com/ | grep -i '^location'
          -> expect a redirect to genesis360.com
      If /ag/ returns 200 instead of a 302, the host-scoped rules did not match.
      Check the exact canonical hostname Netlify assigned and make the left
      column of public/_redirects match it.
- [x] /ag/indoor-growing/ Module 1: reworded the hero body copy to the supplied
      text. Lives in src/data/ag-markets.ts (the page runs on the shared
      ag/[slug].astro template, not a custom page like the hog one). Verified it
      only affects this page — /ag/index.astro has its own separate copy
- [x] /ag/indoor-growing/ hero: resolved by giving the page the hog-page video
      hero treatment instead of a still. Promoted the market off the shared
      ag/[slug].astro template onto its own static route
      (src/pages/ag/indoor-growing.astro) so it can carry a full-bleed video
      hero; Astro gives static routes precedence, so /ag/poultry/ still renders
      from the template untouched. Uses Joshua's cannabis-indoor.mp4 with a
      poster frame extracted to src/assets/images/hero-cannabis-poster.jpg.
      The strawberry image is no longer rendered anywhere on this page. Body
      copy reads from market.heroCopy so ag-markets.ts stays the single source
- [ ] BACKLOG — greenhouse coverage-map module for /ag/indoor-growing/, matching
      the hog page's. Deferred by Joshua 2026-09-01. The module code in
      ag/hogs-livestock.astro is fully reusable (percentage-positioned callouts
      + anchor dots); the blocker is artwork — it needs a photoreal 3D greenhouse
      cutaway with mist visualised, equivalent to transparent-barn.png
      (1448x1086). Callouts would be canopy, benches, irrigation lines,
      walkways, air handling, floor. Revisit when art can be commissioned
- [x] Homepage hero video order: pigs, chickens, cannabis, weight room, farm
      last. Added chickens.mp4 as slide 1. Applied to BOTH src/pages/index.astro
      (live) and src/pages/home-full.astro (the parked original) so the change
      survives the site restore. Slide 0's poster was swapped from
      hero-farm-poster to hero-swine-poster — slide 0 is the only slide that
      preloads and carries a poster, so it has to match its own footage or the
      hero flashes a farm frame before cutting to pigs. Carousel needed no
      change: it reads heroSlides.length, so 5 slides cycle automatically at
      5.2s each
- [x] chickens.mp4 replaced by Joshua with a commercial brooder-house clip:
      1.7MB (was 6.0MB) and a wide warm-toned environment shot, so it now reads
      under the hero gradient instead of washing out. Same filename, so no code
      change was needed — only a rebuild. Both earlier concerns are closed
- [x] /ag/poultry/ given the same hog-style video hero treatment, using
      chickens-alt.mp4 (so that clip is now in use, not spare). Promoted onto
      its own static route src/pages/ag/poultry.astro; poster frame extracted to
      src/assets/images/hero-poultry-poster.jpg. Body copy reads from
      market.heroCopy so ag-markets.ts stays the single source
- [x] ag/[slug].astro: all three ag markets now have bespoke static pages, so
      the template emitted routes that collided with them. Astro gives static
      files precedence so nothing was broken, but the file already had an
      explicit exclusion for hogs-livestock — extended that to a BESPOKE set
      covering all three, so the behaviour is stated rather than relying on
      shadowing. The template now emits nothing and is kept for the next ag
      market added before it earns a bespoke page. human/[slug].astro and
      hvac/[slug].astro are separate files and still fully in use
- [ ] /ag/ index card for Indoor Growing still uses blog-greenhouse.png
      (strawberries). Now inconsistent with the cannabis-led indoor-growing
      page. Note it is NOT driven by ag-markets.ts — /ag/index.astro has its own
      local `sectors` array with its own images. hero-cannabis-poster.jpg could
      be reused there
- [x] Secondary nav (Genesis 360 / BotaniMax / Shop All): small drop shadow
      beneath it so it reads as a layer above the page when it peeks back in on
      an upward scroll. Sits on `.site-header-sub > div` in Header.astro — the
      element that carries the background, and the one that is display:none
      below lg, which keeps the shadow off mobile where the bar never shows.
      Offset downward only; the pinned row is at a higher z-index and paints
      over anything cast upward. Tucked state already sets opacity:0, so the
      shadow disappears with the bar on scroll-down — verified
- [x] Open Graph / social share meta added in src/layouts/BaseLayout.astro, so
      every page inherits it. og: + twitter: tags, canonical, and og:image
      width/height from social-share.png. Per-page `image` prop available to
      override the card on a single page. Required setting `site:
      'https://genesis360.com'` in astro.config.mjs — scrapers silently ignore a
      relative og:image, so the absolute URL has to come from Astro.site. Do not
      remove that config line or every share preview goes blank
- [ ] social-share.png is 1000x600. Works (above the 600x315 threshold for a
      large card) but under the recommended 1200x630, so it upscales slightly on
      high-DPI and the 1.67:1 ratio can get cropped to 1.91:1 by some platforms.
      Re-export at 1200x630 when convenient
- [ ] Confirm og:site_name should stay "Secure Logic" now that genesis360.com is
      the primary domain — set in BaseLayout.astro. Change if the share cards
      should read Genesis 360 instead

- [x] Landing page footer: dropped the "Privacy Policies" link. /privacy-policy/
      renders the full site chrome (header + full nav), which defeats the gate,
      so the link is now hidden whenever Footer.astro is in `minimal` mode. The
      real link is untouched on every interior page
- [x] Footer: removed the "Help" eyebrow label sitewide. In the four-column
      layout an invisible stand-in keeps the contact column's links on the same
      baseline as the Shop and About columns; the landing page's two-column
      layout has no eyebrow to align to, so it renders without one
- [x] Home hero typed headline: dropped the trailing period from every word, and
      bound the word to the video carousel instead of its own timer. HERO_WORDS
      in src/pages/index.astro is index-matched to the `data-hero-slide`
      elements — 0 swine "Barns", 1 chickens "Poultry Houses", 2 cannabis
      "Grow Rooms", 3 gym "Locker Rooms", 4 farm "Environments". selectHero()
      now kicks off the delete-and-retype, so the word turns over with the
      cross-fade. Reordering the <video> elements means reordering that array.
      The `.typed-hero-reserve` span holds the line width, so it must stay set
      to the widest word ("Poultry Houses")

- [x] Home hero copy: "Environments" leads the rotation — it is the company
      catch-phrase, so it shows first even though it sits over the pig clip.
      Chickens took "Barns", the farm clip took "Farms", and the gym clip went
      from "Locker Rooms" to "Gyms". HERO_WORDS in src/pages/index.astro
      frontmatter is now the single source: the markup renders it into the
      hidden reserve spans and the client script reads its copy back out of
      those, so the word list exists in exactly one place
- [x] Home hero: the reserve span that holds the headline's width now stacks
      every word into one CSS grid cell (.typed-hero-reserve in global.css), so
      the line sizes itself to the widest word. Replaces the hand-maintained
      longest-word string that had to be kept in sync by hand
- [x] Home hero videos: fixed the abrupt mid-shot loop cut. The carousel held
      every slide for a flat 5200ms while each video resumed where it left off,
      so on later passes the short clips (chickens 5.84s, cannabis 7.17s, gym
      7.24s) hit their loop point on screen. Slides now restart at frame 0 on
      every appearance and hold for min(6500ms, clipLength - 1200ms), so the
      loop point always lands off-screen — the 1200ms tail covers the 1000ms
      cross-fade, during which the outgoing clip is still playing. Clip length
      always beats the 6500ms cap. Also pre-warms every clip's metadata after
      window load (durations drive the holds, and slide 1 is shown before
      selectHero has ever warmed it) with a loadedmetadata re-measure as a
      fallback. swine 15s and farm 16s were never affected — they are long
      enough that the cap always won
- [x] Landing page header: logo left-aligned instead of centred. The centred
      logo assumed a nav cluster on both sides; the landing page has none on the
      left, so it hung over empty space. `minimal` now uses a two-column grid
      (logo left, CTA right) and the tap-to-call icon moved into the right-hand
      group beside the pill, since the left column is now the logo's. Still
      hidden at lg and up by the existing .sh-phone rule
- [x] Announcement bar: dropped the trailing link on the landing page. All three
      rotations collapsed to the same "Contact Us", which repeated the same call
      to action three times right next to the Contact Us pill below it. Full
      site keeps Get A Quote / See How It Works / Explore BotaniMax. Mobile
      min-height drops to 2.5rem there too — the 4.75rem was reserving a second
      line for the link that no longer exists
- [x] Announcement bar: rotations now cross-fade in place. They were animating
      opacity plus a 0.35rem upward translate, which read as a jump in a bar
      that short. Opacity only
- [x] Header logo is getting cut off — the width is funky. Fix the Genesis360 wordmark sizing/overflow in the header.
      Done 2026-09-03: two separate causes.
      (1) The cut-off was in the ASSET, not the layout. Genesis360-wordmark.png
      is cropped flush to the ink (3301px of ink in a 3302px canvas), which
      shaves ~1px off the widest point of the G's bowl and the 0. A circle is
      vertical at its tangent, so a 1px cut leaves a ~45px flat chord — clearly
      a sliced curve once scaled to header size. Re-extracted the wordmark from
      Genesis360-full-logo.png, whose lockup carries an intact copy: cropped
      3303x434+1350+5196, added 20x16px transparent bleed ->
      src/assets/images/Genesis360-wordmark-clean.png (3343x466). The original
      Genesis360-wordmark.png is left in place, unused. If a corrected export
      ever arrives, point the Header.astro import back at it.
      (2) It was also under-resolved: widths={[200,300]} against a ~194px
      display box means a 2x screen got a 300px source and a 3x screen got the
      same. Now widths={[200,400,600]}, verified picking the 600w candidate at
      dpr 3.
      Also moved the height off the inline style into .header-logo-mark (6.8
      spacing units = 27px, which puts the ink at ~25px since ~7% of the new
      asset's height is bleed) and added a 1024-1279px step down to 6 units.
      At 1024 the centred wordmark had only 28px of air before the RESOURCES
      menu; it now has 39px. No layout overflow at any width from 390 to 1920.
      Verified: 1024/1200/1440 desktop, 390 mobile, and the scrolled dark state
      where the gradient wordmark flattens to solid white.
- [x] Rename Secure Logic to Genesis 360 across the entire website, including the Open Graph metadata and the browser tab title. Leave email addresses and the footer copyright line as Secure Logic.
      Done 2026-09-03: 66 automated replacements across 28 files plus 8 hand
      rewrites. Ran as a masked substitution — URLs, emails, and any token
      containing "securelogic" were stashed before the replace and restored
      after, so a line could carry both prose to rename and a link that must not
      move. Every page title, og:/twitter: tag, PageHero eyebrow, alt, aria-label,
      nav summary, blog title/excerpt and body now reads Genesis 360.
      Also closes the earlier "confirm og:site_name" item above: it is now
      "Genesis 360". And the earlier "social-share.png is 1000x600" item — the
      old card was the SECURE LOGIC wordmark on a gradient, which would have
      shown Secure Logic on every share regardless of the meta tags. Rebuilt it
      from the flame + wordmark on a light mint field at the recommended
      1200x630. Old card is recoverable from git.
      DELIBERATELY LEFT ALONE, each because renaming breaks something:
        - footer copyright and every email (info@/marty@securelogicUSA.com)
        - Netlify form name `secure-logic-quote` in QuoteForm.astro. Renaming it
          orphans every submission already collected under that name.
        - blog slug `secure-logic-newfields-ag-...` and the four pages that
          reference it. Renaming 404s a published URL.
        - /docs/Secure-Logic-*.pdf brochure filenames (real files on disk)
        - social handles: facebook.com/SecureLogicUSA, instagram/securelogicusa,
          youtube @SecureLogic-Genesis360
        - every securelogicusa.com link, including the visible ones in blog CTAs
          and the privacy policy's "Our website address is:". These point at the
          live production site. They should flip to genesis360.com as part of
          the DNS cutover task above, not before it — pointing at a domain that
          does not resolve yet is worse than an old brand name.
        - comments that name a domain or a source-doc path (the mask covered
          them). One prose comment did get renamed with everything else:
          CertMark.astro's header. Harmless, and correct either way.
      FLAG FOR JOSHUA: the Newfields Ag press release is dated July 7 2025 and
      carries a direct quote attributed to "Marty Boquet, CEO and Co-Founder of
      Secure Logic". The blanket rename rewrote that attribution to Genesis 360.
      Rewriting the attribution inside a quote in a dated release changes a
      matter of record — say the word and that one post reverts to Secure Logic
      while the rest of the site stays renamed.
- [x] Replace Poppins with TeX Gyre Heros (added to src/assets/fonts/) as the website font.
      Done 2026-09-03: self-hosted, no font CDN left anywhere on the site.
      Converted the four upright/italic OTFs to woff2 with fonttools (580K ->
      240K) into public/fonts/. Chose public/ over src/assets so the URLs stay
      predictable and the two faces the chrome always paints can be preloaded
      in BaseLayout; the italics load on demand. @font-face block sits at the
      top of global.css. Swapped the three 'Poppins' font-family declarations
      (global.css x2, Header.astro x1) and put 'TeX Gyre Heros' at the head of
      Tailwind's `sans` stack — without that last one everything outside a .bl
      wrapper was still falling back to system UI.
      Removed the googleapis/gstatic preconnects and the Poppins stylesheet
      link. Verified zero requests to fonts.googleapis.com.
      NOTE ON WEIGHTS: Poppins was loaded at 400/500/600/700/800. Heros ships
      only 400 and 700, so CSS font matching rounds 500 down to 400 and 600 up
      to 700 — the semibold nav items now render bold. Deliberate; the
      alternative is synthetic weights, which smear the stems. The condensed
      family (texgyreheroscn-*.otf) was left unconverted, nothing uses it.
      The GUST e-foundry licence file stays alongside the source OTFs.
- [x] Header logo: replace the wordmark image with a text version set in TeX Gyre Heros, using the animated-text gradient CSS, but with the real logo colors — #6eb251 to #225a8f, full gradient left to right.
      Done 2026-09-03: the header wordmark is now live text, not an image.
      CHECKED THE COLOURS AGAINST THE ARTWORK FIRST, as asked. Sampled ink
      across the width of the real wordmark: it is a plain sRGB interpolation
      from #6FB254 at the far left to #24588C at the far right, left to right,
      no midpoint hue shift. Joshua's #6eb251 -> #225a8f is that gradient. Both
      are now :root tokens (--bl-brand-green / --bl-brand-blue) in global.css.
      THE ONE DEVIATION FROM THE PASTED CSS, and why: the snippet used a
      two-stop -45deg gradient at 300%. Two stops cannot loop — animating
      background-position 0 -> 100 -> 0 across a two-stop ramp spends most of
      the cycle showing a slice that is not the brand pair at all, and snaps at
      the loop point. Used three stops instead, green -> blue -> green, at
      background-size 200% 100% and 90deg. At position 0% the visible half is
      EXACTLY the logo as drawn (verified: sampled #6CB052 -> #245C8E against
      the artwork's #6EB154 -> #24588D); at 100% it is the mirror; the sweep
      crosses between them. Same 10s ease-in-out infinite timing.
      Both .animated-text and .animated-background are in global.css under
      @layer components; only .animated-text is wired up so far (the header
      wordmark). Keyframes sit outside the layer so the cascade can't drop them.
      TYPE: TeX Gyre Heros Bold is a near-exact match for the logo's letterforms
      — compared glyph by glyph against the artwork. 33px puts the cap height at
      ~25px, the same ink height the bitmap had, and letter-spacing 0.012em
      closes the last ~5% (the drawn logo is fractionally looser than the raw
      font). Rendered width 187px vs the image's 194px, so the row did not move.
      Scrolled state: the old rule filter-inverted the bitmap to white. Text
      can't do that, and the brand gradient is illegible on --bl-ink, so it now
      drops the clip and repaints solid white. -webkit-text-fill-color has to be
      overridden explicitly there; `color` alone loses to it.
      prefers-reduced-motion parks the gradient at 0% 50%, which is the logo's
      own colours — the mark still looks right, it just holds still. There is
      also a plain `color: #225a8f` under the clip for anything that doesn't
      support background-clip: text.
      Removed the now-dead <Image> import and the wordmark import from
      Header.astro. Genesis360-wordmark-clean.png is no longer referenced by any
      code — kept on disk because it is a real brand asset and the social card
      was built from it, but nothing imports it now.
      Verified: 390 / 1024 / 1280 / 1440, landing + interior, scrolled state,
      the sweep at three points in its cycle, and a clean single page load with
      zero console messages and exactly two font requests.
- [x] Secure Logic is the parent company that owns the intellectual property that is Genesis 360. It will still be used, but Genesis 360 should be the brand recognized on the home/consumer-facing side.
      Done 2026-09-03: this corrected two factual errors the earlier blanket
      rename introduced — the site was claiming Genesis 360 IS the company, and
      had rewritten a quote attribution to match. Joshua chose the corporate +
      press release scope and a footer ownership line.
      THE RULE NOW IN FORCE: Genesis 360 leads everywhere consumer-facing. Secure
      Logic is used wherever the LEGAL ENTITY is speaking or being named.
      Restored to Secure Logic:
        - About page ([...slug].astro): eyebrow "About Secure Logic", the hero's
          "Secure Logic is a micro-droplet fumigation technology company", "the
          foundation of Secure Logic", and "At Secure Logic, we are committed to".
        - Newfields Ag press release, entity mentions only: the headline, the
          lede, "Secure Logic's automated, no-touch misting platforms", the About
          boilerplate, the PR contact line, and Marty Boquet's title (CEO and
          Co-Founder of Secure Logic, which is what the July 2025 release
          actually said). Same in blog-posts.ts: title, excerpt, description,
          imageAlt.
      Product names inside that release stayed Genesis 360 on purpose — "Genesis
      360 HVAC", "our Genesis 360 platform", "Genesis 360 Misting Systems" are
      products, not the company. Checked each of the 13 mentions individually
      rather than running another blanket pass.
      New footer line under the copyright, all 43 pages: "Genesis 360 is a Secure
      Logic brand." Inline after the copyright on desktop, stacked on mobile.
      Unchanged and still Genesis 360: every page title bar the press release's
      own headline, og:site_name, the header wordmark, nav, product pages,
      homepage, marketing copy, blog CTAs, contact page.
      Also saved to project memory (brand-architecture) so a future session does
      not re-flatten this into a single brand.
- [x] Scrolled header: instead of turning the logo solid white, keep it animated but with really light versions of the same brand colors.
      Done 2026-09-03: the scrolled rule used to kill the clip, the gradient and
      the animation and repaint solid white. It now overrides background-image
      ONLY — background-size, the clip and the sweep all survive from
      .animated-text — so the wordmark keeps moving on the dark bar in tinted
      versions of the same two colours.
      New tokens in global.css beside the full-strength pair:
        --bl-brand-green-light: #bedcb1   (#6eb251 + 55% white)
        --bl-brand-blue-light:  #b2c5d8   (#225a8f + 65% white)
      The blue takes MORE white than the green on purpose. Mixing both at the
      same ratio left the blue half visibly heavier, because #225a8f starts far
      darker than #6eb251 — matched the resulting lightness instead of the
      recipe. Measured against --bl-ink (#10204a): green 10.6:1, blue 8.9:1,
      both clear of 7:1 across the whole sweep. Solid white was 15.8:1, so this
      is a real drop, but a logotype has no WCAG contrast floor and 8.9 is still
      well past AAA for body text.
      `color` is still set as the fallback for anything without background-clip:
      text, switched to the light blue — the light green alone on this bar is
      the weaker of the pair.
      Reduced motion needed no change: its rule sets animation/background-position
      and the scrolled rule sets background-image/color, so they compose. Parks
      at light green -> light blue on the navy, verified.
      One thing I looked at and left alone: background-image does not transition,
      so the gradient swaps instantly while the bar fades over 0.32s — for about
      60ms the light wordmark sits on a half-faded bar. The nav links do exactly
      the same thing (they are fading to white over the same 0.32s and are
      equally washed out in that frame), so the logo is consistent with the rest
      of the chrome rather than newly wrong. Verified 1440 + 390, both states,
      the sweep across its cycle, and the parked reduced-motion state.
- [x] Header logo text: the real logo looks like a slightly thicker font weight with slightly less letter spacing. Match it as closely as possible.
      Done 2026-09-03: letter-spacing 0.012em -> -0.005em. No weight change, and
      the measurements say none is wanted.
      Fitted rather than eyeballed: rendered the wordmark across a grid of
      tracking and synthetic-stroke values, scaled each to the logo's cap
      height, aligned baselines, and scored pixel overlap (IoU) against
      Genesis360-full-logo.png.
      ON THE TRACKING — Joshua was right. -0.005em peaks at 0.868 IoU across
      "Genesis" and falls off cleanly either side (0 -> 0.817, -0.010em ->
      0.809). The old +0.012em was fitted to TOTAL width, which was the wrong
      target; it came out too loose.
      ON THE WEIGHT — the stems already match. Vertical stem as a share of cap
      height: logo 0.1866, Heros Bold 0.1848, 1.0% apart. The letters-only fit
      picks stroke 0 outright; every synthetic-stroke value scored worse. The
      "thicker" read is real but it is a density effect — the logo's LETTERS are
      5-7% narrower than Heros Bold at the same stem width, so the strokes take
      a bigger share of each glyph and it reads bolder. Tightening the tracking
      is what delivers that; adding stroke on top would double-count it.
      THE ONE THING THAT CANNOT BE MATCHED, and it is worth knowing: the digits.
      Normalised to cap height, the logo's "Genesis" is within a few percent of
      Heros Bold, but its 3/6/0 are 14/17/18% WIDER. Fitting the whole string
      caps out at 0.62 IoU; fitting the letters alone reaches 0.87. The digits
      are the entire residual, and an overlay shows it plainly — "Genesis"
      registers almost exactly, "360" drifts progressively right.
      Ruled out widening them with scaleX: the logo's digit walls are only ~6%
      thicker than its letter walls, so a 17% x-scale would overshoot the digit
      weight by ~11% and make "360" visibly bolder than "Genesis". Ruled out
      tracking the digits apart: it needs ~0.13em per gap (4.4px at 33px), which
      reads as deliberately letter-spaced, not as wider glyphs. The logo's
      digits are a different design, not an affine transform of Heros Bold's.
      Closing that last gap needs a different font for the numerals.
      Width went 194px -> 182px; still no layout impact (33px of clearance at
      1024, 150px at 1440, no overflow). Verified 1024/1440/390 and the scrolled
      light-gradient state.
- [x] Scrolled header logo: make the light gradient colors even more transparent.
      Done 2026-09-03, after one wrong turn. First attempt read "transparent"
      literally and put 0.7 alpha on the two tint tokens. Joshua: "0.7 is not
      right, it makes it transparent it should appear mostly white with the
      gradient at times." Alpha on a dark ground blends TOWARD the navy, so the
      mark got dimmer and greyer — the opposite of the ask. Reverted.
      What it does now: the wordmark reads WHITE on the dark bar, and the brand
      gradient passes through it at intervals instead of tinting it constantly.
      White dominates the ramp (0-16% and 67-100%) with the two colour stops in
      the middle third; background-size 300% means the visible window is white
      most of the cycle and the colour band sweeps across as the animation
      carries it. Both ends of the ramp are white so the loop has no seam.
      Walked the whole cycle in 10% steps to check it: all-white at the
      extremes, a clean green -> blue band travelling left to right through the
      middle, back to white. Contrast is white's 15.8:1 for most of the cycle
      and ~10:1 at the tinted moments, so this is BETTER than both earlier
      versions.
      The tint tokens went back to opaque and slightly more saturated
      (#a9d495 / #9dbbd8) — they are colour STOPS inside a white gradient now,
      not the whole fill, so washing them out further would just give a white
      logo that shimmers grey.
      Reduced motion parks at 0% 50%, which is white "Genesis" with a green
      tinge on the "360" — a good still frame.
      Unscrolled is untouched: full-strength pair at background-size 200%.
      Verified live at 1440 and 390.
- [x] Announcement bar at the top should transition out to the left and come in from the right, like a slider.
      Done 2026-09-03: was an opacity cross-fade in place, now the messages
      travel. All three still share one grid cell and the wrapper clips them.
      NO FADE. First pass kept the opacity transition alongside the transform
      and it left a dead beat mid-travel — the outgoing message had faded out
      before the incoming one arrived and the bar read empty. Slides are now
      fully opaque and position is the only thing animating, so as one leaves
      the other is already arriving. Traced the transforms to confirm: they move
      in lockstep, the pair always summing to one bar width.
      width: 100% on the slide matters more than it looks. The grid is
      justify-items: center, so without it each <p> is only as wide as its own
      text and translateX(100%) moves it by that text width — leaving it still
      partly inside the wrapper.
      Direction-aware: prev exits right and arrives from the left. The direction
      class lives on the bar because it has to flip the resting side of every
      parked slide at once. That flip has to be INSTANT — toggling it with
      transitions live sent an uninvolved third message gliding across the bar
      in full view. Caught it by tracing transforms; fixed by suppressing
      transitions, flipping, flushing with an offsetWidth read, then restoring.
      Same trick parks a spent slide back on the entry side.
      ACCESSIBILITY BUG THIS INTRODUCED, found and fixed: parked slides are only
      hidden by the clip, so their links stayed in the tab order. Tabbing into
      one made the browser scroll the clipped box to reveal it — measured
      scrollLeft jumping 0 -> 1312, which shoves the visible message out of the
      bar. Inactive slides are now `inert`, with a scroll listener on the track
      snapping scrollLeft back to 0 as a backstop for browsers without it.
      Reduced motion keeps the swap but drops the travel, and has to reinstate
      opacity — with the transform gone all three would otherwise stack at
      translateX(0) and render at once.
      Verified: next, prev, and a mixed next/next/prev/next/prev/prev run (one
      slide on screen at every step), auto-rotation still firing on its own,
      1440 and 390, reduced motion, clean console.
- [x] Give the Explore By Application section a linear gradient from top to bottom that fades seamlessly into the section below it.
      Done 2026-09-03: the section (#shop in index.astro) already had
      bg-gradient-to-b from-white, but it landed on brand-50 (#f2f6ff) against a
      brand-100 (#e3edff) neighbour — hence the line. Now ends on brand-100.
      THAT ALONE DID NOT FIX IT, which is the part worth recording. Sampling
      pixels down the boundary still showed a step: the last row of the section
      read (237,242,247) rather than the (227,237,255) its own gradient computed
      to. The culprit is .particle-field-light::after, a bottom-up haze overlay
      that paints hsl(210 38% 95%) — exactly (237,242,247) — ON TOP of the
      section background. It, not the section, is what the eye reads at the very
      bottom edge, so it had to match too.
      That class is used on four pages sitting above different-coloured
      sections, so hardcoding brand-100 would have broken the other three.
      Both gradient stops are CSS variables now, defaulting to the old colour;
      only index.astro and home-full.astro override them. Two variables rather
      than one because the fade-out stop has to be the same hue at zero alpha —
      fading to the `transparent` keyword is fading to transparent BLACK, which
      greys the middle of the ramp.
      Verified by pixel sampling across the boundary: (227,237,255) on both
      sides, converging smoothly, no step. /ag/ and /ag/hogs-livestock/ still
      compute the old (237,242,247) default, unchanged. Checked 1440 and 390.
      Left notes on both section tags: the section gradient end, the neighbour's
      background, and --particle-fade are three values that have to move
      together.
- [ ] Announcement bar is too wide on desktop — it should be fairly small and centered, only as wide as necessary so the lines aren't breaking into 2.
- [ ] Announcement bar rotates too fast — slow it down.

## Seperate TODOS (not for AI)
- match brand blue and green and then incorporate throughout the site 
- Find video of Mist spraying the camera 
- Does Marty want to pay for Slack? I recommend it. even if it's just for a few of the key players. 30 day pro trial
- Is the videographer actually using the proper equipment - gimbal? That means things can't be shaky. need PRO smooth
- GMB
