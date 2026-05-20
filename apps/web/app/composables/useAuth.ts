import { COOKIE_ITEMS, AUTH_MESSAGE_PREFIX, PAGES, AUTH_ERROR_MAP } from '@constants';
import type { IAuthResponse } from '@types';

export function useAuth() {
  const userStore = useUserStore();
  const { getDataFromAPI, getAsyncDataFromAPI } = useApi();
  const authToken = useCookie(COOKIE_ITEMS.authToken, {
    maxAge: 3 * 60 * 60,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  /**
   * @returns Результат проверки аутентификации пользователя.
   */
  const isUserAuthenticated = () => {
    if (!!useCookie(COOKIE_ITEMS.authToken).value) {
      return true;
    }

    return false;
  };

  /** Аутентификация пользователя на сайте. */
  const userLogIn = async () => {
    try {
      const response = await getDataFromAPI<IAuthResponse>('auth/guest');

      if (!response.token) {
        throw new Error(AUTH_ERROR_MAP.noToken);
      }

      if (!response.userData || !Object.keys(response.userData).length) {
        throw new Error(AUTH_ERROR_MAP.noData);
      }

      authToken.value = response.token;
      userStore.updateUserData(response.userData);

      navigateTo(PAGES.index.path);
    } catch (error) {
      console.error(`${AUTH_MESSAGE_PREFIX} Аутентификация не удалась:`, error);
    }
  };

  /** Деаутентификация пользователя на сайте. */
  const userLogOut = async () => {
    authToken.value = null;

    await navigateTo(PAGES.login.path);

    userStore.clearUserData();
  };

  return {
    isUserAuthenticated,
    userLogIn,
    userLogOut,
  };
}
