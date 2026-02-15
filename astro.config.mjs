import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://syncraft.dev',
  integrations: [
    sitemap({
      customPages: [
        'https://syncraft.dev/timesense/',
        'https://syncraft.dev/timesense/en/',
        'https://syncraft.dev/timesense/terms/',
        'https://syncraft.dev/timesense/privacy/',
        'https://syncraft.dev/timesense/en/terms/',
        'https://syncraft.dev/timesense/en/privacy/',
        'https://syncraft.dev/stealthradar/',
        'https://syncraft.dev/stealthradar/en/',
        'https://syncraft.dev/stealthradar/de/',
        'https://syncraft.dev/stealthradar/nl/',
        'https://syncraft.dev/stealthradar/terms/',
        'https://syncraft.dev/stealthradar/privacy/',
        'https://syncraft.dev/stealthradar/en/terms/',
        'https://syncraft.dev/stealthradar/en/privacy/',
        'https://syncraft.dev/stealthradar/de/terms/',
        'https://syncraft.dev/stealthradar/de/privacy/',
        'https://syncraft.dev/stealthradar/nl/terms/',
        'https://syncraft.dev/stealthradar/nl/privacy/',
      ],
    }),
  ],
  redirects: {
    '/ja': '/',
    '/ja/blog': '/blog',
  },
  build: {
    format: 'directory',
  },
});
