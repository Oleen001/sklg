import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LearningCourse, LearningRail } from "../../mock-api/learning";
import CourseCard from "./CourseCard";

type Props = {
  rail: LearningRail;
  onBookmark?: (courseId: string) => void;
};

export default function CourseRail({ rail, onBookmark }: Props) {
  if (!rail) return null;

  return (
    <section className="relative">
      <div className="mb-4 flex min-h-9 items-center gap-2 sm:mb-6">
        <h2 className="text-[22px] font-bold leading-8 text-[#05101f] sm:text-[24px] sm:leading-9">{rail.title}</h2>
        <button
          type="button"
          className="flex size-9 cursor-pointer items-center justify-center rounded-full text-[#1b3a5c] transition hover:bg-white"
          aria-label={`ดูทั้งหมด: ${rail.title}`}
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
      {rail.subtitle ? <p className="-mt-3 mb-4 text-[16px] leading-6 text-[#507da4]">{rail.subtitle}</p> : null}
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:gap-6 sm:px-0 lg:overflow-visible">
        {rail.courses.map((course: LearningCourse) => (
          <CourseCard key={course.id} course={course} variant={rail.variant === "platform" ? "course" : rail.variant} onBookmark={onBookmark} />
        ))}
      </div>
      <button
        type="button"
        className="absolute -right-6 top-1/2 hidden size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[#1b3a5c] shadow-[0_8px_24px_rgba(14,36,64,0.16)] transition hover:-right-7 lg:flex"
        aria-label={`เลื่อน ${rail.title}`}
      >
        <ChevronRight className="size-6" aria-hidden />
      </button>
      <button
        type="button"
        className="sr-only"
        aria-label={`ย้อนกลับ ${rail.title}`}
      >
        <ChevronLeft className="size-6" aria-hidden />
      </button>
    </section>
  );
}
