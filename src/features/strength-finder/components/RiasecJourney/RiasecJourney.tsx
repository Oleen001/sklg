'use client'

import { useMemo, useRef } from 'react'

import { motion, useInView, useScroll, useTransform, type MotionValue } from 'motion/react'

import { Route } from '@/enums'
import { RiasecCtaButton } from '@/features/riasec-test/components/RiasecCtaButton'

const P = {
  800: '#5f18bf',
  700: '#721ee3',
  600: '#8030f7',
  300: '#c5b1ff',
  200: '#dcd4ff',
}

// Upcoming (not-yet-scrolled) characters sit at this light grey, then transition to
// their dark gradient colour as the scroll progress reaches them. (Mirrors RiasecAtlas.)
const REVEAL_GHOST_COLOR = '#d7d5db'
const REVEAL_GRADIENT_FROM = '#19181b'
const REVEAL_GRADIENT_TO = '#6e6b75'

const HEADING = 'ตอบคำถามเกี่ยวกับความสนใจและสไตล์การทำงานของคุณ ใช้เวลาเพียง 5–10 นาที'

// Interpolate between two #rrggbb hex colours, returning an #rrggbb string.
function lerpHex(from: string, to: string, t: number) {
  const a = parseInt(from.slice(1), 16)
  const b = parseInt(to.slice(1), 16)
  const ch = (shift: number) => {
    const av = (a >> shift) & 0xff
    const bv = (b >> shift) & 0xff
    return Math.round(av + (bv - av) * t)
  }
  const hex = ((1 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).slice(1)
  return `#${hex}`
}

// Eyebrow mask-up reveal (mirrors RiasecBenefits' "WHY YOU SHOULD KNOW").
const maskLine = {
  hidden: { y: '105%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 + i * 0.12 },
  }),
}

function splitGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const seg = new Intl.Segmenter('th', { granularity: 'grapheme' })
    return [...seg.segment(text)].map((s) => s.segment)
  }
  return [...text]
}

// Scroll-driven per-grapheme reveal (mirrors RiasecAtlas heading): each glyph starts as
// light grey, then rises + darkens into its slice of the black → grey gradient.
function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = index / total
  const end = Math.min((index + 1) / total, 1)
  // Each glyph's revealed colour is its slice of the black → grey gradient.
  const revealed = lerpHex(
    REVEAL_GRADIENT_FROM,
    REVEAL_GRADIENT_TO,
    total > 1 ? index / (total - 1) : 0,
  )
  const color = useTransform(progress, [start, end], [REVEAL_GHOST_COLOR, revealed])
  const y = useTransform(progress, [start, end], ['0.14em', '0em'])
  // `display: inline-block` collapses whitespace-only spans to zero width, which would
  // swallow the spaces between Thai words — `whiteSpace: 'pre'` preserves them.
  return (
    <motion.span style={{ color, y, display: 'inline-block', whiteSpace: 'pre' }}>
      {char}
    </motion.span>
  )
}

const MILESTONES = [
  {
    num: '1',
    en: 'Take the Test',
    th: 'ทำแบบทดสอบ',
    desc: 'ตอบคำถามเกี่ยวกับความสนใจและพฤติกรรมของคุณ ใช้เวลาเพียง 5–10 นาที',
  },
  {
    num: '2',
    en: 'Get Your RIASEC',
    th: 'รับรหัสบุคลิกภาพ',
    desc: 'รับผลลัพธ์เป็นรหัส 3 ตัว เช่น R-I-A ที่สะท้อนบุคลิกภาพด้านอาชีพ',
  },
  {
    num: '3',
    en: 'Explore Career Paths',
    th: 'สำรวจเส้นทางอาชีพ',
    desc: 'ดูรายการอาชีพที่สอดคล้องกับ profile ของคุณ พร้อมคำอธิบายลักษณะงานจริง',
  },
  {
    num: '4',
    en: 'Plan Your Journey',
    th: 'วางแผนการเรียนรู้',
    desc: 'ดูทักษะที่ควรพัฒนา เส้นทางการเรียนที่แนะนำ และวางแผนสู่เป้าหมาย',
  },
]

const TRACK_PATH = 'M 60,44 C 200,4 380,84 540,44 C 700,4 880,84 1020,44 C 1080,28 1120,44 1140,44'

