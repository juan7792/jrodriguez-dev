import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function DemoFooter() {
  const t = await getTranslations("BusinessAutomationDemo");

  return (
    <footer className="business-footer border-t py-4">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 text-xs">
        <p className="business-text-muted">
          © {new Date().getFullYear()} Juan Rodriguez
        </p>

        <span aria-hidden="true" className="business-text-muted">
          ·
        </span>

        <Link
          href="/business"
          className="font-medium text-[#287A60] transition-colors hover:text-[#20664E]"
        >
          {t("backToBusiness")}
        </Link>
      </div>
    </footer>
  );
}