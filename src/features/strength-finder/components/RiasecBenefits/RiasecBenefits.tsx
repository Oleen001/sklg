'use client'

import { CSSProperties, useEffect, useRef, useState } from 'react'

import styles from './RiasecBenefits.module.css'

type Pose = {
  x: number
  y: number
  w: number
  h: number
  rotate?: number
  opacity?: number
}

type Letter = 'c' | 's' | 'i' | 'r' | 'a' | 'e'

type Character = {
  id: Letter
  label: string
  poses: Pose[]
}

type Cloud = {
  id: string
  src: string
  z: number
  opacity?: number
  poses: Pose[]
}

type StoryStep = {
  id: string
  title: string
  lines: string[]
  progress: number
  radius: number
}

const STAGE = { width: 1366, height: 900 }
const KEY_STOPS = [0, 0.36, 0.7, 1] as const
const MASCOT_SIZE_SCALE = 0.9
const MASCOT_GAP_STEP = 16
// How far (px) a story card drifts vertically while fading. It sits -DRIFT above its anchor
// at the fade edges and eases to 0 at peak visibility, so it enters from the top and exits
// back toward the top.
const STORY_DRIFT_PX = 44
const CLOUD_BASE = '/images/riasec-parallax/clouds'
const CHARACTER_BASE = '/images/riasec-parallax/character'

const mascotStackOrder: Record<Letter, number> = {
  c: -2.5,
  e: -1.5,
  s: -0.5,
  a: 0.5,
  i: 1.5,
  r: 2.5,
}

// Real benefit content mapped onto the reference's pulsing story beats. Beat 0 is the
// emotional intro (the original heading); beats 1–4 are the four benefits. They are placed
// in the pinned portion of the track (progress ~0.22 onward — see useScrollProgress) so the
// text stays stable while the section is locked, finishing before the closing white wash.
const STORY_STEPS: StoryStep[] = [
  {
    id: 'intro',
    title: 'ถ้าคุณกำลังรู้สึกหลงทางอยู่',
    progress: 0.26,
    radius: 0.1,
    lines: ['การทำความเข้าใจตัวเอง', 'อาจเป็นจุดเริ่มต้นของความชัดเจนทั้งหมด'],
  },
  {
    id: 'strength',
    title: '· จุดแข็ง ·',
    progress: 0.41,
    radius: 0.1,
    lines: ['เข้าใจจุดแข็งและความถนัดของตัวเอง', 'สิ่งที่คุณทำได้ดีโดยธรรมชาติ'],
  },
  {
    id: 'environment',
    title: '· สภาพแวดล้อม ·',
    progress: 0.56,
    radius: 0.1,
    lines: ['เห็นภาพว่า environment แบบไหน', 'ที่เหมาะกับคุณจริง ๆ'],
  },
  {
    id: 'career',
    title: '· อาชีพที่ใช่ ·',
    progress: 0.71,
    radius: 0.1,
    lines: ['ค้นหาอาชีพที่สอดคล้อง', 'กับบุคลิกภาพจริง ๆ ของคุณ'],
  },
  {
    id: 'plan',
    title: '· แผนการเรียนรู้ ·',
    progress: 0.86,
    radius: 0.1,
    lines: ['วางแผนการเรียนรู้ทีละก้าว', 'สู่เส้นทางอาชีพที่ชัดเจน'],
  },
]

