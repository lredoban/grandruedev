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
    <div class="relative pt-12 pb-20 px-4 text-center">
      <StoryblokImage
        :src="heroPicture.filename"
        :alt="heroPicture.alt"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <h1 class="relative text-3xl text-secondary">{{ title }}</h1>
      <div class="mt-8 px-4 py-10 text-white bg-blurry">
        <h2>Sommaire</h2>
        <ul class="text-left">
          <li v-for="category in categories" :key="category._uid">
            <a :href="'#' + category.slug">{{ category.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="pt-10 pb-20 px-4 space-y-6">
      <div
        v-for="category in categories"
        :key="category._uid"
        class="p-4 bg-gray-200"
      >
        <div :id="category.slug" class="target"></div>
        <h3 class="text-secondary">
          {{ category.title }}
        </h3>
        <ul>
          <li
            v-for="question in category.questions"
            :key="question._uid"
            class="border-b"
          >
            <n-link
              :id="question.slug"
              :to="{
                name: 'foire-aux-questions-question',
                params: { question: question.slug }
              }"
              class="target"
            ></n-link>
            <details :data-slug="question.slug" @toggle="changeUrl">
              <summary>{{ question.title }}</summary>
              <rich-text-renderer :document="question.response" />
            </details>
          </li>
        </ul>
      </div>
    </div>
    <nuxt-child></nuxt-child>
  </main>
</template>

<style lang="sass" scoped>
.target
  display: block
  position: relative
  top: -120px
  visibility: hidden
</style>
