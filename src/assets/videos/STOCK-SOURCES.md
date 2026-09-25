# Stock video sources

The following clips are used as cropped, muted application-card loops under the
Mixkit Stock Video Free License:

- `application-human.mp4`: [Man lifting weights in the gym](https://mixkit.co/free-stock-video/man-lifting-weights-in-the-gym-100544/)
- `application-hvac.mp4`: [Aerial view of a building's air conditioning system](https://mixkit.co/free-stock-video/aerial-view-of-a-buildings-air-conditioning-system-49185/)
- `application-agriculture.mp4`: [Greenhouse worker inspects growth of vegetables](https://mixkit.co/free-stock-video/greenhouse-worker-inspects-growth-of-vegetables-5759/)
- `clinic.mp4`: Pexels video ID 31670380, an operating room with a nurse checking on a draped, prepped patient before a procedure — Pexels License (free, no attribution required) — hero, /human/healthcare/. Exact page URL/title/author unrecoverable: the file was downloaded in a prior session whose search-results page wasn't preserved, and Pexels' page-by-ID and download-by-ID endpoints both return errors without the original slug. Replaces an earlier clip of a clinician sterilizing dental instruments, which Joshua said wasn't a fit ("Change healthcare video to a surgery room (not graphic)").
- `classroom.mp4`: [Walking down a library corridor with tables and bookcases](https://mixkit.co/free-stock-video/walking-down-a-library-corridor-with-tables-and-bookcases-21589/) — hero, /human/schools/

No acceptable clip was found for the military market (Mixkit's `military` category and related
categories — `army`, `soldier`, `corridor` — return combat/battlefield footage almost exclusively,
with no empty barracks or military building interior shot). `/human/military/` keeps its still
poster hero.

- `home-interior.mp4`: [Empty Room with Ceiling Fan and Windows](https://www.pexels.com/video/empty-room-with-ceiling-fan-and-windows-19227397/) by Curtis Adams — Pexels License (free, no attribution required) — hero, /hvac/residential/
- `rooftop-unit.mp4`: [Aerial view of industrial rooftop and surrounding landscape](https://www.pexels.com/video/aerial-view-of-industrial-rooftop-and-surrounding-landscape-34448153/) by Altaf Shah — Pexels License (free, no attribution required) — hero, /hvac/commercial/
- `plant-air.mp4`: [Aerial shot of interior of the warehouse](https://www.pexels.com/video/aerial-shot-of-interior-of-the-warehouse-4477651/) by Paul Cruz — Pexels License (free, no attribution required) — hero, /hvac/industrial/

All three HVAC clips landed (unlike the human-section military gap): Mixkit's `air-conditioning`,
`home-interior`, `house-interior`, `roof`, `industrial-building`, and `pipes` categories returned
mostly irrelevant results (dance/nightclub/abandoned-building footage sharing the same tags), so
these came from targeted Pexels searches instead, fetched via WebFetch (search pages) then
downloaded directly with curl (the `pexels.com/download/video/<id>/` links were not
Cloudflare-blocked, unlike the search pages). No market needed its still fallback.

- `facility-walkthrough.mp4`: [Workers with Safety Helmets in Warehouse](https://www.pexels.com/video/workers-with-safety-helmets-in-warehouse-10817415/), Pexels video ID 10817415 — Pexels License (free, no attribution required) — hero, /get-a-quote/. Two people in hard hats walking a warehouse aisle together, standing in for a facility walkthrough. Re-encoded to 1280x720, muted.

- `about-engineers.mp4`: [Couple of scientists on a factory](https://mixkit.co/free-stock-video/couple-of-scientists-on-a-factory-22992/) — Mixkit Stock Video Free License — hero, /about-us/. Two engineers in lab coats reviewing a tablet among plant piping. Replaces the hero-about-poster.jpg still, which was the same image as the /human/military/ hero. Muted, 1280x720.

- `tech-fog.mp4`: [Close-up of Soft White Smoke](https://www.pexels.com/video/close-up-of-soft-white-smoke-9694228/), Pexels video ID 9694228 — Pexels License (free, no attribution required) — hero, /about-us/technology/. A white fog layer rolling across a dark ground, 20 s cut from 0:10, 1280 wide, muted. Replaces an earlier cut of public/videos/securelogic-header.mp4, whose dark-blue smoke vanished under the hero overlay.

- `hvac-hub-family.mp4`: supplied by Joshua 2026-09-25 (not stock) — hero, /hvac/. The cutaway Marty asked for in Userback 8434757: an opened HVAC closet with AeroGuard misting the coil beside a family relaxing in a clean living room. Plays as supplied (its own slow 10 s push-in, no added zoom or reverse), with the louvered closet door trimmed off the left 96 px so no edge shows through the fade; audio stripped. Anchored at 35% (`mediaPosition`) so the cabinet clears the hero's left fade. Replaced stock trials Pexels 9885312, 8524037 and 7415430.
