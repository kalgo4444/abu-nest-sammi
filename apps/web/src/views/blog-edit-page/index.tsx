import { notFound } from "next/navigation";
import { EditForm } from "@/features/edit-post/ui/EditForm";
import { getPost } from "@/entities/blog/api";
import type { Blog } from "@/entities/blog/types";

export async function BlogEditPage({ id }: { id: string }) {
  let post: Blog | null = null;
  try {
    post = await getPost(id);
  } catch {
    post = null;
  }
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-[#9a3412] dark:bg-[#f97316]" />
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#9a3412] uppercase dark:text-[#f97316]">
          Revising
        </p>
      </div>

      <h1 className="font-serif mt-3 line-clamp-2 text-4xl leading-tight font-medium text-stone-900 md:text-5xl dark:text-stone-50">
        {post.title}
      </h1>

      <div className="glass-panel mt-8 p-6 md:p-8">
        <EditForm post={post} />
      </div>
    </div>
  );
}
