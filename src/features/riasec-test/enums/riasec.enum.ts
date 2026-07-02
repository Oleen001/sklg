export enum QuestionType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  TEXT = 'TEXT',
  REORDER = 'REORDER',
}

export enum SectionMediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export enum RiasecInsightType {
  STRENGTH = 'strength',
  WEAKNESS = 'weakness',
}

// Per-question decorative motion presets (implemented with framer-motion).
// Each question can pick its own so no two screens animate the same way.
export enum RiasecQuestionAnimation {
  FLOAT = 'float',
  PULSE = 'pulse',
  SWAY = 'sway',
  POP = 'pop',
  SPIN = 'spin',
  DRIFT = 'drift',
}
