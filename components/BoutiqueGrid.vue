<script>
import { getVilleSlug } from '~/plugins/boutique'

export default {
  name: 'BoutiqueGrid',
  props: {
    boutiques: {
      type: Array,
      required: true
    }
  },
  methods: { getVilleSlug }
}
</script>

<template>
  <section class="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-x-8">
    <n-link
      v-for="boutique in boutiques"
      :key="boutique.slug"
      :to="
        localePath({
          name: 'ville-boutique',
          params: { ville: getVilleSlug(boutique), boutique: boutique.slug }
        })
      "
    >
      <BoutiqueExerpt :boutique="boutique" />
    </n-link>
  </section>
</template>
