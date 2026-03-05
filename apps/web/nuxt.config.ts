import { fileURLToPath } from 'url';

export default defineNuxtConfig({
  compatibilityDate: '2026-02-09',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxtjs/device', 'nuxt-spartan-components'],
  postcss: {
    plugins: {
      '@csstools/postcss-global-data': {
        files: ['./app/assets/styles/media.postcss'],
      },
      'postcss-custom-media': {},
      'postcss-mixins': {
        mixinsFiles: ['./app/assets/styles/mixins.css'],
      },
      'postcss-nested': {},
      autoprefixer: {},
    },
  },
  imports: {
    dirs: ['app/stores'],
  },
  srcDir: 'app/',
  alias: {
    '@components': fileURLToPath(new URL('./app/components', import.meta.url)),
    '@constants': fileURLToPath(new URL('./app/constants', import.meta.url)),
    '@types': fileURLToPath(new URL('./app/types', import.meta.url)),
  },
  css: ['~/assets/styles/main.css'],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
});
