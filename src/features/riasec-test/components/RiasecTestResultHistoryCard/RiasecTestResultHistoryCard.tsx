'use client'

import Link from 'next/link'
import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui'
import { riasecArchetypes } from '@/features/riasec-test/constants'
import { Route } from '@/enums'
import type { RiasecHistoryItem } from '@/features/riasec-test/interfaces'
import { formatThaiDate } from '@/features/riasec-test/utils'
import { generatePath } from '@/utils'

interface RiasecTestResultHistoryCardProps {
  item: RiasecHistoryItem
  onDelete: (id: string) => void
}

export function RiasecTestResultHistoryCard({ item, onDelete }: RiasecTestResultHistoryCardProps) {
  const topCodes = [...item.scores].sort((a, b) => b.score - a.score).slice(0, 3)

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border-base-gray-medium bg-fill-base-white p-4 shadow-sm transition-colors hover:bg-bg-base-gray-light">
      <Link
        href={generatePath(Route.RIASEC_TEST_RESULT, { resultId: item.id })}
        className="flex flex-1 items-center gap-4"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-bg-brand-primary-light text-lg font-bold text-text-brand-primary-dark">
          {item.personalityCode}
        </span>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-text-base-primary">
            {item.personalityName}
          </p>
          <p className="text-sm text-text-base-secondary">{formatThaiDate(item.createdAt)}</p>
          <div className="mt-1.5 flex gap-1.5">
            {topCodes.map((score) => (
              <span
                key={score.code}
                className="rounded-full bg-fill-base-gray-light px-2 py-0.5 text-xs font-medium text-text-base-secondary"
              >
                {riasecArchetypes[score.code].nameTh} {score.score}%
              </span>
            ))}
          </div>
        </div>
      </Link>

      <Button
        variant="ghostDanger"
        size="sm"
        aria-label="ลบผลการทดสอบ"
        onClick={() => onDelete(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
