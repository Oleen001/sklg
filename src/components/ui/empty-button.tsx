import * as React from 'react'
import { Plus } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/utils.lib'

/**
 * EmptyButton — dashed "add / empty state" affordance (Figma: "Empty Button").
 *
 * A full-width, stacked card button: an icon on top of a short prompt. Use it
 * to invite the user to create something that doesn't exist yet (add a section,
 * take a test, write a bio). Theme-neutral — reads correctly on light and dark
 * backgrounds.
 */
const emptyButtonVariants = cva(
  [
    'flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl',
    'border border-dashed border-border-base-gray-light px-4 py-3 text-center',
    'text-text-base-tertiary transition-colors',
    'hover:border-border-base-gray-medium',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-base-secondary',
    'disabled:pointer-events-none disabled:opacity-40',
  ],
  {
    variants: {
      size: {
        md: 'min-h-[88px] [&_svg]:size-8',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export interface EmptyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof emptyButtonVariants> {
  icon?: React.ReactNode
}

const EmptyButton = React.forwardRef<HTMLButtonElement, EmptyButtonProps>(
  ({ className, size, icon = <Plus />, children, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(emptyButtonVariants({ size, className }))}
        {...props}
      >
        {icon}
        <span className="text-base leading-6 text-text-base-secondary">{children}</span>
      </button>
    )
  },
)
EmptyButton.displayName = 'EmptyButton'

export { EmptyButton, emptyButtonVariants }
