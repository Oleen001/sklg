'use client'

import { useCallback, useMemo, useState } from 'react'

import { QuestionType } from '@/features/riasec-test/enums'
import type { RiasecQuestion, RiasecTestFormFields } from '@/features/riasec-test/interfaces'
import { flattenQuestions } from '@/features/riasec-test/utils'

function buildDefaults(questions: RiasecQuestion[]): RiasecTestFormFields {
  const fields: RiasecTestFormFields = {}
  flattenQuestions(questions).forEach((question) => {
    switch (question.type) {
      case QuestionType.MULTIPLE:
        fields[question.id] = []
        break
      // REORDER starts pre-filled with the answers in their given order.
      case QuestionType.REORDER:
        fields[question.id] = question.answers.map((answer) => answer.id)
        break
      default:
        fields[question.id] = ''
    }
  })
  return fields
}

// Lightweight form state for the test — replaces the source project's
// react-hook-form usage with plain React state (no extra dependency).
export function useRiasecTestForm(questions: RiasecQuestion[]) {
  const defaults = useMemo(() => buildDefaults(questions), [questions])
  const [fields, setFields] = useState<RiasecTestFormFields>(defaults)

  const setField = useCallback((id: string, value: string | string[] | undefined) => {
    setFields((prev) => ({ ...prev, [id]: value }))
  }, [])

  const getValue = useCallback((id: string) => fields[id], [fields])

  const reset = useCallback(() => setFields(defaults), [defaults])

  return { fields, setField, getValue, reset }
}
