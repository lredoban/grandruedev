<script>
export default {
  name: 'Commande',
  fetchOnServer: false,
  async fetch() {
    const { order, email } = this.$route.query
    this.lineItems = await this.$db.fetch('commande', {
      orderId: order
    })
    if (
      this.lineItems.length === 0 ||
      this.lineItems[0].customerEmail !== email
    )
      throw new Error('not found')
    this.order = order
    this.email = email
  },
  data: () => ({
    order: '',
    email: '',
    lineItems: []
  }),
  computed: {
    orderNumber() {
      return this.order ? `numéro ${this.order}` : ''
    },
    itemsByStore() {
      const obj = {}
      this.lineItems.forEach((item) => {
        if (!obj[item.storeName]) obj[item.storeName] = []
        obj[item.storeName].push(item)
      })
      Object.keys(obj).forEach((key) => {
        obj[key].sort((a, b) => b.total - a.total)
      })
      return obj
    }
  }
}
</script>

<template>
  <main>
    <div class="py-16 bg-kraft">
      <div class="mt-8 px-6 grid gap-y-1 auto-cols-max justify-center">
        <img
          src="/img/sacboutique.png"
          alt="sac boutique"
          class="mx-auto w-24"
        />
        <div class="relative pb-16">
          <h1 class="font-thin not-italic text-secondary text-4xl uppercase">
            Commande
          </h1>
          <ILogoWordFlat class="absolute inset-x-0 h-auto text-primary" />
        </div>
      </div>
    </div>
    <div class="py-12 px-4 mx-auto max-w-xl">
      <div v-if="$fetchState.error">
        Désolé nous ne trouvons pas la commande {{ order }}
      </div>
      <div v-else-if="$fetchState.pending">Chargement</div>
      <div v-else>
        <div v-for="(items, store) in itemsByStore" :key="store">
          <h2 class="text-xl text-secondary tracking-wide">{{ store }}</h2>
          <ul class="divide-y-2">
            <li v-for="item in items" :key="item.id" class="py-4">
              <div>
                <span class="text-primary text-lg font-semibold">
                  {{ item.name }}
                </span>
                <span
                  v-if="item.quantity > 1"
                  class="text-secondary text-lg font-semibold"
                >
                  x {{ item.quantity }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-lg opacity-75">{{ item.metadata }}</span>
                <strong v-if="item.total">
                  {{ $n(item.total / 100, 'currency') }}
                </strong>
              </div>
            </li>
            <li class="py-4 flex justify-between">
              <span>Total</span>
              <strong>
                {{
                  $n(
                    items.reduce((total, i) => total + i.total, 0) / 100,
                    'currency'
                  )
                }}
              </strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>
