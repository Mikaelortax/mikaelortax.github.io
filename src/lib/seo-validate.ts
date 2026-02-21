export interface HreflangAlternate {
  hreflang: string;
  href: string;
}

export interface HreflangValidationResult {
  warnings: string[];
  errors: string[];
}

const normalizeHreflang = (value: string): string =>
  (value || '').trim().toLowerCase();

const parseAbsoluteUrl = (value: string): URL | null => {
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return url;
  } catch {
    return null;
  }
};

const localeFromUrl = (url: URL): 'sv' | 'en' => {
  const path = url.pathname || '/';
  return /^\/en(?:\/|$)/.test(path) ? 'en' : 'sv';
};

export function validateHreflang(
  alternates: ReadonlyArray<HreflangAlternate>
): HreflangValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  if (!alternates.length) {
    errors.push('No hreflang alternates were provided.');
    return { warnings, errors };
  }

  const counts = new Map<string, number>();
  const parsedByLang = new Map<string, URL>();

  for (const alt of alternates) {
    const lang = normalizeHreflang(alt.hreflang);
    counts.set(lang, (counts.get(lang) ?? 0) + 1);

    const parsed = parseAbsoluteUrl(alt.href);
    if (!parsed) {
      errors.push(`Alternate "${alt.hreflang}" must use an absolute http(s) URL: ${alt.href}`);
      continue;
    }

    if (!parsedByLang.has(lang)) {
      parsedByLang.set(lang, parsed);
    }
  }

  for (const [lang, count] of counts.entries()) {
    if (count > 1) {
      errors.push(`Duplicate hreflang entry found for "${lang}".`);
    }
  }

  if (!counts.has('sv')) errors.push('Missing required hreflang "sv".');
  if (!counts.has('en')) errors.push('Missing required hreflang "en".');
  if (!counts.has('x-default')) errors.push('Missing required hreflang "x-default".');

  const svUrl = parsedByLang.get('sv');
  const enUrl = parsedByLang.get('en');
  const xDefaultUrl = parsedByLang.get('x-default');

  if (xDefaultUrl && localeFromUrl(xDefaultUrl) !== 'sv') {
    warnings.push('x-default does not point to a Swedish URL.');
  }

  const hasSelfReference =
    (!!svUrl && localeFromUrl(svUrl) === 'sv') ||
    (!!enUrl && localeFromUrl(enUrl) === 'en');

  if (!hasSelfReference) {
    errors.push('No self-referencing locale alternate found.');
  }

  return { warnings, errors };
}
