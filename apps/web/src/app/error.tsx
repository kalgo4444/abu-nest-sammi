"use client";

import { Button } from "@/shared/ui/Button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="rounded-2xl border border-[#9a3412]/30 bg-[#9a3412]/5 px-8 py-14 text-center">
      <p className="font-serif text-2xl">This page failed to load</p>
      <p className="mx-auto mt-2 max-w-[45ch] text-sm text-[#57534e]">
        The API may be down. Check that the backend runs on port 4000, then try again.
      </p>
      <div className="mt-6">
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
