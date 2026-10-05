"use client";

import type { Blog } from "@/entities/blog/types";
import { EmptyState } from "@/entities/blog/ui/EmptyState";
import { PostCard } from "@/entities/blog/ui/PostCard";
import { SearchInput } from "@/features/search-posts/ui/SearchInput";
import { useMemo, useState } from "react";

export function PostGrid({ posts: initialPosts = [] }: { posts: Blog[] }) {
  const [query, setQuery] = useState("");
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());

  const posts = useMemo(
    () => initialPosts.filter((p) => !removedIds.has(p._id)),
    [initialPosts, removedIds],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q),
    );
  }, [posts, query]);

  function handleDeleted(id: string) {
    setRemovedIds((prev) => new Set(prev).add(id));
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] tracking-[0.2em] text-stone-500 uppercase dark:text-stone-400">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
          {query ? ` — filtered by “${query.trim()}”` : " in the collection"}
        </p>
        <div className="w-full sm:w-72">
          <SearchInput value={query} onChange={setQuery} />
        </div>
      </div>
      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <PostCard key={post._id} post={post} onDeleted={handleDeleted} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
