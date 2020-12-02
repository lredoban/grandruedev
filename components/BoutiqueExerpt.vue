<script>
export default {
  name: 'BoutiqueExerpt',
  props: {
    boutique: {
      type: Object,
      required: true
    }
  },
  computed: {
    img() {
      return this.boutique.content.carousel[0].Images[0]
    }
  }
}
</script>

<template>
  <article>
    <div class="-ml-1 flex gap-x-1 items-center overflow-x-hidden">
      <ILocalize class="w-6 flex-shrink-0 text-gray-500" />
      <div>
        <h3
          class="text-xs text-gray-500 italic font-thin leading-4 h-8 overflow-hidden"
        >
          {{ boutique.content.address }}
        </h3>
      </div>
    </div>
    <div class="image-container mt-2">
      <img
        :src="img.filename"
        :alt="img.alt"
        class="absolute w-full h-full object-cover"
      />
    </div>
    <h1 class="mt-2 text-primary not-italic text-xl">
      {{ boutique.name }}
    </h1>
  </article>
</template>

<style lang="sass" scoped>
.image-container
  @apply relative mt-2 rounded
  padding-bottom: 100%
</style>
