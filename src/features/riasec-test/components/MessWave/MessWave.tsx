'use client'

import { createPortal } from 'react-dom'

import { motion } from 'motion/react'

import { MessBlinkStyle, MessBlob } from '@/features/riasec-test/components/MessBlob'
import { riasecCharacterColors, riasecWaveColors } from '@/features/riasec-test/constants'

// Three stacked wave layers (back → front). Each path spans two full cycles
// (viewBox is 2880 wide), so animating x from 0% → -50% on a 200%-wide track
// scrolls exactly one cycle and loops seamlessly. No scroll-driven parallax.
const LAYERS = [
  {
    path: 'M0,160 C360,120 360,120 720,160 C1080,200 1080,200 1440,160 C1800,120 1800,120 2160,160 C2520,200 2520,200 2880,160 L2880,500 L0,500 Z',
    duration: 13,
  },
  {
    path: 'M0,250 C360,220 360,220 720,250 C1080,280 1080,280 1440,250 C1800,220 1800,220 2160,250 C2520,280 2520,280 2880,250 L2880,500 L0,500 Z',
    duration: 9,
  },
  {
    path: 'M0,340 C360,322 360,322 720,340 C1080,358 1080,358 1440,340 C1800,322 1800,322 2160,340 C2520,358 2520,358 2880,340 L2880,500 L0,500 Z',
    duration: 6,
  },
]

// Hand-placed characters. One entry = one character.
//   left / bottom — position in % of the wave band
//   size          — diameter in px
//   zIndex        — layering vs the waves (waves are odd: back 1 · mid 3 · front 5;
//                   use even here, e.g. 4 = behind the front wave, 6 = in front of all)
//   drift / sway / duration / delay — the bob animation
const FLOATERS = [
  {
    color: riasecCharacterColors[3],
    left: 18, // %
    bottom: -5, // % up the band
    size: 220, // px
    zIndex: 3,
    drift: 12, // px bob
    sway: 4, // deg
    duration: 4, // s
    delay: 0, // s
    blinkDelay: '0s',
  },
] as const

export function MessWave() {
  if (typeof document === 'undefined') return null

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-48 w-screen overflow-hidden md:h-56">
      <MessBlinkStyle />
      {/* Wave layers — horizontal scroll only (no parallax). */}
      {LAYERS.map((layer, i) => (
        <motion.div
          key={layer.path}
          className="absolute inset-y-0 left-0"
          style={{ width: '200%', zIndex: (i + 1) * 2 - 1 }} // back 1 · mid 3 · front 5
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: layer.duration, ease: 'linear' }}
        >
          <svg viewBox="0 0 2880 500" preserveAspectRatio="none" className="h-full w-full">
            <path d={layer.path} fill={riasecWaveColors[i]} />
          </svg>
        </motion.div>
      ))}

      {/* Floating MESS characters bobbing on the surface. */}
      {FLOATERS.map((f) => (
        <motion.div
          key={`${f.left}-${f.bottom}-${f.color}`}
          className="absolute"
          style={{
            left: `${f.left}%`,
            bottom: `${f.bottom}%`,
            width: f.size,
            height: f.size,
            zIndex: f.zIndex,
          }}
          animate={{ y: [0, -f.drift, 0], rotate: [-f.sway, f.sway, -f.sway] }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MessBlob color={f.color} blinkDelay={f.blinkDelay} />
        </motion.div>
      ))}
    </div>,
    document.body,
  )
}
