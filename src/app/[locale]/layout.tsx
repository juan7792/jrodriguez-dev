import NavBar from "@/components/NavBar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";

// Localized titles
const TITLES: Record<string, string> = {
  en: "Software Engineer — Juan Rodriguez",
  es: "Ingeniero de Software — Juan Rodríguez",
  de: "Softwareentwickler — Juan Rodriguez",
};

// Use Edge Runtime for Cloudflare deployment
export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale?.split("-")[0] ?? "en";

  return {
    title: TITLES[lang] ?? TITLES.en,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch messages server-side to prevent hydration mismatch
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <NavBar />
      {children}
    </NextIntlClientProvider>
  );
}
