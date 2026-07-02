'use client'

import Image from 'next/image'

import { MessQ1 } from '@/features/riasec-test/components/MessQ1'
import { MessQ2 } from '@/features/riasec-test/components/MessQ2'
import { MessQ3 } from '@/features/riasec-test/components/MessQ3'
import { MessQ4 } from '@/features/riasec-test/components/MessQ4'
import { MessWave } from '@/features/riasec-test/components/MessWave'
import { QuestionDecoration } from '@/features/riasec-test/components/QuestionDecoration'
import { ReOrderList } from '@/features/riasec-test/components/ReOrderList'
import { RiasecMultipleChoiceField } from '@/features/riasec-test/components/RiasecMultipleChoiceField'
import { RiasecSingleChoiceField } from '@/features/riasec-test/components/RiasecSingleChoiceField'
import { RiasecTextField } from '@/features/riasec-test/components/RiasecTextField'
import { QuestionType } from '@/features/riasec-test/enums'
import type { RiasecQuestion } from '@/features/riasec-test/interfaces'

interface RiasecQuestionFormProps {
  question: RiasecQuestion
  // Content with any `{{answer:...}}` variables already resolved.
  content: string
  value: string | string[] | undefined
  onChange: (value: string | string[]) => void
}

export function RiasecQuestionForm({
  question,
  content,
  value,
  onChange,
}: RiasecQuestionFormProps) {
  // Bespoke MESS interactions per question (matched by id so the order-1
  // sub-question doesn't collide with the order-1 major). Others keep static art.
  //   ft-1         → eyes track the cursor
  //   q-single     → ambient wave with floating characters
  //   q-single-sub → draggable, gravity-driven character box
  //   q-multiple   → character slot machine
  //   q-reorder    → drag the RIASEC tools into the character's hands
  let decoration = question.decorationUrl ? (
    <QuestionDecoration src={question.decorationUrl} animation={question.animation} />
  ) : null
  if (question.id === 'ft-1') decoration = <MessQ1 />
  else if (question.id === 'q-single') decoration = <MessQ2 />
  else if (question.id === 'q-single-sub') decoration = <MessWave />
  else if (question.id === 'q-multiple') decoration = <MessQ3 />
  else if (question.id === 'q-reorder') decoration = <MessQ4 />

  return (
    <div className="flex flex-col gap-6">
      {question.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden rounded-xl bg-fill-base-gray-light">
          <Image src={question.imageUrl} alt="" fill className="object-cover" sizes="100vw" />
        </div>
      )}

      {decoration}

      <h2
        id={`question-${question.id}`}
        className="whitespace-pre-line text-center text-xl font-semibold leading-snug text-text-base-primary"
      >
        {content}
      </h2>

      {question.type === QuestionType.SINGLE && (
        <RiasecSingleChoiceField
          question={question}
          value={typeof value === 'string' ? value : ''}
          onChange={onChange}
        />
      )}

      {question.type === QuestionType.MULTIPLE && (
        <RiasecMultipleChoiceField
          question={question}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      )}

      {question.type === QuestionType.REORDER && (
        <ReOrderList
          question={question}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      )}

      {question.type === QuestionType.TEXT && (
        <RiasecTextField value={typeof value === 'string' ? value : ''} onChange={onChange} />
      )}
    </div>
  )
}
