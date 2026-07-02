import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/utils.lib'

const labelVariants = cva('text-base font-semibold leading-6', {
  variants: {
    disabled: {
      true: 'text-text-base-tertiary',
      false: 'text-input-label',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export interface LabelProps
  extends
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, disabled, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants({ disabled }), className)}
      {...props}
    />
  ),
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
