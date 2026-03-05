import "./globals.css";
import Providers from "@/components/Providers";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const rawHost = process.env.CF_PAGES_URL || "localhost:3000";
const host = rawHost.replace(/^https?:\/\//, "");

const protocol = host.includes("localhost") ? "http" : "https";
const baseUrl = `${protocol}://${host}`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  icons: {
    icon: "/favicon-logo.svg",
  },
  openGraph: {
    images: [
      {
        url: "/opengraph-logo.png",
        width: 900,
        height: 900,
        alt: "Juan Rodriguez Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
