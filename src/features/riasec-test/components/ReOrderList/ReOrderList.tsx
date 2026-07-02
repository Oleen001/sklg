'use client'

import { Reorder } from 'motion/react'

import { DraggableItem } from '@/features/riasec-test/components/DraggableItem'
import type { RiasecQuestion } from '@/features/riasec-test/interfaces'

interface ReOrderListProps {
  question: RiasecQuestion
  value: string[]
  onChange: (value: string[]) => void
}

export function ReOrderList({ question, value, onChange }: ReOrderListProps) {
  const labelById = new Map(question.answers.map((answer) => [answer.id, answer.value ?? '']))

  return (
    <Reorder.Group axis="y" values={value} onReorder={onChange} className="flex flex-col gap-3">
      {value.map((id) => (
        <DraggableItem key={id} value={id} label={labelById.get(id) ?? ''} />
      ))}
    </Reorder.Group>
  )
}
