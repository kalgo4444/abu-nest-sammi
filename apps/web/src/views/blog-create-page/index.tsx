import { CreateForm } from "@/features/create-post/ui/CreateForm";

export function BlogCreatePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-[#9a3412] dark:bg-[#f97316]" />
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#9a3412] uppercase dark:text-[#f97316]">
          New entry
        </p>
      </div>

      <h1 className="font-serif mt-3 text-4xl leading-tight font-medium text-stone-900 md:text-5xl dark:text-stone-50">
        Write it down
      </h1>

      <p className="mt-3 max-w-[55ch] text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">
        Title for the index, excerpt for the lede, entry for the full text.
        Publishing saves to{" "}
        <code className="rounded bg-stone-200/60 px-1.5 py-0.5 font-mono text-[13px] dark:bg-stone-800">
          POST /api/blog
        </code>
        .
      </p>

      <div className="glass-panel mt-8 p-6 md:p-8">
        <CreateForm />
      </div>
    </div>
  );
}
