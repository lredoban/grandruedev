<script>
export default {
  name: 'ProductVariants',
  props: {
    variants: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateVariant(event, key) {
      this.$emit('input', { ...this.value, [key]: event.target.value })
    }
  }
}
</script>

<template>
  <div class="bg-primary py-1 px-4 flex justify-between">
    <div v-for="(values, key) in variants" :key="key">
      <label :for="key" class="visual-hide">{{ key }}</label>
      <select
        :name="key"
        :value="value[key]"
        class="text-white bg-transparent font-semibold text-opacity-75 text-lg"
        @change="(e) => updateVariant(e, key)"
      >
        <option value="" disabled class="uppercase">{{ key }}</option>
        <option v-for="option in values" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>
