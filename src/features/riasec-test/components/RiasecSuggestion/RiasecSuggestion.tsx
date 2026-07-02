'use client'

import { motion } from 'motion/react'
import { ArrowDown, ArrowRight } from 'lucide-react'

import { RiasecCtaButton } from '@/features/riasec-test/components/RiasecCtaButton'
import { RiasecMagnifier } from '@/features/riasec-test/components/RiasecMagnifier'
import { defaultQuestionTheme, riasecInstructionBg } from '@/features/riasec-test/constants'
import type { RiasecSuggestionLevel } from '@/features/riasec-test/interfaces'

interface RiasecSuggestionProps {
  suggestion: RiasecSuggestionLevel
  isSubmitting?: boolean
  onNext: () => void
}

export function RiasecSuggestion({
  suggestion,
  isSubmitting = false,
  onNext,
}: RiasecSuggestionProps) {
  return (
    <div className="relative min-h-screen w-full" style={{ backgroundColor: riasecInstructionBg }}>
      {/* Full-section play area — items scatter and the magnifier roams the whole
          screen, while staying in flow so it scrolls with the page. Starts below
          the navbar (top-14) so the header stays clear of the glass overlay. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-14 z-[60]">
        <RiasecMagnifier />
      </div>

      <div className="container-compact -mt-14 pb-10 pt-20 md:pb-16">
        <div
          // Same look as the instruction boxes: thick border + hard offset
          // shadow in the neutral instruction tone.
          style={{
            borderColor: defaultQuestionTheme.shadow,
            boxShadow: `6px 6px 0 0 ${defaultQuestionTheme.shadow}`,
          }}
          className="relative z-10 flex flex-col items-center gap-5 rounded-2xl border-4 bg-fill-base-white p-6 md:p-10 text-center"
        >
          <span className="inline-flex items-center rounded-full bg-bg-brand-primary-light px-3 py-1 text-sm font-semibold text-text-brand-primary-dark">
            Level {suggestion.level} · {suggestion.stage}
          </span>

          {/* Bobbing hint nudging the user to grab the magnifier. The bottom
              margin keeps the empty space where the floating magnifier sits. */}
          <motion.div
            aria-hidden
            className="mb-72 flex flex-col items-center justify-center text-text-base-secondary"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-sm font-semibold">use this</span>
            <ArrowDown className="size-5" strokeWidth={2.5} />
          </motion.div>

          <h2 className="text-2xl font-bold text-text-base-primary">{suggestion.title}</h2>
          <p className="max-w-xl text-base leading-relaxed text-text-base-secondary">
            {suggestion.description}
          </p>
        </div>

        <div className="relative z-40 mt-10 flex justify-center">
          <RiasecCtaButton size="lg" disabled={isSubmitting} onClick={onNext}>
            ดูผลลัพธ์
            <motion.span
              aria-hidden
              className="inline-flex"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="size-5" strokeWidth={2.5} />
            </motion.span>
          </RiasecCtaButton>
        </div>
      </div>
    </div>
  )
}
