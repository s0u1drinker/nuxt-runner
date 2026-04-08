import { PAGES, GUEST_NAV_LIST } from '@constants';

/**
 * Глобальный middleware для проверки аутентификации пользователя.
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const { isUserAuthenticated } = useAuth();
  const guestRoutes: string[] = GUEST_NAV_LIST.map((key) => PAGES[key].path);

  if (isUserAuthenticated()) {
    if (guestRoutes.includes(to.path)) {
      return navigateTo(PAGES.index.path);
    }

    return;
  }

  if (!guestRoutes.includes(to.path)) {
    return navigateTo(PAGES.login.path);
  }

  return;
});
