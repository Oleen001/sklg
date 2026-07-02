'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'

import { cn } from '@/libs/utils.lib'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  IconButton,
  type CarouselApi,
} from '@/components/ui'

// Upcoming (not-yet-scrolled) characters sit at this light grey, then transition to
// their dark gradient colour as the scroll progress reaches them. (Mirrors RiasecAtlas.)
const REVEAL_GHOST_COLOR = '#d7d5db'
const REVEAL_GRADIENT_FROM = '#19181b'
const REVEAL_GRADIENT_TO = '#9b98a3'

const HEADING = 'Holland Code คืออะไร?'

// Brutalist arrow buttons: square, thick dark border, hard offset shadow that "lifts" on
// hover and presses flat on click. Matches the RiasecCtaButton palette (dark-yellow fill,
// gray-dark2 border + shadow, dark icon).
const BRUTALIST_ARROW =
  'rounded-xl border-3 border-fill-base-gray-dark2 bg-accent-yellow-300 text-text-base-primary shadow-[4px_4px_0_0_var(--color-fill-base-gray-dark2)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-accent-yellow-500 hover:shadow-[6px_6px_0_0_var(--color-fill-base-gray-dark2)] active:translate-x-0 active:translate-y-0 active:bg-accent-yellow-600 active:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[4px_4px_0_0_var(--color-fill-base-gray-dark2)]'

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

// Splits Thai (and Latin) text into display graphemes so combining marks reveal as one unit.
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
  // whiteSpace: 'pre' keeps space graphemes from collapsing inside inline-block (otherwise
  // the words run together — "Holland Code คืออะไร?" renders as "HollandCodeคืออะไร?").
  return (
    <motion.span style={{ color, y, display: 'inline-block', whiteSpace: 'pre' }}>
      {char}
    </motion.span>
  )
}

// Cards 1–3 are real DOM cards rebuilt from Figma (nodes 62-367 / 456-4256 / 453-3575): short
// pastel surfaces with line-art decorations, rich text, badges/bullets and a brutalist callout.
type HollandCardId = 'card1' | 'card2' | 'card3'

const CARDS: HollandCardId[] = ['card1', 'card2', 'card3']

// Per-card accent colour driving both the border and the hard offset shadow.
const CARD_ACCENT_COLOR: Record<HollandCardId, string> = {
  card1: 'rgb(50, 79, 153)',
  card2: 'rgb(192, 100, 16)',
  card3: '#065F46',
}

const pad = (n: number) => String(n).padStart(2, '0')

// Each card is an `@container`, so every size below is expressed in `cqw` (1cqw = 1% of card
// width) wrapped in clamp() — the layout scales 1:1 with the Figma 600px artboard at any width
// while keeping legible floors on small screens. Decorations are positioned in cqw too, so they
// stay pinned to the Figma 600px coordinate system regardless of how tall the content runs.

