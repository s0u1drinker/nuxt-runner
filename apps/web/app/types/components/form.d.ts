import { FORM_CLASS, FORM_LOGIN_MODIFIERS, FORM_REGISTRATION_MODIFIERS } from '@constants';
import type { TMessageType } from '@types';

export interface IFormBase {
  title?: string;
  message?: string;
  messageType?: TMessageType;
}

/** Тип сообщения в форме. */
type TFormMessageType = Exclude<TMessageType, 'default'>;
/** Класс для сообщения в форме. */
type TFormMessage = typeof FORM_CLASS.message;
type TFormMesssageClass = `${TFormMessage}_${TFormMessageType}`;
export type TFormMesssageClassArray = [TFormMessage, TFormMesssageClass?];

/** Модификаторы формы входа. */
export type TFormLoginModifier = keyof typeof FORM_LOGIN_MODIFIERS
/** Модификаторы формы регистрации. */
export type TFormRegistrationModifier = keyof typeof FORM_REGISTRATION_MODIFIERS
