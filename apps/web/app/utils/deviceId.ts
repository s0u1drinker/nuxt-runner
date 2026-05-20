import { LOSTO_DEVICE_ID_KEY } from "~/constants";

/**
 * Возвращает идентификатор устройства из localStorage.
 * Если его там нет, то генерирует и сохраняет.
 * @returns Идентификатор устройства (deviceId).
 */
export function getOrCreateDeviceId(): string {
  if (!import.meta.client) return '';

  let id = localStorage.getItem(LOSTO_DEVICE_ID_KEY);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(LOSTO_DEVICE_ID_KEY, id);
  }

  return id;
}