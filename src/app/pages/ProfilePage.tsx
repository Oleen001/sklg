import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  ChevronRight,
  Globe2,
  GraduationCap,
  Pencil,
  Plus,
  Sparkles,
  Trophy,
  UserRound,
} from "lucide-react";
import type {
  CurrentProfile,
  ProfileActivity,
  ProfileCertificate,
  ProfileEducation,
  ProfileExperience,
  ProfileRiasecTag,
} from "../mock-api/profile";

type ProfilePageProps = {
  profile: CurrentProfile;
};

function VisibilityPill({ visibility }: { visibility: CurrentProfile["visibility"] }) {
  const isPublic = visibility === "public";
  return (
    <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-[#10b981] px-3 text-[13px] font-semibold text-white">
      <Globe2 className="size-4" aria-hidden />
      {isPublic ? "สาธารณะ" : "ส่วนตัว"}
    </span>
  );
}

function RiasecPill({ tag }: { tag: ProfileRiasecTag }) {
  return (
    <span
      className="inline-flex min-h-9 items-center gap-2 rounded-full px-2.5 pr-3 text-[14px] font-semibold text-white"
      style={{ backgroundColor: tag.color }}
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-white/20 text-[15px]">
        {tag.code}
      </span>
      {tag.label}
    </span>
  );
}

function IconButton({ label, icon: Icon }: { label: string; icon: typeof Pencil }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#cfe1f2] bg-white/70 text-[#0d6ec8] transition hover:bg-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#0d6ec8]/30"
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
  action = "Edit",
}: {
  title: string;
  icon: typeof UserRound;
  children: React.ReactNode;
  action?: "Add" | "Edit" | "Next";
}) {
  const actionIcon = action === "Add" ? Plus : action === "Next" ? ChevronRight : Pencil;
  return (
    <section className="rounded-[24px] bg-white p-5 shadow-[0_8px_24px_rgba(14,36,64,0.06)] ring-1 ring-[#e6eef7] sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eff7ff] text-[#0d6ec8]">
            <Icon className="size-5" aria-hidden />
          </span>
          <h2 className="truncate text-[20px] font-bold leading-7 text-[#0e2440]">{title}</h2>
        </div>
        <IconButton label={`${action} ${title}`} icon={actionIcon} />
      </div>
      {children}
    </section>
  );
}

