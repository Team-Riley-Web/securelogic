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
- [ ] Build out the entire site. It should match the quality of the ag and hogs page.
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
- [ ] Build-out 2/5 — HVAC section to ag/hog quality: /hvac/ hub + residential, commercial, industrial, reusing the Human section's sector blocks. Needs its own spec.
- [ ] Build-out 3/5 — Product and technology pages to ag/hog quality: Genesis360 systems (/genesis360mistingsystems/), BotaniMax, About Us, Technology. Needs its own spec.
- [ ] Build-out 4/5 — Resources and utility pages to ag/hog quality: Resources hub, brochures, documentation, FAQs, Contact Us, Get A Quote, Privacy Policy. Needs its own spec.
- [ ] Build-out 5/5 — Blog index and post templates to ag/hog quality. Needs its own spec.
- [ ] Hog page should be in the main nav next to the Contact button (soft-launch minimal header).
- [ ] Clarifies the hog-page nav task above: this will be a "soft-launch nav" - I don't want to get rid of the old nav design. Keep the full mega-menu design for the full launch; the soft-launch nav is a temporary variant.
- [ ] Hog page: reduce the spacing between the coverage-map section and the closing "Start With The Barns You Run Hardest." CTA (large empty band between them on desktop, see screenshot 2026-09-16).
- [ ] Hog page: the "Start With The Barns You Run Hardest." CTA section should probably have a white background and some other sort of photo, graphic, or design to it.
- [ ] Sector landing pages (Human, HVAC hubs): use videos like the ag page (pictures work too, but they all should match the agricultural design). Pull out as much of the similar content as possible: the ag page breaks down each of its three sub pages, do that within Human and HVAC too.
- [ ] Sector sub pages (human and HVAC markets): match the design of the hog page as closely as possible, with consistency across every one of these internal pages (healthcare, schools, athletics; then residential, commercial, industrial).
- [ ] Blogs / From The Field rows: always show three posts, even if the second and third are not closely related; fill with something more generic rather than showing fewer.
- [ ] The "Other Human Health Markets" block should come last, after the pre-footer CTA, and should be a different design from the current card grid.
- [ ] Really pull from any of the brochures we have (reference-files) for the copy and content of the Human and HVAC sections.
- [ ] Find a different video for the hero of /human/healthcare/ - ideally someone cleaning medical equipment or a surgical room (replaces the current doctor-walking-a-hallway clip).
- [ ] On /human/athletics/, make the hero headline "Athletes Fight For You. We Fight For Your Athletes" (currently "Your Athletes Fight For Wins. / We Fight For Your Athletes.").
- [ ] Athletics case-study band: shorten the title (e.g. "The Case Of Ringworm At Tarleton State") and reduce the line height of the intro paragraph beneath it.
- [ ] Athletics case-study band: the at-a-glance stats are not vertically centered and "Eliminated / Daily Mopping" doesn't look right; fix the stat tiles.
- [ ] Athletics case-study band: pull in the actual video from the coach instead of three quotes; keep just one quote, the most impactful (screenshot 2026-09-16 3:57pm).
- [ ] Athletics page argument band: the updated "G360 in a D1 Gym" photo (replaced in reference-files with the same name) is not showing; the page still renders the old photo. Re-copy it into src/assets/images/human-d1-gym.png (the page imports the copied asset, not the reference file).
- [ ] Athletics page argument band: move the 72+ stat from the bottom-left corner of the photo to the bottom-right corner; it gets a little lost on the left.
- [ ] /human/ hub hero headline: on desktop, make each sentence break onto its own line: "Healthier Rooms." / "Healthier Teams." / "Healthier People."
- [ ] Main nav: remove "Shop All" for right now, just comment it out (secondary nav in Header.astro).
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

## Seperate TODOS (not for AI)
- match brand blue and green and then incorporate throughout the site 
- Find video of Mist spraying the camera 
- Does Marty want to pay for Slack? I recommend it. even if it's just for a few of the key players. 30 day pro trial
- Is the videographer actually using the proper equipment - gimbal? That means things can't be shaky. need PRO smooth
- GMB
