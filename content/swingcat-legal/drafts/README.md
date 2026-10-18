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
The 2026-10-18 follow-up review corrected additional errors in payment types,
third-party transfer direction, conditional wording, game balance and product
names, and reviewed footer labels and provider-link labels for all 86 documents.
Full-body reading in that pass covered fr/de/es/it/nl; other languages received
selected-clause review. Full language editing of all documents is still pending.
Localized dates are shown in the offline viewer but have not all been linguistically
reviewed. None of these checks changes the draft status or activates routes.

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

The latest source-bound review scope, before/after edits and structural audit are
in `syncraft-store-metadata/legal/20261018-final-review/REPORT.md`. UI corrections
are stored as `uiDraft` overrides alongside the body corrections, so regeneration
preserves their reviewed wording. `audit_legal_translation_drafts.py` verifies
idempotence and integrity without certifying semantic quality or publishing.
