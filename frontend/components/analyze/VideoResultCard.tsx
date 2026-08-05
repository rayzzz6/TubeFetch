"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, Check, Copy, Download } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { QualitySelector } from "@/components/analyze/QualitySelector";
import { DownloadProgress } from "@/components/analyze/DownloadProgress";
import { VideoMetadata, DownloadJob } from "@/lib/types";
import { formatDuration, formatRelativeDate, formatViewCount } from "@/lib/utils";

interface VideoResultCardProps {
  metadata: VideoMetadata;
  mode: "video" | "audio";
  onModeChange: (mode: "video" | "audio") => void;
  selectedQuality: string | null;
  onSelectQuality: (q: string) => void;
  onStartDownload: () => void;
  isStartingDownload: boolean;
  activeJob: DownloadJob | null;
}

export function VideoResultCard({
  metadata,
  mode,
  onModeChange,
  selectedQuality,
  onSelectQuality,
  onStartDownload,
  isStartingDownload,
  activeJob,
}: VideoResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(metadata.sourceUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <GlassCard className="p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="relative w-full sm:w-56 aspect-video shrink-0 rounded-xl overflow-hidden border border-line">
            <Image
              src={metadata.thumbnailUrl}
              alt={`Thumbnail for ${metadata.title}`}
              fill
              sizes="(max-width: 640px) 100vw, 224px"
              className="object-cover"
              priority
            />
            <span className="absolute bottom-1.5 right-1.5 font-mono text-xs bg-black/70 text-ink px-1.5 py-0.5 rounded">
              {formatDuration(metadata.durationSeconds)}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-display font-semibold text-lg sm:text-xl leading-snug line-clamp-2">
              {metadata.title}
            </h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-1">
                {metadata.channel}
                {metadata.channelVerified && (
                  <BadgeCheck className="h-3.5 w-3.5 text-ice" aria-label="Verified channel" />
                )}
              </span>
              <span aria-hidden="true">·</span>
              <span>{formatViewCount(metadata.viewCount)}</span>
              <span aria-hidden="true">·</span>
              <span>{formatRelativeDate(metadata.publishedAt)}</span>
            </div>

            <button
              onClick={handleCopy}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono text-ink-faint hover:text-ice transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-line">
          <QualitySelector
            mode={mode}
            onModeChange={onModeChange}
            videoFormats={metadata.videoFormats}
            audioFormats={metadata.audioFormats}
            selectedQuality={selectedQuality}
            onSelectQuality={onSelectQuality}
          />

          <Button
            onClick={onStartDownload}
            isLoading={isStartingDownload}
            disabled={!selectedQuality}
            size="lg"
            className="w-full mt-5"
          >
            {!isStartingDownload && <Download className="h-4 w-4" aria-hidden="true" />}
            {isStartingDownload ? "Starting…" : `Download ${selectedQuality ?? ""}`.trim()}
          </Button>

          {activeJob && (
            <div className="mt-4">
              <DownloadProgress job={activeJob} />
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