const characters: Character[] = [
  {
    id: 'c',
    label: 'Conventional',
    poses: [
      { x: 450.59, y: -1954, w: 352.65, h: 376.63, rotate: 13.01 },
      { x: 450.59, y: -890, w: 352.65, h: 376.63, rotate: 13.01 },
      { x: 414.7, y: -395, w: 429.92, h: 429.92, rotate: -45 },
      { x: 414.7, y: 488.35, w: 429.92, h: 429.92, rotate: -45 },
    ],
  },
  {
    id: 's',
    label: 'Social',
    poses: [
      { x: 473.29, y: -1342.32, w: 297.3, h: 328.34, rotate: -1.69 },
      { x: 473.29, y: -278.32, w: 297.3, h: 328.34, rotate: -1.69 },
      { x: 417.15, y: 207.1, w: 415.08, h: 400.79, rotate: -63.4 },
      { x: 417.15, y: 1090.45, w: 415.08, h: 400.79, rotate: -63.4 },
    ],
  },
  {
    id: 'i',
    label: 'Investigative',
    poses: [
      { x: 443, y: -711, w: 354.48, h: 378.17, rotate: -13.44 },
      { x: 443, y: 353, w: 354.48, h: 378.17, rotate: -13.44 },
      { x: 412, y: 858.4, w: 421.96, h: 410.67, rotate: -59.45 },
      { x: 412, y: 1741.75, w: 421.96, h: 410.67, rotate: -59.45 },
    ],
  },
  {
    id: 'r',
    label: 'Realistic',
    poses: [
      { x: 472.53, y: -356, w: 386.9, h: 404.58, rotate: 22 },
      { x: 472.53, y: 708, w: 386.9, h: 404.58, rotate: 22 },
      { x: 476.9, y: 1251.43, w: 383.64, h: 361.01, rotate: 75 },
      { x: 476.9, y: 2134.79, w: 383.64, h: 361.01, rotate: 75 },
    ],
  },
  {
    id: 'a',
    label: 'Artistic',
    poses: [
      { x: 509.13, y: -1050, w: 390.1, h: 407.06, rotate: 22.99 },
      { x: 509.13, y: 14, w: 390.1, h: 407.06, rotate: 22.99 },
      { x: 518.58, y: 562.82, w: 376.68, h: 352.72, rotate: 76.97 },
      { x: 518.58, y: 1446.17, w: 376.68, h: 352.72, rotate: 76.97 },
    ],
  },
  {
    id: 'e',
    label: 'Enterprising',
    poses: [
      { x: 556.62, y: -1680, w: 366.18, h: 387.92, rotate: -16.29 },
      { x: 556.62, y: -616, w: 366.18, h: 387.92, rotate: -16.29 },
      { x: 531.14, y: -114.84, w: 422.62, h: 428.9, rotate: 37.02 },
      { x: 531.14, y: 768.51, w: 422.62, h: 428.9, rotate: 37.02 },
    ],
  },
]

const clouds: Cloud[] = [
  {
    id: 'cloud-12',
    src: `${CLOUD_BASE}/cloud-12.svg`,
    z: 18,
    opacity: 0.9,
    poses: [
      { x: 148.73, y: 179, w: 590.19, h: 302 },
      { x: -563.27, y: 179, w: 590.19, h: 302 },
      { x: -459.27, y: 179, w: 590.19, h: 302 },
      { x: 148.73, y: 179, w: 590.19, h: 302 },
    ],
  },
  {
    id: 'cloud-6-right',
    src: `${CLOUD_BASE}/cloud-6-right.svg`,
    z: 30,
    opacity: 0.88,
    poses: [
      { x: 560.61, y: 178.75, w: 674.89, h: 393.5, rotate: -5.51 },
      { x: 1072.61, y: 178.75, w: 674.89, h: 393.5, rotate: -5.51 },
      { x: 960.61, y: 178.75, w: 674.89, h: 393.5, rotate: -5.51 },
      { x: 560.61, y: 178.75, w: 674.89, h: 393.5, rotate: -5.51 },
    ],
  },
  {
    id: 'cloud-6-left',
    src: `${CLOUD_BASE}/cloud-6-left.svg`,
    z: 26,
    opacity: 0.82,
    poses: [
      { x: -145, y: 436, w: 654.06, h: 398.66 },
      { x: -490, y: 436, w: 654.06, h: 398.66 },
      { x: -553, y: 436, w: 654.06, h: 398.66 },
      { x: -145, y: 436, w: 654.06, h: 398.66 },
    ],
  },
  {
    id: 'cloud-9-left',
    src: `${CLOUD_BASE}/cloud-9-left.svg`,
    z: 34,
    opacity: 0.78,
    poses: [
      { x: -245.1, y: 191, w: 708.39, h: 274 },
      { x: -645.1, y: 191, w: 708.39, h: 274 },
      { x: -429.1, y: 191, w: 708.39, h: 274 },
      { x: -245.1, y: 191, w: 708.39, h: 274 },
    ],
  },
  {
    id: 'cloud-9-center',
    src: `${CLOUD_BASE}/cloud-9-center.svg`,
    z: 44,
    opacity: 0.78,
    poses: [
      { x: 463, y: 392.3, w: 621.17, h: 293.08 },
      { x: 1091, y: 481, w: 433.17, h: 204.38 },
      { x: 839, y: 392.3, w: 621.17, h: 293.08 },
      { x: 463, y: 392.3, w: 621.17, h: 293.08 },
    ],
  },
  {
    id: 'cloud-15-right',
    src: `${CLOUD_BASE}/cloud-15-right.svg`,
    z: 32,
    opacity: 0.82,
    poses: [
      { x: 898, y: 139.7, w: 674, h: 613.77 },
      { x: 1130, y: 139.7, w: 674, h: 613.77 },
      { x: 1274, y: 139.7, w: 674, h: 613.77 },
      { x: 898, y: 139.7, w: 674, h: 613.77 },
    ],
  },
  {
    id: 'cloud-15-bottom',
    src: `${CLOUD_BASE}/cloud-15-bottom.svg`,
    z: 46,
    opacity: 0.84,
    poses: [
      { x: 444, y: 578, w: 674, h: 442.72 },
      { x: 1571, y: 519, w: 674, h: 442.72 },
      { x: 1156, y: 578, w: 674, h: 442.72 },
      { x: 444, y: 578, w: 674, h: 442.72 },
    ],
  },
  {
    id: 'cloud-14-left',
    src: `${CLOUD_BASE}/cloud-14-left.svg`,
    z: 42,
    opacity: 0.86,
    poses: [
      { x: 139, y: 381.21, w: 486, h: 355.71 },
      { x: -493, y: 381.21, w: 486, h: 355.71 },
      { x: -269, y: 381.21, w: 486, h: 355.71 },
      { x: 139, y: 381.21, w: 486, h: 355.71 },
    ],
  },
  {
    id: 'cloud-14-top',
    src: `${CLOUD_BASE}/cloud-14-top.svg`,
    z: 48,
    opacity: 0.82,
    poses: [
      { x: 335, y: 77, w: 639, h: 368 },
      { x: 1428, y: 77, w: 639, h: 467.69 },
      { x: 1103, y: 77, w: 639, h: 368 },
      { x: 335, y: 77, w: 639, h: 368 },
    ],
  },
]

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress
}

