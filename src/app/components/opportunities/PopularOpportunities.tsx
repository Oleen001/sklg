import { ChevronRight } from "lucide-react";
import type { PopularOpportunity } from "../../mock-api/opportunities";

type Props = {
  items: PopularOpportunity[];
};

export default function PopularOpportunities({ items }: Props) {
  return (
    <aside className="rounded-[16px] bg-white p-5 shadow-[var(--sk-shadow-sm)] ring-1 ring-[var(--sk-color-border)] lg:sticky lg:top-28">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-[20px] font-bold leading-7 text-[var(--sk-color-ink)]">Most Popular</h2>
        <a
          href="/skill-opportunities/popular"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-[var(--sk-color-blue-800)] transition hover:bg-[var(--sk-color-blue-50)]"
          aria-label="ดูรายการยอดนิยมทั้งหมด"
        >
          <ChevronRight className="size-5" aria-hidden />
        </a>
      </div>

      <div className="divide-y divide-[var(--sk-color-border)]">
        {items.map((item) => (
          <article key={item.id} className="py-4 first:pt-0 last:pb-0">
            <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[12px] font-bold leading-5 text-[var(--sk-color-blue-600)]">{item.categoryLabel}</span>
              <span className="text-[12px] leading-5 text-[var(--sk-color-gray-500)]">{item.timestamp}</span>
            </div>
            <a href={item.targetUrl} className="group flex gap-3">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt=""
                  className="size-20 shrink-0 rounded-[12px] object-cover"
                  loading="lazy"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-3 text-[15px] font-bold leading-6 text-[var(--sk-color-ink)] transition group-hover:text-[var(--sk-color-blue-600)]">
                  {item.title}
                </h3>
                <div className="mt-3 flex min-w-0 items-center gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--sk-color-navy-900)] text-[11px] font-bold text-white">
                    S
                  </span>
                  <span className="truncate text-[13px] font-semibold text-[var(--sk-color-gray-500)]">{item.author}</span>
                  <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[var(--sk-color-blue-500)] text-[9px] font-bold text-white">
                    ✓
                  </span>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </aside>
  );
}
