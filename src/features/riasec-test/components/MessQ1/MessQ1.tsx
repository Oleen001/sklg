'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import Image from 'next/image'
import { motion } from 'motion/react'

// Base artwork — body + eye whites, no pupils (pupils are the overlay below).
const MESS_Q1_SRC = '/images/strength-finder/character/mess-question1.svg'
const VIEW_W = 408
const VIEW_H = 421

// Eye-white centers (viewBox units) the pupils sit inside.
const EYES = [
  { cx: 152, cy: 210 },
  { cx: 256, cy: 210 },
] as const

const PUPIL_R = 10
const MAX_OFFSET = 24 // max pupil drift from its eye center

// Overlay pinned bottom-left. At rest it's nudged partly off-screen (the "peek");
// on mount it bounces up from below into that resting spot.
const WIDTH_VW = 40
const ROTATE_DEG = 10
const REST_X = '-10%' // resting horizontal nudge
const REST_Y = '25%' // resting vertical peek (pushes ~1/4 off the bottom)

export function MessQ1() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [pupils, setPupils] = useState<{ x: number; y: number }[]>(() =>
    EYES.map((eye) => ({ x: eye.cx, y: eye.cy })),
  )

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const svg = svgRef.current
      const ctm = svg?.getScreenCTM()
      if (!svg || !ctm) return
      const inverse = ctm.inverse()
      const point = svg.createSVGPoint()

      setPupils(
        EYES.map((eye) => {
          // Eye center → screen pixels (accounts for the overlay's rotate/scale/translate).
          point.x = eye.cx
          point.y = eye.cy
          const screenEye = point.matrixTransform(ctm)

          // Cursor direction back into SVG space — rotate/scale only, no translation.
          const sdx = event.clientX - screenEye.x
          const sdy = event.clientY - screenEye.y
          const lx = inverse.a * sdx + inverse.c * sdy
          const ly = inverse.b * sdx + inverse.d * sdy

          const dist = Math.hypot(lx, ly) || 1
          const k = Math.min(MAX_OFFSET, dist) / dist
          return { x: eye.cx + lx * k, y: eye.cy + ly * k }
        }),
      )
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  if (typeof document === 'undefined') return null

  return createPortal(
    <motion.div
      aria-hidden
      className="pointer-events-none fixed bottom-0 left-0 z-[100]"
      style={{ width: `${WIDTH_VW}vw`, transformOrigin: 'bottom left' }}
      // Bounce up from below into the resting peek position.
      initial={{ x: REST_X, y: '120%', rotate: ROTATE_DEG, opacity: 0 }}
      animate={{ x: REST_X, y: REST_Y, rotate: ROTATE_DEG, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 13, mass: 0.8, delay: 0.2 }}
    >
      {/* Box matches the artwork aspect so the eye overlay lines up. */}
      <div className="relative w-full" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
        <Image
          src={MESS_Q1_SRC}
          alt=""
          fill
          sizes={`${WIDTH_VW}vw`}
          className="object-contain"
          priority
        />

        {/* Pupils — track the cursor (whites come from the base image). */}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          fill="none"
          className="absolute inset-0 h-full w-full"
        >
          {pupils.map((pupil, index) => (
            <motion.circle
              key={index}
              r={PUPIL_R}
              fill="#231F20"
              initial={false}
              animate={{ cx: pupil.x, cy: pupil.y }}
              transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.4 }}
            />
          ))}
        </svg>
      </div>
    </motion.div>,
    document.body,
  )
}
