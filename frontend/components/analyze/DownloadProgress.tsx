"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Download } from "lucide-react";
import { FrequencyBars } from "@/components/background/FrequencyBars";
import { DownloadJob } from "@/lib/types";

interface DownloadProgressProps {
  job: DownloadJob;
}

export function DownloadProgress({ job }: DownloadProgressProps) {
  const isComplete = job.status === "completed";

  return (
    <div className="glass rounded-2xl p-4" role="status" aria-live="polite">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          {isComplete ? (
            <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
          ) : (
            <Download className="h-4 w-4 text-ice animate-pulse" aria-hidden="true" />
          )}
          <span className="text-ink">
            {isComplete ? "Ready" : job.status === "queued" ? "Queued…" : "Processing…"}
          </span>
        </div>
        <span className="font-mono text-xs text-ink-muted">{job.progress}%</span>
      </div>

      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-signal to-ice"
          initial={{ width: 0 }}
          animate={{ width: `${job.progress}%` }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </div>

      <div className="mt-3">
        <FrequencyBars active={!isComplete} barCount={30} className="h-5 opacity-70" />
      </div>
    </div>
  );
}
