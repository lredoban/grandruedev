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
      products: await $db.fetch('recentProducts', { maxRecords: 25 })
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
        <h1 class="font-thin not-italic text-secondary text-4xl uppercase">
          La boutique
        </h1>
        <ILogoWordFlat class="text-primary" />
      </div>
    </div>
    <CategoryGrid :categories="categories" />
    <ProductGrid :products="products" class="my-8 px-6" />
  </main>
</template>
