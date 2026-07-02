'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

import { MindCanvas, MindCanvasBorder } from '@/features/riasec-test/components/MindCanvas'
import { RiasecCtaButton } from '@/features/riasec-test/components/RiasecCtaButton'
import { riasecInstructionBg } from '@/features/riasec-test/constants'

interface MessMindStoryProps {
  title?: string
  description?: string
  onNext: () => void
}

export function MessMindStory({ title, description, onNext }: MessMindStoryProps) {
  return (
    <div className="w-full" style={{ backgroundColor: riasecInstructionBg }}>
      <div className="container-compact -mt-14 pb-10 pt-20 md:pb-14">
        <div className="text-center">
          {title && (
            <h2 className="text-2xl font-bold text-text-base-primary md:text-3xl">{title}</h2>
          )}
          {description && (
            <p className="mx-auto mt-3 max-w-xl text-base text-text-base-secondary">
              {description}
            </p>
          )}
        </div>

        <div className="relative mt-10 pb-14">
          {/* The "mind" — a thought-cloud canvas the user can draw in, wrapped in a
            hand-drawn wavy frame. */}
          <div className="relative mx-auto max-w-2xl p-4 md:p-5">
            <MindCanvas className="relative h-[320px] w-full rounded-3xl md:h-[360px]" />
            <MindCanvasBorder />
          </div>

          {/* Mess falls in from above, rotating, and settles into a sitting tilt. */}
          <motion.div
            className="pointer-events-none absolute left-1 h-50 w-50 md:left-6 md:h-48 md:w-48"
            initial={{ x: -140, y: -500, rotate: -200, opacity: 0 }}
            animate={{ x: -140, y: -50, rotate: -8, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 110, damping: 14, mass: 1.1, delay: 0.1 }}
          >
            <Image
              src="/images/strength-finder/character/mess-default.svg"
              alt="MESS"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        <div className="mt-6 flex justify-center">
          <RiasecCtaButton size="lg" onClick={onNext}>
            เริ่มเดินทาง
            {/* Arrow gently nudges right on a loop to invite the tap forward. */}
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
