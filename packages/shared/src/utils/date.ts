const UTIL_PATH = "shared/utils/";

/**
 * Проверяет, является ли вторая дата более поздней, чем первая.
 *
 * @param baseDate - Базовая дата.
 * @param targetDate - Проверяемая дата.
 * @returns true, если targetDate позже baseDate, иначе false.
 */
export function isDateLater(
  baseDate: string | Date,
  targetDate: string | Date,
): boolean {
  const time1 = new Date(baseDate).getTime();
  const time2 = new Date(targetDate).getTime();

  if (Number.isNaN(time1) || Number.isNaN(time2)) {
    console.warn(
      `[${UTIL_PATH}isDateLater] Переданы невалидные даты: ${time1}, ${time2}`,
    );

    return false;
  }

  return time2 > time1;
}

export function calculateNewDate(date: Date | string = new Date()) {
  const time = new Date(date).getTime();

  if (Number.isNaN(time)) {
    console.warn(
      `[${UTIL_PATH}calculateNewDate] Передан неверный формат даты: ${date}`,
    );

    return null;
  }

  return {
    plusDays(daysCount: number) {
      const daysInMs = daysCount * 24 * 60 * 60 * 1000;

      return new Date(time + daysInMs);
    },
  };
}
