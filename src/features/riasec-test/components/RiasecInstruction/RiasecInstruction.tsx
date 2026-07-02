'use client'

import { motion } from 'motion/react'
import { ArrowRight, ClipboardList, Clock, Sparkles } from 'lucide-react'

import { RiasecCtaButton } from '@/features/riasec-test/components/RiasecCtaButton'
import { RiasecMorph } from '@/features/riasec-test/components/RiasecMorph'
import { defaultQuestionTheme, riasecInstructionBg } from '@/features/riasec-test/constants'

interface RiasecInstructionProps {
  onStartTest: () => void
}

const steps = [
  {
    icon: ClipboardList,
    title: 'ตอบตามความเป็นจริง',
    description: 'เลือกคำตอบที่ตรงกับตัวคุณมากที่สุด ไม่มีคำตอบถูกหรือผิด',
  },
  {
    icon: Clock,
    title: 'ใช้เวลาประมาณ 5-10 นาที',
    description: 'มีคำถามหลายรูปแบบ ทั้งเลือกตอบและจัดลำดับ',
  },
  {
    icon: Sparkles,
    title: 'รับผลบุคลิกภาพ RIASEC',
    description: 'ค้นพบจุดแข็งและอาชีพที่เหมาะสม',
  },
]

export function RiasecInstruction({ onStartTest }: RiasecInstructionProps) {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: riasecInstructionBg }}>
      <div className="container-compact -mt-14 pb-10 pt-20 md:pb-16">
        <div className="flex flex-col items-center text-center">
          {/* MorphSVG hero — 6 free shapes morph into R · I · A · S · E · C */}
          <RiasecMorph />

          <h1 className="mt-8 text-3xl font-bold text-text-base-primary">
            แบบทดสอบค้นหาบุคลิกภาพ RIASEC
          </h1>
          <p className="mt-3 max-w-lg text-base text-text-base-secondary">
            ค้นหาบุคลิกภาพและอาชีพที่ใช่สำหรับคุณ ผ่านแบบทดสอบความถนัดตามทฤษฎี Holland Codes
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              // Same look as the question boxes: thick border + hard offset
              // shadow, here in the neutral instruction tone.
              style={{
                borderColor: defaultQuestionTheme.shadow,
                boxShadow: `6px 6px 0 0 ${defaultQuestionTheme.shadow}`,
              }}
              className="flex flex-col items-center gap-3 rounded-2xl border-4 bg-fill-base-white p-6 text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-brand-primary-light text-text-brand-primary-dark">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-text-base-primary">{title}</h3>
              <p className="text-sm text-text-base-secondary">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <RiasecCtaButton size="lg" onClick={onStartTest}>
            เริ่มทำแบบทดสอบ
            {/* Arrow gently nudges right on a loop to invite the tap forward. */}
            <motion.span
              aria-hidden
              className="inline-flex"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="size-5" strokeWidth={2.5} />
            </motion.span>
          </RiasecCtaButton>
        </div>
      </div>
    </div>
  )
}
