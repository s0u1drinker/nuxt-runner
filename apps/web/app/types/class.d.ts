export type TClassModifier<B extends string, M extends readonly string[]> = `${B}_${M[number]}`;

export type TClassModifierMap<B extends string, M extends readonly string[]> = Record<B | TClassModifier<B, M>, boolean>;
