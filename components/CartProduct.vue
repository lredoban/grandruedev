<script>
export default {
  name: 'CartExerptProduct',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateQuantity(e) {
      const cartQuantity = parseInt(e.target.value)
      this.$store.commit('cart/setItemQuantity', {
        itemId: this.product.id,
        cartQuantity
      })
    }
  }
}
</script>

<template>
  <article class="grid auto-rows-min gap-x-4 items-center text-gray-500">
    <div class="h-24 w-16 overflow-hidden">
      <AirtableImage
        :src="product.images[0].url"
        class="object-cover min-h-full"
      />
    </div>
    <div class="h-full flex-grow flex flex-col justify-between">
      <span class="text-md font-bold leading-none">{{ product.name }}</span>
      <div>
        <span class="block text-sm opacity-75">{{ product.color }}</span>
        <div class="flex items-end gap-x-2">
          <input
            type="number"
            :value="product.cartQuantity"
            :max="product.quantity"
            min="1"
            class="mt-1 w-24 border px-4 py-1"
            @input="updateQuantity"
          />
          <small v-if="product.cartQuantity > 1">
            x {{ $n(product.price / 100, 'currency') }}
          </small>
        </div>
      </div>
    </div>
    <div class="h-full flex flex-col justify-between items-end">
      <button @click="$store.commit('cart/deleteItem', product.id)">
        <ITrash class="p-2 -mr-2 w-4 h-4 box-content" />
      </button>
      <span class="text-lg font-bold">
        {{ $n((product.price * product.cartQuantity) / 100, 'currency') }}
      </span>
    </div>
  </article>
</template>

<style lang="sass" scoped>
article
  grid-template-columns: auto 1fr auto
</style>
