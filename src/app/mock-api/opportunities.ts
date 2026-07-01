import heroBanner from "@/assets/opportunities/engineering-101-hero.png";
import hackathonImage from "@/assets/opportunities/hackathon-green.png";
import internshipImage from "@/assets/opportunities/internship-office.png";
import spotlight1 from "@/assets/opportunities/spotlight-1.png";
import spotlight2 from "@/assets/opportunities/spotlight-2.png";
import spotlight3 from "@/assets/opportunities/spotlight-3.png";
import spotlight4 from "@/assets/opportunities/spotlight-4.png";

export type OpportunityCategory = {
  id: string;
  label: string;
};

export type OpportunityStats = {
  views: string;
  comments: string;
  likes: string;
};

export type OpportunityPost = {
  id: string;
  categoryId: string;
  categoryLabel: string;
  timeAgo: string;
  title: string;
  excerpt?: string;
  imageUrl?: string;
  author: string;
  verified?: boolean;
  stats: OpportunityStats;
  targetUrl: string;
};

export type PopularOpportunity = {
  id: string;
  categoryLabel: string;
  timestamp: string;
  title: string;
  author: string;
  imageUrl?: string;
  targetUrl: string;
};

export type OpportunitiesHomeResponse = {
  hero: {
    imageUrl: string;
    alt: string;
    targetUrl: string;
  };
  categories: OpportunityCategory[];
  posts: OpportunityPost[];
  popular: PopularOpportunity[];
};

const delay = (ms = 160) => new Promise((resolve) => window.setTimeout(resolve, ms));

const categories: OpportunityCategory[] = [
  { id: "all", label: "ทั้งหมด" },
  { id: "scholarship", label: "ทุนการศึกษา" },
  { id: "internship", label: "ฝึกงาน" },
  { id: "hackathon", label: "Hackathon" },
  { id: "general", label: "ข่าวสารทั่วไป" },
];

const posts: OpportunityPost[] = [
  {
    id: "career-trends-5-years",
    categoryId: "general",
    categoryLabel: "ข่าวสารทั่วไป",
    timeAgo: "5 ชม.ที่แล้ว",
    title: "เทรนด์อาชีพมาแรงที่น่าจับตามองในอีก 5 ปีข้างหน้า",
    excerpt:
      "เทคโนโลยี AI การวิเคราะห์ข้อมูล และการเปลี่ยนแปลงของโลกดิจิทัล กำลังสร้างความต้องการบุคลากรในสายงานใหม่ ๆ อย่างต่อเนื่อง ไม่ว่าจะเป็น AI Prompt Engineer, Data Analyst, Cybersecurity Specialist หรือ UX/UI Designer",
    author: "Admin",
    verified: true,
    stats: { views: "1.5K", comments: "893", likes: "1.2K" },
    targetUrl: "/skill-opportunities/career-trends-5-years",
  },
  {
    id: "youth-deliberation-hackathon",
    categoryId: "hackathon",
    categoryLabel: "Hackathon",
    timeAgo: "1 ชม.ที่แล้ว",
    title: "ระเบิดไอเดีย เปลี่ยนเสียงคนรุ่นใหม่ให้เป็นนโยบายจริง! Youth Deliberation Hackathon เปิดรับสมัครแล้ววันนี้!",
    excerpt:
      "เชิญชวนเยาวชนทุกคนเข้าร่วม Youth Deliberation Hackathon เพื่อระดมความคิดและพัฒนาแนวทางแก้ไขปัญหาในระบบ ผ่านกระบวนการ Hackathon ให้คุณได้มีส่วนร่วม",
    imageUrl: hackathonImage,
    author: "Admin",
    verified: true,
    stats: { views: "1.5K", comments: "893", likes: "1.2K" },
    targetUrl: "/skill-opportunities/youth-deliberation-hackathon",
  },
  {
    id: "queen-mary-london-2026",
    categoryId: "scholarship",
    categoryLabel: "ทุนการศึกษา",
    timeAgo: "5 ชม.ที่แล้ว",
    title: "โอกาสดี London มาอีกแล้ว! Queen Mary University of London เปิดรับสมัครทุนการศึกษา ประจำปี 2026",
    excerpt:
      "Queen Mary University of London มหาวิทยาลัยเก่าแก่ที่ก่อตั้งในปี 1785 เปิดรับสมัครทุนสำหรับนักเรียนต่างชาติในหลากหลายสาขา",
    author: "Admin",
    verified: true,
    stats: { views: "1.5K", comments: "893", likes: "1.2K" },
    targetUrl: "/skill-opportunities/queen-mary-london-2026",
  },
  {
    id: "iom-un-internship",
    categoryId: "internship",
    categoryLabel: "ฝึกงาน",
    timeAgo: "23 นาทีที่แล้ว",
    title: "ฝึกงานระดับอินเตอร์ในองค์กร UN! IOM เปิดโอกาสให้นักศึกษาเรียนรู้งานด้านมนุษยธรรมและการพัฒนาระดับสากล",
    excerpt:
      "โอกาสสำหรับนักศึกษาที่อยากสัมผัสงานองค์กรระหว่างประเทศ พร้อมเรียนรู้กระบวนการทำงานด้านมนุษยธรรมจากทีมงานตัวจริง",
    imageUrl: internshipImage,
    author: "Admin",
    verified: true,
    stats: { views: "1.5K", comments: "893", likes: "1.2K" },
    targetUrl: "/skill-opportunities/iom-un-internship",
  },
  {
    id: "daad-epos-2026",
    categoryId: "scholarship",
    categoryLabel: "ทุนการศึกษา",
    timeAgo: "23 ชม.ที่แล้ว",
    title: "มาแล้ว! ทุนเรียนฟรีที่เยอรมนี ‘DAAD (EPOS)’ ระดับ ป.โท/เอก จัดเต็มหลายสาขา ปี 2026/2027",
    excerpt:
      "ทุนสำหรับผู้ที่ต้องการต่อยอดสายวิชาการและวิชาชีพในเยอรมนี ครอบคลุมหลายสาขาพร้อมรายละเอียดการสมัครที่ควรเตรียมตัวล่วงหน้า",
    author: "นราธิป ชูศักดิ์",
    stats: { views: "980", comments: "122", likes: "624" },
    targetUrl: "/skill-opportunities/daad-epos-2026",
  },
];

