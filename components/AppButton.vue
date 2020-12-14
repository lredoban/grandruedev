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
    :to="tag === 'n-link' && $attrs.to"
    class="px-6 py-1 rounded-full font-bold focus:outline-none focus:shadow-outline hover:shadow-lg"
    :class="invert ? 'bg-white text-primary' : 'bg-primary text-white'"
    type="button"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style lang="sass" scoped>
a[type=button]
  -webkit-appearance: none
a
  @apply inline-block
button:disabled
  @apply opacity-25 cursor-not-allowed
</style>
