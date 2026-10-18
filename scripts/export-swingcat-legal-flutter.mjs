import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(resolve(root, 'content/swingcat-legal/locales.json'), 'utf8'));
const fallback = manifest.locales.find((r) => r.appLocale === manifest.fallback);
const available = (r) => ['source-ready','translation-reviewed'].includes(r.state) && r.published === true;
if (!available(fallback)) throw new Error('English fallback must be published and reviewed.');
const entries = manifest.locales.map((r) => `  '${r.appLocale}': '${(available(r) ? r : fallback).path}',`).join('\n');
const output = `// Generated from syncraftdev/content/swingcat-legal/locales.json.\n// Only published, reviewed bodies are selected; existing English-body routes\n// are not counted as translations. Regenerate after verifying new live pages.\nconst legalDocumentPaths = <String, String>{\n${entries}\n};\n`;
const target = resolve(root, '../Swingcat/lib/core/config/legal_document_paths.dart');
if (process.argv.includes('--write')) await writeFile(target, output);
else if (process.argv.includes('--check')) {
  if (await readFile(target, 'utf8') !== output) throw new Error('Flutter legal mapping differs.');
} else throw new Error('Use --check or --write.');
console.log(`Checked ${manifest.locales.length} app locales; ${manifest.locales.filter(available).length} use localized published bodies.`);
