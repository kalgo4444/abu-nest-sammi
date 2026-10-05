export function PostSkeleton() {
  return (
    <div aria-hidden className="glass-card flex flex-col p-6">
      <div className="h-3 w-20 animate-pulse rounded-full bg-stone-300/60 dark:bg-stone-700/50" />
      <div className="mt-4 h-6 w-3/4 animate-pulse rounded-md bg-stone-300/60 dark:bg-stone-700/50" />
      <div className="mt-3 h-4 w-full animate-pulse rounded-md bg-stone-200/70 dark:bg-stone-800/60" />
      <div className="mt-2 h-4 w-2/3 animate-pulse rounded-md bg-stone-200/70 dark:bg-stone-800/60" />
      <div className="mt-6 flex gap-2 border-t border-stone-200/80 pt-4 dark:border-stone-800/80">
        <div className="h-9 w-20 animate-pulse rounded-full bg-stone-300/60 dark:bg-stone-700/50" />
        <div className="h-9 w-20 animate-pulse rounded-full bg-stone-200/70 dark:bg-stone-800/60" />
      </div>
    </div>
  );
}

export function PostListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}
