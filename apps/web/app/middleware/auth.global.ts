import { PAGES, GUEST_NAV_LIST } from '@constants';

/**
 * Глобальный middleware для проверки аутентификации пользователя.
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) {
    return;
  }

  const { isUserAuthenticated } = useAuth();
  const guestRoutes: string[] = GUEST_NAV_LIST.map((key) => PAGES[key].path);

  if (await isUserAuthenticated()) {
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
