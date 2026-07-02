import { useId, type ReactNode } from 'react'

import { cn } from '@/libs/utils.lib'

import { PROGRESS_RING_COLOR_MAP, type ProgressRingColor } from './progress-ring.variants'

export interface ProgressRingSegment {
  /** Share of the whole ring this segment fills, in percent (0–100). */
  value: number
  color: ProgressRingColor
}

export interface SegmentedProgressRingProps {
  segments: ProgressRingSegment[]
  size?: number
  strokeWidth?: number
  /** Gap between adjacent segments, in degrees. */
  gap?: number
  trackColor?: string
  /** Small caption rendered above the main label. */
  topLabel?: ReactNode
  /** Main center content (e.g. the percentage). */
  label?: ReactNode
  /** Pill rendered below the main label (e.g. "4/15"). */
  chip?: ReactNode
  className?: string
}

const SEGMENTED_RING_GAP_DEGREES = 3
const SEGMENTED_RING_TRACK_COLOR = '#eaeaea'
const HARD_ALPHA_MATRIX = '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
const WHITE_MATRIX = '0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0'

export const SegmentedProgressRing = ({
  segments,
  size = 184,
  strokeWidth,
  gap = SEGMENTED_RING_GAP_DEGREES,
  trackColor = SEGMENTED_RING_TRACK_COLOR,
  topLabel,
  label,
  chip,
  className,
}: SegmentedProgressRingProps) => {
  const reactId = useId()
  const highlightId = `spr-hl-${reactId}`

  const sw = strokeWidth ?? Math.round(size * 0.06)
  const radius = (size - sw) / 2
  const center = size / 2

  // Round caps extend each segment by half a stroke width; widen the raw gap so
  // the *visible* cap-to-cap spacing matches the requested `gap` in degrees.
  const capPercent = (sw / 2 / (2 * Math.PI * radius)) * 100
  const gapPercent = (gap / 360) * 100 + 2 * capPercent

  // Lay segments end-to-end from the top (12 o'clock). Gaps sit only *between*
  // segments — the first starts at the top, the last ends without a trailing gap.
  const lastIndex = segments.length - 1
  const spans = segments.map((segment) => Math.min(100, Math.max(0, segment.value)))
  const totalFilled = spans.reduce((sum, span) => sum + span, 0)
  const arcs = segments.map((segment, index) => {
    const start = spans.slice(0, index).reduce((sum, span) => sum + span, 0)
    const span = spans[index]
    const startDraw = start + (index === 0 ? 0 : gapPercent / 2)
    const endDraw = start + span - (index === lastIndex ? 0 : gapPercent / 2)
    const drawn = Math.max(0, endDraw - startDraw)
    return {
      key: index,
      color: PROGRESS_RING_COLOR_MAP[segment.color].solid,
      dashArray: `${drawn} ${100 - drawn}`,
      dashOffset: -startDraw,
    }
  })

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(totalFilled)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('relative inline-flex shrink-0 items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="block" aria-hidden>
        <defs>
          {/* Soft white highlight along the inner edge of each segment. */}
          <filter
            id={highlightId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values={HARD_ALPHA_MATRIX} result="ha" />
            <feOffset dy={size * 0.0163} />
            <feGaussianBlur stdDeviation={size * 0.0109} />
            <feComposite in2="ha" operator="arithmetic" k2={-1} k3={1} />
            <feColorMatrix type="matrix" values={`${WHITE_MATRIX} 0.5 0`} />
            <feBlend mode="normal" in2="shape" />
          </filter>
        </defs>

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={sw}
        />

        <g transform={`rotate(-90 ${center} ${center})`}>
          {arcs.map((arc) => (
            <circle
              key={arc.key}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={arc.color}
              strokeWidth={sw}
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={arc.dashArray}
              strokeDashoffset={arc.dashOffset}
              filter={`url(#${highlightId})`}
              style={{ transition: 'stroke-dasharray 400ms ease-out' }}
            />
          ))}
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 px-6 text-center">
        {topLabel ? <div className="text-text-base-primary">{topLabel}</div> : null}
        {label ? <div className="text-text-base-primary">{label}</div> : null}
        {chip ? <div className="pointer-events-auto">{chip}</div> : null}
      </div>
    </div>
  )
}
