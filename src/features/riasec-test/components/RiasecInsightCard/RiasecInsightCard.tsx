import Image from 'next/image'

import { riasecLetterTheme } from '@/features/riasec-test/constants'
import { RiasecInsightType } from '@/features/riasec-test/enums'
import type { RiasecInsight } from '@/features/riasec-test/interfaces'
import { cn } from '@/libs/utils.lib'

interface RiasecInsightCardProps {
  insight: RiasecInsight
}

// Hard offset shadow per type — green (question C tone) for strengths, orange
// (question S tone) for weaknesses — matching the question-box look.
const config = {
  [RiasecInsightType.STRENGTH]: {
    icon: '/images/strength-finder/icon-smiley-strength.svg',
    bgClassName: 'bg-bg-system-success-light',
    dotClassName: 'bg-bg-system-success-medium',
    shadow: riasecLetterTheme.C.shadow,
  },
  [RiasecInsightType.WEAKNESS]: {
    icon: '/images/strength-finder/icon-smiley-weakness.svg',
    bgClassName: 'bg-bg-system-warning-light',
    dotClassName: 'bg-bg-system-warning-medium',
    shadow: riasecLetterTheme.S.shadow,
  },
}

export function RiasecInsightCard({ insight }: RiasecInsightCardProps) {
  const { icon, bgClassName, dotClassName, shadow } = config[insight.type]

  return (
    <div
      style={{ borderColor: shadow, boxShadow: `6px 6px 0 0 ${shadow}` }}
      className={cn('rounded-xl border-4 p-5', bgClassName)}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="relative h-7 w-7">
          <Image src={icon} alt="" fill className="object-contain" />
        </span>
        <h3 className="text-lg font-semibold text-text-base-primary">{insight.title}</h3>
      </div>
      <ul className="flex flex-col gap-2">
        {insight.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-base text-text-base-primary">
            <span
              className={cn('mt-2 h-1.5 w-1.5 shrink-0 rounded-full', dotClassName)}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
