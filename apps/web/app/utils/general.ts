import { PAGES } from '@constants';
import type {
  UnknownFunction,
  ThrottledFunction,
  ReturnTimeOut,
  TPageMainNav,
  TNavList,
} from '@types';

/**
 * Возвращает данные страниц из списка.
 * @param list Список страниц.
 * @returns Массив данных страниц.
 */
export function getPagesDataByList(list: TPageMainNav): TNavList {
  if (!Array.isArray(list) || !list.length) return [];

  return list.map((key) => PAGES[key]);
}

/** Универсальная проверка на SSR. */
export function isSSR(): boolean {
  return typeof window === 'undefined';
}

/**
 * Ограничивает частоту вызова функции.
 * @param func Функция, которую нужно ограничить.
 * @param delay Задержка в миллисекундах.
 * @returns Функции с методом 'cancel' для отмены запланированных вызовов.
 */
export function throttle<F extends UnknownFunction>(func: F, delay: number): ThrottledFunction<F> {
  let timeoutId: ReturnTimeOut | null = null;
  let lastExecTime = 0;
  let lastArgs: Parameters<F> | null = null;
  let lastThis: ThisParameterType<F> | null = null;

  /** Throttled-функция, которая будет возвращена. */
  const throttled = function (this: ThisParameterType<F>, ...args: Parameters<F>): void {
    const currentTime = Date.now();
    lastArgs = args;
    lastThis = this;

    if (currentTime - lastExecTime >= delay) {
      lastExecTime = currentTime;

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      func.apply(lastThis, lastArgs);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(
        () => {
          lastExecTime = Date.now();
          func.apply(lastThis, lastArgs || []);
          timeoutId = null;
          lastArgs = null;
          lastThis = null;
        },
        delay - (currentTime - lastExecTime),
      );
    }
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastExecTime = 0;
    lastArgs = null;
    lastThis = null;
  };

  return throttled;
}
