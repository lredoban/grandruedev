<script>
export default {
  name: 'ProductExerptList',
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <AppHorizontalList :items="products">
    <template v-slot="{ item }">
      <n-link
        :to="localePath({ name: 'products-slug', params: { slug: item.slug } })"
      >
        <ProductExerpt :product="item" />
      </n-link>
    </template>
  </AppHorizontalList>
</template>
