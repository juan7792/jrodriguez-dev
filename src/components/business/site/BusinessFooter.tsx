import { getTranslations } from "next-intl/server";

import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

export default async function BusinessFooter() {
  const t = await getTranslations("BusinessFooter");

  const email = "juanm.rodriguez.dev@gmail.com";
  const linkedin = "https://linkedin.com/in/j-rodriguez-lvv";

  return (
    <footer className="business-footer border-t py-6">
      <Container>
        <div className="flex flex-col items-center gap-2 text-center">
          {/* Name and tagline */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-base font-semibold text-[#20362F]">
              Juan Rodriguez
            </p>

            <p className="business-text-muted text-sm">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2 text-sm">
            <a
              href={`mailto:${email}`}
              className="font-medium text-[#287A60] transition-colors hover:text-[#20664E]"
            >
              {t("email")}
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#287A60] transition-colors hover:text-[#20664E]"
            >
              {t("linkedin")}
            </a>

            <Link
              href="/technical"
              className="font-medium text-[#287A60] transition-colors hover:text-[#20664E]"
            >
              Technical Portfolio ↗
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="business-divider mt-4 border-t pt-4">
          <p className="business-text-muted text-center text-xs">
            © {new Date().getFullYear()} Juan Rodriguez. {t("rights")}
          </p>
        </div>
      </Container>
    </footer>
  );
}