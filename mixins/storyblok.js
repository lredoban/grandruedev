export default {
  methods: {
    listenStoryblokChanges(storyId, callback) {
      if (this.$config.storyblokVersion !== 'draft') return
      // Use the input event for instant update of content
      this.$storybridge.on('input', (event) => {
        if (event.story.id === storyId) {
          callback(event)
        }
      })
      // Use the bridge to listen the events
      this.$storybridge.on(['published', 'change'], (event) => {
        // window.location.reload()
        this.$nuxt.$router.go({
          path: this.$nuxt.$router.currentRoute,
          force: true
        })
      })
    }
  }
}
