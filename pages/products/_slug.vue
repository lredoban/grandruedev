<script>
import { mapActions } from 'vuex'
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'ProductPage',
  components: { CollapseTransition },
  async asyncData({ $db, params }) {
    const product = await $db.fetch('productBySlug', { slug: params.slug })
    const related = await $db.fetch('productsBy', {
      key: 'storeName',
      param: product.storeName[0]
    })
    return {
      product,
      relatedProducts: related.filter((r) => r.name !== product.name),
      displayDescription: false
    }
  },
  computed: {
    quantity() {
      return this.$store.getters['cart/itemCount'](this.product.id)
    }
  },
  created() {
    this.$store.commit('menu/setImage', this.product.storeLogo)
  },
  beforeDestroy() {
    this.$store.commit('menu/clear')
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'removeFromCart'])
  }
}
</script>

<template>
  <main class="pb-20">
    <section>
      <AppCarousel v-slot="{ img }" :images="product.images">
        <AirtableImage :src="img.url" :alt="img.name" />
      </AppCarousel>
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
          <n-link
            :to="
              localePath({
                name: 'boutiques-slug',
                params: { slug: product.storeSlug[0] }
              })
            "
          >
            {{ product.storeName[0] }}
          </n-link>
          , {{ product.storeAddress }}
        </div>
        <div class="mt-10 flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <button @click="removeFromCart(product)">
              <IMinusSign class="text-gray-500 h-10" />
            </button>
            <span class="text-4xl text-gray-600 font-black">
              {{ quantity }}
            </span>
            <button @click="addToCart(product)">
              <ICartAdd class="h-10 text-primary" />
            </button>
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
