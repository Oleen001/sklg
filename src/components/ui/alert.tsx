import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/utils.lib'
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

const alertVariants = cva('flex items-start gap-2 rounded-lg px-4 py-3 shadow-sm', {
  variants: {
    variant: {
      default: 'bg-fill-base-white border border-border-base-gray-medium text-text-base-primary',
      success:
        'bg-bg-system-success-light text-text-system-success [&>svg]:text-text-system-success',
      error: 'bg-bg-system-error-light text-text-system-error [&>svg]:text-text-system-error',
      warning:
        'bg-bg-system-warning-light text-text-system-warning [&>svg]:text-text-system-warning',
      info: 'bg-bg-system-info-light text-text-system-info [&>svg]:text-text-system-info',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>

const alertIcons: Record<AlertVariant, React.ComponentType<{ className?: string }>> = {
  default: AlertCircle,
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, children, ...props }, ref) => {
    const Icon = alertIcons[variant || 'default']

    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        <Icon className="h-6 w-6 shrink-0" />
        <div className="flex-1 text-sm leading-[21px]">{children}</div>
      </div>
    )
  },
)
Alert.displayName = 'Alert'

export { Alert, alertVariants }
