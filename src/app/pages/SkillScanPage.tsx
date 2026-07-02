import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  BrainCircuit,
  ChevronDown,
  Grid2X2,
  Network,
  SearchCheck,
  Target,
} from "lucide-react";
import careerTestCard from "../../assets/figma/skill-dashboard/career-test-card.svg";
import modalArrowIcon from "../../assets/figma/skill-dashboard/modal-arrow.svg";
import modalBriefcaseIcon from "../../assets/figma/skill-dashboard/modal-briefcase.svg";
import modalCloseIcon from "../../assets/figma/skill-dashboard/modal-close.svg";
import modalTrendIcon from "../../assets/figma/skill-dashboard/modal-trend.svg";
import skillScanBeanFace from "../../assets/figma/skill-dashboard/skill-scan-bean-face.svg";
import skillScanCloudFace from "../../assets/figma/skill-dashboard/skill-scan-cloud-face.svg";
import skillScanCloudySearch from "../../assets/figma/skill-dashboard/skill-scan-cloudy-search.svg";
import skillScanStarFace from "../../assets/figma/skill-dashboard/skill-scan-star-face.svg";
import imgEngineeringOpportunity from "@/assets/opportunities/engineering-101-hero.png";
import imgHackathonOpportunity from "@/assets/opportunities/hackathon-green.png";
import imgAdsBackground from "../../imports/CareerExplore/12be04912d27d801c5eed4d993dfd2bc03db445d.png";
import {
  getCareerDetail,
  getSkillScanArchetypes,
  getSkillScanCareers,
  setCareerGoal,
  type MarketDemand,
  type MatchTier,
  type SkillScanArchetype,
  type SkillScanCareer,
} from "../mock-api/skillScan";

const demandLabel: Record<MarketDemand, string> = {
  highest: "ต้องการมากที่สุด",
  high: "ต้องการมาก",
  moderate: "ต้องการปานกลาง",
};

const modalDemandLabel: Record<MarketDemand, string> = {
  highest: "สูงมาก",
  high: "สูง",
  moderate: "ปานกลาง",
};

const demandClass: Record<MarketDemand, string> = {
  highest: "bg-[var(--sk-color-green)]",
  high: "bg-[var(--sk-color-yellow)]",
  moderate: "bg-[var(--sk-color-blue-300)]",
};

const tierLabel: Record<MatchTier, string> = {
  closest: "ใกล้เคียงที่สุด",
  near: "ใกล้เคียงรองลงมา",
  explore: "สำรวจเพิ่มเติม",
};

const careerLabel: Record<string, string> = {
  "software-engineer": "วิศวกรซอฟต์แวร์",
  "frontend-developer": "นักพัฒนาส่วนหน้า",
  "backend-developer": "นักพัฒนาส่วนหลัง",
  "data-engineer": "วิศวกรข้อมูล",
  "ml-engineer": "วิศวกรการเรียนรู้ของเครื่อง",
  "devops-engineer": "วิศวกร DevOps",
  "cybersecurity-analyst": "นักวิเคราะห์ความปลอดภัยไซเบอร์",
  "qa-engineer": "วิศวกร QA",
  "ai-programmer": "วิศวกรโปรแกรม AI",
  "product-owner": "เจ้าของผลิตภัณฑ์",
  "ui-designer": "นักออกแบบ UI",
  "product-designer": "นักออกแบบผลิตภัณฑ์",
  "research-analyst": "นักวิเคราะห์การวิจัย",
  "data-scientist": "นักวิทยาศาสตร์ข้อมูล",
  "marketing-specialist": "ผู้เชี่ยวชาญด้านการตลาด",
  "content-strategist": "นักกลยุทธ์เนื้อหา",
  "product-designer-pd": "นักออกแบบผลิตภัณฑ์",
  "ux-researcher": "นักวิจัย UX",
  "ui-designer-pd": "นักออกแบบ UI",
};

