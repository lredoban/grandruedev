require('dotenv').config()
// https://github.com/storyblok/storyblok-nuxt
export default {
  accessToken: process.env.STORYBLOK_SPACE_TOKEN,
  cacheProvider: 'memory'
}
