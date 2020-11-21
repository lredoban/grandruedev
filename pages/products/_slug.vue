<script>
export default {
  name: 'ProductPage',
  async asyncData({ $db, params }) {
    return {
      product: await $db.fetch('productBySlug', { slug: params.slug })
    }
  }
}
</script>

<template>
  <main>
    <h1>Products</h1>
    <p>What up {{ product.name }}</p>
  </main>
</template>
