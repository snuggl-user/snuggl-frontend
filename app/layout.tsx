import type { Metadata } from "next";
import { Fredoka, Urbanist } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { openGraphDefaults, siteUrl } from "@/lib/site";

export const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fredoka",
});

export const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Snuggl",
  description: "Adopt, don't shop.",
  openGraph: { ...openGraphDefaults, type: "website" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${fredoka.variable} ${urbanist.variable} antialiased`}>
        {children}
        <Script
          defer
          data-domain="snuggl.app"
          src="https://analytics.davidelista.com/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
