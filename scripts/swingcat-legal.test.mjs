import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, cpSync, readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
function fixture(fn) {
  const dir = mkdtempSync(join(tmpdir(), 'swingcat-legal-'));
  try {
    mkdirSync(join(dir, 'scripts'));
    cpSync(join(root, 'scripts/build-swingcat-legal.mjs'), join(dir, 'scripts/build-swingcat-legal.mjs'));
    cpSync(join(root, 'content/swingcat-legal'), join(dir, 'content/swingcat-legal'), { recursive: true });
    cpSync(join(root, 'public/swingcat'), join(dir, 'public/swingcat'), { recursive: true, filter: (p) => !p.includes('/assets') });
    fn(dir);
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
const run = (dir, arg) => execFileSync(process.execPath, ['scripts/build-swingcat-legal.mjs', arg], { cwd: dir, stdio: 'pipe' });
function edit(dir, file, fn) {
  const path = join(dir, 'content/swingcat-legal', file);
  const data = JSON.parse(readFileSync(path)); fn(data);
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}

test('generated pages are current, complete and explicitly label English fallback', () => {
  run(root, '--check');
  for (const locale of ['en', 'ja']) {
    const p = join(root, 'public/swingcat', locale === 'ja' ? '' : locale, 'privacy/index.html');
    const html = readFileSync(p, 'utf8');
    assert.ok(html.includes('https://www.revenuecat.com/privacy'));
    assert.equal((html.match(/id="section-05"/g) || []).length, 1);
    assert.ok(html.includes('data-document-version="2026-10-18"'));
    assert.ok(!html.includes('translation-notice" role='));
  }
  const french = readFileSync(join(root, 'public/swingcat/fr/privacy/index.html'), 'utf8');
  const manifest = JSON.parse(readFileSync(join(root, 'content/swingcat-legal/locales.json')));
  if (manifest.locales.find((r) => r.webLocale === 'fr').state === 'translation-reviewed') {
    const doc = JSON.parse(readFileSync(join(root, 'content/swingcat-legal/fr/privacy.json')));
    assert.ok(french.includes('<html lang="fr"'));
    assert.ok(!french.includes('translation-notice" role='));
    assert.ok(french.includes(doc.ui.selectLanguage));
    assert.ok(french.includes('>Conditions d&#39;utilisation</a>'));
  } else {
    assert.ok(french.includes('<html lang="en"'));
    assert.ok(french.includes('A full translation of this document is being prepared.'));
    assert.ok(french.includes('noindex, follow'));
  }
  const options = [...french.matchAll(/<option value="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(options.length, new Set(options).size);
});

test('an updated source invalidates translations before any output is written', () => fixture((dir) => {
  const target = join(dir, 'public/swingcat/en/privacy/index.html');
  const before = readFileSync(target, 'utf8');
  edit(dir, 'en/privacy.json', (d) => { d.sections[1].html += '<p>Changed data practices.</p>'; });
  assert.throws(() => run(dir, '--write'), /Stale source/);
  assert.equal(readFileSync(target, 'utf8'), before);
}));

test('missing disclosure and missing sections are rejected', () => fixture((dir) => {
  edit(dir, 'en/privacy.json', (d) => { d.sections[5].html = '<p>Purchases.</p>'; });
  assert.throws(() => run(dir, '--write'), /Missing RevenueCat disclosure/);
  edit(dir, 'en/privacy.json', (d) => { d.sections.pop(); });
  assert.throws(() => run(dir, '--write'));
}));

test('unsafe document HTML cannot be generated', () => fixture((dir) => {
  edit(dir, 'en/privacy.json', (d) => { d.sections[1].html += '<img src=x onerror="alert(1)">'; });
  assert.throws(() => run(dir, '--write'), /Unsafe HTML/);
}));

test('declaring a locale ready without its full documents fails', () => fixture((dir) => {
  rmSync(join(dir, 'content/swingcat-legal/fr/privacy.json'), { force: true });
  edit(dir, 'locales.json', (d) => { d.locales.find((r) => r.appLocale === 'fr').state = 'translation-reviewed'; });
  assert.throws(() => run(dir, '--write'), /ENOENT/);
}));

test('all generated internal links point to existing pages or assets', () => {
  const manifest = JSON.parse(readFileSync(join(root, 'content/swingcat-legal/locales.json')));
  const paths = new Set(manifest.locales.filter((r) => ['source-ready','translation-reviewed'].includes(r.state) || r.legacyEnglishBodyRoute).map((r) => r.path));
  for (const path of paths) for (const kind of ['privacy','terms']) {
    const html = readFileSync(join(root, `public${path}${kind}/index.html`), 'utf8');
    for (const [, href] of html.matchAll(/(?:href|src|value)="(\/[^"#?]+)"/g)) {
      const target = href.endsWith('/') ? href + 'index.html' : href;
      assert.doesNotThrow(() => readFileSync(join(root, 'public', target)), `${path}${kind}: ${href}`);
    }
  }
});
