import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Required for Open Graph. Scrapers silently ignore a relative og:image, so
  // BaseLayout builds absolute URLs from Astro.site — which is undefined unless
  // this is set. genesis360.com is the primary domain; securelogicusa.com
  // redirects to it.
  site: 'https://genesis360.com',
  // The Contact page was folded into Get A Quote (2026-09-23). Old links and
  // bookmarks land on the form. public/_redirects carries the same move as a
  // real 301 on Netlify; this covers `astro dev` and any other host.
  redirects: {
    '/contact-us': '/get-a-quote/',
    '/genesis360mistingsystems': '/genesis360/',
  },
  integrations: [
    alpinejs({ entrypoint: '/src/alpine' }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
