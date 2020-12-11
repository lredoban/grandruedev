<script>
export default {
  name: 'AppCarousel',
  props: {
    images: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="relative">
    <div class="carousel">
      <div
        v-for="img in images"
        :id="img.id"
        :key="img.id"
        class="carousel-item"
      >
        <slot :img="img" />
      </div>
    </div>
    <div v-if="images.length > 1" class="controls">
      <span v-for="img in images" :key="img.id + '_control'">
        <span class="visual-hide">{{ img.filename }}</span>
      </span>
    </div>
  </div>
</template>

<style lang="sass" scoped>
// https://markus.oberlehner.net/blog/super-simple-progressively-enhanced-carousel-with-css-scroll-snap/
.carousel
  @apply flex overflow-x-scroll
  scroll-snap-type: x mandatory
  scroll-behavior: smooth
  &-item
    @apply relative w-full flex-shrink-0
    padding-bottom: 60vh
    scroll-snap-align: start
  img
    @apply absolute w-full h-full object-cover object-center
.controls
  @apply w-full absolute bottom-0 mb-4 flex justify-center gap-x-5
  span
    @apply block h-3 w-3 bg-gray-300 bg-opacity-75 border border-gray-400 rounded-full
</style>
