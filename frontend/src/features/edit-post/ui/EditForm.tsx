"use client";

import { useRouter } from "next/navigation";
import { PostForm } from "@/features/post-form/ui/PostForm";
import { updatePost } from "@/entities/blog/api";
import type { Blog } from "@/entities/blog/types";

export function EditForm({ post }: { post: Blog }) {
  const router = useRouter();
  return (
    <PostForm
      initial={{ title: post.title, excerpt: post.excerpt, description: post.description }}
      submitLabel="Save changes"
      onSubmit={async (input) => {
        await updatePost(post._id, input);
        router.push(`/blog/${post._id}`);
      }}
    />
  );
}
