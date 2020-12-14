<script>
export default {
  name: 'HomepageWelcome'
}
</script>

<template>
  <section id="welcome" class="text-white text-center">
    <div class="fixed top-0 left-0 pt-20 h-full w-full sm:relative sm:pt-0">
      <AppImage
        src="/img/Accueil.jpg"
        class="absolute w-full h-full object-cover"
      />
      <div class="relative z-10 mt-12 sm:mt-0 sm:pt-20">
        <h3 class="text-5xl font-thin tracking-wide font-caveat leading-none">
          {{ $t('welcome') }}
        </h3>
        <h2 class="italic font-normal uppercase text-lg">
          Dans la zone commerciale de
        </h2>
        <h1 class="text-xl uppercase not-italic tracking-wider">
          Clermont-Ferrand !
        </h1>
        <AppButton
          tag="a"
          :href="localePath('products')"
          class="mt-8 uppercase"
        >
          Accéder à la boutique
        </AppButton>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
#welcome
  @apply relative
  height: 84vh
  > div
    background-size: cover
    background-position: 50%
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
