<template>
  <header
    class="divider-bottom w-screen px-3 bg-white text-primary flex align-items justify-between"
  >
    <div class="flex items-center">
      <ICommercantsLocaux class="h-12" />
      <n-link to="/">
        <ILogo class="h-16 ml-2" />
      </n-link>
    </div>
    <div class="flex align-items justify-between gap-x-3">
      <button type="button"><IHeart class="h-4" /></button>
      <button type="button"><ICart class="h-4" /></button>
      <button type="button"><IAccount class="h-4" /></button>
      <button type="button" class="text-secondary">
        <IMenu class="h-4" />
      </button>
    </div>
  </header>
</template>
