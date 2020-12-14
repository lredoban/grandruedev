export default function ({ app, error }, inject) {
  const $storybook = {}
  $storybook.getStoreBySlug = async (slug) => {
    const { story } = await app.$storyapi
      .get(`cdn/stories/boutiques/${slug}`, {
        version: 'draft' // published
      })
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
    const { name, id } = story
    return { ...story.content, name, id, slug }
  }

  inject('storybook', $storybook)
}
