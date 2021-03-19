<script>
import slugify from '@sindresorhus/slugify'
import StoryblokImage from '~/components/StoryblokImage.vue'
import storyblok from '~/mixins/storyblok'

export default {
  name: 'FAQ',
  components: { StoryblokImage },
  mixins: [storyblok],
  async asyncData({ $db, $storyblok, error, params }) {
    const {
      id,
      title,
      heroPicture,
      categories
    } = await $storyblok.getStoryBySlug('foire-aux-questions')
    const slugedCategories = categories.map((c) => ({
      ...c,
      slug: slugify(c.title),
      questions: c.questions.map((q) => ({ ...q, slug: slugify(q.title) }))
    }))
    return { id, title, heroPicture, categories: slugedCategories }
  },
  head() {
    return {
      title: 'FAQ'
    }
  },
  computed: {
    current() {
      return this.$route.params.question
    }
  },
  mounted() {
    this.listenStoryblokChanges(this.id, (event) => {
      const { title, heroPicture, categories } = event.story.content
      this.title = title
      this.heroPicture = heroPicture
      this.categories = categories
    })
    if (this.current && document.getElementById(this.current)) {
      const currentEl = document.getElementById(this.current)
      if (currentEl) {
        const { top } = currentEl.getBoundingClientRect()
        window.scroll(0, top + window.scrollY)
        currentEl.nextElementSibling.open = true
      }
    }
  },
  methods: {
    changeUrl(e) {
      const {
        dataset: { slug },
        open
      } = e.target
      if (!open) return
      this.$router.push({
        name: 'foire-aux-questions-question',
        params: { question: slug }
      })
    }
  }
}
</script>

<template>
  <main>
    <div class="relative pt-12 pb-20 px-8 text-center">
      <StoryblokImage
        :src="heroPicture.filename"
        :alt="heroPicture.alt"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <h1 class="relative text-3xl text-secondary uppercase underline">
        {{ title }}
      </h1>
      <div
        id="sommaire"
        class="mx-auto max-w-sm mt-8 px-6 py-10 text-white bg-blurry"
      >
        <h2 class="text-xl uppercase">Sommaire</h2>
        <ul
          class="mt-6 text-left text-lg space-y-2 font-semibold tracking-wide italic"
        >
          <li v-for="category in categories" :key="category._uid">
            <a :href="'#' + category.slug">{{ category.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="mx-auto max-w-xl pt-10 pb-20 px-4 space-y-6">
      <div
        v-for="category in categories"
        :key="category._uid"
        class="p-4 bg-gray-200"
      >
        <div :id="category.slug" class="target"></div>
        <h3 class="text-secondary uppercase text-lg">
          {{ category.title }}
        </h3>
        <ul class="mt-4">
          <li
            v-for="question in category.questions"
            :key="question._uid"
            class="border-b border-gray-600"
          >
            <n-link
              :id="question.slug"
              :to="{
                name: 'foire-aux-questions-question',
                params: { question: question.slug }
              }"
              class="target"
            ></n-link>
            <details
              :data-slug="question.slug"
              class="text-gray-600 pb-4"
              @toggle="changeUrl"
            >
              <summary
                class="mt-4 list-none text-gray-700 outline-none cursor-pointer"
              >
                {{ question.title }}
                <IArrowDown class="ml-1 h-4 -mt-1 inline opacity-75" />
              </summary>
              <div class="mt-2 text-sm rich-text">
                <rich-text-renderer :document="question.response" />
              </div>
            </details>
          </li>
        </ul>
      </div>
    </div>
    <nuxt-child></nuxt-child>
  </main>
</template>

<style lang="sass" scoped>
#sommaire
  ul > li::before
    content: '> '
.target
  display: block
  position: relative
  top: -120px
  visibility: hidden
</style>
