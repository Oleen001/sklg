'use client'

import * as React from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'

import { cn } from '@/libs/utils.lib'
import { hoverLift, springInteractive, tapScale } from '@/theme/motion'

const CARD_BASE = 'rounded-xl border border-border-base-gray-medium bg-fill-base-white shadow-sm'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Adds the canonical spring hover lift + press feedback and a Tailwind
   * shadow elevation on hover. Opt-in and reduced-motion aware. Use for
   * clickable cards.
   */
  interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, ...props }, ref) => {
    const reduceMotion = useReducedMotion()

    if (interactive && !reduceMotion) {
      return (
        <motion.div
          className={cn(CARD_BASE, 'transition-shadow hover:shadow-md', className)}
          ref={ref}
          whileHover={hoverLift}
          whileTap={tapScale}
          transition={springInteractive}
          {...(props as unknown as HTMLMotionProps<'div'>)}
        />
      )
    }

    return <div ref={ref} className={cn(CARD_BASE, className)} {...props} />
  },
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-base text-text-base-secondary', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  ),
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
