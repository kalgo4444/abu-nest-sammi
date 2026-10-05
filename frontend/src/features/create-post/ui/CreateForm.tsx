"use client";

import { useRouter } from "next/navigation";
import { PostForm } from "@/features/post-form/ui/PostForm";
import { createPost } from "@/entities/blog/api";

export function CreateForm() {
  const router = useRouter();
  return (
    <PostForm
      submitLabel="Publish entry"
      onSubmit={async (input) => {
        const created = await createPost(input);
        router.push(`/blog/${created._id}`);
      }}
    />
  );
}
