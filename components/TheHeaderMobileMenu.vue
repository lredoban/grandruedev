<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'TheHeaderMobileMenu',
  components: { CollapseTransition },
  props: {
    displayMenu: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<template>
  <CollapseTransition>
    <div
      v-show="displayMenu"
      class="absolute top-0 left-0 w-screen h-screen z-30 text-white"
      @click.self="$emit('close')"
    >
      <div class="bg-blurry pt-20 pb-12 px-8">
        <button
          class="absolute top-0 right-0 p-4 mt-4 mr-2 font-bold text-xl text-white text-opacity-25"
          @click="$emit('close')"
        >
          <IClose class="h-4" />
        </button>
        <nav>
          <ul class="font-bold">
            <li>
              <n-link :to="localePath('/')" class="block w-full py-1">
                Accueil
              </n-link>
            </li>
            <li>
              <n-link :to="localePath('a-propos')" class="block w-full py-1">
                A Propos
              </n-link>
            </li>
            <li>
              <n-link :to="localePath('products')" class="block w-full py-1">
                Nos produits
              </n-link>
            </li>
            <li>
              <n-link :to="localePath('boutiques')" class="block w-full py-1">
                Nos commerçants
              </n-link>
            </li>
            <li>
              <a
                class="w-full py-1"
                :href="localePath('devenir-partenaire')"
                rel="noreferrer noopener"
              >
                Devenir Partenaire
              </a>
            </li>
          </ul>
        </nav>
        <n-link :to="localePath('/')" class="block w-full">
          <ILogoMono class="mt-12 h-10 mx-auto" />
        </n-link>
        <SocialLinks white class="pt-6 px-12" />
      </div>
    </div>
  </CollapseTransition>
</template>
