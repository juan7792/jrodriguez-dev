import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Footer from "@/components/sections/Footer";

const EMAIL = "juanm.rodriguez.dev@gmail.com";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Business");
  return {
    title: t("metaTitle"),
    description: t("intro"),
  };
}

export default async function BusinessPage() {
  const t = await getTranslations("Business");
  const mailtoHref =
    "mailto:" + EMAIL + "?subject=" + encodeURIComponent(t("contactSubject"));

  const services = [
    { title: t("services.automation.title"), description: t("services.automation.description") },
    { title: t("services.applications.title"), description: t("services.applications.description") },
    { title: t("services.analytics.title"), description: t("services.analytics.description") },
  ];

  return (
    <main id="top">
      <section className="mx-auto max-w-5xl px-4 pb-20 pt-24 sm:pb-28 sm:pt-32">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          {t("eyebrow")}
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
          {t("headline")}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {t("intro")}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={mailtoHref}
            className="inline-flex items-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-300"
          >
            {t("cta")}
          </a>
          <a
            href="#services"
            className="inline-flex items-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900"
          >
            {t("explore")}
          </a>
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-24 border-y border-slate-200 bg-slate-100/50 py-20 dark:border-slate-800 dark:bg-slate-900/20"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("servicesTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            {t("servicesIntro")}
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-xl border border-slate-200 bg-white/70 p-6 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="examples" className="scroll-mt-24 mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("examplesTitle")}
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300">
          {t("examplesDescription")}
        </p>
      </section>

      <section
        id="contact"
        className="scroll-mt-24 border-y border-slate-200 bg-slate-100/50 py-20 dark:border-slate-800 dark:bg-slate-900/20"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("contactTitle")}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300">
            {t("contactDescription")}
          </p>
          <a
            href={mailtoHref}
            className="mt-8 inline-flex items-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-300"
          >
            {t("cta")}
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
