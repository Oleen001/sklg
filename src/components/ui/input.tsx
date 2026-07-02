import * as React from 'react'
import { cn } from '@/libs/utils.lib'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  error?: boolean
  helperText?: string
  id?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, ...props }, ref) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputId = id || `input-${React.useId()}`

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-base font-semibold leading-6 text-input-label">
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            'flex h-12 w-full rounded-lg border border-input-border-default bg-input-bg px-4 text-base text-input-text-fill placeholder:text-input-placeholder focus:border-input-border-focus focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-input-bg-disable disabled:text-input-text-disable',
            error && 'border-input-error focus:border-input-error',
            className,
          )}
          ref={ref}
          aria-invalid={error}
          {...props}
        />
        {helperText && (
          <p
            className={cn('text-sm leading-5', error ? 'text-input-error' : 'text-input-hint-text')}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
