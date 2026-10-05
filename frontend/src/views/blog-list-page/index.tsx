import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { PostGrid } from "@/widgets/post-grid";
import { Journal3DCanvas } from "@/widgets/hero-3d";
import { listPosts } from "@/entities/blog/api";
import { getApiErrorMessage } from "@/shared/lib/api-client";

export async function BlogListPage() {
  let posts: Awaited<ReturnType<typeof listPosts>> = [];
  let error = "";

  try {
    posts = await listPosts();
  } catch (err) {
    error = getApiErrorMessage(err);
  }

  return (
    <div className="space-y-12">
      <section className="grid items-center gap-10 pb-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#9a3412] dark:bg-[#f97316]" />
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#9a3412] uppercase dark:text-[#f97316]">
              A running notebook • Nest API
            </p>
          </div>

          <h1 className="font-serif mt-4 text-4xl leading-[1.08] font-medium tracking-tight text-balance text-stone-900 sm:text-5xl lg:text-[58px] dark:text-stone-50">
            Notes kept slowly, read in full.
          </h1>

          <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-stone-600 sm:text-base dark:text-stone-300">
            Short excerpts on the index, full entries inside. Create, revise, and
            prune — every entry is stored through the NestJS backend and indexed in real time.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/blog/new">
              <Button size="md">Write new entry</Button>
            </Link>
            <a
              href="#posts-index"
              className="inline-flex h-10 items-center justify-center rounded-full border border-stone-200/80 bg-white/40 px-5 text-sm font-medium text-stone-700 shadow-2xs backdrop-blur-xs transition-colors hover:border-stone-400 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-900/40 dark:text-stone-300 dark:hover:border-stone-700 dark:hover:text-white"
            >
              Browse entries
            </a>
          </div>
        </div>

        {/* Signature 3D Interactive Element */}
        <div className="flex justify-center lg:justify-end">
          <Journal3DCanvas />
        </div>
      </section>

      <div id="posts-index" className="pt-2">
        {error ? (
          <div className="rounded-2xl border border-[#9a3412]/30 bg-[#9a3412]/5 px-6 py-12 text-center backdrop-blur-md dark:border-[#f97316]/30 dark:bg-[#f97316]/10">
            <p className="font-serif text-2xl text-stone-900 dark:text-stone-100">
              The index did not load
            </p>
            <p className="mx-auto mt-2 max-w-[50ch] text-sm text-stone-600 dark:text-stone-400">
              {error}
            </p>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
              Start the backend with{" "}
              <code className="rounded bg-stone-200/60 px-1.5 py-0.5 font-mono text-[13px] dark:bg-stone-800">
                npm run start:dev
              </code>{" "}
              on port 4000, then reload.
            </p>
          </div>
        ) : (
          <PostGrid posts={posts} />
        )}
      </div>
    </div>
  );
}
