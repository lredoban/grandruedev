<template>
  <div class="container">
    <div v-for="item in items" :key="item.id">
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCarrousel',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
// https://uxdesign.cc/creating-horizontal-scrolling-containers-the-right-way-css-grid-c256f64fc585
.container
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none  /* IE and Edge */
  scrollbar-width: none  /* Firefox */

  --gutter: 20px

  @apply mx-auto max-w-5xl

  width: 100vw
  display: grid
  grid-gap: calc(var(--gutter))
  grid-template-columns: 10px
  grid-template-rows: minmax(150px, 1fr)
  grid-auto-flow: column
  grid-auto-columns: calc(60% - var(--gutter))

  overflow-x: scroll
  scroll-snap-type: x proximity

  @screen sm
    grid-auto-columns: calc(45% - var(--gutter))
  @screen md
    grid-auto-columns: calc(30% - var(--gutter))
  @screen lg
    grid-auto-columns: auto
    grid-template-columns: repeat(5, 1fr)
    &:before, &:after
      display: none


  &:before, &:after
    content: ''
    width: 10px

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar
    display: none
</style>
