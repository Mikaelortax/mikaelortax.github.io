export type Locale = 'sv' | 'en';

export const svToEnMap: Record<string, string> = {
  '/': '/en',
  '/it': '/en/it',
  '/yrkesforare': '/en/professional-driver',
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

export const enToSvMap: Record<string, string> = {
  '/en': '/',
  '/en/it': '/it',
  '/en/professional-driver': '/yrkesforare',
  '/en/projects': '/projekt',
  '/en/capabilities': '/kompetens',
  '/en/about': '/om',
  '/en/contact': '/kontakt',
  '/en/guides': '/sv/guider',
  '/en/cv': '/sv/cv',
};

export const normalizePath = (path: string) => {
  if (!path || path === '/') return '/';
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, '/');
  return collapsed.length > 1 ? collapsed.replace(/\/+$/, '') : collapsed;
};

export const toTrailingSlashPath = (path: string) => {
  const normalized = normalizePath(path);
  return normalized === '/' ? '/' : `${normalized}/`;
};

export const getLocale = (pathname: string): Locale => {
  const path = normalizePath(pathname);
  if (path === '/en' || path.startsWith('/en/')) return 'en';
  return 'sv';
};

export const toEnglishPath = (pathname: string) => {
  const path = normalizePath(pathname);
  if (svToEnMap[path]) return toTrailingSlashPath(svToEnMap[path]);
  if (path.startsWith('/projekt/')) return toTrailingSlashPath(`/en/projects/${path.slice('/projekt/'.length)}`);
  if (path.startsWith('/sv/projekt/')) return toTrailingSlashPath(`/en/projects/${path.slice('/sv/projekt/'.length)}`);
  if (path.startsWith('/en')) return toTrailingSlashPath(path);
  return toTrailingSlashPath(path === '/' ? '/en' : `/en${path}`);
};

export const toSwedishPath = (pathname: string) => {
  const path = normalizePath(pathname);
  if (enToSvMap[path]) return toTrailingSlashPath(enToSvMap[path]);
  if (path.startsWith('/en/projects/')) return toTrailingSlashPath(`/projekt/${path.slice('/en/projects/'.length)}`);
  if (path.startsWith('/en/')) return toTrailingSlashPath(`/${path.slice('/en/'.length)}`);
  if (path === '/en') return '/';
  if (path.startsWith('/sv/')) return toTrailingSlashPath(path);
  return toTrailingSlashPath(path);
};

export const localizePath = (path: string, locale: Locale): string => {
  const pathname = normalizePath(path);
  return locale === 'sv' ? toSwedishPath(pathname) : toEnglishPath(pathname);
};
