
import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";

export default async function BusinessHero() {
  const t = await getTranslations("BusinessHero");

  const email = "juanm.rodriguez.dev@gmail.com";

  const mailtoHref =
    `mailto:${email}?subject=${encodeURIComponent(
      t("emailSubject")
    )}`;

  return (
    <Section className="pt-24 sm:pt-28">
      <div className="max-w-3xl">
        <p className="business-text-muted mb-5 text-xs uppercase tracking-[0.22em]">
          {t("eyebrow")}
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {t("headline")}
        </h1>

        <p className="business-text-muted mt-6 text-base leading-relaxed sm:text-lg">
          {t("description")}
        </p>

        <div className="mt-8">
          <a
            href={mailtoHref}
            className="business-button inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
          >
            {t("cta")}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </Section>
  );
}
