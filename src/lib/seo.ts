import { enToSvMap, normalizePath, svToEnMap, toEnglishPath, toSwedishPath, toTrailingSlashPath } from './i18n';

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

  if (!normalized.includes('|') && normalized.toLowerCase().includes(brand.toLowerCase())) {
    return normalized;
  }

  const parts = normalized
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => part !== brand);

  return parts.length ? [...parts, brand].join(' | ') : brand;
};

interface ProjectSeoTitleInput {
  lang: SeoLang;
  slug: string;
  title: string;
  role?: string;
  tags?: string[];
}

const projectTitleTypeLabels = {
  sv: {
    website: 'Webbplats och SEO',
    webProject: 'Webbprojekt och SEO',
    automation: 'Automationsprojekt',
    membership: 'Medlemssystem och webb',
  },
  en: {
    website: 'Website and SEO',
    webProject: 'Web Project and SEO',
    automation: 'Automation Project',
    membership: 'Membership Platform and Web',
  },
} as const;

export const buildProjectSeoTitle = ({ lang, slug, title, role = '', tags = [] }: ProjectSeoTitleInput): string => {
  const labels = projectTitleTypeLabels[lang];
  const fingerprint = `${slug} ${role} ${tags.join(' ')}`.toLowerCase();

  if (
    fingerprint.includes('medlemssystem') ||
    fingerprint.includes('membership') ||
    fingerprint.includes('fullstack') ||
    fingerprint.includes('systemarkitekt') ||
    fingerprint.includes('system architect')
  ) {
    return `${title} – ${labels.membership}`;
  }

  if (
    fingerprint.includes('automation') ||
    fingerprint.includes('n8n') ||
    fingerprint.includes('crm') ||
    fingerprint.includes('integration') ||
    fingerprint.includes('integrering')
  ) {
    return `${title} – ${labels.automation}`;
  }

  if (
    fingerprint.includes('growth engineer') ||
    fingerprint.includes('konvertering') ||
    fingerprint.includes('conversion')
  ) {
    return `${title} – ${labels.webProject}`;
  }

  return `${title} – ${labels.website}`;
};

export const isKnownLocalizedPath = (pathname: string): boolean => {
  const path = normalizePath(pathname);
  return Boolean(svToEnMap[path] || enToSvMap[path]);
};

export function buildI18nSeo(site: string, pathname: string): I18nSeo {
  const baseSite = normalizeSite(site);
  const normalizedPath = normalizePath(pathname);
  const lang: SeoLang = hasEnPrefix(normalizedPath) ? 'en' : 'sv';

  const sourceSvPath = lang === 'en' ? toSwedishPath(normalizedPath) : normalizedPath;
  const svPath = toTrailingSlashPath(sourceSvPath);
  const enPath = lang === 'en' ? toTrailingSlashPath(normalizedPath) : toEnglishPath(sourceSvPath);
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
