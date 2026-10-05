import { notFound } from "next/navigation";
import { PostDetail } from "@/entities/blog/ui/PostDetail";
import { getPost } from "@/entities/blog/api";
import type { Blog } from "@/entities/blog/types";

export async function BlogDetailPage({ id }: { id: string }) {
  let post: Blog | null = null;
  try {
    post = await getPost(id);
  } catch {
    post = null;
  }
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <PostDetail post={post} />
    </article>
  );
}
