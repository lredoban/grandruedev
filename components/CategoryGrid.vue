<script>
export default {
  name: 'CategoryGrid',
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="grid grid-cols-2">
    <n-link
      v-for="category in categories"
      :key="category.slug"
      :to="
        localePath({
          name: 'categories-slug',
          params: { slug: category.slug }
        })
      "
      class="p-3 flex justify-center items-center bg-cover bg-white text-center text-white font-bold text-lg uppercase"
      :data-twic-background="`url('${category.imageThumbnail}')`"
    >
      {{ category.name }}
    </n-link>
  </div>
</template>

<style lang="sass" scoped>
.grid a::before
  content: ''
  padding-bottom: 100%
  display: inline-block
  vertical-align: top
</style>
