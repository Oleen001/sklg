'use client'

import { type ReactNode, useRef } from 'react'

import { motion, useScroll, useTransform } from 'motion/react'

interface SectionFadeOutProps {
  className?: string
  children: ReactNode
}

// Fades a section out as it scrolls off the top of the viewport, so its tail
// (a stray mascot / the parallax scene's final frame) doesn't linger visible
// above the next section sliding up over it. The fade is held until the section
// is most of the way out, then completes quickly — the section stays fully
// opaque while it's the focus, and only its lingering tail dissolves.
// opacity is safe on a wrapper around Benefits' internal sticky scene (unlike
// transform/filter, it doesn't break `position: sticky` descendants).
export function SectionFadeOut({ className, children }: SectionFadeOutProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.45, 0.85], [1, 1, 0])

  return (
    <motion.div ref={ref} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  )
}
