import { PAGE_PATH } from '~/constants'

/**
 * Глобальный middleware для проверки аутентификации пользователя.
 * Редиректит неавторизованных пользователей на страницу логина,
 * а авторизованных пользователей со страницы логина на главную.
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const isUserAuth = isAuthenticated();

  // Если пользователь авторизован и пытается зайти на страницу логина.
  if (isUserAuth && to.path === PAGE_PATH.login) {
    return navigateTo(PAGE_PATH.index);
  }

  // Если пользователь не авторизован и не на странице логина.
  if (!isUserAuth && to.path !== PAGE_PATH.login) {
    return navigateTo(PAGE_PATH.login);
  }
});
