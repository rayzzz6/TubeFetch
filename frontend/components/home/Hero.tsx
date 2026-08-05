"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { FrequencyBars } from "@/components/background/FrequencyBars";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative pt-40 pb-24 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-ink-muted mb-8"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-ice" aria-hidden="true" />
          Built for content you own or have rights to use
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display font-semibold text-4xl sm:text-6xl leading-[1.05] tracking-tight"
        >
          Paste a link.
          <br />
          <span className="text-gradient">Pull the signal.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-6 text-base sm:text-lg text-ink-muted max-w-xl mx-auto"
        >
          Drop a YouTube URL and get clean video or audio, right down to the bitrate.
          No clutter, no accounts, no waiting around.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/analyze">
            <Button size="lg" className="group">
              Try it now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
          </Link>
          <Link href="/faq">
            <Button size="lg" variant="secondary">
              How it works
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <FrequencyBars active barCount={40} className="h-10 opacity-80" />
        </motion.div>
      </div>
    </section>
  );
}
