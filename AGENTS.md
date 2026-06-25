# Starter Project Instructions

## Goal

Act as an expert Full-Stack Frontend Engineer specializing in Astro, Tailwind CSS, and Alpine.js. Your goal is to build UI components and pages following the Refactoring UI design framework. Build fast, polished client websites. Start with client-specific information before adding complexity.

## Stack

- Use Astro `.astro` components and layouts with slots.
- Use static output unless the client explicitly requires server rendering.
- Use Tailwind CSS utilities. Keep theme extensions in `tailwind.config.cjs`.
- Use Alpine.js for client-side behavior.
- Register Alpine plugins in `src/alpine.ts`.
- Use `x-intersect` for scroll-triggered reveals.
- Use Lucide Astro for interface icons.
- Use Netlify Forms for static contact forms when required.

## Images

- Store production images in `src/assets/images/`.
- Use Astro's `Image` component from `astro:assets`.
- Include descriptive alt text.
- Provide responsive widths and sizes where the layout requires them.
- Use `priority` for above-the-fold hero images.
- Prefer high-quality client photography. Use Unsplash or Pexels only as a temporary source when client assets are unavailable.
- For images in the content use Scroll Effect:
`<div x-data="{
      updateScrollScaleImages() {
        const viewportHeight = window.innerHeight;

        document.querySelectorAll('[data-scroll-scale-image]').forEach((image) => {
          const frame = image.parentElement;
          const rect = frame.getBoundingClientRect();

          if (rect.bottom < 0 || rect.top > viewportHeight) return;

          const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
          const scale = 1.04 + progress * 0.16;

          image.style.transform = `scale(${scale})`;
        });
      }
    }"
    x-init="
      updateHero();
      updateScrollScaleImages();
      window.addEventListener('scroll', () => requestAnimationFrame(() => { updateHero(); updateScrollScaleImages(); }), { passive: true });
      window.addEventListener('resize', () => requestAnimationFrame(() => { updateHero(); updateScrollScaleImages(); }), { passive: true });
    "
/>

<Image
  src={item.image}
  alt={item.imageAlt}
  class=""
  style="transform: scale(1.04);"
  data-scroll-scale-image
  widths={[640, 960, 1280]}
  sizes="(min-width: 768px) 50vw, 100vw"
/>
`

## Design

- You must strictly adhere to these visual rules:
- Hierarchy: Establish importance using font weight and color (softer grays for secondary text) rather than just size. De-emphasize secondary elements to make primary ones pop.
- Spacing: Use a generous, non-linear spacing scale (Tailwind’s default spacing handles this). Ensure more space between groups than within them.
- Grayscale First: Focus on layout, contrast, and spacing before adding brand colors.
- Color: Use HSL logic. Provide 8-10 shades for grays and primary colors. Avoid pure blacks; use saturated grays (cool or warm).
- Depth: Use two-part shadows (a large soft shadow combined with a tight dark shadow) to create realistic elevation.
- Text: Limit line lengths to 45–75 characters. Align mixed font sizes by their baseline.
- Details: Avoid borders where spacing or subtle background shifts can create separation.
- **Supercharge Defaults:** Replace bullet points with icons, use custom checkboxes, and style links with unique underlines.
- **Accent Borders:** Add small, colorful borders to cards, alerts, or nav items to add visual interest without complexity.
- **Background Decoration:** Use subtle patterns, gradients, or geometric shapes to break up plain backgrounds.
- **Empty States:** Treat empty states as a priority; use illustrations and clear calls-to-action to engage new users.
- **Fewer Borders:** Use box shadows, background color changes, or extra spacing to create separation instead of relying on lines.
- **Outside the Box:** Challenge component conventions (e.g., use selectable cards instead of radio buttons).

## Engineering

1. Do not assume missing client details. Mark placeholders clearly.
2. Use the minimum code needed for the requested site.
3. Touch only files needed for the current client.
4. Run `npm run check` and `npm run build` before handoff.
