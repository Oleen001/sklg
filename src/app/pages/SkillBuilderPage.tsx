import { useEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import CategoryGrid from "../components/learning/CategoryGrid";
import CourseCard from "../components/learning/CourseCard";
import CourseRail from "../components/learning/CourseRail";
import LearningHeroCarousel from "../components/learning/LearningHeroCarousel";
import LearningSearchBar from "../components/learning/LearningSearchBar";
import PlatformLogoRail from "../components/learning/PlatformLogoRail";
import {
  getCourses,
  getLearningHome,
  toggleCourseBookmark,
  type LearningHomeResponse,
} from "../mock-api/learning";

export default function SkillBuilderPage() {
  const [home, setHome] = useState<LearningHomeResponse | null>(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LearningHomeResponse["inProgress"]>([]);

  useEffect(() => {
    let alive = true;
    getLearningHome().then((data) => {
      if (alive) setHome(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    if (!query.trim()) {
      setSearchResults([]);
      return () => {
        alive = false;
      };
    }
    getCourses({ search: query, limit: 5 }).then((courses) => {
      if (alive) setSearchResults(courses);
    });
    return () => {
      alive = false;
    };
  }, [query]);

  const rails = useMemo(() => home?.rails ?? [], [home]);

  const handleBookmark = (courseId: string) => {
    void toggleCourseBookmark(courseId);
  };

  if (!home) {
    return (
      <main className="min-h-dvh w-full bg-[#eff4f9] px-5 py-10 sm:px-8 lg:px-14">
        <div className="h-[320px] animate-pulse rounded-[24px] bg-white/70" />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-[288px] animate-pulse rounded-[18px] bg-white/80" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-[#eff4f9] text-[#05101f]">
      <LearningHeroCarousel banners={home.banners} />

      <div className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 lg:px-14 lg:py-10">
        <div className="relative z-20">
          <LearningSearchBar value={query} onChange={setQuery} />
          {searchResults.length > 0 ? (
            <section className="absolute left-0 right-0 top-[122px] rounded-[24px] bg-white p-4 shadow-[var(--sk-shadow-lg)] ring-1 ring-[#dbe6f0] sm:top-[64px] sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-[20px] font-bold">ผลการค้นหา</h2>
                <span className="rounded-full bg-[#eff4f9] px-3 py-1 text-[13px] font-semibold text-[#507da4]">
                  {searchResults.length} คอร์ส
                </span>
              </div>
              <div className="flex snap-x gap-4 overflow-x-auto pb-2 sm:gap-5 lg:overflow-hidden">
                {searchResults.slice(0, 4).map((course) => (
                  <CourseCard key={course.id} course={course} onBookmark={handleBookmark} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <section className="mt-10">
          <div className="mb-5 flex h-9 items-center gap-2">
            <h2 className="text-[24px] font-bold leading-9">คอร์สของฉัน</h2>
            <button
              type="button"
              className="flex size-9 cursor-pointer items-center justify-center rounded-full text-[#1b3a5c] transition hover:bg-white"
              aria-label="ดูคอร์สของฉันทั้งหมด"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
          <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:gap-6 sm:px-0 lg:overflow-visible">
            {home.inProgress.map((course) => (
              <CourseCard key={course.id} course={course} onBookmark={handleBookmark} />
            ))}
          </div>
        </section>

        <section className="relative mt-12 overflow-hidden rounded-[24px] bg-[#0758b9] px-5 py-8 sm:px-8 lg:h-[381px] lg:overflow-visible lg:bg-transparent lg:px-0 lg:py-0">
          <div className="absolute left-0 top-[84px] hidden h-[297px] w-[1254px] rounded-[28px] bg-[#0758b9] lg:block" />
          <div className="relative flex flex-col justify-center text-white lg:absolute lg:left-0 lg:top-0 lg:h-[381px] lg:w-[408px] lg:rounded-l-[24px] lg:px-14">
            <div className="absolute -top-5 left-4 size-[86px] rounded-[42%_58%_46%_54%] bg-[#bfe5ff]">
              <span className="absolute left-1/2 top-1/2 size-2 -translate-x-3 -translate-y-1 rounded-full bg-[#1b3a5c]" />
              <span className="absolute left-1/2 top-1/2 size-2 translate-x-2 -translate-y-1 rounded-full bg-[#1b3a5c]" />
              <span className="absolute left-1/2 top-1/2 h-2 w-7 -translate-x-3 translate-y-3 rounded-b-full border-b-[3px] border-[#1b3a5c]" />
            </div>
            <p className="mb-5 w-fit rounded-full bg-[#ffde33] px-5 py-2 text-[14px] font-semibold text-[#1b3a5c] lg:absolute lg:left-[120px] lg:top-[24px] lg:mb-0">
              Lorem ipsum dolor sit amet consectetur. Malesuada commod
            </p>
            <h2 className="text-[28px] font-bold leading-[1.45] sm:text-[32px]">{home.aiSuggestion.title}</h2>
            <p className="mt-4 text-[16px] leading-[1.7] text-white/90">{home.aiSuggestion.description}</p>
            <a href="/learning/recommendations" className="mt-4 inline-flex items-center text-[14px] font-semibold text-white">
              ดูทั้งหมด
              <ChevronRight className="ml-1 size-4" aria-hidden />
            </a>
          </div>
          <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-2 lg:absolute lg:left-[424px] lg:top-[46px] lg:mt-0 lg:gap-6 lg:overflow-visible lg:pb-0">
            {home.aiSuggestion.courses.map((course) => (
              <CourseCard key={course.id} course={course} onBookmark={handleBookmark} />
            ))}
          </div>
        </section>

        <div className="mt-12 space-y-12">
          {rails.slice(0, 3).map((rail) => (
            <CourseRail key={rail.id} rail={rail} onBookmark={handleBookmark} />
          ))}
        </div>

        <div className="mt-12">
          <CourseRail rail={rails[3]} onBookmark={handleBookmark} />
        </div>

        <div className="mt-12">
          <CategoryGrid categories={home.categories} />
        </div>

        <div className="mt-12">
          <CourseRail rail={rails[4]} onBookmark={handleBookmark} />
        </div>

        <div className="mt-12 pb-16">
          <PlatformLogoRail platforms={home.platforms} />
        </div>
      </div>
    </main>
  );
}
