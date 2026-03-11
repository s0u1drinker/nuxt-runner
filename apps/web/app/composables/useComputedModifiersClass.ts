import type { TClassModifierMap } from '@types';

export function useComputedModifiersClass<B extends string, M extends readonly string[]>(
  baseClass: B,
  modifiers: M,
): TClassModifierMap<B, M> {
  const classes = {} as TClassModifierMap<B, M>;

  if (!baseClass) {
    return classes;
  }

  if (modifiers?.length) {
    for (const modifier of modifiers) {
      classes[`${baseClass}_${modifier}`] = true;
    }
  }

  return {
    [baseClass]: true,
    ...classes,
  };
}
