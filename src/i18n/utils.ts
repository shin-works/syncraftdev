import {
  translations,
  type Lang,
  type TranslationKey,
  defaultLang,
} from './translations';

/** Get a translated string */
export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang]?.[key] ?? translations[defaultLang][key] ?? key;
}

/** Derive language from the current URL pathname */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment === 'en') return 'en';
  return 'ja';
}

/** Prefix a path with the language directory (JA stays at root) */
export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === 'ja') return path;
  return `/en${path}`;
}

/** Return the same page in the other language */
export function getAlternateLangPath(
  currentPath: string,
  targetLang: Lang,
): string {
  const basePath = currentPath.replace(/^\/en(?=\/|$)/, '') || '/';
  if (targetLang === 'ja') return basePath;
  return `/en${basePath}`;
}
