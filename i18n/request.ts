import { getRequestConfig } from 'next-intl/server';

const supportedLocales = ['es', 'en'] as const;
type SupportedLocale = (typeof supportedLocales)[number];

function isSupportedLocale(value: string | undefined): value is SupportedLocale {
  return value === 'es' || value === 'en';
}

export default getRequestConfig(async ({ requestLocale }) => {
  const localeCandidate = await requestLocale;
  const locale: SupportedLocale = isSupportedLocale(localeCandidate)
    ? localeCandidate
    : 'es';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});