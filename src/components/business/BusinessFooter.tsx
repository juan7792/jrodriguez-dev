
import { getTranslations } from "next-intl/server";

import Container from "@/components/ui/Container";

export default async function BusinessFooter() {
  const t = await getTranslations("BusinessFooter");

  const email = "juanm.rodriguez.dev@gmail.com";
  const linkedin = "https://linkedin.com/in/j-rodriguez-lvv";

  return (
    <footer className="business-footer border-t py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="text-base font-semibold">
              Juan Rodriguez
            </p>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {t("tagline")}
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a
              href={`mailto:${email}`}
              className="font-medium transition-colors hover:text-emerald-500"
            >
              {t("email")}
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-emerald-500"
            >
              {t("linkedin")}
            </a>
          </div>
        </div>

        <div className="business-divider mt-8 border-t pt-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Juan Rodriguez.{" "}
            {t("rights")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
