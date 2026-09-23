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
- [x] DNS cutover. genesis360.com is the primary domain; securelogicusa.com is
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
      Done 2026-09-16: verified live. Netlify's canonical host is
      www.genesis360.com (apex 301s to www). www.genesis360.com/ -> 200,
      www.genesis360.com/ag/ -> 302 location: /, securelogicusa.com and
      www.securelogicusa.com -> 301 https://genesis360.com/ (registrar
      forwarding; it answers 405 to HEAD, so probe with GET). The host-scoped
      gate fired with no changes needed.
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
- [x] /ag/ index card for Indoor Growing still uses blog-greenhouse.png
      (strawberries). Now inconsistent with the cannabis-led indoor-growing
      page. Note it is NOT driven by ag-markets.ts — /ag/index.astro has its own
      local `sectors` array with its own images. hero-cannabis-poster.jpg could
      be reused there
      Done 2026-09-16: the Indoor Crops card in /ag/index.astro now uses
      hero-cannabis-poster.jpg (1280x720, the same frame as the
      /ag/indoor-growing/ hero) with a matching alt. Only the import and alt
      changed; blog-greenhouse.png is still used by the blog post itself.
      Page is behind the gate, so this is visible on netlify.app only for now.
- [x] Secondary nav (Genesis360 / BotaniMax / Shop All): small drop shadow
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
- [x] social-share.png is 1000x600. Works (above the 600x315 threshold for a
      large card) but under the recommended 1200x630, so it upscales slightly on
      high-DPI and the 1.67:1 ratio can get cropped to 1.91:1 by some platforms.
      Re-export at 1200x630 when convenient
      Done 2026-09-16: the file on disk was actually 1375x825 (same 1.67:1
      ratio). Cropped it centred to 1375x720 (1.91:1) and resized to 1200x630
      with sips; only gradient background was lost top and bottom, the
      wordmark is untouched. BaseLayout reads width/height from the asset, so
      og:image:width/height now emit 1200x630 with no code change. Previous
      version is in git history if a re-export from the design source is
      preferred.
- [x] Confirm og:site_name should stay "Secure Logic" now that genesis360.com is
      the primary domain — set in BaseLayout.astro. Change if the share cards
      should read Genesis360 instead
      Done 2026-09-06: Joshua confirmed it should read "Genesis360". No code
      change needed — SITE_NAME in BaseLayout.astro:25 was already 'Genesis360'
      (the earlier sitewide rename caught it); the question outlived the fix.
      Verified in the served HTML: og:site_name content="Genesis360".

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
- [x] Rename Secure Logic to Genesis360 across the entire website, including the Open Graph metadata and the browser tab title. Leave email addresses and the footer copyright line as Secure Logic.
      Done 2026-09-03: 66 automated replacements across 28 files plus 8 hand
      rewrites. Ran as a masked substitution — URLs, emails, and any token
      containing "securelogic" were stashed before the replace and restored
      after, so a line could carry both prose to rename and a link that must not
      move. Every page title, og:/twitter: tag, PageHero eyebrow, alt, aria-label,
      nav summary, blog title/excerpt and body now reads Genesis360.
      Also closes the earlier "confirm og:site_name" item above: it is now
      "Genesis360". And the earlier "social-share.png is 1000x600" item — the
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
      Secure Logic". The blanket rename rewrote that attribution to Genesis360.
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
- [x] Secure Logic is the parent company that owns the intellectual property that is Genesis360. It will still be used, but Genesis360 should be the brand recognized on the home/consumer-facing side.
      Done 2026-09-03: this corrected two factual errors the earlier blanket
      rename introduced — the site was claiming Genesis360 IS the company, and
      had rewritten a quote attribution to match. Joshua chose the corporate +
      press release scope and a footer ownership line.
      THE RULE NOW IN FORCE: Genesis360 leads everywhere consumer-facing. Secure
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
      Product names inside that release stayed Genesis360 on purpose — "Genesis
      360 HVAC", "our Genesis360 platform", "Genesis360 Misting Systems" are
      products, not the company. Checked each of the 13 mentions individually
      rather than running another blanket pass.
      New footer line under the copyright, all 43 pages: "Genesis360 is a Secure
      Logic brand." Inline after the copyright on desktop, stacked on mobile.
      Unchanged and still Genesis360: every page title bar the press release's
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
- [x] Announcement bar is too wide on desktop — it should be fairly small and centered, only as wide as necessary so the lines aren't breaking into 2.
      Done 2026-09-03: my doing, from the slider work. The track was flex-1 so
      it spanned the whole bar — 1312px at 1440 — and since the slides fill the
      track (width: 100%, which is what makes translateX(100%) mean one bar
      across), that was also the distance every message had to travel.
      From sm up the track is now `flex: 0 1 auto; width: 34rem; max-width:
      100%` — a compact centred window with the two arrows closed in either
      side of it instead of pinned to the screen edges.
      34rem is sized off the copy, not picked by eye: measured each message's
      natural width with a width:auto clone — 397, 384 and 451px — so 544px
      clears the longest by ~90px and none of the three wraps. Confirmed by
      cycling all three and checking rendered height stayed at one line (16px).
      Below sm the track still stretches: the message is MEANT to wrap there and
      the bar is already sized for two lines plus the link. Mobile is unchanged
      at 286px track / 76px bar.
      Checked 640 / 700 / 768 / 1024 / 1920 and the minimal landing-page header:
      centred at every one, no overflow, one line throughout. At 640 max-width
      pulls the track to 512px, still clear of the 451px longest message.
- [x] Announcement bar rotates too fast — slow it down.
      Done 2026-09-03: rotation interval 5200 -> 8200ms desktop, 7600 -> 10400ms
      mobile. Measured the live gap afterwards at 8075 and 8273ms, so ~58%
      longer to read each message.
      The motion itself also calmed down without touching the transition: the
      width fix above cut the travel from 1312px to 544px, and the duration is
      still 0.55s, so each message now crosses less than half the distance in
      the same time. Left the duration alone deliberately — 544px in 0.55s is a
      good glide, and slowing it further would have the message still moving
      when the eye is ready to read it.
- [x] On mobile, remove the phone icon from the home page for right now.
      Done 2026-09-03: gated behind `const SHOW_LANDING_PHONE = false` at the
      top of Header.astro rather than deleted, because this was asked for "just
      right now" — flip the one word to bring it back.
      It only touches the `minimal` header, which is the landing page alone
      (index.astro is the only <Header minimal /> in the repo). The interior
      pages have their OWN tap-to-call icon in the left column, on the other
      branch of the same component; verified it still renders and is still
      visible on /genesis360mistingsystems/.
      No desktop effect either way — .sh-phone is display:none at lg and up, so
      the icon only ever showed on mobile.
- [x] "Engineered for Facilities That Can't Afford Inconsistency" stats: lay them out as a 2x2 grid on mobile instead of all stacked.
      Done 2026-09-03: was `grid gap-10 sm:grid-cols-2 lg:grid-cols-4`, so the
      base case was one column. Now `grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-10
      lg:grid-cols-4` — 2x2 from the smallest width up, 4-across at lg as before.
      The column gap is the only other change: 40px between two columns at 390px
      leaves 155px per cell, which crowds the 96px icons and the two-line copy
      under them. 20px below sm gives 165px cells and reads properly; sm and up
      goes back to 40px so nothing above mobile moved.
      Verified the computed layout at each step — 390 and 640 are 2x2, 1024 and
      1440 are 4x1, gaps at sm+ identical to before at 40px both axes.
      Applied to home-full.astro as well as index.astro, per the standing note
      in this file about keeping the parked original in sync.
- [x] Homepage header: change the CTA label from 'Contact Us' to 'Contact'
      Done 2026-09-04: Header.astro:167. The label lives inside the `minimal`
      ternary, so this is naturally scoped to the landing page only - interior
      pages still read 'Get A Quote'. Applies at all widths, not just mobile,
      since a label that changes by breakpoint would be worse.
- [x] Homepage header: the Genesis360 logo is not quite vertically centered, while the CTA button is perfectly centered
      Done 2026-09-04: Header.astro. Not a layout bug - both boxes already
      centred at the same midpoint. line-height equals font-size (33/33) and
      'Genesis360' has no descenders, so measured glyph ink sat 1.41px below its
      own box centre. Added `relative -top-[1.4px]` to the wordmark span; logo
      ink midpoint and pill midpoint now agree to 0.01px. Safe alongside
      .animated-text, which animates background-position, not transform.
- [x] Reduce the space above the 'Engineered For Facilities' section (the gap between it and the section above)
      Done 2026-09-04: index.astro. #shop was py-24 and the trust band py-20, so
      176px of stacked padding on mobile - and both sides sit on brand-100, so it
      read as one dead band. Now pb-10 sm:pb-24 and pt-10 sm:pt-20: 80px on
      mobile, desktop still 176px.
- [x] Mobile: center the eyebrow and title in the Genesis360 Platform section
      Done 2026-09-04: index.astro. text-center sm:text-left on the eyebrow and
      h2 only. NOTE: the paragraph under them is still left-aligned, which looks
      inconsistent under a centred heading. Left as-is because the task named
      only the eyebrow and title - flagged to Joshua for a call.
- [x] Mobile: the 'Contact Us To Learn More' button in the Genesis360 Platform section goes full width in a strange way
      Done 2026-09-04: index.astro. Cause was align-items:stretch - the anchor is
      inline-flex but sits as a direct child of a flex-col parent, so it stretched
      edge to edge. Added self-center sm:self-auto. Mobile 350px -> 274px and
      centred under the now-centred heading; desktop align-self back to auto,
      width unchanged at 298px.
- [x] Mobile: remove the ghosted circle in the Genesis360 Platform background
      Done 2026-09-04: index.astro. There were two decorative rings, not one (the
      white one top-right and a lime one bottom-left). Hid both below sm with
      `hidden sm:block`; both still render on desktop. Radial washes untouched.
