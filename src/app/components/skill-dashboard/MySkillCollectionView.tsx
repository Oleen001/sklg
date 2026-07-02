import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  Award,
  BadgeCheck,
  Boxes,
  BrainCircuit,
  ChevronDown,
  Grid2X2,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Wrench,
  X,
} from "lucide-react";
import sunnyIdle from "@/assets/characters/sunny/sunny1-idle.svg";
import {
  addManualSkill,
  deleteSkill,
  getSkillCollection,
  updateSkill,
  type SkillCollectionCategory,
  type SkillCollectionResponse,
  type UserSkill,
} from "@/app/mock-api/skillCollection";

type SkillFilter = "all" | SkillCollectionCategory;

const categoryLabel: Record<SkillFilter, string> = {
  all: "All",
  specific: "Specific",
  general: "General",
  tool: "Tool",
  other: "Other",
};

const categoryMeta: Record<SkillFilter, { color: string; icon: typeof Grid2X2 }> = {
  all: { color: "#1e78d4", icon: Grid2X2 },
  specific: { color: "#d53333", icon: BrainCircuit },
  general: { color: "#dcb506", icon: Sparkles },
  tool: { color: "#3d8c4e", icon: Wrench },
  other: { color: "#a5a2a9", icon: Boxes },
};

const backgroundStars: {
  left: string;
  top: string;
  size: number;
  delay: string;
  opacity: number;
}[] = [
  { left: "7%", top: "18%", size: 9, delay: "0ms", opacity: 0.3 },
  { left: "16%", top: "46%", size: 18, delay: "520ms", opacity: 0.16 },
  { left: "28%", top: "9%", size: 6, delay: "180ms", opacity: 0.45 },
  { left: "40%", top: "73%", size: 5, delay: "760ms", opacity: 0.42 },
  { left: "51%", top: "38%", size: 14, delay: "340ms", opacity: 0.14 },
  { left: "62%", top: "58%", size: 6, delay: "920ms", opacity: 0.5 },
  { left: "73%", top: "22%", size: 12, delay: "240ms", opacity: 0.2 },
  { left: "86%", top: "64%", size: 4, delay: "680ms", opacity: 0.5 },
  { left: "93%", top: "14%", size: 5, delay: "1100ms", opacity: 0.46 },
  { left: "33%", top: "54%", size: 10, delay: "980ms", opacity: 0.18 },
];

function buildSummary(skills: UserSkill[]) {
  return {
    all: skills.length,
    specific: skills.filter((skill) => skill.category === "specific").length,
    general: skills.filter((skill) => skill.category === "general").length,
    tool: skills.filter((skill) => skill.category === "tool").length,
    other: skills.filter((skill) => skill.category === "other").length,
  };
}

function SummaryCard({
  filter,
  count,
  isActive,
  onClick,
}: {
  filter: SkillFilter;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const meta = categoryMeta[filter];
  const Icon = meta.icon;

  return (
    <button
      type="button"
      className={`relative flex h-20 min-w-[160px] flex-1 items-center rounded-[20px] border bg-white px-3 text-left transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,36,64,0.08)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#1e78d4] ${
        isActive ? "shadow-[0_8px_24px_rgba(14,36,64,0.08)]" : ""
      }`}
      style={{ borderColor: meta.color }}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: meta.color }}>
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="ml-4 flex min-w-0 flex-1 flex-col items-center pr-2 text-center">
        <span className="text-[20px] font-bold leading-7 text-[#19181b]">{count}</span>
        <span className="text-[11px] font-semibold leading-4 text-[#767279]">{categoryLabel[filter]}</span>
      </span>
    </button>
  );
}

function SegmentBar({ skill }: { skill: UserSkill }) {
  const total = Math.max(skill.totalSegments, skill.verifiedSegments + skill.manualSegments, 1);
  const segments = Array.from({ length: total }, (_, index) => {
    if (index < skill.verifiedSegments) return "verified";
    if (index < skill.verifiedSegments + skill.manualSegments) return "manual";
    return "empty";
  });

  if (skill.totalSegments === 0) return null;

  return (
    <div className="flex gap-0.5" aria-label={`${skill.verifiedSegments + skill.manualSegments} of ${total} criteria`}>
      {segments.map((segment, index) => (
        <span
          key={`${skill.id}-${index}`}
          className={`h-2 w-5 origin-left rounded-full opacity-0 [animation:sk-skill-segment-pop_520ms_cubic-bezier(0.16,1,0.3,1)_forwards] ${
            segment === "verified"
              ? "bg-[#1e78d4]"
              : segment === "manual"
                ? "bg-[#ffd108]"
                : "bg-[#eaeaea]"
          }`}
          style={{ animationDelay: `${120 + index * 52}ms` }}
        />
      ))}
    </div>
  );
}

