/** АЛЯРМА!
 * Решения, которые можно лицезреть ниже, являются временными
 * и будут использоваться до того момента, пока у текущего разработчика-недоучки
 * (или другого Доброго Человека) не появится непреодолимое желание
 * реализовать эти функции согласно принятым стандартам.
 */

import { useCookie } from '#app';
import { COOKIE_ITEMS, AUTH_MESSAGE_PREFIX } from '@constants';

/**
 * @returns Результат проверки аутентификации пользователя.
 */
export function isUserAuthenticated(): boolean {
  return !!useCookie(COOKIE_ITEMS.auth).value;
}

/**
 * Аутентификация пользователя на сайте.
 * @returns Результат.
 */
export function userLogIn(): boolean {
  return authenticatePoliteUser();
}

/**
 * Деаутентификация пользователя на сайте.
 * @returns Результат.
 */
export function userLogOut(): void {
  logoutPoliteUser();
}

/**
 * Аутентификация пользователя без логина и пароля (гостевой сеанс).
 * Устанавливает cookie на 3 часа.
 * @returns Результат.
 */
function authenticatePoliteUser(): boolean {
  try {
    const AUTH_DATE = new Date().toLocaleString();
    const authToken = useCookie(COOKIE_ITEMS.auth, {
      maxAge: 3 * 60 * 60,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    authToken.value = AUTH_DATE;

    return true;
  } catch (error) {
    console.error(`${AUTH_MESSAGE_PREFIX} Аутентификация не удалась:`, error);

    return false;
  }
}

/** Завершение гостевого сеанса. */
function logoutPoliteUser(): void {
  const authToken = useCookie(COOKIE_ITEMS.auth);

  authToken.value = null;
}
