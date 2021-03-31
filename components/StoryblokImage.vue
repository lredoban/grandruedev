<script>
import { twicifyStoryblok, twicPreview } from '~/helpers/twicpics'

export default {
  name: 'StoryblokImage',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    twicSrc() {
      return twicifyStoryblok(this.src)
    },
    preview() {
      return twicPreview(
        this.src,
        'gr-storyblok',
        'https://a.storyblok.com/f/98779/'
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
