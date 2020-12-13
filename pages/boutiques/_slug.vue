<script>
export default {
  name: 'Boutique',
  async asyncData({ $db, app, error, params }) {
    const { story } = await app.$storyapi
      .get(`cdn/stories/boutiques/${params.slug}`, {
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
    return {
      story,
      products: await $db.fetch('productsBy', {
        key: 'store',
        param: story.name
      })
    }
  },
  computed: {
    content() {
      return this.story.content
    },
    headerLogo() {
      return this.story.content.headerLogo
    },
    name() {
      return this.story.name
    }
  },
  created() {
    this.$store.commit('menu/setImage', this.story.content.headerLogo.filename)
  },
  mounted() {
    // Use the input event for instant update of content
    this.$storybridge.on('input', (event) => {
      if (event.story.id === this.story.id) {
        this.story.content = event.story.content
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
  },
  beforeDestroy() {
    this.$store.commit('menu/clear')
  }
}
</script>

<template>
  <main class="pb-20">
    <AppCarousel v-slot="{ img }" :images="content.carousel[0].Images">
      <img :src="img.filename" :alt="img.alt" />
    </AppCarousel>
    <div class="divider-bottom p-8 bg-white">
      <h1 class="text-primary text-xl not-italic font-bold">{{ name }}</h1>
      <h2 class="-mt-2 text-sm text-gray-500 font-normal">
        {{ content.subtitle }}
      </h2>
      <BoutiqueInfos :boutique="content" class="mt-4" />
    </div>
    <section class="bg-kraft rich-text p-8">
      <rich-text-renderer :document="content.description" />
    </section>
    <div class="mt-4 text-center text-sm text-gray-500 text-hairline italic">
      {{ products.length }} Articles trouvés
    </div>
    <ProductGrid :products="products" class="mt-8 px-6" />
  </main>
</template>
