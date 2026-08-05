"use client";

import { motion } from "framer-motion";
import { AudioLines, Gauge, History, ShieldCheck, SlidersHorizontal, Smartphone } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const FEATURES = [
  {
    icon: SlidersHorizontal,
    title: "Real quality options",
    description: "Choose 360p up to 1080p for video, or 128–320kbps for audio — pick what actually fits.",
  },
  {
    icon: Gauge,
    title: "Instant analysis",
    description: "Paste a link and see the title, channel, duration, and file sizes in under a second.",
  },
  {
    icon: AudioLines,
    title: "Clean audio extraction",
    description: "Pull just the MP3 when you only need the sound — no video weight to carry.",
  },
  {
    icon: History,
    title: "Local history",
    description: "Recent downloads are remembered on your device only. Nothing leaves your browser.",
  },
  {
    icon: Smartphone,
    title: "Installable app",
    description: "Add TubeFetch to your home screen and use it like a native app, online or off.",
  },
  {
    icon: ShieldCheck,
    title: "No accounts, no tracking",
    description: "No sign-up, no ads, no third-party analytics watching what you paste.",
  },
];

export function FeatureCards() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-lg mx-auto mb-14">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
            Everything, minus the noise
          </h2>
          <p className="mt-3 text-ink-muted">
            A focused toolset for one job — getting the file you need, fast.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <GlassCard className="p-6 h-full hover:bg-white/[0.06] transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-signal/20 to-ice/20 border border-line">
                  <feature.icon className="h-5 w-5 text-ice" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-lg">{feature.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
