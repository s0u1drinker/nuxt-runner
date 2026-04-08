import type { TPage } from '@types';

export interface INavItem<T extends TPage> {
  path: T extends 'index' ? '/' : `/${T}`;
  text: string;
}

export type TNavList = INavItem<TPage>[];
