'use client'

import { type PointerEvent as ReactPointerEvent, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { MessBlinkStyle, MessBlob } from '@/features/riasec-test/components/MessBlob'
import { riasecCharacterColors } from '@/features/riasec-test/constants'

const BLOB_COUNT = 13
const STAR_COUNT = 5

interface Item {
  id: string
  kind: 'blob' | 'star'
  color: string
  blinkDelay: string
}

// Deterministic descriptor (no Math.random) so the seed and the render agree on
// which bodies are stars. Positions/velocities are randomized later in the
// effect. Stars come after the blobs.
const ITEMS: Item[] = Array.from({ length: BLOB_COUNT + STAR_COUNT }, (_, i) => ({
  id: i < BLOB_COUNT ? `blob-${i}` : `star-${i - BLOB_COUNT}`,
  kind: i < BLOB_COUNT ? 'blob' : 'star',
  color: riasecCharacterColors[i % riasecCharacterColors.length],
  blinkDelay: `${((i * 911) % 400) / 100}s`,
}))

// Physics tuning (units are px / frame at ~60fps).
const GRAVITY = 1.6 // gentle stacking — settles without slamming
const RESTITUTION = 0.1 // very low bounce off other bodies (dead weight) — keeps stacks stable
const FLOOR_RESTITUTION = 0.5 // bounce when landing on the floor
const WALL_RESTITUTION = 0.12 // very low bounce off side walls / ceiling
const AIR_DRAG = 0.993 // light drag — a throw keeps its momentum (mass)
const GROUND_FRICTION = 0.95 // high — bodies grip the floor and don't slide apart
const ANGULAR_DRAG = 0.96 // spin bleeds off fairly quickly
const THROW_SPIN = 0.35 // how much a throw's speed turns into spin on release
const ROLL_COUPLING = 0.08 // how much horizontal motion turns into spin on the floor
const CONTACT_FRICTION = 0.35 // grip between touching bodies so they stack, not roll off
const REST_SPEED = 0.6 // below this a body counts as "still"
const REST_SPIN_DAMP = 0.8 // when still, spin dies fast (no spinning at rest)
// "Elevator down" float: the pile only partially follows the page scroll, so it
// lags behind (descends slower than the screen → floats), then gravity pulls it
// back down and it bounces on landing.
const SCROLL_FOLLOW = 0.55 // fraction of a downward scroll the pile drifts up with
const SLEEP_SPEED = 0.3 // below this, velocity is zeroed so the pile settles
const SPIN_SLEEP = 0.25 // below this, spin is zeroed so settled bodies hold their angle

interface Body {
  x: number // center x within the box
  y: number // center y within the box
  vx: number
  vy: number
  va: number // angular velocity (deg / frame)
  r: number
  color: string
  rot: number
}

export function MessQ2() {
  const boxRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const bodiesRef = useRef<Body[]>([])
  const sizeRef = useRef({ w: 0, h: 0 })
  const dragRef = useRef<{
    index: number
    offsetX: number
    offsetY: number
    px: number
    py: number
  } | null>(null)

  useEffect(() => {
    const box = boxRef.current
    if (!box) return

    const seed = () => {
      const { w, h } = sizeRef.current
      if (!w || !h) return
      const baseR = Math.max(26, Math.min(46, w / 11))
      bodiesRef.current = ITEMS.map((item) => {
        const r = item.kind === 'star' ? baseR * 0.72 : baseR // stars a touch smaller
        return {
          x: r + Math.random() * Math.max(1, w - 2 * r),
          y: r + Math.random() * Math.max(1, h - 2 * r), // scattered → they tumble into a pile
          vx: (Math.random() - 0.5) * 4,
          vy: 0,
          va: (Math.random() - 0.5) * 3,
          r,
          color: item.color,
          rot: (Math.random() - 0.5) * 40,
        }
      })
    }

    // Measure the box and (re)seed once we have real dimensions.
    const measure = () => {
      const rect = box.getBoundingClientRect()
      const had = sizeRef.current.w > 0
      sizeRef.current = { w: rect.width, h: rect.height }
      if (!had && rect.width > 0) seed()
    }
    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(box)

    // Scrolling down drifts the pile up by only a fraction of the scroll, so it
    // lags behind the page (descends slower than the screen → floats). Gravity
    // then pulls it back down and it bounces on landing.
    let lastScrollY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const dy = y - lastScrollY
      lastScrollY = y
      if (dy <= 0) return // only scrolling down floats them
      const shift = dy * SCROLL_FOLLOW
      bodiesRef.current.forEach((b, i) => {
        if (dragRef.current?.index === i) return
        b.y = Math.max(b.r, b.y - shift)
        if (b.vy > 0) b.vy = 0 // hang for a beat before gravity reasserts
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ---- simulation loop ----
    let raf = 0
    const step = () => {
      const { w, h } = sizeRef.current
      const bodies = bodiesRef.current
      const drag = dragRef.current

      if (w && h) {
        // Integrate + walls/floor.
        bodies.forEach((b, i) => {
          if (drag && drag.index === i) {
            // Follow the pointer; remember velocity for the throw on release.
            const tx = clamp(drag.px - drag.offsetX, b.r, w - b.r)
            const ty = clamp(drag.py - drag.offsetY, b.r, h - b.r)
            b.vx = tx - b.x
            b.vy = ty - b.y
            b.x = tx
            b.y = ty
            return
          }

          b.vy += GRAVITY
          b.vx *= AIR_DRAG
          b.vy *= AIR_DRAG
          b.x += b.vx
          b.y += b.vy
          // Spin carries its own momentum (inertia → mass feel) and bleeds off
          // slowly, instead of being slaved to horizontal velocity.
          b.va *= ANGULAR_DRAG
          b.rot += b.va

          if (b.x < b.r) {
            b.x = b.r
            b.vx = -b.vx * WALL_RESTITUTION
          } else if (b.x > w - b.r) {
            b.x = w - b.r
            b.vx = -b.vx * WALL_RESTITUTION
          }
          if (b.y > h - b.r) {
            b.y = h - b.r
            b.vy = -b.vy * FLOOR_RESTITUTION
            b.vx *= GROUND_FRICTION
            // Rolling: horizontal motion on the floor drives spin.
            b.va += b.vx * ROLL_COUPLING
            b.va *= GROUND_FRICTION
            if (Math.abs(b.vy) < SLEEP_SPEED) b.vy = 0
            if (Math.abs(b.vx) < SLEEP_SPEED) b.vx = 0
          } else if (b.y < b.r) {
            b.y = b.r
            b.vy = -b.vy * WALL_RESTITUTION
          }

          // Rotate naturally while moving, but kill the spin once the body is
          // essentially still — settled bodies in the pile don't keep turning.
          if (Math.abs(b.vx) + Math.abs(b.vy) < REST_SPEED) {
            b.va *= REST_SPIN_DAMP
            if (Math.abs(b.va) < SPIN_SLEEP) b.va = 0
          }
        })

        // Resolve overlaps so they stack like stones (a few passes = stable pile).
        for (let pass = 0; pass < 4; pass++) {
          for (let i = 0; i < bodies.length; i++) {
            for (let j = i + 1; j < bodies.length; j++) {
              const a = bodies[i]
              const c = bodies[j]
              const dx = c.x - a.x
              const dy = c.y - a.y
              const dist = Math.hypot(dx, dy) || 0.01
              const minDist = a.r + c.r
              if (dist < minDist) {
                const nx = dx / dist
                const ny = dy / dist
                const overlap = minDist - dist
                const aDragged = drag?.index === i
                const cDragged = drag?.index === j
                // Push apart (a dragged body is immovable; the other takes the full push).
                if (aDragged && !cDragged) {
                  c.x += nx * overlap
                  c.y += ny * overlap
                } else if (cDragged && !aDragged) {
                  a.x -= nx * overlap
                  a.y -= ny * overlap
                } else if (!aDragged && !cDragged) {
                  a.x -= nx * overlap * 0.5
                  a.y -= ny * overlap * 0.5
                  c.x += nx * overlap * 0.5
                  c.y += ny * overlap * 0.5
                  // Exchange velocity along the collision normal.
                  const rel = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny
                  if (rel < 0) {
                    const imp = -rel * 0.5 * (1 + RESTITUTION)
                    a.vx -= imp * nx
                    a.vy -= imp * ny
                    c.vx += imp * nx
                    c.vy += imp * ny
                  }
                  // Tangential friction: damp sliding between the two so they
                  // grip and stack instead of rolling/spinning off each other.
                  const tx = -ny
                  const ty = nx
                  const relT = (c.vx - a.vx) * tx + (c.vy - a.vy) * ty
                  const fric = relT * CONTACT_FRICTION
                  a.vx += fric * tx
                  a.vy += fric * ty
                  c.vx -= fric * tx
                  c.vy -= fric * ty
                }
              }
            }
          }
        }
      }

      // Paint.
      bodies.forEach((b, i) => {
        const node = nodeRefs.current[i]
        if (node) {
          node.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px) rotate(${b.rot}deg)`
          node.style.width = `${b.r * 2}px`
          node.style.height = `${b.r * 2}px`
        }
      })

      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Grab a character: pointer capture on the node routes move/up here even when
  // the pointer leaves the small element, so dragging anywhere on screen works.
  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>, index: number) => {
    const box = boxRef.current
    const b = bodiesRef.current[index]
    if (!box || !b) return
    const rect = box.getBoundingClientRect()
    const px = event.clientX - rect.left
    const py = event.clientY - rect.top
    dragRef.current = { index, offsetX: px - b.x, offsetY: py - b.y, px, py }
    b.vx = 0
    b.vy = 0
    b.va = 0
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const box = boxRef.current
    if (!drag || !box) return
    const rect = box.getBoundingClientRect()
    drag.px = event.clientX - rect.left
    drag.py = event.clientY - rect.top
  }

  const handlePointerUp = () => {
    // On release, turn the throw's speed into spin so a flung body tumbles
    // naturally (and its retained velocity carries the mass).
    const drag = dragRef.current
    if (drag) {
      const b = bodiesRef.current[drag.index]
      if (b) b.va = b.vx * THROW_SPIN
    }
    dragRef.current = null
  }

  if (typeof document === 'undefined') return null

  // The whole screen is the box. The overlay is click-through (pointer-events-none)
  // so the form/buttons behind stay usable; only the characters capture pointers.
  return createPortal(
    <div ref={boxRef} className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      <MessBlinkStyle />
      {ITEMS.map((item, i) => (
        <div
          key={item.id}
          ref={(node) => {
            nodeRefs.current[i] = node
          }}
          className="pointer-events-auto absolute left-0 top-0 cursor-grab touch-none active:cursor-grabbing"
          onPointerDown={(event) => handlePointerDown(event, i)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {item.kind === 'star' ? (
            <Star />
          ) : (
            <MessBlob color={item.color} blinkDelay={item.blinkDelay} />
          )}
        </div>
      ))}
    </div>,
    document.body,
  )
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

// Inline star (matches the MessBlob pattern: scales to its h-full/w-full box).
function Star() {
  return (
    <svg viewBox="0 0 208 201" fill="none" className="h-full w-full select-none">
      <path
        d="M99.235 2.81021C101.06 -0.936687 106.4 -0.9367 108.225 2.81019L136.372 60.5859C137.095 62.0705 138.505 63.1022 140.139 63.3427L203.183 72.6231C207.264 73.2238 208.903 78.2292 205.968 81.1275L160.267 126.256C159.106 127.402 158.578 129.041 158.85 130.649L169.627 194.305C170.32 198.398 166.011 201.504 162.347 199.552L106.08 169.585C104.611 168.803 102.849 168.803 101.38 169.585L45.113 199.552C41.4487 201.504 37.1397 198.398 37.8327 194.305L48.61 130.649C48.8822 129.041 48.3535 127.402 47.1934 126.256L1.4922 81.1275C-1.44289 78.2292 0.196254 73.2238 4.27722 72.6231L67.3214 63.3427C68.9552 63.1022 70.3649 62.0705 71.0882 60.5859L99.235 2.81021Z"
        fill="#FFD108"
      />
    </svg>
  )
}
