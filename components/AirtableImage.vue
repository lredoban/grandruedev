<script>
import { twicifyAirtable, twicPreview } from '~/helpers/twicpics'

export default {
  name: 'AirtableImage',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    twicSrc() {
      return twicifyAirtable(this.src)
    },
    preview() {
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
  <img
    v-bind="$attrs"
    :data-twic-src="twicSrc"
    :src="preview"
    data-twic-src-focus="auto"
  />
</template>
