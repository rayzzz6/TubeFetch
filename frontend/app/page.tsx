import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { FeatureCards } from "@/components/home/FeatureCards";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "TubeFetch — Download YouTube video & audio, fast",
  description:
    "Paste a YouTube URL and get clean MP4 video or MP3 audio in seconds. No accounts, no clutter, mobile-friendly.",
};

const FAQ_PREVIEW = [
  {
    q: "Is this really free?",
    a: "Yes — analysis and the interface are free to use, no account required.",
  },
  {
    q: "What formats are supported?",
    a: "MP4 video up to 1080p, and MP3 audio up to 320kbps, when the source supports it.",
  },
  {
    q: "Do you store my downloads?",
    a: "No. Your history is saved only in your browser's local storage, on your device.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />

      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">Quick answers</h2>
          </div>
          <div className="space-y-3">
            {FAQ_PREVIEW.map((item) => (
              <GlassCard key={item.q} className="p-5">
                <h3 className="font-medium text-ink">{item.q}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{item.a}</p>
              </GlassCard>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/faq" className="text-sm text-ice hover:underline">
              See the full FAQ →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <GlassCard className="mx-auto max-w-3xl p-10 sm:p-14 text-center">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight">
            Ready when you are
          </h2>
          <p className="mt-3 text-ink-muted max-w-md mx-auto">
            Drop in a link and see exactly what&apos;s available — no commitment, no sign-up.
          </p>
          <Link href="/analyze" className="inline-block mt-6">
            <Button size="lg">Start now</Button>
          </Link>
        </GlassCard>
      </section>
    </>
  );
}
