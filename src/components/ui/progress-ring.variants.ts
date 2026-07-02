import { cva } from 'class-variance-authority'

export const progressRingLabelVariants = cva('font-semibold leading-none', {
  variants: {
    color: {
      amber: 'text-warning-500',
      purple: 'text-text-base-white',
      brandSolid: 'text-text-brand-primary-medium',
      blue: 'text-text-base-white',
      orange: 'text-text-base-white',
      teal: 'text-text-base-white',
      green: 'text-text-base-white',
      red: 'text-text-base-white',
    },
    filled: {
      true: 'text-text-base-white [text-shadow:0px_1px_5px_rgba(0,0,0,0.3)]',
      false: '',
    },
  },
  compoundVariants: [
    { color: 'amber', filled: false, class: 'text-warning-500' },
    { color: 'purple', filled: false, class: 'text-brand-primary-500' },
    { color: 'brandSolid', filled: false, class: 'text-text-brand-primary-medium' },
    { color: 'blue', filled: false, class: 'text-info-500' },
    { color: 'orange', filled: false, class: 'text-warning-600' },
    { color: 'teal', filled: false, class: 'text-brand-tertiary-600' },
    { color: 'green', filled: false, class: 'text-fill-accent-green' },
    { color: 'red', filled: false, class: 'text-error-500' },
  ],
  defaultVariants: {
    color: 'amber',
    filled: false,
  },
})

/** Neutral track used by the outline (non-filled) variant. */
export const PROGRESS_RING_TRACK_COLOR = '#eef0f3'

type ProgressRingPalette = {
  /** Base fill of the glossy inner circle + start stop of the arc gradient. */
  solid: string
  arcStart: string
  arcEnd: string
  /** Light-tint colored track used in the filled variant. */
  track: string
  /** Optional override for the track in the outline variant (default = neutral). */
  outlineTrack?: string
}

export const PROGRESS_RING_COLOR_MAP = {
  amber: {
    solid: '#f59e0b',
    arcStart: '#fbbf24',
    arcEnd: '#d97706',
    track: '#fef3c7',
  },
  purple: {
    solid: '#945dff',
    arcStart: '#945dff',
    arcEnd: '#6a17da',
    track: '#ede8ff',
  },
  brandSolid: {
    solid: '#8030f7',
    arcStart: '#945dff',
    arcEnd: '#6a17da',
    track: '#ede8ff',
    outlineTrack: '#ffffff',
  },
  blue: {
    solid: '#107edb',
    arcStart: '#3b9eea',
    arcEnd: '#0a5da8',
    track: '#dbeafe',
  },
  orange: {
    solid: '#ff6b27',
    arcStart: '#ff6b27',
    arcEnd: '#c94407',
    track: '#ffefdd',
  },
  teal: {
    solid: '#18b4b2',
    arcStart: '#18b4b2',
    arcEnd: '#117374',
    track: '#cdfaf4',
  },
  green: {
    solid: '#2fa34b',
    arcStart: '#4abe68',
    arcEnd: '#2a7a3e',
    track: '#dcf5e3',
  },
  red: {
    solid: '#ef4444',
    arcStart: '#f87171',
    arcEnd: '#c81e1e',
    track: '#fee2e2',
  },
} as const satisfies Record<string, ProgressRingPalette>

export type ProgressRingColor = keyof typeof PROGRESS_RING_COLOR_MAP

/**
 * Glossy inner-circle inner-shadow stack, exported from Figma (node 43:7960).
 * Each entry is expressed as a ratio of the inner-circle diameter so it scales
 * with any ring size. Rendered as stacked `overlay` inner shadows.
 */
export const PROGRESS_RING_GLOSS_SHADOWS = [
  { dy: 0.08945, blur: 0.08945, color: 'white', alpha: 0.5 },
  { dy: -0.3578, blur: 0.22364, color: 'black', alpha: 0.2 },
  { dy: 0.04473, blur: 0.06709, color: 'white', alpha: 0.7 },
  { dy: -0.3578, blur: 0.08945, color: 'black', alpha: 0.15 },
] as const
