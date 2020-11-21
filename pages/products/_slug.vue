<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'ProductPage',
  components: { CollapseTransition },
  async asyncData({ $db, params }) {
    return {
      product: await $db.fetch('productBySlug', { slug: params.slug }),
      displayDescription: false
    }
  }
}
</script>

<template>
  <main>
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
        <div>{{ product.price }} / {{ product.unit }}</div>
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
        <div class="mt-16 flex justify-between items-center">
          <div class="flex items-center">
            <button>-</button>
            <span>0</span>
            <button>+</button>
          </div>
          <IHeart class="h-8 text-red-500" />
        </div>
      </div>
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
