# Translation drafts — not published

All 43 non-JA/EN web-language pairs (86 documents) have full-body drafts. They
cover 44 app language options because Spanish ES/MX share a generic translation.
The sources include the RevenueCat privacy disclosure from 2026-10-18.

`normalized/<locale>/{privacy,terms}.json` contains sanitized, versioned drafts.
`google-20261018/` contains local browser captures and is intentionally ignored
by Git. `source-lock.json` fixes the original source versions; `corrections.json`
records editorial corrections. Rerunning normalization must fail if English
sources have changed; never relock old translations without recapturing/review.

Drafts have **not** completed full language editing or native legal review.
Codex checked all governing-law clauses, liability-exception sentences, the
anonymous-ID/customer-attribute paragraphs and the uninstall/deletion statements,
and corrected detected errors. Structural checks do not prove semantic accuracy.
UI labels, dates and link labels also need final review before publication.

These files are outside `public/`, have `translation-draft` status, and are not
activated in `locales.json` or the Flutter mapping. The live generator rejects
unreviewed documents. Do not copy drafts into public pages or mark them reviewed
just because their paragraph/link counts match the source.

From the sibling `syncraft-store-metadata` repository:

```
python3 prepare_legal_translations.py --site ../syncraftdev
python3 build_legal_translation_review.py --site ../syncraftdev --output legal/20261018-translations/review.html
python3 -m unittest tests.test_legal_translations
```

The standalone review HTML compares the English source and each draft without
network access. See `syncraft-store-metadata/legal/20261018-translations/REPORT.md`
for review scope, evidence and remaining work. No App Store metadata or app
release action is part of preparing these drafts.
