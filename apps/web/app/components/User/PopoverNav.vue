<script setup lang="ts">
  import { PAGES, MESSAGE_MAP } from '@constants';

  const { userLogOut } = useAuth();

  const emit = defineEmits<{
    (e: 'close'): void;
  }>();

  const handleNavClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const navigationLink = target.closest('a, button');

    if (!navigationLink) return;

    emit('close');
  };
</script>

<template>
  <nav
    class="user-navigation"
    aria-label="Меню пользователя"
    @click="handleNavClick"
  >
    <NavDivider />
    <ul
      class="user-navigation__list"
      role="list"
    >
      <li class="user-navigation__item">
        <NuxtLink
          :to="PAGES.settings.path"
          class="user-navigation__link"
          active-class="user-navigation__link_active"
          exact-active-class="user-navigation__link_active"
        >
          <VscIcon :icon-name="PAGES.settings.icon" />
          {{ PAGES.settings.text }}
        </NuxtLink>
      </li>
      <li class="user-navigation__item">
        <button
          class="user-navigation__link"
          @click="userLogOut"
        >
          <VscIcon icon-name="mdi:exit-to-app" />
          {{ MESSAGE_MAP.items.exit }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="postcss">
  .user-navigation {
    --nav-divider-padding: 1rem;

    button {
      border: 0 none;
      background-color: transparent;
      justify-content: flex-start;
    }

    &__item {
      display: flex;
    }

    &__link {
      color: var(--color-text);
      display: inline-flex;
      align-items: center;
      gap: var(--indent-half);
      border-radius: var(--border-radius);
      padding: var(--indent-half) var(--indent);
      line-height: 1.5;
      transition: background-color var(--transition);
      user-select: none;
      width: 100%;

      &:hover {
        color: var(--color-text);
        background-color: var(--color-gray-400);
      }

      &:active {
        transform: none;
        box-shadow: var(--shadow-active-button);
        background-color: var(--color-gray-400);
      }

      &_active {
        color: var(--color-error-text);
        pointer-events: none;
      }
    }
  }
</style>
