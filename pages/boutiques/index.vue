<script>
export default {
  name: 'Boutiques',
  async asyncData({ app }) {
    const { stories: boutiques } = await app.$storyapi
      .get('cdn/stories', {
        starts_with: 'boutiques/',
        version: 'draft' // published
      })
      .then((res) => {
        return res.data
      })
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
        <h1 class="font-thin not-italic text-secondary text-4xl">
          Commerçants
        </h1>
        <ILogoWordFlat class="text-primary" />
      </div>
    </div>
    <BoutiqueGrid :boutiques="boutiques" class="my-8 px-6" />
  </main>
</template>
