"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/analyze", label: "Analyze" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <nav className="glass rounded-2xl px-4 sm:px-6 h-16 flex items-center justify-between shadow-glass">
          <Link href="/" className="flex items-center gap-2 font-display font-semibold text-lg tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-signal to-ice">
              <Zap className="h-4 w-4 text-base" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span className="text-ink">Tube</span>
            <span className="text-gradient">Fetch</span>
          </Link>

          <ul className="hidden sm:flex items-center gap-1">
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                      isActive ? "bg-white/10 text-ink" : "text-ink-muted hover:text-ink hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/analyze"
            className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-signal to-ice px-5 py-2.5 text-sm font-semibold text-base shadow-glow hover:brightness-110 transition"
          >
            Get started
          </Link>

          <button
            className="sm:hidden text-ink p-2 -mr-2"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden overflow-hidden"
            >
              <div className="glass mt-2 rounded-2xl p-3 flex flex-col gap-1 shadow-glass">
                {LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium",
                      pathname === link.href ? "bg-white/10 text-ink" : "text-ink-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
