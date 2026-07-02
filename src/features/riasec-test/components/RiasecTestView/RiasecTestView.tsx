'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Route } from '@/enums'
import { RiasecTest } from '@/features/riasec-test/components/RiasecTest'
import { pickRiasecSuggestion, riasecQuestionSet } from '@/features/riasec-test/constants'
import type { RiasecTestFormFields } from '@/features/riasec-test/interfaces'
import { evaluateRiasecResult } from '@/features/riasec-test/utils'
import { generatePath } from '@/utils'

export function RiasecTestView() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (fields: RiasecTestFormFields) => {
    setIsSubmitting(true)
    // Mock submit — resolve to a static result and navigate (no API call).
    const resultId = evaluateRiasecResult(fields)
    router.push(generatePath(Route.RIASEC_TEST_RESULT, { resultId }))
  }

  return (
    <RiasecTest
      questions={riasecQuestionSet.questions}
      sections={riasecQuestionSet.sections}
      suggestion={pickRiasecSuggestion()}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  )
}
