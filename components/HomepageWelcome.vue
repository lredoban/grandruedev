<script>
export default {
  name: 'HomepageWelcome'
}
</script>

<template>
  <section id="welcome" class="text-white text-center">
    <div
      class="fixed top-0 left-0 pt-32 h-full w-full"
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
      <AppButton tag="a" :href="localePath('products')" class="mt-8 uppercase">
        Accéder à la boutique
      </AppButton>
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
