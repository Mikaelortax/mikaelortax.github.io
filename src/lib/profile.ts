import type { Locale } from './i18n';

export type SiteProfile = 'it' | 'transport';

export const cvPdfPaths: Record<Locale, string> = {
  sv: '/documents/mikael-johansson-cv-sv.pdf',
  en: '/documents/mikael-johansson-cv-en.pdf',
};

export const getCvPdfHref = (lang: Locale) => cvPdfPaths[lang];

export const getCvPdfLinkProps = (lang: Locale) =>
  ({
    href: getCvPdfHref(lang),
    target: '_blank',
    rel: 'noopener noreferrer',
  }) as const;

export const profilePaths = {
  sv: {
    home: '/',
    it: '/',
    itDirect: '/it',
    transport: '/yrkesforare',
    projects: '/projekt',
    capabilities: '/kompetens',
    about: '/om',
    cv: '/sv/cv',
    contact: '/kontakt',
  },
  en: {
    home: '/en',
    it: '/en',
    itDirect: '/en/it',
    transport: '/en/professional-driver',
    projects: '/en/projects',
    capabilities: '/en/capabilities',
    about: '/en/about',
    cv: '/en/cv',
    contact: '/en/contact',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export const getProfilePaths = (lang: Locale) => profilePaths[lang];

export const getCrossProfileHref = (lang: Locale, profile: SiteProfile) =>
  profile === 'transport' ? profilePaths[lang].itDirect : profilePaths[lang].transport;

export interface QualificationItem {
  label: string;
  value: string;
}

export interface EducationItem {
  title: string;
  school: string;
  period: string;
  details: string[];
}

export const transportQualifications: Record<Locale, QualificationItem[]> = {
  sv: [
    { label: 'Körkort', value: 'B och C' },
    { label: 'Arbete På Väg', value: '1.1, 1.2, 1.3' },
    { label: 'Truckkort', value: 'A2, A2, A4, B1, D' },
    { label: 'ADR', value: 'Grund och explosivt' },
  ],
  en: [
    { label: 'Driving licenses', value: 'B and C' },
    { label: 'Road work safety', value: 'Arbete På Väg: 1.1, 1.2, 1.3' },
    { label: 'Forklift license', value: 'A2, A2, A4, B1, D' },
    { label: 'ADR', value: 'Basic and explosive goods' },
  ],
};

export const transportEducation: Record<Locale, EducationItem[]> = {
  sv: [
    {
      title: 'Yrkesförarutbildning för lastbil',
      school: 'Transportutbildning',
      period: '2025 - 2026 (genomförd)',
      details: ['Lastsäkring', 'YKB', 'C-behörighet', 'Truckbehörigheter', 'Praktiska moment inom säker transport och yrkeskörning'],
    },
  ],
  en: [
    {
      title: 'Professional truck driver training',
      school: 'Transport education',
      period: '2025 - 2026 (completed)',
      details: ['Load securing', 'YKB', 'C-license qualification', 'Forklift qualifications', 'Practical modules in transport safety and professional driving'],
    },
  ],
};
