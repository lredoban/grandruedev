<script>
import { loadStripe } from '@stripe/stripe-js'
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters('cart', ['itemsByStore', 'itemsCount', 'itemsSubtotalPrice'])
  },
  methods: {
    async goToCheckout() {
      // this.loading = true
      const stripe = await loadStripe(this.$config.stripeApiKey)
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
  <main>
    <form action="checkout" class="bg-white" @submit.prevent="goToCheckout">
      <section class="px-4 py-8 bg-kraft">
        <h1 class="ml-4 text-xl text-primary not-italic uppercase">
          Mon panier
          <span class="text-md font-thin normal-case">
            {{ $tc('articlesNumber', itemsCount, { count: itemsCount }) }}
          </span>
        </h1>
        <div class="mt-6 space-y-6">
          <div
            v-for="(store, key) in itemsByStore"
            :key="key"
            class="bg-white px-4 py-3"
          >
            <div class="py-1 flex justify-between text-gray-500">
              <h2 class="opacity-75">{{ store.name }}</h2>
              <span class="text-sm text-thin opacity-50"
                >({{ store.zip }})</span
              >
            </div>
            <div class="flex flex-col divide-y">
              <CartProduct
                v-for="product in store.items"
                :key="product.id"
                :product="product"
                class="py-4"
              />
              <div
                class="py-4 text-secondary flex justify-between items-center"
              >
                <div class="flex flex-col space-y-1">
                  <label>
                    <input type="radio" :name="key" value="clickNcollect" />
                    Click & collect
                  </label>
                  <label>
                    <input type="radio" :name="key" value="delivery" />
                    Livraison à domicile
                  </label>
                </div>
                <div class="font-bold">+ {{ $n(550 / 100, 'currency') }}</div>
              </div>
            </div>
          </div>
        </div>
        <div id="warning" class="mt-6 px-4 py-2 bg-white">
          <p>Les articles dans le panier ne sont pas réservés.</p>
          <p>Toute commande passées ne peut être annulée</p>
        </div>
      </section>
      <div class="px-6 py-8 bg-white text-gray-600 divider-top">
        <div class="flex justify-between font-semibold">
          <span>Sous-total</span>
          <span>{{ $n(itemsSubtotalPrice / 100, 'currency') }}</span>
        </div>
        <div class="flex justify-between">
          <span>Livraison</span>
          <span>5 euro</span>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between font-semibold">
          <span>Total (TVA incluse)</span>
          <span>345 $</span>
        </div>
        <AppButton class="block mx-auto mt-6 w-full max-w-xs" type="submit">
          Commander
        </AppButton>
      </div>
    </form>
  </main>
</template>

<style lang="sass" scoped>
#warning p
  @apply relative pl-6 text-red-600 text-sm
  &::before
    content: 'i'
    margin-top: 4px
    @apply absolute top-0 left-0 h-3 w-3 flex items-center justify-center box-content border border-current rounded-full text-xs
</style>

<i18n>
{
  "fr": {
    "articlesNumber": "(1 article) | ({count} articles)"
  },
  "en": {
    "articlesNumber": "(1 article)|({count} articles)"
  }
}
</i18n>
