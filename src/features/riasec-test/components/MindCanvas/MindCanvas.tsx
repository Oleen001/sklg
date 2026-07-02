'use client'

import { useEffect, useRef, useState } from 'react'

import { Eraser, Pencil, Trash2 } from 'lucide-react'

import { cn } from '@/libs/utils.lib'

type Tool = 'pencil' | 'eraser'

const PENCIL_COLOR = '#A9C1F9'
const PENCIL_WIDTH = 4
const ERASER_WIDTH = 26

// How long the pre-drawn mess takes to draw itself in on mount.
const MESS_DRAW_MS = 800
// How long to wait (from mount) before the mess line starts drawing.
const MESS_DELAY_MS = 600

interface Point {
  x: number
  y: number
}

// Builds the points of the pre-drawn "mess" the user starts with — one continuous
// scribble that loops around the canvas like tangled thoughts. Deterministic (no
// randomness) so it looks the same on every render. It's animated on (drawn
// stroke-by-stroke) in the mount effect, and the eraser/clear tools remove it
// like any other ink.
function buildMessPoints(width: number, height: number): Point[] {
  const cx = width / 2
  const cy = height / 2
  const ax = width * 0.3
  const ay = height * 0.3
  const steps = 420

  const points: Point[] = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    points.push({
      x: cx + ax * (0.8 * Math.sin(5 * t + 0.4) + 0.2 * Math.sin(10 * t)),
      y: cy + ay * (0.8 * Math.sin(4 * t) + 0.2 * Math.cos(7 * t)),
    })
  }
  return points
}

interface MindCanvasProps {
  className?: string
}

// A freehand drawing surface — the "mind" of the Mess character. Pencil draws,
// eraser removes, and the cursor turns into the active tool's icon over the canvas.
export function MindCanvas({ className }: MindCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const last = useRef<Point | null>(null)
  const messRaf = useRef<number | null>(null)

  const [tool, setTool] = useState<Tool>('pencil')
  const [cursor, setCursor] = useState<Point | null>(null)

  // Halts the intro draw-in animation (once the user interacts or clears).
  const stopMessAnimation = () => {
    if (messRaf.current !== null) {
      cancelAnimationFrame(messRaf.current)
      messRaf.current = null
    }
  }

  // Size the bitmap to the container (accounting for device pixel ratio), then
  // animate the mess line drawing itself in stroke-by-stroke (SVG-style path draw).
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const rect = wrap.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    const points = buildMessPoints(rect.width, rect.height)
    let start = 0 // set lazily on the first frame so MESS_DELAY_MS isn't counted as elapsed
    let drawn = 0 // index of the last segment already stroked

    const step = (now: number) => {
      if (!start) start = now
      const progress = Math.min(1, (now - start) / MESS_DRAW_MS)
      const target = Math.floor(progress * (points.length - 1))
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = PENCIL_COLOR
      ctx.lineWidth = PENCIL_WIDTH
      // Stroke only the newly-revealed segments this frame (cheap + additive).
      while (drawn < target) {
        ctx.beginPath()
        ctx.moveTo(points[drawn].x, points[drawn].y)
        ctx.lineTo(points[drawn + 1].x, points[drawn + 1].y)
        ctx.stroke()
        drawn++
      }
      messRaf.current = progress < 1 ? requestAnimationFrame(step) : null
    }

    // Hold off the draw until MESS_DELAY_MS has passed since mount.
    const timer = setTimeout(() => {
      messRaf.current = requestAnimationFrame(step)
    }, MESS_DELAY_MS)

    return () => {
      clearTimeout(timer)
      if (messRaf.current !== null) cancelAnimationFrame(messRaf.current)
    }
  }, [])

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  const stroke = (from: Point, to: Point) => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over'
    ctx.strokeStyle = PENCIL_COLOR
    ctx.lineWidth = tool === 'eraser' ? ERASER_WIDTH : PENCIL_WIDTH
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
  }

  const handleDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    stopMessAnimation() // hand the canvas over to the user
    event.currentTarget.setPointerCapture(event.pointerId)
    drawing.current = true
    const point = getPoint(event)
    last.current = point
    stroke(point, { x: point.x + 0.01, y: point.y + 0.01 }) // a dot for taps
  }

  const handleMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = getPoint(event)
    setCursor(point)
    if (!drawing.current || !last.current) return
    stroke(last.current, point)
    last.current = point
  }

  const stop = () => {
    drawing.current = false
    last.current = null
  }

  const handleLeave = () => {
    setCursor(null)
    stop()
  }

  const clear = () => {
    stopMessAnimation() // don't let the intro keep re-drawing after a wipe
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const CursorIcon = tool === 'eraser' ? Eraser : Pencil

  return (
    <div ref={wrapRef} className={cn('relative overflow-hidden', className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-none touch-none"
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={stop}
        onPointerLeave={handleLeave}
      />

      {/* Tool-shaped cursor that follows the pointer over the canvas. */}
      {cursor && (
        <span
          aria-hidden
          className="pointer-events-none absolute z-10"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: tool === 'pencil' ? 'translate(-1px, -22px)' : 'translate(-13px, -13px)',
            color: PENCIL_COLOR, // keep the tool cursor in sync with the stroke color
          }}
        >
          <CursorIcon className="h-6 w-6" />
        </span>
      )}

      {/* Toolbar: pencil (default) · eraser · clear */}
      <div className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-full border border-border-base-gray-medium bg-fill-base-white p-1">
        <ToolButton label="ดินสอ" active={tool === 'pencil'} onClick={() => setTool('pencil')}>
          <Pencil className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="ยางลบ" active={tool === 'eraser'} onClick={() => setTool('eraser')}>
          <Eraser className="h-4 w-4" />
        </ToolButton>
        <button
          type="button"
          aria-label="ลบทั้งหมด"
          onClick={clear}
          className="flex h-9 w-9 items-center justify-center rounded-full text-text-base-secondary hover:bg-bg-base-gray-light"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

interface ToolButtonProps {
  label: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function ToolButton({ label, active, onClick, children }: ToolButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
        active ? 'text-text-base-white' : 'text-text-base-secondary hover:bg-bg-base-gray-light',
      )}
      // Active pill uses the shared stroke color so the toolbar matches the ink.
      style={active ? { backgroundColor: PENCIL_COLOR } : undefined}
    >
      {children}
    </button>
  )
}
