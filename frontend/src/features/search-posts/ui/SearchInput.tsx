"use client";

import { Input } from "@/shared/ui/Field";

export function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search the index…"
        aria-label="Search posts"
        className="glass-input h-11 rounded-full pr-10 pl-5 text-sm"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full px-2 text-sm text-stone-500 transition-colors hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-[#9a3412] dark:text-stone-400 dark:hover:text-stone-100 dark:focus-visible:outline-[#f97316]"
        >
          ✕
        </button>
      )}
    </div>
  );
}
