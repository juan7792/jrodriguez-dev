"use client";

import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import CardBackground from "@/components/ui/CardBackground";

// Key definitions for translation and background mapping
type LifeKey = "movement" | "games" | "psychology" | "cooking" | "travel";
type LifeItem = { key: LifeKey; bg: string };

/**
 * Individual card representing a hobby or interest
 * Uses CardBackground for themed overlays
 */
function LifeCard({ item }: { item: LifeItem }) {
  const t = useTranslations("Life");

  return (
    <Card className="relative overflow-hidden p-5 sm:p-6">
      <CardBackground
        src={item.bg}
        opacityLight={0.25}
        opacityDark={0.45}
        blur="none"
      />
      <div className="relative">
        <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {t(`${item.key}.title`)}
        </h3>

        {/* Primary description paragraph */}
        <p className="mt-3 text-sm leading-normal text-slate-800 dark:text-slate-300">
          {t(`${item.key}.p1`)}
        </p>

        {/* Secondary/additional detail paragraph */}
        <p className="mt-3 text-sm leading-normal text-slate-600 dark:text-slate-400">
          {t(`${item.key}.p2`)}
        </p>
      </div>
    </Card>
  );
}

export default function Life() {
  const t = useTranslations("Life");

  // Configuration for life items - path to assets
  const items: LifeItem[] = [
    { key: "psychology", bg: "/images/life/psychology.webp" },
    { key: "movement", bg: "/images/life/movement.webp" },
    { key: "travel", bg: "/images/life/travel.webp" },
    { key: "games", bg: "/images/life/games.webp" },
    { key: "cooking", bg: "/images/life/cooking.webp" },
  ];

  // Logic to split items for the custom 3+2 grid layout
  const topRow = items.slice(0, 3);
  const bottomRow = items.slice(3);

  return (
    <Section
      id="life"
      title={t("title")}
      subtitle={t("subtitle")}
      className="pt-8"
    >
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
        {t("eyebrow")}
      </p>

      <div className="space-y-4">
        {/* Row 1: Displays 3 cards on large screens */}
        <div className="grid gap-4 lg:grid-cols-3">
          {topRow.map((item) => (
            <LifeCard key={item.key} item={item} />
          ))}
        </div>

        {/* Row 2: Displays 2 centered cards on large screens */}
        <div className="flex justify-center">
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-[calc(100%-33.333%)]">
            {bottomRow.map((item) => (
              <LifeCard key={item.key} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
