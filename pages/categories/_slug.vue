<script>
export default {
  name: 'CategoryPage',
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
    updateFilter(name) {
      this.subFilter = name
    }
  },
  head() {
    return {
      title: this.category.name
    }
  }
}
</script>

<template>
  <main class="pb-20">
    <section class="category-hero">
      <AirtableImage
        :src="category.imageThumbnail"
        :alt="category.name"
        class="col-start-1 row-start-1 min-h-full object-cover"
      />
      <h1
        class="col-start-1 row-start-1 not-italic text-5xl text-white font-black tracking-wide uppercase"
      >
        {{ category.name }}
      </h1>
    </section>
    <AppActionBar
      background-color="red"
      :left-text="category.name"
      :right-text="subFilter || 'Filtrer'"
      :left-list="categories"
      :right-list="subs.map((s) => s.name)"
      @filterChange="updateFilter"
    >
      <template v-slot:left="{ leftItem: cat }">
        <n-link
          :to="
            localePath({ name: 'categories-slug', params: { slug: cat.slug } })
          "
          class="block"
        >
          {{ cat.name }}
        </n-link>
      </template>
    </AppActionBar>
    <div class="mt-4 text-center text-sm text-gray-500 text-hairline italic">
      {{ products.length }} Articles trouvés
    </div>
    <ProductGrid
      :products="filteredProducts"
      class="mx-auto mt-8 px-4 max-w-4xl"
    />
  </main>
</template>

<style lang="sass" scoped>
.category-hero
  @apply w-full grid grid-cols-1 grid-rows-1 overflow-hidden items-center text-center
  height: 60vh
</style>
