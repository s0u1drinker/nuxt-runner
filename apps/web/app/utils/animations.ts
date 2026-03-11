import { gsap } from 'gsap';
import type { TAnimationMap } from '@types';

export const animations: TAnimationMap = {
  /** Анимация появления. */
  fadeIn: (elem, params) => {
    gsap.fromTo(
      elem,
      { opacity: 0 },
      {
        opacity: 1,
        ...params,
      },
    );
  },
  /** Анимация исчезновения. */
  fadeOut: (elem, params) => {
    gsap.fromTo(
      elem,
      { opacity: 1 },
      {
        opacity: 0,
        ...params,
      },
    );
  },
};
