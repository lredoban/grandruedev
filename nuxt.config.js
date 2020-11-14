export default {
  privateRuntimeConfig: {
    airtableApiKey: process.env.AIRTABLE_API_KEY
  },
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Grand'Rue",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: 'https://dz11y8g2.twic.pics/?v1', type: 'text/javascript' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/main.sass'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    '~/components', // shortcut to { path: '~/components' }
    { path: '~/components/svg/', prefix: 'i' }
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://html-validator.nuxtjs.org/
    '@nuxtjs/html-validator',
    [
      // https://github.com/nuxt-community/google-fonts-module
      '@nuxtjs/google-fonts',
      {
        families: {
          'Open Sans': [100, 200, 300, 400, 500, 600, 700, 900],
          Caveat: true
        }
      }
    ]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://www.npmjs.com/package/@nuxtjs/localtunnel
    ['@nuxtjs/localtunnel', { subdomain: 'grandrue' }],
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://http.nuxtjs.org/
    '@nuxt/http'
  ],
  // https://storybook.nuxtjs.org/
  storybook: {
    // Options
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
    }
  }
}
