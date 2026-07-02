import { useId, type ReactNode } from 'react'

import { cn } from '@/libs/utils.lib'

import {
  PROGRESS_RING_COLOR_MAP,
  PROGRESS_RING_GLOSS_SHADOWS,
  PROGRESS_RING_TRACK_COLOR,
  progressRingLabelVariants,
  type ProgressRingColor,
} from './progress-ring.variants'

export type { ProgressRingColor }

export interface ProgressRingProps {
  percent: number
  color?: ProgressRingColor
  filled?: boolean
  size?: number
  strokeWidth?: number
  label?: ReactNode
  innerSlot?: ReactNode
  topLabel?: ReactNode
  bottomLabel?: ReactNode
  className?: string
  labelClassName?: string
}

const WHITE_MATRIX = '0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0'
const BLACK_MATRIX = '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0'
const HARD_ALPHA_MATRIX = '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'

export const ProgressRing = ({
  percent,
  color = 'amber',
  filled = false,
  size = 160,
  strokeWidth,
  label,
  innerSlot,
  topLabel,
  bottomLabel,
  className,
  labelClassName,
}: ProgressRingProps) => {
  const reactId = useId()
  const gradientId = `pr-grad-${reactId}`
  const glossId = `pr-gloss-${reactId}`
  const arcGlowId = `pr-arc-${reactId}`

  const clamped = Math.min(100, Math.max(0, percent))
  const sw = strokeWidth ?? (filled ? 14 : 12)
  const radius = (size - sw) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - clamped / 100)
  const fillRadius = (size * 0.659) / 2
  const fillDiameter = fillRadius * 2

  const palette = PROGRESS_RING_COLOR_MAP[color]
  const outlineTrack =
    'outlineTrack' in palette && typeof palette.outlineTrack === 'string'
      ? palette.outlineTrack
      : PROGRESS_RING_TRACK_COLOR
  const trackColor = filled ? palette.track : outlineTrack

  const labelText = label ?? `${Math.round(clamped)}%`
  const labelFontSize = Math.round(size * 0.24)
  const center = size / 2

  return (
    <div className={cn('inline-flex flex-col items-center gap-2', className)}>
      {topLabel ? <div className="text-center">{topLabel}</div> : null}

      <div
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={typeof labelText === 'string' ? labelText : `${Math.round(clamped)}%`}
        className="relative shrink-0"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="block" aria-hidden>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={palette.arcStart} />
              <stop offset="100%" stopColor={palette.arcEnd} />
            </linearGradient>

            {filled ? (
              <>
                {/* Glossy spherical inner circle — stacked overlay inner shadows */}
                <filter
                  id={glossId}
                  x="-50%"
                  y="-100%"
                  width="200%"
                  height="300%"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  {PROGRESS_RING_GLOSS_SHADOWS.map((s, i) => (
                    <ProgressRingInnerShadow
                      key={i}
                      index={i}
                      dy={s.dy * fillDiameter}
                      blur={s.blur * fillDiameter}
                      color={s.color}
                      alpha={s.alpha}
                    />
                  ))}
                </filter>

                {/* Subtle white highlight along the inner edge of the arc */}
                <filter
                  id={arcGlowId}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values={HARD_ALPHA_MATRIX}
                    result="ha"
                  />
                  <feOffset dy={size * 0.0236} />
                  <feGaussianBlur stdDeviation={size * 0.0118} />
                  <feComposite in2="ha" operator="arithmetic" k2={-1} k3={1} />
                  <feColorMatrix type="matrix" values={`${WHITE_MATRIX} 0.5 0`} />
                  <feBlend mode="normal" in2="shape" />
                </filter>
              </>
            ) : null}
          </defs>

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={sw}
          />

          {filled ? (
            <circle
              cx={center}
              cy={center}
              r={fillRadius}
              fill={palette.solid}
              filter={`url(#${glossId})`}
            />
          ) : null}

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${center} ${center})`}
            filter={filled ? `url(#${arcGlowId})` : undefined}
            style={{ transition: 'stroke-dashoffset 400ms ease-out' }}
          />
        </svg>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(progressRingLabelVariants({ color, filled }), labelClassName)}
            style={{ fontSize: labelFontSize }}
          >
            {labelText}
          </span>
          {innerSlot ? <div className="pointer-events-auto">{innerSlot}</div> : null}
        </div>
      </div>

      {bottomLabel ? <div className="text-center">{bottomLabel}</div> : null}
    </div>
  )
}

interface ProgressRingInnerShadowProps {
  index: number
  dy: number
  blur: number
  color: 'white' | 'black'
  alpha: number
}

/** One `overlay` inner-shadow layer of the glossy inner circle. */
const ProgressRingInnerShadow = ({
  index,
  dy,
  blur,
  color,
  alpha,
}: ProgressRingInnerShadowProps) => {
  const base = color === 'white' ? WHITE_MATRIX : BLACK_MATRIX
  return (
    <>
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values={HARD_ALPHA_MATRIX}
        result={`ha-${index}`}
      />
      <feOffset dy={dy} />
      <feGaussianBlur stdDeviation={blur} />
      <feComposite in2={`ha-${index}`} operator="arithmetic" k2={-1} k3={1} />
      <feColorMatrix type="matrix" values={`${base} ${alpha} 0`} />
      <feBlend
        mode="overlay"
        in2={index === 0 ? 'shape' : `eff-${index - 1}`}
        result={`eff-${index}`}
      />
    </>
  )
}
