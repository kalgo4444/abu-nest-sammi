"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Button";
import { deletePost } from "@/entities/blog/api";
import { getApiErrorMessage } from "@/shared/lib/api-client";

export function DeleteButton({
  id,
  title,
  redirectTo,
  compact = false,
  onDeleted,
}: {
  id: string;
  title: string;
  redirectTo?: string;
  compact?: boolean;
  onDeleted?: (id: string) => void;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setBusy(true);
    setError("");
    try {
      await deletePost(id);
      onDeleted?.(id);
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
    } catch (err) {
      setError(getApiErrorMessage(err));
      setBusy(false);
      setConfirming(false);
    }
  }

  if (!confirming) {
    return (
      <span className="inline-flex flex-col items-end gap-1">
        <Button
          variant="ghost-danger"
          size={compact ? "sm" : "md"}
          onClick={() => setConfirming(true)}
        >
          Delete
        </Button>
        {error && (
          <span role="alert" className="text-xs text-[#9a3412] dark:text-[#f97316]">
            {error}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className="inline-flex flex-wrap items-center justify-end gap-2">
      <span
        className="max-w-40 truncate text-[13px] text-stone-600 dark:text-stone-300"
        title={title}
      >
        Delete?
      </span>
      <Button variant="danger" size="sm" onClick={handleDelete} disabled={busy}>
        {busy ? "Deleting…" : "Confirm"}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setConfirming(false)}
        disabled={busy}
      >
        Keep
      </Button>
    </span>
  );
}
