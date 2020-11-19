<script>
export default {
  name: 'AppButton',
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    invert: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <component
    :is="tag"
    class="px-6 py-1 rounded-full font-bold focus:outline-none focus:shadow-outline hover:shadow-lg"
    :class="invert ? 'bg-white text-primary' : 'bg-primary text-white'"
    type="button"
  >
    <slot />
  </component>
</template>

<style lang="sass" scoped>
button:disabled
  @apply opacity-25 cursor-not-allowed
</style>
