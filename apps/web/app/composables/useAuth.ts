import { COOKIE_ITEMS, AUTH_MESSAGE_PREFIX, PAGES } from '@constants';

export function useAuth() {
  const userStore = useUserStore();
  const authToken = useCookie(COOKIE_ITEMS.auth, {
    maxAge: 3 * 60 * 60,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  /**
   * @returns Результат синхронизацис данных пользователя в хранилище.
   */
  const syncUserStore = (): boolean => {
    try {
      userStore.updateUserStore();

      return true;
    } catch (error) {
      console.error(`${AUTH_MESSAGE_PREFIX} Ошибка синхронизации данных пользователя:`, error);

      return false;
    }
  };

  /**
   * @returns Результат проверки аутентификации пользователя.
   */
  const isUserAuthenticated = (): boolean => {
    if (!!useCookie(COOKIE_ITEMS.auth).value) {
      syncUserStore();

      return true;
    }

    return false;
  };

  /**
   * Аутентификация пользователя без логина и пароля (гостевой сеанс).
   * Устанавливает cookie на 3 часа.
   * @returns Результат.
   */
  const authenticateGuest = (): boolean => {
    try {
      authToken.value = new Date().toLocaleString();
      syncUserStore();

      return true;
    } catch (error) {
      console.error(`${AUTH_MESSAGE_PREFIX} Аутентификация не удалась:`, error);

      return false;
    }
  };

  /** Завершение гостевого сеанса. */
  const logoutGuest = async (): Promise<void> => {
    const authToken = useCookie(COOKIE_ITEMS.auth);
    const userStore = useUserStore();

    authToken.value = null;
    await navigateTo(PAGES.login.path);
    userStore.clearUserStore();
  };

  /**
   * Аутентификация пользователя на сайте.
   */
  const userLogIn = (): void => {
    if (authenticateGuest()) {
      navigateTo(PAGES.index.path);
    }
  };

  /**
   * Деаутентификация пользователя на сайте.
   * @returns Результат.
   */
  const userLogOut = (): void => {
    logoutGuest();
  };

  return {
    isUserAuthenticated,
    userLogIn,
    userLogOut,
  };
}
