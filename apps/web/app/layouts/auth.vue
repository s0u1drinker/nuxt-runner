<script setup lang="ts">
  import { useBackgroundLayout } from '~/composables/useBackgroundLayout';

  const background = useBackgroundLayout();
</script>

<template>
  <div class="layout-auth">
    <slot />
  </div>
</template>

<style scoped>
  .layout-auth {
    min-height: 100vh;
    background: v-bind(background);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    @media (--bp-xs) {
      color: purple;
    }
  }
</style>