const popular: PopularOpportunity[] = [
  {
    id: "aerospace-engineering-ai",
    categoryLabel: "ทุนการศึกษา",
    timestamp: "10 มิ.ย. 2568 09:11",
    title: "เจาะลึก 8 สาขาวิศวกรรมยอดฮิตที่ตลาดแรงงานยุค AI ต้องการตัว",
    author: "Admin",
    imageUrl: spotlight1,
    targetUrl: "/skill-opportunities/aerospace-engineering-ai",
  },
  {
    id: "aeronautics-engineering-tunisia",
    categoryLabel: "ฝึกงาน",
    timestamp: "22 ส.ค. 2568 23:09",
    title: "ศูนย์อวกาศแอฟริกาและเอเชียเหนือประกาศรับนักศึกษาเข้าร่วมโครงการ",
    author: "Admin",
    imageUrl: spotlight2,
    targetUrl: "/skill-opportunities/aeronautics-engineering-tunisia",
  },
  {
    id: "soft-skills-2026",
    categoryLabel: "ข่าวสารทั่วไป",
    timestamp: "2 มิ.ย. 2568 14:46",
    title: "5 Soft Skills ที่นายจ้างมองหาในปี 2026",
    author: "Admin",
    targetUrl: "/skill-opportunities/soft-skills-2026",
  },
  {
    id: "study-abroad-iowa",
    categoryLabel: "ทุนการศึกษา",
    timestamp: "6 ม.ค. 2568 19:38",
    title: "เปิดประตูสู่โลกกว้าง! โปรแกรม Study Abroad เพิ่มประสบการณ์อินเตอร์ ณ University of Iowa",
    author: "Admin",
    targetUrl: "/skill-opportunities/study-abroad-iowa",
  },
  {
    id: "hackathon-portfolio",
    categoryLabel: "Hackathon",
    timestamp: "18 เม.ย. 2568 06:20",
    title: "ปีโดดเด่นยังไง? แนะโพสต์ที่เพื่อนร่วมอุดมการณ์ Hackathon ต้องอ่าน",
    author: "Admin",
    imageUrl: spotlight3,
    targetUrl: "/skill-opportunities/hackathon-portfolio",
  },
  {
    id: "innovation-hackathon-2026",
    categoryLabel: "Hackathon",
    timestamp: "27 ก.ค. 2568 16:39",
    title: "โอกาสปล่อยของมาแล้ว! ชวนทำประลองไอเดียในงาน EdTech Innovation Hackathon 2026",
    author: "Admin",
    imageUrl: spotlight4,
    targetUrl: "/skill-opportunities/innovation-hackathon-2026",
  },
];

export async function getOpportunitiesHome(): Promise<OpportunitiesHomeResponse> {
  await delay();
  return {
    hero: {
      imageUrl: heroBanner,
      alt: "Engineering 101 Bootcamp",
      targetUrl: "/skill-builder",
    },
    categories,
    posts,
    popular,
  };
}
