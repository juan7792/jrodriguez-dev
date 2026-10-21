
"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";
import AudienceTabs from "@/components/AudienceTabs";

export default function NavBar() {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;

  const router = useRouter();
  const pathname = usePathname();
  const isTechnical = pathname.startsWith("/technical");

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const currentTheme = useMemo(() => {
    if (!mounted) return "system";
    return resolvedTheme ?? theme ?? "system";
  }, [mounted, resolvedTheme, theme]);

  const isDark = isTechnical && mounted && currentTheme === "dark";

  function onChangeLocale(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale as Locale });
    setMobileOpen(false);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  }

  
function onNavClick(href: string) {
  setMobileOpen(false);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const section = document.querySelector(href);
      const header = document.querySelector("header.sticky");

      if (!section) return;

      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      const offset = headerHeight + 0;

      const top =
        section.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    });
  });
}


  // Navigation links depend on the current audience.
  const links = isTechnical
    ? [
        { href: "#services", label: t("services") },
        { href: "#projects", label: t("projects") },
        { href: "#tech", label: t("tech") },
        { href: "#life", label: t("life") },
        { href: "#contact", label: t("contact") },
      ]
    : [
        { href: "#solutions", label: "Solutions" },
        { href: "#how-it-works", label: "How It Works" },
        { href: "#about", label: "About" },
        { href: "#contact", label: "Contact" },
      ];

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30
          transition-opacity duration-200 ease-out
          motion-reduce:transition-none lg:hidden
          ${
            mobileOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />


      <header
        className={`sticky top-0 z-50 border-b backdrop-blur ${
          isTechnical
            ? "border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950/70"
            : "business-theme border-[#DCE7DE] !bg-[#FAF8F3] !text-[#20362F]"
        }`}
      >
        {/* Main navigation */}
        <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          {/* Logo */}
          <a
            href="#top"
            className="font-semibold tracking-tight"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <Image
              src={
                isDark
                  ? "/icons/navbar/logo-dark.svg"
                  : "/icons/navbar/logo-light.svg"
              }
              alt="Juan Rodriguez Logo"
              width={40}
              height={40}
              className="h-10 w-auto transition-transform hover:scale-105 lg:h-14"
              priority
            />
          </a>

          {/* Section links - Desktop */}
          <div className="hidden flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(link.href);
                }}
                className={`text-sm font-medium transition-colors ${
                  isTechnical
                    ? "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                    : "text-[#20362F] hover:text-[#287A60]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Theme, language and mobile menu */}
          <div className="flex items-center gap-3">
            {/* Theme selector - Technical only */}
            {isTechnical && (
              <button
                type="button"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 lg:h-10 lg:w-10"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {mounted ? (
                  <img
                    src={
                      isDark
                        ? "/icons/navbar/sun.svg"
                        : "/icons/navbar/moon.svg"
                    }
                    alt=""
                    width={24}
                    height={24}
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Language selector */}
            <select
              className={`h-9 cursor-pointer rounded-md border px-3 text-sm lg:h-10 ${
                isTechnical
                  ? "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                  : "border-[#DCE7DE] bg-white text-[#20362F]"
              }`}
              value={locale}
              onChange={(e) => onChangeLocale(e.target.value)}
              aria-label="Language"
            >
              {locales.map((l) => (
                <option key={l} value={l}>
                  {l.toUpperCase()}
                </option>
              ))}
            </select>

            {/* Mobile menu button - Both audiences */}
            <button
              type="button"
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md border lg:hidden ${
                isTechnical
                  ? "border-slate-200 dark:border-slate-800"
                  : "border-[#DCE7DE] text-[#20362F]"
              }`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-section-nav"
              aria-label="Toggle section navigation"
            >
              <span aria-hidden="true">
                {mobileOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </nav>

        
      {/* Section links - Mobile */}
      <div
        id="mobile-section-nav"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={`absolute left-0 top-full z-50 w-full
          border-t shadow-lg
          transition-all duration-200 ease-out
          motion-reduce:transition-none
          ${
            mobileOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible pointer-events-none -translate-y-2 opacity-0"
          }
          lg:hidden
          ${
            isTechnical
              ? "border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95"
              : "border-[#DCE7DE] bg-[#FAF8F3]"
          }`}
      >
        <div
          className={`mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                onNavClick(link.href);
              }}
              className={`rounded-md px-3 py-2 text-sm ${
                isTechnical
                  ? "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                  : "text-[#20362F] hover:bg-[#E8F4EA]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

        {/* Discreet audience switch */}
        <div
          className={`border-t px-4 py-2 ${
            isTechnical
              ? "border-slate-200/70 dark:border-slate-800"
              : "border-[#DCE7DE]"
          }`}
        >
          <AudienceTabs />
        </div>
      </header>
    </>
  );
}
