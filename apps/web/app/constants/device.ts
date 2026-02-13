/** Тип устройства. */
export const DEVICE = {
  desktop: 'desktop',
  tablet: 'tablet',
  mobile: 'mobile',
} as const;

/** Breakpoints для определения устройства. */
export const DEVICE_BREAKPOINTS = {
  desktop: 1280,
  tablet: 768,
} as const;
