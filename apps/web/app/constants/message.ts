export const MESSAGE_TYPE = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  default: 'default',
} as const;

export const MESSAGE_MAP = {
  notWorking: {
    yet: 'Пока не работает',
    notReady: 'Пока не готово',
  },
  mem: {
    fiasco: 'Это фиаско, братан!',
  },
};
