import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="glass-bar sticky top-0 z-30 border-b border-stone-200/70 transition-colors dark:border-stone-800/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 md:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-[#1c1917] font-serif text-sm text-white shadow-xs transition-transform group-hover:scale-105 dark:bg-stone-100 dark:text-[#1c1917]">
            A
          </span>
          <span className="font-serif text-lg font-medium tracking-tight text-stone-900 transition-colors group-hover:text-[#9a3412] dark:text-stone-100 dark:group-hover:text-[#f97316]">
            Abu Nest Journal
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-2.5">
          <Link
            href="/"
            className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-900/5 hover:text-stone-900 sm:block dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            Index
          </Link>
          <ThemeToggle />
          <Link href="/blog/new">
            <Button size="sm">New entry</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
