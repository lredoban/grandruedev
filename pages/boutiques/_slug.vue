<script>
import storyblok from '~/mixins/storyblok'

import StoryblokImage from '~/components/StoryblokImage.vue'

export default {
  name: 'Boutique',
  components: { StoryblokImage },
  mixins: [storyblok],
  async asyncData({ $db, $storyblok, error, params }) {
    const story = await $storyblok.getStoryBySlug(`boutiques/${params.slug}`)
    return {
      story,
      products: await $db.fetch('productsBy', {
        key: 'store',
        param: story.name
      })
    }
  },
  computed: {
    headerLogo() {
      return this.story.headerLogo
    },
    name() {
      return this.story.name
    }
  },
  created() {
    this.$store.commit('menu/setImage', this.story.headerLogo.filename)
  },
  mounted() {
    this.listenStoryblokChanges(this.story.id, (event) => {
      this.story = event.story.content
    })
  },
  beforeDestroy() {
    this.$store.commit('menu/clear')
  }
}
</script>

<template>
  <main class="pb-20">
    <div class="grid md:grid-cols-2">
      <AppCarousel v-slot="{ img }" :images="story.carousel[0].Images">
        <StoryblokImage :src="img.filename" :alt="img.alt" />
      </AppCarousel>
      <div class="bg-kraft">
        <div class="divider-bottom p-8 bg-white">
          <h1 class="text-primary text-xl not-italic font-bold">{{ name }}</h1>
          <h2 class="-mt-2 text-sm text-gray-500 font-normal">
            {{ story.subtitle }}
          </h2>
          <BoutiqueInfos :boutique="story" class="mt-4" />
        </div>
        <section class="bg-kraft rich-text px-8 py-4 text-sm">
          <rich-text-renderer :document="story.description" />
        </section>
      </div>
    </div>
    <div class="hidden mt-12 md:block">
      <StoryblokImage
        :src="headerLogo.filename"
        :alt="'logo-' + headerLogo.name"
        class="mx-auto h-20"
      />
    </div>
    <div class="mt-4 text-center text-sm text-gray-500 text-hairline italic">
      {{ products.length }} Articles trouvés
    </div>
    <ProductGrid :products="products" class="mx-auto mt-8 px-6 max-w-4xl" />
  </main>
</template>
