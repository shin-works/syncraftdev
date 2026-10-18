# SwingCat legal documents

`locales.json` distinguishes route availability from full translation readiness.
JA/EN sources are split into stable section IDs. Other languages must provide every
section, reference the current English `sections` SHA-256 (compact JSON, UTF-8),
and pass content review before becoming `translation-reviewed`.

Do not run `scripts/generate-swingcat-legal-locales.mjs`: it copies English body
text into localized pages and may overwrite real translations. Use:

```
node scripts/build-swingcat-legal.mjs --write
node scripts/build-swingcat-legal.mjs --check
node --test scripts/swingcat-legal.test.mjs
```

The builder writes reviewed documents and refreshes the eight legacy English-body
routes with explicitly labelled English references. It does not create pages for
untranslated new locales. HTTP 200 and `lang` alone never establish translation
completion. English references are not represented as localized documents.

Translation review must cover meaning, naturalness, all clauses, conditions,
negations, dates, numbers, provider names and links. Automated section checks do
not establish legal validity or semantic correctness. Do not assume that an
English-prevails notice overrides mandatory local consumer protections.

App Store's Apple standard EULA remains separate from these service terms.
The 2026-10-18 privacy revision adds RevenueCat and clarifies deletion requests;
it does not change SDK configuration or App Store privacy declarations.
