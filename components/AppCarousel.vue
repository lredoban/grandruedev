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
  <div class="carousel">
    <div v-for="img in images" :key="img.id" class="carousel-item">
      <slot :img="img" />
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
</style>
