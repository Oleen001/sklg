import type { RiasecArchetype, RiasecArchetypeMeta } from '@/features/riasec-test/interfaces'

// Static metadata for each of the six Holland (RIASEC) archetypes. Replaces the
// per-type data that the source project loaded from the assessment API.
export const riasecArchetypes: Record<RiasecArchetype, RiasecArchetypeMeta> = {
  R: {
    code: 'R',
    nameTh: 'นักลงมือทำ',
    nameEn: 'Realistic',
    description: 'ชอบงานที่ได้ลงมือปฏิบัติจริง ใช้เครื่องมือ เครื่องจักร หรือทำงานกลางแจ้ง',
    iconUrl: '/images/strength-finder/riasec-letters/R.svg',
    barClassName: 'bg-fill-accent-orange',
    textClassName: 'text-text-system-warning',
  },
  I: {
    code: 'I',
    nameTh: 'นักคิดวิเคราะห์',
    nameEn: 'Investigative',
    description: 'ชอบการค้นคว้า สังเกต วิเคราะห์ และแก้ปัญหาด้วยเหตุผลทางวิทยาศาสตร์',
    iconUrl: '/images/strength-finder/riasec-letters/I.svg',
    barClassName: 'bg-fill-accent-blue',
    textClassName: 'text-text-system-info',
  },
  A: {
    code: 'A',
    nameTh: 'นักสร้างสรรค์',
    nameEn: 'Artistic',
    description: 'ชอบงานที่ใช้จินตนาการ ความคิดสร้างสรรค์ และการแสดงออกอย่างอิสระ',
    iconUrl: '/images/strength-finder/riasec-letters/A.svg',
    barClassName: 'bg-fill-accent-pink',
    textClassName: 'text-text-brand-primary-dark',
  },
  S: {
    code: 'S',
    nameTh: 'นักช่วยเหลือ',
    nameEn: 'Social',
    description: 'ชอบการทำงานกับผู้คน ช่วยเหลือ สอน ดูแล และสร้างความสัมพันธ์',
    iconUrl: '/images/strength-finder/riasec-letters/S.svg',
    barClassName: 'bg-fill-accent-green',
    textClassName: 'text-text-system-success',
  },
  E: {
    code: 'E',
    nameTh: 'นักโน้มน้าว',
    nameEn: 'Enterprising',
    description: 'ชอบการโน้มน้าว เป็นผู้นำ ริเริ่มธุรกิจ และทำงานเชิงการตลาด',
    iconUrl: '/images/strength-finder/riasec-letters/E.svg',
    barClassName: 'bg-fill-accent-red',
    textClassName: 'text-text-system-error',
  },
  C: {
    code: 'C',
    nameTh: 'นักจัดระเบียบ',
    nameEn: 'Conventional',
    description: 'ชอบงานที่มีระบบ ระเบียบ ความชัดเจน ตัวเลข และรายละเอียด',
    iconUrl: '/images/strength-finder/riasec-letters/C.svg',
    barClassName: 'bg-fill-accent-teal',
    textClassName: 'text-text-brand-tertiary-dark',
  },
}

// Stable display order for charts/legends.
export const riasecArchetypeOrder: RiasecArchetype[] = ['R', 'I', 'A', 'S', 'E', 'C']
