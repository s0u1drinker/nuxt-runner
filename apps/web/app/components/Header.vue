<script setup lang="ts"></script>

<template>
  <header class="header">
    <Logo />
    <div class="header__navigation">
      <Navigation />
    </div>
    <UserPanel />
  </header>
</template>

<style scoped lang="postcss">
  .header {
    padding: var(--indent);
    display: flex;
    gap: var(--indent);
    align-items: center;

    &__navigation {
      flex: 1;
      text-align: center;
    }
  }
</style>
