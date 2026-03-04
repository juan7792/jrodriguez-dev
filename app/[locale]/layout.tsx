import NavBar from "@/components/NavBar";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";

const TITLES: Record<string, string> = {
  en: "Software Engineer — Juan Rodriguez",
  es: "Ingeniero de Software — Juan Rodríguez",
  de: "Softwareentwickler — Juan Rodriguez",
};

export const runtime = 'edge';

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
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <NavBar />
      {children}
    </NextIntlClientProvider>
  );
}
