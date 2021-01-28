<script>
import { twicifyAirtable } from '~/helpers/twicpics'

export default {
  name: 'Products',
  async asyncData({ $db, app }) {
    const rawCategories = await $db.fetch('categories')
    const categories = rawCategories.map((c) => ({
      ...c,
      imageThumbnail: twicifyAirtable(c.imageThumbnail)
    }))
    return {
      categories,
      products: await $db.fetch('recentProducts', { maxRecords: 100 })
    }
  }
}
</script>

<template>
  <main>
    <div class="py-16 bg-kraft">
      <div class="mt-8 px-6 grid gap-y-1 auto-cols-max justify-center">
        <img
          src="/img/sacboutique.png"
          alt="sac boutique"
          class="mx-auto w-24"
        />
        <div class="relative pb-16">
          <h1 class="font-thin not-italic text-secondary text-4xl uppercase">
            La boutique
          </h1>
          <ILogoWordFlat class="absolute inset-x-0 h-auto text-primary" />
        </div>
      </div>
    </div>
    <CategoryGrid :categories="categories" />
    <ProductGrid
      :products="products"
      class="mx-auto my-8 px-6 max-w-4xl md:my-24"
    />
  </main>
</template>
