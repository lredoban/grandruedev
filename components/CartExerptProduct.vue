<script>
import { getInfos } from './CartProduct'

export default {
  name: 'CartExerptProduct',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    infos() {
      return getInfos(this.product)
    }
  }
}
</script>

<template>
  <article class="grid auto-rows-min gap-x-4 items-center text-white">
    <button @click="$store.commit('cart/deleteItem', product.id)">
      <IClose class="p-2 w-4 h-4 box-content text-red-600" />
    </button>
    <div class="relative">
      <div class="h-16 w-16 overflow-hidden">
        <AirtableImage
          :src="product.images[0].url"
          :alt="product.name"
          class="object-cover min-h-full"
        />
      </div>
      <span
        v-if="product.cartQuantity > 1"
        class="absolute top-0 left-0 -mt-3 -ml-3 h-6 w-6 flex items-center justify-center bg-primary rounded-full text-sm font-bold leading-none"
      >
        {{ product.cartQuantity }}
      </span>
    </div>
    <div class="h-full flex-grow flex flex-col justify-between">
      <span class="text-lg font-bold">{{ product.name }}</span>
      <span class="opacity-75">{{ infos }}</span>
    </div>
    <span class="text-lg font-bold">{{
      $n(product.price / 100, 'currency')
    }}</span>
  </article>
</template>

<style lang="sass" scoped>
article
  grid-template-columns: auto auto 1fr auto
</style>
