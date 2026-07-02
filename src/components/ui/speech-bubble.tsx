import * as React from 'react'

import { cn } from '@/libs/utils.lib'

const bubbleGradient =
  'bg-[linear-gradient(135deg,var(--color-speech-bubble-gradient-from)_0%,var(--color-speech-bubble-gradient-to)_100%)]'

const SPEECH_BUBBLE_BASE_CLASSES = 'relative p-6 md:p-8'

export type SpeechBubbleBackground = 'gradient' | 'solid' | 'highlight' | 'fill'

const BACKGROUND_CLASSES: Record<SpeechBubbleBackground, string> = {
  gradient: cn('border border-border-base-gray-light', bubbleGradient),
  solid: 'bg-bg-brand-primary-light',
  highlight: 'bg-bg-brand-primary-light2',
  fill: 'bg-text-brand-primary-light',
}

const TAIL_BACKGROUND_CLASSES: Record<SpeechBubbleBackground, string> = {
  gradient: bubbleGradient,
  solid: 'bg-bg-brand-primary-light',
  highlight: 'bg-bg-brand-primary-light2',
  fill: 'bg-text-brand-primary-light',
}

const TAIL_BORDER_CLASSES: Record<
  SpeechBubbleBackground,
  Record<'top' | 'right' | 'bottom' | 'left', string>
> = {
  gradient: {
    top: 'border-l border-t border-border-base-gray-light',
    right: 'border-r border-t border-border-base-gray-light',
    bottom: 'border-b border-r border-border-base-gray-light',
    left: 'border-b border-l border-border-base-gray-light',
  },
  solid: { top: '', right: '', bottom: '', left: '' },
  highlight: { top: '', right: '', bottom: '', left: '' },
  fill: { top: '', right: '', bottom: '', left: '' },
}

export type TailPositionValue =
  | 'none'
  | 'top-start'
  | 'top-start-center'
  | 'top-center'
  | 'top-center-end'
  | 'top-end'
  | 'right-start'
  | 'right-start-center'
  | 'right-center'
  | 'right-center-end'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-start-center'
  | 'bottom-center'
  | 'bottom-center-end'
  | 'bottom-end'
  | 'left-start'
  | 'left-start-center'
  | 'left-center'
  | 'left-center-end'
  | 'left-end'

/**
 * `tailPosition` accepts either:
 *  - a single TailPositionValue — applied at every breakpoint, or
 *  - a `{ base?, md?, lg? }` object — switches position per breakpoint (mobile-first).
 *    Keys map to the project breakpoints in .claude/rules/design.md:
 *      base = < 768px, md = ≥ 768px, lg = ≥ 1024px
 */
export type ResponsiveTailPosition =
  | TailPositionValue
  | { base?: TailPositionValue; md?: TailPositionValue; lg?: TailPositionValue }

export type CornerRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full'

/**
 * `radius` accepts either:
 *  - a single CornerRadius applied to all four corners, or
 *  - a `{ tl?, tr?, bl?, br? }` object for per-corner control.
 *    Any omitted corner falls back to the default radius ('4xl').
 */
export type SpeechBubbleRadius =
  | CornerRadius
  | { tl?: CornerRadius; tr?: CornerRadius; bl?: CornerRadius; br?: CornerRadius }

const DEFAULT_CORNER_RADIUS: CornerRadius = '4xl'

// Static class literals so Tailwind's content scan picks them up.
const ROUNDED_TL_CLASSES: Record<CornerRadius, string> = {
  none: 'rounded-tl-none',
  sm: 'rounded-tl-sm',
  md: 'rounded-tl-md',
  lg: 'rounded-tl-lg',
  xl: 'rounded-tl-xl',
  '2xl': 'rounded-tl-2xl',
  '3xl': 'rounded-tl-3xl',
  '4xl': 'rounded-tl-4xl',
  full: 'rounded-tl-full',
}

