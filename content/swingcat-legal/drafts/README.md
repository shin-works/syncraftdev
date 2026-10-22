# Translation drafts — not published

All 43 non-JA/EN web-language pairs (86 documents) have full-body drafts. They
cover 44 app language options because Spanish ES/MX share a generic translation.
The sources include the RevenueCat privacy disclosure from 2026-10-18.

`normalized/<locale>/{privacy,terms}.json` contains sanitized, versioned drafts.
`google-20261018/` contains local browser captures and is intentionally ignored
by Git. `source-lock.json` fixes the original source versions; `corrections.json`
records editorial corrections. Rerunning normalization must fail if English
sources have changed; never relock old translations without recapturing/review.

The second Codex review on 2026-10-18 compared all 86 documents with the English
source in full, including conditions, negations, dates, provider-link labels,
and navigation labels. Detected meaning and grammar errors were corrected.
Native-language editing and legal review have not been performed. Structural
checks do not prove semantic accuracy. These archived draft files retain their
draft status; publication candidates must be bound to the full-review hashes.

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
in `syncraft-store-metadata/legal/20261018-second-review/REPORT.md`. UI corrections
are stored as `uiDraft` overrides alongside the body corrections, so regeneration
preserves their reviewed wording. `audit_legal_translation_drafts.py` verifies
idempotence and integrity without certifying semantic quality or publishing.
