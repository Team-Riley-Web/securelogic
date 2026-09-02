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

## Seperate TODOS (not for AI)
- match brand blue and green and then incorporate throughout the site 
- Find video of Mist spraying the camera 
- Does Marty want to pay for Slack? I recommend it. even if it's just for a few of the key players. 30 day pro trial
- Is the videographer actually using the proper equipment - gimbal? That means things can't be shaky. need PRO smooth
- GMB
