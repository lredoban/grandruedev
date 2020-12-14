<script>
import { loadStripe } from '@stripe/stripe-js'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Cart',
  data: () => ({
    loading: false,
    selectedDelivery: {}
  }),
  computed: {
    ...mapState('cart', ['storeInfos']),
    ...mapGetters('cart', [
      'itemsByStore',
      'itemsCount',
      'itemsSubtotalPrice',
      'storeSubtotalPrice'
    ]),
    freeDelivery() {
      return (storeId) => {
        const threshold = this.storeInfos[storeId].deliveryThreshold
        return (
          this.selectedDelivery[storeId] === 'clickNCollect' ||
          (!!threshold && threshold <= this.storeSubtotalPrice(storeId))
        )
      }
    },
    totalDelivery() {
      let price = 0
      Object.keys(this.storeInfos).forEach((key) => {
        if (
          this.selectedDelivery[this.storeInfos[key].id] === 'delivery' &&
          !this.freeDelivery(this.storeInfos[key].id)
        )
          price += this.storeInfos[key].deliveryPrice
      })
      return price
    },
    total() {
      return this.totalDelivery + this.itemsSubtotalPrice
    },
    preparationTime: () => (store) =>
      Math.max(store.items.map((i) => i.preparation))
  },
  watch: {
    itemsByStore: {
      handler(items) {
        this.updateBoutiqueInfos()
      },
      immediate: true
    }
  },
  methods: {
    async updateBoutiqueInfos() {
      const boutiqueIds = Object.keys(this.itemsByStore)
      if (boutiqueIds.length === 0) return
      const boutiques = await this.$db.fetch('boutiques', boutiqueIds)
      this.selectedDelivery = boutiques.reduce((acc, { id }) => {
        acc[id] = this.selectedDelivery[id] || 'clickNCollect'
        return acc
      }, {})
      this.$store.commit(
        'cart/setStoreInfos',
        boutiques.reduce((acc, boutique) => {
          acc[boutique.id] = boutique
          return acc
        }, {})
      )
    },
    async goToCheckout() {
      this.loading = true
      const stripe = await loadStripe(this.$config.stripeApiKey)
      const { id } = await this.$db.fetch('createCheckoutSession', {
        items: this.$store.state.cart.items.reduce((acc, item) => {
          acc[item.id] = item.cartQuantity
          return acc
        }, {}),
        selectedDelivery: this.selectedDelivery
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
    <form
      action="checkout"
      class="bg-white"
      :disabled="loading"
      @submit.prevent="goToCheckout"
    >
      <section class="px-4 py-8 bg-kraft">
        <div class="mx-auto max-w-3xl">
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
                  v-if="selectedDelivery[key]"
                  class="py-4 text-secondary flex justify-between items-center"
                >
                  <div class="flex flex-col space-y-1">
                    <label>
                      <input
                        v-model="selectedDelivery[key]"
                        type="radio"
                        :name="key"
                        value="clickNCollect"
                      />
                      Click & collect
                    </label>
                    <label>
                      <input
                        v-model="selectedDelivery[key]"
                        type="radio"
                        :name="key"
                        value="delivery"
                      />
                      Livraison à domicile
                    </label>
                    <span class="mt-2 text-xs">
                      Comptez {{ preparationTime(store) }} heures de délai de
                      préparation
                    </span>
                  </div>
                  <div v-if="freeDelivery(key)">Gratuit</div>
                  <div v-else class="font-bold">
                    + {{ $n(storeInfos[key].deliveryPrice / 100, 'currency') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="warning" class="mt-6 px-4 py-2 bg-white">
            <p>Les articles dans le panier ne sont pas réservés.</p>
            <p>Toute commande passées ne peut être annulée</p>
          </div>
        </div>
      </section>
      <div class="divider-top px-6 py-8 bg-white text-gray-600">
        <div class="mx-auto max-w-3xl">
          <div class="flex justify-between font-semibold">
            <span>Sous-total</span>
            <span>{{ $n(itemsSubtotalPrice / 100, 'currency') }}</span>
          </div>
          <div class="flex justify-between">
            <span>Livraison</span>
            <span>{{ $n(totalDelivery / 100, 'currency') }}</span>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between font-semibold">
            <span>Total (TVA incluse)</span>
            <span>{{ $n(total / 100, 'currency') }}</span>
          </div>
          <AppButton
            class="block mx-auto mt-6 w-full max-w-xs"
            type="submit"
            :disabled="loading"
          >
            Commander
          </AppButton>
        </div>
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
