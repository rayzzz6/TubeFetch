import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GradientBackground } from "@/components/background/GradientBackground";
import { ParticleField } from "@/components/background/ParticleField";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/hooks/useToast";
import { ToastViewport } from "@/components/ui/Toast";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://tubefetch.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TubeFetch — Download YouTube video & audio, fast",
    template: "%s · TubeFetch",
  },
  description:
    "Paste a YouTube URL and get clean MP4 video or MP3 audio in seconds. No accounts, no clutter, mobile-friendly.",
  applicationName: "TubeFetch",
  keywords: ["youtube downloader", "mp4 download", "mp3 extractor", "video to audio"],
  authors: [{ name: "TubeFetch" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  openGraph: {
    title: "TubeFetch — Download YouTube video & audio, fast",
    description: "Paste a link, pick a quality, get your file. Minimal, fast, mobile-first.",
    url: SITE_URL,
    siteName: "TubeFetch",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TubeFetch",
    description: "Paste a YouTube URL, get clean MP4 or MP3 downloads in seconds.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-base focus:text-ink focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <GradientBackground />
        <ParticleField />
        <ToastProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <ToastViewport />
          <InstallPrompt />
        </ToastProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
