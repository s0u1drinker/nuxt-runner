import { gsap } from 'gsap';

export default defineNuxtPlugin(() => {
  gsap.defaults({
    overwrite: 'auto',
  });

  return {
    provide: {
      gsap,
    },
  };
});
