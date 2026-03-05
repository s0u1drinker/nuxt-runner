import { FORM_CLASS } from '@constants';
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
