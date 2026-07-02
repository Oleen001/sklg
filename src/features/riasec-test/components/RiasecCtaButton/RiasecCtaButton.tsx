import { Button, type ButtonProps } from '@/components/ui'
import { cn } from '@/libs/utils.lib'

// Playful CTA used across the RIASEC flow — dark yellow fill, dark border, hard
// offset shadow, bold label. Built on the neutral (gray) variant — not `solid` —
// so the base button never contributes its brand-purple active/focus states.
export function RiasecCtaButton({ className, variant = 'solidNeutral', ...props }: ButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        'border-4 border-fill-base-gray-dark2 bg-accent-yellow-300 font-bold text-text-base-primary',
        'shadow-[6px_6px_0_0_var(--color-fill-base-gray-dark2)]',
        'hover:bg-accent-yellow-500 active:bg-accent-yellow-600',
        'focus-visible:ring-fill-base-gray-dark2',
        className,
      )}
      {...props}
    />
  )
}
