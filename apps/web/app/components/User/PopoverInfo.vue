<script setup lang="ts">
  import { MESSAGE_MAP, PAGES } from '@constants';

  const userStore = useUserStore();
  const route = useRoute();

  const emit = defineEmits<{
    (e: 'close'): void;
  }>();
</script>

<template>
  <div class="user-popover-info">
    <UserAvatar size="md" />
    <div class="user-popover-info__name-wrapper">
      <span class="user-popover-info__username">{{ userStore.user?.name }}</span>
      <NuxtLink
        v-if="route.path !== PAGES.profile.path"
        class="user-popover-info__link"
        :to="PAGES.profile.path"
        @click="emit('close')"
      >
        <VscIcon icon-name="mdi:edit" />
        {{ MESSAGE_MAP.items.edit }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  .user-popover-info {
    display: flex;
    align-items: center;
    gap: var(--indent);
    padding: var(--indent);

    &__name-wrapper {
      display: flex;
      flex-direction: column;
    }

    &__username {
      font-weight: 600;
    }

    &__link {
      display: flex;
      align-items: center;
      gap: var(--indent-quarter);
      font-size: 0.875rem;
    }
  }
</style>
