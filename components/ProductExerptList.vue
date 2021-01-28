<script>
import { getParams } from '~/plugins/product'

export default {
  name: 'ProductExerptList',
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
  <AppHorizontalList :items="products">
    <template v-slot="{ item }">
      <n-link
        :to="
          localePath({
            name: 'ville-boutique-subCategory-product',
            params: getParams(item)
          })
        "
      >
        <ProductExerpt :product="item" />
      </n-link>
    </template>
  </AppHorizontalList>
</template>
