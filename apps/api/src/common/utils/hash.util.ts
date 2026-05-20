import { createHmac } from 'crypto';

/**
 * Хэширует строку с помощью алгоритма sha256
 * @param data Данные.
 * @param secret Соль.
 * @returns Хэшированные данные.
 */
export function customSha256Hash(data: string, secret: string) {
  const ALG = 'sha256';
  const DIGEST = 'hex';

  return createHmac(ALG, secret).update(data).digest(DIGEST);
}
