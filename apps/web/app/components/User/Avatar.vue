<script setup lang="ts">
  const userStore = useUserStore();

  const { size = 'sm' } = defineProps<{ size?: 'sm' | 'md' | 'lg' }>();
</script>

<template>
  <div
    class="user-avatar"
    :class="{ [`user-avatar_${size}`]: true }"
    aria-hidden="true"
  >
    <img
      v-if="userStore.user?.avatar"
      class="user-avatar__img"
      :src="userStore.user?.avatar"
      alt=""
    />
    <span
      class="user-avatar__text"
      v-else
    >
      {{ userStore.initialsForAvatar }}
    </span>
  </div>
</template>

<style scoped lang="postcss">
  .user-avatar {
    display: grid;
    place-items: center;
    background-color: var(--color-primary-mix-transparent-20);
    border-radius: var(--radius-full);
    overflow: hidden;
    padding: 0;
    color: var(--color-primary);
    text-transform: uppercase;
    font-weight: 700;

    &_sm {
      width: 2.5rem;
      height: 2.5rem;
      --font-size: 0.875rem;
    }

    &_md {
      width: 3.5rem;
      height: 3.5rem;
      --font-size: 1.5rem;
    }

    &_lg {
      width: 5rem;
      height: 5rem;
      --font-size: 2.25rem;
    }

    &__text {
      font-size: var(--font-size);
      line-height: 1;
      letter-spacing: 0.02em;
    }
  }
</style>
