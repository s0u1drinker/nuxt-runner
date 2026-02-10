<template>
  <div class="auth-layout">
    <slot />
  </div>
</template>

<style scoped>
  .auth-layout {
    background-color: var(--red);
    user-select: none;

    @media(--bp-xs) {
      color: purple;
      background-color: violet;
    }
  }
</style>
