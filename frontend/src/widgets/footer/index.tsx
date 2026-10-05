export function Footer() {
  return (
    <footer className="border-t border-stone-200/80 transition-colors dark:border-stone-800/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 font-mono text-[11px] tracking-[0.16em] text-stone-500 uppercase sm:flex-row sm:justify-between dark:text-stone-400">
        <span>Abu Nest Journal — Vol. 01</span>
        <span>Stored via NestJS API (/api/blog)</span>
      </div>
    </footer>
  );
}
