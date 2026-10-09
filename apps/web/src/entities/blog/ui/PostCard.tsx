import Link from "next/link";
import { DeleteButton } from "@/features/delete-post/ui/DeleteButton";
import type { Blog } from "../types";

export function PostCard({ post, onDeleted }: { post: Blog; onDeleted?: (id: string) => void }) {
  const shortId = (post._id ?? "").slice(-6).toUpperCase() || "—";
  return (
    <article className="glass-card group flex flex-col p-6 transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[#9a3412] uppercase dark:text-[#f97316]">
          No. {shortId}
        </p>
        <span className="size-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
      </div>

      <Link href={`/blog/${post._id}`} className="mt-3 block">
        <h2 className="font-serif line-clamp-2 text-[22px] leading-snug font-medium text-balance text-stone-900 transition-colors group-hover:text-[#9a3412] dark:text-stone-100 dark:group-hover:text-[#f97316]">
          {post.title}
        </h2>
      </Link>

      <p className="mt-2.5 line-clamp-2 text-[14px] leading-relaxed text-stone-600 dark:text-stone-300">
        {post.excerpt}
      </p>

      <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-stone-500 dark:text-stone-400">
        {post.description}
      </p>

      <div className="mt-6 flex items-center gap-2 border-t border-stone-200/80 pt-4 dark:border-stone-800/80">
        <Link
          href={`/blog/${post._id}`}
          className="inline-flex h-9 items-center justify-center rounded-full bg-stone-900 px-4 text-[13px] font-medium text-white shadow-2xs transition-colors hover:bg-[#9a3412] dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-[#f97316] dark:hover:text-white"
        >
          Read
        </Link>
        <Link
          href={`/blog/${post._id}/edit`}
          className="inline-flex h-9 items-center justify-center rounded-full border border-stone-300/80 bg-white/40 px-4 text-[13px] font-medium text-stone-800 transition-colors hover:border-stone-500 hover:text-stone-900 dark:border-stone-700/80 dark:bg-stone-900/40 dark:text-stone-200 dark:hover:border-stone-500 dark:hover:text-white"
        >
          Update
        </Link>
        <span className="ml-auto">
          <DeleteButton id={post._id} title={post.title} compact onDeleted={onDeleted} />
        </span>
      </div>
    </article>
  );
}
