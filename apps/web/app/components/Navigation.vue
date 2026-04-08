<script setup lang="ts">
  import { PAGES, MAIN_NAV_LIST } from '@constants';
  import type { TNavList } from '@types';

  const NAV_ITEMS: TNavList = MAIN_NAV_LIST.map((key) => PAGES[key]);
</script>

<template>
  <nav
    class="navigation"
    aria-label="Основная навигация"
  >
    <ul
      class="navigation__list"
      role="list"
    >
      <li
        class="navigation__item"
        v-for="{ path, text } of NAV_ITEMS"
        :key="`header-link-${path.slice(1)}`"
      >
        <NuxtLink
          class="navigation__link"
          active-class="navigation__link_active"
          exact-active-class="navigation__link_active"
          :to="path"
          >{{ text }}</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="postcss">
  .navigation {
    --focus-color: var(--color-warning);

    &__list {
      display: flex;
      justify-content: center;
      gap: var(--indent-double);
    }

    &__item {
      display: flex;
    }

    &__link {
      --link-padding: var(--indent-quarter);

      color: var(--color-text);
      padding: var(--link-padding);
      position: relative;
      border-radius: var(--border-radius);

      @mixin focus {
      }

      &:not(.navigation__link_active) {
        &::after {
          content: '';
          left: var(--link-padding);
          right: var(--link-padding);
          bottom: 0;
          display: block;
          height: 2px;
          position: absolute;
          background-color: var(--color-error-text);
          opacity: 0;
          transform-origin: center;
          transition: opacity var(--transition);
        }

        @mixin hover {
          color: var(--color-text);

          &::after {
            opacity: 1;
          }
        }
      }

      &_active {
        color: var(--color-error-text);
        pointer-events: none;
      }
    }
  }
</style>
