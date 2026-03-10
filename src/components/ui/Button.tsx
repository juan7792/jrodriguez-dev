import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium " +
    "border transition-colors focus:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-slate-400/50 disabled:opacity-50 disabled:pointer-events-none";

  const sizes: Record<Size, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-slate-900 text-white border-slate-900 hover:bg-slate-800 " +
      "dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100 dark:hover:bg-slate-200",
    secondary:
      "bg-white text-slate-900 border-slate-200 hover:bg-slate-50 " +
      "dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 dark:hover:bg-slate-800",
    ghost:
      "bg-transparent text-slate-900 border-transparent hover:bg-slate-100 " +
      "dark:text-slate-100 dark:hover:bg-slate-900",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
