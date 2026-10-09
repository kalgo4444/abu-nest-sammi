import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { DeleteButton } from "@/features/delete-post/ui/DeleteButton";
import type { Blog } from "../types";

export function PostDetail({ post }: { post: Blog }) {
  const shortId = (post._id ?? "").slice(-6).toUpperCase() || "—";
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-[#9a3412] dark:bg-[#f97316]" />
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#9a3412] uppercase dark:text-[#f97316]">
          Entry — No. {shortId}
        </p>
      </div>

      <h1 className="font-serif mt-4 max-w-[22ch] text-4xl leading-[1.08] font-medium text-balance text-stone-900 md:text-5xl lg:text-6xl dark:text-stone-50">
        {post.title}
      </h1>

      <p className="font-serif mt-5 max-w-[62ch] border-l-2 border-[#9a3412] pl-5 text-lg leading-relaxed text-stone-600 italic dark:border-[#f97316] dark:text-stone-300">
        {post.excerpt}
      </p>

      <div className="glass-panel mt-7 flex flex-wrap items-center gap-3 px-5 py-3.5">
        <Link href={`/blog/${post._id}/edit`}>
          <Button variant="secondary" size="sm">
            Edit entry
          </Button>
        </Link>
        <DeleteButton id={post._id} title={post.title} redirectTo="/" />
        <Link
          href="/"
          className="ml-auto self-center text-sm font-medium text-stone-600 underline underline-offset-4 transition-colors hover:text-[#9a3412] dark:text-stone-400 dark:hover:text-[#f97316]"
        >
          ← Back to index
        </Link>
      </div>

      <div className="prose-blog mt-10 max-w-[68ch] text-[17px] leading-[1.8] whitespace-pre-wrap text-stone-800 dark:text-stone-200">
        {post.description}
      </div>
    </div>
  );
}
