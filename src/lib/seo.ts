import { enToSvMap, normalizePath, svToEnMap, toEnglishPath, toSwedishPath } from './i18n';

export type SeoLang = 'sv' | 'en';

export interface SeoAlternate {
  hreflang: 'sv' | 'en' | 'x-default';
  href: string;
}

export interface I18nSeo {
  lang: SeoLang;
  canonical: string;
  alternates: [SeoAlternate, SeoAlternate, SeoAlternate];
}

export const siteName = 'Mikael Johansson';

const hasEnPrefix = (pathname: string): boolean => /^\/en(?:\/|$)/.test(pathname);

const normalizeSite = (site: string): URL => {
  const url = new URL(site);
  return new URL(url.origin);
};

export const toAbsoluteUrl = (site: URL, path: string): string => {
  const url = new URL(path, site);
  return url.pathname === '/'
    ? url.origin
    : `${url.origin}${url.pathname}${url.search}${url.hash}`;
};

export const formatSeoTitle = (rawTitle: string, brand: string = siteName): string => {
  const normalized = (rawTitle || '').trim().replace(/\s+/g, ' ');
  if (!normalized) return brand;

  const parts = normalized
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => part !== brand);

  return parts.length ? [...parts, brand].join(' | ') : brand;
};

export const isKnownLocalizedPath = (pathname: string): boolean => {
  const path = normalizePath(pathname);
  return Boolean(svToEnMap[path] || enToSvMap[path]);
};

export function buildI18nSeo(site: string, pathname: string): I18nSeo {
  const baseSite = normalizeSite(site);
  const normalizedPath = normalizePath(pathname);
  const lang: SeoLang = hasEnPrefix(normalizedPath) ? 'en' : 'sv';

  const svPath = lang === 'en' ? toSwedishPath(normalizedPath) : normalizedPath;
  const enPath = toEnglishPath(svPath);
  const canonicalPath = lang === 'en' ? enPath : svPath;

  const svHref = toAbsoluteUrl(baseSite, svPath);
  const enHref = toAbsoluteUrl(baseSite, enPath);
  const canonical = toAbsoluteUrl(baseSite, canonicalPath);

  return {
    lang,
    canonical,
    alternates: [
      { hreflang: 'sv', href: svHref },
      { hreflang: 'en', href: enHref },
      { hreflang: 'x-default', href: svHref },
    ],
  };
}