// Looping keyframe motion ported from the GSAP keyframes demo (gsap.com/resources/keyframes):
//   keyframes: { y: [0, 80, -10, 30, 0], easeEach: 'power2.inOut' }, rotate: 180,
//   ease: 'elastic', duration: 5, stagger: 0.2
// y travel scaled to suit the small number badge; yoyo (repeatType 'reverse') makes the
// 5s loop seamless. Rotate is a subtle ±wobble (not a flip) so the digit stays readable.
const POWER2_INOUT = [0.45, 0, 0.55, 1] as const
const badgeKeyframes = (i: number) => ({
  y: [0, 14, -3, 7, 0],
  rotate: [0, 6, -4, 0],
  transition: {
    y: {
      duration: 5,
      delay: i * 0.2,
      times: [0, 0.25, 0.5, 0.75, 1],
      ease: [POWER2_INOUT, POWER2_INOUT, POWER2_INOUT, POWER2_INOUT],
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
    rotate: {
      duration: 5,
      delay: i * 0.2,
      ease: [0.34, 1.56, 0.64, 1] as const,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  },
})

function Milestone({ ms, i }: { ms: (typeof MILESTONES)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <div ref={ref} className="overflow-hidden py-2 text-center">
      <motion.div
        custom={i}
        variants={maskLine}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border-4 text-xl font-bold shadow-[2px_2px_0_0_#333333]"
          style={{
            borderColor: '#333333',
            color: '#333333',
            background: '#BDE062',
          }}
          animate={inView ? badgeKeyframes(i) : undefined}
        >
          {ms.num}
        </motion.div>
        <p className="mb-2 text-lg font-semibold tracking-[-0.005em] text-[#065F46]">{ms.th}</p>
        <p className="mx-auto max-w-[24ch] text-sm leading-[1.6] text-[#767279]">{ms.desc}</p>
      </motion.div>
    </div>
  )
}

export default function RiasecJourney() {
  const headRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-20% 0px' })

  const h2Ref = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress: h2Progress } = useScroll({
    target: h2Ref,
    offset: ['start 0.85', 'center 0.35'],
  })
  const headingChars = useMemo(() => splitGraphemes(HEADING), [])

  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-20% 0px' })

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'end 30%'],
  })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="relative bg-bg-base-white px-6 py-[160px] md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div ref={headRef} className="mb-[40px] text-center">
          {/* <div className="mb-4 overflow-hidden py-[0.06em]">
            <motion.div
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.4em]"
              style={{ color: '#0C51D6' }}
              custom={0}
              initial="hidden"
              animate={headInView ? 'visible' : 'hidden'}
              variants={maskLine}
            >
              HOW IT WORKS
            </motion.div>
          </div> */}
          <h2
            ref={h2Ref}
            className="mx-auto text-[28px] font-semibold leading-[1.3] md:text-[clamp(28px,3.4vw,44px)]"
            style={{ maxWidth: '28ch' }}
            aria-label={HEADING}
          >
            {headingChars.map((char, i) => (
              <Char
                key={i}
                char={char}
                index={i}
                total={headingChars.length}
                progress={h2Progress}
              />
            ))}
          </h2>
        </div>

        <div ref={trackRef} className="relative py-10">
          <svg
            viewBox="0 0 1200 88"
            preserveAspectRatio="none"
            className="absolute top-9 left-0 z-[1] hidden h-[88px] w-full overflow-visible lg:block"
          >
            <path
              d={TRACK_PATH}
              fill="none"
              stroke="#065F46"
              strokeOpacity={0.54}
              strokeWidth={6}
              strokeDasharray="4 6"
            />
            <motion.path
              ref={pathRef}
              d={TRACK_PATH}
              fill="none"
              stroke="#065F46"
              strokeWidth={6}
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>

          <div className="relative z-[2] grid gap-14 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {MILESTONES.map((ms, i) => (
              <Milestone key={ms.num} ms={ms} i={i} />
            ))}
          </div>
        </div>

        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 24 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-20 flex justify-center md:mt-24"
        >
          <RiasecCtaButton asChild size="lg" className="h-16 gap-2.5 px-9 no-underline">
            <a href={Route.RIASEC_TEST}>
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
            </a>
          </RiasecCtaButton>
        </motion.div>
      </div>
    </section>
  )
}
