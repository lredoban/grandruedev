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
      <div
        class="pl-8 max-w-2xl mx-auto mt-10 grid gap-y-2 items-center sm:grid-cols-3"
      >
        <ILogoRound
          class="hidden mx-auto text-primary h-20 row-span-2 sm:block"
        />
        <n-link
          to="/foire-aux-questions"
          class="text-secondary text-2xl font-bold tracking-wide sm:text-lg"
        >
          Besoin d'aide ?
        </n-link>
        <n-link
          to="/a-propos"
          class="text-secondary text-2xl font-bold tracking-wide sm:text-lg"
        >
          Qui somme nous ?
        </n-link>
        <!-- <n-link
          to="/magazine"
          class="text-secondary text-2xl font-bold tracking-wide sm:text-lg"
        >
          Le magazine Grand'Rue
        </n-link> -->
        <n-link
          to="/contact"
          class="text-secondary text-2xl font-bold tracking-wide sm:text-lg"
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
