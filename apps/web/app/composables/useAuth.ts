import { AUTH_MESSAGE_PREFIX, PAGES, AUTH_ERROR_MAP } from '@constants';
import { FetchError } from 'ofetch';
import type { IAuthResponse, IUser } from '@types';

export function useAuth() {
  const userStore = useUserStore();
  const { getDataFromAPI, postDataFromAPI } = useApi();

  /**
   * @returns Результат проверки аутентификации пользователя.
   */
  const isUserAuthenticated = async () => {
    if (userStore.userToken && userStore.user) {
      return true;
    }

    if (userStore.userToken) {
      try {
        const user = await getDataFromAPI<IUser>('user/me');

        userStore.updateUserData(user);
        
        return true;
      } catch (error: unknown) {
        console.error(`${AUTH_MESSAGE_PREFIX} Ошибка при получении данных пользовател:`, error);
  
        return false;
      }
    }

    try {
      const responseToken = await postDataFromAPI<IAuthResponse>('auth/refresh');

      if (!responseToken.accessToken) {
        throw new Error(AUTH_ERROR_MAP.noToken);
      }

      userStore.updateUserToken(responseToken.accessToken);

      return true;
    } catch (error: unknown) {
      if (error instanceof FetchError) {
        const { statusCode } = error;

        if (statusCode === 401) {
          return false;
        }
      }

      console.error(`${AUTH_MESSAGE_PREFIX} Пользователь не авторизован:`, error);

      return false;
    }
  };

  /** Аутентификация пользователя на сайте. */
  const userLogIn = async () => {
    try {
      const responseToken = await getDataFromAPI<IAuthResponse>('auth/guest');

      if (!responseToken.accessToken) {
        throw new Error(AUTH_ERROR_MAP.noToken);
      }

      userStore.updateUserToken(responseToken.accessToken);

      const responseUserData = await getDataFromAPI<IUser>('user/me');

      if (!responseUserData || !Object.keys(responseUserData).length) {
        throw new Error(AUTH_ERROR_MAP.noData);
      }

      userStore.updateUserData(responseUserData);

      navigateTo(PAGES.index.path);
    } catch (error) {
      console.error(`${AUTH_MESSAGE_PREFIX} Аутентификация не удалась:`, error);
    }
  };

  /** Деаутентификация пользователя на сайте. */
  const userLogOut = async () => {
    await postDataFromAPI('auth/logout');
    
    userStore.updateUserToken();

    await navigateTo(PAGES.login.path);

    userStore.clearUserData();
  };

  return {
    isUserAuthenticated,
    userLogIn,
    userLogOut,
  };
}
