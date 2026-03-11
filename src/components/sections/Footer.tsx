"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-auto py-12 px-6 text-center">
      <div className="flex flex-col items-center gap-2">
        {/* Frase principal */}
        <p className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          {t("designedBy")}
          <img
            src="/icons/footer/heart.svg"
            alt="Heart"
            className="w-4 h-4 opacity-80 dark:brightness-110"
          />
        </p>

        {/* Link al repositorio */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em] font-medium">
            {t("checkRepo")}
          </p>
          <a
            href="https://github.com/juan7792/jrodriguez-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm font-medium text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all duration-300"
          >
            <span className="underline underline-offset-4 decoration-slate-400 dark:decoration-slate-400 group-hover:decoration-slate-600/80 dark:group-hover:decoration-slate-200/80">
              {t("cta")}
            </span>
            {/* Icono de GitHub */}
            <svg
              height="16"
              width="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="opacity-60 group-hover:opacity-100 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-all"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
