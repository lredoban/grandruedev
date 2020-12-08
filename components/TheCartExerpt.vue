<script>
import { loadStripe } from '@stripe/stripe-js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TheCartExerpt',
  computed: {
    ...mapGetters('cart', ['itemsSubtotalPrice', 'itemsByStore'])
  },
  methods: {
    ...mapActions(['closeCart']),
    emptyCart() {
      this.$store.commit('cart/emptyCart')
    },
    async goToCheckout() {
      // this.loading = true
      const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
      const { id } = await this.$db.fetch('createCheckoutSession', {
        items: this.$store.state.cart.items.reduce((acc, item) => {
          acc[item.id] = item.cartQuantity
          return acc
        }, {})
      })
      const result = await stripe.redirectToCheckout({
        sessionId: id
      })
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.warn('result.error ->', result.error)
      }
    }
  }
}
</script>

<template>
  <section class="fixed top-0 left-0 w-screen h-screen z-40 flex flex-col">
    <div
      class="cart-header bg-white divider-bottom h-24 px-8 py-2 flex justify-between items-center"
    >
      <button @click="emptyCart">
        <ITrash class="h-6 p-2 box-content text-secondary" />
      </button>
      <h1 class="relative text-2xl text-primary not-italic">Mon panier</h1>
      <button @click="closeCart">
        <IClose class="h-5 p-2 box-content text-secondary" />
      </button>
    </div>
    <div class="pt-8 pb-24 bg-blurry flex-grow text-white overflow-y-scroll">
      <div v-for="(store, key) in itemsByStore" :key="key">
        <div class="px-4 py-1 flex justify-between border-b-4 border-white">
          <h2 class="not-italic opacity-75">{{ store.name }}</h2>
          <span class="text-thin opacity-50">({{ store.zip }})</span>
        </div>
        <div class="px-6 py-8 flex flex-col gap-y-8">
          <CartExerptProduct
            v-for="product in store.items"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
    <div
      class="bg-blurry fixed bottom-0 left-0 w-full py-4 flex flex-col items-center border-t border-gray-500 border-opacity-25"
    >
      <AppButton @click.native="goToCheckout">
        Voir mon panier
        <strong>{{ $n(itemsSubtotalPrice / 100, 'currency') }}</strong>
      </AppButton>
      <span class="mt-2 underline italic font-bold text-white text-sm">
        (Sans frais de livraisons)
      </span>
    </div>
  </section>
</template>
