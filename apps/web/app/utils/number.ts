/**
 * Возвращает случайное значение от 1 до переданного.
 * В случае ошибки возвращает null.
 * @param max Максимальное значение.
 * @returns Случайное значение или null.
 */
export function getRandomNumberFromOneTo(max: number): number | null {
  const MIN = 1;

  if (typeof max !== 'number' || max < MIN) {
    console.error(`getRandomNumber: передано неверное значение (${max}).`);

    return null;
  }

  return Math.floor(Math.random() * (max - MIN + 1)) + MIN;
}
