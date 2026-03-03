"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";

export default function NavBar() {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;

  const router = useRouter();
  const pathname = usePathname();

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Cierra el menú al cambiar tamaño a desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 640) setMobileOpen(false); // sm breakpoint
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Cierra el menú con ESC
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
    <header
      className="
        sticky top-0 z-50
        border-b border-slate-200
        bg-white/80 backdrop-blur
        dark:border-slate-800 dark:bg-slate-950/70
        transition-colors duration-200
      "
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Left: Name */}
        <a
          href="#top"
          className="font-semibold tracking-tight"
          onClick={onNavClick}
        >
          {/* Block for logo */}
          {/* <Image
            src="/icons/navbar/logo.png"
            alt="Juan Rodriguez Logo"
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          /> */}
          {t("name")}
        </a>

        {/* Center: Section links (desktop only) */}
        <div className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-300 sm:flex">
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

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle (icon only) */}
          <button
            type="button"
            className="cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-sm hover:bg-slate-50
                       dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {mounted ? (
              <img
                src={isDark ? sunSVG : moonSVG}
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="block h-4 w-4"
              />
            ) : (
              // placeholder para evitar layout shift
              <span className="block h-4 w-4" aria-hidden="true" />
            )}
          </button>

          {/* Language dropdown */}
          <select
            className="cursor-pointer h-9 rounded-md border border-slate-200 bg-white px-3 text-sm hover:bg-slate-50
                       dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
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

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-sm hover:bg-slate-50
                       dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 sm:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/85 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-3">
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={onNavClick}
                  className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100
                             dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
