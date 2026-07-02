import profileAvatar from "@/assets/profile/narathip-chusak.png";

export type ProfileVisibility = "public" | "private";

export type ProfileRiasecTag = {
  code: string;
  label: string;
  color: string;
};

export type ProfileSummary = {
  id: string;
  fullName: string;
  displayName: string;
  avatarUrl: string;
  avatarAlt: string;
  visibility: ProfileVisibility;
  completionPercent: number;
  riasecTags: ProfileRiasecTag[];
};

export type ProfileEducation = {
  id: string;
  period: string;
  school: string;
  program: string;
  gpa?: string;
};

export type ProfileExperience = {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
};

export type ProfileActivity = {
  id: string;
  period: string;
  title: string;
  description: string;
  imageUrl?: string;
};

export type ProfileCertificate = {
  id: string;
  title: string;
  issuer: string;
  status: "active" | "expired" | "private";
  imageUrl?: string;
};

export type CurrentProfile = ProfileSummary & {
  headline: string;
  selfIntroduction: string;
  education: ProfileEducation[];
  experiences: ProfileExperience[];
  activities: ProfileActivity[];
  certificates: ProfileCertificate[];
};

export const currentUserProfile: CurrentProfile = {
  id: "profile-narathip-chusak",
  fullName: "นราธิป ชูศักดิ์",
  displayName: "Narathip Chusak",
  avatarUrl: profileAvatar,
  avatarAlt: "Narathip Chusak profile photo",
  visibility: "public",
  completionPercent: 68,
  headline: "Product Designer",
  selfIntroduction:
    "Product Designer ผู้สนใจงานด้าน Web Applications ที่เน้นประสิทธิภาพและประสบการณ์ผู้ใช้ พร้อมต่อยอดไปสู่การออกแบบระบบที่ใช้งานจริง",
  riasecTags: [
    { code: "R", label: "นักลงมือทำ", color: "#5c8bdc" },
    { code: "I", label: "นักคิดวิเคราะห์", color: "#b093e8" },
    { code: "A", label: "นักสร้างสรรค์", color: "#f588d6" },
  ],
  education: [
    {
      id: "edu-satreephuket",
      period: "ม.ค. 2567 - ปัจจุบัน",
      school: "สถานศึกษาในจังหวัดภูเก็ต",
      program: "สายการเรียนวิทยาศาสตร์-คณิตศาสตร์",
      gpa: "3.14",
    },
  ],
  experiences: [
    {
      id: "exp-design-intern",
      period: "ม.ค. 2569 - ก.พ. 2569",
      role: "นักศึกษาฝึกงาน",
      organization: "องค์กรด้านดิจิทัล",
      description: "ช่วยออกแบบหน้าจอและเตรียมงาน prototype สำหรับผลิตภัณฑ์ดิจิทัล",
    },
  ],
  activities: [
    {
      id: "activity-workshop",
      period: "ก.พ. 2568 - ก.พ. 2568",
      title: "ผู้ช่วยอาจารย์ที่ปรึกษา",
      description: "ช่วยดูแลกิจกรรมและสนับสนุนงานอบรมด้านทักษะดิจิทัล",
    },
  ],
  certificates: [
    {
      id: "cert-internship",
      title: "ใบรับรองการฝึกงาน",
      issuer: "Digital organization",
      status: "active",
    },
  ],
};

const delay = (ms = 120) => new Promise((resolve) => globalThis.setTimeout(resolve, ms));

export async function getCurrentProfile() {
  await delay();
  return currentUserProfile;
}
