'use client'

import { Download, Share2 } from 'lucide-react'

import { Button } from '@/components/ui'
import { defaultQuestionTheme } from '@/features/riasec-test/constants'

interface RiasecShareSectionProps {
  title: string
}

export function RiasecShareSection({ title }: RiasecShareSectionProps) {
  // Web Share API where available, otherwise copy the link to the clipboard.
  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // user dismissed the share sheet — no-op
      }
      return
    }
    await navigator.clipboard.writeText(url)
  }

  // Browser print-to-PDF — keeps the download feature working without pulling in
  // html-to-image / jspdf (which the target project does not ship).
  const handleDownloadPdf = () => window.print()

  return (
    <div
      // Same surface as the result cards: thick border + hard offset shadow.
      style={{
        borderColor: defaultQuestionTheme.shadow,
        boxShadow: `6px 6px 0 0 ${defaultQuestionTheme.shadow}`,
      }}
      className="flex flex-col gap-3 rounded-xl border-4 bg-fill-base-white p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="text-base font-semibold text-text-base-primary">แชร์ผลลัพธ์ของคุณ</p>
        <p className="text-sm text-text-base-secondary">บันทึกหรือส่งต่อผลบุคลิกภาพให้เพื่อนได้</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleDownloadPdf}>
          <Download className="h-4 w-4" />
          ดาวน์โหลด PDF
        </Button>
        <Button size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
          แชร์
        </Button>
      </div>
    </div>
  )
}