function EducationList({ education }: { education: ProfileEducation[] }) {
  return (
    <div className="space-y-5">
      {education.map((item) => (
        <article key={item.id} className="grid gap-3 border-l-2 border-[#d7e8f8] pl-4">
          <div>
            <p className="text-[13px] font-semibold text-[#0d6ec8]">{item.period}</p>
            <h3 className="mt-1 text-[16px] font-bold leading-6 text-[#19181b]">{item.school}</h3>
            <p className="mt-1 text-[14px] leading-6 text-[#56535a]">{item.program}</p>
          </div>
          {item.gpa ? (
            <span className="w-fit rounded-full bg-[#eff4f9] px-3 py-1 text-[13px] font-semibold text-[#1b3a5c]">
              GPA: {item.gpa}
            </span>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function ExperienceList({ experiences }: { experiences: ProfileExperience[] }) {
  return (
    <div className="space-y-5">
      {experiences.map((item) => (
        <article key={item.id} className="grid gap-2 border-l-2 border-[#ffd8ad] pl-4">
          <p className="text-[13px] font-semibold text-[#ff7a1a]">{item.period}</p>
          <div>
            <h3 className="text-[16px] font-bold leading-6 text-[#19181b]">{item.role}</h3>
            <p className="text-[14px] font-semibold leading-6 text-[#56535a]">{item.organization}</p>
          </div>
          <p className="text-[14px] leading-6 text-[#56535a]">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

function ActivityGrid({ activities }: { activities: ProfileActivity[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {activities.map((item) => (
        <article key={item.id} className="rounded-[16px] border border-[#e5edf5] bg-[#fbfdff] p-4">
          <p className="text-[12px] font-semibold text-[#0d6ec8]">{item.period}</p>
          <h3 className="mt-2 text-[16px] font-bold leading-6 text-[#19181b]">{item.title}</h3>
          <p className="mt-2 text-[14px] leading-6 text-[#56535a]">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

function CertificateRail({ certificates }: { certificates: ProfileCertificate[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {certificates.map((item) => (
        <article
          key={item.id}
          className="relative min-h-[190px] w-[260px] shrink-0 overflow-hidden rounded-[18px] bg-gradient-to-br from-[#174c2f] via-[#102f31] to-[#080b0f] p-5 text-white"
        >
          <div className="absolute right-4 top-4 rounded-full bg-white/12 px-3 py-1 text-[12px] font-semibold">
            {item.status === "active" ? "Active" : item.status === "expired" ? "Expired" : "Private"}
          </div>
          <Award className="size-9 text-[#ffde33]" aria-hidden />
          <h3 className="mt-10 text-[17px] font-bold leading-6">{item.title}</h3>
          <p className="mt-2 text-[13px] leading-5 text-white/70">{item.issuer}</p>
        </article>
      ))}
    </div>
  );
}

export default function ProfilePage({ profile }: ProfilePageProps) {
  return (
    <main className="min-h-screen bg-[#eff4f9] px-5 pb-16 pt-[112px] text-[#19181b] sm:px-8 lg:pt-[120px]">
      <div className="mx-auto max-w-[1068px]">
        <section className="relative overflow-hidden rounded-[32px] bg-[#b9dbff] px-5 py-7 shadow-[0_20px_45px_rgba(14,36,64,0.10)] sm:px-8 lg:px-12 lg:py-11">
          <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-white/28" aria-hidden />
          <div className="pointer-events-none absolute right-20 top-8 hidden size-20 rounded-full bg-[#ffde33]/75 lg:block" aria-hidden />

          <div className="relative grid gap-7 lg:grid-cols-[188px_1fr_auto] lg:items-end">
            <div className="size-[150px] overflow-hidden rounded-full bg-[#dceeff] shadow-[inset_5px_5px_0_0_#5098f4] ring-4 ring-white/70 sm:size-[188px]">
              <img
                src={profile.avatarUrl}
                alt={profile.avatarAlt}
                className="size-full object-cover"
                style={{ objectPosition: "50% 28%" }}
              />
            </div>

            <div className="min-w-0">
              <VisibilityPill visibility={profile.visibility} />
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <h1 className="text-[34px] font-bold leading-tight text-[#19181b] sm:text-[48px]">
                  {profile.fullName}
                </h1>
                <IconButton label="Edit profile details" icon={Pencil} />
              </div>
              <p className="mt-1 text-[22px] font-bold leading-8 text-[#56535a]">{profile.displayName}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.riasecTags.map((tag) => (
                  <RiasecPill key={tag.code} tag={tag} />
                ))}
              </div>
            </div>

            <div className="w-full rounded-[24px] bg-white/60 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.72)] lg:w-[180px]">
              <p className="text-[13px] font-semibold text-[#1b3a5c]">ความสมบูรณ์ของโปรไฟล์</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-[42px] font-bold leading-none text-[#ff7a1a]">{profile.completionPercent}</span>
                <span className="pb-1 text-[18px] font-bold text-[#ff7a1a]">%</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-[#ff7a1a]" style={{ width: `${profile.completionPercent}%` }} />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6">
          <SectionCard title="แนะนำตัวเอง" icon={Sparkles}>
            <p className="text-[16px] leading-8 text-[#313131]">
              <span className="font-semibold">{profile.headline}</span>{" "}
              {profile.selfIntroduction}
            </p>
          </SectionCard>

          <SectionCard title="การศึกษา" icon={GraduationCap} action="Next">
            <EducationList education={profile.education} />
          </SectionCard>

          <SectionCard title="ประสบการณ์" icon={BriefcaseBusiness} action="Next">
            <ExperienceList experiences={profile.experiences} />
          </SectionCard>

          <SectionCard title="กิจกรรม" icon={Trophy} action="Add">
            <ActivityGrid activities={profile.activities} />
          </SectionCard>

          <SectionCard title="ใบรับรอง/ประกาศนียบัตร" icon={BookOpen} action="Add">
            <CertificateRail certificates={profile.certificates} />
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
