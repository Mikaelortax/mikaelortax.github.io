export type Locale = 'sv' | 'en';

export const svToEnMap: Record<string, string> = {
  '/': '/en',
  '/projekt': '/en/projects',
  '/kompetens': '/en/capabilities',
  '/om': '/en/about',
  '/kontakt': '/en/contact',
  '/sv': '/en',
  '/sv/projekt': '/en/projects',
  '/sv/guider': '/en/guides',
  '/sv/om': '/en/about',
  '/sv/cv': '/en/cv',
  '/sv/kontakt': '/en/contact',
};

export const enToSvMap: Record<string, string> = Object.fromEntries(
  Object.entries(svToEnMap).map(([svPath, enPath]) => [
    enPath,
    svPath.startsWith('/sv') ? svPath.replace(/^\/sv/, '') || '/' : svPath,
  ])
);

const normalizePath = (path: string) => {
  if (!path || path === '/') return '/';
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, '/');
  return collapsed.length > 1 ? collapsed.replace(/\/+$/, '') : collapsed;
};

export const getLocale = (pathname: string): Locale => {
  const path = normalizePath(pathname);
  if (path === '/en' || path.startsWith('/en/')) return 'en';
  return 'sv';
};

const toEnglishPath = (pathname: string) => {
  const path = normalizePath(pathname);
  if (svToEnMap[path]) return svToEnMap[path];
  if (path.startsWith('/projekt/')) return `/en/projects/${path.slice('/projekt/'.length)}`;
  if (path.startsWith('/sv/projekt/')) return `/en/projects/${path.slice('/sv/projekt/'.length)}`;
  if (path.startsWith('/en')) return path;
  return '/en';
};

const toSwedishPath = (pathname: string) => {
  const path = normalizePath(pathname);
  if (enToSvMap[path]) return enToSvMap[path];
  if (path.startsWith('/en/projects/')) return `/projekt/${path.slice('/en/projects/'.length)}`;
  if (path.startsWith('/en/')) return `/${path.slice('/en/'.length)}`;
  if (path === '/en') return '/';
  if (path.startsWith('/sv/')) return `/${path.slice('/sv/'.length)}`;
  return '/';
};

export const localizePath = (path: string, locale: Locale): string => {
  const pathname = normalizePath(path);
  return locale === 'sv' ? toSwedishPath(pathname) : toEnglishPath(pathname);
};
