// Per-RIASEC-letter background themes. Each question is themed to its RIASEC
// letter (taken from the question's decoration), tinting both the screen
// background and the question box. Values are soft, beauty-shifted tints of each
// letter's accent color (kept in the same hue/tone as the RIASEC character art).
// `shadow` is the per-question accent (RIASEC tone) used as a solid offset shadow.
export const riasecLetterTheme: Record<string, { screen: string; box: string; shadow: string }> = {
  A: { screen: '#FCE9EC', box: '#FFF5F7', shadow: '#E0768A' }, // pink       — #EFA2AE
  R: { screen: '#E8EEFD', box: '#F5F8FE', shadow: '#7E9BE8' }, // periwinkle — #A9C1F9
  I: { screen: '#F3E9FD', box: '#FAF5FF', shadow: '#9D5CD8' }, // purple     — #C585EF
  S: { screen: '#FBEBD7', box: '#FEF6EE', shadow: '#D97E1E' }, // orange     — #F2A03D
  E: { screen: '#FBF4D6', box: '#FEFBEE', shadow: '#CBA92A' }, // yellow     — #E9D055
  C: { screen: '#E7F1E8', box: '#F4F9F4', shadow: '#5A9A5F' }, // green      — #81BA85
}

// Fallback when a question has no recognizable RIASEC letter in its decoration.
export const defaultQuestionTheme = { screen: '#F3F1ED', box: '#FFFFFF', shadow: '#9A958C' }

// Uniform dark-grey border for every question box.
export const questionBoxBorderColor = '#333333'

// Instruction page — the "plain" neutral RIASEC tone (not tied to one letter).
export const riasecInstructionBg = '#F3F1ED'

// Wave layer colors (back → front) for the question-2 ambient ocean — a soft
// periwinkle gradient that sits under the floating MESS characters.
export const riasecWaveColors = ['#5B7BD4', '#7E9BE8', '#A9C1F9']

// RIASEC character accent colors — used to randomly tint the draggable MESS
// characters in question 2 (the "stones in a box" play area).
export const riasecCharacterColors = [
  '#EFA2AE', // A — pink
  '#A9C1F9', // R — periwinkle
  '#5ED7FF', // I — cyan
  '#F2A03D', // S — orange
  '#E9D055', // E — yellow
  '#81BA85', // C — green
]
