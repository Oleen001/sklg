'use client'

import { useEffect, useRef, useState } from 'react'

import { motion, useInView, useScroll, useTransform, type MotionValue } from 'motion/react'

// Upcoming (not-yet-scrolled) characters sit at this light grey, then transition to
// their dark gradient colour as the scroll progress reaches them.
const REVEAL_GHOST_COLOR = '#d7d5db'
const REVEAL_GRADIENT_FROM = '#19181b'
const REVEAL_GRADIENT_TO = '#6e6b75'

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

function RevealChar({
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
  return <motion.span style={{ color, y, display: 'inline-block' }}>{char}</motion.span>
}

interface TextRevealScrollProps {
  text: string
  progress: MotionValue<number>
  className?: string
}

// Scroll-driven text reveal: characters start as light grey and rise + darken into
// their black → grey gradient colour as the section scrolls through the viewport.
// Each glyph carries its own animated colour, so there's no static gradient clip.
function TextRevealScroll({ text, progress, className }: TextRevealScrollProps) {
  const chars = [...text]
  return (
    <span aria-hidden className={className}>
      {chars.map((char, i) => (
        <RevealChar key={i} char={char} index={i} total={chars.length} progress={progress} />
      ))}
    </span>
  )
}

const maskReveal = {
  hidden: { y: '105%' },
  visible: {
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 },
  },
}

// Hand-off from RiasecBenefits: the group that flowed down the progress line arrives
// here and "lines up". Each creature drops in from above and settles, staggered L→R.
const rowStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}

const charDrop = {
  hidden: { opacity: 0, y: -70, scale: 0.5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 240, damping: 17, mass: 0.9 } as const,
  },
}

const P = {
  900: '#4f169c',
  700: '#721ee3',
  600: '#8030f7',
  400: '#a885ff',
  300: '#c5b1ff',
  200: '#dcd4ff',
  100: '#ede8ff',
  50: '#f2f2ff',
}

interface Archetype {
  code: string
  en: string
  th: string
  quote: string
  description?: string
  tags: string[]
  glyphColor: string
  // Deep, saturated tone of the character's body hue — used for the card border + shadow.
  letterColor: string
  icon: string
}

