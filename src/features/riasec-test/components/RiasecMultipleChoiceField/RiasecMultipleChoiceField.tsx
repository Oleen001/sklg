'use client'

import { Checkbox } from '@/components/ui'
import type { RiasecQuestion } from '@/features/riasec-test/interfaces'
import { cn } from '@/libs/utils.lib'

interface RiasecMultipleChoiceFieldProps {
  question: RiasecQuestion
  value: string[]
  onChange: (value: string[]) => void
}

export function RiasecMultipleChoiceField({
  question,
  value,
  onChange,
}: RiasecMultipleChoiceFieldProps) {
  const toggle = (answerId: string, checked: boolean) => {
    onChange(checked ? [...value, answerId] : value.filter((id) => id !== answerId))
  }

  return (
    <div className="flex flex-col gap-3">
      {question.answers.map((answer) => {
        const isSelected = value.includes(answer.id)
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
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => toggle(answer.id, checked === true)}
            />
            <span className="text-base text-text-base-primary">{answer.value}</span>
          </label>
        )
      })}
    </div>
  )
}
