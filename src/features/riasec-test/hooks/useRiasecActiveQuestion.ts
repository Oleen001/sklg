'use client'

import { useState } from 'react'

import { QuestionType } from '@/features/riasec-test/enums'
import type { RiasecQuestion, RiasecSection } from '@/features/riasec-test/interfaces'

interface UseRiasecActiveQuestionProps {
  allQuestions: RiasecQuestion[]
  sections: RiasecSection[]
  currentSectionIndex: number
  getAnswer: (questionId: string) => string | string[] | undefined
}

// Walks the active section's questions one at a time, descending into the
// conditional sub-questions of the selected answer before moving on. Ported from
// the source project's `useRiasecActiveQuestion`.
export function useRiasecActiveQuestion({
  allQuestions,
  sections,
  currentSectionIndex,
  getAnswer,
}: UseRiasecActiveQuestionProps) {
  const [majorIndex, setMajorIndex] = useState(0)
  const [minorIndex, setMinorIndex] = useState<number | null>(null)

  const majorQuestionsBySection = sections.map((section) =>
    allQuestions.filter(
      (question) => question.sectionId === section.id && question.parentQuestionId === null,
    ),
  )
  const totalMajorQuestions = majorQuestionsBySection.reduce(
    (acc, sectionQuestions) => acc + sectionQuestions.length,
    0,
  )
  const sectionOffset = majorQuestionsBySection
    .slice(0, currentSectionIndex)
    .reduce((acc, sectionQuestions) => acc + sectionQuestions.length, 0)

  const questions = majorQuestionsBySection[currentSectionIndex] ?? []
  const currentMajor = questions[majorIndex]

  const selectedAnswer = currentMajor ? getAnswer(currentMajor.id) : undefined
  const subQuestions: RiasecQuestion[] = (() => {
    if (currentMajor?.type === QuestionType.SINGLE) {
      return currentMajor.answers.find((answer) => answer.id === selectedAnswer)?.subQuestions ?? []
    }
    if (currentMajor?.type === QuestionType.MULTIPLE) {
      const selectedIds = Array.isArray(selectedAnswer) ? selectedAnswer : []
      const sub = currentMajor.answers
        .filter((answer) => selectedIds.includes(answer.id))
        .flatMap((answer) => answer.subQuestions ?? [])
      return Array.from(new Map(sub.map((question) => [question.id, question])).values())
    }
    return []
  })()

  // minorIndex !== null means we are inside a sub-question branch of the current major.
  const currentQuestion: RiasecQuestion | undefined =
    minorIndex !== null ? subQuestions[minorIndex] : currentMajor

  const isLastMajor = questions.length === 0 || majorIndex === questions.length - 1

  const isLastNode =
    minorIndex !== null
      ? isLastMajor && minorIndex === subQuestions.length - 1
      : isLastMajor && subQuestions.length === 0

  const progress =
    totalMajorQuestions === 0
      ? 0
      : Math.round(((sectionOffset + majorIndex) / totalMajorQuestions) * 100)

  const goToNextMajor = () => {
    setMajorIndex((prev) => prev + 1)
    setMinorIndex(null)
  }

  // Walks minor → major in order; the caller handles cross-section advance.
  const handleNext = () => {
    if (minorIndex !== null) {
      if (minorIndex < subQuestions.length - 1) {
        setMinorIndex(minorIndex + 1)
      } else {
        goToNextMajor()
      }
      return
    }
    if (subQuestions.length > 0) {
      setMinorIndex(0)
    } else {
      goToNextMajor()
    }
  }

  const reset = () => {
    setMajorIndex(0)
    setMinorIndex(null)
  }

  return { currentQuestion, currentMajor, isLastNode, handleNext, reset, progress }
}
