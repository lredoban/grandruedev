<script>
import { twicifyAirtable } from '~/helpers/twicpics'
export default {
  name: 'Accueil',
  asyncData: async ({ $db }) => {
    const rawCategories = await $db.fetch('categories')
    const categories = rawCategories.map((c) => ({
      ...c,
      imageThumbnail: twicifyAirtable(c.imageThumbnail)
    }))
    return {
      recentProducts: await $db.fetch('recentProducts'),
      categories
    }
  }
}
</script>

<template>
  <main>
    <section
      id="welcome"
      class="text-white text-center"
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
      <h1 class="text-3xl text-secondary font-extrabold not-italic text-center">
        Les nouveautés...
      </h1>
      <ProductExerptList :products="recentProducts" class="mt-8" />
      <div class="mt-12 w-full text-center">
        <AppButton class="mx-auto">Voir tous les produits</AppButton>
      </div>
    </section>

    <section class="overflow-hidden">
      <div class="mt-6 w-full h-16 bg-white"></div>
      <div class="relative bg-kraft pt-32 pb-12 px-8 grid grid-cols-2 gap-y-20">
        <div>
          <h1 class="text-xl text-secondary uppercase">
            Retrouvez vos commerçants préférés sur Grand'Rue !
          </h1>
          <IHeart class="mt-2 mx-auto h-6 text-red-600" />
        </div>
        <AppImage
          src="https://dl.airtable.com/.attachmentThumbnails/781454ee835d2465999b8ebef8104111/7fa259de"
          class="absolute row-span-3 h-full right-0 bottom-0 transform scale-125 translate-x-8"
        />
        <div class="row-start-2 col-span-2 z-10 text-center">
          <AppButton>Vos commerçants</AppButton>
        </div>
      </div>
    </section>

    <section id="categories">
      <div class="px-12 pt-16 pb-10 divider-top divider-bottom bg-white">
        <div class="mt-4">
          <ILikeInsta class="mx-auto h-16 text-secondary" />
          <div class="buy mt-4">
            <ILogo class="h-full -ml-2 row-span-2 text-primary" />
            <h1 class="text-secondary font-light text-2xl not-italic">
              j'achete local avec<span class="visual-hide">Grand'Rue</span>
            </h1>
            <ILogoWordFlat class="text-primary pb-2" />
          </div>
        </div>
        <p class="mt-6 italic text-gray-500">
          <strong>Grand’Rue séléctionne</strong> pour vous les boutiques les
          plus Lorem ipsum dolor sit
          <strong>amet, consetetur</strong> sadipscing elitr, sed diam
          <strong>nonumy</strong> eirmod tempor invidunt ut labo…
        </p>
      </div>
      <div class="grid grid-cols-2">
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
          :data-twic-background="`url('${category.imageThumbnail}')`"
        >
          {{ category.name }}
        </n-link>
      </div>
    </section>

    <!-- <section class="bg-white">
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
    </section> -->

    <!-- <section id="numbers" class="bg-kraft">
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
    </section> -->
    <section class="pt-20 pb-24 px-8">
      <AirtableImage
        src="https://dl.airtable.com/.attachmentThumbnails/6246efe226f8d97a05f9f7c850c69382/5067ba94"
        class="rounded-xl"
      />
      <h1 class="mt-4 text-secondary text-xl not-italic uppercase">
        Une solution idéale pour vous, commerçants
      </h1>
      <p class="mt-2 text-gray-500">
        <strong>Grand'Rue</strong>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, id
        nulla ipsum ad iusto consequuntur labore? Fuga voluptas mollitia quas
        dolores praesentium, aliquam eum itaque inventore ullam vel est ut...
      </p>
      <div class="text-center">
        <AppButton
          tag="a"
          href="https://airtable.com/shr4EwCt38y1pHVmT"
          class="mt-12 uppercase"
          target="_blank"
          rel="noreferrer noopener"
          >devenez partenaire</AppButton
        >
      </div>
    </section>
  </main>
</template>

<style lang="sass" scoped>
#welcome
  @apply pt-16
  height: 84vh
  background-image: url('/img/Accueil.jpg')
  background-size: cover
  background-position: 50%
#categories
  .grid a::before
    content: ''
    padding-bottom: 100%
    display: inline-block
    vertical-align: top
  .buy
    @apply grid mx-auto w-64 gap-y-2
    grid-template-columns: 1fr max-content
#numbers
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
