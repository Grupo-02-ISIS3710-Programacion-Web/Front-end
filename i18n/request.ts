import { getRequestConfig } from 'next-intl/server';

const supportedLocales = ['es', 'en'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const localeCandidate = await requestLocale;
  const locale = supportedLocales.includes(localeCandidate as (typeof supportedLocales)[number])
    ? localeCandidate
    : 'es';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});