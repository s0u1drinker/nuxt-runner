export default defineNuxtConfig({
  compatibilityDate: '2026-02-09',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt'],
  postcss: {
    plugins: {
      '@csstools/postcss-global-data': {
        files: ['./app/assets/styles/media.postcss'],
      },
      'postcss-custom-media': {},
      'postcss-nested': {},
      autoprefixer: {},
    },
  },
  imports: {
    dirs: ['app/stores'],
  },
  srcDir: 'app/',
  css: [
    '~/assets/styles/main.css',
  ],
});
