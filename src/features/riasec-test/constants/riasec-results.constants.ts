import { RiasecInsightType } from '@/features/riasec-test/enums'
import type { AssessmentResult, RiasecInsight } from '@/features/riasec-test/interfaces'

// Mock result records — replaces `POST /assessment-results` + `GET /me/assessment-results/{id}`.
export const riasecResults: Record<string, AssessmentResult> = {
  'mock-ria': {
    id: 'mock-ria',
    characteristicCode: 'RIA',
    characteristicName: 'นักสร้างสรรค์เชิงเทคนิค',
    shortDescription:
      'ผู้ที่ผสมผสานทักษะการลงมือทำ การคิดวิเคราะห์ และความคิดสร้างสรรค์เข้าด้วยกัน',
    fullDescription:
      'คุณเป็นคนที่ชอบลงมือทำและแก้ปัญหาด้วยตัวเอง พร้อมกับมีความอยากรู้อยากเห็นและความคิดสร้างสรรค์สูง เหมาะกับงานที่ได้สร้างสิ่งใหม่ ๆ ทดลอง และพัฒนาผลงานที่จับต้องได้ คุณมักเรียนรู้ได้ดีจากการปฏิบัติจริงมากกว่าทฤษฎี',
    scores: [
      { code: 'R', score: 86 },
      { code: 'I', score: 78 },
      { code: 'A', score: 71 },
      { code: 'S', score: 52 },
      { code: 'E', score: 45 },
      { code: 'C', score: 40 },
    ],
    strengths: [
      'ลงมือทำและแก้ปัญหาเฉพาะหน้าได้ดี',
      'ช่างสังเกตและวิเคราะห์อย่างเป็นเหตุเป็นผล',
      'มีความคิดสร้างสรรค์ในการออกแบบและพัฒนา',
    ],
    weaknesses: ['อาจไม่ถนัดงานที่ต้องเข้าสังคมตลอดเวลา', 'เบื่อง่ายกับงานที่ซ้ำซากเป็นกิจวัตร'],
    createdAt: '2026-06-19T09:30:00.000Z',
  },
  'mock-sea': {
    id: 'mock-sea',
    characteristicCode: 'SEA',
    characteristicName: 'นักสื่อสารผู้สร้างแรงบันดาลใจ',
    shortDescription: 'ผู้ที่เก่งด้านผู้คน การโน้มน้าว และการสร้างสรรค์',
    fullDescription:
      'คุณเป็นคนที่เข้าใจผู้อื่นและสื่อสารได้ดี ชอบทำงานเป็นทีมและสร้างแรงบันดาลใจให้คนรอบข้าง เหมาะกับงานที่ได้ใช้ทักษะการพูด การนำเสนอ และความคิดสร้างสรรค์ในการขับเคลื่อนผู้คนและองค์กร',
    scores: [
      { code: 'S', score: 88 },
      { code: 'E', score: 80 },
      { code: 'A', score: 69 },
      { code: 'I', score: 50 },
      { code: 'R', score: 42 },
      { code: 'C', score: 38 },
    ],
    strengths: [
      'สื่อสารและสร้างความสัมพันธ์กับผู้คนได้ดี',
      'มีภาวะผู้นำและกล้าริเริ่มสิ่งใหม่',
      'เข้าใจความรู้สึกของผู้อื่น',
    ],
    weaknesses: ['อาจให้ความสำคัญกับรายละเอียดน้อยไป', 'ไม่ค่อยถนัดงานที่ต้องอยู่คนเดียวนาน ๆ'],
    createdAt: '2026-05-02T14:10:00.000Z',
  },
}

// Result that a freshly-submitted test redirects to.
export const defaultRiasecResultId = 'mock-ria'

// Builds the strength / weakness insight cards shown on the result page.
export function buildRiasecInsights(result: AssessmentResult): RiasecInsight[] {
  return [
    { type: RiasecInsightType.STRENGTH, title: 'จุดแข็งของคุณ', items: result.strengths },
    { type: RiasecInsightType.WEAKNESS, title: 'จุดที่ควรพัฒนา', items: result.weaknesses },
  ]
}
