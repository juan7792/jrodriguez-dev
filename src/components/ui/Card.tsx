import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export default function Card({
  className = "",
  hover = true,
  ...props
}: CardProps) {
  const base =
    "relative rounded-xl border bg-white/60 dark:bg-slate-950/40 " +
    "border-slate-200/60 dark:border-slate-800/70 " +
    "supports-[backdrop-filter]:backdrop-blur " +
    // Sombra base (cambia con el tema)
    "shadow-[0_0_0_rgba(0,0,0,0)] " +
    "dark:shadow-[0_0_0_rgba(0,0,0,0)]";
  const interactive = hover
    ? [
        "transform-gpu will-change-transform",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-[4px]",
        "hover:border-sky-400/45 dark:hover:border-sky-400/35",
        "hover:shadow-[0_0_0_1px_rgba(56,189,248,0.16),0_18px_55px_rgba(15,23,42,0.14)]",
        "dark:hover:shadow-[0_0_0_1px_rgba(56,189,248,0.18),0_22px_70px_rgba(0,0,0,0.55)]",
      ].join(" ")
    : "";

  return (
    <div className={[base, interactive, className].join(" ")} {...props} />
  );
}
