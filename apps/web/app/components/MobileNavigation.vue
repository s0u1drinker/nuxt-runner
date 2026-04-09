<script setup lang="ts">
  import { MOBILE_NAV_LIST } from '@constants';
  import { getPagesDataByList } from '@utils';

  const NAV_ITEMS = getPagesDataByList(MOBILE_NAV_LIST);
</script>

<template>
  <nav class="m-nav">
    <NuxtLink
      v-for="item of NAV_ITEMS"
      :to="item.path"
      class="m-nav__item"
      active-class="m-nav__item_active"
      exact-active-class="m-nav__item_active"
    >
      <VscIcon
        v-if="item.icon"
        :icon-name="item.icon"
        size="2rem"
      />
      <span class="m-nav__text">{{ item.text }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped lang="postcss">
  .m-nav {
    display: flex;
    gap: var(--indent-quarter);
    position: sticky;
    bottom: 0;
    border: var(--border) var(--color-gray-400);
    border-bottom: 0 none;
    border-radius: var(--indent-half) var(--indent-half) 0 0;
    width: 240px;
    margin: 0 auto;
    box-shadow: var(--shadow-soft);

    @media (--bp-sm) {
      width: 375px;
    }

    @media (--bp-xl) {
      display: none;
    }

    &__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: var(--indent-half);
      width: 25%;
      color: var(--color-gray-600);
      transition: color var(--transition);

      &_active {
        pointer-events: none;
        color: var(--color-error-text);

        &:hover {
          color: var(--color-error-text);
        }
      }
    }

    &__text {
      display: none;

      @media (--bp-sm) {
        display: inline-block;
      }
    }
  }
</style>
