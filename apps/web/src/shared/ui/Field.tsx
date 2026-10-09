import {
  cloneElement,
  isValidElement,
  useId,
  type InputHTMLAttributes,
  type ReactElement,
  type TextareaHTMLAttributes,
} from "react";

const base =
  "w-full rounded-[12px] border border-stone-300/80 bg-white/80 px-3.5 py-2.5 text-[15px] text-stone-900 placeholder:text-stone-400 backdrop-blur-xs transition-colors focus:border-[#9a3412] focus:outline-2 focus:outline-[#9a3412]/30 dark:border-stone-700/80 dark:bg-stone-900/80 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-[#f97316] dark:focus:outline-[#f97316]/30";

type ControlProps = {
  id?: string;
  "aria-describedby"?: string;
};

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<ControlProps>, {
        id,
        ...(describedBy ? { "aria-describedby": describedBy } : {}),
      })
    : children;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-stone-900 dark:text-stone-200">
        {label}
      </label>
      {control}
      {hint && !error && (
        <p id={hintId} className="text-[13px] text-stone-500 dark:text-stone-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-[13px] font-medium text-[#9a3412] dark:text-[#f97316]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${base} h-11 ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${base} min-h-28 leading-relaxed ${props.className ?? ""}`}
    />
  );
}
