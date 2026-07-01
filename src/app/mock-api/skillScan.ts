export type MarketDemand = "highest" | "high" | "moderate";
export type MatchTier = "closest" | "near" | "explore";

export type SkillScanArchetype = {
  id: string;
  label: string;
  description: string;
};

export type SkillScanCareer = {
  id: string;
  archetypeId: string;
  title: string;
  description: string;
  salaryRange: string;
  marketDemand: MarketDemand;
  matchTier: MatchTier;
  position: {
    x: number;
    y: number;
  };
  detailPath: string;
};

export type SkillScanResponse = {
  archetype: SkillScanArchetype;
  careers: SkillScanCareer[];
};

export type GoalResponse = {
  ok: boolean;
  careerId: string;
  message: string;
};

const archetypes: SkillScanArchetype[] = [
  {
    id: "computer-engineering",
    label: "วิศวกรรมคอมพิวเตอร์",
    description: "สายงานซอฟต์แวร์ ระบบคลาวด์ ข้อมูล AI และความปลอดภัยไซเบอร์",
  },
  {
    id: "product-design",
    label: "Product & UX Design",
    description: "สายงานออกแบบผลิตภัณฑ์ดิจิทัล ประสบการณ์ผู้ใช้ และคอนเทนต์",
  },
  {
    id: "data-ai",
    label: "Data & AI",
    description: "สายงานข้อมูล วิทยาศาสตร์ข้อมูล Machine Learning และ AI product",
  },
];

