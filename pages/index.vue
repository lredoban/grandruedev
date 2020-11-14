<script>
export default {
  name: 'LandingPage',
  layout: 'landing',
  data: () => ({
    email: '',
    emailSent: false,
    charte: false,
    isRetailer: false
  }),
  methods: {
    saveEmail() {
      if (!this.charte) return
      this.$http.get(
        `https://envgynhb7r0zvww.m.pipedream.net?email=${this.email}&isRetailer=${this.isRetailer}`
      )
      this.emailSent = true
    }
  }
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
        <ILikeInsta class="h-12 text-secondary md:h-16" />
        <ILogo class="bi-gout h-20 mt-4 -mr-2 md:h-24" />
        <ILogoWordFlat class="h-6 mt-2 md:h-8" />
        <h3 class="mt-1 uppercase font-hairline opacity-50 md:text-lg">
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
    <section class="pt-16 pb-40 bg-kraft text-center">
      <div class="flex items-center justify-center">
        <ILogoWordFlat class="h-8 text-primary" />
        <span class="q-mark ml-4 -mt-1 text-secondary leading-none">?</span>
      </div>
      <p
        class="mt-8 mx-auto px-8 max-w-lg text-sm text-primary italic font-thin"
      >
        Grand’Rue a l’ambition de
        <strong> simplifier et d’augmenter le commerce local</strong> en
        connectant tous les acteurs d’un territoire au moyen d’une porte
        d’entrée unique
      </p>
      <p
        class="mt-4 mx-auto px-8 max-w-lg text-sm text-primary italic font-thin"
      >
        <strong>Notre vision n’est pas née de la crise actuelle.</strong><br />
        Nous pensons qu’il est urgent de changer nos habitudes de consommation
        et de <strong>privilégier une économie de proximité,</strong> quasiment
        circulaire, pour apporter des solutions efficaces à la
        <strong>transition écologique.</strong>
      </p>
      <p
        class="mt-4 mx-auto px-8 max-w-lg text-sm text-primary italic font-thin"
      >
        <strong
          >Grand’Rue est bien plus qu’une plateforme de e-commerce,</strong
        >
        vous le découvrirez bientôt.
      </p>
    </section>
    <section
      class="relative divider-top divider--green pt-32 pb-24 bg-primary text-center"
    >
      <h1 class="text-secondary font-semibold">
        Des nouvelles de
        <ILogo class="-mr-1 inline h-10 text-white align-baseline" /> dans votre
        <IMail class="-mb-2 inline h-8 text-white align-baseline" /> :
      </h1>
      <form
        class="mx-auto max-w-md mt-8 px-10 text-left"
        @submit.prevent="saveEmail"
      >
        <label for="email" class="block">
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="saisissez votre adresse..."
            required
            :disabled="emailSent"
            class="px-1 w-full bg-transparent border-b-2 border-white text-white disabled:opacity-50"
          />
        </label>
        <div class="mt-4 flex">
          <input
            id="condition"
            v-model="charte"
            type="checkbox"
            class="-mt-1"
          />
          <label
            for="condition"
            class="-mt-1 ml-2 text-xs text-white text-justify text-opacity-75"
          >
            En m’inscrivant à la newsletter de Grand’Rue, je reconnais avoir
            pris connaissance de la charte relative aux données à caractère
            personnel.
          </label>
        </div>
        <div class="mt-2 flex">
          <input
            id="commercant"
            v-model="isRetailer"
            type="checkbox"
            class="-mt-1"
          />
          <label
            for="commercant"
            class="-mt-1 ml-2 text-xs text-white text-justify text-opacity-75"
          >
            Je suis commerçant
          </label>
        </div>
        <div class="mt-8 text-center">
          <AppButton
            type="submit"
            class="uppercase"
            invert
            :disabled="emailSent"
          >
            Je m’inscris
          </AppButton>
        </div>
      </form>
      <AppImage
        id="branche"
        class="absolute top-0 left-0 w-40 -mt-32"
        src="img/LANDING-PAGE.png"
        alt="une branche verte"
      />
      <AppImage
        id="sac"
        class="absolute top-0 right-0 h-40 -mt-32"
        src="img/sacboutique.png"
        alt="un sac Grand'Rue"
      />
    </section>
    <section class="w-full sm:grid grid-cols-3">
      <div
        id="infos"
        class="relative bg-kraft divider-bottom divider--kraft pb-56 text-center flex flex-col items-center col-span-2 md:pb-32"
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
        <AppButton
          tag="a"
          href="https://airtable.com/shr4EwCt38y1pHVmT"
          class="mt-4 z-10"
          >DEMANDEZ DES INFOS</AppButton
        >
        <AppImage
          class="absolute bottom-0 left-0 -ml-2 w-56 md:w-64"
          src="img/commercant.png"
          alt="Une commerçante tout sourire"
        />
      </div>
      <div
        id="shop"
        class="h-screen bg-cover max-w-lg md:h-full md:flex md:justify-center md:items-center"
        data-twic-background="url('image:grand-rue/interieur-boutique.jpg')"
      >
        <div
          class="relative -mt-20 w-10/12 max-w-sm mx-auto p-4 pb-8 bg-white shadow-xl z-10"
        >
          <div
            class="relative rounded-xl overflow-hidden"
            style="padding-bottom: 70%"
          >
            <AppImage
              src="img/commercantes.jpg"
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
#branche
  @screen lg
    @apply bottom-0 top-auto w-auto -mb-12 max-w-lg -ml-16
  @screen xl
    @apply max-w-2xl
#sac
  @screen lg
    @apply h-auto max-w-sm mt-0 transform -translate-y-1/2 -mt-12
  @screen xl
    @apply max-w-lg

#infos::after
  @screen md
    content: none
#shop > div
  @screen md
    @apply mt-0 -ml-48
</style>

<style lang="sass">
.bi-gout path:first-child
  fill: theme('colors.secondary')
</style>
