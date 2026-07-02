export type SkillCollectionCategory = "specific" | "general" | "tool" | "other";
export type SkillCollectionSource = "system" | "manual";

export type UserSkill = {
  id: string;
  title: string;
  subtitle?: string;
  category: SkillCollectionCategory;
  source: SkillCollectionSource;
  verifiedSegments: number;
  manualSegments: number;
  totalSegments: number;
  completedCourseId?: string;
  completedCourseTitle?: string;
  issuedAt?: string;
};

export type SkillCollectionSummary = {
  all: number;
  specific: number;
  general: number;
  tool: number;
  other: number;
  system: number;
  manual: number;
};

export type SkillCollectionResponse = {
  summary: SkillCollectionSummary;
  skills: UserSkill[];
};

export type AddManualSkillInput = {
  title: string;
  subtitle?: string;
  category: SkillCollectionCategory;
};

export type UpdateSkillInput = AddManualSkillInput;

export type DeleteSkillResponse = {
  ok: boolean;
  reason?: "system-skill";
};

const delay = (ms = 160) => new Promise((resolve) => window.setTimeout(resolve, ms));

const initialSkills: UserSkill[] = [
  {
    id: "web-development",
    title: "การพัฒนาเว็บไซต์",
    subtitle: "Web Development",
    category: "specific",
    source: "system",
    verifiedSegments: 6,
    manualSegments: 2,
    totalSegments: 9,
    completedCourseId: "web-development-foundation",
    completedCourseTitle: "Web Development Foundation",
    issuedAt: "10 ม.ค. 2568",
  },
  {
    id: "color-theory",
    title: "การใช้สีและทฤษฎีสี",
    subtitle: "Color Theory",
    category: "general",
    source: "system",
    verifiedSegments: 4,
    manualSegments: 2,
    totalSegments: 9,
    completedCourseId: "visual-design-basics",
    completedCourseTitle: "Visual Design Basics",
    issuedAt: "15 ม.ค. 2568",
  },
  {
    id: "branding",
    title: "การสร้างแบรนด์",
    subtitle: "Branding",
    category: "specific",
    source: "manual",
    verifiedSegments: 2,
    manualSegments: 2,
    totalSegments: 9,
  },
  {
    id: "ux-design",
    title: "ออกแบบประสบการณ์ผู้ใช้",
    subtitle: "User Experience Design",
    category: "specific",
    source: "system",
    verifiedSegments: 0,
    manualSegments: 2,
    totalSegments: 9,
    completedCourseId: "ux-research-for-product",
    completedCourseTitle: "UX Research for Product",
    issuedAt: "22 ม.ค. 2568",
  },
  {
    id: "digital-marketing",
    title: "การตลาดดิจิทัล",
    subtitle: "Digital Marketing",
    category: "specific",
    source: "manual",
    verifiedSegments: 2,
    manualSegments: 2,
    totalSegments: 9,
  },
  {
    id: "game-development",
    title: "การพัฒนาเกม",
    category: "other",
    source: "system",
    verifiedSegments: 0,
    manualSegments: 0,
    totalSegments: 0,
    completedCourseId: "game-prototyping",
    completedCourseTitle: "Game Prototyping",
    issuedAt: "25 ม.ค. 2568",
  },
  {
    id: "analytics-tools",
    title: "การใช้เครื่องมือวิเคราะห์",
    subtitle: "Analytics Tools Usage",
    category: "tool",
    source: "manual",
    verifiedSegments: 0,
    manualSegments: 2,
    totalSegments: 9,
  },
  {
    id: "user-flow-design",
    title: "ออกแบบ User Flow",
    subtitle: "User Flow Design",
    category: "tool",
    source: "system",
    verifiedSegments: 0,
    manualSegments: 2,
    totalSegments: 9,
    completedCourseId: "product-flow-design",
    completedCourseTitle: "Product Flow Design",
    issuedAt: "02 ก.พ. 2568",
  },
  {
    id: "product-design",
    title: "ออกแบบผลิตภัณฑ์",
    subtitle: "Product Design",
    category: "specific",
    source: "manual",
    verifiedSegments: 2,
    manualSegments: 2,
    totalSegments: 9,
  },
];

function buildSummary(skills: UserSkill[]): SkillCollectionSummary {
  return {
    all: skills.length,
    specific: skills.filter((skill) => skill.category === "specific").length,
    general: skills.filter((skill) => skill.category === "general").length,
    tool: skills.filter((skill) => skill.category === "tool").length,
    other: skills.filter((skill) => skill.category === "other").length,
    system: skills.filter((skill) => skill.source === "system").length,
    manual: skills.filter((skill) => skill.source === "manual").length,
  };
}

export async function getSkillCollection(): Promise<SkillCollectionResponse> {
  await delay();
  return {
    summary: buildSummary(initialSkills),
    skills: initialSkills,
  };
}

export async function addManualSkill(input: AddManualSkillInput): Promise<UserSkill> {
  await delay(180);
  return {
    id: `manual-${input.title.trim().toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
    title: input.title.trim(),
    subtitle: input.subtitle?.trim() || undefined,
    category: input.category,
    source: "manual",
    verifiedSegments: 0,
    manualSegments: 1,
    totalSegments: 9,
  };
}

export async function updateSkill(skill: UserSkill, input: UpdateSkillInput): Promise<UserSkill> {
  await delay(180);
  return {
    ...skill,
    title: input.title.trim(),
    subtitle: input.subtitle?.trim() || undefined,
    category: input.category,
  };
}

export async function deleteSkill(skill: UserSkill): Promise<DeleteSkillResponse> {
  await delay(140);
  if (skill.source === "system") {
    return {
      ok: false,
      reason: "system-skill",
    };
  }
  return { ok: true };
}
