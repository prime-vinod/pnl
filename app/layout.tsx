import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { Cursor } from "@/components/motion/cursor";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IntroProvider } from "@/components/motion/intro/intro-provider";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap", weight: ["400", "500", "900"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", weight: ["400", "500"] });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", weight: ["400"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Vinod Suthar — Software Engineer", template: "%s · Vinod Suthar" },
  description: "Software engineer with 3+ years building high-performance backend systems, AI integrations, and full-stack applications with NestJS, Node.js, and TypeScript.",
  openGraph: { type: "website", siteName: "Vinod Suthar" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LenisProvider />
          <Cursor />
          <ScrollProgress />
          <IntroProvider>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </IntroProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
