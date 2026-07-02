import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/utils.lib'

const tagVariants = cva(
  'inline-flex items-center gap-1 rounded-lg text-tag-text whitespace-nowrap',
  {
    variants: {
      color: {
        gray: 'bg-tag-bg-gray',
        red: 'bg-tag-bg-red',
        yellow: 'bg-tag-bg-yellow',
        green: 'bg-tag-bg-green',
        blue: 'bg-tag-bg-blue',
        primary: 'bg-tag-bg-primary',
      },
      size: {
        xs: 'px-2 py-0.5 text-xs leading-[18px]',
        sm: 'px-3 py-1 text-sm leading-[21px]',
        md: 'px-3 py-1 text-base leading-6',
      },
    },
    defaultVariants: {
      color: 'gray',
      size: 'xs',
    },
  },
)

const iconSize = {
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-5',
} as const

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, VariantProps<typeof tagVariants> {
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, color, size = 'xs', leadingIcon, trailingIcon, children, ...props }, ref) => {
    const iconClass = iconSize[(size ?? 'xs') as keyof typeof iconSize]
    return (
      <div ref={ref} className={cn(tagVariants({ color, size }), className)} {...props}>
        {leadingIcon && (
          <span className={cn('flex shrink-0 items-center justify-center', iconClass)}>
            {leadingIcon}
          </span>
        )}
        <span>{children}</span>
        {trailingIcon && (
          <span className={cn('flex shrink-0 items-center justify-center', iconClass)}>
            {trailingIcon}
          </span>
        )}
      </div>
    )
  },
)
Tag.displayName = 'Tag'

export { Tag, tagVariants }
