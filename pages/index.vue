<script>
export default {
  name: 'LandingPage',
  layout: 'landing'
}
</script>

<template>
  <main>
    <section
      class="h-screen pt-8 pb-6 px-4 bg-primary text-white text-center flex flex-col justify-between"
    >
      <h1 class="visual-hide">Grand'Rue</h1>
      <div>
        <span class="text-3xl font-caveat">Pssst !</span>
        <h2 class="uppercase text-lg font-semibold">Un peu de patience...</h2>
      </div>
      <div class="flex flex-col items-center">
        <ILikeInsta class="h-12 text-secondary" />
        <ILogo class="bi-gout h-20 mt-4 -mr-2" />
        <ILogoWordFlat class="h-6 mt-2" />
        <h3 class="mt-1 uppercase font-hairline opacity-50">
          Arrive très prochainement !
        </h3>
      </div>
      <h2 class="text-lg">
        Votre boutique en ligne à partir du
        <strong class="text-secondary">27/11/2020</strong> !
      </h2>
      <div>
        <h3 class="font-hairline opacity-50 text-sm">En attendant...</h3>
        <IDoubleArrowDown class="mt-2 mx-auto h-8 opacity-25" />
      </div>
    </section>
    <section class="pt-16 pb-48 bg-kraft text-center">
      <div class="flex items-center justify-center">
        <ILogoWordFlat class="h-8 text-primary" />
        <span class="q-mark ml-4 -mt-1 text-secondary leading-none">?</span>
      </div>
      <p
        class="mt-8 mx-auto px-8 max-w-sm text-sm text-primary italic font-thin"
      >
        Grand’Rue a l’ambition de
        <strong> simplifier et d’augmenter le commerce local</strong> en
        connectant tous les acteurs d’un territoire au moyen d’une porte
        d’entrée unique
      </p>
      <p
        class="mt-4 mx-auto px-8 max-w-sm text-sm text-primary italic font-thin"
      >
        <strong>Notre vision n’est pas née de la crise actuelle.</strong><br />
        Nous pensons qu’il est urgent de changer nos habitudes de consommation
        et de <strong>privilégier une économie de proximité,</strong> quasiment
        circulaire, pour apporter des solutions efficaces à la
        <strong>transition écologique.</strong>
      </p>
      <p
        class="mt-4 mx-auto px-8 max-w-sm text-sm text-primary italic font-thin"
      >
        <strong
          >Grand’Rue est bien plus qu’une plateforme de e-commerce,</strong
        >
        vous le découvrirez bientôt.
      </p>
    </section>
    <section
      class="divider-top divider--green pt-32 pb-24 bg-primary text-center"
    >
      <h1 class="text-secondary font-semibold">
        Des nouvelles de
        <ILogo class="-mr-1 inline h-10 text-white align-baseline" /> dans votre
        <IMail class="-mb-2 inline h-8 text-white align-baseline" /> :
      </h1>
      <form action="" class="mt-8 px-10 text-left">
        <label for="email" class="block">
          <input
            id="email"
            type="email"
            placeholder="saisissez votre adresse..."
            required
            class="px-1 w-full bg-transparent border-b-2 border-white"
          />
        </label>
        <div class="mt-4 flex">
          <input id="condition" type="checkbox" class="-mt-1" />
          <label
            for="condition"
            class="-mt-1 ml-2 text-xs text-white text-justify text-opacity-75"
          >
            En m’inscrivant à la newsletter de Grand’Rue, je reconnais avoir
            pris connaissance de la
            <a href="#charte" class="underline"
              >charte relative aux données à caractère personnel.</a
            >
          </label>
        </div>
        <div class="mt-2 flex">
          <input id="commercant" type="checkbox" class="-mt-1" />
          <label
            for="commercant"
            class="-mt-1 ml-2 text-xs text-white text-justify text-opacity-75"
          >
            Je suis commerçant
          </label>
        </div>
        <div class="mt-8 text-center">
          <AppButton type="submit" class="uppercase" invert>
            Je m’inscris
          </AppButton>
        </div>
      </form>
      <img src="" alt="" />
      <img src="" alt="" />
    </section>
    <section>
      <div
        class="bg-kraft divider-bottom divider--kraft pb-56 text-center flex flex-col items-center"
      >
        <h2 class="mt-24 text-gray-500 text-xl font-medium opacity-75">
          Commerçants, DEVENEZ...
        </h2>
        <IPartenaires class="mt-16 h-16 text-primary" />
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
        <ILikeInsta class="mt-32 h-10 text-secondary" />
        <AppButton tag="a" href="#infos" class="mt-4"
          >DEMANDEZ DES INFOS</AppButton
        >
        <img src="" alt="" />
      </div>
      <div
        id="shop"
        class="h-screen bg-cover"
        data-twic-background="url('image:grand-rue/interieur-boutique.jpg')"
      >
        <div
          class="relative -mt-20 w-10/12 max-w-sm mx-auto p-4 pb-8 bg-white shadow-xl z-10"
        >
          <div
            class="relative rounded-xl overflow-hidden"
            style="padding-bottom: 70%"
          >
            <img
              data-twic-src="image:grand-rue/commercants.jpg"
              alt="Deux commerçante regardant un ordinateur en souriant"
              class="absolute h-full w-full object-cover object-bottom"
            />
          </div>
          <h3 class="mt-4 text-xl text-gray-500">
            Fidélisez votre clientèle !
          </h3>
          <p class="mt-2 text-gray-400 font-bold">
            soyez ENFIN leurs commerçants favoris avec votre boutique clé en
            main grand-rue !
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="sass" scoped>
.visual-hide
  font-size: 0
  width: 1px
  height: 1px
  display: inline-block
  overflow: hidden
  position: absolute!important
  border: 0!important
  padding: 0!important
  margin: 0!important
  clip: rect(1px,1px,1px,1px)
input[type="email"]::placeholder
  @apply text-sm text-white text-opacity-50 uppercase italic
.q-mark
  font-size: 42px
</style>

<style lang="sass">
.bi-gout path:first-child
  fill: theme('colors.secondary')
</style>
