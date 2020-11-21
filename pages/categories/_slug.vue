<script>
export default {
  name: 'CategoryPage',
  async asyncData({ $db, params }) {
    return {
      category: await $db.fetch('categoryBySlug', { slug: params.slug }),
      categories: await $db.fetch('categories')
    }
  }
}
</script>

<template>
  <main>
    <h1>Categories</h1>
    <p>What up {{ category.name }}</p>
  </main>
</template>
