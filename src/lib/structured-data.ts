import { type Locale, toTrailingSlashPath } from './i18n';
import { siteName, toAbsoluteUrl } from './seo';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StructuredDataConfig {
  includeWebsite?: boolean;
  includePerson?: boolean;
  includeProfilePage?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  faqItems?: FaqItem[];
}

interface StructuredDataOptions {
  site: string;
  lang: Locale;
  canonical: string;
  title: string;
  description: string;
  ogImageUrl?: string;
  config?: StructuredDataConfig;
}

const linkedInHref = 'https://www.linkedin.com/in/mikael-johansson-5084515b/';

const knowsAboutByLocale: Record<Locale, string[]> = {
  sv: [
    'SEO',
    'Technical SEO',
    'Webbutveckling',
    'Automation',
    'AI-stödda arbetsflöden',
    'Informationsarkitektur',
    'AEO',
  ],
  en: [
    'SEO',
    'Technical SEO',
    'Web engineering',
    'Automation',
    'AI-assisted workflows',
    'Information architecture',
    'AEO',
  ],
};

const jobTitleByLocale: Record<Locale, string> = {
  sv: 'SEO-specialist, webbutvecklare och automationsspecialist',
  en: 'SEO specialist, web developer, and automation specialist',
};

const websiteDescriptionByLocale: Record<Locale, string> = {
  sv: 'Portfolio för Mikael Johansson med fokus på SEO, webbutveckling, automation och digital tillväxt.',
  en: 'Portfolio for Mikael Johansson focused on SEO, web engineering, automation, and digital growth.',
};

export const serializeJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, '\\u003c');

export function buildStructuredData({
  site,
  lang,
  canonical,
  title,
  description,
  ogImageUrl,
  config = {},
}: StructuredDataOptions) {
  const baseSite = new URL(site);
  const websiteId = `${baseSite.origin}/#website`;
  const personId = `${baseSite.origin}/#mikael-johansson`;
  const homeUrl = toAbsoluteUrl(baseSite, toTrailingSlashPath(lang === 'en' ? '/en' : '/'));
  const schemas: Array<Record<string, unknown>> = [];

  if (config.includeWebsite) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': websiteId,
      name: siteName,
      url: baseSite.origin,
      inLanguage: ['sv', 'en'],
      description: websiteDescriptionByLocale[lang],
      publisher: config.includePerson
        ? { '@id': personId }
        : {
            '@type': 'Person',
            name: siteName,
            url: homeUrl,
          },
    });
  }

  if (config.includePerson) {
    const personSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': personId,
      name: siteName,
      url: homeUrl,
      jobTitle: jobTitleByLocale[lang],
      description,
      sameAs: [linkedInHref],
      knowsAbout: knowsAboutByLocale[lang],
      inLanguage: lang,
    };

    if (ogImageUrl) {
      personSchema.image = ogImageUrl;
    }

    schemas.push(personSchema);
  }

  if (config.includeProfilePage) {
    const profilePageSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${canonical}#profile-page`,
      url: canonical,
      name: title,
      description,
      inLanguage: lang,
      isPartOf: { '@id': websiteId },
    };

    if (config.includePerson) {
      profilePageSchema.mainEntity = { '@id': personId };
    }

    schemas.push(profilePageSchema);
  }

  if (config.breadcrumbs?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: config.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: toAbsoluteUrl(baseSite, toTrailingSlashPath(item.path)),
      })),
    });
  }

  if (config.faqItems?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: config.faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return schemas;
}
