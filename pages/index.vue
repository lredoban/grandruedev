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
    <HomepageWelcome />
    <section id="products" class="divider-top pt-12 bg-white">
      <h1 class="text-3xl text-secondary font-extrabold not-italic text-center">
        Les nouveautés...
      </h1>
      <ProductExerptList :products="recentProducts" class="mt-8" />
      <div class="mt-12 w-full text-center">
        <AppButton tag="a" :href="localePath('products')" class="mx-auto">
          Voir tous les produits
        </AppButton>
      </div>
    </section>

    <section class="overflow-hidden">
      <div class="relative w-full h-24 bg-white"></div>
      <div class="relative bg-kraft w-full">
        <div
          class="relative max-w-4xl pt-32 pb-12 px-8 mx-auto grid grid-cols-2 gap-y-20 sm:gap-y-6"
        >
          <div
            class="flex flex-col sm:max-w-xs sm:col-span-2 sm:text-center sm:px-4 sm:mx-auto sm:flex-col-reverse sm:gap-y-6"
          >
            <h1 class="text-xl text-secondary uppercase sm:text-primary">
              Retrouvez vos commerçants préférés sur Grand'Rue !
            </h1>
            <IHeart class="mt-2 mx-auto h-6 text-red-600" />
          </div>
          <AirtableImage
            src="https://dl.airtable.com/.attachments/daaeb7ce4efd7540dd041f7ad22ec027/21f20bc1/Tablier.png"
            class="absolute row-span-3 h-full right-0 bottom-0 transform scale-125 translate-x-8"
          />
          <AppImage
            src="/img/LANDING-PAGE.png"
            class="hidden absolute row-span-3 h-full left-0 bottom-0 transform scale-125 -translate-x-8 sm:block"
          />
          <div class="row-start-2 col-span-2 z-10 text-center">
            <AppButton tag="a" :href="localePath('boutiques')">
              Vos commerçants
            </AppButton>
          </div>
        </div>
      </div>
    </section>

    <section id="categories">
      <div class="px-12 pt-16 pb-10 divider-top divider-bottom bg-white">
        <div class="mt-4">
          <ILikeInsta class="mx-auto h-16 text-secondary" />
          <div class="flex justify-center">
            <div class="relative mt-4 pl-16">
              <ILogo class="absolute left-0 top-0 w-16 text-primary" />
              <h1
                class="text-secondary font-light text-2xl not-italic leading-none"
              >
                j'achete local avec<span class="visual-hide">Grand'Rue</span>
              </h1>
              <ILogoWordFlat class="mt-3 w-48 text-primary" />
            </div>
          </div>
        </div>
        <p class="mx-auto max-w-sm mt-6 italic text-gray-500 sm:text-center">
          Ne perdez plus de temps, retrouvez les commerçants de votre ville sur
          <strong>Grand’Rue</strong>, quelle que soit leur activité.
        </p>
      </div>
      <div class="relative bg-white">
        <CategoryGrid :categories="categories" class="mx-auto max-w-5xl" />
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
    <section class="relative bg-white pt-20 pb-24 px-8">
      <div
        class="max-w-4xl mx-auto grid grid-cols-1 gap-y-8 sm:gap-x-12 sm:grid-cols-3 sm:items-center"
      >
        <div
          class="relative pb-60p rounded-xl overflow-hidden sm:pb-120p sm:shadow-lg"
        >
          <AirtableImage
            src="https://dl.airtable.com/.attachments/b4d278e3364eee3a0412adcc4f15ba05/f4e94a5d/cashier.jpg"
            class="absolute w-full h-full object-cover"
          />
        </div>
        <div class="col-span-2">
          <h1 class="text-secondary text-xl not-italic uppercase md:text-3xl">
            Une solution idéale pour vous, commerçants
          </h1>
          <p class="mt-2 text-gray-500">
            Ouvrir une boutique sur <strong>Grand'Rue</strong> est simple et
            rapide. C’est le complément idéal de votre boutique, ouverte 24/24
            avec un maximum de services. Et pour le trafic on s’occupe de
            tout...
          </p>
          <div class="text-center sm:text-left">
            <AppButton
              tag="a"
              class="mt-12 uppercase"
              href="https://airtable.com/shr4EwCt38y1pHVmT"
              target="_blank"
              rel="noreferrer noopener"
              >devenez partenaire</AppButton
            >
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="sass" scoped>
#categoriesf
  > div::after
    @screen sm
      display: none
#numbers
  span
    @apply text-3xl font-bold text-secondary
  h2
    @apply text-2xl font-bold text-primary
</style>
