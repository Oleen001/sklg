'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

import { decorationMotion } from '@/features/riasec-test/constants'
import { RiasecQuestionAnimation } from '@/features/riasec-test/enums'

interface QuestionDecorationProps {
  src: string
  animation?: RiasecQuestionAnimation
}

export function QuestionDecoration({
  src,
  animation = RiasecQuestionAnimation.FLOAT,
}: QuestionDecorationProps) {
  const motionPreset = decorationMotion[animation]

  return (
    <div className="flex justify-center">
      <motion.div
        animate={motionPreset.animate}
        transition={motionPreset.transition}
        className="relative h-32 w-32 md:h-40 md:w-40"
      >
        {/* `unoptimized` keeps animated webp / gif playing instead of being frozen. */}
        <Image src={src} alt="" fill sizes="160px" className="object-contain" unoptimized />
      </motion.div>
    </div>
  )
}
