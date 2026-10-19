
import { getTranslations } from "next-intl/server";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

export default async function BusinessContact() {
  const t = await getTranslations("BusinessContact");

  const email = "juanm.rodriguez.dev@gmail.com";
  const linkedin = "https://linkedin.com/in/j-rodriguez-lvv";

  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
    t("emailSubject")
  )}`;

  return (
    <Section
      id="contact"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <Card hover={false} className="business-card p-6 sm:p-8">
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-xl font-semibold">
              {t("cardTitle")}
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed business-text-muted">
              {t("description")}
            </p>
          </div>

          <div>
            <a
              href={mailtoHref}
              className="business-button inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-medium transition-colors"
            >
              {t("cta")}
            </a>
          </div>

          <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
            <p className="text-sm business-text-muted">
              {t("linkedinText")}{" "}
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
              >
                {t("linkedinCta")}
              </a>
            </p>
          </div>
        </div>
      </Card>
    </Section>
  );
}
