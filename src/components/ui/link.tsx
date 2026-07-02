import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/utils.lib'

const linkVariants = cva(
  'inline-flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-focus disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default: 'text-text-link-primary hover:text-text-link-primary-hover',
        muted: 'text-text-base-secondary hover:text-text-base-primary',
      },
      underline: {
        none: 'no-underline',
        hover: 'hover:underline',
        always: 'underline',
      },
    },
    defaultVariants: {
      variant: 'default',
      underline: 'hover',
    },
  },
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
  asChild?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, underline, ...props }, ref) => {
    const Comp = 'a'
    return (
      <Comp className={cn(linkVariants({ variant, underline, className }))} ref={ref} {...props} />
    )
  },
)
Link.displayName = 'Link'

export { Link, linkVariants }
