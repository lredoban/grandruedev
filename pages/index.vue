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
      <div>
        <ILoginLogo class="mx-auto h-24" />
        <h3 class="mt-1 uppercase italic font-hairline opacity-50">
          Arrive très prochainement !
        </h3>
      </div>
      <div>
        <h3 class="italic font-hairline opacity-50 text-sm">En attendant...</h3>
        <IDoubleArrowDown class="mt-2 mx-auto h-8 opacity-25" />
      </div>
    </section>
    <section>
      LOGO grand rue
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae
        voluptatibus eligendi voluptas, inventore distinctio, quam error sed
        repudiandae adipisci ut autem velit unde reprehenderit aliquid veniam
        nihil dolorem ullam nemo?
      </p>
    </section>
    <section>
      <h1>Des nouvelles de SVG dans votre svg :</h1>
      <form action="">
        <input type="email" placeholder="saisissez votre adresse..." required />
        <label for="condition">
          <input id="condition" type="checkbox" />
          En m’inscrivant à la newsletter de Grand’Rue, je reconnais avoir pris
          connaissance de la charte relative aux données à caractère personnel.
        </label>
        <label for="commercant">
          <input id="commercant" type="checkbox" />
          Je suis commerçant
        </label>
        <AppButton type="submit" class="uppercase" invert>
          Je m’inscris
        </AppButton>
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
</style>
