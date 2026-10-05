import Link from "next/link";
import { Button } from "@/shared/ui/Button";

export function EmptyState({ query }: { query: string }) {
  const isFiltered = query.trim().length > 0;
  return (
    <div
      className="glass-panel px-8 py-16 text-center transition-colors"
      style={{ borderStyle: "dashed" }}
    >
      <p className="font-serif text-2xl text-stone-900 dark:text-stone-100">
        The index is empty
      </p>
      <p className="mx-auto mt-2 max-w-[45ch] text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">
        {isFiltered
          ? `Nothing matches “${query}”. Clear the search or write a new entry.`
          : "No entries yet. Write the first one to open the collection."}
      </p>
      <div className="mt-6 flex justify-center">
        <Link href="/blog/new">
          <Button size="md">Write first entry</Button>
        </Link>
      </div>
    </div>
  );
}
