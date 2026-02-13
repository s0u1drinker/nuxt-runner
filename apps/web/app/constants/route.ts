/** Страница. */
export const PAGE = {
  index: 'index',
  login: 'login',
  dashboard: 'dashboard',
} as const;

/** Путь к странице. */
export const PAGE_PATH = {
  index: `/${PAGE.index}`,
  login: `/${PAGE.login}`,
  dashboard: `/${PAGE.dashboard}`,
} as const;

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
