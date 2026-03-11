/** Набор функций для работы с SessionStorage. */

import { isSSR } from './general';
import { SESTO_PREFIX } from '@constants';
import type { VoidFunction } from '@types';

/**
 * Функция-обёртка для работы с SessionStorage.
 * @param func Функция, выполняющая действие с sessionStorage.
 * @param errorMessage Сообщение об ошибке для консоли.
 * @returns Результат выполнения операции.
 */
function sessionStorage<T>(func: () => T, errorMessage: string, fallbackValue: T): T {
  if (isSSR()) {
    console.warn(
      `${SESTO_PREFIX}: Попытка выполнить операцию в режиме SSR. Остановлено.`,
      func.toString(),
    );

    return fallbackValue;
  }

  try {
    return func();
  } catch (error) {
    console.error(`${SESTO_PREFIX} ${errorMessage}:`, error);

    return fallbackValue;
  }
}

/**
 * Функция-обёртка для операций: setItem, removeItem и clear.
 */
function funcWithSuccess(func: VoidFunction): () => true {
  return () => {
    func();

    return true;
  };
}

/**
 * Получает значение из SessionStorage по ключу.
 * @param key Ключ.
 * @returns Значение по ключу или null.
 */
export function getValueFromSessionStorage(key: string): string | null {
  return sessionStorage(
    () => window.sessionStorage.getItem(key),
    `Ошибка при получении ключа "${key}"`,
    null,
  );
}

/**
 * Сохраняет значение в SessionStorage.
 * @param key Ключ.
 * @param value Значение.
 * @returns Результат сохранения значения.
 */
export function setValueToSessionStorage(key: string, value: string): boolean {
  if (!key) {
    console.warn(`${SESTO_PREFIX}: Попытка сохранить значение с пустым ключом. Остановлено.`);

    return false;
  }

  return sessionStorage(
    funcWithSuccess(() => window.sessionStorage.setItem(key, value)),
    `Ошибка при сохранении ключа "${key}"`,
    false,
  );
}

/**
 * Удаляет значение из SessionStorage по ключу.
 * @param key Ключ.
 * @returns Результат удаления значения.
 */
export function removeValueFromSessionStorage(key: string): boolean {
  return sessionStorage(
    funcWithSuccess(() => window.sessionStorage.removeItem(key)),
    `Ошибка при удалении ключа "${key}"`,
    false,
  );
}

/**
 * Полная очистка SessionStorage.
 * @returns Результат очистки.
 */
export function clearSessionStorage(): boolean {
  return sessionStorage(
    funcWithSuccess(() => window.sessionStorage.clear()),
    'Ошибка при очистке хранилища',
    false,
  );
}
