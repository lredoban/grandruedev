<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

import AppButton from '~/components/AppButton.vue'
import storyblok from '~/mixins/storyblok'

const defaults = Object.freeze({
  surname: '',
  name: '',
  mail: '',
  zipCode: '',
  phone: '',
  sujet: '',
  message: '',
  newsletter: false
})

export default {
  name: 'ContactPage',
  components: { AppButton },
  mixins: [storyblok, validationMixin],
  async asyncData({ $db, $storyblok, error, params }) {
    const {
      id,
      title,
      heroPicture,
      newsletterLabel,
      newsletterText,
      sujets
    } = await $storyblok.getStoryBySlug('contact')
    return {
      story: {
        id,
        title,
        heroPicture,
        newsletterLabel,
        newsletterText,
        sujets: sujets.map((s) => s.text)
      }
    }
  },
  data: () => ({
    ...defaults,
    done: false
  }),
  validations: {
    surname: { required },
    name: { required },
    mail: { required },
    zipCode: { required },
    sujet: { required },
    message: { required }
  },
  head() {
    return {
      title: "Contacter Grand'Rue"
    }
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
    },
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      const { story, done, ...formData } = this.$data
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({ 'form-name': 'contact', ...formData })
      })
        .then(() => {
          this.resetData()
          this.done = true
        })
        .catch(() => {
          alert(
            'Une erreur est survenue veuillez remplir le formulaire une nouvelle fois'
          )
          this.resetData()
        })
    },
    resetData() {
      Object.keys(defaults).forEach((key) => {
        this.$data[key] = defaults[key]
      })
    }
  }
}
</script>

<template>
  <main>
    <div class="relative pb-60p md:pb-20p">
      <StoryblokImage
        :src="story.heroPicture.filename"
        :alt="story.heroPicture.alt"
        class="absolute inset-0 w-full h-full object-cover"
      />
    </div>
    <div v-if="done" class="p-12 bg-kraft">
      <h1
        class="mx-auto max-w-md text-secondary text-2xl text-center uppercase font-bold"
      >
        Merci nous prennons en compte votre demande
      </h1>
    </div>
    <div v-else class="py-8 px-4 bg-kraft">
      <div class="mx-auto max-w-xl">
        <h1 class="text-secondary text-2xl uppercase font-bold">
          {{ story.title }}
        </h1>
        <form name="contact" method="POST" netlify @submit.prevent="submit">
          <input type="hidden" name="form-name" value="contact" />
          <div class="mt-8 grid grid-cols-2 gap-y-6 gap-x-6">
            <label>
              <span>Nom *</span>
              <input
                v-model="surname"
                type="text"
                placeholder="Nom"
                name="surname"
                required
              />
            </label>
            <label>
              <span>Prénom *</span>
              <input
                v-model="name"
                type="text"
                placeholder="Prénom"
                name="name"
                required
              />
            </label>
            <label class="col-span-2">
              <span>Adresse Mail *</span>
              <input
                v-model="mail"
                type="email"
                placeholder="Adresse Mail"
                name="mail"
                required
              />
            </label>
            <label>
              <span>Code Postal *</span>
              <input
                v-model="zipCode"
                type="text"
                placeholder="Code Postal"
                name="zipCode"
                required
              />
            </label>
            <label>
              <span>Téléphone</span>
              <input
                v-model="phone"
                type="tel"
                placeholder="Téléphone"
                name="phone"
              />
            </label>
            <label class="col-span-2">
              <span>Objet de la demande *</span>
              <select v-model="sujet" name="sujet" required>
                <option value="" disabled>Je veux...</option>
                <option
                  v-for="option in story.sujets"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </label>
            <label class="col-span-2">
              <span>Mon Message *</span>
              <textarea
                v-model="message"
                name="message"
                type="text"
                placeholder="800 caractères max"
                rows="5"
                required
              />
            </label>
          </div>
          <div class="mt-4 text-center">
            <div>
              <label class="text-gray-600 italic">
                <input v-model="newsletter" type="checkbox" name="newsletter" />
                <span class="ml-1 text-sm italic">
                  {{ story.newsletterLabel }}
                </span>
              </label>
              <small class="mx-auto max-w-sm text-gray-500 block">
                {{ story.newsletterText }}
              </small>
            </div>
            <AppButton class="mt-10 uppercase" type="submit">Envoyer</AppButton>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style lang="sass" scoped>
form > div > label
  @apply text-primary font-semibold
  > span
    @apply block
  input, textarea, select
    @apply mt-1 px-2 py-1 w-full text-gray-600 text-sm
::placeholder
  @apply text-gray-400 italic font-thin text-xs
</style>
