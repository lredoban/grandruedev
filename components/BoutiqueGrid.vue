<script>
export default {
  name: 'BoutiqueGrid',
  props: {
    boutiques: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <section class="grid grid-cols-2 gap-x-4 gap-y-6">
    <n-link
      v-for="boutique in boutiques"
      :key="boutique.slug"
      :to="
        localePath({ name: 'boutiques-slug', params: { slug: boutique.slug } })
      "
    >
      <BoutiqueExerpt :boutique="boutique" />
    </n-link>
  </section>
</template>
