<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'ProductPage',
  components: { CollapseTransition },
  async asyncData({ $db, params, store }) {
    const product = await $db.fetch('productBySlug', { slug: params.slug })
    store.commit('menu/setImage', product.storeLogo)
    return {
      product,
      relatedProducts: await $db.fetch('recentProducts'),
      displayDescription: false
    }
  }
}
</script>

<template>
  <main class="pb-20">
    <section>
      <div class="carousel">
        <div v-for="img in product.images" :key="img.id" class="carousel-item">
          <AirtableImage
            :src="img.url"
            :alt="img.name"
            class="carousel-image"
          />
        </div>
      </div>
      <div class="mt-12 px-8">
        <h1 class="not-italic text-3xl text-gray-600 font-bold tracking-wide">
          {{ product.name }}
        </h1>
        <div class="mt-4 flex items-baseline">
          <h2 class="text-2xl text-gray-600 font-normal">
            {{ $n(product.price, 'currency', 'fr-FR') }}
          </h2>
          <span class="text-gray-400 text-sm lowercase ml-2">
            /{{ product.unit }}</span
          >
        </div>
        <div class="mt-4 border-t border-b border-gray-600 text-gray-600">
          <button
            class="py-2 w-full uppercase tracking-wide text-left"
            @click="displayDescription = !displayDescription"
          >
            Description du produit
          </button>
          <CollapseTransition>
            <p v-if="displayDescription" class="py-1">
              {{ product.description }}
            </p>
          </CollapseTransition>
        </div>
        <div class="mt-2 text-xs text-gray-500">
          Vendu par:&nbsp;
          <n-link to="/">{{ product.storeName[0] }}</n-link>
          , {{ product.storeAddress }}
        </div>
        <div class="mt-10 flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <button>
              <IMinusSign class="text-gray-500 h-10" />
            </button>
            <span class="text-4xl text-gray-600 font-black">0</span>
            <button><ICartAdd class="h-10 text-primary" /></button>
          </div>
          <IHeart class="h-8 text-red-500" />
        </div>
      </div>
    </section>
    <section class="mt-12 px-8">
      <h1 class="text-2xl text-secondary uppercase not-italic">
        Et avec ceci ?
      </h1>
      <ProductExerptList :products="relatedProducts" class="mt-6 -ml-8" />
    </section>
  </main>
</template>

<style lang="sass" scoped>
// https://markus.oberlehner.net/blog/super-simple-progressively-enhanced-carousel-with-css-scroll-snap/
.carousel
  @apply flex overflow-x-scroll
  scroll-snap-type: x mandatory
  scroll-behavior: smooth
  &-item
    @apply relative w-full flex-shrink-0
    padding-bottom: 60vh
    scroll-snap-align: start
  &-image
    @apply absolute w-full h-full object-cover object-center
</style>
