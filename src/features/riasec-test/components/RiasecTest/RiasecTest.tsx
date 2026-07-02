'use client'

import { useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'

import { Progress } from '@/components/ui'
import { RiasecCtaButton } from '@/features/riasec-test/components/RiasecCtaButton'
import { MessMindStory } from '@/features/riasec-test/components/MessMindStory'
import { RiasecInstruction } from '@/features/riasec-test/components/RiasecInstruction'
import { RiasecQuestionForm } from '@/features/riasec-test/components/RiasecQuestionForm'
import { RiasecStory } from '@/features/riasec-test/components/RiasecStory'
import { RiasecSuggestion } from '@/features/riasec-test/components/RiasecSuggestion'
import {
  defaultQuestionTheme,
  questionFlowMotion,
  riasecLetterTheme,
  subQuestionFlowMotion,
} from '@/features/riasec-test/constants'
import { useRiasecActiveQuestion, useRiasecTestForm } from '@/features/riasec-test/hooks'
import type {
  RiasecQuestion,
  RiasecSection,
  RiasecSuggestionLevel,
  RiasecTestFormFields,
} from '@/features/riasec-test/interfaces'
import { isQuestionAnswered, replaceQuestionVariable } from '@/features/riasec-test/utils'

type TestStep = 'instruction' | 'story' | 'test' | 'suggestion'

interface RiasecTestProps {
  questions: RiasecQuestion[]
  sections: RiasecSection[]
  suggestion: RiasecSuggestionLevel
  isSubmitting?: boolean
  onSubmit: (fields: RiasecTestFormFields) => void
}

export function RiasecTest({
  questions,
  sections,
  suggestion,
  isSubmitting = false,
  onSubmit,
}: RiasecTestProps) {
  const [currentStep, setCurrentStep] = useState<TestStep>('instruction')
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const { fields, setField, getValue, reset: resetForm } = useRiasecTestForm(questions)
  const {
    currentQuestion,
    isLastNode,
    handleNext,
    reset: resetNav,
    progress,
  } = useRiasecActiveQuestion({
    allQuestions: questions,
    sections,
    currentSectionIndex,
    getAnswer: getValue,
  })

  const isLastSection = currentSectionIndex === sections.length - 1
  const isTestEnd = isLastNode && isLastSection

  const currentSection = sections[currentSectionIndex]
  const currentAnswer = currentQuestion ? getValue(currentQuestion.id) : undefined
  const isNextDisabled = currentQuestion
    ? !isQuestionAnswered(currentQuestion, currentAnswer)
    : false
  const displayProgress = submitted ? 100 : progress

  const startFromSection = (index: number) => {
    setCurrentSectionIndex(index)
    resetNav()
    setCurrentStep(sections[index]?.isDisplay === false ? 'test' : 'story')
  }

  const handleShowStory = () => {
    resetForm()
    startFromSection(0)
  }

  const handleNextSection = () => startFromSection(currentSectionIndex + 1)

  const handleSubmit = () => {
    setSubmitted(true)
    onSubmit(fields)
  }

  const handleNextClick = () => {
    if (isTestEnd) {
      // Show the suggestion screen before handing off to the result.
      setCurrentStep('suggestion')
      return
    }
    if (isLastNode && !isLastSection) {
      handleNextSection()
      return
    }
    handleNext()
  }

  if (currentStep === 'instruction') {
    return <RiasecInstruction onStartTest={handleShowStory} />
  }

  if (currentStep === 'story') {
    return (
      // <RiasecStory
      //   mediaType={currentSection?.mediaType}
      //   mediaSrc={currentSection?.mediaUrl}
      //   title={currentSection?.title}
      //   description={currentSection?.description}
      //   nextLabel="เริ่มเดินทาง"
      //   onNext={() => setCurrentStep('test')}
      // />
      <MessMindStory
        title={currentSection?.title}
        description={currentSection?.description}
        onNext={() => setCurrentStep('test')}
      />
    )
  }

  if (currentStep === 'suggestion') {
    return (
      <RiasecSuggestion suggestion={suggestion} isSubmitting={isSubmitting} onNext={handleSubmit} />
    )
  }

  if (!currentQuestion) return null

  const resolvedContent = replaceQuestionVariable(currentQuestion.content, questions, fields)

  // Theme each question by its RIASEC letter (from the decoration filename), so
  // the screen + question box share that letter's tone. Falls back to neutral.
  const letter = currentQuestion.decorationUrl?.match(/([A-Za-z])\.svg$/)?.[1]?.toUpperCase()
  const theme = (letter && riasecLetterTheme[letter]) || defaultQuestionTheme

  // Sub-questions (those with a parent) dive in; major questions slide sideways.
  const isSubQuestion = currentQuestion.parentQuestionId !== null
  const flowMotion = isSubQuestion ? subQuestionFlowMotion : questionFlowMotion

  return (
    <div
      className="w-full transition-colors duration-500"
      style={{ backgroundColor: theme.screen }}
    >
      <div className="container-compact flex min-h-[calc(100vh-4rem)] flex-col pb-8 pt-20 -mt-14">
        <div className="flex items-center gap-3">
          <Progress
            value={displayProgress}
            className="h-2.5 flex-1"
            indicatorStyle={{ backgroundColor: theme.shadow }}
          />
          <span className="w-12 text-right text-sm font-semibold text-text-base-secondary">
            {displayProgress}%
          </span>
        </div>

        {/* AnimatePresence keyed by question id gives a continuous slide between questions. */}
        <div className="mt-8 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={flowMotion.initial}
              animate={flowMotion.animate}
              exit={flowMotion.exit}
              transition={flowMotion.transition}
              // White box with a thick border + matching hard offset shadow in
              // the question's RIASEC accent tone. The right/bottom margin keeps
              // the shadow from being clipped by the overflow-hidden slider.
              style={{ borderColor: theme.shadow, boxShadow: `6px 6px 0 0 ${theme.shadow}` }}
              className="mb-1.5 mr-1.5 rounded-2xl border-4 bg-fill-base-white p-6 md:p-8"
            >
              <RiasecQuestionForm
                question={currentQuestion}
                content={resolvedContent}
                value={currentAnswer}
                onChange={(value) => setField(currentQuestion.id, value)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-40 mt-9 flex justify-end">
          <RiasecCtaButton
            size="lg"
            disabled={isNextDisabled || isSubmitting}
            onClick={handleNextClick}
            className="bg-fill-base-white hover:bg-bg-base-gray-light active:bg-bg-base-gray-light disabled:bg-fill-base-white"
          >
            {isTestEnd ? 'ไปต่อ' : 'ถัดไป'}
            <ChevronRight className="h-5 w-5" />
          </RiasecCtaButton>
        </div>
      </div>
    </div>
  )
}
