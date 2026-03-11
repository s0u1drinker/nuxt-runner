export const FORM_TITLE = {
  login: 'Вход',
  registration: 'Регистрация',
} as const;

export const FORM_CLASS = {
  message: 'form__message',
} as const;

// Форма входа.
export const FORM_LOGIN_BASE_CLASS = 'form-login';

export const FORM_LOGIN_MODIFIERS = {
  hide: 'hide',
} as const;

export const FORM_LOGIN_EL_CLASS = {
  form: `${FORM_LOGIN_BASE_CLASS}__form`,
  item: `${FORM_LOGIN_BASE_CLASS}__item`,
  buttonReminder: `${FORM_LOGIN_BASE_CLASS}__button-reminder`,
} as const;

// Форма регистрации.
export const FORM_REGISTRATION_BASE_CLASS = 'form-registration';

export const FORM_REGISTRATION_MODIFIERS = {
  hide: 'hide',
} as const;

export const FORM_REGISTRATION_EL_CLASS = {
  item: `${FORM_REGISTRATION_BASE_CLASS}__item`,
  buttons: `${FORM_REGISTRATION_BASE_CLASS}__buttons`,
} as const;
