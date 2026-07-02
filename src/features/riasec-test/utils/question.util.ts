import { QuestionType } from '@/features/riasec-test/enums'
import type { RiasecQuestion, RiasecTestFormFields } from '@/features/riasec-test/interfaces'

// Flattens a question list to include every nested sub-question.
export function flattenQuestions(questions: RiasecQuestion[]): RiasecQuestion[] {
  return questions.flatMap((question) => [
    question,
    ...question.answers.flatMap((answer) => flattenQuestions(answer.subQuestions ?? [])),
  ])
}

// Resolves a stored answer to its human-readable text (used for variable
// substitution). SINGLE → option value, MULTIPLE → joined values, TEXT → raw.
function getAnswerText(question: RiasecQuestion, answer: string | string[] | undefined): string {
  if (!answer) return ''

  if (question.type === QuestionType.TEXT) {
    return typeof answer === 'string' ? answer : ''
  }

  const selectedIds = Array.isArray(answer) ? answer : [answer]
  return question.answers
    .filter((option) => selectedIds.includes(option.id))
    .map((option) => option.value ?? '')
    .filter(Boolean)
    .join(', ')
}

// Replaces `{{answer:questionId}}` tokens in a question's content with the text
// of the referenced answer.
export function replaceQuestionVariable(
  content: string,
  allQuestions: RiasecQuestion[],
  fields: RiasecTestFormFields,
): string {
  const flat = flattenQuestions(allQuestions)
  return content.replace(/\{\{answer:([^}]+)\}\}/g, (_match, questionId: string) => {
    const question = flat.find((item) => item.id === questionId.trim())
    if (!question) return ''
    return getAnswerText(question, fields[question.id])
  })
}

// Validation rule that gates the "Next" button for the active question.
export function isQuestionAnswered(
  question: RiasecQuestion,
  answer: string | string[] | undefined,
): boolean {
  if (!question.isAnswerRequired) return true

  switch (question.type) {
    case QuestionType.SINGLE:
    case QuestionType.TEXT:
      return typeof answer === 'string' && answer.trim().length > 0
    case QuestionType.MULTIPLE:
    case QuestionType.REORDER:
      return Array.isArray(answer) && answer.length > 0
    default:
      return false
  }
}
