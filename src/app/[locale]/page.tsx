import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LegacyAnchorRedirect from "@/components/LegacyAnchorRedirect";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Audience");
  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default async function AudiencePage() {
  const t = await getTranslations("Audience");

  return (
    <main id="top" className="flex min-h-[calc(100svh-5rem)] items-center">
      <LegacyAnchorRedirect />
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/technical"
            className="group flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white/70 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-600 sm:p-9"
          >
            <span className="font-mono text-xs text-slate-400">01 / TECH</span>
            <h2 className="mt-10 text-2xl font-semibold tracking-tight">
              {t("technical.title")}
            </h2>
            <p className="mt-3 max-w-sm flex-1 leading-relaxed text-slate-600 dark:text-slate-300">
              {t("technical.description")}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3">
              {t("technical.cta")} <span aria-hidden="true">→</span>
            </span>
          </Link>

          <Link
            href="/business"
            className="group flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white/70 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-600 sm:p-9"
          >
            <span className="font-mono text-xs text-slate-400">02 / BUSINESS</span>
            <h2 className="mt-10 text-2xl font-semibold tracking-tight">
              {t("business.title")}
            </h2>
            <p className="mt-3 max-w-sm flex-1 leading-relaxed text-slate-600 dark:text-slate-300">
              {t("business.description")}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3">
              {t("business.cta")} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          {t("hint")}
        </p>
      </div>
    </main>
  );
}
