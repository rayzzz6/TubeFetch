"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-40 glass rounded-2xl p-4 shadow-glass"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-signal to-ice shrink-0">
            <Download className="h-4 w-4 text-base" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-ink">Install TubeFetch</p>
            <p className="text-xs text-ink-muted mt-0.5">Add it to your home screen for quick access.</p>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                onClick={async () => {
                  await deferredPrompt.prompt();
                  setDeferredPrompt(null);
                }}
              >
                Install
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setDismissed(true)}>
                Not now
              </Button>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-ink-faint hover:text-ink"
            aria-label="Dismiss install prompt"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
