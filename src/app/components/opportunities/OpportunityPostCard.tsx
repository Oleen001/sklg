import { Bookmark, Eye, Heart, MessageSquare, Share2, type LucideIcon } from "lucide-react";
import type { OpportunityPost } from "../../mock-api/opportunities";

type Props = {
  post: OpportunityPost;
};

function AuthorBadge({ name, verified }: { name: string; verified?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--sk-color-navy-900)] text-[12px] font-bold text-white">
        {name === "Admin" ? "S" : name.slice(0, 1)}
      </span>
      <span className="truncate text-[14px] font-semibold leading-5 text-[var(--sk-color-ink)]">{name}</span>
      {verified ? (
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[var(--sk-color-blue-500)] text-[10px] font-bold text-white">
          ✓
        </span>
      ) : null}
    </div>
  );
}

function StatItem({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium leading-5 text-[var(--sk-color-blue-800)] sm:text-[13px]">
      <Icon className="size-4" aria-hidden />
      {label}
    </span>
  );
}

export default function OpportunityPostCard({ post }: Props) {
  return (
    <article className="overflow-hidden rounded-[16px] bg-white p-5 shadow-[var(--sk-shadow-sm)] ring-1 ring-[var(--sk-color-border)] sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <a
          href={`/skill-opportunities?category=${post.categoryId}`}
          className="text-[14px] font-bold leading-5 text-[var(--sk-color-blue-600)] hover:text-[var(--sk-color-blue-500)]"
        >
          {post.categoryLabel}
        </a>
        <span className="text-[13px] leading-5 text-[var(--sk-color-gray-500)]">{post.timeAgo}</span>
      </div>

      <a href={post.targetUrl} className="group mt-3 block">
        <h2 className="text-[18px] font-bold leading-7 text-[var(--sk-color-ink)] transition group-hover:text-[var(--sk-color-blue-600)] sm:text-[20px] sm:leading-8">
          {post.title}
        </h2>
      </a>

      {post.imageUrl ? (
        <a href={post.targetUrl} className="mt-5 block overflow-hidden rounded-[16px] bg-[var(--sk-color-blue-50)]">
          <img src={post.imageUrl} alt="" className="aspect-[800/450] w-full object-cover" loading="lazy" />
        </a>
      ) : null}

      {post.excerpt ? (
        <p className="mt-4 line-clamp-3 text-[15px] leading-7 text-[var(--sk-color-gray-500)] sm:text-[16px]">
          {post.excerpt}
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-4 border-t border-[var(--sk-color-border)] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <AuthorBadge name={post.author} verified={post.verified} />
        <div className="flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-3 sm:w-auto sm:justify-start sm:gap-x-4">
          <StatItem icon={Eye} label={`เข้าชม ${post.stats.views}`} />
          <StatItem icon={MessageSquare} label={post.stats.comments} />
          <StatItem icon={Heart} label={post.stats.likes} />
          <button
            type="button"
            className="flex size-8 cursor-pointer items-center justify-center rounded-full text-[var(--sk-color-blue-800)] transition hover:bg-[var(--sk-color-blue-50)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-color-blue-500)] sm:size-9"
            aria-label={`แชร์ ${post.title}`}
          >
            <Share2 className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            className="flex size-8 cursor-pointer items-center justify-center rounded-full text-[var(--sk-color-blue-800)] transition hover:bg-[var(--sk-color-blue-50)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-color-blue-500)] sm:size-9"
            aria-label={`บันทึก ${post.title}`}
          >
            <Bookmark className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}