// Card 1 — Figma node 62-367.
function HollandCardOne() {
  return (
    <div className="@container relative h-full w-full bg-[#e8eeff]">
      {/* Line-art decorations bleed off the left edge (clipped by the card's overflow-hidden). */}
      <Image
        src="/images/holland-code/holland-card-1-deco-lg.svg"
        alt=""
        aria-hidden
        width={272}
        height={272}
        className="pointer-events-none absolute left-[-17.67cqw] top-[-6.17cqw] w-[45.33cqw] select-none"
      />
      <Image
        src="/images/holland-code/holland-card-1-deco-sm.svg"
        alt=""
        aria-hidden
        width={120}
        height={120}
        className="pointer-events-none absolute left-[-2.17cqw] top-[23.67cqw] w-[20cqw] select-none"
      />

      <div className="relative flex h-full flex-col gap-[max(16px,4.6cqw)] p-[max(16px,4cqw)]">
        <div className="flex flex-col gap-[max(2px,0.7cqw)] pl-[max(56px,22cqw)]">
          <h3 className="font-bold leading-[1.15] tracking-[-0.01em] text-text-base-primary text-[max(16px,4.66cqw)]">
            Holland Code หรือ RIASEC
          </h3>
          <p className="leading-[1.5] text-text-base-secondary text-[max(11px,2.66cqw)]">
            เป็นทฤษฎีการเลือกอาชีพที่พัฒนาโดย John L. Holland นักจิตวิทยาด้านอาชีพชาวอเมริกัน
            โดยทฤษฎีนี้มีความเชื่อว่า
          </p>
        </div>

        <div className="mt-auto flex pl-[max(48px,15cqw)]">
          <p className="w-full rounded-2xl border-2 border-[rgb(50,79,153)] bg-[#a9c1f9] px-[max(12px,3.2cqw)] py-[max(8px,2cqw)] font-bold leading-[1.35] text-[#062b5f] shadow-[2px_4px_0_0_rgb(50,79,153)] text-[max(11px,2.33cqw)]">
            คนจะมีความสุขและประสบความสำเร็จมากขึ้น
            เมื่อได้ทำงานและอยู่ในสภาพแวดล้อมที่สอดคล้องกับลักษณะบุคคลิกของตนเอง
          </p>
        </div>
      </div>
    </div>
  )
}

// Card 2 — Figma node 456-4256.
function HollandCardTwo() {
  return (
    <div className="@container relative h-full w-full bg-[#fcf0df]">
      <Image
        src="/images/holland-code/holland-card-2-deco.svg"
        alt=""
        aria-hidden
        width={329}
        height={329}
        className="pointer-events-none absolute left-[64.5cqw] top-[-15.33cqw] w-[54.75cqw] select-none"
      />

      <div className="relative flex h-full flex-col gap-[max(8px,2cqw)] p-[max(16px,4cqw)]">
        <div className="flex flex-col gap-[max(2px,0.7cqw)]">
          <h3 className="font-bold leading-[1.15] text-text-base-primary text-[max(15px,4cqw)]">
            Holland Code ถูกนำมาใช้เพื่อจับคู่
          </h3>
          <p className="font-semibold leading-[1.4] text-[#c86222] text-[max(11px,2.5cqw)]">
            เพื่อช่วยให้เลือกเส้นทางที่เหมาะสมกับตัวเองมากขึ้น
          </p>
        </div>

        <div className="flex w-fit items-center gap-[max(4px,1.33cqw)]">
          <span className="rounded-lg border-[1.5px] border-[rgb(192,100,16)] bg-[rgba(218,126,86,0.24)] px-[max(8px,2cqw)] py-[max(2px,0.66cqw)] font-bold text-[#8e1f00] shadow-[1px_2px_0_0_rgb(192,100,16)] text-[max(9px,2cqw)]">
            บุคลิกภาพ
          </span>
          <span className="font-semibold text-black text-[max(11px,2.66cqw)]">+</span>
          <span className="rounded-lg border-[1.5px] border-[rgb(192,100,16)] bg-[rgba(218,126,86,0.24)] px-[max(8px,2cqw)] py-[max(2px,0.66cqw)] font-bold text-[#8e1f00] shadow-[1px_2px_0_0_rgb(192,100,16)] text-[max(9px,2cqw)]">
            อาชีพ
          </span>
        </div>

        <p className="leading-[1.5] text-text-base-secondary text-[max(10px,2.33cqw)]">
          ทฤษฎีนี้ถูกนำไปใช้อย่างกว้างขวาง เช่น ONET Interest Profiler ถูกพัฒนาขึ้นมา
          ภายใต้การสนับสนุนของกระทรวงแรงงานสหรัฐอเมริกา ได้มีการประยุกต์ใช้แนวคิด Holland code
          ในการช่วยให้นักเรียนและผู้ใช้งานในสหรัฐอเมริกา สามารถตรวจสอบความสนใจของตนเอง
          พร้อมทั้งค้นคว้าข้อมูลเกี่ยวกับอาชีพต่าง ๆ ที่สอดคล้องกับตนเอง
        </p>
      </div>
    </div>
  )
}

