<script setup lang="ts">
  const { orient = 'horizontal' } = defineProps<{ orient?: 'vertical' | 'horizontal' }>();
</script>

<template>
  <div
    class="nav-divider"
    :class="{ [`nav-divider_${orient}`]: true }"
    role="separator"
    aria-hidden="true"
    :aria-orientation="orient"
  ></div>
</template>

<style scoped lang="postcss">
  .nav-divider {
    background-color: var(--color-gray-400);
    margin: var(--indent-half) 0;

    &_horizontal {
      margin-left: var(--nav-divider-padding, 0);
      margin-right: var(--nav-divider-padding, 0);
      height: 1px;
    }

    &_vertical {
      width: 1px;
      margin-top: var(--nav-divider-padding, 0);
      margin-bottom: var(--nav-divider-padding, 0);
    }
  }
</style>
