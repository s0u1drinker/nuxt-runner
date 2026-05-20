/**
 * Возвращает строку вида "Наименование поля: текст сообщения".
 * @param field Наименование поля.
 * @param message Текст сообщения.
 * @returns Текстовое сообщение с указанием поля.
 */
export function getFieldErrorMessage(field: string, message: string) {
  return `${field}: ${message.toLowerCase()}`;
}
