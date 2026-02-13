import { LAYOUT } from '~/constants';
import type { TDesktopAuthImagePath, TTabletAuthImagePath } from '~/types';

/** Тип шаблона страницы. */
export type TLayouts = keyof typeof LAYOUT;

/** Типы изображений для страница входа. */
export type TImagesAuth = {
  desktop: TDesktopAuthImagePath[];
  tablet: TTabletAuthImagePath[];
};
