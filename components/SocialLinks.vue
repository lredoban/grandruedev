<script>
export default {
  name: 'TheFooter',
  props: {
    white: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClass() {
      return this.white
        ? 'text-black text-opacity-50 bg-white '
        : 'bg-primary text-white '
    }
  }
}
</script>

<template>
  <ul class="flex justify-between">
    <li>
      <a
        href="https://www.facebook.com/GrandRue-106918634568672"
        target="_blank"
        rel="noreferrer noopener"
        :class="white ? 'text-white' : 'text-primary'"
      >
        <IFacebook class="h-10" />
      </a>
    </li>
    <li>
      <a
        href="https://www.instagram.com/grand_rue/"
        target="_blank"
        rel="noreferrer noopener"
        class="block p-2 rounded-full"
        :class="iconClass"
      >
        <IInstagram class="h-6" />
      </a>
    </li>
    <li>
      <a
        href="https://www.linkedin.com/company/grandrue/"
        target="_blank"
        rel="noreferrer noopener"
        class="block p-2 rounded-full"
        :class="iconClass"
      >
        <ILinkedIn class="h-6" />
      </a>
    </li>
    <li>
      <a
        href="https://twitter.com/GrandRue_local"
        target="_blank"
        rel="noreferrer noopener"
        :class="white ? 'text-white' : 'text-primary'"
      >
        <ITwitter class="h-10 sm:h-10" />
        <span class="visual-hide">twitter account of Grand'Rue</span>
      </a>
    </li>
  </ul>
</template>
