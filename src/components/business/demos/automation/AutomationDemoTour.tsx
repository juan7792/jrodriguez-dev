"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type AutomationDemoTourProps = {
  step: 1 | 2 | 3 | 4 | 5;
  status: "idle" | "processing" | "completed" | "resetting";
  readyCount: number;
  attentionCount: number;
  onNext: () => void;
  onBack: () => void;
  onExit: () => void;
};

export default function AutomationDemoTour({
  step,
  status,
  readyCount,
  attentionCount,
  onNext,
  onBack,
  onExit,
}: AutomationDemoTourProps) {
  const t = useTranslations("BusinessAutomationDemo");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onExit();
      }

      if (event.key === "Tab") {
        const buttons = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            "button:not(:disabled)"
          ) ?? []
        );

        const interactiveElements = Array.from(
          document.querySelectorAll<HTMLElement>(
            '[data-tour-interactive="true"]:not(:disabled)'
          )
        );

        const focusableElements = [...buttons, ...interactiveElements];

        if (!focusableElements.length) return;

        const active = document.activeElement;
        const index = focusableElements.findIndex(
          (element) => element === active
        );

        const nextIndex = event.shiftKey
          ? index <= 0
            ? focusableElements.length - 1
            : index - 1
          : index === -1 || index === focusableElements.length - 1
            ? 0
            : index + 1;

        event.preventDefault();
        focusableElements[nextIndex].focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused.isConnected
      ) {
        previouslyFocused.focus();
      }
    };
  }, [onExit]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, [step, status]);

  const titleKeys = {
    1: "tourIntroTitle",
    2: "tourOrdersTitle",
    3: "tourValidationTitle",
    4: "tourFixTitle",
    5: "tourCompleteTitle",
  } as const;

  const descriptionKey =
    step === 1
      ? "tourIntroDescription"
      : step === 2
        ? "tourOrdersDescription"
        : step === 3
          ? status === "completed"
            ? "tourValidationResults"
            : status === "processing"
              ? "tourValidationProcessing"
              : "tourValidationDescription"
          : step === 4
            ? status === "processing"
              ? "tourFixProcessing"
              : status === "completed" && attentionCount === 0
                ? "tourFixCompleted"
                : "tourFixDescription"
            : "tourCompleteDescription";

  const showNext =
    step < 3 ||
    (step === 3 && status === "completed") ||
    (step === 4 && status === "completed" && attentionCount === 0);

  const isFinalStep = step === 5;
  const showOnLeft = step === 4 || step === 5;

  return (
    <>
      {/* Dimmed background */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onExit}
        aria-hidden="true"
      />

      {/* Tour explanation */}
      <div
        className={`pointer-events-none fixed inset-0 z-[70] flex p-4 ${
          step === 1
            ? "items-center justify-center"
            : "items-end justify-center xl:items-center"
        }`}
      >
        <div
          className={
            step === 1
              ? "contents"
              : "flex w-full max-w-7xl justify-center xl:grid xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] xl:gap-4"
          }
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal={step < 3 || isFinalStep}
            aria-labelledby="automation-tour-title"
            aria-describedby="automation-tour-description"
            tabIndex={-1}
            className={`relative pointer-events-auto max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#DCE7DE] bg-white p-6 shadow-xl outline-none sm:p-8 ${
              showOnLeft
                ? "xl:col-start-1 xl:justify-self-end"
                : step !== 1
                  ? "xl:col-start-2"
                  : ""
            }`}
          >
            <button
              type="button"
              onClick={onExit}
              aria-label={t("tourClose")}
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

            <div className="flex items-center justify-between gap-4 pr-8 text-sm">
              <p className="font-semibold text-[#287A60]">
                {t("tourLabel")}
              </p>

              <p className="text-[#5B6B61]">
                {t("tourProgress", { current: step, total: 5 })}
              </p>
            </div>

            <h2
              id="automation-tour-title"
              className="mt-4 text-2xl font-semibold text-[#20362F]"
            >
              {t(titleKeys[step])}
            </h2>

            <p
              id="automation-tour-description"
              aria-live="polite"
              className="mt-4 text-sm leading-relaxed text-[#5B6B61]"
            >
              {t(descriptionKey, {
                ready: readyCount,
                attention: attentionCount,
              })}
            </p>

            {isFinalStep && (
              <p className="mt-4 text-sm leading-relaxed text-[#5B6B61]">
                {t("tourCompleteNextSteps")}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              {!isFinalStep && (
                <button
                  type="button"
                  onClick={onExit}
                  className="min-h-11 rounded-lg px-3 text-sm font-medium text-[#5B6B61] transition-colors hover:bg-[#FAF8F3] hover:text-[#20362F]"
                >
                  {t("tourSkip")}
                </button>
              )}

              <div
                className={`flex items-center gap-3 ${
                  isFinalStep ? "w-full justify-between" : ""
                }`}
              >
                {step > 1 && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="min-h-11 rounded-lg border border-[#DCE7DE] px-5 py-3 text-sm font-semibold text-[#20362F] transition-colors hover:bg-[#FAF8F3]"
                  >
                    ← {t("tourBack")}
                  </button>
                )}

                {showNext && (
                  <button
                    type="button"
                    onClick={onNext}
                    className="min-h-11 rounded-lg !bg-[#287A60] px-5 py-3 text-sm font-semibold !text-white transition-colors hover:!bg-[#20664E]"
                  >
                    {t("tourNext")} →
                  </button>
                )}

                {isFinalStep && (
                  <button
                    type="button"
                    onClick={onExit}
                    className="min-h-11 rounded-lg !bg-[#287A60] px-5 py-3 text-sm font-semibold !text-white transition-colors hover:!bg-[#20664E]"
                  >
                    {t("tourFinish")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}