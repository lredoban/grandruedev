export default function ({ app, error, $config }, inject) {
  const $storyblok = {}
  const version = $config.storyblokVersion

  $storyblok.getStoryBySlug = async (slug) => {
    const { story } = await app.$storyapi
      .get(`cdn/stories/${slug}`, { version })
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        if (!res.response) {
          error({
            statusCode: 404,
            message: 'Failed to receive content form api'
          })
        } else {
          error({
            statusCode: res.response.status,
            message: res.response.data
          })
        }
      })
    // eslint-disable-next-line camelcase
    const { name, id, full_slug } = story
    return { ...story.content, name, id, slug: story.slug, full_slug }
  }

  $storyblok.getStories = async (options) => {
    const { stories } = await app.$storyapi
      .get('cdn/stories', {
        version,
        ...options
      })
      .then((res) => {
        return res.data
      })
    return stories
  }

  inject('storyblok', $storyblok)
}
