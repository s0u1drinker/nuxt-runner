import type { CamelCaseToSnakeCase } from "./utils";

type TErrorKeys = {
  auth:
    | "wrongId"
    | "userNotFound"
    | "tokenGenerateError"
    | "invalidData"
    | "invalidRefreshToken"
    | "invalidDeviceId";
  register: "userExist" | "createError";
  field:
    | "isEmpty"
    | "isNotString"
    | "isNotEmail"
    | "passwordMinLength"
    | "passwordMaxLength";
  token: "createError" | "deleteError";
};

export type TErrorMap = {
  [T1 in keyof TErrorKeys]: {
    [T2 in TErrorKeys[T1]]: {
      code: `${Uppercase<T1>}_${Uppercase<CamelCaseToSnakeCase<T2>>}`;
      message: `${any}${string}`;
    };
  };
};
