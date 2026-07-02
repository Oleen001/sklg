import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/utils.lib'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full px-2 font-semibold whitespace-nowrap',
  {
    variants: {
      size: {
        large: 'h-[21px] text-body-s-semibold', // 21px height, 14px text
        medium: 'h-[18px] text-caption-semibold', // 18px height, 12px text
        small: 'h-[16px] text-caption-semibold', // 16px height, 12px text
      },
      color: {
        primary: 'bg-bg-brand-primary-dark text-text-base-white',
        black: 'bg-fill-base-gray-dark2 text-text-brand-primary-light',
        primaryInvert: 'bg-bg-brand-primary-light text-text-brand-primary-dark',
        green: 'bg-bg-system-success-dark text-text-base-white',
        gray: 'bg-fill-base-gray-light text-text-base-secondary',
        red: 'bg-bg-system-error-medium text-text-base-white',
      },
    },
    defaultVariants: {
      size: 'large',
      color: 'primary',
    },
  },
)

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, VariantProps<typeof badgeVariants> {}

function Badge({ className, size, color, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ size, color }), className)} {...props} />
}

export { Badge, badgeVariants }
