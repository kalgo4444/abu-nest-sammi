// Root loading state covers every route (index, detail, forms), so keep it
// neutral instead of showing the index card grid on form pages.
export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl py-16" aria-busy="true" aria-live="polite">
      <div className="glass-panel animate-pulse px-8 py-12 text-center">
        <div className="mx-auto h-3 w-32 rounded-full bg-[#1c1917]/10" />
        <div className="mx-auto mt-4 h-6 w-2/3 rounded-md bg-[#1c1917]/10" />
        <div className="mx-auto mt-2 h-4 w-1/2 rounded-md bg-[#1c1917]/8" />
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
