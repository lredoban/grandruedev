// https://i18n.nuxtjs.org/
export default {
  locales: [
    { code: 'fr', iso: 'fr-FR' },
    { code: 'en', iso: 'en-GB' }
  ],
  defaultLocale: 'fr',
  baseUrl: ({ $config }) => $config.baseUrl,
  strategy: 'prefix',
  vueI18nLoader: true,
  vueI18n: {
    numberFormats: {
      fr: {
        currency: {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0
        }
      },
      en: {
        currency: {
          style: 'currency',
          currency: 'EUR'
        }
      }
    }
  }
}
