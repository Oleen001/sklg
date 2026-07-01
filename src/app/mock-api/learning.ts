import heroLearningImage from "@/assets/generated/skill-builder-hero/hero-learning-discovery.png";
import generatedCover1 from "@/assets/generated/skill-builder-covers/cover-1.png";
import generatedCover2 from "@/assets/generated/skill-builder-covers/cover-2.png";
import generatedCover3 from "@/assets/generated/skill-builder-covers/cover-3.png";
import generatedCover4 from "@/assets/generated/skill-builder-covers/cover-4.png";
import generatedCover5 from "@/assets/generated/skill-builder-covers/cover-5.png";
import generatedCover6 from "@/assets/generated/skill-builder-covers/cover-6.png";
import generatedCover7 from "@/assets/generated/skill-builder-covers/cover-7.png";
import generatedCover8 from "@/assets/generated/skill-builder-covers/cover-8.png";

export type CourseProvider = {
  id: string;
  name: string;
  logoText: string;
};

export type LearningBanner = {
  id: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  imageUrl: string;
  ctaLabel: string;
  targetUrl: string;
};

export type LearningCourse = {
  id: string;
  provider: CourseProvider;
  title: string;
  subtitle: string;
  imageUrl: string;
  instructor: string;
  categoryId: string;
  tags: string[];
  progress?: number;
  isBookmarked: boolean;
  isRecommended?: boolean;
  targetUrl: string;
};

export type LearningRail = {
  id: string;
  title: string;
  subtitle?: string;
  variant: "course" | "poster" | "wide" | "platform";
  courses: LearningCourse[];
};

export type LearningCategory = {
  id: string;
  title: string;
  courseCount: number;
  icon: "business" | "tech" | "dev" | "language" | "health" | "music" | "design" | "marketing";
};

export type LearningPlatform = {
  id: string;
  name: string;
  mark: string;
  url: string;
};

export type LearningHomeResponse = {
  banners: LearningBanner[];
  inProgress: LearningCourse[];
  aiSuggestion: {
    title: string;
    description: string;
    courses: LearningCourse[];
  };
  rails: LearningRail[];
  categories: LearningCategory[];
  platforms: LearningPlatform[];
};

export type CourseQuery = {
  search?: string;
  categoryId?: string;
  providerId?: string;
  status?: "in-progress" | "recommended" | "new";
  limit?: number;
};

const delay = (ms = 180) => new Promise((resolve) => window.setTimeout(resolve, ms));

const providers: Record<string, CourseProvider> = {
  techup: { id: "techup", name: "TechUp", logoText: "TU" },
  byd: { id: "byd", name: "BYD Auto", logoText: "BYD" },
  systronic: { id: "systronic", name: "Systronic", logoText: "SY" },
  shopee: { id: "shopee", name: "Shopee", logoText: "S" },
  chula: { id: "chula", name: "Chula Engineering", logoText: "CU" },
  recoded: { id: "recoded", name: "Food Sci. RECODED", logoText: "CP" },
  suanDusit: { id: "suan-dusit", name: "มหาวิทยาลัยสวนดุสิต", logoText: "SD" },
};

