import { PAGE_PATH } from '@constants';

/**
 * Глобальный middleware для проверки аутентификации пользователя.
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const isUserAuth = isUserAuthenticated();
  const guestRoutes: string[] = [PAGE_PATH.login, PAGE_PATH.signup];

  if (isUserAuth) {
    if (guestRoutes.includes(to.path)) {
      return navigateTo(PAGE_PATH.index);
    }

    return;
  }

  if (!guestRoutes.includes(to.path)) {
    return navigateTo(PAGE_PATH.login);
  }

  return;
});
