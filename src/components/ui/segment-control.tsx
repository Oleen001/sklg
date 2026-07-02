'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/utils.lib'

type SegmentControlVariant = 'pill' | 'card'

const SegmentControlVariantContext = React.createContext<SegmentControlVariant>('pill')

const SegmentControl = TabsPrimitive.Root

const segmentControlListVariants = cva('inline-flex', {
  variants: {
    variant: {
      pill: 'items-center gap-1 rounded-full border border-border-brand-secondary-medium bg-bg-base-gray-light p-1',
      // Horizontal tab row with a full-width hairline underneath and a
      // per-item active underline — color-agnostic (uses currentColor), so
      // the parent can theme it for either a light or dark backdrop.
      // Scrolls horizontally on mobile/tablet instead of wrapping, since the
      // Figma spec only defines a fixed desktop width.
      card: 'w-full flex-nowrap items-center gap-2 overflow-x-auto border-b border-current/15 lg:gap-1',
    },
  },
  defaultVariants: {
    variant: 'pill',
  },
})

const SegmentControlList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof segmentControlListVariants>
>(({ className, variant = 'pill', ...props }, ref) => (
  <SegmentControlVariantContext.Provider value={variant ?? 'pill'}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(segmentControlListVariants({ variant }), className)}
      {...props}
    />
  </SegmentControlVariantContext.Provider>
))
SegmentControlList.displayName = 'SegmentControlList'

const segmentControlItemVariants = cva(
  'inline-flex cursor-pointer items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
  {
    variants: {
      variant: {
        pill: 'h-9 min-w-[80px] gap-1 rounded-full px-3 text-sm font-semibold text-text-base-primary hover:bg-fill-base-white hover:text-text-brand-primary-dark data-[state=active]:bg-fill-base-gray-dark data-[state=active]:text-text-base-white data-[state=active]:hover:bg-fill-base-gray-dark data-[state=active]:hover:text-text-base-white [&_svg]:size-4 [&_svg]:shrink-0',
        // Horizontal icon+label row with an active indicator bar. Label text
        // is color-agnostic (text-current) so it follows whatever color the
        // parent sets — this bar re-themes for light vs. dark backdrops
        // depending on tab. The active indicator itself and the icon recolor
        // to a fixed brand blue regardless of backdrop (matches Figma).
        // The indicator is a rounded pill inset within the button's own
        // padding (after:inset-x-3 mirrors p-3), not a full-width border.
        card: 'relative min-w-[79px] shrink-0 gap-2 rounded-lg p-3 text-base font-normal text-current after:absolute after:inset-x-3 after:bottom-0 after:h-1 after:rounded-full after:bg-transparent after:content-[""] hover:text-current data-[state=active]:font-medium data-[state=active]:text-current data-[state=active]:after:bg-fill-brand-primary-medium [&_svg]:size-7 [&_svg]:shrink-0 data-[state=active]:[&_svg]:text-fill-brand-primary-medium',
      },
    },
    defaultVariants: {
      variant: 'pill',
    },
  },
)

const SegmentControlItem = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(SegmentControlVariantContext)
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(segmentControlItemVariants({ variant }), className)}
      {...props}
    />
  )
})
SegmentControlItem.displayName = 'SegmentControlItem'

const SegmentControlContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
    VariantProps<typeof segmentControlListVariants>
>(({ className, variant = 'pill', ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      // The card variant's tab bar sits directly against adjacent sections
      // (e.g. a continuous navy backdrop) in Figma, so it can't carry a top
      // margin the way the pill variant's content panels do.
      variant !== 'card' && 'mt-2',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-focus focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
SegmentControlContent.displayName = 'SegmentControlContent'

export { SegmentControl, SegmentControlList, SegmentControlItem, SegmentControlContent }
