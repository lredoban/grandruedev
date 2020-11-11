<script>
export default {
  name: 'AppButton',
  props: {
    invert: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <button
    class="px-4 py-2 rounded-full font-bold focus:outline-none focus:shadow-outline hover:shadow-lg"
    :class="invert ? 'bg-white text-primary' : 'bg-primary text-white'"
    type="button"
  >
    <slot />
  </button>
</template>
