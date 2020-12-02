<script>
export default {
  name: 'ProductGrid',
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <section class="grid grid-cols-2 gap-x-4 gap-y-6">
    <n-link
      v-for="product in products"
      :key="product.slug"
      :to="
        localePath({ name: 'products-slug', params: { slug: product.slug } })
      "
    >
      <ProductExerpt :product="product" />
    </n-link>
  </section>
</template>
