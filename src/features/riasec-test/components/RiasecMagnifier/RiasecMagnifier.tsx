'use client'

import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

// Hidden things to find — the 11 MESS characters (mess-1 … mess-11), picked at
// random. MESS_COUNT is how many image FILES exist; SCATTER_COUNT is how many
// items appear on screen — the picker reuses files (with repeats), so the
// on-screen count can exceed the number of files.
const MESS_COUNT = 11
const SOURCES = Array.from(
  { length: MESS_COUNT },
  (_, i) => `/images/strength-finder/character/mess-${i + 1}.svg`,
)
const SCATTER_COUNT = 18

// tool-9.svg geometry (viewBox units): the clear lens inside the ring.
const GLASS_SRC = '/images/strength-finder/tool/tool-9.svg'
const GLASS_W = 300
const VB = 58
const LENS_CX = 35
const LENS_CY = 22
const LENS_R = 20
const MAGNIFY = 1.4

interface Placement {
  src: string
  left: number // %
  top: number // %
  size: number // px
  rot: number // deg
}

// Scatter the items in the four margins so they sit AROUND the centered card,
// not on top of it.
function seedPlacements(): Placement[] {
  return Array.from({ length: SCATTER_COUNT }, (_, i) => {
    let left: number
    let top: number
    switch (i % 4) {
      case 0: // left gutter
        left = 1 + Math.random() * 15
        top = 5 + Math.random() * 86
        break
      case 1: // right gutter
        left = 84 + Math.random() * 15
        top = 5 + Math.random() * 86
        break
      case 2: // top strip
        left = 5 + Math.random() * 86
        top = 2 + Math.random() * 14
        break
      default: // bottom strip
        left = 5 + Math.random() * 86
        top = 84 + Math.random() * 14
    }
    return {
      src: SOURCES[Math.floor(Math.random() * SOURCES.length)],
      left,
      top,
      size: 46 + Math.random() * 44,
      rot: (Math.random() - 0.5) * 40,
    }
  })
}

// Rendered twice: hidden in the background, and visible inside the lens.
function ItemsLayer({ items }: { readonly items: Placement[] }) {
  return (
    <>
      {items.map((it) => (
        <div
          key={`${it.src}-${it.left}-${it.top}`}
          className="absolute"
          style={{
            left: `${it.left}%`,
            top: `${it.top}%`,
            width: it.size,
            height: it.size,
            transform: `translate(-50%, -50%) rotate(${it.rot}deg)`,
          }}
        >
          <Image src={it.src} alt="" fill sizes="90px" className="object-contain" />
        </div>
      ))}
    </>
  )
}

export function RiasecMagnifier() {
  const layerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  // Items aren't rendered until measured (client only) → no hydration mismatch.
  const [items] = useState(seedPlacements)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [lens, setLens] = useState({ x: 0, y: 0 }) // lens center in viewport px

  useEffect(() => {
    const node = layerRef.current
    if (!node) return
    const measure = () => {
      const rect = node.getBoundingClientRect()
      setSize({ w: rect.width, h: rect.height })
      setLens((prev) =>
        prev.x === 0 && prev.y === 0 ? { x: rect.width / 2, y: rect.height * 0.36 } : prev,
      )
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const ready = size.w > 0

  const scale = GLASS_W / VB
  const glassH = VB * scale
  const lensCx = LENS_CX * scale
  const lensCy = LENS_CY * scale
  const diameter = LENS_R * scale * 2

  const moveTo = (event: ReactPointerEvent<HTMLDivElement>) => {
    const node = layerRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    setLens({
      x: clamp(event.clientX - rect.left, 0, rect.width),
      y: clamp(event.clientY - rect.top, 0, rect.height),
    })
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    moveTo(event)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) moveTo(event)
  }

  const handlePointerUp = () => {
    draggingRef.current = false
  }

  // Click-through layer scoped to the positioned parent (the question box), so
  // it scrolls with the page instead of sticking to the viewport. Only the
  // glass captures the pointer.
  return (
    <div ref={layerRef} className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      {/* Hidden items — invisible until the lens passes over. */}
      {ready && (
        <div className="absolute inset-0 opacity-0">
          <ItemsLayer items={items} />
        </div>
      )}

      {/* Lens — circular window showing the items, magnified. */}
      {ready && (
        <div
          className="pointer-events-none absolute overflow-hidden rounded-full"
          style={{
            left: lens.x - diameter / 2,
            top: lens.y - diameter / 2,
            width: diameter,
            height: diameter,
            boxShadow: 'inset 0 0 14px rgba(0,0,0,0.12)',
          }}
        >
          <div
            className="absolute"
            style={{
              width: size.w,
              height: size.h,
              left: diameter / 2 - lens.x * MAGNIFY,
              top: diameter / 2 - lens.y * MAGNIFY,
              transform: `scale(${MAGNIFY})`,
              transformOrigin: 'top left',
            }}
          >
            <ItemsLayer items={items} />
          </div>
        </div>
      )}

      {/* Magnifier glass — hold and drag to investigate. */}
      <div
        className="pointer-events-auto absolute cursor-grab touch-none active:cursor-grabbing"
        style={{ left: lens.x - lensCx, top: lens.y - lensCy, width: GLASS_W, height: glassH }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <Image
          src={GLASS_SRC}
          alt="แว่นขยาย"
          fill
          sizes="200px"
          priority
          className="pointer-events-none object-contain"
        />
      </div>
    </div>
  )
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}
