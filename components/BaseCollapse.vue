<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'BaseCollapse',
  components: { CollapseTransition },
  data: () => ({
    isOpen: false
  })
}
</script>

<template>
  <div class="border-t border-b border-gray-600 text-gray-600">
    <button
      class="py-2 w-full uppercase tracking-wide text-left flex justify-between items-center"
      @click="isOpen = !isOpen"
    >
      <slot name="trigger"></slot>
      <div class="mr-2" :class="isOpen && 'transform rotate-180'">
        <IArrowDown class="h-4 opacity-50" />
      </div>
    </button>
    <CollapseTransition>
      <div v-if="isOpen" class="py-1">
        <slot></slot>
      </div>
    </CollapseTransition>
  </div>
</template>
