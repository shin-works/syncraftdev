# SynCraft — paper-and-ink site

## Final direction

White paper, black linework, generous whitespace, and a small yellow accent. The hero keeps “Crafting ideas in sync.” and its continuous-line town, with three miniature residents running and jumping across the scene. Josefin Sans Regular is used for the hero and service names; Manrope and native Japanese sans-serif fonts support the rest of the site.

WORKS / NOTES / CONTACT use smaller centered outline headings. The outlines use painted glyph silhouettes, avoiding internal overlaps in letters such as R and A. The original giraffe/wordmark image is retained at a quieter scale.

WORKS shows original illustrations without frames. Hover or keyboard focus crossfades to the actual product OGP within a rounded black frame. Images and captions are ordinary product links; there are no image-toggle toolbars. The WORKS residents match the hero: black for TimeSense, white with a pointed hat for Stealth Radar, yellow with a leaf for ClockTimer. SwingCat keeps its cat.

The introduction says: “役に立つことも、遊び心も。どちらも大切にしながら、SynCraftはプロダクトをつくっています。”

## Shared implementation

- `src/components/HomePage.astro` provides the Japanese and eight translated homepages. `/preview/` uses the same component, stays noindex, and is excluded from the sitemap.
- `src/layouts/BaseLayout.astro` shares SEO, the compact giraffe header, loading indicator, and footer across the corporate site.
- `src/styles/storybook.css` preserves the approved illustrated homepage. `src/styles/editorial.css` adds the notes list, article typography, legal disclosure layout, and accessible native language picker at the right edge of the header.
- `src/i18n/story.ts` contains the new localized interface copy. Existing translated article bodies are unchanged.
- `/brand/` contains local fonts, their OFL licenses, and the town animation. No external font or icon-library requests are needed.
- The loader uses a leaf-headed resident and a short drawn line. It disappears when fonts are ready, has a bounded CSS fallback, and stays hidden without JavaScript or with reduced motion. There is no forced two-second wait or custom cursor.
- The legal disclosure entries and footnote are unchanged. Product-specific landing pages, privacy policies, and terms retain their existing branding and content.
- Product URLs stay intact; the Portuguese TimeSense link targets its actual `/timesense/pt-br/` page. The legacy `#product` anchor is retained.

## Verification and deployment

Build to a separate directory when other work is active in the repository:

```sh
ASTRO_TELEMETRY_DISABLED=1 node node_modules/astro/astro.js build --outDir /private/tmp/syncraft-storybook-build-20260922
python3 scripts/check-site-build.py /private/tmp/syncraft-storybook-build-20260922
```

The build audit checks 47 corporate pages and 1,351 local links/assets, including languages, canonical URLs, anchors, duplicate IDs, indexing rules, and preview sitemap exclusion. Browser checks cover desktop and mobile homepages, notes, articles, legal, language switching, hover reveal, and the nine homepage languages at 320 px. Tables scroll inside the article rather than expanding the page.

The local review is served at `http://127.0.0.1:4397/`. GitHub Actions builds Astro and publishes `dist` to GitHub Pages after a push to `main`. Generated `dist`, unrelated product work, and the video-editor experiment must not be included in the redesign commit.

## Design references

- https://doisena.jp/ — black linework and whitespace; artwork is original to this site.
- https://github.com/google/fonts/tree/main/ofl/josefinsans — Josefin Sans source and license.
- Browser skill used for visual and interaction checks.
