<script setup lang="ts"></script>

<template>
  <header class="header">
    <Logo />
    <div class="header__navigation">
      <Navigation />
    </div>
    <UserPanel class="header__user" />
  </header>
</template>

<style scoped lang="postcss">
  .header {
    padding: var(--indent);
    display: flex;
    gap: var(--indent);
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;

    &__navigation,
    &__user {
      display: none;
    }

    @media (--bp-xl) {
      &__navigation,
      &__user {
        display: block;
      }

      &__navigation {
        flex: 1;
        text-align: center;
      }
    }
  }
</style>
