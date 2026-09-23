// src/scripts/scroll-drift.ts
// Scroll-linked translate for decorative art and product shots, loaded on every
// page by BaseLayout. Opt in per element:
//
//   data-scroll-drift="from,to"      translateY in px across the element's pass
//                                    through the viewport (progress 0 → 1)
//   data-scroll-drift-lg="from,to"   same, at >= 1024px (optional)
//   data-scroll-drift-scale="1.12"   constant scale carried alongside (optional)
//   data-scroll-drift-frame="parent" measure the parent instead of the element
//                                    (use when the element itself is transformed
//                                    art inside a fixed frame, like the bottle)
//
// Progress uses the same formula as the home page's BotaniMax parallax, so a
// bottle wired through here moves exactly like the one on /. The transform is
// written to the `translate`/`scale` properties rather than `transform`, so it
// composes with any CSS animation (the About molecules pulse on `transform`).
// Reduced motion: never moves; elements sit at their `to` value.

const els = () => Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-drift]'));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function pair(v: string | undefined): [number, number] | null {
  if (!v) return null;
  const [a, b] = v.split(',').map(Number);
  return Number.isFinite(a) && Number.isFinite(b) ? [a, b] : null;
}

function update() {
  const vh = window.innerHeight;
  const lg = window.innerWidth >= 1024;
  for (const el of els()) {
    const range = (lg && pair(el.dataset.scrollDriftLg)) || pair(el.dataset.scrollDrift);
    if (!range) continue;
    const scale = el.dataset.scrollDriftScale;
    if (scale) el.style.scale = scale;
    const frame = el.dataset.scrollDriftFrame === 'parent' ? el.parentElement ?? el : el;
    const rect = frame.getBoundingClientRect();
    let progress = 1;
    if (!reduced) {
      if (rect.bottom < 0 || rect.top > vh) continue;
      progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
    }
    el.style.translate = `0 ${range[0] + (range[1] - range[0]) * progress}px`;
  }
}

let frame: number | null = null;
const schedule = () => {
  if (frame !== null) return;
  frame = requestAnimationFrame(() => { frame = null; update(); });
};

update();
if (!reduced) {
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
}
