"use client";

import Image from "next/image";

/**
 * Visual background layer for cards.
 * Handles theme-specific opacities by rendering two separate image layers.
 */
type BlurLevel = "none" | "xs" | "sm" | "md" | "lg" | "xl";

type CardBackgroundProps = {
  src: string;

  /** Opacity used for both themes (kept for backwards compatibility). */

  opacity?: number;
  /** Opacity used when the page is in light mode. */
  opacityLight?: number;
  /** Opacity used when the page is in dark mode. */
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
  // Determine final opacities for theme switching

  const lightOpacity = opacityLight ?? opacity;
  const darkOpacity = opacityDark ?? opacity;

  // Shared image processing classes
  const imageClassName = [
    "object-cover",
    BLUR_MAP[blur],
    "scale-[1.03]",
    // Light mode: adjusted for visibility against white backgrounds
    "brightness-[0.98] contrast-[0.98] saturate-[0.85]",
    // Dark mode: vivid colors and higher contrast
    "dark:brightness-100 dark:contrast-100 dark:saturate-100",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Light layer - Visible only in light mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block dark:hidden"
        style={{ opacity: lightOpacity }}
      >
        <Image src={src} alt="" fill className={imageClassName} />
      </div>

      {/* Dark layer - Visible only in dark mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{ opacity: darkOpacity }}
      >
        <Image src={src} alt="" fill className={imageClassName} />
      </div>

      {/* Optional gradient overlay for text readability */}
      {overlay && (
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-0 bg-gradient-to-br",
            "from-white/55 via-white/45 to-white/35",
            "dark:from-slate-950/70 dark:via-slate-950/45 dark:to-slate-950/10",
          ].join(" ")}
        />
      )}
    </>
  );
}
