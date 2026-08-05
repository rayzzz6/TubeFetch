"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { FrequencyBars } from "@/components/background/FrequencyBars";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/analyze", label: "Analyze a link" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
  {
    title: "Support",
    links: [{ href: "/contact", label: "Contact us" }],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-display font-semibold text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-signal to-ice">
                <Zap className="h-4 w-4 text-base" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="text-ink">Tube</span>
              <span className="text-gradient">Fetch</span>
            </Link>
            <p className="mt-3 text-sm text-ink-muted max-w-xs">
              A fast, minimal way to pull down the video or audio you have the rights to keep.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-5"
            >
              <FrequencyBars active barCount={18} className="h-6 opacity-70" />
            </motion.div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint font-mono">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-muted hover:text-ink transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-faint font-mono">
            © {new Date().getFullYear()} TubeFetch. Demo build — analysis results are simulated.
          </p>
          <p className="text-xs text-ink-faint">Built for videos and audio you own or have rights to use.</p>
        </div>
      </div>
    </footer>
  );
}
