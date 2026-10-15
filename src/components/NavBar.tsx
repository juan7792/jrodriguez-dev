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
  const isTechnical = pathname === "/technical";

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 640) setMobileOpen(false);
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

  const isDark = mounted ? currentTheme === "dark" : false;

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
        document.querySelector(href)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  const links = [
    { href: "#services", label: t("services") },
    { href: "#projects", label: t("projects") },
    { href: "#tech", label: t("tech") },
    { href: "#life", label: t("life") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <>
      {mobileOpen && isTechnical && (
        <div
          className="fixed inset-0 z-40 bg-black/5 sm:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
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
              className="h-10 w-auto transition-transform hover:scale-105 sm:h-14"
              priority
            />
          </a>

          {/* Audience tabs - Desktop */}
          <div className="hidden flex-1 justify-center sm:flex">
            <AudienceTabs />
          </div>

          {/* Theme, language and mobile menu */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 sm:h-10 sm:w-10"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
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

            <select
              className="h-9 cursor-pointer rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-900 sm:h-10"
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

            {isTechnical && (
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 sm:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-label="Toggle section navigation"
              >
                <span aria-hidden="true">
                  {mobileOpen ? "✕" : "☰"}
                </span>
              </button>
            )}
          </div>
        </nav>

        {/* Audience tabs - Mobile */}
        <div className="border-t border-slate-200 px-4 py-2 dark:border-slate-800 sm:hidden">
          <div className="mx-auto max-w-5xl">
            <AudienceTabs />
          </div>
        </div>

        {/* Technical section links - Desktop */}
        {isTechnical && (
          <div className="hidden border-t border-slate-200/70 dark:border-slate-800 sm:block">
            <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-7 gap-y-2 px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(link.href);
                  }}
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Technical section links - Mobile */}
        {isTechnical && mobileOpen && (
          <div className="border-t border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95 sm:hidden">
            <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(link.href);
                  }}
                  className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
