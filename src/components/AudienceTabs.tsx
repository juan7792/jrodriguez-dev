"use client";

import { Link, usePathname } from "@/i18n/navigation";

export default function AudienceTabs() {
  const pathname = usePathname();
  const isTechnical = pathname.startsWith("/technical");

  const href = isTechnical ? "/business" : "/technical";

  const message = isTechnical
    ? "Looking for business solutions?"
    : "Looking for my technical profile?";

  const linkLabel = isTechnical
    ? "Explore my services →"
    : "View it →";

  return (
    <div
      className={`text-center text-xs ${
        isTechnical
          ? "text-slate-500 dark:text-slate-400"
          : "text-[#5B6B61]"
      }`}
    >
      <span>{message} </span>
      <Link
        href={href}
        className={`font-medium underline-offset-4 hover:underline ${
          isTechnical
            ? "text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white"
            : "text-[#287A60] hover:text-[#20664E]"
        }`}
      >
        {linkLabel}
      </Link>
    </div>
  );
}
