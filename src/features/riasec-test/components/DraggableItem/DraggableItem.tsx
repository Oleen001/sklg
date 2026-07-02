'use client'

import { Reorder } from 'motion/react'
import { GripVertical } from 'lucide-react'

interface DraggableItemProps {
  value: string
  label: string
}

export function DraggableItem({ value, label }: DraggableItemProps) {
  return (
    <Reorder.Item
      value={value}
      className="flex cursor-grab items-center gap-3 rounded-xl border border-border-base-gray-medium bg-fill-base-white p-4 shadow-sm active:cursor-grabbing"
    >
      <GripVertical className="h-5 w-5 shrink-0 text-text-base-tertiary" aria-hidden />
      <span className="flex-1 text-base text-text-base-primary">{label}</span>
    </Reorder.Item>
  )
}
