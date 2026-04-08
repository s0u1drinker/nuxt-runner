import type { TPageData, TPageMainNav, TPageGuest } from '@types';

/** Список страниц приложения. */
export const PAGE_LIST = [
  'index',
  'login',
  'signup',
  'data',
  'stat',
  'settings',
  'profile',
] as const;

/** Данные страниц. */
export const PAGES = {
  index: {
    path: '/',
    text: 'Главная',
  },
  login: {
    path: '/login',
    text: 'Войти',
  },
  signup: {
    path: '/signup',
    text: 'Регистрация',
  },
  data: {
    path: '/data',
    text: 'Тренировки',
  },
  stat: {
    path: '/stat',
    text: 'Статистика',
  },
  settings: {
    path: '/settings',
    text: 'Настройки',
  },
  profile: {
    path: '/profile',
    text: 'Профиль',
  },
} as const satisfies TPageData;

export const GUEST_NAV_LIST: TPageGuest = ['login', 'signup'] as const;

/** Список страниц для навигации в шапке. */
export const MAIN_NAV_LIST: TPageMainNav = ['index', 'data', 'stat'] as const;

/** Шаблон. */
export const LAYOUT = {
  auth: 'auth',
  default: 'default',
} as const;

/** Базовый путь к изображениям. */
export const PATH_IMAGE_BASE = '/img/bg/';

/** Путь к изображениям для страницы входа. */
export const PATH_IMAGE_AUTH = `${PATH_IMAGE_BASE}${LAYOUT.auth}/` as const;

/** Расширение файла. */
export const EXTENSION = {
  webp: 'webp',
} as const;
