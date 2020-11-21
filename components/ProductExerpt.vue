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
    <div class="-mb-3 flex gap-x-2 items-center">
      <ILocalize class="h-12 text-gray-400" />
      <div class="overflow-hidden">
        <h3 class="text-xs text-gray-400 italic">{{ product.storeName }}</h3>
        <h3 class="text-xs text-gray-400 italic whitespace-no-wrap">
          {{ product.storeAddress }}
        </h3>
      </div>
    </div>
    <div class="image-container">
      <img
        :src="twicPreview"
        :data-twic-src="twicSrc"
        :alt="product.name"
        class="absolute w-full h-full object-cover"
      />
    </div>
    <h1 class="mt-2 text-primary">{{ product.name }}</h1>
    <h2 class="text-secondary font-normal text-xs">
      {{ product.price }}/ {{ product.unit }}
    </h2>
  </article>
</template>

<style lang="sass" scoped>
.image-container
  @apply mt-2 rounded
  position: relative
  padding-bottom: 100%
</style>
