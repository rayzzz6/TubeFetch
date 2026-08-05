import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about using TubeFetch.",
};

const FAQS = [
  {
    q: "What video and audio formats are available?",
    a: "MP4 video in 360p, 480p, 720p, and 1080p where the source supports it, and MP3 audio at 128kbps, 192kbps, and 320kbps.",
  },
  {
    q: "Do I need an account?",
    a: "No. TubeFetch works without sign-up. Your download history is kept only in your browser's local storage.",
  },
  {
    q: "Is there a limit to how many links I can analyze?",
    a: "Yes — a light rate limit protects the service from abuse. If you hit it, wait a minute and try again.",
  },
  {
    q: "Why can't I download a particular video?",
    a: "Some videos restrict downloads or age-gate content, and availability of specific qualities can vary by source.",
  },
  {
    q: "Is my data tracked or sold?",
    a: "No third-party analytics or ad trackers are used. See the Privacy Policy for full details.",
  },
  {
    q: "Can I use TubeFetch on my phone?",
    a: "Yes — the interface is fully responsive, and you can install it to your home screen as an app.",
  },
  {
    q: "What content am I allowed to download?",
    a: "Only content you own or otherwise have the rights to download. Respect creators' rights and YouTube's Terms of Service.",
  },
];

export default function FaqPage() {
  return (
    <div className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
            Frequently asked questions
          </h1>
        </div>

        <div className="space-y-3">
          {FAQS.map((item) => (
            <GlassCard key={item.q} className="p-5 sm:p-6">
              <h2 className="font-medium text-ink">{item.q}</h2>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{item.a}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
