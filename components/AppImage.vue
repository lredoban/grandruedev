<script>
export default {
  name: 'AppImage',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    twicSrc() {
      if (this.$config.dev) return ''
      return this.src.replace('img/', 'image:grand-rue/')
    },
    preview() {
      if (this.$config.dev) return this.src
      const url = this.src
        .split('img/')
        .join('https://dz11y8g2.twic.pics/grand-rue/')
      return url + '?twic=v1/output=preview'
    }
  }
}
</script>

<template>
  <img v-bind="$attrs" :data-twic-src="twicSrc" :src="preview" />
</template>
