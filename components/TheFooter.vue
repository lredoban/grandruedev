<template>
  <footer>
    <section
      class="divider-top divider-bottom divider--green py-12 px-2 bg-primary grid grid-cols-4 gap-x-2 gap-y-2"
    >
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
    </section>
    <section class="bg-kraft pt-12 pb-4">
      <ul class="px-20 flex justify-between">
        <li>
          <a
            href="https://www.facebook.com/GrandRue-106918634568672"
            target="_blank"
            rel="noreferrer noopener"
          >
            <IFacebook class="text-primary h-10" />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/grand_rue/"
            target="_blank"
            rel="noreferrer noopener"
            class="block p-2 bg-primary text-white rounded-full"
          >
            <IInstagram class="h-6" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/company/grandrue/"
            target="_blank"
            rel="noreferrer noopener"
            class="block p-2 bg-primary text-white rounded-full"
          >
            <ILinkedIn class="h-6" />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/GrandRue_local"
            target="_blank"
            rel="noreferrer noopener"
          >
            <ITwitter class="text-primary h-10 sm:h-10" />
            <span class="visual-hide">twitter account of Grand'Rue</span>
          </a>
        </li>
      </ul>
      <div class="mt-12 text-xs text-center text-primary font-semibold">
        &copy; {{ new Date().getFullYear() }} Grand'Rue
      </div>
    </section>
  </footer>
</template>
