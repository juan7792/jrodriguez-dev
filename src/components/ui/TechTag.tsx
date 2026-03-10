"use client";

import Image from "next/image";

type TechTagSize = "sm" | "md";

type TechTagProps = {
  label: string;
  short?: string;
  iconSrc?: string;
  iconLight?: string;
  iconDark?: string;
  iconAlt?: string;
  className?: string;
  size?: TechTagSize;
};

export default function TechTag({
  label,
  short,
  iconSrc,
  iconLight,
  iconDark,
  iconAlt,
  className,
  size = "md",
}: TechTagProps) {
  const isSm = size === "sm";

  const base = [
    "inline-flex items-center rounded-full border",
    "border-slate-200 bg-white/50",
    "dark:border-slate-800 dark:bg-slate-950/40",
  ].join(" ");

  const sizing = isSm
    ? "gap-1.5 px-2 py-1 text-xs"
    : "gap-2 px-3 py-1.5 text-sm";

  const iconWrap = isSm
    ? "inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900"
    : "inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900";

  const iconSize = isSm ? 18 : 22;

  return (
    <span className={[base, sizing, className ?? ""].join(" ")}>
      {(iconSrc || iconLight || short) && (
        <span className={iconWrap}>
          {iconLight && iconDark ? (
            <>
              <Image
                src={iconLight}
                alt={iconAlt ?? `${label} icon`}
                width={iconSize}
                height={iconSize}
                className="block dark:hidden object-contain"
              />
              <Image
                src={iconDark}
                alt={iconAlt ?? `${label} icon`}
                width={iconSize}
                height={iconSize}
                className="hidden dark:block object-contain"
              />
            </>
          ) : iconSrc ? (
            <Image
              src={iconSrc}
              alt={iconAlt ?? `${label} icon`}
              width={iconSize}
              height={iconSize}
              className="block object-contain"
            />
          ) : (
            <span className="text-[10px] font-medium text-slate-700 dark:text-slate-200">
              {short}
            </span>
          )}
        </span>
      )}

      <span className="text-slate-900 dark:text-slate-100">{label}</span>
    </span>
  );
}
