/**
 * Рекурсивный тип для перевода строки из camelCase в snake_case.
 */
export type CamelCaseToSnakeCase<S extends string> =
  S extends `${infer First}${infer Rest}`
    ? Rest extends ""
      ? First
      : Rest extends Capitalize<Rest>
        ? `${First}_${CamelCaseToSnakeCase<Rest>}`
        : `${First}${CamelCaseToSnakeCase<Rest>}`
    : S;
