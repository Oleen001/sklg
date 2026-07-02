'use client'

import { useEffect } from 'react'

import { interpolate } from 'flubber'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'

import { riasecInstructionBg, riasecMorphLetters } from '@/features/riasec-test/constants'
import type { RiasecMorphLetter } from '@/features/riasec-test/constants'

const SVG_CLASS = 'h-32 w-24 md:h-48 md:w-40'

const mixer = (from: string, to: string) => interpolate(from, to, { maxSegmentLength: 4 })

// Loops a progress value 0 → 1 → 0 (mirror) with a per-letter start delay.
function useMorphProgress(delay: number): MotionValue<number> {
  const progress = useMotionValue(0)
  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 0.8,
      delay,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'mirror',
      repeatDelay: 1.4,
    })
    return () => controls.stop()
  }, [progress, delay])
  return progress
}

function BodyPath({ color, d }: { color: string; d: MotionValue<string> }) {
  return (
    <motion.path
      d={d}
      fill={color}
      stroke={color}
      strokeWidth={12}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

function MorphLetterSolid({ shape, letter, color, delay }: RiasecMorphLetter & { delay: number }) {
  const progress = useMorphProgress(delay)
  const d = useTransform(progress, [0, 1], [shape, letter], { mixer })
  return (
    <svg viewBox="0 0 144 160" className={SVG_CLASS} aria-hidden>
      <BodyPath color={color} d={d} />
    </svg>
  )
}

function MorphLetterHoled({
  shape,
  letter,
  holeShape,
  holeLetter,
  color,
  delay,
}: RiasecMorphLetter & { holeShape: string; holeLetter: string; delay: number }) {
  const progress = useMorphProgress(delay)
  const outer = useTransform(progress, [0, 1], [shape, letter], { mixer })
  // The counter is a separate overlay (page-coloured) that grows from an
  // invisible point, so the random shape stays solid — no hole at the start.
  const hole = useTransform(progress, [0, 1], [holeShape, holeLetter], { mixer })
  return (
    <svg viewBox="0 0 144 160" className={SVG_CLASS} aria-hidden>
      <BodyPath color={color} d={outer} />
      <motion.path d={hole} fill={riasecInstructionBg} />
    </svg>
  )
}

export function RiasecMorph() {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-3" role="img" aria-label="RIASEC">
      {riasecMorphLetters.map((item, index) =>
        item.holeShape && item.holeLetter ? (
          <MorphLetterHoled
            key={item.code}
            {...item}
            holeShape={item.holeShape}
            holeLetter={item.holeLetter}
            delay={index * 0.18}
          />
        ) : (
          <MorphLetterSolid key={item.code} {...item} delay={index * 0.18} />
        ),
      )}
    </div>
  )
}
