<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

import StoryblokImage from '~/components/StoryblokImage.vue'
import storyblok from '~/mixins/storyblok'

const defaults = Object.freeze({
  surname: '',
  name: '',
  shop: '',
  activity: '',
  ville: '',
  quartier: '',
  siret: '',
  mail: '',
  phone: ''
})

export default {
  name: 'DevenirPartenaire',
  components: { StoryblokImage },
  mixins: [storyblok, validationMixin],
  async asyncData({ $db, $storyblok, error, params }) {
    const story = await $storyblok.getStoryBySlug('devenir-partenaire')
    return { story }
  },
  data: () => ({
    ...defaults,
    done: false
  }),
  validations: Object.keys(defaults).reduce((acc, key) => {
    acc[key] = { required }
    return acc
  }, {}),
  computed: {
    id() {
      return this.story.id
    },
    title() {
      return this.story.title
    },
    heroPicture() {
      return this.story.heroPicture
    },
    grid() {
      return this.story.grid
    }
  },
  mounted() {
    this.listenStoryblokChanges(this.id, (event) => {
      const { title, heroPicture, grid } = event.story.content
      this.title = title
      this.heroPicture = heroPicture
      this.grid = grid
    })
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
        body: this.encode({ 'form-name': 'devenir-partenaire', ...formData })
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
    <div class="relative pt-12 pb-42p px-8 text-center">
      <StoryblokImage
        :src="heroPicture.filename"
        :alt="heroPicture.alt"
        class="absolute inset-0 w-full h-full object-cover"
      />
    </div>
    <a
      class="py-2 block text-center text-sm underline bg-secondary text-gray-200 uppercase font-bold tracking-wide"
      href="#devenir-partenaire"
      >Contactez-nous</a
    >
    <div class="py-10 bg-kraft flex flex-col flex-col-reverse text-center">
      <div id="wow" class="w-full h-6 bg-left md:hidden"></div>
      <div id="wow" class="mt-10 w-full h-6 bg-right md:hidden"></div>
      <div class="mt-8 mx-auto text-center flex flex-col justify-center">
        <IPartenaires class="h-16 text-primary" />
        <div class="mt-4 grid grid-cols-1 auto-cols-min">
          <h1
            class="uppercase text-secondary text-3xl tracking-widest leading-none not-italic font-medium"
          >
            Partenaire
          </h1>
          <div>
            <ILogoWordFlat class="text-primary" />
          </div>
        </div>
      </div>
      <h2
        class="mx-auto text-gray-500 flex flex-col items-center font-normal italic md:flex-row md:space-x-2"
      >
        <span class="text-lg md:text-sm">Vous êtes commerçant</span>
        <span class="text-lg md:text-sm">indépendant ou artisan,</span>
        <span class="md:text-sm">devenez...</span>
      </h2>
    </div>
    <div class="py-10 divider-top divider-bottom">
      <h3 class="ml-4 text-primary text-2xl md:text-4xl md:text-center">
        Pourquoi ouvrir une boutique sur Grand’Rue ? <br />
        Parce que c’est….
      </h3>
      <div
        class="mt-6 px-4 mx-auto max-w-md grid grid-cols-2 gap-4 md:max-w-5xl md:grid-cols-4"
      >
        <div
          v-for="(item, i) in grid"
          :key="i"
          class="px-2 py-4 flex flex-col justify-center items-center text-center shadow-lg border rounded md:px-4 md:py-8 md:justify-start"
        >
          <StoryblokImage
            :src="item.icon.filename"
            :alt="item.icon.alt"
            class="h-8 md:h-16"
          />
          <h4
            class="mt-4 text-gray-600 font-bold tracking-wide md:mt-10 md:text-2xl"
          >
            {{ item.title }}
          </h4>
          <p class="text-sm text-gray-400 font-bold tracking-wide md:text-lg">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
    <div class="py-16 px-4 bg-kraft">
      <h4
        v-if="done"
        class="mx-auto max-w-md text-secondary text-2xl text-center uppercase font-bold"
      >
        Merci nous prennons en compte votre demande
      </h4>
      <div v-else class="mx-auto max-w-md">
        <h3 class="text-xl text-secondary">ÇA VOUS INTÉRESSE ?</h3>
        <form
          id="devenir-partenaire"
          method="POST"
          name="devenir-partenaire"
          netlify
          @submit.prevent="submit"
        >
          <input type="hidden" name="form-name" value="devenir-partenaire" />
          <div class="mt-6 grid grid-cols-2 gap-y-6 gap-x-6">
            <label>
              <span>Nom</span>
              <input
                v-model="surname"
                type="text"
                placeholder="Nom"
                name="surname"
                required
              />
            </label>
            <label>
              <span>Prénom</span>
              <input
                v-model="name"
                type="text"
                placeholder="Prénom"
                name="name"
                required
              />
            </label>
            <label class="col-span-2">
              <span>Nom de ma boutique</span>
              <input
                v-model="shop"
                type="text"
                placeholder="Nom de ma boutique"
                name="shop"
                required
              />
            </label>
            <label class="col-span-2">
              <span>Activité</span>
              <input
                v-model="activity"
                type="text"
                placeholder="Activité"
                name="activity"
                required
              />
            </label>
            <label>
              <span>Ville</span>
              <input
                v-model="ville"
                type="text"
                placeholder="Ville"
                name="ville"
                required
              />
            </label>
            <label>
              <span>Quartier</span>
              <input
                v-model="quartier"
                type="text"
                placeholder="Quartier"
                name="quartier"
                required
              />
            </label>
            <label class="col-span-2">
              <span>Siret</span>
              <input
                v-model="siret"
                type="text"
                placeholder="siret"
                name="siret"
                required
              />
            </label>
            <label class="col-span-2">
              <span>Adresse Mail</span>
              <input
                v-model="mail"
                type="email"
                placeholder="Adresse Mail"
                name="mail"
                required
              />
            </label>
            <label class="col-span-2">
              <span>Téléphone</span>
              <input
                v-model="phone"
                type="tel"
                placeholder="Téléphone"
                name="phone"
                required
              />
            </label>
          </div>
          <AppButton type="submit" class="mt-8 block mx-auto">
            Je souhaite être contacté
          </AppButton>
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

#wow
  background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='60px' height='28px' style=' font-family: sans-serif; font-style: italic; font-weight: 800; font-size: 20; stroke: white; fill: white; ' %3E%3Ctext x='0' y='20'%3EWOW%3C/text%3E%3C/svg%3E")
</style>
