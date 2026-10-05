"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Button";
import { Field, Input, Textarea } from "@/shared/ui/Field";
import { getApiErrorMessage } from "@/shared/lib/api-client";
import type { CreateBlogInput } from "@/entities/blog/types";

interface Props {
  initial?: CreateBlogInput;
  submitLabel: string;
  onSubmit: (input: CreateBlogInput) => Promise<void>;
}

export function PostForm({ initial, submitLabel, onSubmit }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [errors, setErrors] = useState<{ title?: string; excerpt?: string; description?: string }>({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  function validate(): boolean {
    const next: typeof errors = {};
    if (title.trim().length < 3) next.title = "Title needs at least 3 characters.";
    if (title.trim().length > 140) next.title = "Keep the title under 140 characters.";
    if (excerpt.trim().length < 10) next.excerpt = "Excerpt needs at least 10 characters.";
    if (excerpt.trim().length > 300) next.excerpt = "Keep the excerpt under 300 characters.";
    if (description.trim().length < 20) next.description = "Entry needs at least 20 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        excerpt: excerpt.trim(),
        description: description.trim(),
      });
    } catch (err) {
      setServerError(getApiErrorMessage(err));
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <Field label="Title" error={errors.title} hint={`${title.trim().length}/140`}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A quiet headline for the entry"
          maxLength={140}
          aria-invalid={Boolean(errors.title)}
        />
      </Field>
      <Field label="Excerpt" error={errors.excerpt} hint={`${excerpt.trim().length}/300 — one lede sentence`}>
        <Textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Single paragraph that earns the read"
          rows={3}
          maxLength={300}
          aria-invalid={Boolean(errors.excerpt)}
        />
      </Field>
      <Field label="Entry" error={errors.description} hint="Full text, paragraphs preserved">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write the entry…"
          rows={10}
          aria-invalid={Boolean(errors.description)}
        />
      </Field>
      {serverError && (
        <p
          role="alert"
          className="rounded-[12px] border border-[#9a3412]/30 bg-[#9a3412]/5 px-4 py-3 text-sm font-medium text-[#9a3412] dark:border-[#f97316]/30 dark:bg-[#f97316]/10 dark:text-[#f97316]"
        >
          {serverError}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : submitLabel}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={saving}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
