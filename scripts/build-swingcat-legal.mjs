import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataRoot = resolve(root, 'content/swingcat-legal');
const manifest = JSON.parse(await readFile(resolve(dataRoot, 'locales.json'), 'utf8'));
const write = process.argv.includes('--write');
const check = process.argv.includes('--check');
if (write === check) throw new Error('Use exactly one of --check or --write.');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const hash = (s) => createHash('sha256').update(JSON.stringify(s)).digest('hex');
const isReady = (row) => ['source-ready', 'translation-reviewed'].includes(row.state);
const unique = [...new Map(manifest.locales.map((r) => [r.webLocale, r])).values()];
const ready = unique.filter(isReady);
const kinds = ['privacy', 'terms'];
let checked = 0;
const outputs = [];

function validate(doc, source) {
  if (doc.kind !== source.kind || doc.sections.map((s) => s.id).join() !== source.sections.map((s) => s.id).join()) throw new Error(`Section mismatch: ${doc.locale}/${doc.kind}`);
  if (!['source-reviewed', 'translation-reviewed'].includes(doc.status)) throw new Error(`Unreviewed document: ${doc.locale}/${doc.kind}`);
  if (doc.locale !== 'en' && doc.sourceHash !== hash(source.sections)) throw new Error(`Stale source: ${doc.locale}/${doc.kind}`);
  for (const s of doc.sections) {
    if (!s.html.trim() || (s.id !== 'intro' && !s.heading?.trim())) throw new Error(`Empty section: ${doc.locale}/${s.id}`);
    if (/<(?:script|iframe|object|embed)\b|\bon\w+\s*=|javascript:/i.test(s.html)) throw new Error(`Unsafe HTML: ${doc.locale}/${s.id}`);
  }
  if (doc.locale !== 'en' && doc.locale !== 'ja') {
    const untranslated = doc.sections.filter((s, i) => s.html === source.sections[i].html);
    if (untranslated.length) throw new Error(`Untranslated body: ${doc.locale}/${untranslated.map((s) => s.id)}`);
  }
  const body = doc.sections.map((s) => s.html).join('');
  if (doc.kind === 'privacy' && !body.includes('https://www.revenuecat.com/privacy')) throw new Error(`Missing RevenueCat disclosure: ${doc.locale}`);
  for (const needle of ['mailto:hello@syncraft.dev', ...(doc.kind === 'terms' ? ['https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'] : [])]) {
    if (!body.includes(needle)) throw new Error(`Missing required link: ${doc.locale}/${needle}`);
  }
}

function render(row, doc, fallback = false) {
  const english = manifest.locales.find((r) => r.appLocale === 'en');
  const target = fallback ? english : row;
  const locale = fallback ? 'en' : doc.locale;
  const ja = locale === 'ja';
  const home = row.webLocale === 'ja' ? '/swingcat/' : (['en','de','fr','es','it','ko','pt-BR','zh-Hans','zh-Hant-TW'].includes(row.webLocale) ? row.path : '/swingcat/en/');
  const other = doc.kind === 'privacy' ? 'terms' : 'privacy';
  const title = doc.title;
  const options = ready.map((r) => `<option value="${r.path}${doc.kind}/"${r.webLocale === target.webLocale ? ' selected' : ''}>${esc(r.name)}</option>`).join('');
  const alternates = ready.map((r) => `<link rel="alternate" hreflang="${r.webLocale === 'zh-Hant-TW' ? 'zh-Hant' : r.webLocale}" href="https://syncraft.dev${r.path}${doc.kind}/">`).join('');
  const content = doc.sections.map((s) => `<section id="${s.id}">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ''}${s.html}</section>`).join('\n');
  const notice = fallback ? `<p class="translation-notice" role="note">${esc(row.name)}: A full translation of this document is being prepared. The English text is shown below. <a href="${english.path}${doc.kind}/">Read the English document</a>.</p>` : '';
  return `<!doctype html>
<html lang="${locale}" dir="${fallback ? 'ltr' : row.direction}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="SwingCat ${esc(title)}"><meta name="robots" content="${fallback ? 'noindex, follow' : 'index, follow'}"><link rel="canonical" href="https://syncraft.dev${target.path}${doc.kind}/">${alternates}<title>SwingCat ${esc(title)}</title><link rel="stylesheet" href="/swingcat/legal.css"><style>.content{overflow-wrap:anywhere}.content ol,.content ul{padding-inline-start:1.55em;padding-inline-end:0}.language-select{max-width:40vw}.translation-notice{padding:16px;border:1px solid #dfdfda;border-radius:12px;line-height:1.7}[dir=rtl] .back-link::before{content:'→'}@media(max-width:400px){.back-link{display:none}.legal-sheet{padding:24px 18px}}</style></head><body>
<header><div class="header-inner"><a href="${home}" aria-label="SwingCat"><img class="logo" src="/swingcat/assets/swingcat_logo_texticonl.png" alt="SwingCat"></a><div class="legal-actions"><select class="language-select" aria-label="${ja ? '言語を選択' : 'Select language'}" onchange="if(this.value)window.location.href=this.value">${options}</select><a class="back-link" href="${home}">${ja ? 'SwingCatへ戻る' : 'SwingCat'}</a></div></div></header>
<main><article class="container legal-sheet" data-document-version="${doc.updatedDate}" data-source-hash="${hash(doc.sections)}"><p class="eyebrow">SWINGCAT</p><h1>${esc(title)}</h1><p class="dates">${doc.datesHtml}</p>${notice}<hr class="rule"><div class="content">${content}</div></article></main>
<footer><div class="footer-inner"><span>© ${new Date().getUTCFullYear()} SwingCat</span><div class="footer-links"><a href="${target.path}${other}/">${ja ? (other === 'privacy' ? 'プライバシーポリシー' : '利用規約') : (other === 'privacy' ? 'Privacy Policy' : 'Terms of Use')}</a><a href="${home}">SwingCat</a><a href="mailto:hello@syncraft.dev">${ja ? 'お問い合わせ' : 'Contact'}</a></div></div></footer></body></html>
`;
}

if (new Set(manifest.locales.map((r) => r.appLocale)).size !== manifest.locales.length) throw new Error('Duplicate app locales');
const store = manifest.locales.flatMap((r) => r.storeLocales);
if (new Set(store).size !== store.length) throw new Error('Duplicate store locales');
for (const row of unique) {
  if (!/^\/swingcat\/(?:[A-Za-z-]+\/)?$/.test(row.path)) throw new Error(`Invalid path: ${row.path}`);
  if (!isReady(row) && !row.legacyEnglishBodyRoute) continue;
  for (const kind of kinds) {
    const source = JSON.parse(await readFile(resolve(dataRoot, `en/${kind}.json`), 'utf8'));
    const fallback = !isReady(row);
    const doc = fallback ? source : JSON.parse(await readFile(resolve(dataRoot, `${row.webLocale}/${kind}.json`), 'utf8'));
    validate(doc, source);
    const output = render(row, doc, fallback);
    const path = resolve(root, `public${row.path}${kind}/index.html`);
    outputs.push({ path, output });
    checked++;
  }
}
// Validate every document before changing any generated page.
for (const { path, output } of outputs) {
  if (write) { await mkdir(dirname(path), { recursive: true }); await writeFile(path, output); }
  else if (await readFile(path, 'utf8') !== output) throw new Error(`Generated page differs: ${path}`);
}
console.log(JSON.stringify({ pages: checked, appLocales: manifest.locales.length, storeLocales: store.length, translatedRoutes: ready.length, pendingAppLocales: manifest.locales.filter((r) => !isReady(r)).map((r) => r.appLocale) }));
