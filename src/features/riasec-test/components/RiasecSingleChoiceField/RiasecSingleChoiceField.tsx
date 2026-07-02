'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui'
import type { RiasecQuestion } from '@/features/riasec-test/interfaces'
import { cn } from '@/libs/utils.lib'

interface RiasecSingleChoiceFieldProps {
  question: RiasecQuestion
  value: string
  onChange: (value: string) => void
}

export function RiasecSingleChoiceField({
  question,
  value,
  onChange,
}: RiasecSingleChoiceFieldProps) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="gap-3">
      {question.answers.map((answer) => {
        const isSelected = value === answer.id
        return (
          <label
            key={answer.id}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors',
              isSelected
                ? 'border-border-brand-primary-medium bg-bg-brand-primary-light'
                : 'border-border-base-gray-medium bg-fill-base-white hover:bg-bg-base-gray-light',
            )}
          >
            <RadioGroupItem value={answer.id} />
            <span className="text-base text-text-base-primary">{answer.value}</span>
          </label>
        )
      })}
    </RadioGroup>
  )
}
