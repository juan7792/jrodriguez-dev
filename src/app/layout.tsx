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

// URL construction to activate sharing icon in social media
const baseUrl = "https://jrodriguez-dev.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  icons: {
    icon: "/favicon-logo.svg",
  },

  openGraph: {
    url: baseUrl,
    siteName: "Juan Rodriguez",
    images: [
      {
        url: "/opengraph-logo.png",
        width: 1200,
        height: 630,
        alt: "Juan Rodriguez Logo",
      },
    ],
    type: "website",
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
      // suppressHydrationWarning is required for next-themes to work correctly
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
