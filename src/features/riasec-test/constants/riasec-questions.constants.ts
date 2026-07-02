import {
  QuestionType,
  RiasecQuestionAnimation,
  SectionMediaType,
} from '@/features/riasec-test/enums'
import type { RiasecQuestionSet } from '@/features/riasec-test/interfaces'

// Mock question set for the "MESS" RIASEC journey — replaces the assessment API.
//
// Trimmed to ONE question per type (TEXT → SINGLE → MULTIPLE → REORDER):
//   • An opening story plays before the first question.
//   • A closing story plays after the last question, right before the result.
//   • The first question (`ft-1`, free-text) names the inner-voice companion and
//     is reused in later questions via the `{{answer:ft-1}}` token.
//   • Every question carries its own decorative artwork + framer-motion preset,
//     so no two screens animate alike. Swap `decorationUrl` for your own
//     webp / gif / jpeg as artwork becomes available.
export const riasecQuestionSet: RiasecQuestionSet = {
  id: 'mess-journey',
  title: 'MESS เพื่อนผู้ยุ่งเหยิง',
  description: 'ออกเดินทางไปกับเสียงในหัวที่คุ้นเคย เพื่อคลี่ความยุ่งเหยิงและค้นหาบุคลิกภาพของคุณ',
  sections: [
    {
      id: 'journey',
      title: 'The Mess',
      description:
        'MESS เพื่อนผู้ยุ่งเหยิง เสียงในหัวที่คุ้นเคย มานั่งข้าง ๆ คุณ พร้อมชวนคุณออกเดินทางเพื่อคลี่ความยุ่งเหยิงในใจ และค้นหาว่าตัวเองเป็นใครกันแน่',
      isDisplay: true,
      mediaType: SectionMediaType.IMAGE,
      mediaUrl: '/images/strength-finder/riasec-story.png',
    },
  ],
  questions: [
    {
      id: 'ft-1',
      sectionId: 'journey',
      parentQuestionId: null,
      type: QuestionType.TEXT,
      content:
        'MESS มานั่งข้าง ๆ คุณ ในบรรยากาศแบบ “เอาไงดี เริ่มจากตรงไหนดี?” — คุณอยากทักทายหรือเรียกเขาว่าอะไรดี?',
      isAnswerRequired: true,
      order: 1,
      decorationUrl: '/images/strength-finder/riasec-letters/A.svg',
      animation: RiasecQuestionAnimation.FLOAT,
      answers: [],
    },
    {
      id: 'q-single',
      sectionId: 'journey',
      parentQuestionId: null,
      type: QuestionType.SINGLE,
      content:
        'ระหว่างเส้นทาง ทุกอย่างเริ่มมั่วขึ้นเรื่อย ๆ “เส้นทางมันโคตรงงเลยอะ” {{answer:ft-1}} พูด “ปกติเวลามึน ๆ เราทำยังไง?”',
      isAnswerRequired: true,
      order: 2,
      decorationUrl: '/images/strength-finder/riasec-letters/R.svg',
      animation: RiasecQuestionAnimation.SWAY,
      answers: [
        { id: 'q-single-r', value: 'ลองไปเรื่อย ๆ เดี๋ยวก็รู้เอง', order: 1 },
        { id: 'q-single-i', value: 'หยุดสักแป๊บ ค่อยหาคำตอบทีหลัง', order: 2 },
        { id: 'q-single-a', value: 'ปล่อยจอย ค่อยดูว่าจะออกมาเป็นไง', order: 3 },
        { id: 'q-single-s', value: 'หาเซฟโซนไว้ปรึกษา', order: 4 },
        { id: 'q-single-e', value: 'จัดระเบียบแป๊บ จะได้ไม่มึน', order: 5 },
        { id: 'q-single-c', value: 'รีบหาทางออกที่เร็วที่สุดก่อน', order: 6 },
        {
          id: 'q-single-f',
          value: 'ยังไม่แน่ใจ ขอคิดดูก่อน',
          order: 7,
          // Conditional sub-question — revealed only when this option is chosen.
          subQuestions: [
            {
              id: 'q-single-sub',
              sectionId: 'journey',
              parentQuestionId: 'q-single',
              type: QuestionType.SINGLE,
              content:
                'ไม่เป็นไร ลองนึกถึงครั้งล่าสุดที่รู้สึกมึน ๆ — ตอนนั้นอะไรช่วยให้ใจสงบลงได้มากที่สุด?',
              isAnswerRequired: true,
              order: 1,
              decorationUrl: '/images/strength-finder/riasec-letters/I.svg',
              animation: RiasecQuestionAnimation.DRIFT,
              answers: [
                { id: 'q-single-sub-r', value: 'ลงมือทำอะไรสักอย่างให้เป็นจริง', order: 1 },
                { id: 'q-single-sub-i', value: 'หาข้อมูลและวิเคราะห์สาเหตุ', order: 2 },
                { id: 'q-single-sub-a', value: 'ปล่อยใจไปกับงานอดิเรกหรือศิลปะ', order: 3 },
                { id: 'q-single-sub-s', value: 'คุยกับคนที่ไว้ใจ', order: 4 },
                { id: 'q-single-sub-e', value: 'ตั้งเป้าหมายใหม่ให้ตัวเอง', order: 5 },
                { id: 'q-single-sub-c', value: 'จัดระเบียบสิ่งรอบตัว', order: 6 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'q-multiple',
      sectionId: 'journey',
      parentQuestionId: null,
      type: QuestionType.MULTIPLE,
      content:
        'ถ้ามีใครสักคนมาอยู่ด้วยกับ {{answer:ft-1}} ตอนนี้ ใครกันที่จะช่วยนำทางความยุ่งเหยิงนี้ได้ดี?\n(เลือกได้มากกว่า 1)',
      isAnswerRequired: true,
      order: 3,
      decorationUrl: '/images/strength-finder/riasec-letters/S.svg',
      animation: RiasecQuestionAnimation.PULSE,
      answers: [
        { id: 'q-multiple-r', value: 'วิศวะสายแก้บั๊ก ซ่อมให้กลับมารันได้เป๊ะ ๆ', order: 1 },
        { id: 'q-multiple-i', value: 'นักจิตสาย Deep Talk ขุดหาดีเทลที่จริงใจ', order: 2 },
        { id: 'q-multiple-a', value: 'ศิลปินสายชิค เปลี่ยนความเศร้าให้เป็นงานศิลป์', order: 3 },
        { id: 'q-multiple-s', value: 'นักบำบัดผู้ฮีลใจ พร้อมสแตนด์บายเคียงข้างคุณ', order: 4 },
        { id: 'q-multiple-e', value: 'Boss ผู้เด็ดขาด จัดการปัญหาให้คลีนแบบ 100%', order: 5 },
        {
          id: 'q-multiple-c',
          value: 'แอดมินเจ้าระเบียบ คอยคัดแยกความวุ่นวายลงโฟลเดอร์',
          order: 6,
        },
      ],
    },
    {
      id: 'q-reorder',
      sectionId: 'journey',
      parentQuestionId: null,
      type: QuestionType.REORDER,
      content:
        'เมื่อพายุเริ่มสงบ คุณพบว่าตัวเอง “ถนัด” จะใช้เครื่องมือชนิดไหนในการประคองจิตใจ?\n(ลากเรียงจากมากไปน้อย)',
      isAnswerRequired: true,
      order: 4,
      decorationUrl: '/images/strength-finder/riasec-letters/C.svg',
      animation: RiasecQuestionAnimation.POP,
      answers: [
        { id: 'q-reorder-r', value: 'การลงมือทำบางอย่างให้เป็นจริง / การประดิษฐ์', order: 1 },
        { id: 'q-reorder-i', value: 'การรวบรวมข้อมูล / การค้นคว้าหาคำตอบ', order: 2 },
        { id: 'q-reorder-a', value: 'การใช้อารมณ์สุนทรีย์ / การสร้างผลงานชิ้นใหม่', order: 3 },
        { id: 'q-reorder-s', value: 'การเทคแคร์คนรอบข้าง / การเอาใจใส่ผู้อื่น', order: 4 },
        {
          id: 'q-reorder-e',
          value: 'การสร้างพลังใจให้คนรอบข้าง ปลุกแพชชั่นให้เพื่อน ๆ',
          order: 5,
        },
        { id: 'q-reorder-c', value: 'การจัดลำดับขั้นตอน และประเมินเหตุผล', order: 6 },
      ],
    },
  ],
}