- [x] Mobile: center the BotaniMax eyebrow, title, and paragraph
      Done 2026-09-04: index.astro. One change - `text-center lg:text-left` on the
      text column wrapper, which covers all three. lg is the right breakpoint here
      (the grid and the logo's mx-auto already switch there). The CTA was already
      justify-center lg:justify-start.
- [x] Increase the BotaniMax logo size from 20 width/height to 40 width/height
      Done 2026-09-04: index.astro. h-20 w-20 -> h-40 w-40 (160px rendered) and
      bumped the srcset to widths [160,320] / sizes 160px so it is not upscaled;
      source is 500x500. NOTE: there is no lg: override on that class, so this
      grew the logo on desktop too, not just mobile. Flagged to Joshua.
- [x] CRITICAL mobile fix: the BotaniMax spray bottle scroll effect is not working and covers up the button. Make that never happen on mobile; the bottle should still be cut off at the bottom
      Done 2026-09-04: index.astro. Root cause: the bottle is h-[44rem] (704px)
      centred inside an h-[32rem] (512px) cell, so it hung 96px above its own
      cell - and that cell sits directly under the text column, so the overflow
      landed on the CTA. The parallax then walked it further up (mobile translateY
      ran 80 -> 0 on scroll). Three-part fix, all below lg: cell gets
      overflow-hidden, the bottle is top-anchored (items-start), and the transform
      is forced to `none` in CSS with !important so it beats both the inline style
      and the script (no first-paint flash). Script now early-returns under 1024.
      Used `none` rather than scale(1.12) deliberately - scale grows from the
      element centre and would push the top edge back over the button.
      Verified: zero overlap across 11 scroll positions; desktop parallax still
      animates (translateY 80/188/125).
- [x] Mobile: center the How It Works / Droplet Performance eyebrow, title, and Contact Us button
      Done 2026-09-04: index.astro. text-center lg:text-left on the eyebrow and h2;
      the CTA is .bl-pill (inline-flex) so it got a flex justify-center
      lg:justify-start wrapper, matching the BotaniMax block's existing pattern.
      Pill stays 272px at both widths - it does not stretch. NOTE: as with the
      Platform section, the paragraph here is still left-aligned under a centred
      heading, since the task named only eyebrow/title/button.
- [x] Keep the hamburger menu for mobile on the current home page: give it a dropdown with 'Contact' linking to the form, and show the phone number and email address
      Done 2026-09-04: Header.astro + index.astro. The burger and drawer machinery
      already existed, just gated behind !minimal. Added a burger inside the
      minimal right-hand cluster (minimal collapses the row to two columns and the
      logo owns the first, so it could not reuse the full header's col-start-3
      placement) and a three-item drawer: Contact -> #contact, tel link, mailto.
      Header now takes a contactEmail prop mirroring Footer, and index.astro passes
      CONTACT_EMAIL, so the drawer shows marty@ not the general inbox.
      DECISION: the header's Contact pill is now hidden below lg on the minimal
      header. Logo + pill + burger overflowed a 390px row (417px scrollWidth), and
      the drawer already carries Contact, so the pill was both redundant and the
      thing breaking the layout. Mobile = burger, desktop = pill. Flagged to
      Joshua in case he wants both kept and the logo shrunk instead.
      Verified: no overflow at 390 or 1440, drawer opens/closes, Contact closes the
      drawer and lands on #contact, scroll lock releases, one #sh-mobile-nav per
      page, /hvac/ drawer still has its full 28 links, build passes 43 pages.
- [x] Remove the em dash from the paragraph in the footer
      Done 2026-09-04: Footer.astro:32. '...coverage plan - no spam...' became
      '...coverage plan. No spam...'. The only em dash left in the file is in a
      code comment on line 3, not user-facing copy, so it was left alone.
- [x] Mobile nav drawer: make all the buttons the same styling (the Contact button is white, the others are light blue), and give the drop-down a darker background
      Done 2026-09-04: Header.astro. Contact was .bl-pill (solid brand blue, white
      text) while phone/email were .sh-mobile-phone (light blue). All three now use
      .sh-mobile-phone - identical background rgb(227,237,255) and text
      rgb(20,46,158), verified equal at runtime.
      Dark panel added as a scoped modifier .sh-mobile-nav--dark rather than a
      change to .sh-mobile-nav, because that base class is shared with the
      interior-page drawer whose mega-menu links are dark-on-light and would have
      vanished on navy. Confirmed /hvac/ still renders the light panel.
      Navy reuses --bl-ink / the footer gradient rather than a new colour. Also
      zeroed the first pill's top margin so the three gaps are even (0/12/12px).
      NOTE: Contact has no icon while phone and email do. Styling is identical;
      the icon difference is content, not style. Flagged to Joshua.
- [x] Remove all em dashes on the homepage, replacing them with commas or alternative punctuation
      Done 2026-09-04: index.astro, 5 strings. Found them by diffing the RENDERED
      text rather than grepping source - source has 44 em dashes across the
      homepage's files but 39 are code/CSS comments, and only 5 ever reach a
      visitor. Header, AnimatedStatIcon, CertMark and Footer needed no change.
      Replacements (colon where the following clause is itself a comma list, so a
      comma would have been ambiguous):
        'portable deployment-three ways'      -> colon
        '150+ plant actives - a patent-pending' -> colon
        'dry-mist droplets - small enough'     -> colon
        'Environmentally neutral - no residue' -> colon
        testimonial 'game changer for us - not only' -> comma
      NOTE: that last one is a customer quote (David Sark). Punctuation only, no
      wording changed, but flagged since it is attributed speech.
      Verified 0 em dashes in both the served HTML and the live DOM (the DOM check
      also covers the JS-rendered hero words and announcement slides).
      NOT touched: /home-full/ (home-full.astro), which is a separate reviewable
      copy of the old homepage and still contains its own em dashes.
- [x] Remove the arrow from the 'Contact Us To Learn More' button in the Genesis360 Platform section
      Done 2026-09-04: index.astro:793. Dropped the <ArrowRight> and the now-dead
      gap-2 on the anchor.
      Worth knowing: the pattern `{CTA_LABEL} <ArrowRight ... />` appears 4 times
      in this file, so a string replace would have stripped the arrow from three
      other CTAs as well. Edited by line number instead. Verified after: platform
      CTA has no svg and its text is intact, and 7 other CTAs still have arrows.
      ArrowRight import stays - still 3 other uses.
- [x] Make the background flow seamlessly from the Explore By Application section into 'Engineered for Facilities That Can't Afford Inconsistency'. On mobile there is a shadow under the agriculture card and the spacing is unbalanced. Options: reduce the padding above Engineered so it matches the padding below the card, reduce the shadow on mobile, or make the shadow overflow visible
      Done 2026-09-04: index.astro:706. Root cause was the third option, and it
      was a clipping bug rather than a spacing one. shadow-deep on the cards is
      `0 26px 70px`, so it needs ~96px below the card to fade out, but there were
      only 24px before the section ended AND #shop carried overflow-hidden. The
      shadow was cut mid-fade, leaving a hard horizontal step exactly at the
      boundary - which is what read as 'not seamless'.
      Fix: dropped overflow-hidden from #shop. Safe because .particle-field
      already has its own `absolute inset-0 overflow-hidden`, so the particles
      stay clipped, and each card clips its own hover-scaled image. Verified:
      particle-field overflow still hidden, 0 media escaping the section bounds,
      no horizontal overflow at 390 or 1440.
      Did NOT change padding or shadow size - the other two options you offered
      were alternatives to the same symptom, and the clip was the real cause.
      Spacing now measures: card -> heading 80px, heading -> stat grid 48px.
      Flagged to Joshua in case he still wants that 80 pulled closer to 48.
- [x] Product cards (Compact Mist / Portable Mist) look bad on mobile - stack the text and image vertically instead of splitting the horizontal space 50-50
      Done 2026-09-05: the two side cards in the systems grid had the image
      absolutely positioned at w-[58%] with the copy capped at max-w-[62%], so a
      390px phone got two ~210px columns. Below sm they now stack (card is
      flex-col, image is a relative h-52 band on top, copy full width beneath);
      at sm and up the original absolute split is restored unchanged. Applied to
      both src/pages/index.astro and src/pages/home-full.astro. Verified at 390,
      640, 820, 1440 - desktop geometry identical to before (522x238, image at
      x=219).
- [x] Replace marty@ email on the page with info@genesis360.com
      Done 2026-09-10: src/pages/index.astro:35 - CONTACT_EMAIL flipped from
      marty@securelogicusa.com to info@genesis360.com. It was the only marty@ in
      src/ or public/, and it feeds the minimal Header, the minimal Footer, and
      the contact card's mailto + visible label (6 spots in the rendered page).
      Updated the comment above it, which still claimed enquiries route to Marty
      rather than the general info@ inbox. genesis360.com MX resolves to
      Microsoft 365, so mail is configured for the domain - mailbox existence not
      verified. Note the rest of the site still uses info@securelogicUSA.com
      (Footer, Header, QuoteForm, [...slug].astro); those flip at DNS cutover.
- [x] All "mist" terminology needs to be "dry fog"
      Done 2026-09-10: 24 files. Joshua chose the full sweep including SKUs, so
      product names went too: InRoomMist/HVACMist/MobileMist/MedicalMist/
      PortableMist/Compact Mist -> "InRoom Dry Fog" etc, AgMist -> "Ag Dry Fog",
      AGriGuardMist -> "AGriGuard Dry Fog", "Misting System(s)" -> "Dry Fog
      System(s)", and all prose/alt-text/meta uses of mist, misting and dry mist
      -> dry fog. 0 visible occurrences left across all 43 rendered pages
      (verified by stripping tags from dist/ and grepping the text content).
      Deliberately NOT renamed, all invisible to visitors: the /genesis360-
      mistingsystems/ URL (223 refs - moves at DNS cutover, not before), the
      --mist-* CSS custom properties and .mist-field/.mist-particle classes in
      MistField.astro, the mistPresets/portableMist/hvacMist/medicalMist JS
      identifiers, the *-mist.png asset filenames, and the Genesis-misting-Trial
      PDF. "chemistry"/"chemistries" also masked - it contains the letters mist.
      Two substitutions were semantically wrong and got hand-fixed: "misting
      bottles" (a handheld spray bottle for gear, not the platform) became
      "spray bottles", and greenhouse "overhead misting lines maintain
      consistent humidity" (humidification, not disinfection) became "overhead
      humidification lines". Also: normalized "In Room Dry Fog" to "InRoom Dry
      Fog" so the homepage lineup matches the systems page, and added a
      TITLE_OVERRIDES map in [...slug].astro because that page derives its tab
      title from the raw slug and was rendering "Genesis360 |
      genesis360mistingsystems" - now "Genesis360 | Dry Fog Systems".
      Build passes (43 pages). npm run check has 8 pre-existing errors in
      index.astro/home-full.astro from an unclosed {/* */} comment inside a div
      attribute list - identical to HEAD, unrelated to this change.
- [x] Launch the hog page: make only the home page and the hog page available. All other pages, including the Ag page, should not be available at this time (same approach as the previous soft launch).
      Done 2026-09-16: /ag/hogs-livestock/ is the one interior page opened
      behind the existing gate; everything else (incl. /ag/) still 302s to /.
      * public/_redirects: a `200!` rewrite-to-itself block for
        /ag/hogs-livestock (bare + splat, all 4 hosts) placed ABOVE the `# ag`
        splat, since Netlify takes the first matching rule. Mechanics verified
        on a throwaway draft deploy: hog page 200, /ag/poultry/ + /ag/ 302 -> /.
      * New src/data/launch-gate.ts (SOFT_LAUNCH, CONTACT_EMAIL, CONTACT_HREF,
        CTA_LABEL). index.astro now imports the email + label from it.
      * Hog page renders Header/Footer `minimal` while SOFT_LAUNCH is true, the
        hero CTA and closing AgCta point at /#contact, and the related-posts
        row (all gated blog links) is hidden. Built HTML checked: the only
        internal links are /, /#contact, #deployments, tel:, mailto:.
      * Header, Footer, AgCta grew a `contactHref`/`href` prop so the minimal
        chrome can point at the landing page's #contact from another page.
      * Landing page: the Agriculture card in "Explore By Application" now
        links to /ag/hogs-livestock/ ("Explore Hogs & Livestock"); Human and
        HVAC cards still go to #contact. That is the only way in from the
        landing page; the minimal header deliberately has no nav.
      * Observed: DNS cutover has landed. www.genesis360.com is served by
        Netlify and the gate is firing (/ag/ -> 302 /). Apex 301s to www.
      NOT pushed. Goes live on the next push to master (Netlify builds from
      the repo). After deploy, verify:
        curl -sI https://www.genesis360.com/ag/hogs-livestock/ | head -1  -> 200
        curl -sI https://www.genesis360.com/ag/ | grep -i location        -> /
- [x] Make "One platform, three ways to deploy it" and anywhere else on the website that describes how Genesis360 is delivered/deployed accurate to the new source of truth: brochures/Genesis360 Pricing Model - External.
      Done 2026-09-16: source read from src/assets/brochures/Genesis360 Pricing
      Model - External.docx (the Sales Pricing Guide). Its packaging: core
      platforms Compact Wall Mount, AeroGuard, Battery Powered Fogger; market
      packages EnviroGuard / MediGuard Pro / AgriGuard Mini Pro / GrowGuard
      Pro / AeroGuard; AgriGuard large-barn custom builds (8/16/24 nozzles).
      * Hog page "One Platform. Three Ways To Deploy It." cards renamed and
        re-described to the guide: Handheld -> Battery Powered Fogger;
        Mini -> AgriGuard Mini Pro (Compact Wall Mount Pro: 2 nozzles + PLC
        Smart Board/App, small rooms in livestock zones); Custom -> AgriGuard
        (custom-built, 8/16/24 app-controlled nozzles, up to ~45,000 sq. ft.,
        after an on-site evaluation). Intro sentence and image alts updated.
        Heading kept. This re-words the M3 copy from the earlier deck pass.
        No prices on the page — the guide is marked not for customer
        distribution.
      * AgCta closing copy on the hog page and /ag/: "handheld, fixed, or
        custom deployment" -> "portable, fixed, or custom AgriGuard deployment".
      * Fixed the product-name misspellings AGriGuard / AgGriGuard -> AgriGuard
        in two blog bodies (incl. the Newfields press release) and the
        hogs-livestock heroCopy in ag-markets.ts.
      * Checked and left alone as already consistent: landing + home-full
        "two core platforms" cards (Compact Wall Mount, AeroGuard) and the
        lineup note (portable foggers, mobile stands, large-barn builds).
      * Not changed, flag for Marty: "BAC Ag" is still named as the livestock
        liquid in a homepage testimonial quote, ag-markets.ts, and two blog
        bodies. The guide calls the livestock liquid BioSecure AP. The quote is
        a customer's words, so I did not rewrite it.
      * Also noticed: the unused `systems` list in src/pages/[...slug].astro
        still carries old names (InRoom / Compact / Mobile / Medical Dry Fog,
        "Kinetic Systems"). It never renders, so left as-is.
- [x] Project reference files live at /Users/joshuariley/Sites/securelogic-files (not in GitHub). Optionally move them into this repo for ease and gitignore them.
      Done 2026-09-16: moved the whole folder (~180MB: images, logos, webcopy
      decks, OneDrive dump, "Joshua Riley") to ./reference-files/ and added
      `reference-files/` to .gitignore. The two source-comment paths in
      ag/index.astro and ag/hogs-livestock.astro updated to the new location.
      ALSO gitignored `src/assets/brochures/*.docx`: the pricing guide is
      stamped "CONFIDENTIAL — NOT FOR CUSTOMER DISTRIBUTION" and this GitHub
      repo (Team-Riley-Web/securelogic) is PUBLIC. The file stays where you
      put it on disk, it just will not be committed. Delete that .gitignore
      line if you do want it in the repo; the three brochure PDFs are
      unaffected and still tracked.
- [x] Soft launch: if someone goes to Ag (e.g. adjusts the URL to /ag/), send them to the hog page instead of the landing page. Make note of this so we don't keep it when we undo the gate for the full launch.
      Done 2026-09-16: the `# ag` block in public/_redirects now 302s /ag,
      /ag/ and every /ag/* page (poultry, indoor-growing, ...) to
      /ag/hogs-livestock/ on all four live hosts. Verified on a draft deploy:
      /ag -> 302 -> hog page 200; /ag/poultry/ -> 302 -> hog page.
      UNDO NOTE, recorded in three places so it cannot be missed: the comment
      on the `# ag` block itself, the OPEN PAGES header in _redirects, and
      src/data/launch-gate.ts. Full launch deletes public/_redirects outright
      (that has always been the plan), which removes this rule with it. If the
      gate ever outlives the hog launch, point the `# ag` block back at /.
      Not pushed; ships with the rest of today's soft-launch changes.
- [x] Build out the entire site. It should match the quality of the ag and hogs page.
      Blocked 2026-09-16 (awaiting Joshua's answers, design not yet approved).
      Scoped as architectural: ~25 non-blog pages + the blog templates.
      Inventory: the ag section (4 pages) is the new standard; everything else
      is older — 15 pages share one 755-line catch-all template
      (src/pages/[...slug].astro: about, technology, botanimax, dry fog
      systems, resources x4, faqs, contact, quote, privacy, and the human +
      hvac hubs), human/[slug] and hvac/[slug] are 80-line hero + copy +
      related-posts templates over 7 markets, blogs are a 93-line template.
      Copy source gap: the only page-copy decks are the hog and ag ones. The
      master deck (reference-files/webcopy/SL_master-site-page-copy_08-19-26
      .docx) is 258 words: a nav (Home / Ag-greenhouse / HVAC / Human health /
      Resources / Shopping Cart, sub-pages Barn, Greenhouse, Athletic,
      Hospital, Commercial, Residential) plus a homepage mission block. That
      IA differs from the live site (human: schools/athletics/military/
      healthcare; hvac: residential/commercial/industrial; about, technology,
      botanimax...). Brochures/PDFs in reference-files/OneDrive_1_8-13-2026
      (Athletic e-brochure, AthleticGuard, HVAC, Technology Explainer,
      Tarleton case study, BotaniMax docs) can feed copy.
      Needs decided before design: (1) which IA governs, (2) whether Claude
      drafts copy from brochures + current pages or waits for decks,
      (3) build order, (4) whether "Shopping Cart" is in scope.
      Update 2026-09-16 (later): Joshua decided all four — current IA and
      mega-menu design stay (the deck's 5-item nav is a soft-launch nav
      only); Claude drafts copy from brochures + existing pages; order is
      Human, HVAC, product/about/technology, resources/utility, blog; shop is
      out of scope. Approach approved: shared sector blocks composed per
      page; Military kept as a lean standard page; athletics ROI qualitative
      only, no dollar figures. Design spec written:
      docs/superpowers/specs/2026-09-16-human-section-design.md (awaiting
      Joshua's read-through before the implementation plan is written).
      This umbrella entry is superseded by the five sub-project entries
      appended below; it stays unchecked until all five are done.
      Done 2026-09-17: all five sub-projects complete — Human, HVAC,
      Product/Company/Technology, Resources & Utility, and Blog — each with
      its own spec under docs/superpowers/specs/, all behind the
      soft-launch gate, all local commits, nothing pushed.
      docs/QUESTIONS-FOR-MARTY.md now holds every open decision accumulated
      across all five during the build.
- [x] Build-out 1/5 — Human section to ag/hog quality: /human/ hub + athletics (flagship), healthcare, schools, military. Spec: docs/superpowers/specs/2026-09-16-human-section-design.md
      Done 2026-09-16: five pages shipped. /human/ hub (tier: hub) follows
      the ag-hub pattern — split hero with gym footage, mission band, four
      flip sector cards, Delivery Is The Difference grid, posts row, CTA.
      /human/athletics/ (tier: flagship) is the flagship: video hero,
      argument band with the 72+ hr stat, three deployment cards (Battery
      Powered Fogger / EnviroGuard / Compact Pro), a cost-of-waiting stat
      band (Today vs. With Genesis360), the Tarleton State case-study band
      with six at-a-glance figures and three verbatim quotes, posts, other
      markets, CTA. /human/healthcare/ (tier: standard+) uses clinic
      footage, MediGuard Pro + fogger cards, and lab-validation claims.
      /human/schools/ (tier: standard+) uses library-aisle footage with
      EnviroGuard + fogger cards. /human/military/ (tier: standard, lean)
      uses a still hero (the police-station scene, no acceptable clip
      found), Compact Wall Mount + fogger cards, and no package name from
      the pricing guide.
      Eleven shared components live under src/components/sector/ (SectorHero,
      ArgumentBand, StatBand, CompareBand, DeploymentCards, DifferenceGrid,
      CaseStudyBand, SectorCards, OtherMarkets, PostsRow, SectorCta).
      AgPostsRow and AgCta are now one-line wrappers around PostsRow/SectorCta;
      the ag pages were verified byte-identical after whitespace normalization
      in Task 1.
      human-markets.ts gained tagline, stat, package (pricing-guide names,
      each with a source comment), and hero {poster, video?}; the retired name
      "Medical Dry Fog" was removed.
      Footage: clinic.mp4 and classroom.mp4 sourced from Mixkit (sources in
      src/assets/videos/STOCK-SOURCES.md). Military has no acceptable clip and
      uses a still image instead.
      Deleted human/[slug].astro and the catch-all's human branch. The
      temporary kitchen-sink dev page (src/pages/dev/sector-blocks.astro) was
      deleted in this task. Build is back to 43 pages; astro check is still at
      the 8 pre-existing errors; brand check passes; no pricing appears
      anywhere on any of the five pages (checked with a grep sweep of the
      built HTML).
      Everything stays behind the soft-launch gate until full launch. All
      commits are local; nothing pushed.
      QA: screenshots at 500px (headless Chrome on this machine clamps
      requested widths below ~500px to an internal 500px viewport before
      cropping the screenshot, so 500px is the accurate stand-in for "phone
      width" here — verified with an injected scrollWidth/innerWidth probe)
      and 1280px for all five pages, captured to the session scratchpad under
      qa/ and reviewed by eye. One real defect found and fixed: at 1280px the
      hub's "HEALTHCARE" sector-card title overflowed its card and got
      clipped by the card's own overflow:hidden (the word is longer than the
      ag hub's original card titles, which is why the shared component's font
      size headroom hadn't been hit before). Fixed by capping the title's
      clamp() max font-size lower in src/components/sector/SectorCards.astro
      (both the resting and hover states); rebuilt and re-verified the title
      now renders in full, and re-ran the Task 11 assert-html.mjs check
      against dist/human/index.html (all lines pass). No other layout,
      overlap, or broken-image issues found on any page at either width; no
      genuine browser console errors (only macOS Chrome-headless system
      noise: CVDisplayLink/task_policy_set warnings, not page JS errors).
      Hover states on the sector cards were not exercised (static screenshots
      only show the resting state).
      FLAG FOR MARTY: every page's copy is Claude-drafted from the brochures
      and needs his read. The three Tarleton quotes are attributed to
      "Tarleton State University Wrestling" rather than named individuals.
      The Military hero is the police-station render and the Schools hero
      uses a school-library-aisle clip — both are stand-ins until better art
      exists. Queue entries appended today already ask for a different
      healthcare clip, a new athletics headline, and case-study band changes
      — those are known follow-ups, not part of this record.
      Final whole-branch review 2026-09-16: clean after one fix commit
      (c19bf01): closing CTAs on all five pages now go to /get-a-quote/ like
      the hero CTA; hub cards and the athletics band got dedicated poster alt
      text; gym and military hero posters are 1280-wide JPEGs instead of 2 MB
      PNGs; hub pill label shortened; two unused renders removed. Deferred
      minors carried in the review: hero video has no reduced-motion fallback
      (site-wide pass later), the `[...slug].astro` product list still says
      "Kinetic Systems" (pre-existing), and mobile QA was at 500px because
      headless Chrome on this Mac clamps narrower captures.
- [x] Build-out 2/5 — HVAC section to ag/hog quality: /hvac/ hub + residential, commercial, industrial, reusing the Human section's sector blocks. Spec: docs/superpowers/specs/2026-09-17-hvac-section-design.md
      Done 2026-09-17: four pages completed. /hvac/ is the hub;
      /hvac/residential/ is the flagship; /hvac/commercial/ is standard+;
      /hvac/industrial/ is the lean standard page. The hub and market pages
      compose the shared sector blocks introduced for Human, with two new
      reusable flagship blocks: CoverageMap and StepsBand. The final market
      page order is posts, CTA, other HVAC markets, then footer.
      hvac-markets.ts now carries tagline, stat, package, and hero
      { poster, posterAlt, video? } data. Residential uses home-interior.mp4,
      commercial uses rooftop-unit.mp4, and industrial uses plant-air.mp4;
      all three have dedicated poster fallbacks. The hub uses the existing
      application-hvac.mp4 footage. The short black-and-white commercial
      rooftop loop was accepted for this pass.
      Retired hvac/[slug].astro and the HVAC branch in the catch-all route;
      the temporary dev kitchen sink was removed. The production build is
      back to 43 pages. Brand and link sweeps pass, every HVAC route has one
      h1, no pricing or retired HVAC names appear in the section, and astro
      check remains at the same 8 pre-existing homepage errors with no HVAC
      diagnostics.
      QA: all four pages were reviewed at 500px and 1280px, including a
      forced hub-card reveal and all six residential coverage-map callouts.
      One real issue was found and fixed: the three market pages had their
      Other Markets strip before the closing CTA; all now follow the approved
      CTA-then-market-strip order. No broken images, overflow, overlap, or
      genuine browser console errors remain. Captures are under
      .gstack/browse-reports/2026-09-17-hvac-final/screenshots/.
      Everything remains behind the soft-launch gate. All commits are local;
      nothing pushed.
      FLAG FOR MARTY: Questions 21–23 are in
      docs/QUESTIONS-FOR-MARTY.md. All copy is drafted from the brochure and
      needs his read.
- [x] Build-out 3/5 — Product and technology pages to ag/hog quality: Genesis360 systems (/genesis360mistingsystems/), BotaniMax, About Us, Technology. Spec: docs/superpowers/specs/2026-09-17-product-company-design.md
      Done 2026-09-17: four static pages replace the catch-all's product/
      company branches, on a new ProductHero and DropletComparison
      component. Tiers: /genesis360mistingsystems/ and /botanimax/ are
      flagship; /about-us/ is standard+; /about-us/technology/ is a
      flagship-level technical page.
      /genesis360mistingsystems/: five-product lineup (Compact Wall Mount,
      AeroGuard, MediGuard Pro, Battery Powered Fogger, AgriGuard), a
      Compact Wall Mount spec panel (1-gallon tank, ~85 min single-nozzle /
      ~42 min dual-nozzle, sub-10-minute cycle) from the AthleticGuard sheet,
      and the documented droplet comparison table.
      /botanimax/: EPA registration stated by number only (Reg. No.
      92089-2-103661, no 25(b)/25(c)/2(c) category claim), the three named
      botanical actives (thyme, wintergreen, citrus), label-backed organism/
      contact-time cards (90 sec SARS-CoV-2, 5 min human coronavirus &
      surrogates, 10 min bacteria, 10 min fungicidal), and a CAUTION/
      label-use note. No claim that the label covers fogging/misting as an
      application method.
      /about-us/: the founder story kept as company history rather than a
      technical claim; operating principles (precision, repeatability,
      practicality); a four-step company path; closing CTA with a real
      product photo (not a render).
      /about-us/technology/: the real comparison table (pump 80-300 micron,
      ULV foggers 20-50 micron, electrostatic 40-80 micron, Genesis360
      sub-10 micron, replacing an old invented "30-120 micron" figure);
      four named transport forces (air turbulence, thermal currents,
      Brownian motion, electrostatic forces); a qualified "dry to human
      touch" explanation with an explicit non-safety-claim disclaimer;
      standard-timer-vs-optional-smart-control framing (never described as
      standard equipment); the Element Materials Technology validation
      figures (>=6-log viral, >=5-log bacterial reduction in cited
      controlled tests).
      No prices, no patent claims, no "Genesis 360" (space), no retired
      product names, no unqualified safety/corrosion/environmental-
      neutrality language. Every quantitative or regulatory claim carries a
      source comment. Catch-all branches and their now-unused constants and
      imports are fully removed; every other branch (resources, faqs,
      contact-us, get-a-quote, privacy-policy) is untouched. Build stays at
      43 pages; astro check remains at the 8 pre-existing homepage errors;
      brand check passes; no broken internal links; one h1 per page.
      QA: all four pages reviewed at 500px and 1280px. No overflow, broken
      images, clipped product art, or unreadable tables. Minor cosmetic nits
      accepted as-is: the EPA proof strip renders as two stacked lines
      rather than one sentence (same information); the four field-problem
      cards on About Us aren't paired one-to-one with an automation
      response (addressed later, diffusely, in Principles and Path); the
      validation panel's lab name sits in its own stat tile alongside the
      two log-reduction figures.
      Provenance: implemented by the user directly in Codex in a separate
      session on this repo, reviewed and QA'd here before commit. This
      session also found and repaired a stale-write hazard in TASKS.md
      unrelated to this feature (see commit 320d474) before continuing.
      Everything remains behind the soft-launch gate. All commits are
      local; nothing pushed.
      FLAG FOR MARTY: Questions 1-8 in docs/QUESTIONS-FOR-MARTY.md (EPA
      wording, emerging-pathogen claim, patent status, plant-actives count,
      kill claims, BAC Ag vs. BioSecure AP naming, the five-product lineup,
      Genesis360 vs. Secure Logic voice) all apply directly to these four
      pages. All copy is drafted from the label/SDS/promo sheets and the
      Technology Explainer and needs his read.
- [x] Build-out 4/5 — Resources and utility pages to ag/hog quality: Resources hub, brochures, documentation, FAQs, Contact Us, Get A Quote, Privacy Policy. Needs its own spec.
      Done 2026-09-17: seven static pages replace the catch-all's remaining
      utility branches. Tiers per spec
      (docs/superpowers/specs/2026-09-17-resources-utility-design.md):
      /resources/ is standard+ (hub, four-card grid to Blog/Brochures/
      Documentation/FAQs); /resources/brochures/, /resources/documentation/,
      /resources/faqs/, /contact-us/, /get-a-quote/ are standard;
      /privacy-policy/ is standard (legal) — deliberately plain, no hero
      video, no reveal animation, no closing CTA band beyond the shared
      footer, so the legal text reads as static text rather than marketing.
      Two documents are now self-hosted (added in Task 1 of this plan): the
      BotaniMax EPA Master Label and SDS, copied from reference-files and
      served from public/docs/. Three documents stay external on
      /resources/documentation/ — the Efficacy Lab Report, Staph Efficacy Lab
      Report, and Industrial Hygiene White Paper — because no local copies
      exist in any reference folder available to this build; they still link
      to the WordPress media library
      (securelogicusa.com/wp-content/uploads/2025/04/...), which is
      scheduled to change at the DNS cutover. Local copies are now asked for
      in Marty question 24 below, so they can be self-hosted the same way as
      the label/SDS before that cutover breaks them.
      Two new brochures added to /resources/brochures/: Athletics (sub-10-
      micron dry fog for wrestling/weight rooms) and HVAC (AeroGuard for
      coil/drain pan/duct pathway), each with its own rendered cover
      thumbnail matching the three existing brochures' portrait style.
      One new FAQ added to /resources/faqs/: "Is BotaniMax EPA registered?",
      answering the BotaniMax-audit gap with the Reg. No. 92089-2-103661
      federal registration, sourced from the label.
      /faqs/ now 301-redirects to /resources/faqs/ so the old short URL
      doesn't 404; the catch-all's seven retired branches (resources,
      resources/brochures, resources/documentation, resources/faqs, faqs,
      contact-us, get-a-quote, privacy-policy) and their now-unused
      constants/imports are fully removed from src/pages/[...slug].astro,
      which now serves only home-page. Build holds at the 43-page baseline
      recorded in Task 1.
      QA: link sweep (no BROKEN hrefs, one h1 per page) and browser QA at
      500px and 1280px for all seven pages, including both new brochure
      covers, the documentation page's sticky label image, and the FAQ
      accordion (verified as native <details>/<summary>, semantically
      correct; resting-state screenshots only, per the same convention as
      the earlier build-out QA passes not exercising hover/open states).
      No genuine defects found — nothing needed a fix or rebuild. One
      capture artifact, not a site bug: the embedded Pipedrive form on
      /get-a-quote/ and /contact-us/ needs several seconds to load its
      external script in a from-cold headless capture, so a screenshot taken
      too early shows blank space where the form fields render; re-capturing
      with a longer wait shows the Name/Email fields load correctly.
      astro check remains at the same 8 pre-existing homepage errors with no
      new diagnostics; brand check passes; no `$` figures on any of the
      seven pages.
      Everything stays behind the soft-launch gate. All commits are local;
      nothing pushed.
      FLAG FOR MARTY: two new questions added to
      docs/QUESTIONS-FOR-MARTY.md under "Resources & Documentation" (24-25)
      — local copies of the three external documents, and whether
      counsel-reviewed Privacy Policy text exists or the placeholder should
      stay.
- [x] Build-out 5/5 — Blog index and post templates to ag/hog quality. Needs its own spec.
      Done 2026-09-17: scope was narrower than the other four build-outs by
      design. Spec: docs/superpowers/specs/2026-09-17-blog-design.md. Only
      the blog index hero changed — the flat PageHero was replaced with
      SectorHero (src/pages/blogs/index.astro), matching every other
      section's eyebrow/headline/support/poster/CTA pattern. Used
      contact-bg.jpeg as the poster (already imported for the Contact/Get A
      Quote pages); judged it read well cropped into a wide hero before
      using it. The featured-post block, the three-column grid, and the
      closing QuoteForm band are untouched.
      The post template (src/pages/blogs/[slug].astro) and all 14 post
      bodies were deliberately left alone — a compliance sweep run before
      this plan was written found them clean: no EPA category-code
      violations, no retired product names, no "Genesis 360" with a space,
      no patent claims. The two dollar figures present in post bodies are
      cited industry statistics (an FAO crop/livestock loss estimate and an
      Indoor Air productivity-gains estimate), not pricing.
      Build holds at 43 pages; astro check remains at the same 8
      pre-existing homepage errors with no blog diagnostics; brand check
      passes; zero dollar figures render on the index page.
      QA: served dist/ and reviewed /blogs/ at 500px and 1280px plus
      /blogs/are-you-missing-these-3-high-risk-hotspots/ at 1280px. The new
      hero is legible at both widths, the featured-post/grid layout below it
      is unaffected, and the post page renders exactly as it did before this
      plan. No defects found.
      Everything stays behind the soft-launch gate. All commits are local;
      nothing pushed.
- [x] Hog page should be in the main nav next to the Contact button (soft-launch minimal header).
      Done 2026-09-17: the soft-launch (minimal) header shows a "Hogs &
      Livestock" outline pill immediately before Contact on desktop and as the
      first drawer item on phones. Soft-launch only; it lives inside the
      `minimal` branch of Header.astro and comes out with it. The full
      mega-menu header is untouched. Merged from batch-a-hog-header (8c61bfc).
- [x] Clarifies the hog-page nav task above: this will be a "soft-launch nav" - I don't want to get rid of the old nav design. Keep the full mega-menu design for the full launch; the soft-launch nav is a temporary variant.
      Done 2026-09-17: honoured. Only the `minimal` variant changed; the old
      nav design is intact for the full launch (Marty Q17 confirms the plan).
- [x] Hog page: reduce the spacing between the coverage-map section and the closing "Start With The Barns You Run Hardest." CTA (large empty band between them on desktop, see screenshot 2026-09-16).
      Done 2026-09-17: the barn stage's aspect ratio went 1.98 -> 2.2 (the
      artwork keeps its size and centre, so every callout anchor was rescaled
      exactly) and the section's bottom padding was trimmed; the CTA sits 116
      px higher at 1280 wide. Mobile layout unchanged.
- [x] Hog page: the "Start With The Barns You Run Hardest." CTA section should probably have a white background and some other sort of photo, graphic, or design to it.
      Done 2026-09-17: SectorCta gained a `photo` variant (white ground,
      copy left / 4:3 photo right at lg, photo-then-copy stacked on phones);
      the hog page uses it with baby-pigs-3.jpg ("Piglets in a clean nursery
      pen"). Every other page keeps the default variant, which renders
      byte-identically to before.
- [x] Sector landing pages (Human, HVAC hubs): use videos like the ag page (pictures work too, but they all should match the agricultural design). Pull out as much of the similar content as possible: the ag page breaks down each of its three sub pages, do that within Human and HVAC too.
      Done 2026-09-17 for Human: the /human/ hub has the ag hub's split video
      hero (your Compact product photo as poster, gym footage), mission band,
      four flip sector cards that break down the sub pages, the Difference
      grid and CTA. HVAC gets the identical treatment in build-out 2/5, whose
      spec and plan are written and whose first task is running.
- [x] Sector sub pages (human and HVAC markets): match the design of the hog page as closely as possible, with consistency across every one of these internal pages (healthcare, schools, athletics; then residential, commercial, industrial).
      Done 2026-09-17 for Human: athletics is the flagship (video hero,
      argument band with stat, deployment cards, stat + compare band, case
      study, posts, CTA); healthcare, schools and military carry the standard
      tier of the same blocks. HVAC follows in build-out 2/5 (residential
      flagship, commercial standard+, industrial lean).
- [x] Blogs / From The Field rows: always show three posts, even if the second and third are not closely related; fill with something more generic rather than showing fewer.
      Done 2026-09-17: src/data/related-posts.ts picks a market's own posts
      first and fills from a generic human-health list, capped at three; all
      four Human sector pages use it (3 cards each, verified in the build).
      The HVAC plan does the same with an HVAC fill list. Merged from
      batch-d-crosspage (ed2dad8).
- [x] The "Other Human Health Markets" block should come last, after the pre-footer CTA, and should be a different design from the current card grid.
      Done 2026-09-17: OtherMarkets is now a compact dark pill strip (eyebrow,
      one heading, icon + title pills) and renders after the closing CTA on
      every Human sector page; props unchanged so HVAC reuses it.
- [x] Really pull from any of the brochures we have (reference-files) for the copy and content of the Human and HVAC sections.
      Done 2026-09-17: the Human pages were drafted from the Athletic
      e-brochure, Compact sheet, competitive comparison, Tarleton case study
      and lab report; three document audits (docs/audits/2026-09-17-*.md)
      then corrected the rest of the site against the BotaniMax, technology
      and HVAC documents; the HVAC spec is built from the HVAC brochure.
- [x] Find a different video for the hero of /human/healthcare/ - ideally someone cleaning medical equipment or a surgical room (replaces the current doctor-walking-a-hallway clip).
      Done 2026-09-17: clinic.mp4 is now a clinician in full PPE loading
      dental instruments into an autoclave (Pexels, "A Woman Sterilizing the
      Dental Equipments" by Fariborz MP, free license; 12 s, 1.4 MB, 1280x720,
      muted). Poster and hub-card alt updated; source recorded in
      src/assets/videos/STOCK-SOURCES.md. Mixkit had no usable
      sterilization or operating-room footage. Merged from branch
      batch-c-healthcare-clip (09ecbd3).
- [x] On /human/athletics/, make the hero headline "Athletes Fight For You. We Fight For Your Athletes" (currently "Your Athletes Fight For Wins. / We Fight For Your Athletes.").
      Done 2026-09-17: hero reads "Athletes Fight For You. / We Fight For Your
      Athletes." (trailing period added for consistency with sibling pages;
      easy to drop). Merged from batch-b-athletics (31b933d).
- [x] Athletics case-study band: shorten the title (e.g. "The Case Of Ringworm At Tarleton State") and reduce the line height of the intro paragraph beneath it.
      Done 2026-09-17: heading is "The Case Of Ringworm At Tarleton State.";
      intro line height tightened (leading-7/8) and capped at max-w-2xl.
- [x] Athletics case-study band: the at-a-glance stats are not vertically centered and "Eliminated / Daily Mopping" doesn't look right; fix the stat tiles.
      Done 2026-09-17: tiles get min-h-[7.5rem] + justify-center so one- and
      three-line labels align; the two awkward tiles now read "Daily mopping
      for sanitizing: Ended" and "Practices missed to infection: 0" (both facts
      from the case study).
- [x] Athletics case-study band: pull in the actual video from the coach instead of three quotes; keep just one quote, the most impactful (screenshot 2026-09-16 3:57pm).
      Done 2026-09-17: reference-files/video/Coach Grant Leeth @ Tarleton
      State University.MOV transcoded to src/assets/videos/tarleton-coach.mp4
      (H.264 portrait 406x720, AAC, 2:16, 9.4 MB) with a poster at 1:55 where
      the coach faces the camera. CaseStudyBand gained a video prop: video
      left, one quote right ("We stopped daily mopping..."), stacked on
      phones; controls, no autoplay (it has speech). Caption "Head coach,
      Tarleton State University Wrestling"; the coach is NOT named because the
      case study spells his surname differently from the video file (Marty
      Q9). Phone-shot, low-res footage; Marty Q11 asks whether a cleaner cut
      is coming.
- [x] Athletics page argument band: the updated "G360 in a D1 Gym" photo (replaced in reference-files with the same name) is not showing; the page still renders the old photo. Re-copy it into src/assets/images/human-d1-gym.png (the page imports the copied asset, not the reference file).
      Done 2026-09-17: re-copied the updated render (1672x941) over
      src/assets/images/human-d1-gym.png; the page imports the copy, which is
      why replacing the reference file alone changed nothing. Hero poster is a
      separate JPEG (your product photo) and was untouched.
- [x] Athletics page argument band: move the 72+ stat from the bottom-left corner of the photo to the bottom-right corner; it gets a little lost on the left.
      Done 2026-09-17: ArgumentBand gained a statPosition prop (default left,
      so the hog page is unchanged); athletics passes right, with the rule and
      caption right-aligned and the photo scrim mirrored so the dark end sits
      under the stat.
- [x] /human/ hub hero headline: on desktop, make each sentence break onto its own line: "Healthier Rooms." / "Healthier Teams." / "Healthier People."
      Done 2026-09-17: SectorHero takes two or three headline lines; the hub
      passes three, stacked at lg and inline below; two-line pages keep their
      break at every width as before.
- [x] Main nav: remove "Shop All" for right now, just comment it out (secondary nav in Header.astro).
      Done 2026-09-17: the `{ label: 'Shop All', href: '#shop' }` line in
      Header.astro's secondaryLinks is commented out with a dated note.
- [x] Read through each piece of content in the new reference-files folder (reference-files/new, 14 PDFs) and update the site as necessary. Break it into subtasks and use subagents if necessary.
      Done 2026-09-17: the 14 PDFs were byte-identical to the August OneDrive
      set, so nothing new arrived; the value was in mining documents never
      used for copy before (EPA label, SDS, promo sheet, HVAC sheet, lab
      report). Three parallel read-only audits (BotaniMax; technology/HVAC;
      athletics) are saved under docs/audits/2026-09-17-*.md. One fix wave
      (commit cda2c06, 24 edits, reviewed) then:
      * EPA wording: "EPA Registered" + Reg. No. 92089-2-103661 everywhere;
        the three inconsistent category codes (2(c), 25(c)) removed, incl.
        inside the reproduced Newfields press release.
      * "150+ plant actives" -> thyme, wintergreen, citrus + "100% Botanical
        Formula"; "Patent-Pending Formula" -> "Proprietary Misting Technology"
        (CertMark kind renamed patent -> misting); EVP mark softened to
        "Qualifies For Emerging Pathogen Claims".
      * Dry Fog Systems lineup now Compact Wall Mount / AeroGuard / MediGuard
        Pro / Battery Powered Fogger / AgriGuard per the pricing guide;
        360HVAC -> AeroGuard in hvac-markets.ts and the HVAC hero; retired
        Dry Fog names + "Kinetic Systems" gone; at-sea blog post renamed.
      * Technology page: unsupported "10-20x" / "4-12%" figures replaced with
        the Explainer's "up to 8 hours" suspension; FAQ droplet comparison
        and maintenance answers follow the brochures.
      * Athletics headline and meta say "#1 reported cause".
      Not changed on purpose: the wrestling blog's external 8.5-20.9% study
      figure; the coach is not named (Leath vs Leeth). Rebuild-scope items
      (HVAC + technology pages) are listed at the end of the technology
      audit for sub-projects 2/5 and 3/5. Decisions collected in
      docs/QUESTIONS-FOR-MARTY.md (Q1-Q7). Also landed today: Joshua's new
      product photo as the gym/hub hero poster (1280-wide JPEG, original in
      reference-files/photos). Reviewer asked for one visual check: the
      "100% BOTANICAL" glyph text in CertMark is the longest yet; verify on
      the home page in the next QA pass.
- [x] Organize and rename the reference-files folder as you see fit (update any source comments in src that point at the old paths).
      Done 2026-09-17: reference-files/ (gitignored) is now brochures/ (6),
      botanimax/ (7), case-studies/ (2), copy-decks/ (5), logos/ (28),
      renders/ (61), photos/ (2), video/ (1: the Tarleton coach interview,
      copied from ~/Downloads), plus a README.md describing each folder and
      the provenance. The two OneDrive folders (Aug 13 and Sep 16) were
      byte-identical, so one copy of each PDF was kept; "Joshua Riley",
      webcopy, images and new are gone. 125 files before, 113 after (14
      duplicates removed, video + README added); a basename diff confirmed
      nothing else was lost. Source comments in four .astro files updated to
      the new paths (commit 12cd2fd); build and brand check pass.
- [x] Soft launch nav: add Hogs & Livestock to nav - by contact on desktop (check first — this may already be done).
      Done 2026-09-17: already in place from the earlier hog-nav task (see
      the "Hog page should be in the main nav" entry above, merged from
      batch-a-hog-header, 8c61bfc). Checked before doing anything; no new
      change needed.
- [x] Add contact above phone number in footer (matching shop and about).
      Done 2026-09-17: the fourth footer column's "Contact" eyebrow is now
      visible (matching Shop and About) and a "Contact Us" link (to
      /contact-us/) sits above the phone number. Minimal (soft-launch)
      footer is untouched. Commit 4e8f8f4.
- [x] Change healthcare video to a surgery room (not graphic).
      Done 2026-09-17: clinic.mp4 replaced again -- the dental-autoclave
      clip wasn't what Joshua wanted. New clip (Pexels ID 31670380, license
      confirmed, exact page URL/title unrecoverable since the download
      predates this continuation and Pexels' by-ID lookup endpoints both
      404 without the original slug) shows a nurse checking on a draped,
      prepped patient in an operating room -- wide, calm, no blood or
      visible incision. Source portrait video (1080x1920) crops cleanly to
      the site's 1280x720 hero format; checked across the whole clip, not
      just one frame. Commit 0e4127f.
- [x] Widen the "Consistent Infection Control" header on the Human Healthcare section — bump max-width from 3XL to 4XL so it drops to its own line.
      Done 2026-09-17: this turned out to be SectorHero's shared center-
      layout headline column, not a section <h2> band header -- fixed at
      the source (max-w-3xl -> max-w-4xl), so it applies to every Human and
      HVAC sector page that uses SectorHero, not just healthcare. Commit
      67b4c0b.
- [x] Make section header styles global/shared instead of duplicated per page, so future changes to these headers don't need to be repeated across pages.
      Done 2026-09-17: the three ag pages (hogs-livestock, indoor-growing,
      poultry) each hand-duplicated the exact hero markup SectorHero was
      extracted from; migrated all three onto <SectorHero layout="center">
      so the width/line-height fixes above (and any future one) now apply
      everywhere from one place instead of four. Verified visual parity by
      screenshot; the only intended differences are the width/line-height
      changes. Commit 516dd03.
- [x] Remove the line-height-8 class from the paragraph under the header — just use the default line-height (applies across all pages using this pattern).
      Done 2026-09-17: removed from SectorHero's center-layout support text
      and the split-layout's optional lede paragraph (default browser line-
      height instead); the ag-page consolidation above means this now also
      covers the three ag heroes. Commit 67b4c0b.
- [x] On the HVAC pages, put "Cleaner Coils. Cleaner Ducts. Cleaner Air." each on its own line, matching how the Human and Ag pages already break it.
      Done 2026-09-17: /hvac/'s headline is now a three-element array
      (['Cleaner Coils.', 'Cleaner Ducts.', 'Cleaner Air.']), matching the
      Human hub's three-line treatment via the same SectorHero prop.
      Commit 8f44a45.
- [x] Replace the /human/healthcare/ hero video with hospital-3 and use the other hospital- videos elsewhere on the page. Speak to wanting the healthiest and cleanest environment for you and your family; hospitals should be a place of healing. Speak to the hospital admin and to the human, everyman perspective.
      Done 2026-09-17: hero is now hospital-3 (the calm, modern MRI suite),
      processed to healthcare-hero.mp4 with an MRI poster frame. hospital-1
      (staff in full PPE disinfecting an exam room) plays behind the argument
      band — ArgumentBand gained an optional `video` prop for this, additive
      so every existing image-only call site is unchanged. hospital-2 (a
      family consultation) supplies the closing CTA's photo via SectorCta's
      existing photo variant; a frame at t=9s was chosen over five others for
      the warmest, clearest read.
      Copy speaks to both audiences as asked: hero "A Cleaner Hospital. / A
      Healthier Family."; argument band "A Hospital Should Heal, Not Spread
      What It's Treating." with one new opening line ("Every family walking
      through these doors is trusting that the room is safer than the one
      they left.") ahead of the existing sourced paragraphs, which are
      unchanged word for word; CTA "Give Every Family The Room They're Hoping
      For." under the eyebrow "Your Patients. Your Reputation."
      No new clinical claim was introduced — the pathogen list and the
      five-log/six-log figures are the same sourced text as before. The hero
      deliberately reads from page-local assets rather than market.hero,
      which still backs the hub's sector card. Raw hospital-1/2/3 sources now
      live in reference-files/video/ with the Tarleton footage (commit
      85ca35c); only the processed clips sit in src/assets.
      Merged 40cec2a. A fuller video treatment for the family clip, rather
      than a still, is a reasonable follow-up if wanted.
- [x] Bring the Human, HVAC, and Ag section indexes and their subpages up to the same content depth as /ag/hogs-livestock/. Do your best with what exists; note for Marty where more source material is needed.
      Done 2026-09-17: added a StatBand + CompareBand to human/schools,
      human/military, hvac/commercial, and hvac/industrial (commit 86de500),
      each reusing facts already cited on that page's own ArgumentBand — the
      Tarleton lab report's ≥5-log bacterial / ≥6-log viral reductions, the
      Technology Explainer's up-to-8-hours droplet suspension, and the HVAC
      brochure's twice-yearly maintenance schedule — so no new claim was
      introduced anywhere. The same band went on human/healthcare with copy
      matched to that page's reworked warmer voice (commit 6c4fcd0, merged
      f7634c0). ag/poultry got a biosecurity CoverageMap sourced from
      reference-files/brochures/Livestock Barn Visual Presentation.pdf — a
      deck never mined anywhere on the site before this task — using its
      p.6 8-pathway diagram (Birds, People, Vehicles, Equipment, Feed,
      Water, Wild Birds, Air) and p.8 Complete Coverage framework, with the
      real "Genesis360 AgriGuard in a Chicken Barn.png" barn interior as the
      map art since no poultry cutaway render exists (commits 4f341fa,
      31bfa2d, merged 7c04777). human/index and hvac/index each gained a
      third, sourced paragraph spanning both columns of the mission band
      (commits 037bb1f, 1a60de0, merged 36cc511). Left deliberately alone:
      ag/hogs-livestock, human/athletics, hvac/residential, and ag/index —
      already at target depth; ag/indoor-growing's coverage map stays
      blocked on art (no greenhouse cutaway render exists, deferred
      2026-09-01, reconfirmed today). Four questions parked for Marty in
      docs/QUESTIONS-FOR-MARTY.md under "Content Depth" (#26-29): Military
      and Schools both lack dedicated source material the way Athletics has
      one; HVAC Commercial/Industrial share Residential's one brochure with
      no market-specific document; ag/indoor-growing is still waiting on
      the greenhouse art commission. QA on all seven touched pages (link
      sweep, single-<h1> check, visual review at 500 and 1280 wide): no
      broken internal links, no genuine visual defects — one blog-card
      image appeared blank in an oversized single-shot capture but was
      confirmed to load fine (200, correct bytes) and render correctly at
      normal viewport heights, a screenshot-method artifact, not a site
      bug. `npm run build` — 43 pages; `npx astro check` — 8 errors, the
      known baseline; `npm run check:brand` — clean; dollar-figure grep
      across the seven pages — 0 matches. Soft-launch gate still up;
      nothing pushed.
- [x] Homepage "Explore By Application" section: place Ag first in the order.
      Done 2026-09-17: Agriculture now leads the three cards, ahead of Human
      and HVAC. Applied to both src/pages/index.astro (live) and
      src/pages/home-full.astro (the parked original), per the convention for
      homepage changes. Ag is also the only section open during the soft
      launch, so the one card with a live destination now sits first.
      Commit ce4092f.
- [x] StatBand figures (the two big lime numbers with label and copy, e.g. "4 THINGS TO BE AWARE OF" / "1 PLACE IT ALL BEGINS") appear across many pages and are left-aligned — they should be centered.
      Done 2026-09-17: the figures were centered on mobile but flipped to
      sm:text-left at desktop, with sm:mx-0 undoing the copy's centering.
      Removed both so they stay centered at every width. One change in the
      shared StatBand component, so it lands on all seven pages that use it
      (athletics, healthcare, military, schools, hvac commercial/industrial/
      residential). Verified by screenshot. Commit 152f8dc.
      Noted while checking: a long figure value like "Up to 8 hrs" wraps to
      two lines and makes that column taller than its neighbour. Pre-existing
      and content-dependent, not caused by the centering change — left alone
      rather than rewording a sourced figure.
- [x] The About page image doesn't look good — match the rest of the site design.
      Done 2026-09-17: the hero image on /about-us/ was nozzles.png — a
      375×375 legacy asset with a circular white vignette baked in, so it
      rendered soft inside ProductHero's glass panel and looked nothing like
      any other hero on the site. Replaced it with a real field photograph
      (Genesis360 Compact misting on a block wall, 6000×4000 original,
      exported to 1600×1066) and set imageFit="cover" so it fills the panel
      the way the other framed images do. "Field Experience." now has field
      imagery behind it.
      Same asset, second use: /about-us/technology/ used nozzles.png in the
      "Microscopic Liquid Without A Wet Room" panel, where the white ring read
      as a sticker floating on the dark band. Swapped it for the previously
      unused "Room filled with small droplets" render — a cutaway of a room
      filled with suspended droplets, which is literally what the section
      describes — and rebuilt the panel as a full-bleed framed image
      (aspect-[16/10], object-cover) instead of a contained thumbnail with a
      blur glow behind it. nozzles.png is now unreferenced; left in
      src/assets/images in case Marty wants the close-up somewhere.
      Verified by screenshot at 1280 and 500 wide on both pages.
- [x] Choose a better photo for the "Give Every Family The Room They're Hoping For" section on /human/healthcare/ — can find stock if needed
      Done 2026-09-17: the old photo was a frame grabbed from hospital-2.mp4
      — 960×720, soft, an ultrasound consultation shot where the clinician is
      seen only from behind, the patient is blurred mid-motion and the man
      beside her is picking at his face. It read as a candid surveillance
      still, the opposite of the heading.
      Checked the in-house sources first: hospital-1 is a hazmat-suited worker
      wiping a bay (that is the problem, not the promise), hospital-3 is an
      empty MRI suite, and hospital-2's better frames still cap at 960×720
      with the clinician's back to camera. No render in reference-files is
      clinical. So stock, as you allowed.
      Chose Pexels 39192346 — a mother and son listening to a doctor in a
      bright modern office, 3840×2160, warm, faces readable, and the dark
      teal wall sits well against the site navy. Cropped 16:9 → 16:10 because
      the subjects reach both edges and a 4/3 crop clips either the mother's
      face or the doctor's; exported 1600×1000.
      That needed a new optional `imageAspect` prop on the shared SectorCta
      ('4/3' default, '16/10' opt-in), written as a literal class lookup so
      Tailwind's scanner emits both rules — verified both exist in the built
      CSS, and the hog page still renders 4/3.
      Verified by screenshot at 1280 and 500 on healthcare and the hog page.
      Licence note added to docs/QUESTIONS-FOR-MARTY.md as 16a: Pexels allows
      commercial use without attribution, but every other photo on the site is
      the client's own, so Marty may want to commission this one.
- [x] StatBand figures don't look good when they break to 2 lines (e.g. "Up to 8 hrs") — all of these should be 1 line
      Done 2026-09-17: this is the wrap I spotted and left alone when I
      centred these figures earlier — you were right that it needed fixing.
      Only "Up to 8 hrs" (schools and military) actually wrapped, at every
      two-column width.
      Fixed in the shared StatBand so it cannot come back: the figure is now
      whitespace-nowrap, the pair sits in max-w-4xl instead of max-w-2xl, and
      the two-column switch moved from sm to md so the narrowest cell is 328px
      rather than ~270px. Both figures take one size step together, keyed on
      the wider of the two — sizing them independently would have left a short
      value huge next to a long one, which reads worse than the wrap did.
      The step is chosen by a weighted width estimate, not character count:
      measured in-page at 60px, "Up to 8 hrs" is 11 characters but 314px
      (spaces are ~0.28em) while "60–100%" is 7 characters and 317px (% × ≥ and
      dashes are wide). Character count alone would have shipped an overflow
      on athletics.
      Verified by measuring every figure on all seven StatBand pages at nine
      widths from 375 to 1440 — no wrap, no overflow — and by re-running that
      same audit against the previous build as a control, where it correctly
      reported the "Up to 8 hrs" wrap. Spot-checked visually at 500, 768 and
      1280.
      Worth knowing for future QA: headless Chrome on this machine clamps the
      viewport to a 500px minimum, so any --window-size below 500 renders at
      500 and merely crops the screenshot. Narrow-phone widths have to be
      checked by measuring in-page, not by screenshotting.
- [x] Use the rotating conic-gradient glow border CSS effect (@property --a + spin keyframes) on .genesis-panel across all pages that have it
      Done 2026-09-17: the lime hairline that sat statically across the top of
      the “With Genesis360” panel now travels the whole perimeter, on all
      eight pages that use it — CompareBand (athletics, healthcare, military,
      schools, hvac commercial/industrial/residential) plus the hog page.
      Two things worth knowing about how it was built:
      • .genesis-panel existed twice, once in CompareBand.astro and once
        inline in hogs-livestock.astro. Both are Astro-scoped, and a scoped
        rule outranks anything global, so adding the effect to global.css
        alone would have silently done nothing on any page. Both copies are
        deleted and the rule now lives once in global.css.
      • The rim is a conic gradient masked down to a 1px ring
        (mask-composite: exclude) rather than a second inset panel — the panel
        fill is translucent (bg-white/[0.07]), so anything sitting behind it
        would show through and muddy it.
      Used the brand lime/green rather than the reference’s red/yellow, and
      the gradient opens and closes on the same lime so the loop has no seam.
      That also puts the bright point at the start angle, so with
      prefers-reduced-motion the rim freezes at 0deg — a lime top edge, which
      is exactly what the panel looked like before. Same fallback for any
      browser without @property, where the angle simply never animates.
      Verified on all eight pages by reading the computed ::after style: live
      keyframes, mask-composite applied, and an interpolating angle (each page
      reported a different non-zero from-angle), which is the proof @property
      registration took — an unregistered custom property would have made the
      gradient invalid. Also captured four phases of the sweep and confirmed
      the highlight sits on a different edge in each, plus the reduced-motion
      and hog-page renders.
      Note: the sweep runs continuously whether or not the panel is on screen.
      One 1px ring per page, so it is not worth JS to pause it, but that is
      the reason it is 8s and not the reference’s 3s.
- [x] About hero still not matching — remove the small image and give it a nice background image in the same style as the /resources/ page
      Done 2026-09-17: the About hero was ProductHero — a glass panel with a
      framed photo beside the copy — which is a different component from the
      one every other page uses. Swapping the photo (earlier today) was never
      going to fix that; the hero itself was the wrong shape. It now uses
      SectorHero, the same component /resources/ and every sector page uses:
      full-bleed art under the navy gradient, centred eyebrow, headline,
      support and the two CTAs.
      Art: hero-about-poster.jpg, from the previously unused police-station
      render — a technician foggering a station lobby. It was the only unused
      piece showing the work being done in a real building, which is what
      “Field Experience.” is claiming, and it has the depth and mid-tones a
      full-bleed hero needs. Ruled out along the way: the Compact-on-block-wall
      photo (it is the same shot as the athletics hero, and as a background it
      is one big white slab behind the headline), the droplet and airflow
      renders (baked-in diagram text) and the locker-room and manual-cleaning
      renders (portrait, and sector-specific).
      Also added text-balance to the shared hero h1: “Engineered Into A Better
      System.” was wrapping with “System.” orphaned on its own line. It now
      splits “Engineered Into” / “A Better System.” and the whole second
      sentence stays lime as designed. Verified it changed nothing elsewhere by
      measuring the h1 line count on all fifteen hero pages at five widths:
      every two-line headline is still two lines at every width, and the three
      hub pages use the split layout whose h1 was not touched.
      about-field-misting.jpg is now unreferenced and deleted — it only ever
      existed for the framed panel this replaced. The 6000×4000 original is
      still in reference-files if it is wanted later.
      Noted for Marty as 16b: About and Military now both show police
      settings (different rooms), in case he would rather About showed a
      hospital or a school.
- [x] On /hvac/residential/ desktop, make the clean-vs-dirty system image in the "Installed Once. Working Every Cycle." section sticky, like "What The Field Revealed" on the About page
      Done 2026-09-17: the image column already had lg:sticky lg:top-28 — the
      same classes the About sidebar uses. It was never going to work: the
      StepsBand section itself carried overflow-hidden, and an ancestor with
      any overflow other than visible confines a sticky element to that
      ancestor's own scrollport. Since the ancestor was the very section the
      image sits in, sticky silently did nothing. Removed it; nothing in this
      band is positioned outside its box, so there was nothing to clip.
      Measured before and after at 1440 wide, against the About sidebar as a
      control: pre-fix the image moved 412px for 412px of scroll (straight
      past, never pinned); post-fix it moved 87px for the same 412px, holding
      at the 112px top-28 offset before releasing at the end of the section.
      The About control reproduces its own known-good behaviour in the same
      probe, which is what says the measurement is trustworthy.
      Only /hvac/residential/ uses StepsBand, so nothing else is affected.
      Two things that cost time and are worth knowing for future QA on this
      site: scrolled screenshots are useless here, because .reveal elements
      sit at opacity 0 until Alpine's x-intersect fires and that never happens
      in a one-shot headless render at an offset; and scripted scrolling needs
      scroll-behavior:auto forced first, because the site sets smooth on html
      and the animation never advances under --virtual-time-budget.
- [x] The $4.67 / $1.2B figures on the hog page cost band aren't centered
      Done 2026-09-17: these were left-aligned because the hog page was not
      using the shared StatBand at all — it carried its own copy of the
      markup, still holding the sm:text-left and sm:mx-0 that I removed from
      the component earlier today. The centring fix landed on the other seven
      pages and never reached this one.
      Rather than delete the two classes again and leave the copy to drift a
      third time, replaced the block with the components. The section wrapper,
      the figures grid and both comparison panels were byte-identical to
      StatBand and CompareBand — which were extracted from this page in the
      first place — so the swap is faithful: 69 lines of duplicate markup out,
      23 in. The hog page also picks up the one-line figure guarantee it was
      missing. Dropped the Check and X icon imports, now unused.
      Verified the rendered geometry matches /human/military/ (a page that
      already used the components) exactly, and by screenshot at 1280 and 500.
      Third time today this duplication has bitten: the same page also had a
      private .genesis-panel copy that silently outranked the global rule.
      Worth assuming anything on the hog page has a twin in src/components/
      before editing it.
- [x] .genesis-panel border animation needs more wow factor
      Done 2026-09-17: (you wrote .genesis-block; the class is .genesis-panel.)
      Rebuilt the rim as two conic rings sharing one angle, so they sweep as a
      single light source: a 2px rim that peaks on near-white before falling
      through lime and green — a light source looks hot at its centre, not
      saturated — and a 6px halo sitting just outside the panel, which is what
      carries the glow onto the dark ground. Cycle 8s → 6s, and the resting
      box-shadow is now a real lime bloom so the panel still reads as the lit
      one in a still screenshot.
      First attempt was worse, not better: two highlights half a turn apart
      plus a halo that ramped across most of the circle lit the whole
      perimeter at once, and the panel just looked like it had a green border.
      The travel only reads if there is somewhere for the light to travel
      from, so it is now one comet with a tail over ~0.3 of a turn and a faint
      hairline the rest of the way. Contrast is the effect.
      The halo cannot be blurred, which is worth writing down: CSS applies
      filters before masks, so blurring it would bleed a wedge of colour
      across the whole card and then have a hard edge cut into it anyway. A
      wide band at low alpha gives the glow without that.
      Verified on all eight panels that both rings animate on genesis-panel-
      sweep at 6s with an interpolating angle, and that reduced motion stops
      both and parks the hot core at 12 o'clock — close to the static lime top
      edge the panel started with. Judged by capturing six phases of the loop.
- [x] Soften the .genesis-panel animation — make the edge less sharp, fade the edges to transparent
      Done 2026-09-17: the glow is now genuinely blurred instead of a wide
      band with a crisp cut-off, and the rim ramps in and out of the core
      rather than switching on.
      Getting a soft edge needed one piece of real markup. CSS applies a
      filter to an element's subtree only after each descendant has been
      masked, so blurring a masked ring on a single element blurs the gradient
      and then cuts a hard edge into the result — which is exactly what the
      first version did, and why I had written in the last commit that a
      blurred halo was not reachable. It is: the blur goes on a .genesis-glow
      span and the masked ring on its ::before, so the ring is cut first and
      blurred after. A pseudo-element cannot carry its own pseudo-element,
      which is why the span has to exist.
      Also dropped the hard 1px lime ring from the resting box-shadow — a
      crisp line sitting under a soft glow was most of what made the edge read
      sharp.
      Two corrections during the pass: first attempt let the rim fall all the
      way to transparent on the far side of the sweep, which left the panel
      indistinguishable from the “Today” one for most of every cycle, so a
      faint lime now carries all the way round; and the halo was too wide
      (13px band, 14px inset, 11px blur) — you called it, it read as a cloud
      around the panel rather than light on its edge. Now 6px/7px/6px, hugging
      the border.
      Verified all eight panels carry exactly one .genesis-glow — including
      the hog page, which only picks it up because of this morning's
      consolidation onto CompareBand — and that reduced motion parks the
      bloom at 12 o'clock. Judged by capturing four phases of the loop.
- [x] Contact page: the office line phone number and email should be the same size
      Done 2026-09-18: the phone was text-lg and the email text-sm with
      break-all — the email had clearly been shrunk to stop it overflowing its
      card rather than because it wanted to be smaller. Both are text-lg now,
      and break-all became break-words: the address fits at this size, and
      break-all would hack it mid-word the moment it did not.
      That exposed a second mismatch at 640 exactly, where the pair first sits
      side by side and is at its narrowest: the email wrapped to two lines
      while the phone stayed on one. Moved the two-column switch from sm to md
      so the cards stack through that band — the same too-tight-at-sm problem,
      and the same fix, as the StatBand figures yesterday.
      Verified at thirteen widths from 320 to 1440: same font-size, same line
      count, no overflow at any of them. Only the soft-launch landing page
      (src/pages/index.astro) has this block, so nothing else is affected.

- [x] securelogic.netlify.app: full nav on home and hogs, so the team can
      navigate the site for handoff
      Done 2026-09-21: those two pages are the only ones the soft-launch gate
      leaves open, and both rendered Header/Footer in `minimal` mode so no nav
      link led into a gated page. That also made them dead ends on
      securelogic.netlify.app, which public/_redirects deliberately leaves
      ungated and is where the team reviews.
      One build serves both hosts, so the choice is made in the browser. New
      src/components/PreviewChrome.astro parks a second, full-nav copy of the
      chrome in an inert <template>; a classic inline script at the bottom of
      BaseLayout.astro swaps it in over the minimal one, but only on localhost
      and *.netlify.app. Template contents are outside the document tree, so
      nothing in the copy renders, is matched by querySelector, is initialised
      by Alpine, or is fetched until the swap happens.
      Fail-closed by design: the live domains get the minimal chrome by
      RENDERING it, not by suppressing anything, so a blocked or broken script
      leaves genesis360.com byte-identical to before. Confirmed in the built
      HTML — outside the templates there are still 0 mega-menu triggers, 0
      secondary nav, 0 /get-a-quote/ links and the minimal two-column grid.
      The script is classic and inline on purpose: it has to run during parse,
      ahead of the deferred module scripts Astro emits for Alpine and for
      Header's announcement rotator, or those would bind to the chrome we just
      removed. Verified in the browser on both pages: exactly one .sh and one
      <footer>, no leftover templates, all five mega-menus present and opening
      on hover (Alpine bound to the swapped-in DOM), secondary nav and the
      four-column footer back, no new console errors. Host matcher checked
      against both apex and www of genesis360.com and securelogicusa.com
      (minimal), securelogic.netlify.app and deploy previews (full), and
      near-miss hosts like notnetlify.app and evil-netlify.app.attacker.com
      (minimal).
      Nav only. The page bodies still run soft-launch: the hog page's CTAs
      point at /#contact and its related-posts row stays hidden. UNDO AT FULL
      LAUNCH: delete PreviewChrome.astro, its two usages, and the BaseLayout
      script — the real chrome is already full by default.
- [x] Get a Quote page: add a different video — someone walking through inspecting a facility with other people
      Done 2026-09-23: the hero now plays src/assets/videos/facility-
      walkthrough.mp4 — two people in hard hats walking a warehouse aisle
      together (Pexels 10817415, free license, source logged in STOCK-
      SOURCES.md), 1280x720, muted, 2.4 MB, with a poster frame. Nothing in
      Pexels or Mixkit showed a disinfection-specific walkthrough; this was the
      closest group facility tour. Replaces the fogger still.
- [x] Get a Quote page: replace the Get a Quote form with the Pipedrive form as it looks on the home page
      Done 2026-09-23: (captured first as 'Home page: …'; re-read, you meant the
      Get a Quote page should use the home page's Pipedrive block, the same ask
      you made for blog posts.) Extracted the home #contact section into
      src/components/ContactBlock.astro — washes, ghosted mark, form on the
      tinted card, phone + email cards — with eyebrow/heading/body/id props.
      index.astro now renders <ContactBlock /> and is visually unchanged; /get-
      a-quote/ renders it with walkthrough copy instead of the two-column
      QuoteForm. Email shown is CONTACT_EMAIL (info@genesis360.com), same as the
      home page; the old QuoteForm showed info@securelogicUSA.com.
- [x] About page: pull a different hero video — the current one is already used on the Human/Military page
      Done 2026-09-23: the About hero was a still, hero-about-poster.jpg, byte-
      for-byte the same police-station image as /human/military/. It now plays
      src/assets/videos/about-engineers.mp4 — two engineers in lab coats
      reviewing a tablet among plant piping (Mixkit 'Couple of scientists on a
      factory', free license, logged in STOCK-SOURCES.md), 3.2 MB, muted, with
      its own poster. The old about poster is now unreferenced and left in
      place.
- [x] About page, 'From a field problem to a platform': slowly pulse the virus molecule in the background, maybe add one on the left side too; make them feel alive, move as we scroll
      Done 2026-09-23: two molecules now — the original top-right, plus a
      smaller one lower-left behind the first card. Each breathes on a slow CSS
      loop (scale 1→1.09, a few degrees of turn, opacity .09→.17; .molecule-
      pulse in global.css), the left one on a longer offset reversed cycle so
      they never pulse together. Both drift vertically in opposite directions as
      the section scrolls. The drift is a new shared script, src/scripts/scroll-
      drift.ts, loaded by BaseLayout and opted into with data-scroll-
      drift="from,to". It writes the translate property, so it composes with the
      pulse animation. The BotaniMax scroll tasks further down will reuse it.
      Reduced motion stops both.
- [x] Technology page: keep the video background like all the other pages; remove the molecule there
      Done 2026-09-23: the hero moved from ProductHero, which had the pathogen
      molecule as its side image, to the shared SectorHero video treatment every
      sector page uses. Same eyebrow, headline, copy and both CTAs. Footage is
      the slow blue fog clip that sat unused in public/videos/securelogic-
      header.mp4, re-encoded to src/assets/videos/tech-fog.mp4 at 1280 (6.3 MB
      to 0.6 MB) with a poster. No molecule is left on the page. The original in
      public/videos is untouched.
- [x] Technology page: center the 'Gravity stops being the whole story' section, the whole section including the table
      Done 2026-09-23: DropletComparison gained a center prop that centers the
      eyebrow, heading and copy, every table column including the header row,
      the stacked mobile cards, and the source line. The Technology page turns
      it on. The Genesis360 page's copy of the section is unchanged for now; the
      Compact Wall Mount task below asks for the same treatment there.
- [x] Technology page, automation section: remove the background and just put an image there — a 50-50 section where the image is a full background, contain
      Done 2026-09-23: the section is now 50-50 (lg:grid-cols-2). The pale card
      behind the image is gone; the image sits absolutely in the right half with
      object-contain and scales to the copy's height. Swapped human-compact-
      front.png, which is mostly transparent padding and read as a small box in
      the half, for genesis-compact.png: a tight render that shows the unit's
      built-in digital timer panel, which is what the section is about. CHECK:
      that render's front label reads 'HVACMist Compact'. If that is a retired
      name, say so and I will switch back or trim the old image.
- [x] Contact page should be the Get a Quote page; take Contact out of the About submenu
      Done 2026-09-23: /contact-us/ is gone as a page and 301s to /get-a-quote/:
      a bare-path rule at the bottom of public/_redirects, which sits below the
      host-scoped gate so live domains still go to /, plus an Astro redirects
      entry so dev and the build's meta-refresh page agree. Contact Us is out of
      the About mega menu, which is now three across. Every internal /contact-
      us/ link now points at /get-a-quote/: the footer Contact column link, now
      labelled Get A Quote; the SectorCta and AgCta default href; home-full;
      hogs-livestock at full launch; brochures. The footer phone number on full
      pages had been linking to /contact-us/ and now dials. Blog bodies'
      securelogicusa.com/contact-us/ links left alone per CLAUDE.md (they flip
      at DNS cutover); the redirect covers them. Build: 42 pages.
- [x] Genesis360 page: use a background image instead of the side image, for consistency with the other pages
      Done 2026-09-23: hero moved from ProductHero, a split with the lineup
      photo on the right, to the shared SectorHero, a full-bleed background with
      centred copy, matching the sector, About and Technology pages. Same copy
      and CTAs. The background is the same athletics lineup photo, cut to 1920px
      (hero-genesis360-lineup.jpg, 230 KB) because SectorHero serves its poster
      without Astro's image pipeline and the original is 6000px / 6.8 MB.
      ProductHero is now used only by /botanimax/, which the BotaniMax hero task
      below reworks.
- [x] Genesis360 page, 'One set of physics, five ways to deploy it': make it two-by-two cards instead of five in a row
      Done 2026-09-23: the five system cards are now two columns from lg, each
      running image-left from sm, where they had been five narrow columns at xl.
      Five does not split evenly, so AgriGuard, the fifth card, centres on its
      own row at the same card width instead of stretching across. The Compact
      and AeroGuard renders were mostly transparent padding and looked tiny at
      the new size. They now use trimmed copies (human-compact-iso-trim.png,
      hvac-aeroguard-render-trim.png) on this page only, and every card's art
      sits in the same fixed-height box. Stacks one per row on phones.
- [x] Compact Wall Mount page: make it a 50-50 section with the background image contain; center 'Droplet behavior' just like we did elsewhere and make it a dark theme section
      Done 2026-09-23: there is no separate Compact Wall Mount page. This is the
      Compact Wall Mount band on /genesis360mistingsystems/ and the Droplet
      Behavior section after it. The Compact band is now 50-50 with no card
      behind the unit, which fills its half with object-contain, the same
      treatment as the Technology automation band. Droplet Behavior is centred,
      using the center prop from the Technology task, and dark.
      DropletComparison gained theme="dark": navy ground with blue and green
      washes, lime eyebrow, white heading, a glassy bordered table, and the
      Genesis360 row tinted lime with a lime figure. Mobile cards follow suit.
      The Technology page keeps the light version.
- [x] BotaniMax page hero: same effect as the home hero — moves as we scroll; remove the 'BotaniMax' eyebrow and just have the actual logo there
      Done 2026-09-23: ProductHero gained media="float", which /botanimax/ uses.
      The glass card is gone. The bottle is oversized, cropped by the hero's
      bottom edge, and rises as you scroll, using the home page BotaniMax band's
      own numbers: scale 1.12, 240 to 80px on desktop, 80 to 0 below lg. It is
      driven by the shared scroll-drift script rather than a copy of the home
      page's inline handler. The 'BotaniMax' eyebrow is removed (eyebrow is now
      optional) and the logo takes its place larger. It uses a trimmed copy,
      botanimax-logo-trim.png, because the original is about a third transparent
      padding.
- [x] BotaniMax page: make the green in 'Registered to perform' the same as the green in the BotaniMax logo
      Done 2026-09-23: new Tailwind colour botanimax: #3cb54d, the dominant
      green sampled from botanimax-logo.png. ProductHero's green tone now uses
      it for the headline's accent line instead of the site lime (#a6d960).
      /botanimax/ is the only page on the green tone, so nothing else changes.
      Verified computed colour rgb(60,181,77).
- [x] BotaniMax page, 'The botanical blend, three named ingredients': make that a 50-50
      Done 2026-09-23: now a full-bleed 50-50. The left half is edge-to-edge
      thyme foliage, blog-thymol-vs-thyme.png, already in the repo from the
      thymol blog post, with the BotaniMax bottle standing on it under a soft
      drop shadow. The copy and three ingredient cards sit in the right half,
      capped so the text measure stays readable. The pale gradient card is gone.
      Stacks photo-first on phones. The bottle also appears in the hero; if you
      would rather this half carry only the thyme photo, it is one line to drop.
- [x] BotaniMax page, 'Label-backed performance' / 'contact time is part of the claim': use the fog image from Athletics, center all that, and make 'Label-backed performance' white or gray — not legible in its current color
      Done 2026-09-23: the section now sits on the Athletics fog photo,
      human-d1-gym.png: a wall unit misting a weight room. It is under a navy
      scrim so the white type holds. Heading block, the four contact-time cards
      (icons included) and the 'use the label' note are all centred. The 'Label-
      Backed Performance' eyebrow was the default brand blue on navy. It is now
      light grey (white at 72%) for this section only.
- [x] BotaniMax page, 'Read the source' with the label: make the label click-open into a modal
      Done 2026-09-23: the label is now a button that opens it full-size in a
      modal, with a 'Click to enlarge' hint under the thumbnail rather than over
      the label text. New reusable src/components/ImageZoom.astro on the native
      <dialog>: Esc, the X, or a click anywhere off the image closes it. Focus
      and background inertness are handled by the browser. The full-size copy is
      lazy-loaded. Verified in Chrome that it opens, closes on Esc, and closes
      on a backdrop click, with no console errors. The Residential AC image-zoom
      task below can reuse it.
- [x] Documentation page: same BotaniMax bottle effect — zooms and moves with scroll; put the actual label on the right side as one of the downloadable docs, e.g. 'BotaniMax label'
      Done 2026-09-23: the left column's sticky label image is replaced by the
      BotaniMax bottle, oversized, cropped by the section and rising as you
      scroll. It uses the same scale and scroll-drift wiring as the home page
      band and the /botanimax/ hero. On phones the downloads come first and the
      bottle follows. 'BotaniMax Label' is now the third item under
      Documentation. It downloads public/docs/Secure-Logic-BotaniMax-Product-
      Label.pdf (0.95 MB), rendered at 300 dpi from the label artwork already in
      the repo, following the existing Secure-Logic-*.pdf naming. Served as
      application/pdf.
- [x] FAQs: center them, take the floating picture out of the left; replace the gray background with a darker one; text inside when opened can be a little larger
      Done 2026-09-23: /resources/faqs/ is the only FAQ list on the site. The
      sticky photo on the left is gone and the questions are one centred column
      (max-w-3xl) under a new heading, 'What Facilities Ask Before They Switch.'
      The pale grey items are replaced by a navy band with glass cards that
      brighten when open, where a lime arrow chip rotates and fills. Answer and
      bullet text went from text-sm to text-base, and questions to text-lg from
      sm up. Verified open and close in Chrome.
- [x] Indoor Growing page: 'From the field' (blog post) and 'Other markets' — too much space between these and the design doesn't look right; should have its own background color and look slightly different
      Done 2026-09-23: fixed in the shared components, so every market and hub
      page changed together. PostsRow ('From The Field') is its own navy band
      with blue and green washes, a lime 'Related Reading' eyebrow, white cards
      with a slight image zoom on hover, and Read More moved into the header row
      instead of a centred pill under the cards. Padding went from py-20/24 to
      py-16/20. OtherMarkets is no longer a dark pill row running into the dark
      footer. It is a white strip with a hairline top border and compact linked
      cards (icon, title, one-line summary, arrow). Indoor Growing dropped its
      own inline full-size card grid for OtherMarkets and moved it below the
      CTA, the order every other market page already used, so the two bands are
      no longer stacked with double padding. Poultry is converted in the next
      task. The live hog page is unaffected: its posts row is hidden during soft
      launch. Note: on /human/athletics/ the navy posts band follows the royal-
      blue case-study band. The tones are distinct but both are dark.
- [x] Poultry page: the image is too large / getting cut off and the hover states cover it in a way that doesn't look good; also too much space between 'From the field' and 'Other agriculture markets'
      Done 2026-09-23: the biosecurity coverage map's photo was set to 68% of
      the stage, where the component default is 54%. It ran under the left-hand
      labels, and each callout's hover detail spilled onto it and into the label
      below. It is now 56%, clear of both callout columns at 1280. The stage is
      taller (aspect 1.95, was 2.25) so an opened detail clears the next
      callout, and the open callout stacks above its neighbours. The anchor dots
      were tuned at the old size, so they are rescaled about the centre in code
      from ART_WIDTH and STAGE_ASPECT constants rather than re-tuned by hand.
      Verified the dots still sit on their features. Below 1280, where the map
      becomes a list, rows were centred or mirrored because a button centres
      text by default. All rows now read ring-first and left-aligned, which also
      fixes the same list on /hvac/residential/. Other Agriculture Markets moved
      to the shared OtherMarkets strip below the CTA, as on Indoor Growing,
      which removes the doubled gap after From The Field.
- [x] Residential AC page: 'Other HVAC markets' doesn't look good either; need consistency across the market pages
      Done 2026-09-23: covered by the shared-component change in the Indoor
      Growing task. /hvac/residential/ and every other HVAC, Human and Ag market
      page now end the same way: the navy From The Field band, the CTA, then the
      white Other Markets strip of compact linked cards, two across on HVAC and
      Ag and three on Human. Verified on residential and schools. No page-
      specific change needed.
- [x] Residential AC page, 'A cleaner HVAC system': the image on the right is too small to read — make it clickable to zoom, or fix the layout
      Done 2026-09-23: the image is an infographic with its own small text, and
      it was also being cropped to a 4/3 frame. SectorCta's photo variant gained
      a zoomable prop. It shows the image whole and uncropped, with a 'Click to
      enlarge' hint, and opens it full-size in the ImageZoom modal from the
      BotaniMax label task. Residential turns it on, and its alt text now
      describes the infographic rather than 'family relaxing'. Verified in
      Chrome that it opens, closes on Esc and closes on a backdrop click.
- [x] HVAC Professionals page: 'Talk about dealer pricing' button is on the right side — center all of it and put the button beneath instead of on the side
      Done 2026-09-23: this is the 'For HVAC Professionals' band on
      /hvac/residential/; there is no separate page. It was a two-column card
      with the button on the right behind a divider. It is now one centred
      column with eyebrow, heading and copy, and the button beneath. The copy is
      balanced so it does not orphan a word, and it steps up to text-base from
      sm.
- [x] Blog index page: remove the Get a Quote form; just a CTA that brings us to the Get a Quote page
      Done 2026-09-23: the QuoteForm band at the bottom of /blogs/ is replaced
      by the site's standard SectorCta band. It is centred on light blue, reads
      'Ready To Put It To Work?', and its Get A Quote button links to /get-a-
      quote/.
- [x] Blog posts: keep the Pipedrive quote form, but it needs to look just like the home page's clean design, not what it currently is
      Done 2026-09-23: every blog post now uses ContactBlock, the same component
      as the home page and /get-a-quote/, in place of the two-column QuoteForm.
      It is the Pipedrive form on the tinted card, with phone and email cards
      beneath, under 'Put This To Work In Your Facility.' ContactBlock now
      carries the .bl type layer itself, because blog posts do not wrap in it
      and the heading was falling back to the old font. The Keep Reading band
      below moved from grey to white so it does not sit tint-on-tint against the
      form. QuoteForm is now used only by ag/[slug].astro.
- [x] Technology page: the fog video hero can't be seen — fix it
      Done 2026-09-23: the earlier clip was dark-blue smoke and vanished under
      the hero's navy overlay. tech-fog.mp4 is now a white fog layer rolling
      across a dark ground: Pexels 9694228, a 20 s cut, 0.9 MB, logged in STOCK-
      SOURCES.md. It reads clearly through the overlay, and the poster was
      regenerated.
- [x] Genesis360 page: move /genesis360mistingsystems/ to /genesis360/
      Done 2026-09-23: the page is now src/pages/genesis360.astro at
      /genesis360/. Every internal link now points there: header secondary nav,
      footer, About mega menu, Technology CTA and home-full. The old URL 301s to
      /genesis360/ through a bare rule at the bottom of public/_redirects, with
      a matching Astro redirects entry. The new path has its own soft-launch
      gate block on all four live hosts, placed with the other gate rules, so it
      stays hidden on genesis360.com like the old one.
- [x] Genesis360 page: make the system cards dark themed like on the homepage
      Done 2026-09-23: the 'One Set Of Physics' section now matches the home
      page's Genesis360 Platform band. It has a navy ground with blue and green
      washes. The cards are glass (white at 7.5% with a white/10 ring and dark
      lift shadow) with a lime or blue top rule, alternating. The eyebrow is
      lime, headings are white and body text is white at 60%. Cards lift on
      hover. Product renders sit on a soft white glow so the white units still
      read.
- [x] Documentation page: give the BotaniMax bottle a shadow
      Done 2026-09-23: added a soft navy drop shadow (0 40px 36px at 28%) that
      follows the bottle's silhouette, since the PNG is transparent. It moves
      with the bottle as it scrolls.
- [x] FAQs page: make the section background light but keep the FAQ accordions dark
      Done 2026-09-23: the band is light blue (brand-100) with faint washes and
      a dark heading. Each question is a solid navy card with a lift shadow that
      steps to brand-800 when open. The answer text stays white and larger, and
      the lime arrow chip is kept.
- [x] Every market page: remove the unnecessary 'Other Markets' eyebrow
      Done 2026-09-23: removed from the shared OtherMarkets strip, so it is gone
      on every HVAC, Human and Ag market page. The strip now opens straight on
      its heading, for example 'Other HVAC Markets'.
- [x] Coverage map list at tablet width (hog page screenshot) doesn't look good — centred/mirrored rows; needs to appear differently
      Done 2026-09-23: below 1280px the coverage maps turned into a hairline
      list with centred or mirrored rows. They are now the art on top with the
      callouts in a two-column grid of white cards beneath: ring first, label
      and description left-aligned, with the same shadow as the phone cards.
      Applied to both copies, the hog page's inline map and the shared
      CoverageMap used by Poultry and Residential AC. Desktop, 1280 and up, is
      unchanged. The hog page is live on genesis360.com, so this change ships
      there on the next deploy.

## Seperate TODOS (not for AI)
- match brand blue and green and then incorporate throughout the site 
- Find video of Mist spraying the camera 
- Does Marty want to pay for Slack? I recommend it. even if it's just for a few of the key players. 30 day pro trial
- Is the videographer actually using the proper equipment - gimbal? That means things can't be shaky. need PRO smooth
- GMB
