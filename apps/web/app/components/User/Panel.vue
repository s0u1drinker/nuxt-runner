<script setup lang="ts">
  import { POPOVER_ID } from '@constants';

  const userStore = useUserStore();
</script>

<template>
  <div class="user-panel">
    <button
      class="user-panel__button"
      aria-label="Меню пользователя"
      :popovertarget="POPOVER_ID.userMenu"
    >
      <UserAvatar />
      {{ userStore.user?.name }}
    </button>
    <UserPopover :id="POPOVER_ID.userMenu" />
  </div>
</template>

<style scoped lang="postcss">
  .user-panel {
    position: relative;

    &__button {
      background-color: transparent;
      border: 0 none;
      padding: var(--indent-half);

      @mixin hover {
        background-color: var(--color-primary-mix-transparent-10);
      }
    }
  }
</style>