// Card 3 — Figma node 453-3575.
function HollandCardThree() {
  return (
    <div className="@container relative h-full w-full bg-[#ecfbf3]">
      <Image
        src="/images/holland-code/holland-card-3-deco.svg"
        alt=""
        aria-hidden
        width={234}
        height={197}
        className="pointer-events-none absolute left-[72.53cqw] top-[13.82cqw] w-[39.08cqw] select-none"
      />

      <div className="relative flex h-full flex-col gap-[max(12px,4cqw)] p-[max(16px,4cqw)]">
        <div className="flex flex-col gap-[max(4px,1.33cqw)]">
          <h3 className="font-bold leading-[1.2] text-text-base-primary text-[max(15px,4cqw)]">
            ทำไม Holland Code เวลาดูต้องดู 3 ตัว?
          </h3>

          <div className="flex flex-col gap-[max(2px,0.7cqw)]">
            <p className="leading-[1.5] text-text-base-secondary text-[max(10px,2.33cqw)]">
              เพราะว่าคนเราไม่มีบุคลิกแค่แบบเดียว แต่เป็น{' '}
              <strong className="font-bold">&ldquo;การผสมผสานกัน&rdquo;</strong> ของหลายลักษณะ
            </p>

            <div className="flex flex-col gap-[max(4px,1.33cqw)] px-[max(12px,4cqw)]">
              <p className="leading-[1.4] text-text-base-secondary text-[max(9px,2.16cqw)]">
                <strong className="font-bold">1 ตัวไม่เพียงพอ:</strong> บอกได้แค่เพียงกลุ่มอาชีพ
                และกว้างเกินไป
              </p>
              <p className="leading-[1.4] text-text-base-secondary text-[max(9px,2.16cqw)]">
                <strong className="font-bold">2 ตัวชัดเจนขึ้น:</strong>{' '}
                แต่ยังแยกแยะความแตกต่างได้ไม่มากพอ
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-fit items-center gap-[max(6px,1.66cqw)] rounded-xl border-2 border-[#065F46] bg-[#d1fae5] px-[max(10px,2.66cqw)] py-[max(8px,2cqw)] shadow-[2px_4px_0_0_#065F46]">
          <Image
            src="/images/holland-code/holland-card-3-check.svg"
            alt=""
            aria-hidden
            width={18}
            height={18}
            className="size-[max(14px,3cqw)] shrink-0 select-none"
          />
          <span className="font-bold leading-[1.35] text-[#065f46] text-[max(10px,2.33cqw)]">
            3 ตัวกำลังพอดี: ให้ภาพอาชีพที่เฉพาะตัว และ แม่นยำขึ้น
          </span>
        </div>
      </div>
    </div>
  )
}

// One carousel card. Its motion derives from `dist`: a signed, gap-normalised distance from
// the active snap (0 = centered/active, ±1 = a full slide away). The parent writes `dist` on
// every Embla scroll frame, so the card focuses as it reaches center and recedes as it leaves —
// growing/shrinking, colouring/desaturating, lifting its hard shadow, and tilting like a fanned
// stack of cards (the brutalist neighbour tilt). The card height is content-driven (no fixed
// aspect), so longer cards stay legible instead of clipping on narrow screens.
function HollandCard({
  card,
  index,
  registerTween,
}: {
  card: HollandCardId
  index: number
  registerTween: (index: number, dist: MotionValue<number>) => void
}) {
  const dist = useMotionValue(0)
  useEffect(() => registerTween(index, dist), [index, dist, registerTween])

  const abs = useTransform(dist, (v) => Math.min(Math.abs(v), 1))
  const scale = useTransform(abs, [0, 1], [1, 0.88])
  const opacity = useTransform(abs, [0, 1], [1, 0.45])
  const grayscale = useTransform(abs, [0, 1], [0, 0.7])
  const filter = useMotionTemplate`grayscale(${grayscale})`
  // Hard offset shadow grows as the card takes focus, flattens as it recedes.
  const shadow = useTransform(abs, [0, 1], [8, 2])
  const boxShadow = useMotionTemplate`${shadow}px ${shadow}px 0 0 ${CARD_ACCENT_COLOR[card]}`
  // Neighbours tilt away from center; the active card sits square.
  const rotate = useTransform(dist, [-1, 0, 1], [-2.2, 0, 2.2])

  return (
    <CarouselItem className="basis-[86%] pl-0 md:basis-[56%]">
      <motion.div
        style={{
          scale,
          opacity,
          rotate,
          boxShadow,
          borderColor: CARD_ACCENT_COLOR[card],
          transformOrigin: 'center bottom',
        }}
        className="relative h-full w-full overflow-hidden rounded-[24px] border-3 md:rounded-[32px]"
      >
        <motion.div style={{ filter }} className="h-full">
          {card === 'card1' ? (
            <HollandCardOne />
          ) : card === 'card2' ? (
            <HollandCardTwo />
          ) : (
            <HollandCardThree />
          )}
        </motion.div>
      </motion.div>
    </CarouselItem>
  )
}

// Inset every slide's snap point to the page content margin (matches the centered
// max-w-[1280px] + px-6/px-10 container), so the active card stays pinned to the content
// edge while the previous/next cards bleed past both viewport edges. viewportSize is the
// full-bleed carousel width (≈ 100vw).
const alignToContentMargin = (viewportSize: number) =>
  Math.max((viewportSize - 1280) / 2, 0) + (viewportSize >= 768 ? 40 : 24)

export default function RiasecHollandCode() {
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress: h2Progress } = useScroll({
    target: h2Ref,
    offset: ['start 0.85', 'center 0.35'],
  })
  const headingChars = useMemo(() => splitGraphemes(HEADING), [])
  const carouselOpts = useMemo(
    // Center the selected card in the (full-bleed ≈ 100vw) viewport; containScroll: false lets
    // the first/last cards reach center too (Embla allows empty space past the extremes).
    () => ({ align: 'center' as const, containScroll: false as const, loop: false }),
    [],
  )

  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const count = CARDS.length
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  // Each card registers its `dist` MotionValue here; the scroll handler below writes them.
  const tweenValues = useRef(new Map<number, MotionValue<number>>())
  const registerTween = useCallback((index: number, dist: MotionValue<number>) => {
    tweenValues.current.set(index, dist)
  }, [])

  // Drive the per-card focus on every scroll frame: distance from each card's snap to the
  // current scroll progress, normalised by the inter-snap gap and clamped to ±1.
  useEffect(() => {
    if (!api) return
    const onScroll = () => {
      const progress = api.scrollProgress()
      const snaps = api.scrollSnapList()
      const gap = snaps.length > 1 ? Math.abs(snaps[1] - snaps[0]) : 1
      snaps.forEach((snap, i) => {
        const signed = gap > 0 ? (snap - progress) / gap : 0
        tweenValues.current.get(i)?.set(Math.max(-1, Math.min(1, signed)))
      })
    }
    onScroll()
    api.on('scroll', onScroll)
    api.on('reInit', onScroll)
    return () => {
      api.off('scroll', onScroll)
      api.off('reInit', onScroll)
    }
  }, [api])

  useEffect(() => {
    if (!api) return
    const update = () => {
      // Clamp to the real cards so the trailing spacer slide (a right-edge gutter, not a
      // page) never registers as a 4th page in the counter / dots / arrows.
      const sel = Math.min(api.selectedScrollSnap(), CARDS.length - 1)
      setSelected(sel)
      setCanPrev(sel > 0)
      setCanNext(sel < CARDS.length - 1)
    }
    update()
    api.on('select', update)
    api.on('reInit', update)
    return () => {
      api.off('select', update)
      api.off('reInit', update)
    }
  }, [api])

  return (
    <section className="relative z-10 bg-bg-base-white px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 py-[0.06em] text-center md:mb-14">
          <h2
            ref={h2Ref}
            className="text-[40px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[clamp(48px,6vw,72px)]"
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

        <div className="relative">
          {/* Slide counter — top right (hidden) */}
          {/* <div className="mb-5 flex justify-end">
            <span className="rounded-lg border-2 border-fill-base-gray-dark2 bg-accent-yellow-300 px-3 py-1 text-sm font-bold tabular-nums tracking-[0.25em] text-text-base-primary shadow-[3px_3px_0_0_var(--color-fill-base-gray-dark2)]">
              {pad(selected + 1)} / {pad(count)}
            </span>
          </div> */}

          {/* Full-bleed both sides: cancel the container's gutters + centering offset so the
              Embla viewport spans the full viewport width. The custom align (above) then keeps
              the active card on the content margin while neighbours bleed past both edges. */}
          <div className="ml-[calc(-1*(max((100vw_-_1280px)/2,_0px)_+_1.5rem))] mr-[calc(-1*(max((100vw_-_1280px)/2,_0px)_+_1.5rem))] md:ml-[calc(-1*(max((100vw_-_1280px)/2,_0px)_+_2.5rem))] md:mr-[calc(-1*(max((100vw_-_1280px)/2,_0px)_+_2.5rem))]">
            <Carousel setApi={setApi} opts={carouselOpts} className="w-full">
              {/* Leading/trailing padding = content margin so trimSnaps clamps the first card to
                  the left content edge and the last card to the right content edge, while the
                  custom align keeps the middle cards inset. */}
              <CarouselContent className="ml-0 gap-5 pl-[calc(max((100vw_-_1280px)/2,_0px)_+_1.5rem)] pr-[calc(max((100vw_-_1280px)/2,_0px)_+_1.5rem)] md:gap-6 md:pl-[calc(max((100vw_-_1280px)/2,_0px)_+_2.5rem)] md:pr-[calc(max((100vw_-_1280px)/2,_0px)_+_2.5rem)]">
                {CARDS.map((card, i) => (
                  <HollandCard key={i} card={card} index={i} registerTween={registerTween} />
                ))}
                {/* Trailing spacer — a real (empty) slide, so containScroll can't collapse it
                    the way it collapses trailing padding. The last card pins to its left, so
                    this becomes the right-side gutter at 03/03. Its snap coincides with the
                    last card's clamped snap (trimSnaps drops it), so it adds no extra page. */}
                <CarouselItem aria-hidden className="basis-[8%] pl-0 md:basis-[10%]" />
              </CarouselContent>
            </Carousel>
          </div>

          {/* Controls — brutalist dots, centered. Arrows hidden (see below). */}
          <div className="mt-8 flex items-center justify-center md:mt-10">
            <div className="flex items-center gap-3">
              {CARDS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`ไปยังสไลด์ ${idx + 1}`}
                  aria-current={idx === selected}
                  onClick={() => api?.scrollTo(idx)}
                  className={cn(
                    'h-6 cursor-pointer rounded-lg border-3 border-fill-base-gray-dark2 shadow-[3px_3px_0_0_var(--color-fill-base-gray-dark2)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--color-fill-base-gray-dark2)]',
                    idx === selected
                      ? 'w-14 bg-accent-yellow-300'
                      : 'w-6 bg-fill-base-white hover:bg-accent-yellow-300',
                  )}
                />
              ))}
            </div>

            {/* Prev / next arrows (hidden) */}
            {/* <div className="flex items-center gap-3">
              <IconButton
                className={BRUTALIST_ARROW}
                variant="outline"
                size="lg"
                aria-label="สไลด์ก่อนหน้า"
                disabled={!canPrev}
                onClick={() => api?.scrollPrev()}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                className={BRUTALIST_ARROW}
                variant="outline"
                size="lg"
                aria-label="สไลด์ถัดไป"
                disabled={!canNext}
                onClick={() => api?.scrollNext()}
              >
                <ChevronRight />
              </IconButton>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
