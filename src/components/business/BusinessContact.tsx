
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
      <Card hover={false} className="p-6 sm:p-8">
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-xl font-semibold">
              {t("cardTitle")}
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {t("description")}
            </p>
          </div>

          <div>
            <a
              href={mailtoHref}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {t("cta")}
            </a>
          </div>

          <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-300">
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
