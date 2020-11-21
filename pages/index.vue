<script>
import { twicifyAirtable } from '~/helpers/twicpics'
export default {
  name: 'Accueil',
  asyncData: async ({ $db }) => {
    const rawCategories = await $db.$get('categories')
    const categories = rawCategories.map((c) => ({
      ...c,
      imagePreview: twicifyAirtable(c.imagePreview)
    }))
    return {
      recentProducts: await $db.$get('recentProducts'),
      categories
    }
  }
}
</script>

<template>
  <div>
    <section
      id="welcome"
      class="bg-pink-500 text-white text-center"
      data-twic-background="url('image:grand-rue/Accueil.jpg')"
    >
      <h3 class="text-5xl font-thin tracking-wide font-caveat leading-none">
        {{ $t('welcome') }}
      </h3>
      <h2 class="italic font-normal uppercase text-lg">
        Dans la zone commerciale de
      </h2>
      <h1 class="text-xl uppercase not-italic tracking-wider">
        Clermont-Ferrand !
      </h1>
      <AppButton class="mt-8 uppercase">Accéder à la boutique</AppButton>
    </section>
    <section id="products" class="divider-top pt-12 bg-white">
      <h1 class="pl-12 text-2xl text-secondary text-bold">Nos nouveautés...</h1>

      <AppHorizontalList :items="recentProducts">
        <template v-slot="{ item }">
          <n-link
            :to="
              localePath({ name: 'products-slug', params: { slug: item.slug } })
            "
          >
            <ProductExerpt :product="item" />
          </n-link>
        </template>
      </AppHorizontalList>

      <div class="pl-12">Les produits</div>
      <div class="mt-12 w-full text-center">
        <AppButton class="mx-auto">Voir tous les produits</AppButton>
      </div>
    </section>
    <section id="categories" class="mt-12 bg-white">
      <h1 class="pl-12 text-2xl text-secondary text-bold">
        J'achete local avec Grand'Rue
      </h1>
      <p class="italic">
        <strong>’Rue séléctionne</strong> pour vous les boutiques les plus Lorem
        ipsum dolor sit <strong>amet, consetetur</strong> sadipscing elitr, sed
        diam <strong>nonumy</strong> eirmod tempor invidunt ut labo…
      </p>
      <div class="mt-12 grid grid-cols-2">
        <n-link
          v-for="category in categories"
          :key="category.slug"
          :to="
            localePath({
              name: 'categories-slug',
              params: { slug: category.slug }
            })
          "
          class="p-3 flex justify-center items-center bg-cover bg-black bg-opacity-50 text-center text-white font-bold text-lg uppercase"
          :data-twic-background="`url('${category.imagePreview}')`"
        >
          {{ category.name }}
        </n-link>
      </div>
    </section>
    <section class="bg-white">
      <img src="" alt="Sac Grand'Rue" />
      <h1 class="text-secondary text-2xl">Pourquoi consommer Local?</h1>
      <p class="mt-4 italic">
        <strong class="not-italic">Grand Rue</strong> Lorem ipsum dolor sit
        amet, consetetur sadipscing sed diam,Lorem consetetur sadipscing elitr,
        sadipscing elitr, diam ed diam nonumy eirmod tempor invidunt ut labo …
      </p>
      <div class="mt-12 w-full text-center">
        <AppButton class="mx-auto">En savoir+</AppButton>
      </div>
    </section>
    <section id="numbers">
      <div class="py-12 flex flex-col items-center space-y-12 text-center">
        <div>
          <span>15000</span>
          <h2>Produits</h2>
        </div>
        <div>
          <span>28</span>
          <h2>Commerçants</h2>
        </div>
        <div>
          <span>19</span>
          <h2>Producteurs</h2>
        </div>
        <AppButton class="block">Devenez partenaire</AppButton>
      </div>
    </section>
    <section>
      <h1 class="h1">Le magazine grand’rue..</h1>
    </section>
  </div>
</template>

<style lang="sass" scoped>
#welcome
  @apply pt-16
  height: 84vh
  background-image: url('/img/Accueil.jpg')
  background-size: cover
  background-position: 50%
#categories .grid a::before
  content: ''
  padding-bottom: 100%
  display: inline-block
  vertical-align: top
#numbers
  background-color: #faf5f2
  span
    @apply text-3xl font-bold text-secondary
  h2
    @apply text-2xl font-bold text-primary
</style>

<i18n>
{
  "fr": {
    "welcome": "Bienvenue"
  },
  "en": {
    "welcome": "Welcome"
  }
}
</i18n>
