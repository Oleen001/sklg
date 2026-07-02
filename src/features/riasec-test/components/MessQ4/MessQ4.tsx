'use client'

import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { motion } from 'motion/react'

// The MESS character. Tools get dragged onto its left hand.
const MESS_Q4_SRC = '/images/strength-finder/character/mess-question4.svg'
const CHAR_RATIO = 582 / 472 // viewBox aspect of the character art
const CHAR_WIDTH_FRAC = 0.42 // character width as a fraction of the play area

// The drop slot sits on the character's left hand — the black arm tip at the
// lower-left of the art (viewBox tip ≈ x32, y325 of the 582×472 box).
const HAND_CX_FRAC = 0.06 // x of the slot within the character box
const HAND_CY_FRAC = 0.68 // y of the slot within the character box
const HAND_HIT_FRAC = 0.18 // hit radius as a fraction of the character box width

// Draggable tool tiles.
const TOOLS = [
  { id: 'tool-1', src: '/images/strength-finder/tool/tool-1.svg' },
  { id: 'tool-2', src: '/images/strength-finder/tool/tool-2.svg' },
  { id: 'tool-3', src: '/images/strength-finder/tool/tool-3.svg' },
  { id: 'tool-4', src: '/images/strength-finder/tool/tool-4.svg' },
  { id: 'tool-5', src: '/images/strength-finder/tool/tool-5.svg' },
  { id: 'tool-6', src: '/images/strength-finder/tool/tool-6.svg' },
  { id: 'tool-7', src: '/images/strength-finder/tool/tool-7.svg' },
  { id: 'tool-8', src: '/images/strength-finder/tool/tool-8.svg' },
] as const

const TOOL_W = 80
const TOOL_H = 100

// Canvas (play area) height in px. Width is always full (`w-full`).
const CANVAS_H = 360

// Resting scatter spots (top-left, as fractions of the play area). Kept around
// the top + sides so they never start on top of the character or its hands.
const SCATTER_ANCHORS = [
  { fx: 0.03, fy: 0.04 },
  { fx: 0.3, fy: 0 },
  { fx: 0.58, fy: 0.02 },
  { fx: 0.84, fy: 0.05 },
  { fx: 0.02, fy: 0.3 },
  { fx: 0.85, fy: 0.3 },
  { fx: 0.03, fy: 0.55 },
  { fx: 0.86, fy: 0.55 },
] as const

interface ToolState {
  id: string
  src: string
  held: boolean
  // Free (scattered) position as fractions of the play area.
  fx: number
  fy: number
}

function seedTools(): Record<string, ToolState> {
  const order = SCATTER_ANCHORS.map((_, i) => i)
  // Shuffle which tool lands on which anchor.
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  const seeded: Record<string, ToolState> = {}
  TOOLS.forEach((tool, i) => {
    const anchor = SCATTER_ANCHORS[order[i]]
    seeded[tool.id] = {
      id: tool.id,
      src: tool.src,
      held: false,
      fx: anchor.fx + (Math.random() - 0.5) * 0.05,
      fy: anchor.fy + (Math.random() - 0.5) * 0.05,
    }
  })
  return seeded
}

export function MessQ4() {
  const playRef = useRef<HTMLDivElement>(null)
  const toolRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [size, setSize] = useState({ w: 0, h: 0 })
  // Seed each tool at a jittered scatter anchor once. Tools aren't rendered until
  // the play area is measured (client-only), so the randomness can't cause a
  // hydration mismatch.
  const [tools, setTools] = useState<Record<string, ToolState>>(seedTools)
  const [heldOrder, setHeldOrder] = useState<string[]>([])

  // Measure the play area (and keep it current on resize) so px positions track.
  useEffect(() => {
    const node = playRef.current
    if (!node) return
    const measure = () => {
      const rect = node.getBoundingClientRect()
      setSize({ w: rect.width, h: rect.height })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Character box geometry within the play area.
  const charW = size.w * CHAR_WIDTH_FRAC
  const charH = charW / CHAR_RATIO
  const charLeft = (size.w - charW) / 2
  const charTop = size.h - charH

  // The hand slot center, in play-area pixels.
  const handCx = charLeft + charW * HAND_CX_FRAC
  const handCy = charTop + charH * HAND_CY_FRAC
  const hitRadius = charW * HAND_HIT_FRAC

  // Target translate (top-left) for a given tool.
  const positionOf = (id: string) => {
    const tool = tools[id]
    if (!tool) return { x: 0, y: 0 }
    if (tool.held) {
      const i = heldOrder.indexOf(id)
      // Gather placed tools on the hand with a slight fan + lift per item.
      return {
        x: handCx - TOOL_W / 2 + (i - (heldOrder.length - 1) / 2) * 18,
        y: handCy - TOOL_H / 2 - i * 6,
      }
    }
    return { x: tool.fx * size.w, y: tool.fy * size.h }
  }

  const handleDragEnd = (id: string) => {
    const play = playRef.current
    const node = toolRefs.current[id]
    if (!play || !node) return
    const areaRect = play.getBoundingClientRect()
    const toolRect = node.getBoundingClientRect()
    const centerX = toolRect.left + toolRect.width / 2 - areaRect.left
    const centerY = toolRect.top + toolRect.height / 2 - areaRect.top

    const inHand = Math.hypot(centerX - handCx, centerY - handCy) <= hitRadius

    setTools((prev) => {
      const cur = prev[id]
      if (!cur) return prev
      if (inHand) {
        return { ...prev, [id]: { ...cur, held: true } }
      }
      // Dropped loose — leave it where it landed.
      return {
        ...prev,
        [id]: {
          ...cur,
          held: false,
          fx: (toolRect.left - areaRect.left) / areaRect.width,
          fy: (toolRect.top - areaRect.top) / areaRect.height,
        },
      }
    })

    setHeldOrder((prev) => {
      const without = prev.filter((heldId) => heldId !== id)
      return inHand ? [...without, id] : without
    })
  }

  const ready = size.w > 0 && Object.keys(tools).length > 0

  return (
    <div
      ref={playRef}
      className="relative w-full touch-none select-none"
      style={{ height: CANVAS_H }}
    >
      {/* Character pinned to the bottom-center. */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{ width: `${CHAR_WIDTH_FRAC * 100}%`, aspectRatio: `${CHAR_RATIO}` }}
      >
        <Image src={MESS_Q4_SRC} alt="" fill sizes="440px" className="object-contain" priority />
      </div>

      {/* Draggable tools. */}
      {ready &&
        TOOLS.map((tool) => {
          const pos = positionOf(tool.id)
          return (
            <motion.div
              key={tool.id}
              ref={(node) => {
                toolRefs.current[tool.id] = node
              }}
              drag
              dragConstraints={playRef}
              dragElastic={0.12}
              dragMomentum={false}
              whileDrag={{ scale: 1.12, zIndex: 50 }}
              onDragEnd={() => handleDragEnd(tool.id)}
              className="absolute left-0 top-0 z-20 cursor-grab active:cursor-grabbing"
              style={{ width: TOOL_W, height: TOOL_H }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ x: pos.x, y: pos.y, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.7 }}
            >
              <Image
                src={tool.src}
                alt="เครื่องมือ"
                fill
                sizes="58px"
                className="pointer-events-none object-contain"
              />
            </motion.div>
          )
        })}
    </div>
  )
}
