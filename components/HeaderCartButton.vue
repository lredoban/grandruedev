<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CartButton',
  data: () => ({
    cartHint: false
  }),
  computed: {
    ...mapGetters('cart', ['itemsCount'])
  },
  watch: {
    itemsCount(count) {
      if (count === 0) {
        this.cartHint = false
      } else {
        this.cartHint = true
        setTimeout(() => {
          this.cartHint = false
        }, 5000)
      }
    }
  },
  methods: {
    ...mapActions(['openCart'])
  }
}
</script>

<template>
  <button type="button" class="relative" @click="openCart">
    <ICart class="h-10 p-2" />
    <span
      v-if="cartHint"
      class="absolute bottom-0 right-0 inline-flex h-5 w-5 rounded-full bg-secondary opacity-75 animate-ping"
    ></span>
    <span
      v-if="itemsCount"
      class="absolute bottom-0 right-0 inline-flex rounded-full h-5 w-5 bg-secondary justify-center items-center text-white text-opacity-75 text-sm leading-none"
    >
      {{ itemsCount }}
    </span>
  </button>
</template>
