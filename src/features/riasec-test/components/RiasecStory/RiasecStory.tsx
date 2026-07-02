'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

import { Button } from '@/components/ui'
import { SectionMediaType } from '@/features/riasec-test/enums'

interface RiasecStoryProps {
  mediaType?: SectionMediaType
  mediaSrc?: string
  title?: string
  description?: string
  nextLabel?: string
  onNext: () => void
}

export function RiasecStory({
  mediaType,
  mediaSrc,
  title,
  description,
  nextLabel = 'เริ่มทำส่วนนี้',
  onNext,
}: RiasecStoryProps) {
  return (
    <div className="container-compact py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="overflow-hidden rounded-2xl border border-border-base-gray-medium bg-fill-base-white shadow-sm"
      >
        {mediaSrc && mediaType === SectionMediaType.IMAGE && (
          <div className="relative h-60 w-full md:h-80">
            <Image src={mediaSrc} alt={title ?? ''} fill className="object-cover" sizes="100vw" />
          </div>
        )}
        {mediaSrc && mediaType === SectionMediaType.VIDEO && (
          <video src={mediaSrc} controls className="h-60 w-full bg-black md:h-80" />
        )}

        <div className="flex flex-col gap-4 p-6 md:p-8">
          {mediaSrc && mediaType === SectionMediaType.AUDIO && (
            <audio src={mediaSrc} controls className="w-full" />
          )}
          {title && <h2 className="text-2xl font-bold text-text-base-primary">{title}</h2>}
          {description && (
            <p className="text-base leading-relaxed text-text-base-secondary">{description}</p>
          )}

          <div className="mt-2 flex justify-end">
            <Button size="lg" onClick={onNext}>
              {nextLabel}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
