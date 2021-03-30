<script>
export default {
  name: 'TheHeaderMenu'
}
</script>

<template>
  <nav class="flex divide-x divide-gray-200">
    <n-link
      :to="localePath('a-propos')"
      class="px-6 py-1 text-xs text-gray-600 italic"
    >
      A Propos
    </n-link>
    <n-link
      :to="localePath('products')"
      class="px-6 py-1 text-xs text-gray-600 italic"
    >
      Nos Produits
    </n-link>
    <n-link
      :to="localePath('boutiques')"
      class="px-6 py-1 text-xs text-gray-600 italic"
    >
      Nos Commerçants
    </n-link>
    <a
      class="px-6 py-1 text-xs text-gray-600 italic"
      :href="localePath('devenir-partenaire')"
      rel="noreferrer noopener"
    >
      Devenir partenaire
    </a>
  </nav>
</template>