const ARCHETYPES: Archetype[] = [
  {
    code: 'R',
    en: 'Realistic',
    th: 'สายลงมือทำจริง',
    quote:
      '“นักลงมือทำ” — ปฏิบัติจริง ชอบใช้แรงกาย คล่องแคล่ว ทำงานกับเครื่องมือ เครื่องจักร พืช และสัตว์',
    description:
      'ชอบงานที่ได้ลงมือปฏิบัติจริง ทั้งการใช้เครื่องมือ เครื่องจักร และอุปกรณ์ต่าง ๆ ไปจนถึงการทำงานกับพืช สัตว์ หรือกิจกรรมกลางแจ้งที่ได้ออกแรง มักมีทักษะด้านช่างหรือกลไก ถนัดแก้ปัญหาที่จับต้องได้มากกว่าการคิดเชิงนามธรรม จึงเปล่งประกายในสภาพแวดล้อมที่เน้น “การลงมือทำ” มากกว่าการคิดหรือพูดคุยกับผู้คน',
    tags: ['ชอบลงมือทำ', 'ใช้เครื่องมือ', 'งานภาคปฏิบัติ'],
    glyphColor: '#A9C1F9',
    letterColor: '#324f99',
    icon: '/images/riasec-icons/riasec-realistic.svg',
  },
  {
    code: 'I',
    en: 'Investigative',
    th: 'สายวิเคราะห์',
    quote:
      '“นักคิดวิเคราะห์” — ช่างสงสัย ชอบวิเคราะห์และสังเกต สนใจงานวิจัย วิทยาศาสตร์ และปัญหาที่ซับซ้อน',
    description:
      'สนใจการเรียนรู้ ค้นคว้า และแก้ปัญหาที่ซับซ้อน โดยเฉพาะด้านวิทยาศาสตร์หรือคณิตศาสตร์ ชอบคิดวิเคราะห์ ทดลอง และตั้งคำถามกับสิ่งรอบตัว ให้ความสำคัญกับความรู้และเหตุผลมากกว่าการทำงานกับคนที่อาจมีอารมณ์เข้ามาเกี่ยวข้อง และมักไม่ชอบสภาพแวดล้อมที่มีโครงสร้างตายตัวหากไม่มีเหตุผลมารองรับ',
    tags: ['ชอบคิด', 'วิเคราะห์', 'แก้ปัญหาเชิงวิชาการ'],
    glyphColor: '#C585EF',
    letterColor: '#6d28a8',
    icon: '/images/riasec-icons/riasec-investigative.svg',
  },
  {
    code: 'A',
    en: 'Artistic',
    th: 'สายสร้างสรรค์',
    quote:
      '“นักสร้างสรรค์” — มีจินตนาการ ชอบทำอะไรใหม่ ๆ ชอบแสดงออก เป็นอิสระ ชอบงานศิลปะ ออกแบบ ดนตรี หรือการเขียน',
    description:
      'มีความคิดสร้างสรรค์ ชอบแสดงออก และมีจินตนาการสูง มักสนใจงานศิลปะ การออกแบบ ดนตรี งานเขียน หรือการสื่อสารเชิงสร้างสรรค์ ชอบทำงานในสภาพแวดล้อมที่ไม่ตายตัว เปิดโอกาสให้ใช้ความคิดและอิสระในการสร้างสรรค์ผลงาน มักใช้สัญชาตญาณหรือความรู้สึกในการทำงาน และไม่ชอบงานที่มีระเบียบขั้นตอนซับซ้อนตายตัว',
    tags: ['ชอบสร้างสรรค์', 'ใช้จินตนาการ'],
    glyphColor: '#EFA2AE',
    letterColor: '#c75566',
    icon: '/images/riasec-icons/riasec-artistic.svg',
  },
  {
    code: 'S',
    en: 'Social',
    th: 'สายช่วยเหลือ',
    quote:
      '“นักช่วยเหลือ” — มนุษยสัมพันธ์ดี เป็นมิตร เห็นอกเห็นใจ ชอบสอน แนะนำ ให้คำปรึกษา และช่วยเหลือผู้อื่น',
    description:
      'ชอบทำงานกับผู้คน โดยเน้นการช่วยเหลือ ให้คำแนะนำ สอน หรือพัฒนาผู้อื่นให้เติบโต มักเข้าอกเข้าใจและเห็นใจผู้อื่น ชอบแก้ปัญหาผ่านการสื่อสารหรือการทำงานร่วมกัน และมักไม่ชอบงานที่ต้องใช้เครื่องมือหรือวัตถุเป็นหลัก',
    tags: ['ชอบช่วยเหลือ', 'ทำงานกับคน'],
    glyphColor: '#F2A03D',
    letterColor: '#c06410',
    icon: '/images/riasec-icons/riasec-social.svg',
  },
  {
    code: 'E',
    en: 'Enterprising',
    th: 'สายผู้นำและโน้มน้าว',
    quote:
      '“นักโน้มน้าว” — กระตือรือร้น มุ่งมั่น กล้าเสี่ยง มีทักษะด้านผู้นำ การโน้มน้าว และธุรกิจ',
    description:
      'ชอบงานที่เกี่ยวข้องกับการโน้มน้าว ชักจูง หรือเป็นผู้นำผู้อื่น เพื่อบรรลุเป้าหมายทางธุรกิจหรือองค์กร มักมีความมั่นใจ กล้าตัดสินใจ และมีพลังในการขับเคลื่อนงาน สนใจความสำเร็จ ผลลัพธ์ และการเติบโตในบทบาทผู้นำ อาจไม่ชอบงานที่มีรายละเอียดมากเกินไป และชอบการสื่อสารที่สั้นกระชับ',
    tags: ['ชอบเป็นผู้นำ', 'โน้มน้าว', 'ทำธุรกิจ'],
    glyphColor: '#E9D055',
    letterColor: '#a3881a',
    icon: '/images/riasec-icons/riasec-enterprising.svg',
  },
  {
    code: 'C',
    en: 'Conventional',
    th: 'สายระบบระเบียบ',
    quote:
      '“นักจัดระบบ” — เป็นระเบียบ รอบคอบ ชอบทำงานกับข้อมูล งานที่มีขั้นตอนชัดเจน และการจัดการระบบ',
    description:
      'ชอบงานที่มีโครงสร้างชัดเจน เป็นระเบียบ และมีขั้นตอนที่แน่นอน มักถนัดการทำงานกับข้อมูล ตัวเลข หรือเอกสาร มีความละเอียดรอบคอบ และปฏิบัติตามกฎระเบียบได้ดี มักชอบสภาพแวดล้อมที่มีความชัดเจนมากกว่าความคลุมเครือ',
    tags: ['ชอบงานเป็นระบบ', 'ระเบียบ', 'ข้อมูล'],
    glyphColor: '#81BA85',
    letterColor: '#3f8550',
    icon: '/images/riasec-icons/riasec-conventional.svg',
  },
]

