<script>
export default {
  name: 'Question',
  data: () => ({
    recompute: 0
  }),
  head() {
    return {
      title: this.title + ' - FAQ'
    }
  },
  computed: {
    question() {
      return this.$route.params.question
    },
    title() {
      if (typeof document === 'undefined') return ''
      // eslint-disable-next-line no-unused-expressions
      this.recompute
      return document.getElementById(this.question).nextElementSibling
        .firstChild.textContent
    }
  },
  mounted() {
    this.recompute++
  }
}
</script>

<template><div></div></template>
