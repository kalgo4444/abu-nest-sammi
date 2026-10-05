import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "ghost-danger";
type Size = "md" | "sm";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#1c1917] text-white hover:bg-[#9a3412] shadow-xs dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-[#f97316] dark:hover:text-white",
  secondary:
    "border border-stone-300/80 bg-white/50 text-stone-800 hover:border-stone-500 hover:text-stone-900 backdrop-blur-xs dark:border-stone-700/80 dark:bg-stone-900/50 dark:text-stone-200 dark:hover:border-stone-500 dark:hover:text-white",
  ghost:
    "text-stone-600 hover:text-stone-900 hover:bg-stone-900/5 dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-white/10",
  danger:
    "bg-[#9a3412] text-white hover:bg-[#7c2d12] shadow-xs dark:bg-[#ea580c] dark:hover:bg-[#c2410c]",
  "ghost-danger":
    "text-[#9a3412] hover:text-[#7c2d12] hover:bg-[#9a3412]/10 dark:text-[#f97316] dark:hover:text-[#ea580c] dark:hover:bg-[#f97316]/10",
};

const sizeStyles: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  sm: "h-9 px-4 text-[13px]",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 active:translate-y-px active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3412] dark:focus-visible:outline-[#f97316] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    />
  );
}
