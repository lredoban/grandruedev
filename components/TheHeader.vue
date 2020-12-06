<script>
import { mapState } from 'vuex'

export default {
  name: 'TheHeader',
  data: () => ({
    displayMenu: false
  }),
  computed: {
    ...mapState({
      imageUrl: (state) => state.menu.imageUrl
    })
  },
  watch: {
    $route() {
      this.displayMenu = false
    }
  },
  methods: {
    goBack() {
      if (window.history.length > 2) this.$router.go(-1)
      else this.$router.push(this.localePath('/'))
    }
  }
}
</script>

<template>
  <header
    class="divider-bottom z-20 top-0 w-screen p-3 bg-white text-primary flex items-center justify-between"
  >
    <button v-if="imageUrl" class="p-2 text-gray-400" @click="goBack">
      <IArrowLeft class="h-5" />
    </button>
    <div v-else class="flex items-center">
      <ICommercantsLocaux class="h-16" />
      <n-link :to="localePath('/')">
        <ILogoWord class="h-20 ml-2 -my-2" />
      </n-link>
    </div>
    <div v-if="imageUrl" class="image-container">
      <AirtableImage
        :src="imageUrl"
        class="absolute w-full h-full object-contain"
      />
    </div>
    <div v-else class="flex-1 flex justify-end">
      <button type="button"><IHeart class="h-10 p-2" /></button>
      <button type="button"><ICart class="h-10 p-2" /></button>
      <button type="button"><IAccount class="h-10 p-2" /></button>
    </div>
    <button type="button" class="text-secondary" @click="displayMenu = true">
      <IMenu class="h-10 p-2" />
    </button>
    <TheHeaderMobileMenu
      :display-menu="displayMenu"
      @close="displayMenu = false"
    />
  </header>
</template>

<style lang="sass" scoped>
header
  position: fixed
.image-container
  @apply relative w-64
  position: relative
  padding-bottom: 15%
</style>
