import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/libs/utils.lib'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-6 w-6 shrink-0 rounded-sm border border-fill-base-gray-medium bg-fill-base-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-focus disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:bg-fill-brand-primary-dark data-[state=checked]:text-text-base-white data-[state=indeterminate]:bg-fill-brand-primary-dark data-[state=indeterminate]:text-text-base-white',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
