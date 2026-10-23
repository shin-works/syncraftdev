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

The second Codex review on 2026-10-18 compared all 86 draft documents (43
languages) against the English source in full. Corrections include purchase and
liability conditions, data-processing qualifications, visible contact addresses,
and earned-title terminology matched to the app. Drafts remain unpublished;
this self-review does not certify native-language quality or local legal compliance.
Evidence, exact before/after edits, and reviewed document hashes are in the sibling
repository `syncraft-store-metadata/legal/20261018-second-review/`.

## 2026-10-24 shared platform revision

All 45 web languages (90 documents) cover iOS and Android at their existing URLs.
Apple EULA remains scoped to the App Store iOS version. Purchase, renewal,
cancellation and restoration clauses follow the store used for the purchase.
RevenueCat factual disclosures and non-platform clauses are retained.
The platform revisions were translated locally by Codex and editorially reviewed;
no external translation service was used for this revision, and this is not
native-speaker legal certification.
