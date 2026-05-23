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
        'Min nuvarande inriktning är anställning inom SEO, webb, CMS/WordPress, AI-stödda arbetsflöden, automation, growth eller digital koordinering.',
    },
    {
      question: 'Vilka roller söker du?',
      answer:
        'Jag söker roller som SEO-specialist, technical SEO specialist, webbansvarig, CMS- eller WordPress-specialist, digital koordinator, webbutvecklare nära produkt eller roller nära AI och automation.',
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
      question: 'Söker du främst anställning?',
      answer:
        'Jag söker främst en anställning där jag kan bidra långsiktigt inom SEO, webb, digital utveckling, automation eller digital koordinering. Jag bor i Blekinge och är öppen för plats, hybrid eller remote.',
    },
    {
      question: 'Hur arbetar du från analys till implementation?',
      answer:
        'Jag börjar med nuläge, mål och prioritering, går sedan vidare till implementation och release, och avslutar med mätning och förbättring så att lösningen håller över tid.',
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
        'My current focus is finding an employed role within SEO, web, CMS/WordPress, AI-assisted workflows, automation, growth, or digital coordination.',
    },
    {
      question: 'What roles are you looking for?',
      answer:
        'I am looking for roles such as SEO Specialist, Technical SEO Specialist, Web Manager, CMS or WordPress Specialist, Digital Coordinator, product-oriented Web Developer, or roles close to AI and automation.',
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
      question: 'Are you primarily looking for employment?',
      answer:
        'I am primarily looking for employment where I can contribute long term within SEO, web, digital development, automation, or digital coordination. I am based in Blekinge, Sweden, and open to on-site, hybrid, or remote work.',
    },
    {
      question: 'How do you work from analysis to implementation?',
      answer:
        'I start with current state, goals, and prioritization, move into implementation and release, and then follow up with measurement and improvement so the solution holds up over time.',
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
