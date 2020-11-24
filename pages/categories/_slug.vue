<script>
export default {
  name: 'CategoryPage',
  async asyncData({ $db, params }) {
    const category = await $db.fetch('categoryBySlug', { slug: params.slug })
    return {
      category,
      categories: await $db.fetch('categories'),
      subs: await $db.fetch('categoriesBy', {
        key: 'parent',
        param: category.name
      }),
      products: await $db.fetch('productsBy', {
        key: 'category',
        param: category.name
      })
    }
  }
}
</script>

<template>
  <main class="pb-20">
    <section>
      <div class="category-hero">
        <AirtableImage
          :src="category.imageThumbnail"
          class="col-start-1 row-start-1"
        />
        <h1
          class="col-start-1 row-start-1 not-italic text-5xl text-white font-black tracking-wide"
        >
          {{ category.name }}
        </h1>
      </div>
      <div
        class="px-4 bg-red-600 flex justify-between text-white text-opacity-75"
      >
        <button class="p-2 uppercase font-bold tracking-wide">
          {{ category.name }}
        </button>
        <button class="p-2 uppercase font-bold tracking-wide">Filter</button>
      </div>
      <div class="mt-4 text-center text-sm text-gray-500 text-hairline italic">
        {{ products.length }} Articles trouvés
      </div>
    </section>
    <section class="mt-8 px-4 grid grid-cols-2 gap-x-4 gap-y-6">
      <ProductExerpt
        v-for="product in products"
        :key="product.slug"
        :product="product"
      />
    </section>
  </main>
</template>

<style lang="sass" scoped>
.category-hero
  @apply w-full grid grid-cols-1 grid-rows-1 overflow-hidden items-center text-center
  height: 60vh
</style>
