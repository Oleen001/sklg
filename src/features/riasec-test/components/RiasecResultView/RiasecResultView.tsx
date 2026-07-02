'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Chip,
} from '@/components/ui'
import { RiasecCtaButton } from '@/features/riasec-test/components/RiasecCtaButton'
import { RiasecInsightCard } from '@/features/riasec-test/components/RiasecInsightCard'
import { RiasecScoreBarChart } from '@/features/riasec-test/components/RiasecScoreBarChart'
import { RiasecShareSection } from '@/features/riasec-test/components/RiasecShareSection'
import {
  buildRiasecInsights,
  defaultQuestionTheme,
  riasecArchetypes,
  riasecInstructionBg,
  riasecResults,
} from '@/features/riasec-test/constants'
import { Route } from '@/enums'
import { formatThaiDate } from '@/features/riasec-test/utils'

interface RiasecResultViewProps {
  resultId: string
}

export function RiasecResultView({ resultId }: RiasecResultViewProps) {
  const router = useRouter()
  const result = riasecResults[resultId]

  if (!result) {
    return (
      <div className="w-full" style={{ backgroundColor: riasecInstructionBg }}>
        <div className="container-compact -mt-14 pb-16 pt-20 text-center">
          <h1 className="text-2xl font-bold text-text-base-primary">ไม่พบผลลัพธ์</h1>
          <p className="mt-2 text-base text-text-base-secondary">
            ผลการทดสอบที่คุณค้นหาอาจถูกลบไปแล้ว
          </p>
          <div className="mt-6 flex justify-center">
            <RiasecCtaButton onClick={() => router.push(Route.RIASEC_TEST)}>
              ทำแบบทดสอบใหม่
            </RiasecCtaButton>
          </div>
        </div>
      </div>
    )
  }

  const insights = buildRiasecInsights(result)
  const codeLetters = result.characteristicCode.split('') as Array<keyof typeof riasecArchetypes>

  // Thick border + hard offset shadow, matching the other RIASEC boxes.
  const cardSurface = {
    borderColor: defaultQuestionTheme.shadow,
    boxShadow: `6px 6px 0 0 ${defaultQuestionTheme.shadow}`,
  }

  return (
    <div className="w-full" style={{ backgroundColor: riasecInstructionBg }}>
      <div className="container-desktop -mt-14 pb-8 pt-20 md:pb-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={Route.RIASEC_TEST_HISTORY}>ประวัติการทดสอบ</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ผลการทดสอบ</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Identity */}
          <div
            style={cardSurface}
            className="flex flex-col gap-5 rounded-2xl border-4 bg-fill-base-white p-6 md:p-8"
          >
            <div className="flex flex-wrap items-center gap-2">
              {codeLetters.map((letter) => (
                <Chip key={letter} variant="filled" size="small">
                  {letter} · {riasecArchetypes[letter]?.nameTh}
                </Chip>
              ))}
            </div>

            <div className="relative mx-auto h-48 w-48">
              <Image
                src="/images/strength-finder/character/mess-4.svg"
                alt={result.characteristicName}
                fill
                className="object-contain"
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-text-base-secondary">บุคลิกภาพของคุณคือ</p>
              <h1 className="mt-1 text-3xl font-bold text-text-brand-primary-dark">
                {result.characteristicName}
              </h1>
              <p className="mt-1 text-base text-text-base-secondary">{result.shortDescription}</p>
            </div>

            <p className="text-base leading-relaxed text-text-base-primary">
              {result.fullDescription}
            </p>
            <p className="text-sm text-text-base-tertiary">
              ทำแบบทดสอบเมื่อ {formatThaiDate(result.createdAt)}
            </p>
          </div>

          {/* Scores + insights */}
          <div className="flex flex-col gap-6">
            <div style={cardSurface} className="rounded-2xl border-4 bg-fill-base-white p-6 md:p-8">
              <h2 className="mb-5 text-xl font-semibold text-text-base-primary">คะแนนความถนัด</h2>
              <RiasecScoreBarChart scores={result.scores} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {insights.map((insight) => (
                <RiasecInsightCard key={insight.type} insight={insight} />
              ))}
            </div>

            <RiasecShareSection title={result.characteristicName} />
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <RiasecCtaButton
            className="bg-fill-base-white hover:bg-bg-base-gray-light active:bg-bg-base-gray-light"
            onClick={() => router.push(Route.RIASEC_TEST_HISTORY)}
          >
            ดูประวัติการทดสอบ
          </RiasecCtaButton>
          <RiasecCtaButton onClick={() => router.push(Route.RIASEC_TEST)}>
            ทำแบบทดสอบอีกครั้ง
          </RiasecCtaButton>
        </div>
      </div>
    </div>
  )
}
