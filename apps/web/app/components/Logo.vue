<script setup lang="ts"></script>

<template>
  <NuxtLink
    to="https://github.com/s0u1drinker/nuxt-runner"
    class="logo"
  >
    <VscIcon
      class="logo__icon"
      icon-name="public:nuxt"
      size="1.5rem"
    />
    <span class="logo__text">Nuxt Runner</span>
  </NuxtLink>
</template>

<style scoped lang="postcss">
  .logo {
    --transition-time: 0.35s;
    --focus-color: var(--color-warning);

    display: flex;
    color: var(--color-text);
    align-items: center;
    gap: var(--indent-half);
    font-weight: bold;
    padding: var(--indent-quarter);
    border-radius: var(--border-radius);

    @mixin focus {
    }

    &:hover {
      color: var(--color-text);

      .logo__icon {
        transform: rotate(1turn);
      }

      .logo__text::after {
        transform: translateX(0);
      }
    }

    &__icon {
      transition: transform var(--transition-time) ease-out;
    }

    &__text {
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        display: block;
        background-color: var(--color-error-text);
        width: 100%;
        height: 2px;
        left: 0;
        bottom: 0;
        transform: translateX(-100%);
        transition: transform var(--transition) var(--transition-time);
      }
    }
  }
</style>
