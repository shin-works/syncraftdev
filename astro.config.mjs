import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

const legalLocales = JSON.parse(readFileSync(new URL('./content/swingcat-legal/locales.json', import.meta.url), 'utf8'));
const swingCatLegalPages = [...new Set(legalLocales.locales
  .filter((row) => row.published && ['source-ready', 'translation-reviewed'].includes(row.state))
  .flatMap((row) => ['privacy', 'terms'].map((kind) => `https://syncraft.dev${row.path}${kind}/`)))];

export default defineConfig({
  site: 'https://syncraft.dev',
  integrations: [
    sitemap({
      filter: (page) => !new URL(page).pathname.match(/^\/preview\/?$/),
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
        'https://syncraft.dev/clocktimer/',
        'https://syncraft.dev/clocktimer/en/',
        'https://syncraft.dev/clocktimer/privacy/',
        'https://syncraft.dev/clocktimer/terms/',
        'https://syncraft.dev/clocktimer/en/privacy/',
        'https://syncraft.dev/clocktimer/en/terms/',
        'https://syncraft.dev/swingcat/',
        'https://syncraft.dev/swingcat/en/',
        ...swingCatLegalPages,
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
