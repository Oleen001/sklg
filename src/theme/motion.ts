import type { Transition } from 'motion/react'

/**
 * Motion tokens — the design system's canonical animation values.
 *
 * These are the single source of truth for micro-interactions (hover, tap,
 * press) and scroll reveals. Reach for these presets instead of hand-writing
 * `y`/`scale`/spring values at call sites so motion stays consistent across the
 * app. See `.claude/rules/animation.md` for the full rules.
 *
 * Framer owns motion (transform / opacity). Color, background, border, and
 * elevation (shadow) hovers stay on Tailwind `transition-*` utilities.
 */

/** Snappy spring for interactive micro-interactions: hover lift, tap, press. */
export const springInteractive: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 34,
  mass: 0.8,
}

/** Easing curve for scroll-reveal (fade / slide-in) motion. */
export const easeReveal = [0.22, 1, 0.36, 1] as const

/** Default duration (seconds) for scroll-reveal motion. */
export const durationReveal = 0.6

/** Hover lift for cards and larger surfaces. */
export const hoverLift = { y: -4 } as const

/** Hover lift for buttons and compact controls. */
export const hoverLiftSubtle = { y: -2 } as const

/** Press feedback, applied on tap / active. */
export const tapScale = { scale: 0.97 } as const