const ROUNDED_TR_CLASSES: Record<CornerRadius, string> = {
  none: 'rounded-tr-none',
  sm: 'rounded-tr-sm',
  md: 'rounded-tr-md',
  lg: 'rounded-tr-lg',
  xl: 'rounded-tr-xl',
  '2xl': 'rounded-tr-2xl',
  '3xl': 'rounded-tr-3xl',
  '4xl': 'rounded-tr-4xl',
  full: 'rounded-tr-full',
}

const ROUNDED_BL_CLASSES: Record<CornerRadius, string> = {
  none: 'rounded-bl-none',
  sm: 'rounded-bl-sm',
  md: 'rounded-bl-md',
  lg: 'rounded-bl-lg',
  xl: 'rounded-bl-xl',
  '2xl': 'rounded-bl-2xl',
  '3xl': 'rounded-bl-3xl',
  '4xl': 'rounded-bl-4xl',
  full: 'rounded-bl-full',
}

const ROUNDED_BR_CLASSES: Record<CornerRadius, string> = {
  none: 'rounded-br-none',
  sm: 'rounded-br-sm',
  md: 'rounded-br-md',
  lg: 'rounded-br-lg',
  xl: 'rounded-br-xl',
  '2xl': 'rounded-br-2xl',
  '3xl': 'rounded-br-3xl',
  '4xl': 'rounded-br-4xl',
  full: 'rounded-br-full',
}

function resolveRadiusClasses(radius: SpeechBubbleRadius): string {
  if (typeof radius === 'string') {
    return cn(
      ROUNDED_TL_CLASSES[radius],
      ROUNDED_TR_CLASSES[radius],
      ROUNDED_BL_CLASSES[radius],
      ROUNDED_BR_CLASSES[radius],
    )
  }
  return cn(
    ROUNDED_TL_CLASSES[radius.tl ?? DEFAULT_CORNER_RADIUS],
    ROUNDED_TR_CLASSES[radius.tr ?? DEFAULT_CORNER_RADIUS],
    ROUNDED_BL_CLASSES[radius.bl ?? DEFAULT_CORNER_RADIUS],
    ROUNDED_BR_CLASSES[radius.br ?? DEFAULT_CORNER_RADIUS],
  )
}

const TAIL_BASE_CLASSES = 'pointer-events-none absolute block size-5'

type TailSide = 'top' | 'right' | 'bottom' | 'left'

const TAIL_POSITION_CLASSES: Record<Exclude<TailPositionValue, 'none'>, string> = {
  // ── top side (tail points up) ──────────────────────────────────────────
  'top-start': '-top-[10px] left-6 rotate-45',
  'top-start-center': '-top-[10px] left-1/4 -translate-x-1/2 rotate-45',
  'top-center': '-top-[10px] left-1/2 -translate-x-1/2 rotate-45',
  'top-center-end': '-top-[10px] left-3/4 -translate-x-1/2 rotate-45',
  'top-end': '-top-[10px] right-6 rotate-45',

  // ── right side (tail points right) ─────────────────────────────────────
  'right-start': '-right-[10px] top-6 rotate-45',
  'right-start-center': '-right-[10px] top-1/4 -translate-y-1/2 rotate-45',
  'right-center': '-right-[10px] top-1/2 -translate-y-1/2 rotate-45',
  'right-center-end': '-right-[10px] top-3/4 -translate-y-1/2 rotate-45',
  'right-end': '-right-[10px] bottom-6 rotate-45',

  // ── bottom side (tail points down) ─────────────────────────────────────
  'bottom-start': '-bottom-[10px] left-6 rotate-45',
  'bottom-start-center': '-bottom-[10px] left-1/4 -translate-x-1/2 rotate-45',
  'bottom-center': '-bottom-[10px] left-1/2 -translate-x-1/2 rotate-45',
  'bottom-center-end': '-bottom-[10px] left-3/4 -translate-x-1/2 rotate-45',
  'bottom-end': '-bottom-[10px] right-6 rotate-45',

  // ── left side (tail points left) ───────────────────────────────────────
  'left-start': '-left-[10px] top-6 rotate-45',
  'left-start-center': '-left-[10px] top-1/4 -translate-y-1/2 rotate-45',
  'left-center': '-left-[10px] top-1/2 -translate-y-1/2 rotate-45',
  'left-center-end': '-left-[10px] top-3/4 -translate-y-1/2 rotate-45',
  'left-end': '-left-[10px] bottom-6 rotate-45',
}

