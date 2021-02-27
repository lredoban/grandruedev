<script>
// clean cart
export default {
  name: 'Success',
  mounted() {
    this.$store.commit('cart/emptyCart')
  }
}
</script>

<template>
  <section>
    <div class="grid items-end sm:hidden">
      <div class="relative col-start-1 row-start-1 w-screen pb-100p bg-black">
        <AirtableImage
          src="https://dl.airtable.com/.attachments/223e21b5a71716122d268a84dfce579e/f32313b1/pexels-daria-rem-2830332.jpg"
          alt="homme content avec une perruque de pâquerettes"
          class="absolute h-full w-full object-cover opacity-75"
        />
      </div>
      <h1
        class="z-10 mx-auto mb-10 col-start-1 row-start-1 not-italic text-white text-5xl font-bold"
      >
        MERCI !
      </h1>
    </div>
    <div class="bg-kraft py-16 px-8 text-center">
      <h2 class="mt-8 text-2xl text-secondary">
        Votre commande à bien été prise en compte&nbsp;!
      </h2>
      <p class="mt-4 max-w-md mx-auto text-primary">
        Vous recevrez sous peu un mail de confirmation contenant toutes les
        informations nécessaire au suivi et au récapitulatif de votre commande.
      </p>
      <div class="mt-16">
        <h3 class="text-secondary text-lg">À bientôt sur</h3>
        <ILogoWordFlat class="mx-auto mt-1 w-56 text-primary" />
      </div>
    </div>
  </section>
</template>
