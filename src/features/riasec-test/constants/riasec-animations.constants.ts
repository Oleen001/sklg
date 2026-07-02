import type { TargetAndTransition, Transition } from 'motion/react'

import { RiasecQuestionAnimation } from '@/features/riasec-test/enums'

interface DecorationMotion {
  animate: TargetAndTransition
  transition: Transition
}

const loop = (duration: number): Transition => ({
  duration,
  repeat: Infinity,
  repeatType: 'mirror',
  ease: 'easeInOut',
})

// Looping framer-motion presets for the decorative artwork. Each question picks
// one (see `RiasecQuestion.animation`) so consecutive screens feel distinct.
export const decorationMotion: Record<RiasecQuestionAnimation, DecorationMotion> = {
  [RiasecQuestionAnimation.FLOAT]: {
    animate: { y: [0, -14, 0] },
    transition: loop(3.2),
  },
  [RiasecQuestionAnimation.PULSE]: {
    animate: { scale: [1, 1.08, 1] },
    transition: loop(2.4),
  },
  [RiasecQuestionAnimation.SWAY]: {
    animate: { rotate: [-5, 5, -5] },
    transition: loop(3),
  },
  [RiasecQuestionAnimation.POP]: {
    animate: { scale: [1, 1.12, 1], rotate: [0, 4, 0] },
    transition: loop(2),
  },
  [RiasecQuestionAnimation.SPIN]: {
    animate: { rotate: [0, 360] },
    transition: { duration: 9, repeat: Infinity, ease: 'linear' },
  },
  [RiasecQuestionAnimation.DRIFT]: {
    animate: { x: [-10, 10, -10], y: [0, -8, 0] },
    transition: loop(4),
  },
}

// Enter / exit transition for the question card — drives the continuous flow
// between consecutive questions (used with framer-motion `AnimatePresence`).
export const questionFlowMotion = {
  initial: { opacity: 0, x: 48 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -48 },
  transition: { duration: 0.35, ease: 'easeInOut' } as Transition,
}

// Sub-questions descend from their parent answer rather than sliding sideways —
// a "dive deeper" zoom-up that signals the follow-up is nested, not a new step.
export const subQuestionFlowMotion = {
  initial: { opacity: 0, scale: 0.9, y: 32 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: -16 },
  transition: { type: 'spring', stiffness: 280, damping: 26, mass: 0.7 } as Transition,
}