const courses: LearningCourse[] = [
  {
    id: "ai-for-software-engineering",
    provider: providers.techup,
    title: "AI สำหรับวิศวกรรมซอฟต์แวร์",
    subtitle: "เข้าใจ AI workflow สำหรับงาน developer และ software team",
    imageUrl: generatedCover1,
    instructor: "TechUp",
    categoryId: "tech",
    tags: ["AI", "Software"],
    progress: 32,
    isBookmarked: true,
    isRecommended: true,
    targetUrl: "/learning/courses/ai-for-software-engineering",
  },
  {
    id: "bev-innovation",
    provider: providers.byd,
    title: "สถาปัตยกรรมยานยนต์ไฟฟ้าสมัยใหม่ BEV",
    subtitle: "ออกแบบระบบขับเคลื่อนและ battery platform",
    imageUrl: generatedCover2,
    instructor: "รณกฤต เกียรติธำรง",
    categoryId: "tech",
    tags: ["EV", "Engineering"],
    progress: 78,
    isBookmarked: false,
    targetUrl: "/learning/courses/bev-innovation",
  },
  {
    id: "robotics-for-work",
    provider: providers.systronic,
    title: "ปั้นหุ่นยนต์ให้คลิกกับทีมมนุษย์",
    subtitle: "พื้นฐาน robotics, sensors และ automation สำหรับธุรกิจ",
    imageUrl: generatedCover3,
    instructor: "อรพรรณ ปันติมา",
    categoryId: "dev",
    tags: ["Robot", "Automation"],
    progress: 18,
    isBookmarked: true,
    isRecommended: true,
    targetUrl: "/learning/courses/robotics-for-work",
  },
  {
    id: "marketing-playbook",
    provider: providers.shopee,
    title: "กลยุทธ์การตลาดพันธมิตรบนออนไลน์",
    subtitle: "จากผู้ไม่รู้สู่แนวทางการเติบโตผ่าน partner channel",
    imageUrl: generatedCover4,
    instructor: "Shopee",
    categoryId: "marketing",
    tags: ["Marketing"],
    progress: 46,
    isBookmarked: true,
    targetUrl: "/learning/courses/marketing-playbook",
  },
  {
    id: "engineering-101",
    provider: providers.chula,
    title: "วิศวฯ จุฬาฯ เปิดหลักสูตร Engineering 101 Bootcamp",
    subtitle: "Powering the future, driving sustainability",
    imageUrl: generatedCover5,
    instructor: "Chula Engineering",
    categoryId: "tech",
    tags: ["Engineering"],
    isBookmarked: false,
    targetUrl: "/learning/courses/engineering-101",
  },
  {
    id: "culinary-art",
    provider: providers.suanDusit,
    title: "Culinary Art Bootcamp",
    subtitle: "พื้นฐานงานครัวร่วมสมัยจากมหาวิทยาลัยสวนดุสิต",
    imageUrl: generatedCover6,
    instructor: "มหาวิทยาลัยสวนดุสิต",
    categoryId: "business",
    tags: ["Food", "Service"],
    isBookmarked: false,
    targetUrl: "/learning/courses/culinary-art",
  },
  {
    id: "ai-lab-research",
    provider: providers.recoded,
    title: "Generative AI สำหรับวิศวกรซอฟต์แวร์",
    subtitle: "ต่อยอด prompt, agent และ model integration เข้ากับ product",
    imageUrl: generatedCover7,
    instructor: "นิรัตน์ ไกรสวัสดิ์",
    categoryId: "dev",
    tags: ["AI", "Developer"],
    isBookmarked: true,
    isRecommended: true,
    targetUrl: "/learning/courses/ai-lab-research",
  },
  {
    id: "health-tech-data",
    provider: providers.recoded,
    title: "Data Product สำหรับบริการสุขภาพ",
    subtitle: "ออกแบบ data flow และ dashboard สำหรับ healthcare operation",
    imageUrl: generatedCover8,
    instructor: "ดร. อัครพล มนูญศาสตร์",
    categoryId: "health",
    tags: ["Data", "Healthcare"],
    isBookmarked: false,
    targetUrl: "/learning/courses/health-tech-data",
  },
];

const categories: LearningCategory[] = [
  { id: "business", title: "การเงินและการบัญชี", courseCount: 312, icon: "business" },
  { id: "tech", title: "เทคโนโลยีและไอที", courseCount: 450, icon: "tech" },
  { id: "dev", title: "การพัฒนาแอป", courseCount: 289, icon: "dev" },
  { id: "language", title: "ภาษาต่างประเทศ", courseCount: 198, icon: "language" },
  { id: "health", title: "สุขภาพและฟิตเนส", courseCount: 142, icon: "health" },
  { id: "music", title: "ดนตรี", courseCount: 119, icon: "music" },
  { id: "design", title: "การออกแบบ", courseCount: 210, icon: "design" },
  { id: "marketing", title: "ธุรกิจ", courseCount: 401, icon: "marketing" },
];

