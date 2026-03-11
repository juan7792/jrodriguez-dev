"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";

/**
 * Main navigation bar with theme switching, localization,
 * and responsive mobile menu with backdrop support.
 */
export default function NavBar() {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;

  const router = useRouter();
  const pathname = usePathname();

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => setMounted(true), []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 640) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Accessibility: Close menu with Escape key
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

  const sunSVG = "/icons/navbar/sun.svg";
  const moonSVG = "/icons/navbar/moon.svg";

  function onChangeLocale(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale as Locale });
    setMobileOpen(false);
  }

  function onNavClick() {
    setMobileOpen(false);
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
      {/* Mobile Backdrop: Closes menu when tapping outside */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/5 sm:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950/70">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          {/* Logo / Brand */}
          <a
            href="#top"
            className="font-semibold tracking-tight"
            onClick={onNavClick}
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

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-6 text-sm font-medium tracking-wide text-slate-600 dark:text-slate-300 sm:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* User Controls: Theme, Locale, Menu */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white text-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 sm:h-10 sm:w-10"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {mounted ? (
                <img
                  src={isDark ? sunSVG : moonSVG}
                  alt=""
                  width={24}
                  height={24}
                  className="block h-4 w-4"
                  aria-hidden="true"
                />
              ) : (
                <span className="block h-4 w-4" aria-hidden="true" />
              )}
            </button>

            {/* Language Selection */}
            <select
              className="h-9 cursor-pointer rounded-md border border-slate-200 bg-white px-3 text-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 sm:h-10"
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

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 sm:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
            >
              <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85 sm:hidden">
            <div className="mx-auto max-w-5xl px-4 py-3">
              <div className="flex flex-col gap-2">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={onNavClick}
                    className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
