import { Bookmark, Play } from "lucide-react";
import type { LearningCourse } from "../../mock-api/learning";

type Props = {
  course: LearningCourse;
  variant?: "course" | "poster" | "wide";
  onBookmark?: (courseId: string) => void;
};

export default function CourseCard({ course, variant = "course", onBookmark }: Props) {
  const isWide = variant === "wide";
  const isPoster = variant === "poster";

  return (
    <article
      className={`sk-press-tilt-card relative shrink-0 snap-start overflow-hidden rounded-[18px] bg-white shadow-[0_8px_24px_rgba(14,36,64,0.10)] ring-1 ring-[#dbe6f0]/70 hover:shadow-[0_6px_16px_rgba(14,36,64,0.12)] ${
        isWide
          ? "h-[220px] w-[min(480px,82vw)] sm:h-[240px] sm:w-[480px]"
          : isPoster
            ? "h-[344px] w-[min(249px,72vw)] sm:w-[249px]"
            : "h-[304px] w-[min(249px,72vw)] sm:w-[249px]"
      }`}
    >
      <a href={course.targetUrl} className="block h-full cursor-pointer" aria-label={`ดูคอร์ส ${course.title}`}>
        <div className={`relative overflow-hidden ${isWide ? "h-full" : isPoster ? "h-[230px]" : "h-[187px]"}`}>
          <img
            src={course.imageUrl}
            alt=""
            className={`h-full w-full object-cover ${isWide ? "brightness-[0.68]" : ""}`}
            loading="lazy"
          />
          {course.isRecommended ? (
            <span className="absolute left-3 top-3 rounded-full bg-[#ffde33] px-3 py-1 text-[12px] font-bold text-[#1b3a5c]">
              Recommended
            </span>
          ) : null}
          {isWide ? (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
              <p className="text-[13px] font-semibold">{course.provider.name}</p>
              <h3 className="mt-2 line-clamp-2 text-[20px] font-bold leading-[1.25]">{course.title}</h3>
            </div>
          ) : null}
        </div>

        {!isWide ? (
          <div className="relative px-4 pb-4 pt-6">
            <div className="absolute -top-5 left-4 flex size-10 items-center justify-center rounded-full border-2 border-white bg-[#eff7ff] text-[11px] font-bold text-[#1565c0] shadow-sm">
              {course.provider.logoText}
            </div>
            <p className="line-clamp-1 text-[12px] font-medium leading-[18px] text-[#767279]">{course.provider.name}</p>
            <h3 className="mt-2 line-clamp-2 text-[16px] font-semibold leading-6 text-[#05101f]">{course.title}</h3>
          </div>
        ) : null}
      </a>

      <button
        type="button"
        className="absolute right-3 top-3 flex size-9 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#1e78d4]"
        onClick={() => onBookmark?.(course.id)}
        aria-label={course.isBookmarked ? `เลิกบันทึก ${course.title}` : `บันทึก ${course.title}`}
      >
        <Bookmark className={`size-4 ${course.isBookmarked ? "fill-current" : ""}`} aria-hidden />
      </button>

      {typeof course.progress === "number" && !isWide ? (
        <div
          className="absolute inset-x-0 bottom-0 h-[6px] bg-[#e8f2fb]"
          role="progressbar"
          aria-valuenow={course.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`ความคืบหน้า ${course.progress}%`}
        >
          <div className="h-full rounded-r-full bg-[#2ac66d]" style={{ width: `${course.progress}%` }} />
        </div>
      ) : null}

      {isWide ? (
        <span className="absolute left-5 top-5 flex size-10 items-center justify-center rounded-full bg-white/90 text-[#1e78d4]">
          <Play className="size-5 fill-current" aria-hidden />
        </span>
      ) : null}
    </article>
  );
}
