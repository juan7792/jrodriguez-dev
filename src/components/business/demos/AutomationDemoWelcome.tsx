"use client";

import { useTranslations } from "next-intl";

type AutomationDemoWelcomeProps = {
  onStartGuided: () => void;
  onExploreFreely: () => void;
};

export default function AutomationDemoWelcome({
  onStartGuided,
  onExploreFreely,
}: AutomationDemoWelcomeProps) {
  const t = useTranslations("BusinessAutomationDemo");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="automation-welcome-title"
        className="w-full max-w-md rounded-2xl border border-[#DCE7DE] bg-white p-6 shadow-xl sm:p-8"
      >
        <p className="mb-3 text-sm font-semibold text-[#287A60]">
          {t("welcomeLabel")}
        </p>

        <h2
          id="automation-welcome-title"
          className="text-2xl font-semibold text-[#20362F]"
        >
          {t("welcomeTitle")}
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-[#5B6B61]">
          {t("welcomeDescription")}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onStartGuided}
            className="min-h-11 rounded-lg !bg-[#287A60] px-5 py-3 text-sm font-semibold !text-white transition-colors hover:!bg-[#20664E]"
          >
            {t("startGuided")} →
          </button>

          <button
            type="button"
            onClick={onExploreFreely}
            className="min-h-11 rounded-lg border border-[#DCE7DE] bg-white px-5 py-3 text-sm font-semibold text-[#20362F] transition-colors hover:bg-[#FAF8F3]"
          >
            {t("exploreFreely")}
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-[#5B6B61]">
          {t("welcomeNote")}
        </p>
      </div>
    </div>
  );
}