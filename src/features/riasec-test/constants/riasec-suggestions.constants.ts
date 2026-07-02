import type { RiasecSuggestionLevel } from '@/features/riasec-test/interfaces'

// Self-awareness "levels" from the Suggestion page of the source sheet. After the
// last question one of these is shown (in place of a closing story).
export const riasecSuggestions: RiasecSuggestionLevel[] = [
  {
    level: 1,
    title: 'ยังไม่รู้จักตัวเอง',
    stage: 'Not Aware',
    description:
      'ตอนนี้คุณอาจรู้สึกเหมือน “ยังไม่มีอะไรชัดเลย” ว่าชอบหรือถนัดอะไร ซึ่งไม่ใช่ปัญหา แต่เป็นจุดเริ่มต้นของการค้นหาตัวเอง เพราะความชอบและความถนัดมักเกิดจาก “การได้ลอง” และ “การได้สังเกตตัวเอง” มากกว่าการคิดอย่างเดียว ช่วงนี้จึงเป็นช่วงของการทดลอง ลองเปิดโอกาสให้ตัวเองได้ทำสิ่งใหม่ ๆ แล้วค่อย ๆ สังเกตว่าอะไรที่ทำแล้วรู้สึกมีพลังหรืออยากกลับไปทำอีก',
  },
  {
    level: 2,
    title: 'เริ่มสำรวจ',
    stage: 'Exploration',
    description:
      'ตอนนี้ไม่ต้องรีบ “เลือก” แต่ควรโฟกัสที่ “ลอง” ให้มากที่สุด เพราะการค้นหาตัวเองต้องมาจากประสบการณ์จริง ลองกิจกรรมหลายแบบ เช่น งานที่ใช้มือ งานคิด งานสร้างสรรค์ หรือการทำงานกับคน เพื่อให้เห็นว่าอะไร “รู้สึกใช่” มากขึ้น',
  },
  {
    level: 3,
    title: 'เริ่มชัดขึ้น',
    stage: 'Clarifying',
    description:
      'คุณเริ่มมีสัญญาณบางอย่างแล้ว ลองสังเกตว่า “ช่วงเวลาไหนที่เรารู้สึกสนุกหรือมีพลัง” และ “อะไรที่เราทำแล้วไม่ฝืน” จากนั้นค่อย ๆ ตัดตัวเลือกที่ไม่ใช่ออก และทดลองซ้ำในสิ่งที่สนใจ เพื่อให้เห็น pattern ของตัวเองชัดขึ้น',
  },
  {
    level: 4,
    title: 'เริ่มตัดสินใจ',
    stage: 'Decision',
    description:
      'คุณเริ่มมีทิศทางที่ชัดขึ้นและมีตัวเลือกในใจที่เป็นไปได้ ขั้นนี้คือการเปลี่ยนจาก “ความรู้สึกว่าใช่” ไปสู่ “ความเข้าใจที่รอบด้าน” ลองหาข้อมูลเพิ่มทั้งข้อดี ข้อจำกัด และเส้นทางที่ต้องใช้ การพูดคุยกับคนที่มีประสบการณ์จริงหรือลองทำในสเกลเล็ก จะช่วยให้ตัดสินใจได้มั่นใจขึ้น',
  },
  {
    level: 5,
    title: 'ตัดสินใจได้',
    stage: 'Clear',
    description:
      'คุณมีเป้าหมายที่ชัดเจนแล้วและพร้อมก้าวไปข้างหน้า ขั้นต่อไปคือเปลี่ยนเป้าหมายให้เป็นแผนที่จับต้องได้ เช่น การเลือกเส้นทางการเรียน การวาง timeline หรือพัฒนาทักษะที่จำเป็น สิ่งสำคัญคือการลงมือทำอย่างต่อเนื่อง พร้อมเปิดรับการปรับแผนระหว่างทาง',
  },
]

// Mock picker — the real flow derives the level from the answers/score. Here we
// resolve to a fixed level so the flow stays end-to-end without a backend.
export const defaultRiasecSuggestionLevel = 2

export function pickRiasecSuggestion(level = defaultRiasecSuggestionLevel): RiasecSuggestionLevel {
  return riasecSuggestions.find((item) => item.level === level) ?? riasecSuggestions[0]
}
