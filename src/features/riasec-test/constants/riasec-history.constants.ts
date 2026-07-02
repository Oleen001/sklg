import type { RiasecHistoryItem } from '@/features/riasec-test/interfaces'

// Mock history list — replaces `GET /me/assessment-results`. Deleting an item is
// handled in component state only (no network).
export const riasecHistory: RiasecHistoryItem[] = [
  {
    id: 'mock-ria',
    personalityCode: 'RIA',
    personalityName: 'นักสร้างสรรค์เชิงเทคนิค',
    scores: [
      { code: 'R', score: 86 },
      { code: 'I', score: 78 },
      { code: 'A', score: 71 },
      { code: 'S', score: 52 },
      { code: 'E', score: 45 },
      { code: 'C', score: 40 },
    ],
    createdAt: '2026-06-19T09:30:00.000Z',
  },
  {
    id: 'mock-sea',
    personalityCode: 'SEA',
    personalityName: 'นักสื่อสารผู้สร้างแรงบันดาลใจ',
    scores: [
      { code: 'S', score: 88 },
      { code: 'E', score: 80 },
      { code: 'A', score: 69 },
      { code: 'I', score: 50 },
      { code: 'R', score: 42 },
      { code: 'C', score: 38 },
    ],
    createdAt: '2026-05-02T14:10:00.000Z',
  },
]
