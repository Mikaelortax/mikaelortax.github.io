export type Locale = 'sv' | 'en';

export const svToEnMap: Record<string, string> = {
  '/sv': '/en',
  '/sv/projekt': '/en/projects',
  '/sv/guider': '/en/guides',
  '/sv/om': '/en/about',
  '/sv/cv': '/en/cv',
  '/sv/kontakt': '/en/contact',
};

export const enToSvMap: Record<string, string> = Object.fromEntries(
  Object.entries(svToEnMap).map(([svPath, enPath]) => [enPath, svPath])
);

const normalizePath = (path: string) => {
  if (!path || path === '/') return '/';
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return withLeadingSlash.length > 1
    ? withLeadingSlash.replace(/\/+$/, '')
    : withLeadingSlash;
};

export const getLocale = (pathname: string): Locale => {
  const path = normalizePath(pathname);
  if (path === '/en' || path.startsWith('/en/')) return 'en';
  return 'sv';
};

export const localizePath = (path: string, locale: Locale): string => {
  const pathname = normalizePath(path);
  if (pathname === '/') return locale === 'sv' ? '/' : '/en';

  if (locale === 'sv') {
    if (enToSvMap[pathname]) return enToSvMap[pathname];
    if (svToEnMap[pathname]) return pathname;
    if (pathname === '/sv' || pathname.startsWith('/sv/')) return pathname;
    return '/sv';
  }

  if (svToEnMap[pathname]) return svToEnMap[pathname];
  if (enToSvMap[pathname]) return pathname;
  if (pathname === '/en' || pathname.startsWith('/en/')) return pathname;
  return '/en';
};
