import { PATH_IMAGE_AUTH, EXTENSION } from '~/constants';
import type { TImagesAuth } from '~/types';

/** Цвет фона по умолчанию. */
export const FALLBACK_COLOR = 'var(--white)';

/** Список изображений для страница входа. */
export const BG_AUTH: TImagesAuth = {
  desktop: [
    `${PATH_IMAGE_AUTH}desktop/1.${EXTENSION.webp}`,
    `${PATH_IMAGE_AUTH}desktop/2.${EXTENSION.webp}`,
    `${PATH_IMAGE_AUTH}desktop/3.${EXTENSION.webp}`,
  ],
  tablet: [
    `${PATH_IMAGE_AUTH}tablet/1.${EXTENSION.webp}`,
    `${PATH_IMAGE_AUTH}tablet/2.${EXTENSION.webp}`,
    `${PATH_IMAGE_AUTH}tablet/3.${EXTENSION.webp}`,
  ],
};

/** Список градиентов. */
export const GRADIENTS = [
  'linear-gradient(90deg, #f598a8, #f6edb2)',
  'linear-gradient(90deg, #cfecd0, #a0cea7, #9ec0db)',
  'linear-gradient(90deg, #b9deed, #efefef)',
  'linear-gradient(90deg, #aea4e3, #d3ffe8)',
  'linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%)',
];
