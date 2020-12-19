<script>
import { twicPreview } from '~/helpers/twicpics'

export default {
  name: 'ProductPage',
  async asyncData({ $db, $storybook, params }) {
    const product = await $db.fetch('productBySlug', { slug: params.slug })
    const boutique = await $storybook.getStoreBySlug(product.storeSlug[0])
    const related = await $db.fetch('productsBy', {
      key: 'storeName',
      param: product.storeName[0],
      limit: 6
    })
    return {
      product,
      boutique,
      relatedProducts: related.filter((r) => r.slug !== product.slug).slice(-5),
      selectedImageIndex: 0,
      selectedVariants: Object.keys(product.variants).reduce((acc, key) => {
        acc[key] = ''
        return acc
      }, {})
    }
  },
  computed: {
    heroImage() {
      return {
        name: 'blurry ' + this.product.images[0].name,
        url: twicPreview(
          this.product.images[0].url,
          'airtable',
          'https://dl.airtable.com/.attachments/'
        )
      }
    },
    filteredImages() {
      const copy = [...this.product.images]
      copy.splice(this.selectedImageIndex, 1)
      return copy
    }
  },
  created() {
    this.$store.commit('menu/setImage', this.product.storeLogo)
  },
  beforeDestroy() {
    this.$store.commit('menu/clear')
  },
  methods: {
    selectImage(id) {
      this.selectedImageIndex = this.product.images.findIndex(
        (img) => img.id === id
      )
    }
  }
}
</script>

<template>
  <main class="pb-20 overflow-x-hidden">
    <section>
      <div class="hidden relative h-32 w-full md:block">
        <img
          :src="heroImage.url"
          :alt="heroImage.name"
          class="absolute h-full w-full object-cover object-center"
        />
      </div>
      <div>
        <AppCarousel
          v-slot="{ img }"
          :images="product.images"
          class="md:hidden"
        >
          <AirtableImage :src="img.url" :alt="img.name" />
        </AppCarousel>
        <ProductVariants
          v-if="Object.keys(product.variants).length > 0"
          v-model="selectedVariants"
          :variants="product.variants"
        />
      </div>
      <div id="product-wrapper">
        <div class="hidden mt-4 w-32 flex-col gap-y-4 md:flex">
          <div
            v-for="img in filteredImages"
            :key="img.id"
            class="relative pb-100p"
          >
            <button
              class="absolute h-full w-full object-cover overflow-hidden"
              @click="selectImage(img.id)"
            >
              <AirtableImage :src="img.url" :alt="img.name" />
            </button>
          </div>
        </div>
        <div class="hidden relative ml-4 -mt-16 z-10 md:block">
          <AirtableImage
            :src="product.images[selectedImageIndex].url"
            :alt="product.images[selectedImageIndex].name"
          />
        </div>
        <ProductInfos
          :product="product"
          :selected-variants="selectedVariants"
          class="mt-12 px-8 md:ml-8 md:px-0"
        />
      </div>
    </section>
    <section class="hidden mt-20 text-center md:block">
      <h1 class="text-2xl text-secondary uppercase not-italic">La boutique</h1>
      <ProductBoutique :boutique="boutique" class="mt-6" />
    </section>
    <section class="mt-12 px-8 md:text-center md:mt-20">
      <h1 class="text-2xl text-secondary uppercase not-italic">
        Et avec ceci ?
      </h1>
      <ProductExerptList :products="relatedProducts" class="mt-6 -ml-8" />
    </section>
  </main>
</template>

<style lang="sass" scoped>
#product-wrapper
  @apply block max-w-4xl mx-auto
  grid-template-columns: auto 1fr 1fr
  @screen md
    @apply grid px-4
  @screen lg
    @apply px-0
</style>
