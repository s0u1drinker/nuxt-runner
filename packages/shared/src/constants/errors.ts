import { TErrorMap } from "../types";
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "./general";

export const ERRORS = {
  auth: {
    wrongId: {
      code: "AUTH_WRONG_ID",
      message: "Неверный идентификатор пользователя",
    },
    userNotFound: {
      code: "AUTH_USER_NOT_FOUND",
      message: "Пользователь не найден",
    },
    tokenGenerateError: {
      code: "AUTH_TOKEN_GENERATE_ERROR",
      message: "Сервис временно недоступен",
    },
    invalidData: {
      code: "AUTH_INVALID_DATA",
      message: "Неверный логин или пароль",
    },
    invalidRefreshToken: {
      code: "AUTH_INVALID_REFRESH_TOKEN",
      message: "Недействительный refresh-токен",
    },
    invalidDeviceId: {
      code: "AUTH_INVALID_DEVICE_ID",
      message: "Неверный идентификатор устройства",
    },
  },
  register: {
    userExist: {
      code: "REGISTER_USER_EXIST",
      message: "Пользователь с таким E-mail существует",
    },
    createError: {
      code: "REGISTER_CREATE_ERROR",
      message: "Ошибка при регистрации",
    },
  },
  field: {
    isEmpty: {
      code: "FIELD_IS_EMPTY",
      message: "Поле не должно быть пустым",
    },
    isNotString: {
      code: "FIELD_IS_NOT_STRING",
      message: "Поле должно быть строкой",
    },
    isNotEmail: {
      code: "FIELD_IS_NOT_EMAIL",
      message: "Некорректный формат электронной почты",
    },
    passwordMinLength: {
      code: "FIELD_PASSWORD_MIN_LENGTH",
      message: `Пароль должен содержать не менее ${PASSWORD_MIN_LENGTH} символов`,
    },
    passwordMaxLength: {
      code: "FIELD_PASSWORD_MAX_LENGTH",
      message: `Пароль должен содержать не более ${PASSWORD_MAX_LENGTH} символов`,
    },
  },
  token: {
    createError: {
      code: "TOKEN_CREATE_ERROR",
      message: "Ошибка при создании токена",
    },
    deleteError: {
      code: "TOKEN_DELETE_ERROR",
      message: "Ошибка при удалении токена",
    },
  },
} as const satisfies TErrorMap;
