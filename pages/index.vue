<script>
export default {
  name: 'LandingPage',
  layout: 'landing'
}
</script>

<template>
  <main>
    <section
      class="h-screen pt-8 pb-6 bg-primary text-white text-center flex flex-col justify-between"
    >
      <h1 class="visual-hide">Grand'Rue</h1>
      <div>
        <span class="text-3xl font-caveat">Pssst !</span>
        <h2 class="uppercase text-lg italic font-semibold">
          Un peu de patience...
        </h2>
      </div>
      <div class="flex flex-col items-center">
        <ILikeInsta class="h-12 text-secondary" />
        <ILogo class="h-20 mt-4 -mr-2" />
        <ILogoWordFlat class="h-6 mt-2" />
        <h3 class="mt-1 uppercase italic font-hairline opacity-50">
          Arrive très prochainement !
        </h3>
      </div>
      <div>
        <h3 class="italic font-hairline opacity-50 text-sm">En attendant...</h3>
        <IDoubleArrowDown class="mt-2 mx-auto h-8 opacity-25" />
      </div>
    </section>
    <section class="pt-16 pb-48 bg-kraft text-center">
      <h1 class="text-4xl">Grand Rue</h1>
      <p class="mx-8 max-w-sm text-xs text-primary italic font-thin">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae
        voluptatibus eligendi voluptas, inventore distinctio, quam error sed
        repudiandae adipisci ut autem velit unde reprehenderit aliquid veniam
        nihil dolorem ullam nemo?
      </p>
    </section>
    <section
      class="divider-top divider--green pt-32 pb-24 bg-primary text-center"
    >
      <h1 class="text-secondary italic font-semibold">
        Des nouvelles de <span class="text-white">SVG</span> dans votre
        <span class="text-white">svg</span> :
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
          <input id="condition" type="checkbox" />
          <label
            for="condition"
            class="-mt-1 ml-2 text-xs text-white text-justify text-opacity-75"
          >
            En m’inscrivant à la newsletter de Grand’Rue, je reconnais avoir
            pris connaissance de la charte relative aux données à caractère
            personnel.
          </label>
        </div>
        <!-- <div class="mt-2 flex">
          <input id="commercant" type="checkbox" />
          <label
            for="commercant"
            class="-mt-1 ml-2 text-xs text-white text-justify text-opacity-75"
          >
            Je suis commerçant
          </label>
        </div> -->
        <div class="mt-8 text-center">
          <AppButton type="submit" class="uppercase" invert>
            Je m’inscris
          </AppButton>
        </div>
      </form>
      <img src="" alt="" />
      <img src="" alt="" />
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
</style>
