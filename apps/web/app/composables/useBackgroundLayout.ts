import { useDevice } from '#imports';
import {
  BG_AUTH,
  DEVICE,
  GRADIENTS,
  DEVICE_BREAKPOINTS,
  FALLBACK_COLOR,
  LISTENER,
  DELAY,
} from '~/constants';
import { getRandomNumberFromOneTo, throttle } from '~/utils';
import type { TDevice } from '~/types';

/**
 * Возвращает реактивное значение фона для страницы.
 * Определяет тип устройства и выбирает случайное фоновое изображение или градиент.
 * @returns Градиент или url картинки.
 */
export function useBackgroundLayout(): Ref<string> {
  const device = useDevice();
  const bgMap = useState<Map<TDevice, string>>('bgMap', () => new Map());
  const background = ref<string>('');

  /**
   * Определение типа устройства по ширине.
   * @param width Ширина окна браузера.
   * @returns Тип устройства.
   */
  const getDeviceTypeByWidth = (width: number): TDevice => {
    if (width < DEVICE_BREAKPOINTS.tablet) return DEVICE.mobile;
    if (width < DEVICE_BREAKPOINTS.desktop) return DEVICE.tablet;
    return DEVICE.desktop;
  };

  /** Формирование кэша с фоном. */
  const generateBgMap = () => {
    const DESKTOP_IMAGES_COUNT = BG_AUTH[DEVICE.desktop].length;
    const TABLET_IMAGES_COUNT = BG_AUTH[DEVICE.tablet].length;
    const GRADIENTS_COUNT = GRADIENTS.length;
    let backgroundValue: string = FALLBACK_COLOR;

    // Сначала выбираем градиент.
    if (GRADIENTS_COUNT) {
      const randomNumber = getRandomNumberFromOneTo(GRADIENTS_COUNT);

      if (randomNumber) {
        backgroundValue = GRADIENTS[randomNumber - 1] ?? backgroundValue;
      }
    }

    bgMap.value.set(DEVICE.mobile, backgroundValue);

    // Теперь выбираем изображение.
    if (DESKTOP_IMAGES_COUNT && TABLET_IMAGES_COUNT) {
      const MINIMAL_COUNT = Math.min(DESKTOP_IMAGES_COUNT, TABLET_IMAGES_COUNT);
      const randomNumber = getRandomNumberFromOneTo(MINIMAL_COUNT);

      if (randomNumber) {
        const ITEM_INDEX = randomNumber - 1;

        for (const device of [DEVICE.desktop, DEVICE.tablet]) {
          const IMAGE = BG_AUTH[device][ITEM_INDEX];
          const IMAGE_URL = IMAGE ? `url('${IMAGE}')` : backgroundValue;

          bgMap.value.set(device, IMAGE_URL);
        }

        return;
      }
    }

    bgMap.value.set(DEVICE.desktop, backgroundValue);
    bgMap.value.set(DEVICE.tablet, backgroundValue);
  };

  if (bgMap.value.size === 0) {
    generateBgMap();
  }

  if (import.meta.client) {
    const handleResize = throttle(() => {
      const width = window.innerWidth;
      const deviceType = getDeviceTypeByWidth(width);

      background.value = bgMap.value.get(deviceType) || FALLBACK_COLOR;
    }, DELAY.resize);

    onMounted(() => {
      handleResize();
      window.addEventListener(LISTENER.resize, handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener(LISTENER.resize, handleResize);
      handleResize.cancel();
    });
  }

  return background;
}
