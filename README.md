# Astro Starter

A minimal Astro starter for client websites.

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start the local Astro dev server |
| `npm run build` | Build the production site |
| `npm run preview` | Preview the production build |
| `npm run check` | Run Astro type checking |

Link the project with `netlify link` or create the Netlify site.

## Stack

- Astro
- Tailwind CSS 4 through `@tailwindcss/vite`
- Alpine.js with the Intersect plugin
- Lucide Astro icons
- Netlify build configuration

The starter is static by default. Add the Netlify adapter only when a client
requires on-demand rendering or server features.

Tailwind CSS 4 is CSS-first, so a JavaScript config file is optional. This
starter includes `tailwind.config.cjs` and loads it explicitly from
`src/styles/global.css` to provide a familiar place for client theme extensions.

`npm audit --omit=dev` reports zero production vulnerabilities. The optional
Astro checker currently introduces a development-only transitive YAML advisory
through Astro's language server.