function easeInOut(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2
}

function poseAt(poses: Pose[], progress: number): Pose {
  const safeProgress = clamp(progress)
  let index = KEY_STOPS.length - 2

  for (let i = 0; i < KEY_STOPS.length - 1; i += 1) {
    if (safeProgress <= KEY_STOPS[i + 1]) {
      index = i
      break
    }
  }

  const segmentStart = KEY_STOPS[index]
  const segmentEnd = KEY_STOPS[index + 1]
  const segmentProgress = easeInOut((safeProgress - segmentStart) / (segmentEnd - segmentStart))
  const from = poses[index]
  const to = poses[index + 1]

  return {
    x: lerp(from.x, to.x, segmentProgress),
    y: lerp(from.y, to.y, segmentProgress),
    w: lerp(from.w, to.w, segmentProgress),
    h: lerp(from.h, to.h, segmentProgress),
    rotate: lerp(from.rotate ?? 0, to.rotate ?? 0, segmentProgress),
    opacity: lerp(from.opacity ?? 1, to.opacity ?? 1, segmentProgress),
  }
}

function pointStyle(pose: Pose, extra?: CSSProperties): CSSProperties {
  return {
    left: `${(pose.x / STAGE.width) * 100}%`,
    top: `${(pose.y / STAGE.height) * 100}%`,
    width: `${(pose.w / STAGE.width) * 100}%`,
    height: `${(pose.h / STAGE.height) * 100}%`,
    opacity: pose.opacity ?? 1,
    transform: `rotate(${pose.rotate ?? 0}deg) translateZ(0)`,
    ...extra,
  }
}

function adjustMascotPose(letter: Letter, pose: Pose): Pose {
  const width = pose.w * MASCOT_SIZE_SCALE
  const height = pose.h * MASCOT_SIZE_SCALE
  const centerX = pose.x + pose.w / 2
  const centerY = pose.y + pose.h / 2 + mascotStackOrder[letter] * MASCOT_GAP_STEP

  return {
    ...pose,
    x: centerX - width / 2,
    y: centerY - height / 2,
    w: width,
    h: height,
  }
}

function pulse(center: number, progress: number, radius: number) {
  const distance = Math.abs(progress - center)
  if (distance >= radius) return 0
  return 1 - easeInOut(distance / radius)
}

function useScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0

    const measure = () => {
      raf = 0
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      // progress 0 = section top enters the viewport bottom (it first appears). Mapping over
      // the track height plus HALF a viewport makes the section UNPIN at ~0.9 — i.e. once the
      // scene has begun fading to white near the end, the lock releases and the section
      // scrolls up into the next one while the white-wash finishes. (A larger multiplier
      // unlocks earlier; 0 keeps it locked until the very end.)
      const span = Math.max(1, rect.height + window.innerHeight * 0.5)
      setProgress(clamp((window.innerHeight - rect.top) / span))
    }

    const requestMeasure = () => {
      if (!raf) raf = window.requestAnimationFrame(measure)
    }

    // Defer the initial measurement to the next frame so we don't call setState
    // synchronously inside the effect (which would trigger a cascading render).
    requestMeasure()
    window.addEventListener('scroll', requestMeasure, { passive: true })
    window.addEventListener('resize', requestMeasure)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', requestMeasure)
      window.removeEventListener('resize', requestMeasure)
    }
  }, [])

  return { ref, progress }
}

function CharacterSprite({ character }: { character: Character }) {
  return (
    <div
      aria-label={`${character.label} RIASEC character`}
      className={styles.characterSprite}
      role="img"
    >
      <img
        alt=""
        aria-hidden="true"
        className={styles.characterFrame}
        draggable={false}
        src={`${CHARACTER_BASE}/${character.id}.svg`}
      />
    </div>
  )
}

function StoryCard({ step, progress }: { step: StoryStep; progress: number }) {
  const visibility = pulse(step.progress, progress, step.radius)
  // Vertical fade drift: 0 at peak, -DRIFT (above the anchor) at the fade edges — the card
  // eases down from the top as it appears and lifts back up as it disappears.
  const lift = (1 - visibility) * STORY_DRIFT_PX

  return (
    <article
      className={styles.storyCard}
      data-active={visibility > 0.25}
      style={
        {
          opacity: visibility,
          transform: `translate(-50%, calc(-50% - ${lift}px))`,
        } as CSSProperties
      }
    >
      <h2>{step.title}</h2>
      {step.lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </article>
  )
}

export default function RiasecBenefits() {
  const { ref, progress } = useScrollProgress()
  // White hold only at the END (clean handoff to the next section). The start no longer
  // holds white, so the cloud scene is visible and animating the moment the section enters.
  const washOpacity = pulse(1, progress, 0.2) * 0.96
  const ovalOpacity = Math.max(
    ...STORY_STEPS.map((step) => pulse(step.progress, progress, step.radius + 0.04)),
  )

  return (
    <section className={styles.parallaxPage}>
      <div className={styles.scrollScene} ref={ref} aria-label="RIASEC parallax animation">
        <div className={styles.stickyScene}>
          <div className={styles.stageFrame}>
            <div className={styles.stage} style={{ '--progress': progress } as CSSProperties}>
              <div className={styles.stageBg} aria-hidden="true" />
              <div className={styles.cloudsLayer} aria-hidden="true">
                {clouds.map((cloud) => {
                  const pose = poseAt(cloud.poses, progress)
                  return (
                    <img
                      key={cloud.id}
                      alt=""
                      className={styles.cloud}
                      draggable={false}
                      src={cloud.src}
                      style={pointStyle(pose, {
                        opacity: (pose.opacity ?? 1) * (cloud.opacity ?? 1),
                        zIndex: cloud.z,
                      })}
                    />
                  )
                })}
              </div>
              <div className={styles.charactersLayer}>
                {characters.map((character) => (
                  <div
                    key={character.id}
                    className={styles.character}
                    data-letter={character.id}
                    style={pointStyle(
                      adjustMascotPose(character.id, poseAt(character.poses, progress)),
                    )}
                  >
                    <CharacterSprite character={character} />
                  </div>
                ))}
              </div>
              <div
                className={styles.focusOval}
                aria-hidden="true"
                style={{ opacity: ovalOpacity } as CSSProperties}
              />
              <div className={styles.storyLayer} aria-live="polite">
                {STORY_STEPS.map((step) => (
                  <StoryCard key={step.id} progress={progress} step={step} />
                ))}
              </div>
              <div
                className={styles.whiteWash}
                aria-hidden="true"
                style={{ opacity: washOpacity }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
