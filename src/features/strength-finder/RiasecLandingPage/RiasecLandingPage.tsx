'use client'

import { Athiti, DM_Sans } from 'next/font/google'

import {
  RiasecAtlas,
  RiasecBenefits,
  RiasecHero,
  RiasecHollandCode,
  RiasecJourney,
} from '../components'

import { SectionFadeOut } from './SectionFadeOut'

const athiti = Athiti({
  variable: '--font-athiti',
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default function RiasecLandingPage() {
  return (
    <div
      className={`relative overflow-x-clip antialiased ${athiti.variable} ${dmSans.variable}`}
      style={{
        fontFamily: 'var(--font-dm-sans), var(--font-athiti), sans-serif',
        backgroundColor: '#FBFBFB',
        backgroundImage: [
          'radial-gradient(ellipse 90% 50% at -8% 2%, rgba(112,50,230,0.22) 0%, transparent 62%)',
          'radial-gradient(ellipse 80% 45% at 108% 6%, rgba(70,130,255,0.26) 0%, transparent 60%)',
          'radial-gradient(ellipse 70% 38% at 82% 40%, rgba(175,85,255,0.16) 0%, transparent 54%)',
          'radial-gradient(ellipse 90% 48% at 10% 68%, rgba(255,145,175,0.24) 0%, transparent 60%)',
          'radial-gradient(ellipse 65% 30% at 55% 90%, rgba(210,155,255,0.13) 0%, transparent 54%)',
        ].join(','),
      }}
    >
      {/* Section transition. Each incoming section is a rounded sheet with a
          soft top shadow that slides up over the one before it (z-index rises
          per layer so each paints over the previous), instead of sections
          meeting at hard rectangular seams.

          Most sections just scroll in normal flow — a section taller than the
          viewport can't be pinned with CSS `sticky` without clipping its own
          content, and a permanently-pinned section would also bleed through the
          transparent rounded corners of every later section. Holland is the one
          exception: it fits a viewport, so it's PINNED with `sticky top-0` and
          HELD while Journey slides over it (min-h-svh guarantees it fills the
          viewport, so no gap shows behind it). Benefits visually "holds" on its
          own via its internal sticky parallax scene.

          The incoming sheets have square top edges (no border-radius); the soft
          top shadow alone reads as one section lifting over the previous.

          SectionFadeOut fades each covered section out as it scrolls off the top
          so its tail (a stray mascot / the scene's final frame) doesn't linger
          above the next section. */}
      <div className="sticky top-0 z-[0] min-h-svh bg-bg-base-white">
        <RiasecHero />
      </div>
      <div className="relative z-[1]">
        <RiasecBenefits />
      </div>
      <div className="relative z-[2]">
        <RiasecAtlas />
      </div>
      <div className="sticky top-0 z-[3] min-h-svh bg-bg-base-white">
        <RiasecHollandCode />
      </div>

      <div className="relative z-[4] overflow-hidden">
        <RiasecJourney />
      </div>
    </div>
  )
}
