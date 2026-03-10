"use client";

import Image from "next/image";

type BlurLevel = "none" | "xs" | "sm" | "md" | "lg" | "xl";

type CardBackgroundProps = {
  src: string;
  /**
   * Opacity used for both themes (kept for backwards compatibility).
   * Prefer `opacityLight` / `opacityDark` when you want different values.
   */
  opacity?: number;
  /** Opacity when the page is in light mode. */
  opacityLight?: number;
  /** Opacity when the page is in dark mode. */
  opacityDark?: number;
  blur?: BlurLevel;
  overlay?: boolean;
  className?: string;
};

const BLUR_MAP: Record<BlurLevel, string> = {
  none: "",
  xs: "blur-[1px]",
  sm: "blur-[2px]",
  md: "blur-[4px]",
  lg: "blur-[6px]",
  xl: "blur-[10px]",
};

export default function CardBackground({
  src,
  opacity = 0.12,
  opacityLight,
  opacityDark,
  blur = "sm",
  overlay = true,
  className = "",
}: CardBackgroundProps) {
  // Tailwind can't theme-switch an inline `style={{ opacity }}` with `dark:`.
  // So we render two layers and fade the correct one in/out via classes.
  const lightOpacity = opacityLight ?? opacity;
  const darkOpacity = opacityDark ?? opacity;

  const imageClassName = [
    "object-cover",
    BLUR_MAP[blur],
    "scale-[1.03]",
    // Light mode: less washed-out
    "brightness-[0.98] contrast-[0.98] saturate-[0.85]",
    // Dark mode: keep vivid
    "dark:brightness-100 dark:contrast-100 dark:saturate-100",
  ].join(" ");

  return (
    <>
      {/* Light layer (solo light mode) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block dark:hidden"
        style={{ opacity: lightOpacity }}
      >
        <Image src={src} alt="" fill className={imageClassName} />
      </div>

      {/* Dark layer (solo dark mode) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{ opacity: darkOpacity }}
      >
        <Image src={src} alt="" fill className={imageClassName} />
      </div>

      {overlay && (
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-br
            from-white/55 via-white/45 to-white/35
            dark:from-slate-950/70 dark:via-slate-950/45 dark:to-slate-950/10
          "
        />
      )}
    </>
  );
}
