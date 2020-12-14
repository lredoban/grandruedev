<script>
import StoryblokImage from './StoryblokImage.vue'
export default {
  name: 'ProductBoutique',
  components: { StoryblokImage },
  props: {
    boutique: {
      type: Object,
      required: true
    }
  },
  computed: {
    firstImage() {
      return this.boutique.carousel[0].Images[0]
    }
  }
}
</script>

<template>
  <section class="grid grid-cols-2 text-center">
    <div class="relative">
      <StoryblokImage
        :src="firstImage.filename"
        :alt="firstImage.alt"
        class="absolute w-full h-full object-cover"
      />
    </div>
    <div class="bg-kraft px-6 py-12">
      <StoryblokImage
        :src="boutique.headerLogo.filename"
        :alt="boutique.headerLogo.alt"
        class="mx-auto h-10"
      />
      <div class="mt-12 grid grid-cols-2 gap-x-8 text-left">
        <div>
          <h1 class="text-xl text-primary">{{ boutique.name }}</h1>
          <BoutiqueInfos :boutique="boutique" class="mt-4" />
        </div>
        <div>
          <h2 class="text-xl text-secondary">{{ boutique.subtitle }}</h2>
          <div class="truncate-overflow mt-4 text-gray-500 text-sm">
            <rich-text-renderer :document="boutique.description" />
          </div>
        </div>
      </div>
      <AppButton
        tag="a"
        :href="
          localePath({
            name: 'boutiques-slug',
            params: { slug: boutique.slug }
          })
        "
        class="mt-12"
      >
        Visiter la boutique
      </AppButton>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.truncate-overflow
  --max-lines: 5
  position: relative
  max-height: calc(theme('lineHeight.6') * var(--max-lines) - 16px)
  overflow: hidden
  &::before
    content: "[...]"
    @apply absolute bottom-0 right-0 pl-2 bg-tertiary
</style>
