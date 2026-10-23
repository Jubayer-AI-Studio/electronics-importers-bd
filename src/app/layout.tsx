import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  metadataBase: new URL("https://electronics-importers-bd.vercel.app"),
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.slogan}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/logo.jpg",
        width: 640,
        height: 640,
        alt: siteConfig.name,
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  icons: {
    icon: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col bg-surface-light text-text-main selection:bg-brand-400 selection:text-brand-900">
        {children}
      </body>
    </html>
  );
}
