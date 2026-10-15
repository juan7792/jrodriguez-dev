
"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const labels: Record<Locale, {
  business: string;
  technical: string;
}> = {
  en: { business: "Business", technical: "Technical" },
  es: { business: "Negocios", technical: "Técnico" },
  de: { business: "Business", technical: "Technisch" },
};

export default function AudienceTabs() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const active = pathname === "/technical"
    ? "technical"
    : "business";

  const items = [
    { key: "business" as const, href: "/business" as const },
    { key: "technical" as const, href: "/technical" as const },
  ];

  return (
    <div
      role="group"
      aria-label="Portfolio audience"
      className="grid w-full grid-cols-2 gap-1 rounded-xl
        border border-slate-200 bg-slate-100 p-1
        dark:border-slate-800 dark:bg-slate-900
        sm:w-[290px]"
    >
      {items.map(({ key, href }) => {
        const selected = active === key;

        return (
          <Link
            key={key}
            href={href}
            prefetch={!selected}
            aria-current={selected ? "page" : undefined}
            className={`
              rounded-lg px-4 py-2.5 text-center text-sm
              font-semibold transition-all duration-200
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-slate-500
              ${
                selected
                  ? "bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }
            `}
          >
            {labels[locale][key]}
          </Link>
        );
      })}
    </div>
  );
}
