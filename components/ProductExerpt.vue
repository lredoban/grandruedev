<script>
import { twicifyAirtable, twicPreview } from '~/helpers/twicpics'

export default {
  name: 'ProductExerpt',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    twicPreview() {
      return twicPreview(
        this.product.imgUrl,
        'airtable',
        'https://dl.airtable.com/.attachments/'
      )
    },
    twicSrc() {
      return twicifyAirtable(this.product.imgUrl)
    }
  }
}
</script>

<template>
  <article>
    <div class="-ml-1 flex gap-x-1 items-center overflow-hidden">
      <ILocalize class="w-6 flex-shrink-0 text-gray-500" />
      <div>
        <h3 class="text-xs text-gray-500 italic font-thin leading-none">
          {{ product.storeName }}
        </h3>
        <h3
          class="mt-1 text-xs text-gray-500 italic font-thin leading-none whitespace-no-wrap"
        >
          {{ product.storeAddress }}
        </h3>
      </div>
    </div>
    <div class="image-container mt-2">
      <img
        :src="twicPreview"
        :data-twic-src="twicSrc"
        :alt="product.name"
        class="absolute w-full h-full object-cover"
      />
    </div>
    <h1 class="mt-2 text-primary not-italic text-xl">{{ product.name }}</h1>
    <h2 class="text-secondary not-italic tracking-wider">
      {{ $n(product.price / 100, 'currency', 'fr-FR') }}
    </h2>
  </article>
</template>

<style lang="sass" scoped>
.image-container
  @apply relative mt-2 rounded
  padding-bottom: 100%
</style>
