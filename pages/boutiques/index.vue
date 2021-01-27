<script>
export default {
  name: 'Boutiques',
  async asyncData({ $storyblok }) {
    const boutiques = await $storyblok.getStories({ starts_with: 'boutiques/' })
    return {
      boutiques
    }
  }
}
</script>

<template>
  <main>
    <div class="divider-bottom divider--kraft py-16 bg-kraft">
      <div class="mt-8 px-6 grid gap-y-1 auto-cols-max justify-center">
        <img
          src="https://dl.airtable.com/.attachmentThumbnails/781454ee835d2465999b8ebef8104111/7fa259de"
          alt="Tablier"
          class="mx-auto w-24"
        />
        <div class="relative pb-16">
          <h1 class="font-thin not-italic text-secondary text-4xl">
            Commerçants
          </h1>
          <ILogoWordFlat class="absolute inset-x-0 h-auto text-primary" />
        </div>
      </div>
    </div>
    <BoutiqueGrid
      :boutiques="boutiques"
      class="mx-auto my-8 px-6 max-w-4xl md:my-24"
    />
  </main>
</template>
