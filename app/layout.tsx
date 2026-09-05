import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/data/site";
import CustomCursor from "@/components/CustomCursor";
import CommandMenu from "@/components/CommandMenu";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = "https://birajkarki.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Software Developer & Builder`,
    template: `%s — ${site.name}`,
  },
  description:
    "Biraj Karki is a software engineer building scalable full-stack systems — from production HRMS software used by 500+ companies to experiments in machine learning and quantum computing.",
  keywords: [
    "Biraj Karki",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Quantum Computing",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${site.name} — Software Developer & Builder`,
    description: site.tagline,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Software Developer & Builder`,
    description: site.tagline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-fg font-sans selection:bg-accent selection:text-accent-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <MotionProvider>
          <CustomCursor />
          <CommandMenu />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
