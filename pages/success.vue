<script>
// clean cart
export default {
  name: 'Success',
  mounted() {
    this.$store.commit('cart/emptyCart')
  }
}
</script>

<template>
  <h1>Yeah commande passée longue vie au roi</h1>
</template>
