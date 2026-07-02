import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/utils.lib'
import { X } from 'lucide-react'

const chipVariants = cva(
  'inline-flex items-center gap-2 font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-focus disabled:cursor-not-allowed disabled:opacity-40',
  {
    variants: {
      variant: {
        outlined: [
          'bg-fill-base-white border border-chip-outlined-border text-chip-outlined-text',
          'hover:bg-chip-outlined-hover-bg hover:border-chip-outlined-hover-border',
        ],
        filled: 'bg-chip-filled-bg text-chip-filled-text',
      },
      size: {
        small: 'h-7 rounded-lg px-3 text-base',
        medium: 'h-9 rounded-xl px-3 text-base',
        large: 'h-12 rounded-2xl px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'medium',
    },
  },
)

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {
  active?: boolean
  onDelete?: () => void
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, size, active, onDelete, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          chipVariants({ variant, size }),
          active &&
            variant !== 'filled' &&
            'bg-bg-brand-primary-light2 border-border-brand-primary-medium',
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="flex-shrink-0 rounded-full p-0.5 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-btn-focus"
            aria-label="Remove"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  },
)
Chip.displayName = 'Chip'

export { Chip, chipVariants }
