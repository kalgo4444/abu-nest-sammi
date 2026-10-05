import Link from "next/link";
import { Button } from "@/shared/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <p className="font-mono text-[11px] tracking-[0.2em] text-[#9a3412] uppercase">
        Missing entry
      </p>
      <h1 className="font-serif mt-3 text-4xl font-medium">No entry at this address</h1>
      <p className="mt-3 text-[15px] text-[#57534e]">
        It may have been deleted, or the id is wrong. Return to the index.
      </p>
      <div className="mt-6 flex justify-center">
        <Link href="/">
          <Button>Back to index</Button>
        </Link>
      </div>
    </div>
  );
}
