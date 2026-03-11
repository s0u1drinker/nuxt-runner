/** Идентификатор setTimeout. */
export type ReturnTimeOut = ReturnType<typeof setTimeout>;

/** Тип для функции, о которой ничего не известно. */
export type UnknownFunction = (...args: unknown[]) => unknown;

/** Тип для функции, которая ничего не возвращает. */
export type VoidFunction = () => void;

/** Тип для void-функции с this. */
export type ThisVoidFunction<F extends UnknownFunction> = (
  this: ThisParameterType<F>,
  ...args: Parameters<F>
) => void;

/**
 * Тип для функции, возвращаемой утилитой 'throttle'.
 *
 * @template F Тип оригинальной функции.
 */
export type ThrottledFunction<F extends UnknownFunction> = ThisVoidFunction<F> & {
  cancel: VoidFunction;
};