const platforms: LearningPlatform[] = [
  { id: "thai-mooc", name: "Thai MOOC", mark: "Thai MOOC", url: "/learning/platforms/thai-mooc" },
  { id: "ge", name: "General Education Center", mark: "GE", url: "/learning/platforms/ge" },
  { id: "skilllane", name: "SkillLane", mark: "SkillLane", url: "/learning/platforms/skilllane" },
  { id: "futureskill", name: "FutureSkill", mark: "FutureSkill", url: "/learning/platforms/futureskill" },
];

const banners: LearningBanner[] = [
  {
    id: "claude-cowork",
    title: "Claude Cowork",
    subtitle: "for business",
    eyebrow: "บริหารธุรกิจให้โตไวด้วย Claude AI",
    imageUrl: heroLearningImage,
    ctaLabel: "ดูคอร์สแนะนำ",
    targetUrl: "/learning/campaigns/claude-cowork",
  },
  {
    id: "bootcamp-ai",
    title: "AI Bootcamp",
    subtitle: "for builders",
    eyebrow: "เริ่มสร้าง skill ใหม่จาก project จริง",
    imageUrl: generatedCover1,
    ctaLabel: "เริ่มเรียน",
    targetUrl: "/learning/campaigns/ai-bootcamp",
  },
];

export async function getLearningHome(): Promise<LearningHomeResponse> {
  await delay();
  return {
    banners,
    inProgress: courses.slice(0, 5),
    aiSuggestion: {
      title: "อัปเกรดทักษะสำคัญที่คุณยังขาด",
      description: "คัดมาให้แล้ว ทีมวิชาชีพช่วยอัปเกรดจุดแข็งที่ต่อยอดเป้าหมายของคุณได้",
      courses: [courses[0], courses[1], courses[6]],
    },
    rails: [
      { id: "bootcamp-ready", title: "เตรียมความพร้อมด้วย Bootcamp", variant: "wide", courses: [courses[5], courses[4], courses[6]] },
      { id: "goal-recommended", title: "คอร์สแนะนำตามเป้าหมายของคุณ", variant: "poster", courses: [courses[1], courses[6], courses[2], courses[7]] },
      { id: "expert-path", title: "เส้นทางสู่ผู้เชี่ยวชาญในสาขา", variant: "wide", courses: [courses[3], courses[7], courses[1]] },
      { id: "popular", title: "คอร์สยอดนิยมในสายของคุณ", variant: "course", courses: [courses[6], courses[4], courses[3], courses[1], courses[0]] },
      { id: "new", title: "คอร์สมาใหม่", variant: "course", courses: [courses[3], courses[1], courses[4], courses[6], courses[2]] },
    ],
    categories,
    platforms,
  };
}

export async function getCourses(query: CourseQuery = {}) {
  await delay(120);
  const search = query.search?.trim().toLowerCase();
  let result = courses;
  if (query.categoryId) {
    result = result.filter((course) => course.categoryId === query.categoryId);
  }
  if (query.providerId) {
    result = result.filter((course) => course.provider.id === query.providerId);
  }
  if (query.status === "in-progress") {
    result = result.filter((course) => typeof course.progress === "number");
  }
  if (query.status === "recommended") {
    result = result.filter((course) => course.isRecommended);
  }
  if (search) {
    result = result.filter((course) => {
      const haystack = `${course.title} ${course.subtitle} ${course.provider.name} ${course.tags.join(" ")}`.toLowerCase();
      return haystack.includes(search);
    });
  }
  return result.slice(0, query.limit ?? result.length);
}

export async function toggleCourseBookmark(courseId: string) {
  await delay(120);
  return { ok: true, courseId };
}

export async function updateCourseProgress(courseId: string, progress: number) {
  await delay(140);
  return { ok: true, courseId, progress: Math.max(0, Math.min(100, progress)) };
}
