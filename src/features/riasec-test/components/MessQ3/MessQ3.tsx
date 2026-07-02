'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { Play, Square } from 'lucide-react'

import { IconButton } from '@/components/ui'

// The MESS characters the slot cycles through.
const MESS_COUNT = 11
const CHARACTERS = Array.from(
  { length: MESS_COUNT },
  (_, i) => `/images/strength-finder/character/mess-${i + 1}.svg`,
)

// How fast the reel flips while spinning.
const SWITCH_MS = 100

export function MessQ3() {
  const [index, setIndex] = useState(0)
  const [spinning, setSpinning] = useState(true)

  useEffect(() => {
    if (!spinning) return
    const id = setInterval(() => {
      // Pick a random character, but never repeat the current one (keeps it lively).
      setIndex((prev) => {
        const next = Math.floor(Math.random() * CHARACTERS.length)
        return next === prev ? (next + 1) % CHARACTERS.length : next
      })
    }, SWITCH_MS)
    return () => clearInterval(id)
  }, [spinning])

  return (
    <div className="flex flex-col items-center gap-1">
      {/* All are mounted (preloaded); only the active one is visible, so the
          reel flips with no network flicker. */}
      <div className="relative h-44 w-44 md:h-56 md:w-56">
        {CHARACTERS.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="messy character"
            fill
            className={`object-contain transition-opacity duration-75 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {spinning ? (
        // Stop the reel and lock the result. Matches the next button's look:
        // white fill, dark border, hard offset shadow.
        <IconButton
          aria-label="หยุด"
          size="lg"
          className="size-12 border-3 border-fill-base-gray-dark2 bg-fill-base-white text-text-base-primary shadow-[4px_4px_0_0_var(--color-fill-base-gray-dark2)] hover:bg-bg-base-gray-light active:bg-bg-base-gray-light [&_svg]:size-5"
          onClick={() => setSpinning(false)}
        >
          <Square className="fill-current" />
        </IconButton>
      ) : (
        // Re-randomize.
        <IconButton
          aria-label="สุ่มใหม่"
          size="lg"
          className="size-12 border-3 border-fill-base-gray-dark2 bg-fill-base-white text-text-base-primary shadow-[4px_4px_0_0_var(--color-fill-base-gray-dark2)] hover:bg-bg-base-gray-light active:bg-bg-base-gray-light [&_svg]:size-5"
          onClick={() => setSpinning(true)}
        >
          <Play className="fill-current" />
        </IconButton>
      )}
    </div>
  )
}
