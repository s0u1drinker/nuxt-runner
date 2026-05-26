import { DEVICE_PLATFORM } from 'shared';
import { getOrCreateDeviceId } from '@utils';

/** Composable для работы с REST API. */
export function useApi() {
  const userStore = useUserStore();
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBase;
  const apiFetch = $fetch.create({
    baseURL: apiBaseUrl,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    onRequest({ options }) {
      const authToken = userStore.userToken;

      if (authToken) {
        options.headers.set('Authorization', `Bearer ${authToken}`);
      }

      const deviceId = getOrCreateDeviceId();

      if (deviceId) {
        options.headers.set('X-Device-Id', deviceId);
        options.headers.set('X-Device-Platform', DEVICE_PLATFORM.web);
      }
    },
  });

  /** Обычный GET-запрос. Возвращает Promise с данными. */
  const getDataFromAPI = <T>(url: string) => {
    return apiFetch<T>(url, { method: 'GET' });
  };

  /** Обычный POST-запрос. Возвращает Promise с данными. */
  const postDataFromAPI = <T>(url: string) => {
    return apiFetch<T>(url, { method: 'POST' });
  };

  /** Реактивный GET-запрос. Оборачивает обычный запрос в useAsyncData. */
  const getAsyncDataFromAPI = <T>(url: string) => {
    return useAsyncData<T>(url, () => getDataFromAPI<T>(url));
  };

  return {
    getDataFromAPI,
    postDataFromAPI,
    getAsyncDataFromAPI,
  };
}
