import { ChevronRight } from "lucide-react";
import type React from "react";
import type { PopularOpportunity } from "../../mock-api/opportunities";

type Props = {
  items: PopularOpportunity[];
};

export default function PopularOpportunities({ items }: Props) {
  return (
    <aside
      className="rounded-[16px] bg-white p-5 shadow-[var(--sk-shadow-sm)] ring-1 ring-[var(--sk-color-border)] lg:sticky lg:top-[var(--popular-panel-top)] lg:flex lg:max-h-[calc(100dvh-var(--popular-panel-top)-16px)] lg:flex-col lg:overflow-hidden lg:transition-[top,max-height] lg:duration-300"
      style={{ "--popular-panel-top": "var(--sk-navbar-sticky-clearance, 0px)" } as React.CSSProperties}
    >
      <div className="mb-5 flex shrink-0 items-center justify-between gap-4">
        <h2 className="text-[20px] font-bold leading-7 text-[var(--sk-color-ink)]">Most Popular</h2>
        <a
          href="/skill-opportunities/popular"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-[var(--sk-color-blue-800)] transition hover:bg-[var(--sk-color-blue-50)]"
          aria-label="ดูรายการยอดนิยมทั้งหมด"
        >
          <ChevronRight className="size-5" aria-hidden />
        </a>
      </div>

      <div className="-mr-2 min-h-0 divide-y divide-[var(--sk-color-border)] pr-2 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain [scrollbar-color:var(--sk-color-blue-200)_transparent] [scrollbar-width:thin]">
        {items.map((item) => (
          <article key={item.id} className="rounded-[12px] px-2 py-4 first:pt-0 last:pb-0 hover:bg-[var(--sk-color-blue-50)]">
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
