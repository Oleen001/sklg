'use client'

import Image from 'next/image'

import { riasecArchetypes, riasecLetterTheme } from '@/features/riasec-test/constants'
import type { RiasecScore } from '@/features/riasec-test/interfaces'

interface RiasecScoreBarChartProps {
  scores: RiasecScore[]
}

export function RiasecScoreBarChart({ scores }: RiasecScoreBarChartProps) {
  const sorted = [...scores].sort((a, b) => b.score - a.score)

  return (
    <div className="flex flex-col gap-4">
      {sorted.map((score, index) => {
        const meta = riasecArchetypes[score.code]
        return (
          <div key={score.code} className="flex items-center gap-3">
            <span className="relative h-9 w-9 shrink-0">
              <Image src={meta.iconUrl} alt={meta.nameEn} fill className="object-contain" />
            </span>
            <div className="flex-1">
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-text-base-primary">
                  {meta.nameTh}
                  {index < 3 && (
                    <span className="ml-1.5 text-xs font-normal text-text-base-tertiary">
                      ({score.code})
                    </span>
                  )}
                </span>
                <span className="text-sm font-semibold text-text-base-secondary">
                  {score.score}%
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-fill-base-gray-light">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${score.score}%`,
                    backgroundColor: riasecLetterTheme[score.code].shadow,
                  }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
