<script setup lang="ts">
  import { useBackgroundLayout } from '@composables/useBackgroundLayout';

  const { fadeIn } = useAnimationGSAP();
  const background = useBackgroundLayout();
  const bgRef = ref<HTMLElement | null>(null);

  onMounted(() => {
    if (bgRef.value) {
      fadeIn(bgRef.value, { duration: 0.8 });
    }
  });
</script>

<template>
  <div class="layout-auth">
    <div
      class="layout-auth__bg"
      ref="bgRef"
    ></div>
    <slot />
  </div>
</template>

<style scoped lang="postcss">
  .layout-auth {
    min-height: 100vh;
    display: flex;
    justify-content: flex-end;
    overflow: hidden;
    position: relative;

    &__bg {
      background: v-bind(background);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      inset: 0;
      opacity: 0;
      z-index: -1;
    }
  }
</style>
