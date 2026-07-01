import type { OpportunityCategory } from "../../mock-api/opportunities";

type Props = {
  categories: OpportunityCategory[];
  activeId: string;
  onChange: (id: string) => void;
};

export default function OpportunityCategoryTabs({ categories, activeId, onChange }: Props) {
  return (
    <nav className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-14" aria-label="Opportunity categories">
      <div className="-mx-2 flex gap-2 overflow-x-auto px-2 py-4 [scrollbar-width:none] sm:py-5 lg:gap-3 [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const active = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              aria-pressed={active}
              className={`min-h-10 shrink-0 cursor-pointer rounded-full px-4 text-[14px] font-semibold leading-5 transition duration-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-color-blue-500)] ${
                active
                  ? "bg-[var(--sk-color-blue-500)] text-white shadow-[var(--sk-shadow-sm)]"
                  : "bg-white text-[var(--sk-color-blue-800)] ring-1 ring-[var(--sk-color-border)] hover:bg-[var(--sk-color-blue-50)]"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
