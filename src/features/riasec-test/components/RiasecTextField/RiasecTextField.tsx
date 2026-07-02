'use client'

import { cn } from '@/libs/utils.lib'

interface RiasecTextFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RiasecTextField({ value, onChange, placeholder }: RiasecTextFieldProps) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder ?? 'พิมพ์คำตอบของคุณที่นี่...'}
      rows={4}
      className={cn(
        'w-full resize-none rounded-lg border border-input-border-default bg-input-bg px-4 py-3 text-base leading-7 text-input-text-fill',
        'placeholder:text-input-placeholder focus:border-input-border-focus focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2',
      )}
    />
  )
}