const careerSubtitle: Record<string, string> = {
  "software-engineer": "Software Engineer",
  "frontend-developer": "Frontend Developer",
  "backend-developer": "Backend Developer",
  "data-engineer": "Data Engineer",
  "ml-engineer": "ML Engineer",
  "devops-engineer": "DevOps Engineer",
  "cybersecurity-analyst": "Cybersecurity Analyst",
  "qa-engineer": "QA Engineer",
  "ai-programmer": "AI Programmer",
  "product-owner": "Product Owner",
  "ui-designer": "UI Designer",
  "product-designer": "Product Designer",
  "research-analyst": "Research Analyst",
  "data-scientist": "Data Scientist",
  "marketing-specialist": "Marketing Specialist",
  "content-strategist": "Content Strategist",
};

const desktopCareerPosition: Record<string, { x: number; y: number }> = {
  "ai-programmer": { x: 28, y: 18 },
  "data-engineer": { x: 43, y: 27 },
  "devops-engineer": { x: 62, y: 20 },
  "frontend-developer": { x: 59, y: 36 },
  "backend-developer": { x: 66, y: 83 },
  "data-scientist": { x: 77, y: 80 },
  "product-owner": { x: 52, y: 78 },
  "ml-engineer": { x: 76, y: 47 },
  "cybersecurity-analyst": { x: 90, y: 58 },
  "qa-engineer": { x: 94, y: 76 },
  "ui-designer": { x: 91, y: 31 },
  "marketing-specialist": { x: 29, y: 33 },
  "research-analyst": { x: 37, y: 44 },
  "product-designer": { x: 30, y: 53 },
  "content-strategist": { x: 16, y: 68 },
  "software-engineer": { x: 55, y: 49 },
};

type DashboardTab = "skill-scan" | "skill-to-career" | "my-skills";

const dashboardTabs: { id: DashboardTab; label: string; icon: typeof SearchCheck }[] = [
  { id: "skill-scan", label: "Skill Scan", icon: SearchCheck },
  { id: "skill-to-career", label: "Skill-to-Career Match", icon: Target },
  { id: "my-skills", label: "My Skill Collection", icon: BrainCircuit },
];

const dashboardPlaceholders: Record<Exclude<DashboardTab, "skill-scan">, { title: string; description: string }> = {
  "skill-to-career": {
    title: "Skill-to-Career Match",
    description: "วิเคราะห์ทักษะที่มี แล้วจับคู่กับเส้นทางอาชีพที่น่าต่อยอดที่สุด",
  },
  "my-skills": {
    title: "My Skill Collection",
    description: "พื้นที่รวมทักษะ ผลลัพธ์แบบทดสอบ และเป้าหมายที่เลือกไว้",
  },
};

const bootcampBanners = [
  {
    id: "engineering-101",
    image: imgAdsBackground,
    alt: "Engineering 101 Bootcamp banner",
  },
  {
    id: "engineering-opportunity",
    image: imgEngineeringOpportunity,
    alt: "Engineering opportunity banner",
  },
  {
    id: "hackathon-green",
    image: imgHackathonOpportunity,
    alt: "Hackathon bootcamp banner",
  },
];

function MarketDot({ demand }: { demand: MarketDemand }) {
  return (
    <span
      className={`absolute left-1/2 top-0 size-[18px] -translate-x-1/2 -translate-y-[18px] rounded-full shadow-sm ${demandClass[demand]}`}
      aria-hidden
    />
  );
}

function getCareerLabel(career: SkillScanCareer) {
  return careerLabel[career.id] ?? career.title.replace(/\s{2,}/g, " ").trim();
}

function getCareerSubtitle(career: SkillScanCareer) {
  return careerSubtitle[career.id] ?? career.title.match(/[A-Za-z][A-Za-z\s/&-]+$/)?.[0]?.trim() ?? "";
}

function getDesktopCareerPosition(career: SkillScanCareer) {
  return desktopCareerPosition[career.id] ?? career.position;
}

