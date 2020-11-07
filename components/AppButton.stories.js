export default {
  title: 'Common'
}

export const AppButton = (args) => ({
  props: { allArgs: { default: () => args } },
  template: `
    <div class="my-24 w-full flex justify-center ">
      <AppButton v-bind="allArgs">Click me if you can</AppButton>
    </div>
  `
})
