import type { UnknownFunction, ThrottledFunction, ReturnTimeOut } from '~/types';

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
