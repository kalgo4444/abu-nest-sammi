"use client";

import { useTheme } from "@/shared/lib/theme";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div
        aria-hidden="true"
        className="size-9 rounded-full border border-stone-200/60 bg-transparent dark:border-stone-700/60"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="group relative inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-stone-200/80 bg-white/70 text-stone-700 shadow-sm backdrop-blur-md transition-all hover:border-stone-400 hover:bg-white hover:text-stone-900 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#9a3412] dark:border-stone-700/80 dark:bg-stone-800/70 dark:text-stone-300 dark:hover:border-stone-500 dark:hover:bg-stone-800 dark:hover:text-white dark:focus-visible:outline-[#f97316]"
    >
      {/* Sun Icon (shown in dark mode) */}
      <svg
        className={`size-4.5 transition-all duration-300 ${
          isDark
            ? "rotate-0 scale-100 text-amber-400 opacity-100"
            : "-rotate-90 scale-0 opacity-0 absolute"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>

      {/* Moon Icon (shown in light mode) */}
      <svg
        className={`size-4.5 transition-all duration-300 ${
          isDark
            ? "rotate-90 scale-0 opacity-0 absolute"
            : "rotate-0 scale-100 text-stone-700 opacity-100 group-hover:text-stone-900"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    </button>
  );
}
