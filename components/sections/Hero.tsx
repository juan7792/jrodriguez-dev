"use client";

import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <Section className="pt-24 sm:pt-28">
      <div className="max-w-3xl">
        <p className="mb-5 text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          {t("eyebrow")}
        </p>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">
          {t("headline")}
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          {t("subheadline")}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {t("paragraph")}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="rounded-full border px-4 py-1.5 text-xs sm:text-sm">
            {t("availability")}
          </span>
        </div>

        <div className="mt-8 flex gap-3">
          <Button>{t("ctaPrimary")}</Button>
          <Button variant="secondary">{t("ctaSecondary")}</Button>
        </div>

        <div className="mt-10 text-xs opacity-60">{t("footer")}</div>
      </div>
    </Section>
  );
}
