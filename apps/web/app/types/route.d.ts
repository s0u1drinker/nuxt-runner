import { LAYOUT, PAGE_LIST } from '@constants';
import type { TDesktopAuthImagePath, TTabletAuthImagePath, INavItem } from '@types';

type TGuest = 'login' | 'signup';

export type TPage = (typeof PAGE_LIST)[number];
export type TPageGuest = Array<Extract<TPage, TGuest>>;
export type TPageMainNav = Array<Exclude<TPage, TGuest>>;
export type TPageData = {
  [K in TPage]: INavItem<K>;
};

/** Тип шаблона страницы. */
export type TLayouts = keyof typeof LAYOUT;

/** Типы изображений для страница входа. */
export type TImagesAuth = {
  desktop: TDesktopAuthImagePath[];
  tablet: TTabletAuthImagePath[];
};
