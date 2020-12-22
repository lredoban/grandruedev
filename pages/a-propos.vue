<script>
import IAutonome from '~/components/svg/Autonome'
import IDurable from '~/components/svg/Durable'
import IImpact from '~/components/svg/Impact'
import ILocal from '~/components/svg/Local'
import IPositif from '~/components/svg/Positif'

export default {
  name: 'APropos',
  components: { IAutonome, IDurable, IImpact, ILocal, IPositif },
  async asyncData({ $db, app, error, params }) {
    const { story } = await app.$storyapi
      .get(`cdn/stories/a-propos`, {
        version: 'draft' // published
      })
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        if (!res.response) {
          error({
            statusCode: 404,
            message: 'Failed to receive content form api'
          })
        } else {
          error({
            statusCode: res.response.status,
            message: res.response.data
          })
        }
      })
    return { ...story.content.body[0], storyId: story.id }
  },
  computed: {
    cardKeys() {
      return ['positif', 'autonome', 'local', 'impact', 'durable']
    },
    cardIcons() {
      return {
        autonome: 'IAutonome',
        durable: 'IDurable',
        impact: 'IImpact',
        local: 'ILocal',
        positif: 'IPositif'
      }
    }
  },
  mounted() {
    // Use the input event for instant update of content
    this.$storybridge.on('input', (event) => {
      if (event.story.id === this.storyId) {
        Object.keys(event.story.content.body[0]).forEach((key) => {
          this[key] = event.story.content.body[0][key]
        })
      }
    })
    // Use the bridge to listen the events
    this.$storybridge.on(['published', 'change'], (event) => {
      // window.location.reload()
      this.$nuxt.$router.go({
        path: this.$nuxt.$router.currentRoute,
        force: true
      })
    })
  }
}
</script>

<template>
  <main>
    <section class="relative grid grid-col-1 md:grid-cols-2">
      <StoryblokImage :src="image_1.filename" :alt="image_1.alt" />
      <div
        class="relative bg-kraft divider-top divider--kraft pt-32 pb-12 px-8"
      >
        <h1 class="special-sauce text-center text-secondary text-3xl">
          {{ title }}
        </h1>
        <ILogoWordFlat class="mx-auto mt-12 max-w-xs px-6 text-primary" />
        <h2
          class="max-w-xs mx-auto text-center text-xl text-gr-gray opacity-75 font-semibold"
        >
          {{ subtitle }}
        </h2>
        <div class="mt-8 rich-text">
          <rich-text-renderer :document="paragraph_1" />
        </div>
        <ILikeInsta class="mt-10 h-16 text-secondary" />
        <div class="text-xl text-secondary italic font-bold">
          {{ catch_phrase }}
        </div>
        <div class="mt-8 rich-text">
          <rich-text-renderer :document="paragraph_2" />
        </div>
        <div
          class="z-10 absolute top-0 left-0 w-full -translate-y-1/2 transform"
        >
          <StoryblokImage
            :src="logo.filename"
            :alt="logo.alt"
            class="mx-auto h-56"
          />
        </div>
      </div>
    </section>
    <section class="grid grid-col-1 xl:grid-cols-2">
      <StoryblokImage :src="image_2.filename" :alt="image_2.alt" />
      <div class="bg-white divider-top px-6 py-10">
        <div class="space-y-6">
          <div
            v-for="key in cardKeys"
            :key="key"
            class="w-full px-4 py-1 shadow-md rich-text border-t border-gray-100"
          >
            <component
              :is="cardIcons[key]"
              class="mt-4 mx-auto text-secondary h-16"
            />
            <rich-text-renderer :document="$data['card_' + key]" />
          </div>
        </div>
        <div class="mt-12 max-w-xs mx-auto text-center">
          <div class="text-secondary text-sm font-semibold">
            {{ subtitle_2 }}
          </div>
          <div
            class="mt-2 text-2xl text-primary font-semibold uppercase leading-6"
          >
            {{ title_2 }}
          </div>
        </div>
      </div>
    </section>
    <section class="bg-kraft divider-top divider--kraft py-12">
      <div class="flex flex-col space-y-8 text-center">
        <div class="max-w-xs mx-auto rich-text">
          <IEye class="mx-auto h-12 text-secondary" />
          <rich-text-renderer :document="eye_paragraph" />
        </div>
        <div class="max-w-xs mx-auto rich-text">
          <IKey class="mx-auto h-8 text-secondary" />
          <rich-text-renderer :document="key_paragraph" />
        </div>
        <div class="max-w-xs mx-auto rich-text">
          <IEco class="mx-auto h-10 text-secondary" />
          <rich-text-renderer :document="eco_paragraph" />
        </div>
      </div>
      <div class="mt-12 text-center">
        <StoryblokImage
          :src="sistemic_image.filename"
          :alt="sistemic_image.alt"
          class="w-20 mx-auto"
        />
        <div class="mx-auto max-w-xs rich-text">
          <rich-text-renderer :document="sistemic_paragraph" />
        </div>
      </div>
    </section>
    <section>
      <StoryblokImage :src="team_image.filename" :alt="team_image.alt" />
      <div class="divider-top py-12 bg-white">
        <div class="max-w-xs mx-auto">
          <h1 class="uppercase text-primary text-3xl text-center">
            {{ team_title }}
          </h1>
          <div class="rich-text">
            <rich-text-renderer :document="team_paragraph" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="sass" scoped>
h1.special-sauce
  @apply relative
  &::after
    @apply bg-secondary
    position: absolute
    content: ''
    height: 3px
    width: 50%
    bottom: 0
    left: 50%
    transform: translateX(-50%)
</style>