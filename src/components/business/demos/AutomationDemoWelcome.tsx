"use client";

import { useEffect } from "react";
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

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onExploreFreely();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onExploreFreely]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="presentation"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onExploreFreely();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="automation-welcome-title"
                className="relative w-full max-w-md rounded-2xl border border-[#DCE7DE] bg-white p-6 shadow-xl sm:p-8"
            >

                <button
                    type="button"
                    onClick={onExploreFreely}
                    aria-label={t("closeWelcome")}
                    className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#5B6B61] transition-colors hover:bg-[#FAF8F3] hover:text-[#20362F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287A60]"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                </button>
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