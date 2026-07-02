import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/utils.lib'

/**
 * IconButton — icon-only counterpart to Button.
 *
 * Variants mirror Button's tokens so the two components stay visually consistent:
 *   solid    → brand primary fill
 *   outline  → brand primary border
 *   ghost    → transparent, hover neutral gray (use this when the icon sits inline in dense UI)
 *   soft     → white fill with a subtle shadow (use for floating icons over imagery/canvases)
 *
 * Sizes target tap-friendly defaults:
 *   xs → 24px   sm → 32px   md → 44px (default — meets the 44px mobile tap target)   lg → 48px
 */
const iconButtonVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        solid: [
          'bg-btn-solid-bg text-btn-solid-text',
          'hover:bg-btn-solid-bg-hover',
          'focus-visible:ring-btn-focus',
        ],
        outline: [
          'border border-btn-outline-border bg-btn-outline-bg text-btn-outline-text',
          'hover:bg-btn-outline-bg-hover',
          'focus-visible:ring-btn-focus',
        ],
        ghost: [
          'bg-transparent text-btn-ghost-icon-text',
          'hover:bg-btn-ghost-icon-bg-hover',
          'focus-visible:ring-text-base-secondary',
        ],
        soft: [
          'bg-fill-base-white text-btn-ghost-icon-text shadow-sm',
          'hover:bg-btn-ghost-icon-bg-hover',
          'focus-visible:ring-text-base-secondary',
        ],
      },
      size: {
        xs: 'size-6 [&_svg]:size-3.5',
        sm: 'size-8 [&_svg]:size-4',
        md: 'size-11 [&_svg]:size-5',
        lg: 'size-12 [&_svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
    },
  },
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        type={asChild ? undefined : type}
        {...props}
      />
    )
  },
)
IconButton.displayName = 'IconButton'

export { IconButton, iconButtonVariants }
