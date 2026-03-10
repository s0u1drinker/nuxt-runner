import { animations } from '@utils';
import { ANIMATION_DURATION, ANIMATION_EASE } from '@constants';
import type { TUseAnimationGSAP, TAnimationComposableParams } from '@types';

export function useAnimationGSAP(): TUseAnimationGSAP {
  const defaults: TAnimationComposableParams = {
    duration: ANIMATION_DURATION,
    ease: ANIMATION_EASE,
  };

  return {
    /** Анимация появления. */
    fadeIn: (elem, callParams = {}) => {
      return animations.fadeIn(elem, {
        ...defaults,
        ...callParams,
      });
    },
    /** Анимация исчезновения. */
    fadeOut: (elem, callParams = {}) => {
      return animations.fadeOut(elem, {
        ...defaults,
        ...callParams,
      });
    },
  };
}
