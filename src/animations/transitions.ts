import type { Transition } from 'motion/react';

export const easeOutCustom = [0.25, 0.46, 0.45, 0.94] as const;

export const transitionFast: Transition = {
  duration: 0.15,
  ease: 'easeOut',
};

export const transitionNormal: Transition = {
  duration: 0.3,
  ease: easeOutCustom,
};

export const transitionSlow: Transition = {
  duration: 0.6,
  ease: easeOutCustom,
};

export const transitionSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};
