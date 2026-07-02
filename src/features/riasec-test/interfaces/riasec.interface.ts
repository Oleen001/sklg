import type {
  QuestionType,
  RiasecInsightType,
  RiasecQuestionAnimation,
  SectionMediaType,
} from '@/features/riasec-test/enums'

// The six Holland (RIASEC) archetype codes.
export type RiasecArchetype = 'R' | 'I' | 'A' | 'S' | 'E' | 'C'

// Static metadata for a single archetype (label, accent colour, icon).
export interface RiasecArchetypeMeta {
  code: RiasecArchetype
  nameTh: string
  nameEn: string
  description: string
  iconUrl: string
  // Tailwind token classes used to colour the score bars / chips for this code.
  barClassName: string
  textClassName: string
}

// ── Question set ────────────────────────────────────────────────────────────

export interface RiasecAnswerOption {
  id: string
  value: string | null
  order: number
  imageUrl?: string
  // Conditional follow-up questions revealed when this answer is selected.
  subQuestions?: RiasecQuestion[]
}

export interface RiasecQuestion {
  id: string
  sectionId: string
  parentQuestionId: string | null
  type: QuestionType
  // Plain markup string. May contain `{{answer:questionId}}` variables that are
  // replaced with a previous answer at render time.
  content: string
  isAnswerRequired: boolean
  order: number
  imageUrl?: string
  // Decorative artwork shown above the question — webp / gif / jpeg / png / svg.
  decorationUrl?: string
  // Which framer-motion preset animates the decoration (defaults to FLOAT).
  animation?: RiasecQuestionAnimation
  answers: RiasecAnswerOption[]
}

// A self-awareness "level" suggestion shown after the last question (in place of
// a closing story), based on the Suggestion page in the source sheet.
export interface RiasecSuggestionLevel {
  level: number
  title: string
  stage: string
  description: string
}

export interface RiasecSection {
  id: string
  title: string
  description?: string
  // When false the intro "story" screen is skipped for this section.
  isDisplay?: boolean
  mediaType?: SectionMediaType
  mediaUrl?: string
}

export interface RiasecQuestionSet {
  id: string
  title: string
  description?: string
  sections: RiasecSection[]
  questions: RiasecQuestion[]
}

// Form state — keyed by question id. SINGLE/TEXT hold a string, MULTIPLE/REORDER
// hold an ordered list of answer ids.
export type RiasecTestFormFields = Record<string, string | string[] | undefined>

// ── Result ──────────────────────────────────────────────────────────────────

export interface RiasecScore {
  code: RiasecArchetype
  score: number
}

export interface RiasecInsight {
  type: RiasecInsightType
  title: string
  items: string[]
}

export interface AssessmentResult {
  id: string
  characteristicCode: string
  characteristicName: string
  shortDescription: string
  fullDescription: string
  scores: RiasecScore[]
  strengths: string[]
  weaknesses: string[]
  createdAt: string
}

// ── History ─────────────────────────────────────────────────────────────────

export interface RiasecHistoryItem {
  id: string
  personalityCode: string
  personalityName: string
  scores: RiasecScore[]
  createdAt: string
}
