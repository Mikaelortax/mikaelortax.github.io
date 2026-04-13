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
    itDirect: '/it/',
    transport: '/yrkesforare/',
    projects: '/projekt/',
    capabilities: '/kompetens/',
    about: '/om/',
    cv: '/sv/cv/',
    contact: '/kontakt/',
  },
  en: {
    home: '/en/',
    it: '/en/',
    itDirect: '/en/it/',
    transport: '/en/professional-driver/',
    projects: '/en/projects/',
    capabilities: '/en/capabilities/',
    about: '/en/about/',
    cv: '/en/cv/',
    contact: '/en/contact/',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export const getProfilePaths = (lang: Locale) => profilePaths[lang];

export const getCrossProfileHref = (lang: Locale, profile: SiteProfile) =>
  profile === 'transport' ? profilePaths[lang].itDirect : profilePaths[lang].transport;

export interface FaqItem {
  question: string;
  answer: string;
}

export const itFaqItems: Record<Locale, FaqItem[]> = {
  sv: [
    {
      question: 'Vem är Mikael Johansson?',
      answer:
        'Jag är en SEO-specialist, webbutvecklare och automationsorienterad problemlösare som har arbetat hands-on sedan 2003.',
    },
    {
      question: 'Vad arbetar du med idag?',
      answer:
        'Jag arbetar med technical SEO, webbutveckling, AI-stödda arbetsflöden, automation och digital tillväxt i leveranser som ska fungera i verklig drift.',
    },
    {
      question: 'Vilka typer av projekt tar du dig an?',
      answer:
        'Jag bygger och förbättrar webbplatser, case- och innehållsstrukturer, SEO-grunder, integrationer och automatiserade flöden mellan formulär, CRM, team och interna processer.',
    },
    {
      question: 'Hur lång erfarenhet har du inom SEO, webbutveckling och automation?',
      answer:
        'Jag har arbetat med SEO och webbutveckling sedan 2003 och har de senaste åren kombinerat det med automation och AI-stödda arbetsflöden i både byrå- och produktnära miljöer.',
    },
    {
      question: 'Arbetar du med technical SEO, AEO och AI-stödda arbetsflöden?',
      answer:
        'Ja. Jag arbetar med technical SEO, informationsstruktur, AEO-orienterad tydlighet och AI-stödda arbetsflöden som förbättrar analys, produktion, release och uppföljning.',
    },
    {
      question: 'Är du öppen för roller eller uppdrag?',
      answer:
        'Ja. Jag är öppen för roller och uppdrag inom SEO, webbutveckling, growth, automation och digital leverans.',
    },
    {
      question: 'Hur arbetar du från analys till implementation?',
      answer:
        'Jag börjar med nuläge, mål och prioritering, går sedan vidare till implementation och release, och avslutar med mätning och förbättring så att leveransen håller över tid.',
    },
  ],
  en: [
    {
      question: 'Who is Mikael Johansson?',
      answer:
        'I am an SEO specialist, web developer, and automation-oriented problem solver who has worked hands-on since 2003.',
    },
    {
      question: 'What do you work with today?',
      answer:
        'I work with technical SEO, web engineering, AI-assisted workflows, automation, and digital growth in delivery setups that need to perform in real operations.',
    },
    {
      question: 'What types of projects do you take on?',
      answer:
        'I build and improve websites, information structures, SEO foundations, integrations, and automated flows between forms, CRM systems, teams, and internal processes.',
    },
    {
      question: 'How much experience do you have in SEO, web engineering, and automation?',
      answer:
        'I have worked with SEO and web engineering since 2003 and in recent years combined that with automation and AI-assisted workflows across both agency and product-oriented environments.',
    },
    {
      question: 'Do you work with technical SEO, AEO, and AI-assisted workflows?',
      answer:
        'Yes. I work with technical SEO, information architecture, AEO-oriented clarity, and AI-assisted workflows that improve analysis, production, release, and follow-up.',
    },
    {
      question: 'Are you open to roles or projects?',
      answer:
        'Yes. I am open to roles and projects across SEO, web engineering, growth, automation, and digital delivery.',
    },
    {
      question: 'How do you work from analysis to implementation?',
      answer:
        'I start with current state, goals, and prioritization, move into implementation and release, and then follow up with measurement and improvement so the delivery holds up over time.',
    },
  ],
};

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
