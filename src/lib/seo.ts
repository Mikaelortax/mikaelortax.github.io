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

const collapseSlashes = (value: string): string => value.replace(/\/{2,}/g, '/');

const normalizePathname = (pathname: string): string => {
  const raw = (pathname || '/').trim();
  const withoutQuery = raw.split('?')[0].split('#')[0];
  const withLeadingSlash = withoutQuery.startsWith('/')
    ? withoutQuery
    : `/${withoutQuery}`;
  const collapsed = collapseSlashes(withLeadingSlash);
  const withoutTrailing =
    collapsed.length > 1 ? collapsed.replace(/\/+$/g, '') : collapsed;
  return withoutTrailing || '/';
};

const hasEnPrefix = (pathname: string): boolean => /^\/en(?:\/|$)/.test(pathname);

const svToEnExact: Record<string, string> = {
  '/': '/en',
  '/projekt': '/en/projects',
  '/kompetens': '/en/capabilities',
  '/om': '/en/about',
  '/kontakt': '/en/contact',
};

const enToSvExact: Record<string, string> = Object.fromEntries(
  Object.entries(svToEnExact).map(([svPath, enPath]) => [enPath, svPath])
);

const toEnglishPath = (swedishPath: string): string => {
  const path = normalizePathname(swedishPath);
  if (svToEnExact[path]) return svToEnExact[path];
  if (path.startsWith('/projekt/')) return `/en/projects/${path.slice('/projekt/'.length)}`;
  if (path.startsWith('/en')) return path;
  return path === '/' ? '/en' : `/en${path}`;
};

const toSwedishPath = (pathname: string): string => {
  const path = normalizePathname(pathname);
  if (enToSvExact[path]) return enToSvExact[path];
  if (path.startsWith('/en/projects/')) return `/projekt/${path.slice('/en/projects/'.length)}`;
  if (path === '/en') return '/';
  if (path.startsWith('/en/')) return `/${path.slice('/en/'.length)}`;
  return path;
};

const normalizeSite = (site: string): URL => {
  const url = new URL(site);
  return new URL(url.origin);
};

const toAbsoluteUrl = (site: URL, path: string): string => {
  const url = new URL(path, site);
  return url.pathname === '/'
    ? url.origin
    : `${url.origin}${url.pathname}${url.search}${url.hash}`;
};

export function buildI18nSeo(site: string, pathname: string): I18nSeo {
  const baseSite = normalizeSite(site);
  const normalizedPath = normalizePathname(pathname);
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
