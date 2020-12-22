<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductInfos',
  props: {
    product: {
      type: Object,
      required: true
    },
    selectedVariants: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    displayDescription: false,
    displayVariantWarning: false
  }),
  computed: {
    quantity() {
      return this.$store.getters['cart/itemCount'](this.product.id)
    },
    hasVariant() {
      return Object.keys(this.selectedVariants).length > 0
    },
    isVariantsValid() {
      if (!this.hasVariant) return true
      return Object.values(this.selectedVariants).every(Boolean)
    }
  },
  watch: {
    isVariantsValid(isValid) {
      if (isValid) this.displayVariantWarning = false
    }
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'removeFromCart']),
    submitProduct() {
      if (this.isVariantsValid) {
        this.addToCart({
          ...this.product,
          ...(this.hasVariant && { selectedVariants: this.selectedVariants })
        })
      } else {
        this.displayVariantWarning = true
      }
    }
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
    <BaseCollapse class="mt-4">
      <template v-slot:trigger>Description du produit</template>
      <div>
        <div v-html="product.description" />
        <div v-if="product.composition" class="my-2">
          <span class="font-bold tracking-wide">Composition:</span>
          <span>{{ product.composition }}</span>
        </div>
      </div>
    </BaseCollapse>
    <BaseCollapse v-if="product.care || product.advice" class="no-border">
      <template v-slot:trigger>Conseils d'utlisation</template>
      <div class="-mt-2">
        <div v-if="product.advice" class="my-2">
          <div>{{ product.advice }}</div>
        </div>
        <div v-if="product.care" class="my-2">
          <div class="font-bold tracking-wide">Entretien / Conservation</div>
          <div>{{ product.care }}</div>
        </div>
      </div>
    </BaseCollapse>
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
        <button @click="submitProduct">
          <ICartAdd class="text-primary h-10 md:h-6" />
        </button>
        <div v-if="displayVariantWarning" class="pulse text-red-500">
          Veulliez choisir vos options:
          {{ Object.keys(selectedVariants).join(', ') }}
        </div>
      </div>
      <div class="flex flex-col flex-shrink-0 items-end">
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

<style lang="sass" scoped>
.no-border
  @apply border-t-0
</style>
