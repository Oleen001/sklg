'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Children, type ReactNode } from 'react'

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom'

const OFFSET = 28
const EASE = [0.22, 1, 0.36, 1] as const

function hiddenState(variant: RevealVariant) {
  switch (variant) {
    case 'up':
      return { opacity: 0, y: OFFSET }
    case 'down':
      return { opacity: 0, y: -OFFSET }
    case 'left':
      return { opacity: 0, x: -OFFSET }
    case 'right':
      return { opacity: 0, x: OFFSET }
    case 'zoom':
      return { opacity: 0, scale: 0.92 }
    case 'fade':
    default:
      return { opacity: 0 }
  }
}

const VISIBLE = { opacity: 1, x: 0, y: 0, scale: 1 } as const

/**
 * The journey connector measures `[data-journey-node]` anchor positions once and
 * re-measures on resize. A reveal that translates a section settles its anchors
 * into a new position without changing the wrapper's box size, so we nudge the
 * connector to re-measure when the animation finishes.
 */
function notifyJourneyRemeasure() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('journey:remeasure'))
  }
}

interface RevealProps {
  id?: string
  className?: string
  /** Direction/style the content enters with. Defaults to `up`. */
  variant?: RevealVariant
  /** Seconds to wait before animating in. */
  delay?: number
  /** Animation duration in seconds. */
  duration?: number
  /** Replay every time it scrolls into view when `false` (default). Set `true` to animate only once. */
  once?: boolean
  /** Fraction of the element that must be visible to trigger (0–1). */
  amount?: number
  children: ReactNode
}

/**
 * Scroll-triggered reveal wrapper. Renders a `motion.div` that fades/slides its
 * children into view every time they enter the viewport (re-animates on each
 * scroll-in by default; pass `once` to animate only the first time). Respects the
 * user's reduced-motion preference by rendering the content statically.
 */
export function Reveal({
  id,
  className,
  variant = 'up',
  delay = 0,
  duration = 0.6,
  once = false,
  amount = 0.25,
  children,
}: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    )
  }

  const variants: Variants = {
    hidden: hiddenState(variant),
    visible: { ...VISIBLE, transition: { duration, delay, ease: EASE } },
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      onAnimationComplete={notifyJourneyRemeasure}
    >
      {children}
    </motion.div>
  )
}

interface RevealStaggerProps {
  className?: string
  /** Applied to each generated child wrapper (e.g. `h-full` for grid items). */
  childClassName?: string
  /** Direction/style each child enters with. Defaults to `up`. */
  variant?: RevealVariant
  /** Seconds between each child's start. */
  stagger?: number
  /** Seconds to wait before the first child animates. */
  delay?: number
  /** Per-child animation duration in seconds. */
  duration?: number
  once?: boolean
  amount?: number
  children: ReactNode
}

/**
 * Reveals its direct children one after another as the group scrolls into view.
 * Each child is wrapped in a `motion.div`, so `className` carries the layout
 * (grid/flex) and `childClassName` styles the per-item wrapper.
 */
export function RevealStagger({
  className,
  childClassName,
  variant = 'up',
  stagger = 0.1,
  delay = 0,
  duration = 0.5,
  once = false,
  amount = 0.2,
  children,
}: RevealStaggerProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  const itemVariants: Variants = {
    hidden: hiddenState(variant),
    visible: { ...VISIBLE, transition: { duration, ease: EASE } },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      onAnimationComplete={notifyJourneyRemeasure}
    >
      {Children.map(children, (child) => (
        <motion.div className={childClassName} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
