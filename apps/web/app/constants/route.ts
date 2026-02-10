export const PAGE = {
  index: 'index',
  login: 'login',
  dashboard: 'dashboard',
} as const;

export const PAGE_PATH = {
  index: `/${PAGE.index}`,
  login: `/${PAGE.login}`,
  dashboard: `/${PAGE.dashboard}`,
} as const;
