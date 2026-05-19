import {
  localizedTranslations,
  type Lang,
  type TranslationKey,
  defaultLang,
  blogLangs,
} from './translations';

/** Get a translated string */
export function t(lang: Lang, key: TranslationKey): string {
  return (
    localizedTranslations[lang]?.[key] ??
    localizedTranslations[defaultLang][key] ??
    key
  );
}

/** Derive language from the current URL pathname */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment && isLang(segment)) return segment;
  return defaultLang;
}

/** Prefix a path with the language directory (JA stays at root) */
export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

export function isLang(value: string): value is Lang {
  return blogLangs.includes(value as Lang);
}

export function getBlogIndexPath(lang: Lang): string {
  return getLocalizedPath('/blog/', lang);
}

export function getBlogPostPath(lang: Lang, slug: string): string {
  return getLocalizedPath(`/blog/${slug}/`, lang);
}

/** Return the same page in the other language */
export function getAlternateLangPath(
  currentPath: string,
  targetLang: Lang,
): string {
  const normalizedPath = currentPath === '' ? '/' : currentPath;
  const langPattern = blogLangs
    .filter((lang) => lang !== defaultLang)
    .sort((a, b) => b.length - a.length)
    .join('|');
  const basePath =
    normalizedPath.replace(new RegExp(`^\\/(${langPattern})(?=\\/|$)`), '') ||
    '/';

  return getLocalizedPath(basePath, targetLang);
}
