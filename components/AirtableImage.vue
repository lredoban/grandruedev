<script>
import { twicifyAirtable, twicPreview } from '~/helpers/twicpics'

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
      return twicifyAirtable(this.src)
    },
    preview() {
      if (this.$config.dev) return this.src
      return twicPreview(
        this.src,
        'airtable',
        'https://dl.airtable.com/.attachments/'
      )
    }
  }
}
</script>

<template>
  <img v-bind="$attrs" :data-twic-src="twicSrc" :src="preview" />
</template>
