import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  GraduationCap,
  Laptop,
  MoreVertical,
  X,
} from "lucide-react";
import skillScanCloudySearch from "@/assets/figma/skill-dashboard/skill-scan-cloudy-search.svg";
import {
  getSkillCareerMatch,
  type SkillCareerCourse,
  type SkillCareerMatchResponse,
  type SkillClusterType,
  type SkillMatchCluster,
  type SkillMatchSkill,
} from "@/app/mock-api/skillScan";

const clusterColor: Record<SkillClusterType, string> = {
  core: "#ff7816",
  career: "#1e78d4",
  expert: "#14b8c4",
};

const clusterLabel: Record<SkillClusterType, string> = {
  core: "Core Skill",
  career: "Career Skill",
  expert: "Expert Skill",
};

const courseLevelLabel: Record<SkillCareerCourse["level"], string> = {
  easy: "ระดับง่าย",
  medium: "ระดับกลาง",
  hard: "ระดับยาก",
};

function ReadinessDonut({
  value,
  size = 173,
  color = "#ff7816",
}: {
  value: number;
  size?: number;
  color?: string;
}) {
  return (
    <div
      className="relative grid shrink-0 place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${value * 3.6}deg, #d7ecff 0deg)`,
      }}
      aria-label={`ความพร้อม ${value}%`}
    >
      <div className="grid h-[74%] w-[74%] place-items-center rounded-full bg-[#eff7ff]">
        <div className="text-center">
          <p className="text-[14px] leading-5 text-[#1b3a5c]">ความพร้อม</p>
          <p className="mt-[-2px] text-[40px] font-bold leading-none text-[#0e2440]">{value}%</p>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: SkillCareerCourse }) {
  const isUniversity = course.type === "university";
  return (
    <a
      href={course.targetUrl}
      className="block w-[226px] shrink-0 overflow-hidden rounded-[22px] bg-white shadow-[0_4px_12px_rgba(14,36,64,0.08)] ring-1 ring-[#eaeaea] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(14,36,64,0.12)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#1e78d4]"
    >
      <div className="h-[148px] overflow-hidden bg-[#0e2440]">
        <img src={course.imageUrl} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="relative rounded-t-[22px] bg-white px-4 pb-4 pt-5">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-[18px] text-[#767279]">
          <span className="inline-flex items-center gap-1">
            {isUniversity ? <GraduationCap className="size-4" aria-hidden /> : <BookOpen className="size-4" aria-hidden />}
            {courseLevelLabel[course.level]}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="size-4" aria-hidden />
            {course.duration}
          </span>
        </div>
        {course.instructor ? (
          <p className="mb-1 truncate text-center text-[12px] font-semibold leading-5 text-[#767279]">{course.instructor}</p>
        ) : null}
        <p className="line-clamp-2 text-[16px] leading-[22px] text-[#19181b]">{course.title}</p>
      </div>
    </a>
  );
}

function CourseGroup({
  title,
  subtitle,
  icon,
  courses,
  defaultOpen = false,
}: {
  title: string;
  subtitle?: string;
  icon: "online" | "university";
  courses: SkillCareerCourse[];
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const Icon = icon === "online" ? Laptop : GraduationCap;

  return (
    <div className="rounded-[12px] border border-[#eaeaea] bg-white p-4">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-4 text-left"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#ffefdd] text-[#ff7816]">
            <Icon className="size-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-[16px] font-bold leading-6 text-[#19181b]">{title}</span>
            {subtitle ? <span className="block text-[12px] leading-[18px] text-[#767279]">{subtitle}</span> : null}
          </span>
        </span>
        <ChevronDown className={`mt-1 size-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {isOpen ? (
        <div className="-mx-1 mt-4 flex gap-4 overflow-x-auto px-1 pb-2">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ClusterNode({
  cluster,
  onClick,
}: {
  cluster: SkillMatchCluster;
  onClick: () => void;
}) {
  const color = clusterColor[cluster.type];

  return (
    <button
      type="button"
      className="group relative z-10 flex min-h-[212px] flex-col items-center justify-start px-2 py-6 text-center transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#1e78d4]"
      onClick={onClick}
      aria-label={`ดู cluster ${cluster.title}, ทำไปแล้ว ${cluster.progress}%`}
    >
      <span
        className="grid size-[156px] place-items-center rounded-full shadow-[0_0_0_12px_rgba(224,240,255,0.9)] transition group-hover:shadow-[0_0_0_16px_rgba(224,240,255,1)]"
        style={{
          background: `conic-gradient(${color} ${cluster.progress * 3.6}deg, #e5f3ff 0deg)`,
        }}
      >
        <span className="grid size-[116px] place-items-center rounded-full border-[10px] border-[#d9f0ff] bg-[var(--cluster-color)] text-[32px] font-bold leading-none text-white" style={{ "--cluster-color": color } as CSSProperties}>
          {cluster.progress}%
        </span>
      </span>
      <span className="mt-5 max-w-[172px] text-[14px] font-bold leading-5 text-[#0e2440]">{cluster.title}</span>
      <span className="mt-1 text-[12px] leading-[18px] text-[#507da4]">{cluster.skills.length} ทักษะ</span>
    </button>
  );
}

function SkillPill({
  skill,
  clusterType,
  isActive,
  onClick,
}: {
  skill: SkillMatchSkill;
  clusterType: SkillClusterType;
  isActive: boolean;
  onClick: () => void;
}) {
  const color = clusterColor[clusterType];
  return (
    <button
      type="button"
      className={`flex min-h-[64px] items-center justify-between gap-3 rounded-[8px] border px-3 py-2 text-left transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#1e78d4] ${
        skill.isCompleted
          ? "border-[#8adfbd] bg-[#ecfff6]"
          : isActive
            ? "border-[#ffb06f] bg-[#fff3e8]"
            : "border-[#ffd1aa] bg-[#fff7ef] hover:bg-[#fff1e5]"
      }`}
      onClick={onClick}
    >
      <span className="min-w-0 text-[13px] font-semibold leading-5 text-[#0e2440]">{skill.title}</span>
      <span
        className="grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
        style={{ backgroundColor: skill.isCompleted ? "#28c76f" : color }}
      >
        {skill.isCompleted ? <Check className="size-4" aria-hidden /> : `${skill.progress}%`}
      </span>
    </button>
  );
}

function ClusterOverlay({
  cluster,
  selectedSkill,
  courses,
  onSelectSkill,
  onClose,
}: {
  cluster: SkillMatchCluster;
  selectedSkill: SkillMatchSkill;
  courses: SkillCareerMatchResponse["courseRecommendationsBySkill"][string];
  onSelectSkill: (skill: SkillMatchSkill) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] bg-black/25 px-4 py-6 lg:absolute lg:inset-auto lg:right-0 lg:top-[118px] lg:bg-transparent lg:p-0">
      <div className="ml-auto flex max-h-[calc(100dvh-48px)] w-full max-w-[940px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_18px_50px_rgba(14,36,64,0.22)] ring-1 ring-[#eaeaea] lg:max-h-none lg:w-[860px] lg:flex-row">
        <div className="bg-white p-5 lg:w-[380px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold leading-5 text-[#767279]">{clusterLabel[cluster.type]}</p>
              <h3 className="mt-1 text-[20px] font-bold leading-7 text-[#19181b]">{cluster.title}</h3>
            </div>
            <button
              type="button"
              className="grid size-9 shrink-0 place-items-center rounded-full text-[#19181b] transition hover:bg-[#f5f4f5]"
              onClick={onClose}
              aria-label="ปิดรายละเอียด cluster"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {cluster.skills.map((skill) => (
              <SkillPill
                key={skill.id}
                skill={skill}
                clusterType={cluster.type}
                isActive={selectedSkill.id === skill.id}
                onClick={() => onSelectSkill(skill)}
              />
            ))}
          </div>
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto bg-[#fffaf5] p-5">
          <div className="mb-4">
            <p className="text-[13px] font-semibold leading-5 text-[#767279]">คอร์สที่ช่วยปิด skill นี้</p>
            <h4 className="mt-1 text-[24px] font-bold leading-8 text-[#19181b]">{selectedSkill.title}</h4>
          </div>

          <div className="space-y-3">
            <CourseGroup title="คลิกเรียนออนไลน์" icon="online" courses={courses.online} defaultOpen />
            <CourseGroup
              title="ลุยคอร์สในมหาวิทยาลัย"
              subtitle="รายวิชา/คอร์สนอกหลักสูตรที่ลงเรียนได้ในมหาวิทยาลัย"
              icon="university"
              courses={courses.university}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SkillCareerMatchView() {
  const [data, setData] = useState<SkillCareerMatchResponse | null>(null);
  const [isRecommendedOpen, setIsRecommendedOpen] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<SkillMatchCluster | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillMatchSkill | null>(null);

  useEffect(() => {
    let alive = true;
    getSkillCareerMatch().then((response) => {
      if (!alive) return;
      setData(response);
    });
    return () => {
      alive = false;
    };
  }, []);

  const selectedCourses = useMemo(() => {
    if (!data || !selectedSkill) return null;
    return data.courseRecommendationsBySkill[selectedSkill.id] ?? { online: [], university: [] };
  }, [data, selectedSkill]);

  const openCluster = (cluster: SkillMatchCluster) => {
    setSelectedCluster(cluster);
    setSelectedSkill(cluster.skills[0] ?? null);
  };

  if (!data) {
    return (
      <section className="bg-[#1b3476] px-5 pb-10 sm:px-8">
        <div className="mx-auto h-[360px] max-w-[1068px] animate-pulse rounded-[24px] bg-white/20" />
      </section>
    );
  }

  return (
    <>
      <section className="bg-[#1b3476] px-5 pb-8 sm:px-8 lg:pb-[34px]">
        <div className="mx-auto max-w-[1068px]">
          <div className="relative overflow-hidden rounded-[24px] bg-[#e8f6ff] px-5 py-6 sm:px-8 lg:min-h-[360px] lg:px-10 lg:py-9">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-[28px] font-bold leading-10 text-[#0e2440] sm:text-[32px]">
                      {data.career.title}
                    </h1>
                    <p className="mt-1 text-[18px] leading-7 text-[#507da4] sm:text-[20px]">{data.career.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    className="grid size-9 shrink-0 place-items-center rounded-full text-[#0e2440] transition hover:bg-white/60"
                    aria-label="เมนูอาชีพเป้าหมาย"
                  >
                    <MoreVertical className="size-5" aria-hidden />
                  </button>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img src={skillScanCloudySearch} alt="" className="h-[94px] w-[132px] object-contain sm:h-[104px]" aria-hidden />
                  <div className="relative rounded-full bg-[#ffd108] px-5 py-3 text-[14px] leading-6 text-[#05101f] sm:max-w-[520px] sm:px-6">
                    <p className="font-medium">{data.career.insight}</p>
                    <p className="truncate">
                      {data.career.insightDetail}
                      <button type="button" className="ml-2 text-[12px] font-bold underline">
                        อ่านต่อ
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center lg:w-[190px]">
                <ReadinessDonut value={data.career.readiness} />
                <p className="mt-2 text-center text-[12px] leading-[18px] text-[#507da4]">(อัปเดต: {data.career.updatedAt})</p>
              </div>
            </div>

            <div className={`mt-7 rounded-[16px] bg-white p-4 ${isRecommendedOpen ? "lg:mt-8" : "lg:absolute lg:bottom-8 lg:left-10 lg:right-10 lg:mt-0"}`}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setIsRecommendedOpen((value) => !value)}
                aria-expanded={isRecommendedOpen}
              >
                <span className="text-[18px] font-bold leading-7 text-[#0e2440]">คอร์สที่แนะนำให้เริ่มก่อน</span>
                <ChevronDown className={`size-7 text-[#507da4] transition ${isRecommendedOpen ? "rotate-180" : ""}`} aria-hidden />
              </button>
              {isRecommendedOpen ? (
                <div className="-mx-1 mt-4 flex gap-4 overflow-x-auto px-1 pb-2">
                  {data.recommendedCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white px-5 py-8 sm:px-8 lg:py-12">
        <div className="relative mx-auto max-w-[1180px] lg:px-14">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[24px] font-bold leading-9 text-[#19181b]">เส้นทางการพัฒนาทักษะ</h2>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {(Object.keys(clusterLabel) as SkillClusterType[]).map((type) => (
                <div key={type} className="flex items-center gap-1 text-[14px] leading-5 text-[#606060]">
                  <span className="size-3 rounded-full" style={{ backgroundColor: clusterColor[type] }} aria-hidden />
                  {clusterLabel[type]}
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[760px] overflow-hidden rounded-[24px] bg-white lg:overflow-visible">
            <div className="absolute left-[9%] right-[9%] top-[120px] hidden h-5 rounded-full bg-[#e8f6ff] lg:block" aria-hidden />
            <div className="absolute left-[9%] right-[9%] top-[350px] hidden h-5 rounded-full bg-[#e8f6ff] lg:block" aria-hidden />
            <div className="absolute left-[14%] top-[120px] hidden h-[478px] w-5 rounded-full bg-[#e8f6ff] lg:block" aria-hidden />
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-8">
              {data.clusters.map((cluster) => (
                <ClusterNode key={cluster.id} cluster={cluster} onClick={() => openCluster(cluster)} />
              ))}
            </div>

            {selectedCluster && selectedSkill && selectedCourses ? (
              <ClusterOverlay
                cluster={selectedCluster}
                selectedSkill={selectedSkill}
                courses={selectedCourses}
                onSelectSkill={setSelectedSkill}
                onClose={() => {
                  setSelectedCluster(null);
                  setSelectedSkill(null);
                }}
              />
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
