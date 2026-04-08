<script setup lang="ts">
  import type { IPopover } from '@types';

  const props = defineProps<IPopover>();

  const popoverRef = ref<HTMLElement | null>(null);

  const closePopover = () => {
    console.log();
    if (popoverRef.value) {
      popoverRef.value.hidePopover();
    }
  };
</script>

<template>
  <div
    ref="popoverRef"
    class="user-popover"
    :id="props.id"
    popover
  >
    <div class="user-popover__inner">
      <UserPopoverInfo @close="closePopover" />
      <UserPopoverNav @close="closePopover" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
  .user-popover {
    padding: var(--indent-half);
    border: 0 none;
    box-shadow: var(--shadow-sm);
    border-radius: var(--border-radius);
    margin: 0;
    width: 20rem;
    inset: unset;
    opacity: 0;
    transition:
      opacity 0.3s,
      display 0.3s;
    transition-behavior: allow-discrete;
    top: var(--indent);
    right: var(--indent);
    will-change: opacity;

    &:popover-open {
      opacity: 1;
    }

    &__inner {
      display: flex;
      flex-direction: column;
    }
  }

  @starting-style {
    .user-popover:popover-open {
      opacity: 0;
    }
  }
</style>
