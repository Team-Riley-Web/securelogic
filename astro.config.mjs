import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Required for Open Graph. Scrapers silently ignore a relative og:image, so
  // BaseLayout builds absolute URLs from Astro.site — which is undefined unless
  // this is set. genesis360.com is the primary domain; securelogicusa.com
  // redirects to it.
  site: 'https://genesis360.com',
  integrations: [
    alpinejs({ entrypoint: '/src/alpine' }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
