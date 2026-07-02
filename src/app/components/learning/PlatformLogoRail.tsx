import type { LearningPlatform } from "../../mock-api/learning";

type Props = {
  platforms: LearningPlatform[];
};

export default function PlatformLogoRail({ platforms }: Props) {
  return (
    <section>
      <h2 className="mb-5 text-[24px] font-bold text-[#05101f]">คอร์สจากแพลตฟอร์มอื่น ๆ</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {platforms.map((platform) => (
          <a
            key={platform.id}
            href={platform.url}
            className="sk-press-tilt-card flex h-[72px] items-center justify-center rounded-2xl bg-white text-[24px] font-bold text-[#1e78d4] shadow-sm ring-1 ring-[#dbe6f0]/80 hover:shadow-[var(--sk-shadow-sm)]"
            aria-label={`ไปที่ ${platform.name}`}
          >
            {platform.mark}
          </a>
        ))}
      </div>
    </section>
  );
}
