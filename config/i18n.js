// https://i18n.nuxtjs.org/
export default {
  locales: [
    { code: 'fr', iso: 'fr-FR' },
    { code: 'en', iso: 'en-GB' }
  ],
  defaultLocale: 'fr',
  baseUrl: ({ $config }) => $config.baseUrl,
  strategy: 'prefix',
  vueI18nLoader: true
}
