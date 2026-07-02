import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Star } from 'lucide-react'

import { cn } from '@/libs/utils.lib'

const ratingVariants = cva('inline-flex items-center', {
  variants: {
    size: {
      sm: 'gap-0.5 [&_[data-rating-star]]:size-4',
      md: 'gap-1 [&_[data-rating-star]]:size-5',
      lg: 'gap-1 [&_[data-rating-star]]:size-7',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'>, VariantProps<typeof ratingVariants> {
  value: number
  max?: number
}

export function Rating({
  value,
  max = 5,
  size,
  className,
  'aria-label': ariaLabel,
  ...props
}: RatingProps) {
  const clamped = Math.max(0, Math.min(max, value))
  const label = ariaLabel ?? `Rating: ${clamped} out of ${max}`

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(ratingVariants({ size }), className)}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const fillPercent = Math.max(0, Math.min(1, clamped - i)) * 100
        return (
          <span key={i} data-rating-star className="relative inline-block shrink-0">
            <Star className="size-full text-fill-base-gray-medium" strokeWidth={1.5} aria-hidden />
            {fillPercent > 0 ? (
              <span
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - fillPercent}% 0 0)` }}
                aria-hidden
              >
                <Star
                  className="size-full fill-accent-yellow-500 text-accent-yellow-500"
                  strokeWidth={1.5}
                />
              </span>
            ) : null}
          </span>
        )
      })}
    </div>
  )
}
