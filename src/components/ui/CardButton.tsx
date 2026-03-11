import React from "react";

/**
 * Interactive version of the Card component.
 * Renders as a button and includes a subtle radial gradient on hover
 * to indicate clickability.
 */
type CardButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  hover?: boolean;
};

export default function CardButton({
  className = "",
  hover = true,
  ...props
}: CardButtonProps) {
  // Base structural and visual styles
  const base = [
    "group relative text-left rounded-xl border bg-white/60 dark:bg-slate-950/40",
    "border-slate-200/60 dark:border-slate-800/70",
    "supports-[backdrop-filter]:backdrop-blur",
    "shadow-[0_0_0_rgba(0,0,0,0)] dark:shadow-[0_0_0_rgba(0,0,0,0)]",
  ].join(" ");

  // Hover animations and specific radial highlight
  const interactive = hover
    ? [
        "transform-gpu will-change-transform",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-[4px]",
        "hover:border-sky-400/45 dark:hover:border-sky-400/35",
        "hover:shadow-[0_0_0_1px_rgba(56,189,248,0.16),0_18px_55px_rgba(15,23,42,0.14)]",
        "hover:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_65%)]",
      ].join(" ")
    : "";

  return (
    <button
      className={[base, interactive, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
