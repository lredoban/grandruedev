<script>
import { mapState } from 'vuex'
import { SlideXRightTransition } from 'vue2-transitions'

export default {
  name: 'DefaultLayout',
  components: { SlideXRightTransition },
  computed: {
    ...mapState(['displayCart'])
  },
  watch: {
    displayCart(open) {
      if (open) document.body.classList.add('noscroll')
      else document.body.classList.remove('noscroll')
    }
  },
  head() {
    return this.$nuxtI18nSeo()
  }
}
</script>

<template>
  <div class="relative">
    <SlideXRightTransition>
      <TheCartExerpt v-show="displayCart" />
    </SlideXRightTransition>
    <TheHeader />
    <div class="mt-24">
      <Nuxt class="-mt-2" />
    </div>
    <TheFooter />
  </div>
</template>

<style lang="sass">
body
  @apply min-h-screen bg-white
  &.noscroll
    @apply overflow-hidden
</style>