// Renders the same character SVG as the selected state, but truly static. The source SVGs
// self-animate via SMIL (<animate*> elements), which always plays inside <img> and is
// unreliable to pause inside <object>. So we fetch the markup once, strip every <animate*>
// element (leaving the glyph frozen on its frame-0 pose), and inline it. IDs are namespaced
// per source so the multiple inlined copies don't share gradient ids.
const frozenSvgCache = new Map<string, string>()

function sanitizeSvg(raw: string, prefix: string) {
  return (
    raw
      // Drop all SMIL animation elements (self-closing or paired) — nothing left to animate.
      .replace(/<animate[A-Za-z]*\b[^>]*\/>/g, '')
      .replace(/<animate[A-Za-z]*\b[^>]*>[\s\S]*?<\/animate[A-Za-z]*>/g, '')
      // Namespace ids + their references so concurrent inlined copies don't collide.
      .replace(/id="(i\d+)"/g, `id="${prefix}-$1"`)
      .replace(/url\(#(i\d+)\)/g, `url(#${prefix}-$1)`)
  )
}

function FrozenCharacterSvg({ src, className }: { src: string; className?: string }) {
  const [markup, setMarkup] = useState<string | null>(() => frozenSvgCache.get(src) ?? null)

  useEffect(() => {
    // Lazy initializer already covers the cached case; only fetch on a miss.
    if (frozenSvgCache.has(src)) return
    let cancelled = false
    const prefix = src.replace(/[^a-z0-9]/gi, '')
    fetch(src)
      .then((res) => res.text())
      .then((raw) => {
        const clean = sanitizeSvg(raw, prefix)
        frozenSvgCache.set(src, clean)
        if (!cancelled) setMarkup(clean)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [src])

  return (
    <span
      aria-hidden
      className={className}
      dangerouslySetInnerHTML={markup ? { __html: markup } : undefined}
    />
  )
}

interface CharacterRowProps {
  inView: boolean
  activeIndex: number
  onActivate: (i: number) => void
}

function CharacterRow({ inView, activeIndex, onActivate }: CharacterRowProps) {
  return (
    <motion.div
      role="group"
      aria-label="RIASEC characters"
      className="flex items-end justify-center gap-1 sm:gap-3 md:gap-5"
      variants={rowStagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {ARCHETYPES.map((a, i) => {
        const isActive = i === activeIndex
        const src = `/images/riasec-parallax/character/${a.code.toLowerCase()}.svg`
        return (
          <motion.div
            key={a.code}
            variants={charDrop}
            className="flex flex-1 basis-0 justify-center"
            style={{ maxWidth: 132 }}
          >
            <button
              type="button"
              aria-pressed={isActive}
              aria-label={`${a.code} - ${a.en}`}
              onClick={() => onActivate(i)}
              className="group flex w-full cursor-pointer flex-col items-center gap-2 rounded-3xl px-1 pb-3 pt-4 outline-none transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-brand-primary-400"
              style={{
                transform: isActive ? 'translateY(-6px)' : 'none',
                background: isActive ? `${a.glyphColor}29` : 'transparent',
              }}
            >
              <span className="relative flex w-full items-end justify-center">
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-3 h-3/4 w-3/4 rounded-full blur-xl transition-opacity duration-500"
                  style={{ background: a.glyphColor, opacity: isActive ? 0.45 : 0 }}
                />
                {isActive ? (
                  // Selected: the self-animating lottie SVG (full body/arm/eye wiggle, exactly
                  // like the source file). Loaded via <img> so its SMIL animation runs.
                  <motion.img
                    src={src}
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="relative block h-auto w-full"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1.06 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                ) : (
                  // Not selected: the same character SVG, but frozen on its first frame
                  // (no self-animation). Sized square to match the active <img> above.
                  <motion.div
                    className="relative block w-full"
                    animate={{ scale: 0.9, y: 0 }}
                    whileHover={{ y: -4, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <FrozenCharacterSvg
                      src={src}
                      className="pointer-events-none block aspect-square w-full"
                    />
                  </motion.div>
                )}
              </span>
              {/* <span
                className="text-lg font-bold leading-none transition-colors duration-300 md:text-xl"
                style={{ color: isActive ? a.glyphColor : '#19181b' }}
              >
                {a.code}
              </span>
              <span
                className="hidden text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] transition-colors duration-300 sm:block md:text-[10px]"
                style={{ color: isActive ? a.glyphColor : '#9a96a3' }}
              >
                {a.en}
              </span> */}
            </button>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default function RiasecAtlas() {
  const containerRef = useRef<HTMLElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const active = ARCHETYPES[activeIndex]

  const h2Ref = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress: h2Progress } = useScroll({
    target: h2Ref,
    offset: ['start 0.85', 'center 0.35'],
  })

  const pRef = useRef<HTMLDivElement>(null)
  const pInView = useInView(pRef, { once: true, margin: '-20% 0px' })
  const rowInView = useInView(rowRef, { once: true, margin: '-20% 0px' })
  const detailInView = useInView(detailRef, { once: true, margin: '-20% 0px' })

  return (
    <section
      ref={containerRef}
      className="relative z-10 bg-bg-base-white px-6 pt-[80px] pb-[160px] md:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 text-center">
          <h2 ref={h2Ref} className="mb-4" aria-label="RIASEC">
            <TextRevealScroll
              text="ค้นพบบุคลิกภาพ"
              progress={h2Progress}
              className="inline-block text-[56px] font-bold leading-[0.95] tracking-[-0.04em] md:text-[clamp(64px,8vw,112px)]"
            />
          </h2>
          <div ref={pRef} className="overflow-hidden py-[0.06em]">
            <motion.p
              className="mx-auto text-[17px] leading-[1.7] text-[#767279]"
              style={{ maxWidth: '58ch' }}
              initial="hidden"
              animate={pInView ? 'visible' : 'hidden'}
              variants={maskReveal}
            >
              {/* TODO: need to edit wording */}
              แบบทดสอบบุคลิกภาพ RIASEC เครื่องมือแนะนำความเหมาะสมทางอาชีพ
              <br />
              สำรวจ 6 บุคลิกภาพที่บอกว่าคุณเป็นคนแบบไหน
            </motion.p>
          </div>
        </div>

        {/* Width = the character row's rendered span (6 × 132px caps + 5 × 20px gaps = 892px),
            so the detail card lines up exactly with the SVG letters above it. */}
        <div className="mx-auto flex max-w-[892px] flex-col items-stretch gap-14">
          <div ref={rowRef} className="w-full">
            <CharacterRow
              inView={rowInView}
              activeIndex={activeIndex}
              onActivate={setActiveIndex}
            />
          </div>

          <motion.div
            ref={detailRef}
            initial={{ opacity: 0, y: 28 }}
            animate={detailInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="relative min-h-[260px] w-full overflow-hidden rounded-[20px] border-[3px] p-6 md:rounded-[28px] md:p-10"
            style={{
              background: `${active.glyphColor}24`,
              borderColor: active.letterColor,
              boxShadow: `8px 8px 0 0 ${active.letterColor}`,
              transition: 'background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease',
            }}
          >
            {/* Copy — re-animates on each switch */}
            <motion.div
              key={active.code}
              className="relative"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <p className="text-[32px] font-semibold leading-tight tracking-[-0.01em] text-[#19181b] md:text-[40px]">
                {active.en}
              </p>
              <p className="mb-5 text-sm font-medium text-[#767279]">{active.th}</p>

              <p
                className="mb-5 rounded-2xl border-[3px] px-4 py-3 text-[18px] font-medium leading-[1.7] text-[#19181b] md:text-[18px]"
                style={{
                  background: `color-mix(in srgb, ${active.glyphColor} 60%, transparent)`,
                  borderColor: active.letterColor,
                  boxShadow: `4px 4px 0 0 ${active.letterColor}`,
                }}
              >
                {active.quote}
              </p>

              {active.description && (
                <p className="mb-5 text-[16px] leading-[1.85] text-[#56535a]">
                  {active.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border-2 px-3 py-[5px] text-xs font-bold"
                    style={{
                      background: `color-mix(in srgb, ${active.glyphColor} 60%, transparent)`,
                      color: '#19181b',
                      borderColor: active.letterColor,
                      boxShadow: `3px 3px 0 0 ${active.letterColor}`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