const TAIL_SIDES: Record<Exclude<TailPositionValue, 'none'>, TailSide> = {
  'top-start': 'top',
  'top-start-center': 'top',
  'top-center': 'top',
  'top-center-end': 'top',
  'top-end': 'top',
  'right-start': 'right',
  'right-start-center': 'right',
  'right-center': 'right',
  'right-center-end': 'right',
  'right-end': 'right',
  'bottom-start': 'bottom',
  'bottom-start-center': 'bottom',
  'bottom-center': 'bottom',
  'bottom-center-end': 'bottom',
  'bottom-end': 'bottom',
  'left-start': 'left',
  'left-start-center': 'left',
  'left-center': 'left',
  'left-center-end': 'left',
  'left-end': 'left',
}

/**
 * Renders one tail per active breakpoint and toggles visibility with hidden/block utilities.
 * This avoids fighting cascading Tailwind classes when only some properties (top/left/borders)
 * need to flip between breakpoints — each breakpoint gets a clean, self-contained class set.
 */
function tailClasses(
  position: Exclude<TailPositionValue, 'none'>,
  background: SpeechBubbleBackground,
): string {
  return cn(
    TAIL_BASE_CLASSES,
    TAIL_BACKGROUND_CLASSES[background],
    TAIL_BORDER_CLASSES[background][TAIL_SIDES[position]],
    TAIL_POSITION_CLASSES[position],
  )
}

function renderTails(
  tailPosition: ResponsiveTailPosition,
  background: SpeechBubbleBackground,
): React.ReactNode {
  if (typeof tailPosition === 'string') {
    if (tailPosition === 'none') return null
    return <span aria-hidden="true" className={tailClasses(tailPosition, background)} />
  }

  const { base, md, lg } = tailPosition
  const tails: React.ReactNode[] = []

  if (base && base !== 'none') {
    tails.push(
      <span
        key="base"
        aria-hidden="true"
        className={cn(tailClasses(base, background), md && 'md:hidden', !md && lg && 'lg:hidden')}
      />,
    )
  }

  if (md && md !== 'none') {
    tails.push(
      <span
        key="md"
        aria-hidden="true"
        className={cn(tailClasses(md, background), 'hidden md:block', lg && 'lg:hidden')}
      />,
    )
  }

  if (lg && lg !== 'none') {
    tails.push(
      <span
        key="lg"
        aria-hidden="true"
        className={cn(tailClasses(lg, background), 'hidden lg:block')}
      />,
    )
  }

  return tails
}

export interface SpeechBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  tailPosition?: ResponsiveTailPosition
  radius?: SpeechBubbleRadius
  background?: SpeechBubbleBackground
}

const SpeechBubble = React.forwardRef<HTMLDivElement, SpeechBubbleProps>(
  (
    {
      className,
      tailPosition = 'right-end',
      radius = DEFAULT_CORNER_RADIUS,
      background = 'gradient',
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        SPEECH_BUBBLE_BASE_CLASSES,
        BACKGROUND_CLASSES[background],
        resolveRadiusClasses(radius),
        className,
      )}
      {...props}
    >
      {children}
      {renderTails(tailPosition, background)}
    </div>
  ),
)
SpeechBubble.displayName = 'SpeechBubble'

export { SpeechBubble }
