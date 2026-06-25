import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [
    alpinejs({ entrypoint: '/src/alpine' }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
