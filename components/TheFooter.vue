<template>
  <footer>
    <section
      class="divider-top divider-bottom divider--green py-12 px-2 bg-primary"
    >
      <div class="max-w-3xl mx-auto grid grid-cols-4 gap-x-2 gap-y-2">
        <ISecure class="mx-auto text-white h-10" />
        <IBike class="mx-auto text-white h-12" />
        <IClickNCollect class="mx-auto text-white h-10" />
        <IEar class="mx-auto text-white h-10" />
        <div class="text-white uppercase font-bold text-xs text-center">
          PAIEMENT<br />SÉCURISÉ
        </div>
        <div class="text-white uppercase font-bold text-xs text-center">
          Livraison<br />à domicile
        </div>
        <div class="text-white uppercase font-bold text-xs text-center">
          Click &<br />collect
        </div>
        <div class="text-white uppercase font-bold text-xs text-center">
          SERVICE<br />CLIENT
        </div>
      </div>
    </section>
    <section class="relative bg-kraft pt-12 pb-4">
      <SocialLinks class="px-20 max-w-lg mx-auto" />
      <div class="pl-8 max-w-2xl mx-auto mt-10 flex flex-col space-y-2">
        <n-link
          to="foire-aux-questions"
          class="text-secondary text-2xl font-bold tracking-wide"
        >
          Besoin d'aide ?
        </n-link>
        <n-link
          to="a-propos"
          class="text-secondary text-2xl font-bold tracking-wide"
        >
          Qui somme nous ?
        </n-link>
        <!-- <n-link
          to="magazine"
          class="text-secondary text-2xl font-bold tracking-wide"
        >
          Le magazine Grand'Rue
        </n-link> -->
        <n-link
          to="contact"
          class="text-secondary text-2xl font-bold tracking-wide"
        >
          Contactez-nous
        </n-link>
      </div>
      <div class="mt-12 text-xs text-center text-primary font-semibold">
        &copy; {{ new Date().getFullYear() }} Grand'Rue
      </div>
    </section>
  </footer>
</template>
