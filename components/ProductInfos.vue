<script>
import { mapActions } from 'vuex'
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'ProductInfos',
  components: { CollapseTransition },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    displayDescription: false
  }),
  computed: {
    quantity() {
      return this.$store.getters['cart/itemCount'](this.product.id)
    }
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'removeFromCart'])
  }
}
</script>

<template>
  <div>
    <h1 class="not-italic text-3xl text-gray-600 font-bold tracking-wide">
      {{ product.name }}
    </h1>
    <div class="mt-4 flex items-baseline">
      <h2 class="text-2xl text-gray-600 font-normal">
        {{ $n(product.price / 100, 'currency', 'fr-FR') }}
      </h2>
      <span class="text-gray-400 text-sm lowercase ml-2">
        /{{ product.unit }}</span
      >
    </div>
    <div class="mt-4 border-t border-b border-gray-600 text-gray-600">
      <button
        class="py-2 w-full uppercase tracking-wide text-left flex justify-between items-center"
        @click="displayDescription = !displayDescription"
      >
        Description du produit
        <div class="mr-2" :class="displayDescription && 'transform rotate-180'">
          <IArrowDown class="h-4 opacity-50" />
        </div>
      </button>
      <CollapseTransition>
        <div
          v-if="displayDescription"
          class="py-1"
          v-html="product.description"
        />
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
          <IMinusSign class="text-gray-500 h-10 md:h-6" />
        </button>
        <span class="text-4xl text-gray-600 font-black md:text-3xl">
          {{ quantity }}
        </span>
        <button @click="addToCart(product)">
          <ICartAdd class="text-primary h-10 md:h-6" />
        </button>
      </div>
      <div class="flex flex-col items-end">
        <span
          v-if="product.quantity > 1 && product.quantity < 1000"
          class="text-primary text-xs"
          >{{ product.quantity }} restant</span
        >
        <span
          v-if="product.quantity === 0"
          class="bg-red-600 py-1 px-2 text-white text-sm font-semibold"
        >
          non disponible
        </span>
        <span
          v-else
          class="bg-primary py-1 px-2 text-white text-sm font-semibold"
        >
          {{ product.quantity > 1 ? 'En stock' : 'Pièce unique' }}
        </span>
      </div>
    </div>
  </div>
</template>