const careersByArchetype: Record<string, SkillScanCareer[]> = {
  "computer-engineering": [
    {
      id: "software-engineer",
      archetypeId: "computer-engineering",
      title: "วิศวกรซอฟต์แวร์ Software Engineer",
      description: "ออกแบบและพัฒนาซอฟต์แวร์ที่ใช้งานได้จริง ตั้งแต่ mobile app ไปจนถึงระบบหลังบ้านที่ขับเคลื่อนธุรกิจในยุคดิจิทัล",
      salaryRange: "40,000 - 75,000 บาท",
      marketDemand: "highest",
      matchTier: "closest",
      position: { x: 55, y: 48 },
      detailPath: "/careers/software-engineer",
    },
    {
      id: "frontend-developer",
      archetypeId: "computer-engineering",
      title: "นักพัฒนาส่วนหน้า Frontend Developer",
      description: "สร้าง interface และ interaction ให้ใช้งานง่าย สวย และเร็วบนเว็บแอปพลิเคชัน",
      salaryRange: "35,000 - 65,000 บาท",
      marketDemand: "highest",
      matchTier: "closest",
      position: { x: 60, y: 39 },
      detailPath: "/careers/frontend-developer",
    },
    {
      id: "backend-developer",
      archetypeId: "computer-engineering",
      title: "นักพัฒนาส่วนหลัง Backend Developer",
      description: "ดูแล API, database, authentication และระบบหลังบ้านที่รองรับผู้ใช้จำนวนมาก",
      salaryRange: "45,000 - 80,000 บาท",
      marketDemand: "highest",
      matchTier: "near",
      position: { x: 65, y: 75 },
      detailPath: "/careers/backend-developer",
    },
    {
      id: "data-engineer",
      archetypeId: "computer-engineering",
      title: "วิศวกรข้อมูล Data Engineer",
      description: "สร้าง pipeline และ data platform เพื่อให้ทีมใช้ข้อมูลได้ถูกต้องและทันเวลา",
      salaryRange: "50,000 - 90,000 บาท",
      marketDemand: "highest",
      matchTier: "near",
      position: { x: 40, y: 31 },
      detailPath: "/careers/data-engineer",
    },
    {
      id: "ml-engineer",
      archetypeId: "computer-engineering",
      title: "วิศวกรการเรียนรู้ของเครื่อง ML Engineer",
      description: "นำโมเดล Machine Learning ไปใช้ในผลิตภัณฑ์จริง ตั้งแต่ training pipeline ถึง deployment",
      salaryRange: "55,000 - 100,000 บาท",
      marketDemand: "highest",
      matchTier: "near",
      position: { x: 80, y: 50 },
      detailPath: "/careers/ml-engineer",
    },
    {
      id: "devops-engineer",
      archetypeId: "computer-engineering",
      title: "วิศวกร DevOps DevOps Engineer",
      description: "ดูแล cloud infrastructure, CI/CD, monitoring และ reliability ของระบบ",
      salaryRange: "55,000 - 95,000 บาท",
      marketDemand: "highest",
      matchTier: "explore",
      position: { x: 62, y: 24 },
      detailPath: "/careers/devops-engineer",
    },
    {
      id: "cybersecurity-analyst",
      archetypeId: "computer-engineering",
      title: "นักวิเคราะห์ความปลอดภัยไซเบอร์ Cybersecurity Analyst",
      description: "ประเมินความเสี่ยง ตรวจจับภัยคุกคาม และวางมาตรการป้องกันระบบดิจิทัล",
      salaryRange: "45,000 - 85,000 บาท",
      marketDemand: "highest",
      matchTier: "explore",
      position: { x: 88, y: 62 },
      detailPath: "/careers/cybersecurity-analyst",
    },
    {
      id: "qa-engineer",
      archetypeId: "computer-engineering",
      title: "วิศวกร QA QA Engineer",
      description: "ออกแบบ test plan, automation และกระบวนการตรวจคุณภาพก่อนปล่อยผลิตภัณฑ์",
      salaryRange: "32,000 - 60,000 บาท",
      marketDemand: "high",
      matchTier: "explore",
      position: { x: 93, y: 80 },
      detailPath: "/careers/qa-engineer",
    },
    {
      id: "ai-programmer",
      archetypeId: "computer-engineering",
      title: "วิศวกรโปรแกรม AI AI Programmer",
      description: "ต่อยอดระบบซอฟต์แวร์ด้วย AI service, prompt workflow และ automation",
      salaryRange: "45,000 - 85,000 บาท",
      marketDemand: "high",
      matchTier: "explore",
      position: { x: 29, y: 22 },
      detailPath: "/careers/ai-programmer",
    },
    {
      id: "product-owner",
      archetypeId: "computer-engineering",
      title: "เจ้าของผลิตภัณฑ์ Product Owner",
      description: "แปลงเป้าหมายธุรกิจเป็น backlog และจัดลำดับงานร่วมกับทีมเทคนิค",
      salaryRange: "50,000 - 95,000 บาท",
      marketDemand: "highest",
      matchTier: "near",
      position: { x: 52, y: 73 },
      detailPath: "/careers/product-owner",
    },
    {
      id: "ui-designer",
      archetypeId: "computer-engineering",
      title: "นักออกแบบ UI UI Designer",
      description: "ออกแบบหน้าจอและ visual system ให้ผลิตภัณฑ์ดิจิทัลใช้งานง่ายและมีเอกลักษณ์",
      salaryRange: "30,000 - 58,000 บาท",
      marketDemand: "high",
      matchTier: "explore",
      position: { x: 90, y: 42 },
      detailPath: "/careers/ui-designer",
    },
    {
      id: "product-designer",
      archetypeId: "computer-engineering",
      title: "นักออกแบบผลิตภัณฑ์ Product Designer",
      description: "เข้าใจผู้ใช้ ออกแบบ flow และทดสอบ solution ร่วมกับทีม product",
      salaryRange: "38,000 - 75,000 บาท",
      marketDemand: "highest",
      matchTier: "near",
      position: { x: 28, y: 56 },
      detailPath: "/careers/product-designer",
    },
    {
      id: "research-analyst",
      archetypeId: "computer-engineering",
      title: "นักวิเคราะห์การวิจัย Research Analyst",
      description: "รวบรวม insight จากข้อมูลและผู้ใช้เพื่อช่วยการตัดสินใจเชิงผลิตภัณฑ์",
      salaryRange: "30,000 - 55,000 บาท",
      marketDemand: "high",
      matchTier: "near",
      position: { x: 36, y: 46 },
      detailPath: "/careers/research-analyst",
    },
    {
      id: "data-scientist",
      archetypeId: "computer-engineering",
      title: "นักวิทยาศาสตร์ข้อมูล Data Scientist",
      description: "วิเคราะห์ข้อมูล สร้างโมเดล และสื่อสาร insight ให้ทีมธุรกิจนำไปใช้ได้จริง",
      salaryRange: "50,000 - 95,000 บาท",
      marketDemand: "highest",
      matchTier: "explore",
      position: { x: 76, y: 76 },
      detailPath: "/careers/data-scientist",
    },
    {
      id: "marketing-specialist",
      archetypeId: "computer-engineering",
      title: "ผู้เชี่ยวชาญด้านการตลาด Marketing Specialist",
      description: "วางแผนแคมเปญดิจิทัลและใช้ข้อมูลเพื่อเพิ่มการเติบโตของผลิตภัณฑ์",
      salaryRange: "28,000 - 55,000 บาท",
      marketDemand: "high",
      matchTier: "explore",
      position: { x: 30, y: 37 },
      detailPath: "/careers/marketing-specialist",
    },
    {
      id: "content-strategist",
      archetypeId: "computer-engineering",
      title: "นักกลยุทธ์เนื้อหา Content Strategist",
      description: "ออกแบบสารและคอนเทนต์ให้สอดคล้องกับ journey ของผู้ใช้และเป้าหมายธุรกิจ",
      salaryRange: "30,000 - 60,000 บาท",
      marketDemand: "high",
      matchTier: "explore",
      position: { x: 14, y: 70 },
      detailPath: "/careers/content-strategist",
    },
  ],
  "product-design": [
    {
      id: "product-designer-pd",
      archetypeId: "product-design",
      title: "นักออกแบบผลิตภัณฑ์ Product Designer",
      description: "ออกแบบผลิตภัณฑ์ตั้งแต่ problem framing, user journey, prototype ไปจนถึง handoff",
      salaryRange: "38,000 - 75,000 บาท",
      marketDemand: "highest",
      matchTier: "closest",
      position: { x: 53, y: 47 },
      detailPath: "/careers/product-designer",
    },
    {
      id: "ux-researcher",
      archetypeId: "product-design",
      title: "นักวิจัย UX UX Researcher",
      description: "ค้นหา insight ของผู้ใช้ผ่าน interview, usability test และ research synthesis",
      salaryRange: "35,000 - 70,000 บาท",
      marketDemand: "high",
      matchTier: "near",
      position: { x: 36, y: 46 },
      detailPath: "/careers/ux-researcher",
    },
    {
      id: "ui-designer-pd",
      archetypeId: "product-design",
      title: "นักออกแบบ UI UI Designer",
      description: "สร้าง visual interface, component และ interaction state สำหรับ digital product",
      salaryRange: "30,000 - 58,000 บาท",
      marketDemand: "high",
      matchTier: "near",
      position: { x: 62, y: 39 },
      detailPath: "/careers/ui-designer",
    },
    {
      id: "ux-writer",
      archetypeId: "product-design",
      title: "นักเขียน UX UX Writer",
      description: "เขียน microcopy และ content flow ที่ช่วยให้ผู้ใช้เข้าใจและตัดสินใจได้ง่ายขึ้น",
      salaryRange: "30,000 - 58,000 บาท",
      marketDemand: "moderate",
      matchTier: "explore",
      position: { x: 16, y: 51 },
      detailPath: "/careers/ux-writer",
    },
    {
      id: "motion-designer",
      archetypeId: "product-design",
      title: "นักออกแบบโมชั่น Motion Designer",
      description: "ออกแบบ motion และ interaction เพื่อสื่อ hierarchy, feedback และ brand personality",
      salaryRange: "32,000 - 65,000 บาท",
      marketDemand: "moderate",
      matchTier: "explore",
      position: { x: 78, y: 28 },
      detailPath: "/careers/motion-designer",
    },
    {
      id: "product-owner-pd",
      archetypeId: "product-design",
      title: "เจ้าของผลิตภัณฑ์ Product Owner",
      description: "จัดลำดับ requirement และประสานทีม business, design, engineering ให้ไปทิศทางเดียวกัน",
      salaryRange: "50,000 - 95,000 บาท",
      marketDemand: "highest",
      matchTier: "near",
      position: { x: 56, y: 72 },
      detailPath: "/careers/product-owner",
    },
  ],
  "data-ai": [
    {
      id: "data-scientist-ai",
      archetypeId: "data-ai",
      title: "นักวิทยาศาสตร์ข้อมูล Data Scientist",
      description: "วิเคราะห์ข้อมูล สร้างโมเดล และสื่อสาร insight เพื่อแก้ปัญหาทางธุรกิจ",
      salaryRange: "50,000 - 95,000 บาท",
      marketDemand: "highest",
      matchTier: "closest",
      position: { x: 54, y: 48 },
      detailPath: "/careers/data-scientist",
    },
    {
      id: "ml-engineer-ai",
      archetypeId: "data-ai",
      title: "วิศวกร ML ML Engineer",
      description: "นำโมเดล ML ไปใช้งานจริงผ่าน training pipeline, serving และ monitoring",
      salaryRange: "55,000 - 100,000 บาท",
      marketDemand: "highest",
      matchTier: "closest",
      position: { x: 60, y: 42 },
      detailPath: "/careers/ml-engineer",
    },
    {
      id: "data-engineer-ai",
      archetypeId: "data-ai",
      title: "วิศวกรข้อมูล Data Engineer",
      description: "ออกแบบ data pipeline และ warehouse ให้ข้อมูลพร้อมใช้กับ analytics และ AI",
      salaryRange: "50,000 - 90,000 บาท",
      marketDemand: "highest",
      matchTier: "near",
      position: { x: 42, y: 32 },
      detailPath: "/careers/data-engineer",
    },
    {
      id: "ai-programmer-ai",
      archetypeId: "data-ai",
      title: "วิศวกรโปรแกรม AI AI Programmer",
      description: "ผสาน AI model, agent workflow และ automation เข้ากับผลิตภัณฑ์",
      salaryRange: "45,000 - 85,000 บาท",
      marketDemand: "high",
      matchTier: "near",
      position: { x: 35, y: 55 },
      detailPath: "/careers/ai-programmer",
    },
    {
      id: "research-analyst-ai",
      archetypeId: "data-ai",
      title: "นักวิเคราะห์การวิจัย Research Analyst",
      description: "วิเคราะห์ตลาด ข้อมูลผู้ใช้ และแนวโน้ม เพื่อสนับสนุน decision making",
      salaryRange: "30,000 - 55,000 บาท",
      marketDemand: "moderate",
      matchTier: "explore",
      position: { x: 22, y: 70 },
      detailPath: "/careers/research-analyst",
    },
    {
      id: "analytics-engineer",
      archetypeId: "data-ai",
      title: "วิศวกรวิเคราะห์ข้อมูล Analytics Engineer",
      description: "เชื่อมระหว่าง data engineering และ business intelligence ผ่าน metric layer ที่เชื่อถือได้",
      salaryRange: "45,000 - 85,000 บาท",
      marketDemand: "highest",
      matchTier: "explore",
      position: { x: 75, y: 72 },
      detailPath: "/careers/analytics-engineer",
    },
  ],
};

const delay = (ms = 220) => new Promise((resolve) => window.setTimeout(resolve, ms));

export async function getSkillScanArchetypes() {
  await delay(120);
  return archetypes;
}

export async function getSkillScanCareers(archetypeId: string): Promise<SkillScanResponse> {
  await delay();
  const archetype = archetypes.find((item) => item.id === archetypeId) ?? archetypes[0];
  return {
    archetype,
    careers: careersByArchetype[archetype.id] ?? [],
  };
}

export async function getCareerDetail(careerId: string) {
  await delay(140);
  return Object.values(careersByArchetype).flat().find((career) => career.id === careerId) ?? null;
}

export async function setCareerGoal(careerId: string): Promise<GoalResponse> {
  await delay(180);
  return {
    ok: true,
    careerId,
    message: "ตั้งเป้าหมายอาชีพแล้ว",
  };
}
