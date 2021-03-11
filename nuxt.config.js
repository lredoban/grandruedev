import googleFonts from './config/googleFonts'
import i18n from './config/i18n'
import meta from './config/meta'
import pwa from './config/pwa'
import sitemap from './config/sitemap'
import storyblok from './config/storyblok'

export default {
  privateRuntimeConfig: {
    airtableApiKey: process.env.AIRTABLE_API_KEY
  },
  publicRuntimeConfig: {
    dev: process.env.NODE_ENV !== 'production',
    baseUrl: process.env.BASE_URL || 'https://www.grand-rue.com',
    stripeApiKey: process.env.STRIPE_API_KEY,
    netlify: process.env.NETLIFY,
    deployUrl: process.env.DEPLOY_URL,
    functionsBaseUrl: process.env.FUNCTIONS_BASE_URL,
    netlifyContext: process.env.CONTEXT,
    storyblokVersion: process.env.STORYBLOK_VERSION || 'draft'
  },
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Grand'Rue",
    meta,
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: 'https://dz11y8g2.twic.pics/?v1', type: 'text/javascript' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/main.sass'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/db',
    '~/plugins/composition-api.js',
    '~/plugins/rich-text-renderer.js',
    '~/plugins/storyblok',
    '~/plugins/vuex-persist.client.js'
  ],

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
    // '@nuxtjs/html-validator',
    '@nuxtjs/google-fonts',
    '@nuxtjs/pwa',
    '@nuxtjs/google-analytics'
  ],
  googleFonts,
  pwa,

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://http.nuxtjs.org/
    '@nuxt/http',
    'nuxt-i18n',
    '@nuxtjs/sitemap',
    'storyblok-nuxt'
  ],
  i18n,
  sitemap,
  storyblok,

  googleAnalytics: {
    id: 'UA-185972047-1'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
      config.devtool = 'source-map'
    }
  }
}
