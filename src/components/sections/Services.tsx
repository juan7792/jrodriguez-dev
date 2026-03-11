"use client";

import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import CardBackground from "@/components/ui/CardBackground";

type ServiceKey = "fullstack" | "backend" | "data";

export default function Services() {
  const t = useTranslations("Services");

  // Configuration for service cards and their respective assets
  const items: { key: ServiceKey; bg: string }[] = [
    { key: "data", bg: "/images/services/data.webp" },
    { key: "backend", bg: "/images/services/backend.webp" },
    { key: "fullstack", bg: "/images/services/fullstack.webp" },
  ];

  return (
    <Section
      id="services"
      title={t("title")}
      subtitle={t("subtitle")}
      className="py-16 bg-slate-100/50 dark:bg-slate-900/20 border-t border-b border-slate-200/60 dark:border-white/5"
    >
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
        {t("eyebrow")}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ key, bg }) => (
          <Card key={key} className="relative overflow-hidden p-6">
            <CardBackground
              src={bg}
              blur="none"
              opacityLight={0.2}
              opacityDark={0.45}
            />

            <div className="relative">
              <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {t(`${key}.title`)}
              </h3>

              <p className="mt-3 text-sm leading-normal text-slate-800 dark:text-slate-300">
                {t(`${key}.description`)}
              </p>

              <ul className="mt-4 space-y-1.5 text-sm leading-normal text-slate-600 dark:text-slate-400">
                {/* Dynamically rendering bullet points from translation raw arrays */}
                {(t.raw(`${key}.bullets`) as string[]).map((bullet, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500 dark:bg-slate-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
