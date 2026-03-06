export const FORM_TITLE = {
  login: 'Вход',
  registration: 'Регистрация',
} as const;

export const FORM_CLASS = {
  message: 'form__message',
} as const;

// Форма входа.
const FORM_LOGIN_BASE_CLASS = 'form-login';

export const FORM_LOGIN_CLASS = {
  base: FORM_LOGIN_BASE_CLASS,
  hide: `${FORM_LOGIN_BASE_CLASS}_hide`,
  form: `${FORM_LOGIN_BASE_CLASS}__form`,
  item: `${FORM_LOGIN_BASE_CLASS}__item`,
  buttonReminder: `${FORM_LOGIN_BASE_CLASS}__button-reminder`,
} as const;

// Форма регистрации.
const FORM_REGISTRATION_BASE_CLASS = 'form-registration';

export const FORM_REGISTRATION_BASE_CLASS_SELECTOR = `.${FORM_REGISTRATION_BASE_CLASS}`;

export const FORM_REGISTRATION_CLASS = {
  base: FORM_REGISTRATION_BASE_CLASS,
  hide: `${FORM_REGISTRATION_BASE_CLASS}_hide`,
  item: `${FORM_REGISTRATION_BASE_CLASS}__item`,
  buttons: `${FORM_REGISTRATION_BASE_CLASS}__buttons`,
} as const;