function SkillCard({
  skill,
  index,
  onEdit,
}: {
  skill: UserSkill;
  index: number;
  onEdit: (skill: UserSkill) => void;
}) {
  const hasSystemBadge = skill.source === "system";

  return (
    <button
      type="button"
      className="group relative min-h-[77px] overflow-hidden rounded-[16px] border border-[#deddde] bg-white px-3 pb-3 pt-2 text-left opacity-0 shadow-[0_2px_8px_rgba(14,36,64,0.04)] transition duration-300 ease-out [animation:sk-skill-card-in_620ms_cubic-bezier(0.16,1,0.3,1)_forwards] hover:-translate-y-2 hover:border-[#1e78d4] hover:bg-[#f8fbff] hover:shadow-[0_16px_34px_rgba(14,36,64,0.20)] hover:ring-4 hover:ring-[#d7ecff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#1e78d4]"
      style={{ animationDelay: `${index * 58}ms` }}
      onClick={() => onEdit(skill)}
      aria-label={`แก้ไขทักษะ ${skill.title}`}
    >
      <span className="pointer-events-none absolute inset-y-0 left-[-60%] w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition duration-500 group-hover:left-[120%] group-hover:opacity-100" aria-hidden />
      <div className="pr-8">
        <h3 className="truncate text-[16px] font-bold leading-6 text-[#19181b] transition-colors group-hover:text-[#0c5fb5]">{skill.title}</h3>
        {skill.subtitle ? <p className="truncate text-[14px] leading-[21px] text-[#767279]">{skill.subtitle}</p> : null}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <SegmentBar skill={skill} />
        {hasSystemBadge ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#eff7ff] px-2 py-0.5 text-[11px] font-semibold text-[#1e78d4] transition group-hover:bg-[#d7ecff] group-hover:scale-105">
            <BadgeCheck className="size-3.5" aria-hidden />
            Badge
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-[#fff6cc] px-2 py-0.5 text-[11px] font-semibold text-[#8a6f00] transition group-hover:bg-[#ffed99] group-hover:scale-105">
            Manual
          </span>
        )}
      </div>
      {hasSystemBadge ? (
        <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full text-[#ffd108] transition duration-300 group-hover:rotate-6 group-hover:scale-110" title={skill.completedCourseTitle}>
          <Award className="size-5 fill-[#ffd108]" aria-label="system badge" />
        </span>
      ) : null}
    </button>
  );
}

function SkillEditorDialog({
  skill,
  onClose,
  onSave,
  onDelete,
}: {
  skill?: UserSkill;
  onClose: () => void;
  onSave: (input: { title: string; subtitle?: string; category: SkillCollectionCategory }) => Promise<void>;
  onDelete?: (skill: UserSkill) => Promise<void>;
}) {
  const [title, setTitle] = useState(skill?.title ?? "");
  const [subtitle, setSubtitle] = useState(skill?.subtitle ?? "");
  const [category, setCategory] = useState<SkillCollectionCategory>(skill?.category ?? "specific");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isEditing = Boolean(skill);
  const canDelete = skill?.source === "manual";

  const submit = async () => {
    if (!title.trim()) return;
    setIsSaving(true);
    await onSave({ title, subtitle, category });
    setIsSaving(false);
    onClose();
  };

  const remove = async () => {
    if (!skill || !canDelete || !onDelete) return;
    setIsDeleting(true);
    await onDelete(skill);
    setIsDeleting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-6">
      <div role="dialog" aria-modal="true" aria-labelledby="skill-editor-title" className="w-full max-w-[480px] rounded-[24px] bg-white p-6 shadow-[0_20px_60px_rgba(14,36,64,0.24)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="skill-editor-title" className="text-[24px] font-bold leading-8 text-[#0e2440]">
              {isEditing ? "แก้ไขทักษะ" : "เพิ่มทักษะเอง"}
            </h2>
            <p className="mt-1 text-[14px] leading-6 text-[#507da4]">
              {isEditing
                ? skill?.source === "system"
                  ? "ทักษะนี้มาจากระบบ จึงแก้ไขข้อมูลแสดงผลได้ แต่ลบออกไม่ได้"
                  : "แก้ไขข้อมูลทักษะที่เพิ่มเอง"
                : "ทักษะที่เพิ่มเองจะเป็น manual skill และยังไม่มี badge จากระบบ"}
            </p>
          </div>
          <button type="button" className="grid size-9 place-items-center rounded-full hover:bg-[#f5f4f5]" onClick={onClose} aria-label={isEditing ? "ปิดแก้ไขทักษะ" : "ปิดเพิ่มทักษะ"}>
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-[14px] font-semibold text-[#19181b]">ชื่อทักษะ</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 h-12 w-full rounded-[16px] border border-[#deddde] px-4 text-[16px] outline-none focus:border-[#1e78d4]"
              placeholder="เช่น Data Storytelling"
            />
          </label>
          <label className="block">
            <span className="text-[14px] font-semibold text-[#19181b]">ชื่ออังกฤษ/คำอธิบายสั้น</span>
            <input
              value={subtitle}
              onChange={(event) => setSubtitle(event.target.value)}
              className="mt-2 h-12 w-full rounded-[16px] border border-[#deddde] px-4 text-[16px] outline-none focus:border-[#1e78d4]"
              placeholder="Optional"
            />
          </label>
          <label className="block">
            <span className="text-[14px] font-semibold text-[#19181b]">หมวดหมู่</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as SkillCollectionCategory)}
              className="mt-2 h-12 w-full rounded-[16px] border border-[#deddde] px-4 text-[16px] outline-none focus:border-[#1e78d4]"
            >
              <option value="specific">Specific</option>
              <option value="general">General</option>
              <option value="tool">Tool</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {canDelete ? (
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-[16px] font-bold text-[#d53333] hover:bg-[#fff0f0] disabled:opacity-50"
              onClick={remove}
              disabled={isDeleting}
            >
              <Trash2 className="size-4" aria-hidden />
              {isDeleting ? "กำลังลบ" : "ลบทักษะ"}
            </button>
          ) : (
            <span className="hidden sm:block" aria-hidden />
          )}
          <div className="flex justify-end gap-3">
            <button type="button" className="h-11 rounded-full px-5 text-[16px] font-bold text-[#1b3a5c] hover:bg-[#eff4f9]" onClick={onClose}>
              ยกเลิก
            </button>
            <button
              type="button"
              className="h-11 rounded-full bg-[#1e78d4] px-5 text-[16px] font-bold text-white disabled:opacity-50"
              onClick={submit}
              disabled={!title.trim() || isSaving}
            >
              {isSaving ? "กำลังบันทึก" : isEditing ? "บันทึก" : "เพิ่มทักษะ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MySkillCollectionView() {
  const [data, setData] = useState<SkillCollectionResponse | null>(null);
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SkillFilter>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<UserSkill | null>(null);

  useEffect(() => {
    let alive = true;
    getSkillCollection().then((response) => {
      if (!alive) return;
      setData(response);
      setSkills(response.skills);
    });
    return () => {
      alive = false;
    };
  }, []);

  const summary = useMemo(() => buildSummary(skills), [skills]);
  const filteredSkills = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return skills.filter((skill) => {
      const matchesFilter = filter === "all" || skill.category === filter;
      const matchesQuery =
        !normalizedQuery ||
        skill.title.toLowerCase().includes(normalizedQuery) ||
        skill.subtitle?.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query, skills]);

  const handleAddManualSkill = async (input: { title: string; subtitle?: string; category: SkillCollectionCategory }) => {
    const newSkill = await addManualSkill(input);
    setSkills((current) => [newSkill, ...current]);
  };

  const handleUpdateSkill = async (input: { title: string; subtitle?: string; category: SkillCollectionCategory }) => {
    if (!editingSkill) return;
    const updatedSkill = await updateSkill(editingSkill, input);
    setSkills((current) => current.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill)));
  };

  const handleDeleteSkill = async (skillToDelete: UserSkill) => {
    const response = await deleteSkill(skillToDelete);
    if (!response.ok) return;
    setSkills((current) => current.filter((skill) => skill.id !== skillToDelete.id));
  };

  if (!data) {
    return (
      <section className="bg-[#eff4f9] px-5 pb-16 sm:px-8">
        <div className="mx-auto h-[420px] max-w-[1068px] animate-pulse rounded-[24px] bg-white/70" />
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#eff4f9] px-5 pb-12 sm:px-8 lg:pb-16">
      <style>{`
        @keyframes sk-skill-card-in {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          62% {
            opacity: 1;
            transform: translateY(-3px) scale(1.015);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes sk-skill-segment-pop {
          0% {
            opacity: 0;
            transform: translateY(5px) scaleX(0);
          }
          58% {
            opacity: 1;
            transform: translateY(-2px) scaleX(1.18);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleX(1);
          }
        }

        @keyframes sk-skill-bg-star-idle {
          0%, 100% {
            opacity: var(--star-opacity);
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          45% {
            opacity: calc(var(--star-opacity) + 0.18);
            transform: translate3d(6px, -8px, 0) scale(1.08);
          }
          70% {
            transform: translate3d(-3px, -4px, 0) scale(0.96);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sk-reduce-motion,
          .sk-reduce-motion * {
            animation-duration: 1ms !important;
            animation-delay: 0ms !important;
            transition-duration: 1ms !important;
          }
        }
      `}</style>
      <img src={sunnyIdle} alt="" className="pointer-events-none absolute right-[5%] top-[-54px] hidden h-[142px] w-[142px] rotate-6 lg:block" aria-hidden />
      <div className="sk-reduce-motion mx-auto max-w-[1068px]">
        <div className="grid grid-cols-1 gap-2 opacity-0 [animation:sk-skill-card-in_560ms_cubic-bezier(0.16,1,0.3,1)_forwards] sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {(Object.keys(categoryLabel) as SkillFilter[]).map((item) => (
            <SummaryCard
              key={item}
              filter={item}
              count={summary[item]}
              isActive={filter === item}
              onClick={() => setFilter(item)}
            />
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 opacity-0 [animation:sk-skill-card-in_560ms_cubic-bezier(0.16,1,0.3,1)_120ms_forwards] lg:flex-row lg:items-center">
          <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full border border-[#deddde] bg-white px-4">
            <Search className="size-5 shrink-0 text-[#767279]" aria-hidden />
            <span className="sr-only">ค้นหาชื่อทักษะของฉัน</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-[#a5a2a9]"
              placeholder="ค้นหาชื่อทักษะของฉัน"
            />
          </label>
          <label className="relative flex h-12 min-w-[120px] items-center rounded-full border border-[#deddde] bg-white px-4">
            <span className="sr-only">เลือกประเภททักษะ</span>
            <select
              className="h-full min-w-0 flex-1 appearance-none bg-transparent pr-8 text-[16px] font-semibold text-[#19181b] outline-none"
              value={filter}
              onChange={(event) => setFilter(event.target.value as SkillFilter)}
            >
              {(Object.keys(categoryLabel) as SkillFilter[]).map((item) => (
                <option key={item} value={item}>{categoryLabel[item]}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2" aria-hidden />
          </label>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-1 rounded-full border border-[#1e78d4] bg-white px-4 text-[16px] font-bold text-[#1e78d4] transition hover:bg-[#eff7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#1e78d4]"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="size-5" aria-hidden />
            เพิ่มทักษะ
          </button>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[14px] leading-5 text-[#767279] opacity-0 [animation:sk-skill-card-in_560ms_cubic-bezier(0.16,1,0.3,1)_180ms_forwards]">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-5 rounded-full bg-[#1e78d4]" aria-hidden />
            เกณฑ์การประเมินที่ verified
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-5 rounded-full bg-[#ffd108]" aria-hidden />
            เกณฑ์การประเมินที่เพิ่มเอง
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-5 rounded-full bg-[#eaeaea]" aria-hidden />
            ยังไม่ผ่านเกณฑ์การประเมิน
          </span>
        </div>

        <div className="relative mt-5 overflow-hidden rounded-[24px] bg-[#0c3468] p-5 opacity-0 [animation:sk-skill-card-in_620ms_cubic-bezier(0.16,1,0.3,1)_240ms_forwards] sm:p-6">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {backgroundStars.map((star, index) => (
              <span
                key={index}
                className="absolute bg-white [animation:sk-skill-bg-star-idle_4.8s_ease-in-out_infinite]"
                style={{
                  left: star.left,
                  top: star.top,
                  width: star.size,
                  height: star.size,
                  borderRadius: "999px",
                  animationDelay: star.delay,
                  "--star-opacity": star.opacity,
                } as CSSProperties}
              />
            ))}
          </div>
          {filteredSkills.length > 0 ? (
            <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredSkills.map((skill, index) => (
                <SkillCard
                  key={`${skill.id}-${filter}-${query.trim()}`}
                  skill={skill}
                  index={index}
                  onEdit={setEditingSkill}
                />
              ))}
            </div>
          ) : (
            <div className="relative z-10 flex min-h-[180px] items-center justify-center rounded-[16px] border border-white/10 bg-white/5 px-5 text-center text-[16px] font-semibold text-white">
              ไม่พบทักษะที่ตรงกับเงื่อนไข
            </div>
          )}
        </div>
      </div>

      {isDialogOpen ? (
        <SkillEditorDialog
          onClose={() => setIsDialogOpen(false)}
          onSave={handleAddManualSkill}
        />
      ) : null}

      {editingSkill ? (
        <SkillEditorDialog
          skill={editingSkill}
          onClose={() => setEditingSkill(null)}
          onSave={handleUpdateSkill}
          onDelete={handleDeleteSkill}
        />
      ) : null}
    </section>
  );
}
