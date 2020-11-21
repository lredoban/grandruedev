<script>
export default {
  name: 'DefaultLayout',
  head() {
    return this.$nuxtI18nSeo()
  }
}
</script>

<template>
  <div class="relative">
    <TheHeader />
    <div>
      <Nuxt />
    </div>
    <TheFooter />
  </div>
</template>

<style lang="sass">
body
  @apply min-h-screen bg-white
</style>
