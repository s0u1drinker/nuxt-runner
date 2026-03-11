import { ANIMATION_LIST } from '@constants';
import type { VoidFunction } from '@types';

/** Названия анимаций. */
export type TAnimationName = (typeof ANIMATION_LIST)[number];

/** Список анимаций с функциями. */
export type TAnimationMap = Record<TAnimationName, TAnimationGSAP>;

/** Параметры анимации для вызова в composable. */
export interface TAnimationComposableParams {
  duration?: number;
  ease?: string;
  onComplete?: VoidFunction;
}

/** Функция анимации, в которой вызывается GSAP. */
export type TAnimationGSAP = (elem: gsap.TweenTarget, params: gsap.TweenVars) => void;

/** Параметры вызова функции анимации в composable. */
export type TAnimationComposable = (
  elem: gsap.TweenTarget,
  callParams?: TAnimationComposableParams,
) => void;

/** Возвращаемое значение composable. */
export type TUseAnimationGSAP = Record<TAnimationName, TAnimationComposable>;
