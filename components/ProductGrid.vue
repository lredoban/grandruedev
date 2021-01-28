<script>
import { getParams } from '~/plugins/product'

export default {
  name: 'ProductGrid',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  methods: { getParams }
}
</script>

<template>
  <section class="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-x-">
    <n-link
      v-for="product in products"
      :key="product.slug"
      :to="
        localePath({
          name: 'ville-boutique-subCategory-product',
          params: getParams(product)
        })
      "
    >
      <ProductExerpt :product="product" />
    </n-link>
  </section>
</template>
