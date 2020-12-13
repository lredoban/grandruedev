<script>
export default {
  name: 'BoutiqueInfos',
  props: {
    boutique: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <ul class="text-gray-600 text-italic text-sm">
    <li class="mt-2 flex items-center">
      <ILocalize class="-ml-1 mr-1 w-6 flex-shrink-0 text-secondary" />
      <span class="ml-2 leading-none">{{ boutique.address }}</span>
    </li>
    <li class="mt-2 flex items-center">
      <IPhone class="-mb-1 w-6 flex-shrink-0 text-secondary" />
      <span class="ml-2 leading-none">{{ boutique.phone }}</span>
    </li>
    <li class="mt-2 flex items-center">
      <IEmail class="-mb-2 w-6 flex-shrink-0 text-secondary" />
      <span class="ml-2 leading-none">{{ boutique.email }}</span>
    </li>
    <li class="mt-2 flex items-center">
      <ISchedule class="-mb-1 w-6 flex-shrink-0 text-secondary" />
      <span class="ml-2 leading-none">{{ boutique.schedule }}</span>
    </li>
  </ul>
</template>
