<script>
import ClickOutside from 'vue-click-outside'
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'AppActionBar',
  components: { CollapseTransition },
  directives: { ClickOutside },
  props: {
    backgroundColor: {
      type: String,
      default: 'green'
    },
    leftText: {
      type: String,
      required: true
    },
    rightText: {
      type: String,
      required: true
    },
    leftList: {
      type: Array,
      required: true
    },
    rightList: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    displayLeftList: false,
    displayRightList: false
  }),
  computed: {
    backgroundClass() {
      const colorMap = {
        green: 'bg-primary',
        red: 'bg-red-600'
      }
      return colorMap[this.backgroundColor]
    }
  },
  methods: {
    selectFilter(name) {
      this.$emit('filterChange', name)
      this.displayRightList = false
    }
  }
}
</script>

<template>
  <div class="px-4 flex justify-between" :class="backgroundClass">
    <div class="relative">
      <button
        class="p-2 uppercase font-bold tracking-wide text-white text-opacity-75 flex items-center gap-x-2"
        @click.stop="displayLeftList = !displayLeftList"
      >
        {{ leftText }}
        <div :class="displayLeftList && 'transform rotate-180'">
          <IArrowDown class="h-3" />
        </div>
      </button>
      <CollapseTransition>
        <nav
          v-show="displayLeftList"
          v-click-outside="() => (displayLeftList = false)"
          class="absolute top-0 -ml-4 px-4 mt-10 max-w-xs w-screen z-10 bg-blurry"
        >
          <div
            v-for="(leftItem, i) in leftList"
            :key="'leftItem' + i"
            class="p-2 uppercase font-bold tracking-wide text-white text-opacity-75"
          >
            <slot name="left" :leftItem="leftItem" />
          </div>
        </nav>
      </CollapseTransition>
    </div>
    <div class="relative">
      <button
        class="p-2 uppercase font-bold tracking-wide text-white text-opacity-75"
        @click.stop="displayRightList = !displayRightList"
      >
        {{ rightText }}
      </button>
      <CollapseTransition>
        <nav
          v-show="displayRightList"
          v-click-outside="() => (displayRightList = false)"
          class="absolute top-0 right-0 -mr-4 px-4 mt-10 max-w-xs w-screen z-10 bg-blurry"
        >
          <button
            class="block ml-auto p-2 uppercase font-bold tracking-wide text-white text-opacity-75 text-right"
            @click.stop="selectFilter('')"
          >
            Tous les articles
          </button>
          <button
            v-for="rightItem in rightList"
            :key="rightItem"
            class="block ml-auto p-2 uppercase font-bold tracking-wide text-white text-opacity-75 text-right"
            @click.stop="selectFilter(rightItem)"
          >
            {{ rightItem }}
          </button>
        </nav>
      </CollapseTransition>
    </div>
  </div>
</template>
