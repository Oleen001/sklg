'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'

import { cn } from '@/libs/utils.lib'
import { hoverLiftSubtle, springInteractive, tapScale } from '@/theme/motion'

/**
 * Button component — HI Design System
 *
 * Variants mirror the reference MUI project's button tokens exactly:
 *   solid        → contained primary  (bg/brand/primary-medium → hover: primary-dark)
 *   solidDanger  → contained error    (bg/system/error-dark → hover: error-medium)
 *   outline      → outlined primary   (border/brand/primary-dark, text/brand/primary-dark)
 *   outlineDanger→ outlined error     (border/system/error-dark, text/system/error)
 *   ghost        → ghost primary      (text/brand/primary-dark, hover: bg/brand/primary-light-2)
 *   ghostDanger  → ghost error        (text/system/error, hover: bg/system/error-light)
 *   ghostIcon    → ghost neutral gray (text/base/primary, hover: bg/base/gray-light)
 *
 * Sizes:
 *   xs → 28px height   sm → 36px height   md → 48px height (default)   lg → 56px height
 */
const buttonVariants = cva(
  // Base styles
  'inline-flex cursor-pointer items-center justify-center gap-1 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        // ── Solid (contained) · primary ───────────────────────────────────────
        solid: [
          'bg-btn-solid-bg text-btn-solid-text',
          'hover:bg-btn-solid-bg-hover',
          'active:bg-btn-solid-bg-hover',
          'focus-visible:ring-btn-focus',
          'disabled:bg-btn-solid-bg-hover',
        ],

        // ── Solid (contained) · danger ────────────────────────────────────────
        solidDanger: [
          'bg-btn-solid-danger-bg text-btn-solid-danger-text',
          'hover:bg-btn-solid-danger-bg-hover',
          'active:bg-btn-solid-danger-bg',
          'focus-visible:ring-border-system-error-medium',
          'disabled:bg-btn-solid-danger-bg',
        ],

        // ── Solid (contained) · neutral (dark) ────────────────────────────────
        solidNeutral: [
          'bg-fill-base-gray-dark2 text-text-base-white',
          'hover:bg-fill-base-gray-dark',
          'active:bg-fill-base-gray-dark2',
          'focus-visible:ring-fill-base-gray-dark2',
          'disabled:bg-fill-base-gray-dark2',
        ],

        // ── Outline (outlined) · primary ──────────────────────────────────────
        outline: [
          'border border-btn-outline-border bg-btn-outline-bg text-btn-outline-text',
          'hover:bg-btn-outline-bg-hover',
          'active:bg-btn-outline-bg',
          'focus-visible:ring-btn-focus',
          'disabled:bg-btn-outline-bg disabled:border-btn-outline-border disabled:text-btn-outline-text',
        ],

        // ── Outline (outlined) · danger ───────────────────────────────────────
        outlineDanger: [
          'border border-btn-outline-danger-border bg-btn-outline-danger-bg text-btn-outline-danger-text',
          'hover:bg-btn-outline-danger-bg-hover hover:border-btn-outline-danger-border-hover',
          'active:bg-btn-outline-danger-bg active:border-btn-outline-danger-border',
          'focus-visible:ring-border-system-error-medium',
          'disabled:bg-btn-outline-danger-bg disabled:border-btn-outline-danger-border disabled:text-btn-outline-danger-text',
        ],

        // ── Outline (outlined) · neutral (gray) ───────────────────────────────
        outlineNeutral: [
          'border border-border-base-gray-medium bg-fill-base-white text-text-base-primary',
          'hover:bg-bg-base-gray-light',
          'active:bg-fill-base-white',
          'focus-visible:ring-border-base-gray-medium',
          'disabled:bg-fill-base-white disabled:border-border-base-gray-medium disabled:text-text-base-primary',
        ],

        // ── Ghost · primary ───────────────────────────────────────────────────
        ghost: [
          'bg-transparent text-btn-ghost-text',
          'hover:bg-btn-ghost-bg-hover',
          'active:bg-btn-ghost-bg-hover active:text-btn-ghost-text-pressed',
          'focus-visible:ring-btn-focus',
          'disabled:bg-transparent disabled:text-btn-ghost-text',
        ],

        // ── Ghost · danger ────────────────────────────────────────────────────
        ghostDanger: [
          'bg-transparent text-btn-ghost-danger-text',
          'hover:bg-btn-ghost-danger-bg-hover',
          'active:bg-btn-ghost-danger-bg-hover',
          'focus-visible:ring-border-system-error-medium',
          'disabled:bg-transparent disabled:text-btn-ghost-danger-text',
        ],

        // ── Ghost · icon (neutral gray) ───────────────────────────────────────
        ghostIcon: [
          'bg-transparent text-btn-ghost-icon-text',
          'hover:bg-btn-ghost-icon-bg-hover',
          'active:bg-btn-ghost-icon-bg-hover',
          'focus-visible:ring-text-base-secondary',
          'disabled:bg-transparent disabled:text-btn-ghost-icon-text',
        ],

        // ── Link · inline text-only action ────────────────────────────────────
        link: [
          'inline bg-transparent text-text-link-primary',
          'hover:text-text-link-primary-hover hover:underline',
          'focus-visible:ring-btn-focus',
          'disabled:text-text-link-primary',
        ],

        // ── AI gradient · special CTA for AI-driven actions ───────────────────
        // Soft tri-color (blue → purple → pink) interior with a vibrant 1px
        // gradient border and a purple glow shadow. Uses the
        // background-clip: padding-box, border-box technique for the border.
        aiGradient: [
          'text-text-brand-primary-dark',
          'border border-solid border-transparent',
          '[background-image:linear-gradient(90deg,#EBF3FE_0%,#F5ECFE_50%,#FDEDF5_100%),linear-gradient(90deg,#3B82F6_0%,#A855F7_50%,#EC4899_100%)]',
          '[background-origin:border-box]',
          '[background-clip:padding-box,border-box]',
          'shadow-[0_0_10px_2px_#A855F73D]',
          'hover:opacity-90',
          'focus-visible:ring-btn-focus',
        ],
      },

      size: {
        // xs: 28px   sm: 36px   md: 48px   lg: 56px
        xs: 'h-7 text-sm',
        sm: 'h-9 text-base',
        md: 'h-12 text-lg',
        lg: 'h-14 text-lg',
      },
    },

    compoundVariants: [
      // Contained + Outlined min-width
      {
        variant: [
          'solid',
          'solidDanger',
          'solidNeutral',
          'outline',
          'outlineDanger',
          'outlineNeutral',
        ],
        class: 'min-w-[80px]',
      },
      // Contained + Outlined horizontal padding
      {
        variant: [
          'solid',
          'solidDanger',
          'solidNeutral',
          'outline',
          'outlineDanger',
          'outlineNeutral',
        ],
        size: 'xs',
        class: 'px-3',
      },
      {
        variant: [
          'solid',
          'solidDanger',
          'solidNeutral',
          'outline',
          'outlineDanger',
          'outlineNeutral',
        ],
        size: 'sm',
        class: 'px-3',
      },
      {
        variant: [
          'solid',
          'solidDanger',
          'solidNeutral',
          'outline',
          'outlineDanger',
          'outlineNeutral',
        ],
        size: 'md',
        class: 'px-4',
      },
      {
        variant: [
          'solid',
          'solidDanger',
          'solidNeutral',
          'outline',
          'outlineDanger',
          'outlineNeutral',
        ],
        size: 'lg',
        class: 'px-5',
      },
      // Ghost min-width + horizontal padding (always 12px = px-3)
      { variant: ['ghost', 'ghostDanger', 'ghostIcon'], class: 'min-w-[80px] px-3' },
      // Link sheds default sizing — caller controls font-size via className
      { variant: 'link', class: 'h-auto p-0' },
      // AI gradient — fixed 40px height regardless of size prop
      { variant: 'aiGradient', class: 'h-10 px-4 text-base min-w-[80px]' },
    ],

    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  },
)

// Motion-wrapped Slot so `asChild` buttons (e.g. a Button rendering a <Link>)
// still get the interactive lift/press. framer applies the transform + hover/tap
// listeners to the Slot, which forwards them to the child element.
const MotionSlot = motion.create(Slot)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /**
   * Adds the canonical spring lift on hover + press feedback on tap. Opt-in and
   * reduced-motion aware. Works with `asChild` (the child element is lifted).
   */
  interactive?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, interactive = false, ...props }, ref) => {
    const reduceMotion = useReducedMotion()
    const classes = cn(buttonVariants({ variant, size, className }))

    if (interactive && !reduceMotion) {
      const MotionComp = asChild ? MotionSlot : motion.button
      return (
        <MotionComp
          className={classes}
          ref={ref}
          whileHover={hoverLiftSubtle}
          whileTap={tapScale}
          transition={springInteractive}
          {...(props as unknown as HTMLMotionProps<'button'>)}
        />
      )
    }

    const Comp = asChild ? Slot : 'button'
    return <Comp className={classes} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
