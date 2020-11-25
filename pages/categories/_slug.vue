<script>
import ClickOutside from 'vue-click-outside'
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'CategoryPage',
  components: { CollapseTransition },
  directives: { ClickOutside },
  async asyncData({ $db, params }) {
    const category = await $db.fetch('categoryBySlug', { slug: params.slug })
    const rawCategories = await $db.fetch('categories')
    return {
      category,
      categories: rawCategories.filter((c) => c.name !== category.name),
      subs: await $db.fetch('categoriesBy', {
        key: 'parent',
        param: category.name
      }),
      products: await $db.fetch('productsBy', {
        key: 'category',
        param: category.name
      })
    }
  },
  data: () => ({
    displayCategories: false,
    displaySubs: false,
    subFilter: ''
  }),
  computed: {
    filteredProducts() {
      if (!this.subFilter) return this.products
      return this.products.filter((p) =>
        p.subCategories.includes(this.subFilter)
      )
    }
  },
  methods: {
    selectFilter(name) {
      this.subFilter = name
      this.displaySubs = false
    }
  }
}
</script>

<template>
  <main class="pb-20">
    <section class="category-hero">
      <AirtableImage
        :src="category.imageThumbnail"
        class="col-start-1 row-start-1 min-h-full object-cover"
      />
      <h1
        class="col-start-1 row-start-1 not-italic text-5xl text-white font-black tracking-wide uppercase"
      >
        {{ category.name }}
      </h1>
    </section>
    <div class="px-4 bg-red-600 flex justify-between">
      <div class="relative">
        <button
          class="p-2 uppercase font-bold tracking-wide text-white text-opacity-75 flex items-center gap-x-2"
          @click.stop="displayCategories = !displayCategories"
        >
          {{ category.name }}
          <div :class="displayCategories && 'transform rotate-180'">
            <IArrowDown class="h-3" />
          </div>
        </button>
        <CollapseTransition>
          <nav
            v-show="displayCategories"
            v-click-outside="() => (displayCategories = false)"
            class="absolute top-0 -ml-4 px-4 mt-10 max-w-xs w-screen z-10 bg-black bg-opacity-75"
          >
            <n-link
              v-for="cat in categories"
              :key="cat.slug"
              :to="{ name: 'categories-slug', params: { slug: cat.slug } }"
              class="block p-2 uppercase font-bold tracking-wide text-white text-opacity-75"
              >{{ cat.name }}</n-link
            >
          </nav>
        </CollapseTransition>
      </div>
      <div class="relative">
        <button
          class="p-2 uppercase font-bold tracking-wide text-white text-opacity-75"
          @click.stop="displaySubs = !displaySubs"
        >
          {{ subFilter || 'Filtrer' }}
        </button>
        <CollapseTransition>
          <ul
            v-show="displaySubs"
            v-click-outside="() => (displaySubs = false)"
            class="absolute top-0 right-0 -mr-4 px-4 mt-10 max-w-xs w-screen z-10 bg-black bg-opacity-75 text-right"
          >
            <li>
              <button
                class="block ml-auto p-2 uppercase font-bold tracking-wide text-white text-opacity-75 text-right"
                @click.stop="selectFilter('')"
              >
                Tous les articles
              </button>
            </li>
            <li v-for="{ name } in subs" :key="name">
              <button
                class="block ml-auto p-2 uppercase font-bold tracking-wide text-white text-opacity-75 text-right"
                @click.stop="selectFilter(name)"
              >
                {{ name }}
              </button>
            </li>
          </ul>
        </CollapseTransition>
      </div>
    </div>
    <div class="mt-4 text-center text-sm text-gray-500 text-hairline italic">
      {{ products.length }} Articles trouvés
    </div>
    <section class="mt-8 px-4 grid grid-cols-2 gap-x-4 gap-y-6">
      <n-link
        v-for="product in filteredProducts"
        :key="product.slug"
        :to="{ name: 'products-slug', params: { slug: product.slug } }"
      >
        <ProductExerpt :product="product" />
      </n-link>
    </section>
  </main>
</template>

<style lang="sass" scoped>
.category-hero
  @apply w-full grid grid-cols-1 grid-rows-1 overflow-hidden items-center text-center
  height: 60vh
</style>
