'use client'

import { motion, useInView } from 'motion/react'
import { useRef, useMemo } from 'react'

import { Route } from '@/enums'
import { RiasecCtaButton } from '@/features/riasec-test/components/RiasecCtaButton'

import styles from './RiasecHero.module.css'

const H1_LINES = ['ค้นหาเส้นทางอาชีพ', 'ที่เหมาะกับคุณ']

// The 4 RIASEC "mess" characters that frame the hero copy (ported from the
// riasec-landing-hero-mesh reference). Each flies in from its own off-screen
// corner with an overshoot bounce, then floats forever. Position, timing and
// rotation live in RiasecHero.module.css keyed by the per-character class —
// here we only pick the asset + its class. `big-red-blink.svg` self-animates
// via SMIL, so all four load through a plain <img> (next/image won't run SMIL).
const MESSES = [
  { id: 'blue', src: 'blue.svg', className: styles.blue },
  { id: 'orange', src: 'orange.svg', className: styles.orange },
  { id: 'bigRed', src: 'big-red-blink.svg', className: styles.bigRed },
  { id: 'smallRed', src: 'small-red.svg', className: styles.smallRed },
] as const

// ── p / button mask reveal ─────────────────────────────────────────────────
const maskLine = {
  hidden: { y: '105%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 + i * 0.12 },
  }),
}

// ── grapheme splitter (Thai-safe) ──────────────────────────────────────────
function splitGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const seg = new Intl.Segmenter('th', { granularity: 'grapheme' })
    return [...seg.segment(text)].map((s) => s.segment)
  }
  return [...text]
}

// ── GSAP-style per-character mask reveal ──────────────────────────────────
function CharReveal({ char, index }: { char: string; index: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.1em] pt-[0.3em] -mt-[0.3em]">
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1] as const,
          delay: 0.15 + index * 0.03,
        }}
      >
        {char}
      </motion.span>
    </span>
  )
}

export default function RiasecHero() {
  // group graphemes per line, keeping global indices for the stagger
  const lines = useMemo(() => {
    let gi = 0
    return H1_LINES.map((line) => splitGraphemes(line).map((char) => ({ char, idx: gi++ })))
  }, [])

  const pRef = useRef<HTMLDivElement>(null)
  const pInView = useInView(pRef, { once: true, amount: 0.3 })

  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-white">
      {/* Mess decoration stage — fills the hero; characters are positioned in % so
          they hold their relative placement while scaling with the viewport. */}
      <div className={styles.messLayer} aria-hidden>
        {MESSES.map((m) => (
          <div key={m.id} className={`${styles.mess} ${m.className}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- SMIL self-animation needs <img> */}
            <img
              className={styles.messFloat}
              src={`/images/riasec-hero/mess/${m.src}`}
              alt=""
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Hero copy — upper third, centered (z-4 sits above the mess layer at z-3). */}
      <div
        ref={pRef}
        className="absolute left-1/2 top-[23.4%] z-[4] flex w-[min(88%,520px)] -translate-x-1/2 flex-col items-center text-center md:w-[72%] md:max-w-[850px]"
      >
        <h1
          className="text-[40px] font-extrabold leading-[0.95] tracking-[-0.01em] text-balance md:text-[68px] md:leading-[0.98] lg:text-[86px]"
          style={{ color: '#17171c' }}
          aria-label={H1_LINES.join(' ')}
        >
          {lines.map((line, li) => (
            <span key={li} className="block">
              {line.map(({ char, idx }, i) => (
                <CharReveal key={i} char={char} index={idx} />
              ))}
            </span>
          ))}
        </h1>

        {/* p — mask reveal */}
        <div className="mt-0 overflow-hidden py-[0.06em] md:mt-1 lg:mt-1.5">
          <motion.p
            className="mx-auto max-w-[650px] text-[14px] leading-[1.6] md:text-[18px] lg:text-[20px]"
            style={{ color: '#8c8c8c' }}
            custom={0}
            initial="hidden"
            animate={pInView ? 'visible' : 'hidden'}
            variants={maskLine}
          >
            แบบทดสอบ RIASEC เครื่องมือแนะแนวอาชีพ ที่มหาวิทยาลัยทั่วโลกนิยมใช้
            <br className="hidden md:block" />
            ผลลัพธ์จะแนะนำเส้นทางอาชีพของคุณ ช่วยให้วางแผนอนาคตได้ง่ายขึ้น
          </motion.p>
        </div>

        {/* CTA — mask reveal */}
        <div className="mt-7 overflow-hidden pb-2 pr-2 pt-[0.06em] md:mt-[34px] lg:mt-11">
          <RiasecCtaButton asChild size="lg" className="h-16 gap-2.5 px-9 no-underline">
            <motion.a
              href={Route.RIASEC_TEST}
              custom={3}
              initial="hidden"
              animate={pInView ? 'visible' : 'hidden'}
              variants={maskLine}
            >
              เริ่มแบบทดสอบ
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="M13 5l7 7-7 7" />
              </svg>
            </motion.a>
          </RiasecCtaButton>
        </div>
      </div>
    </section>
  )
}
