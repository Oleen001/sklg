import { BriefcaseBusiness, Code2, Languages, Megaphone, Monitor, Music, Palette, Stethoscope } from "lucide-react";
import type { LearningCategory } from "../../mock-api/learning";

const icons = {
  business: BriefcaseBusiness,
  tech: Monitor,
  dev: Code2,
  language: Languages,
  health: Stethoscope,
  music: Music,
  design: Palette,
  marketing: Megaphone,
};

type Props = {
  categories: LearningCategory[];
};

export default function CategoryGrid({ categories }: Props) {
  return (
    <section className="-mx-5 bg-[#bfe5ff] px-5 py-8 sm:-mx-8 sm:px-8 lg:-mx-14 lg:px-14 lg:py-12">
      <div className="mb-6 flex items-center gap-2">
        <h2 className="text-[24px] font-bold text-[#05101f]">หมวดหมู่ยอดนิยม</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {categories.map((category) => {
          const Icon = icons[category.icon];
          return (
            <a
              key={category.id}
              href={`/learning/categories/${category.id}`}
              className="sk-press-tilt-card flex h-[56px] items-center rounded-2xl bg-white px-5 text-[#05101f] shadow-sm hover:shadow-[var(--sk-shadow-sm)]"
            >
              <span className="mr-4 flex size-8 items-center justify-center rounded-lg bg-[#ff7a1a] text-white">
                <Icon className="size-4" aria-hidden />
              </span>
              <span>
                <span className="block text-[14px] font-bold leading-5">{category.title}</span>
                <span className="block text-[12px] leading-4 text-[#767279]">{category.courseCount} คอร์ส</span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
