<script>
import { mapState, mapActions } from 'vuex'

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
    ...mapActions(['openCart']),
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
    <button v-if="imageUrl" class="p-2" @click="goBack">
      <IArrowLeft class="h-5 sm:hidden text-gray-400" />
      <n-link :to="localePath('boutiques')" class="hidden sm:block">
        <ICommercantsLocaux class="h-16" />
      </n-link>
    </button>
    <div v-else class="flex items-center">
      <n-link :to="localePath('boutiques')">
        <ICommercantsLocaux class="h-16" />
      </n-link>
      <n-link :to="localePath('/')" class="sm:hidden">
        <ILogoWord class="h-20 ml-2 -my-2" />
      </n-link>
    </div>
    <div
      class="hidden h-24 py-4 flex-1 sm:flex justify-between items-center flex-col"
    >
      <n-link :to="localePath('/')">
        <ILogoWordFlat class="w-48 ml-2 -my-2" />
      </n-link>
      <TheHeaderMenu />
    </div>
    <div v-if="imageUrl" class="image-container sm:hidden">
      <AirtableImage
        :src="imageUrl"
        class="absolute w-full h-full object-contain"
      />
    </div>
    <div v-else class="flex-1 flex justify-end sm:flex-none">
      <!-- <button type="button"><IHeart class="h-10 p-2" /></button> -->
      <button type="button" @click="openCart">
        <ICart class="h-10 p-2" />
      </button>
      <button type="button"><IAccount class="h-10 p-2" /></button>
    </div>
    <div class="flex">
      <button v-if="imageUrl" type="button" @click="openCart">
        <ICart class="h-10 p-2" />
      </button>
      <button
        type="button"
        class="text-secondary sm:hidden"
        @click="displayMenu = true"
      >
        <IMenu class="h-10 p-2" />
      </button>
    </div>
    <TheHeaderMobileMenu
      :display-menu="displayMenu"
      @close="displayMenu = false"
    />
  </header>
</template>

<style lang="sass" scoped>
header
  position: fixed
  @screen sm
    @apply relative
.image-container
  @apply relative w-64
  position: relative
  padding-bottom: 15%
</style>
