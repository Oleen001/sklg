import { useEffect, useMemo, useState } from "react";
import OpportunityCategoryTabs from "../components/opportunities/OpportunityCategoryTabs";
import OpportunityHero from "../components/opportunities/OpportunityHero";
import OpportunityPostCard from "../components/opportunities/OpportunityPostCard";
import PopularOpportunities from "../components/opportunities/PopularOpportunities";
import {
  getOpportunitiesHome,
  type OpportunitiesHomeResponse,
} from "../mock-api/opportunities";

function LoadingState() {
  return (
    <main className="min-h-dvh w-full bg-[var(--sk-color-blue-50)] px-5 py-8 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-[1180px]">
        <div className="h-[180px] animate-pulse rounded-[24px] bg-white/70 sm:h-[237px]" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,720px)_minmax(280px,1fr)] lg:gap-8">
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[220px] animate-pulse rounded-[16px] bg-white/80" />
            ))}
          </div>
          <div className="h-[520px] animate-pulse rounded-[16px] bg-white/80" />
        </div>
      </div>
    </main>
  );
}

export default function SkillOpportunitiesPage() {
  const [home, setHome] = useState<OpportunitiesHomeResponse | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    let alive = true;
    getOpportunitiesHome().then((data) => {
      if (alive) setHome(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const posts = useMemo(() => {
    if (!home) return [];
    if (activeCategory === "all") return home.posts;
    return home.posts.filter((post) => post.categoryId === activeCategory);
  }, [activeCategory, home]);

  if (!home) return <LoadingState />;

  return (
    <main className="min-h-dvh w-full bg-[var(--sk-color-blue-50)] pb-16 text-[var(--sk-color-ink)]">
      <OpportunityHero {...home.hero} />
      <OpportunityCategoryTabs categories={home.categories} activeId={activeCategory} onChange={setActiveCategory} />

      <section className="mx-auto grid w-full max-w-[1180px] gap-6 px-5 pt-3 sm:px-8 sm:pt-5 lg:grid-cols-[minmax(0,720px)_minmax(284px,1fr)] lg:gap-8 lg:px-14 lg:pt-7">
        <div className="space-y-5 sm:space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[14px] font-semibold leading-5 text-[var(--sk-color-blue-600)]">Skill Opportunities</p>
              <h1 className="mt-1 text-[26px] font-bold leading-9 text-[var(--sk-color-navy-900)] sm:text-[32px] sm:leading-[44px]">
                ข่าว โอกาส และกิจกรรมที่น่าสนใจ
              </h1>
            </div>
            <span className="rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-[var(--sk-color-blue-800)] ring-1 ring-[var(--sk-color-border)]">
              {posts.length} รายการ
            </span>
          </div>

          {posts.map((post) => (
            <OpportunityPostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="lg:pt-[83px]">
          <PopularOpportunities items={home.popular} />
        </div>
      </section>
    </main>
  );
}
