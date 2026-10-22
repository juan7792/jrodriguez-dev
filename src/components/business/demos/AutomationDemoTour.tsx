"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type AutomationDemoTourProps = {
  onNext: () => void;
  onExit: () => void;
};

export default function AutomationDemoTour({
  onNext,
  onExit,
}: AutomationDemoTourProps) {
  const t = useTranslations("BusinessAutomationDemo");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;

    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onExit();
      }

      if (event.key === "Tab") {
        const buttons =
          dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");

        if (!buttons?.length) return;

        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && (active === first || active === dialogRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [onExit]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="automation-tour-title"
        aria-describedby="automation-tour-description"
        tabIndex={-1}
        className="w-full max-w-md rounded-2xl border border-[#DCE7DE] bg-white p-6 shadow-xl outline-none sm:p-8"
      >
        <div className="flex items-center justify-between gap-4 text-sm">
          <p className="font-semibold text-[#287A60]">
            {t("tourLabel")}
          </p>

          <p className="text-[#5B6B61]">
            {t("tourProgress", { current: 1, total: 5 })}
          </p>
        </div>

        <h2
          id="automation-tour-title"
          className="mt-4 text-2xl font-semibold text-[#20362F]"
        >
          {t("tourIntroTitle")}
        </h2>

        <p
          id="automation-tour-description"
          className="mt-4 text-sm leading-relaxed text-[#5B6B61]"
        >
          {t("tourIntroDescription")}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onExit}
            className="min-h-11 rounded-lg px-3 text-sm font-medium text-[#5B6B61] transition-colors hover:bg-[#FAF8F3] hover:text-[#20362F]"
          >
            {t("tourSkip")}
          </button>

          <button
            type="button"
            onClick={onNext}
            className="min-h-11 rounded-lg !bg-[#287A60] px-5 py-3 text-sm font-semibold !text-white transition-colors hover:!bg-[#20664E]"
          >
            {t("tourNext")} →
          </button>
        </div>
      </div>
    </div>
  );
}