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

- [x] pull in all blogs from here: https://securelogicusa.com/blogs/
- [x] implement the blog reader (see ###blogreader section below)
- [x] Build out site map and direction (see ###sitemap section below)
- [x] Update homepage hero copy to lead with "Engineering better environments" tagline (see ###homehero section belowcurrently "Disinfection Reimagined.")
- [x] Make a resources page: https://securelogicusa.com/resources/
- [x] Bring in documentation and brochures as a part of the resources: https://securelogicusa.com/resources/documentation/ https://securelogicusa.com/resources/brochures/
- [x] Add about us page: https://securelogicusa.com/about-us/
- [x] Determine where best to recreate this page: https://securelogicusa.com/about-us/technology/ (recreated at /about-us/technology/)
- [x] Add FAQs page: https://securelogicusa.com/resources/faqs/
- [x] Create BotaniMax page: https://securelogicusa.com/botanimax/
- [x] Create Genesis360 page: https://securelogicusa.com/genesis360mistingsystems/
- [x] Improve blog styles - lets try moving the blog image as the hero image (see ###bloghero) and move get a quote CTA above Keep reading section. Make get a quote CTA more narrow to match the width of the blog text
- [x] Improve the Get A Quote component - make it looks much nicer
- [x] Match the font and styling of /Users/joshuariley/Downloads/life2health-main/resources
- [x] Bring back the home hero typing effect and words - lets just try "Engineering Better Environments" centered removing all the rest of the content (Move <10 μm dry-mist droplet size 360° air and surface coverage Automated programmable cycles to Applications That Demand Precision section)
- [x] Interior nav should match home page nav - not sure why they appear different
-- [x] When scrolled the nav button should be the dark green
- [x] On interior pages the get a quote form should always come before the footer
- [x] Make a test homepage with the same content following this site's design/styles: https://www.blueland.com/
- [x] Make a 2nd test homepage with the same content following this site's design/styles: https://www.ecos.com/
- [x] Rename `/test-homepage-blueland/` to `/alt-homepage-test/` and match its hero to the main homepage videos, text, and typing animation
- [x] Update the `/alt-homepage-test/` hero: keep the rotating videos and typing headline, restore the supporting description and CTA button, remove the curved/swoop divider at the bottom, and add a subtle blue tint so the video matches the page palette
- [x] Fix the `/alt-homepage-test/` mega-menu hover bridge so the dropdown remains reachable from its trigger, and make the open dropdown layer cleanly over the secondary navigation
- [x] Simplify the `/alt-homepage-test/` secondary navigation to Genesis 360, BotaniMax, and “Shop All” (replacing Human, HVAC, Ag, and Resources)
- [x] Center the Secure Logic logo precisely in the `/alt-homepage-test/` header regardless of the widths of the left and right navigation groups
- [x] Animate the `/alt-homepage-test/` announcement bar through “Automated, Whole-Room Disinfection,” “Sub-10 μm Dry-Mist Precision,” and “Botanical Chemistry, Built for Precision,” with accessible reduced-motion behavior
- [x] Add polished scrolling effects to `/alt-homepage-test/`, including `x-intersect` content reveals and the prescribed scroll-scale treatment for content images, while respecting reduced-motion preferences
- [x] Rework the `/alt-homepage-test/` BotaniMax section: move the BotaniMax logo above the right-side eyebrow/content and enlarge the product image on the left
- [x] Bring the original index page’s animated particle background treatment into `/alt-homepage-test/`
- [x] Replace the repeated Sparkles icons under “Engineered for Facilities That Can’t Afford Inconsistency” on `/alt-homepage-test/` with four distinct, concept-specific icons
- [x] Upgrade the `/alt-homepage-test/` Certifications & Compliance section with clearer matching certification icons and a clean animated droplet/atom visual treatment
- [x] Refresh the `/alt-homepage-test/` “Why Facilities Switch” section with suitable facility photography from `src/assets/images/`, prioritizing any newly supplied client images
- [x] Restyle `/alt-homepage-test/` “From the Field” to match the index page’s recent-post cards, keep three posts, and show each post’s title and “Read more” link
- [x] Keep the index homepage navigation dark green while scrolling; keep its logo/CTA readable, change the Human, HVAC, Ag, Resources, and About Us links to white, and use a subtly tinted hover state
- [x] Move the animated droplet/atom treatment from `/alt-homepage-test/` Certifications & Compliance into “How It Works: Droplet Behavior Defines Performance,” replacing the current physics image while retaining the certification seals
- [x] Rework the `/alt-homepage-test/` BotaniMax feature with a much larger bottle, no image-panel background, an overflow-hidden fixed-height composition, stronger scroll parallax that reveals more of the bottle, and no gap between the BotaniMax logo and eyebrow
- [x] Replace the `/alt-homepage-test/` “Why Facilities Switch” photograph with the newest suitable client image added to `src/assets/images/`
- [x] Center the `/alt-homepage-test/` “View All Posts” CTA beneath the recent-post cards at every breakpoint
- [x] Give the `/alt-homepage-test/` “Even Our Reports Are Clean” footer a gradient from the current blue to the darker page blue
- [x] Update the index header to use `logo-tight.png`; keep the top-of-page navigation transparent with the logo in color, then retain the dark-green scrolled state with readable navigation and CTA treatments
- [x] Restyle index mega-menu item tiles in alternating brand colors within every group: light blue with dark-blue icons, then light green with dark-green icons, including matching non-lime hover states
- [x] Adjust the `/alt-homepage-test/` BotaniMax composition so the oversized parallax bottle is clipped only by the section boundary rather than by internal top padding
- [x] Redesign `/alt-homepage-test/` “Explore By Application” around only Human, HVAC, and Agriculture using three strong facility photographs and larger high-impact cards; move the animated background particles here and return “Engineered for Facilities” to its original plain background
- [x] Remove the small overlapping secondary photograph from `/alt-homepage-test/` “Why Facilities Switch,” retaining a single strong client image
- [x] Convert `/alt-homepage-test/` testimonials into an image-led, horizontally scrollable carousel with previous/next controls and the same looping behavior as the index carousel
- [x] Expand `/alt-homepage-test/` “Start Protecting Your Facility” with supporting copy and a mist-video feature using the best available existing clip until a dedicated asset is supplied
- [x] Upgrade the `/alt-homepage-test/` footer gradient and replace the Blueland design-test disclaimer with a right-aligned “Crafted with care by Team Riley” credit
- [x] Reduce the index header and `logo-tight.png` scale, then align the scrolled fixed-nav bottom edge with the logo’s horizontal rule so the “LOGIC” portion appears to sit partially below the navigation bar without disrupting links, hit targets, or responsive behavior
- [x] Reverse the index logo treatments: use a white logo treatment over the transparent top-of-page hero, then reveal the full-color `logo-tight.png` treatment in the scrolled navigation state with sufficient contrast against the dark-green bar
- [x] Replace the `/alt-homepage-test/` “How It Works” atom with a polished H₂O molecule animation inspired by https://codepen.io/ParasBaweja/pen/Rwdrzvw, using a recognizable bent oxygen-and-two-hydrogen structure, dimensional CSS motion, Secure Logic brand colors, responsive sizing, and reduced-motion accessibility
- [x] Source, optimize, and integrate distinct stock video loops for the Human, HVAC, and Agriculture cards in `/alt-homepage-test/` “Explore By Application,” and widen the three showcase cards without compromising responsive behavior or page performance
- [x] Simplify `/alt-homepage-test/` “Explore By Application” copy by removing the section description and “Application 01/02/03” labels, then slightly enlarge each card description while tightening its line height
- [x] Completely redesign `/alt-homepage-test/` “The Genesis 360 Platform” into a more impressive product showcase with stronger imagery, hierarchy, depth, and individual product presentation
- [x] Tighten `/alt-homepage-test/` “Proof, Not Promises” certification layout so the marks form a more compact, cohesive group with less horizontal and vertical spacing
- [x] Reposition and enlarge the `/alt-homepage-test/` BotaniMax bottle so its parallax motion begins lower, remains clear of the section’s top crop at every point, and presents a closer product view
- [x] Remove the video feature from the `/alt-homepage-test/` “Start Protecting Your Facility” pre-footer while retaining the improved supporting copy and primary CTA
- [x] Add the newest supplied Secure Logic graphic as a subtle ghosted top-left footer decoration on `/alt-homepage-test/`, preserving footer text contrast and responsive behavior
- [x] Adapt the animated background behind the `/alt-homepage-test/` H₂O molecule to echo https://codepen.io/ykadosh/pen/eXreyj, while retaining Secure Logic styling, responsive behavior, and reduced-motion accessibility
- [x] Verify the source and meaning of the H₂O molecule’s 104.5° bond angle, then add an accessible information hover/focus state that explains it in plain language
- [x] Replace the InRoomMist cutout in `/alt-homepage-test/` “The Genesis 360 Platform” with the supplied Genesis 360 wall-mounted-in-a-gym photograph, while leaving the other system imagery unchanged for now
- [x] Reduce the excess top spacing in the `/alt-homepage-test/` BotaniMax feature while preserving intentional section-boundary clipping and responsive layout
- [x] Increase the `/alt-homepage-test/` BotaniMax bottle’s vertical parallax travel so substantially more of the product is revealed through scrolling, without allowing it to clip through the section top and while respecting reduced-motion preferences
- [x] Lower and recenter the oxygen atom in the `/alt-homepage-test/` H₂O animation so it becomes the visual center point and aligns precisely with the orbital animation behind it
- [x] Remove the standalone green lone-pair dots from the `/alt-homepage-test/` H₂O molecule and transfer their growing pulse treatment into subtle outer-edge animations on the hydrogen and oxygen atoms
- [x] Reduce the `/alt-homepage-test/` H₂O orbital background’s moving dots from six to three—one per ring—while retaining balanced staggered motion and the reduced-motion fallback
- [x] Condense `/alt-homepage-test/` “The Genesis 360 Platform” to a smaller three-product showcase featuring the large InRoomMist gym installation plus Compact Mist and PortableMist, and clearly explain that additional mist-device configurations are available
- [x] Increase the `/alt-homepage-test/` BotaniMax bottle’s vertical scroll travel slightly beyond its current range while preserving the lower starting position, section-boundary clipping, and reduced-motion fallback


### bloghero
<section id="hero" class="relative overflow-hidden bg-ink px-6 pb-24 pt-40 text-white sm:px-10"><img src="/_astro/beader-header-3.D32162Fc.png" alt="" class="absolute inset-0 h-full w-full object-cover object-center sm:object-center" aria-hidden="true"><div class="absolute inset-0 bg-ink/70" aria-hidden="true"></div><div class="relative mx-auto max-w-[1040px] text-center"><div class="mb-8 flex items-center justify-center gap-4"><div class="h-px w-6 bg-gold"></div><span class="font-label text-[10px] uppercase tracking-[var(--tracking-widest)] text-gold">The Story of Rosario</span><div class="h-px w-6 bg-gold"></div></div><h1 class="mb-7 font-display text-[48px] font-light leading-none tracking-normal md:text-[78px]">Every Name Carries a Story.</h1><p class="mx-auto max-w-[740px] font-sans text-[16px] font-light leading-[1.85] text-white/68">Long before this was a shop, Rosario Leonardi was a man and this is his story.</p></div></section>