function DashboardOverview({
  activeTab,
  onTabChange,
}: {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}) {
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const activeBanner = bootcampBanners[activeBannerIndex];

  const goToBanner = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + bootcampBanners.length) % bootcampBanners.length;
    setActiveBannerIndex(normalizedIndex);
  };

  return (
    <section className="bg-[#eff4f9] px-5 pb-8 pt-[112px] sm:px-8 lg:pb-[34px] lg:pt-[132px]">
      <style>{`
        @keyframes sk-scan-banner-in {
          0% {
            opacity: 0;
            filter: blur(14px);
            transform: scale(1.025);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: scale(1);
          }
        }
      `}</style>
      <div className="mx-auto max-w-[1068px]">
        <div
          role="tablist"
          aria-label="Skill dashboard sections"
          className="flex gap-1 overflow-x-auto border-b border-[var(--sk-color-border)]"
        >
          {dashboardTabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`relative flex min-h-[52px] shrink-0 cursor-pointer items-center justify-center gap-2 px-3 text-[15px] transition-colors focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-color-blue-500)] sm:px-4 sm:text-[16px] ${
                  isActive ? "font-semibold text-[var(--sk-color-ink)]" : "font-normal text-[var(--sk-color-navy-900)] hover:text-[var(--sk-color-blue-600)]"
                }`}
                onClick={() => onTabChange(id)}
              >
                <Icon className={`size-6 ${isActive ? "text-[var(--sk-color-blue-500)]" : "text-[var(--sk-color-navy-900)]"}`} aria-hidden />
                <span className="whitespace-nowrap">{label}</span>
                {isActive ? <span className="absolute inset-x-0 bottom-0 h-[5px] bg-[var(--sk-color-blue-500)]" aria-hidden /> : null}
              </button>
            );
          })}
        </div>

        <div className="mt-7 grid min-w-0 gap-5 lg:grid-cols-[718fr_331fr]">
          <div className="min-w-0 rounded-[24px] bg-[var(--sk-color-blue-100)] p-4 sm:p-6 lg:h-[353px] lg:p-10">
            <div className="relative h-[210px] overflow-hidden rounded-[20px] sm:h-[292px] sm:rounded-[24px]">
              <img
                key={activeBanner.id}
                src={activeBanner.image}
                alt={activeBanner.alt}
                className="h-full w-full bg-[#6a0610] object-contain [animation:sk-scan-banner-in_520ms_cubic-bezier(0.16,1,0.3,1)_both] lg:object-cover"
              />
              <button
                type="button"
                aria-label="Previous bootcamp banner"
                className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--sk-color-navy-900)] shadow-[0_0_10px_rgba(0,0,0,0.10)] transition hover:bg-[#f7fbff] sm:flex lg:-left-16"
                onClick={() => goToBanner(activeBannerIndex - 1)}
              >
                <ChevronDown className="size-7 rotate-90" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next bootcamp banner"
                className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--sk-color-navy-900)] shadow-[0_0_10px_rgba(0,0,0,0.10)] transition hover:bg-[#f7fbff] sm:flex lg:-right-16"
                onClick={() => goToBanner(activeBannerIndex + 1)}
              >
                <ChevronDown className="size-7 -rotate-90" aria-hidden />
              </button>
            </div>
            <div className="mt-3 flex justify-center gap-1">
              {bootcampBanners.map((banner, index) => (
                <button
                  key={banner.id}
                  type="button"
                  aria-label={`Show bootcamp banner ${index + 1}`}
                  aria-current={activeBannerIndex === index ? "true" : undefined}
                  className={`h-2 rounded-full transition-all ${
                    activeBannerIndex === index
                      ? "w-10 bg-[var(--sk-color-blue-600)]"
                      : "w-6 bg-white hover:bg-[#d7ecff]"
                  }`}
                  onClick={() => goToBanner(index)}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className="relative block min-h-[300px] min-w-0 overflow-hidden rounded-[24px] bg-[#ffd020] text-left transition hover:brightness-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-color-blue-500)] lg:h-[355px]"
            aria-label="เริ่มทำแบบทดสอบค้นหาอาชีพที่เหมาะกับคุณ"
          >
            <img
              src={careerTestCard}
              alt=""
              className="h-full w-full object-cover"
              aria-hidden
            />
          </button>
        </div>
      </div>
    </section>
  );
}

function TabPlaceholder({ tab }: { tab: Exclude<DashboardTab, "skill-scan"> }) {
  const content = dashboardPlaceholders[tab];
  return (
    <section className="bg-white px-5 py-24 sm:px-8">
      <div className="mx-auto flex min-h-[520px] max-w-[1068px] flex-col items-center justify-center rounded-[24px] border border-[var(--sk-color-border)] bg-white text-center shadow-[var(--sk-shadow-sm)]">
        <Grid2X2 className="size-12 text-[var(--sk-color-blue-500)]" aria-hidden />
        <h1 className="mt-5 text-[32px] font-bold leading-tight text-[var(--sk-color-navy-900)]">{content.title}</h1>
        <p className="mt-3 max-w-[540px] text-[18px] leading-8 text-[var(--sk-color-blue-800)]">{content.description}</p>
        <span className="mt-6 rounded-full bg-[#eff4f9] px-6 py-3 text-[15px] font-semibold text-[var(--sk-color-blue-800)]">
          เร็วๆ นี้
        </span>
      </div>
    </section>
  );
}

export default function SkillScanPage() {
  const [archetypes, setArchetypes] = useState<SkillScanArchetype[]>([]);
  const [selectedArchetype, setSelectedArchetype] = useState("computer-engineering");
  const [careers, setCareers] = useState<SkillScanCareer[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<SkillScanCareer | null>(null);
  const [goalCareerId, setGoalCareerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGoalSaving, setIsGoalSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>("skill-scan");

  const archetype = useMemo(
    () => archetypes.find((item) => item.id === selectedArchetype),
    [archetypes, selectedArchetype]
  );
  const groupedCareers = useMemo(
    () => ({
      closest: careers.filter((career) => career.matchTier === "closest"),
      near: careers.filter((career) => career.matchTier === "near"),
      explore: careers.filter((career) => career.matchTier === "explore"),
    }),
    [careers]
  );

  useEffect(() => {
    let alive = true;
    getSkillScanArchetypes().then((items) => {
      if (!alive) return;
      setArchetypes(items);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    setIsLoading(true);
    getSkillScanCareers(selectedArchetype).then((response) => {
      if (!alive) return;
      setCareers(response.careers);
      setIsLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [selectedArchetype]);

  useEffect(() => {
    if (!selectedCareer) return;
    getCareerDetail(selectedCareer.id).then((career) => {
      if (career) setSelectedCareer(career);
    });
  }, [selectedCareer?.id]);

  const handleSetGoal = async () => {
    if (!selectedCareer) return;
    setIsGoalSaving(true);
    const response = await setCareerGoal(selectedCareer.id);
    if (response.ok) setGoalCareerId(response.careerId);
    setIsGoalSaving(false);
  };

  return (
    <main className="w-full overflow-hidden bg-white text-[var(--sk-color-navy-900)]">
      <DashboardOverview activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab !== "skill-scan" ? <TabPlaceholder tab={activeTab} /> : null}

      {activeTab === "skill-scan" ? (
      <>
      <section className="relative px-5 pb-12 pt-[132px] sm:px-8 sm:pt-[156px] lg:hidden">
        <img src={skillScanCloudFace} alt="" className="absolute left-5 top-[124px] size-12 sm:left-12 sm:top-[148px] sm:size-16" aria-hidden />
        <img src={skillScanCloudFace} alt="" className="absolute right-5 top-[124px] size-12 -scale-x-100 sm:right-12 sm:top-[148px] sm:size-16" aria-hidden />

        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <p className="text-[18px] font-medium leading-7 text-[var(--sk-color-navy-900)]">
            อนาคตที่อยากเป็น เริ่มต้นได้จากที่นี่
          </p>
          <h1 className="mt-4 text-[30px] font-bold leading-[1.35] tracking-normal text-[var(--sk-color-navy-900)] sm:text-[42px] sm:leading-[1.45]">
            เลือกอาชีพที่ใช่
            <br />
            แล้วให้เราช่วย
            <br />
            วางเส้นทาง
            <br />
            สู่เป้าหมายของคุณ
          </h1>

          <label className="relative mt-7 inline-flex h-[48px] w-full max-w-[330px] items-center rounded-full bg-[var(--sk-color-blue-500)] px-5 text-[18px] font-semibold text-white shadow-[var(--sk-shadow-sm)]">
            <Network className="mr-3 h-[22px] w-[22px] shrink-0" aria-hidden />
            <span className="sr-only">เลือก archetype</span>
            <select
              className="h-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-9 text-center text-white outline-none"
              value={selectedArchetype}
              onChange={(event) => setSelectedArchetype(event.target.value)}
            >
              {archetypes.map((item) => (
                <option key={item.id} value={item.id} className="text-[var(--sk-color-navy-900)]">
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-5 top-1/2 size-5 -translate-y-1/2" aria-hidden />
          </label>
          <p className="mt-4 min-h-6 max-w-[620px] text-[14px] leading-6 text-[var(--sk-color-blue-800)] sm:text-[16px]">
            {archetype?.description}
          </p>
        </div>

        <div className="mx-auto mt-7 max-w-[760px]">
          <div className="mb-4 flex flex-wrap justify-center gap-2 rounded-[20px] bg-[#eff4f9] px-3 py-3 text-[12px] leading-5 text-[var(--sk-color-blue-800)] ring-1 ring-[var(--sk-color-border)] sm:text-[13px]">
            {(["highest", "high", "moderate"] as MarketDemand[]).map((demand) => (
              <div key={demand} className="flex items-center gap-2">
                <span className={`size-3 rounded-full ${demandClass[demand]}`} aria-hidden />
                <span>{demandLabel[demand]}</span>
              </div>
            ))}
          </div>

          <div className="relative h-[560px] overflow-hidden rounded-[36px] bg-[#eff7ff] shadow-[var(--sk-shadow-sm)] sm:h-[720px]">
            <div className="absolute left-1/2 top-[52%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-[50%_48%_46%_52%] bg-[var(--sk-color-blue-200)] sm:h-[640px] sm:w-[640px]" />
            <div className="absolute left-1/2 top-[52%] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 sm:h-[450px] sm:w-[450px]" />
            <img src={skillScanCloudySearch} alt="" className="absolute left-1/2 top-[52%] h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 sm:h-[260px] sm:w-[260px]" aria-hidden />

            <div className="absolute inset-x-4 bottom-4 top-[205px] z-10 overflow-y-auto rounded-[24px] bg-white/85 p-4 shadow-[var(--sk-shadow-sm)] ring-1 ring-[rgba(14,36,64,0.06)] sm:hidden">
              {isLoading ? (
                <div className="flex h-full items-center justify-center text-[14px] font-medium text-[var(--sk-color-blue-800)]">
                  กำลังโหลดอาชีพจาก mock API...
                </div>
              ) : (
                (["closest", "near", "explore"] as MatchTier[]).map((tier) => (
                  <div key={tier} className="mb-4 last:mb-0">
                    <p className="mb-2 text-[13px] font-bold text-[var(--sk-color-blue-800)]">{tierLabel[tier]}</p>
                    <div className="flex flex-wrap gap-2">
                      {groupedCareers[tier].map((career) => (
                        <button
                          key={career.id}
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-left text-[12px] font-medium leading-4 text-[var(--sk-color-blue-800)] shadow-[var(--sk-shadow-sm)] ring-1 ring-[rgba(14,36,64,0.06)]"
                          onClick={() => setSelectedCareer(career)}
                          aria-label={`ดูข้อมูลอาชีพ ${career.title}, ${demandLabel[career.marketDemand]}`}
                        >
                          <span className={`size-2.5 shrink-0 rounded-full ${demandClass[career.marketDemand]}`} aria-hidden />
                          {getCareerLabel(career)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {isLoading ? (
              <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 translate-y-[112px] items-center rounded-full bg-white px-5 py-3 text-[14px] font-medium text-[var(--sk-color-blue-800)] shadow-[var(--sk-shadow-sm)] sm:flex">
                กำลังโหลดอาชีพจาก mock API...
              </div>
            ) : (
              careers.map((career) => (
                <button
                  key={career.id}
                  type="button"
                  className="group absolute hidden min-h-[30px] max-w-[132px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white px-3 py-1 text-[11px] font-medium leading-[18px] text-[var(--sk-color-blue-800)] shadow-[var(--sk-shadow-sm)] ring-1 ring-[rgba(14,36,64,0.06)] transition duration-200 hover:-translate-y-[calc(50%+2px)] hover:shadow-[var(--sk-shadow-md)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-color-blue-500)] sm:block sm:max-w-none sm:px-4 sm:text-[13px]"
                  style={{ left: `${career.position.x}%`, top: `${career.position.y}%` }}
                  onClick={() => setSelectedCareer(career)}
                  aria-label={`ดูข้อมูลอาชีพ ${career.title}, ${demandLabel[career.marketDemand]}`}
                >
                  <MarketDot demand={career.marketDemand} />
                  {getCareerLabel(career)}
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="relative mx-auto hidden h-[1210px] w-[1180px] px-[64px] pt-[112px] lg:block">
        <img src={skillScanCloudFace} alt="" className="absolute left-[132px] top-[98px] size-[78px]" aria-hidden />
        <img src={skillScanCloudFace} alt="" className="absolute right-[132px] top-[98px] size-[78px] -scale-x-100" aria-hidden />
        <img src={skillScanStarFace} alt="" className="absolute left-[82px] top-[200px] size-[64px]" aria-hidden />
        <img src={skillScanStarFace} alt="" className="absolute right-[82px] top-[200px] size-[64px] -scale-x-100" aria-hidden />
        <img src={skillScanBeanFace} alt="" className="absolute left-[246px] top-[238px] size-[56px] rotate-[-18deg]" aria-hidden />
        <img src={skillScanBeanFace} alt="" className="absolute right-[246px] top-[238px] size-[56px] rotate-[18deg] -scale-x-100" aria-hidden />

        <div className="mx-auto flex w-[760px] flex-col items-center text-center">
          <p className="text-[20px] font-medium leading-[30px] text-[var(--sk-color-navy-900)]">
            อนาคตที่อยากเป็น เริ่มต้นได้จากที่นี่
          </p>
          <h1 className="mt-5 text-[42px] font-bold leading-[1.5] tracking-normal text-[var(--sk-color-navy-900)]">
            เลือกอาชีพที่ใช่ แล้วให้เราช่วยวางเส้นทาง
            <br />
            สู่เป้าหมายของคุณ
          </h1>

          <label className="relative mt-10 inline-flex h-[48px] items-center rounded-full bg-[var(--sk-color-blue-500)] px-5 text-[20px] font-semibold text-white shadow-[var(--sk-shadow-sm)]">
            <Network className="mr-3 h-[22px] w-[22px]" aria-hidden />
            <span className="sr-only">เลือก archetype</span>
            <select
              className="h-full min-w-[230px] cursor-pointer appearance-none bg-transparent pr-10 text-center text-white outline-none"
              value={selectedArchetype}
              onChange={(event) => setSelectedArchetype(event.target.value)}
            >
              {archetypes.map((item) => (
                <option key={item.id} value={item.id} className="text-[var(--sk-color-navy-900)]">
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-5 top-1/2 size-5 -translate-y-1/2" aria-hidden />
          </label>
          <p className="mt-4 hidden min-h-6 text-[14px] leading-6 text-[var(--sk-color-blue-800)]">
            {archetype?.description}
          </p>
        </div>

        <div className="absolute left-1/2 top-[388px] h-[760px] w-[1068px] -translate-x-1/2">
          <div className="absolute left-1/2 top-1/2 h-[760px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-[50%_48%_46%_52%] bg-[var(--sk-color-blue-200)]" />
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.58)]" />
          <img src={skillScanCloudySearch} alt="" className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2" aria-hidden />

          <div className="absolute right-0 top-4 hidden flex-col gap-3 rounded-[20px] bg-white/80 px-4 py-3 text-[13px] leading-5 text-[var(--sk-color-blue-800)] shadow-[var(--sk-shadow-sm)] ring-1 ring-[var(--sk-color-border)]">
            {(["highest", "high", "moderate"] as MarketDemand[]).map((demand) => (
              <div key={demand} className="flex items-center gap-2">
                <span className={`size-3 rounded-full ${demandClass[demand]}`} aria-hidden />
                <span>{demandLabel[demand]}</span>
              </div>
            ))}
          </div>

          {isLoading ? (
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 translate-y-[120px] items-center rounded-full bg-white px-5 py-3 text-[15px] font-medium text-[var(--sk-color-blue-800)] shadow-[var(--sk-shadow-sm)]">
              กำลังโหลดอาชีพจาก mock API...
            </div>
          ) : (
            careers.map((career) => (
              <button
                key={career.id}
                type="button"
                className="group absolute min-h-[32px] max-w-[210px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white px-4 py-1 text-[14px] font-medium leading-[20px] text-[var(--sk-color-blue-800)] shadow-[var(--sk-shadow-sm)] ring-1 ring-[rgba(14,36,64,0.06)] transition duration-200 hover:-translate-y-[calc(50%+2px)] hover:shadow-[var(--sk-shadow-md)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-color-blue-500)]"
                style={{
                  left: `${getDesktopCareerPosition(career).x}%`,
                  top: `${getDesktopCareerPosition(career).y}%`,
                }}
                onClick={() => setSelectedCareer(career)}
                aria-label={`ดูข้อมูลอาชีพ ${career.title}, ${demandLabel[career.marketDemand]}`}
              >
                <MarketDot demand={career.marketDemand} />
                {getCareerLabel(career)}
              </button>
            ))
          )}
        </div>
      </section>
      </>
      ) : null}

      {selectedCareer ? createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="career-dialog-title"
            className="relative max-h-[calc(100dvh-32px)] w-full max-w-[600px] overflow-y-auto rounded-[24px] bg-white p-6 text-[#333333] shadow-[0_2px_8px_rgba(118,114,121,0.16)] sm:p-8"
          >
            <button
              type="button"
              className="absolute right-4 top-4 flex size-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f5f4f5] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-color-blue-500)] sm:right-5 sm:top-5"
              onClick={() => setSelectedCareer(null)}
              aria-label="ปิดข้อมูลอาชีพ"
            >
              <img src={modalCloseIcon} alt="" className="size-[14px]" aria-hidden />
            </button>

            <div className="pr-10">
              <h2 id="career-dialog-title" className="text-[24px] font-bold leading-9 tracking-normal text-[#333333]">
                {getCareerLabel(selectedCareer)}
              </h2>
              {getCareerSubtitle(selectedCareer) ? (
                <p className="text-[20px] font-normal leading-normal text-[#507da4]">
                  {getCareerSubtitle(selectedCareer)}
                </p>
              ) : null}
            </div>

            <p className="mt-6 text-[20px] font-normal leading-normal text-[#464554]">
              {selectedCareer.description}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-[16px] bg-[#e0f0ff] p-4">
                <img src={modalBriefcaseIcon} alt="" className="size-8" aria-hidden />
                <div className="mt-4">
                  <p className="text-[16px] font-normal leading-normal text-[#1b1b23]">เงินเดือนเฉลี่ย</p>
                  <p className="mt-1 text-[20px] font-bold leading-normal text-[#1b1b23]">{selectedCareer.salaryRange}</p>
                </div>
              </div>
              <div className="rounded-[16px] bg-[#e0f0ff] p-4">
                <img src={modalTrendIcon} alt="" className="size-8" aria-hidden />
                <div className="mt-4">
                  <p className="text-[16px] font-normal leading-normal text-[#1b1b23]">ความต้องการตลาด</p>
                  <p className="mt-1 text-[20px] font-bold leading-normal text-[#1b1b23]">{modalDemandLabel[selectedCareer.marketDemand]}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#f5f4f5] pt-6 sm:grid-cols-2">
              <button
                type="button"
                className="flex h-12 cursor-pointer items-center justify-center rounded-full bg-[#2b7db8] px-4 text-[18px] font-bold leading-[27px] text-white transition hover:bg-[var(--sk-color-blue-600)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-color-blue-500)] disabled:cursor-wait disabled:opacity-70"
                onClick={handleSetGoal}
                disabled={isGoalSaving}
              >
                {goalCareerId === selectedCareer.id ? "ตั้งเป้าหมายแล้ว" : isGoalSaving ? "กำลังตั้งเป้าหมาย" : "ตั้งเป้าหมาย"}
              </button>
              <a
                href={selectedCareer.detailPath}
                className="flex h-12 items-center justify-center gap-1 rounded-full border border-[#2b7db8] px-4 text-[18px] font-bold leading-[27px] text-[#2b7db8] transition hover:bg-[#e0f0ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-color-blue-500)]"
              >
                ดูรายละเอียดเพิ่มเติม
                <img src={modalArrowIcon} alt="" className="size-5" aria-hidden />
              </a>
            </div>
          </div>
        </div>,
        document.body
      ) : null}
    </main>
  );
}
