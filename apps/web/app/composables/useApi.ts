import { COOKIE_ITEMS } from '@constants';
import { DEVICE_PLATFORM } from 'shared';
import { getOrCreateDeviceId } from '@utils';

/** Composable для работы с REST API. */
export function useApi() {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBase;
  const apiFetch = $fetch.create({
    baseURL: apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    onRequest({ options }) {
      const authToken = useCookie(COOKIE_ITEMS.authToken);

      if (authToken.value) {
        options.headers.set('Authorization', `Bearer ${authToken.value}`);
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

  /** Реактивный GET-запрос. Оборачивает обычный запрос в useAsyncData. */
  const getAsyncDataFromAPI = <T>(url: string) => {
    return useAsyncData<T>(url, () => getDataFromAPI<T>(url));
  };

  return {
    getDataFromAPI,
    getAsyncDataFromAPI,
  };
}
