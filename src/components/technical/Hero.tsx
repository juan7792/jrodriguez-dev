"use client";

import { useLocale, useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function Hero() {
  const t = useTranslations("Hero");
  const tContact = useTranslations("Contact");
  const locale = useLocale();

  const email = "juanm.rodriguez.dev@gmail.com";
  const mailtoSubject = tContact("message.email.subject");
  const mailtoBody = tContact("message.email.body");

  // Construct mailto link with encoded localization strings
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
    mailtoSubject,
  )}&body=${encodeURIComponent(mailtoBody)}`;

  // Handle locale formatting (e.g., "en-US" -> "en")
  const lang = locale.split("-")[0];

  // Resolve CV file path based on active language
  const cvHref =
    lang === "es"
      ? "/pdf/CV-Juan-Rodriguez-ES.pdf"
      : lang === "de"
        ? "/pdf/CV-Juan-Rodriguez-DE.pdf"
        : "/pdf/CV-Juan-Rodriguez-EN.pdf";

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
          <a href={mailtoHref} target="_blank" rel="noopener noreferrer">
            <Button className="cursor-pointer">{t("ctaPrimary")}</Button>
          </a>

          <a href={cvHref} target="_blank" rel="noopener noreferrer">
            <Button className="cursor-pointer" variant="secondary">
              {t("ctaSecondary")}
            </Button>
          </a>
        </div>

        <div className="mt-10 text-xs opacity-60">{t("footer")}</div>
      </div>
    </Section>
  );
}
