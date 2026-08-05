"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UrlInputCard } from "@/components/analyze/UrlInputCard";
import { VideoResultCard } from "@/components/analyze/VideoResultCard";
import { HistoryPanel } from "@/components/analyze/HistoryPanel";
import { ResultSkeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/hooks/useToast";
import { useHistory } from "@/hooks/useHistory";
import { useGlobalPasteShortcut } from "@/hooks/useClipboardPaste";
import { analyzeVideoUrl, ApiRequestError, getDownloadStatus, startDownload } from "@/lib/api";
import { DownloadJob, VideoMetadata } from "@/lib/types";

export default function AnalyzePage() {
  const { showToast } = useToast();
  const { entries, record, remove, clear } = useHistory();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [mode, setMode] = useState<"video" | "audio">("video");
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const [isStartingDownload, setIsStartingDownload] = useState(false);
  const [activeJob, setActiveJob] = useState<DownloadJob | null>(null);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleAnalyze = useCallback(
    async (url: string) => {
      setIsAnalyzing(true);
      setMetadata(null);
      setActiveJob(null);
      setSelectedQuality(null);
      try {
        const { data } = await analyzeVideoUrl(url);
        setMetadata(data);
        setMode("video");
        setSelectedQuality(data.videoFormats[0]?.quality ?? null);
      } catch (err) {
        const message =
          err instanceof ApiRequestError ? err.message : "Couldn't analyze that link. Please try again.";
        showToast({ variant: "error", title: "Analysis failed", description: message });
      } finally {
        setIsAnalyzing(false);
      }
    },
    [showToast]
  );

  const handleModeChange = useCallback(
    (nextMode: "video" | "audio") => {
      setMode(nextMode);
      if (!metadata) return;
      const first =
        nextMode === "video" ? metadata.videoFormats[0]?.quality : metadata.audioFormats[0]?.bitrate;
      setSelectedQuality(first ?? null);
    },
    [metadata]
  );

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  useEffect(() => stopPolling, [stopPolling]);

  const handleStartDownload = useCallback(async () => {
    if (!metadata || !selectedQuality) return;
    setIsStartingDownload(true);
    stopPolling();

    try {
      const { data: job } = await startDownload({
        videoId: metadata.videoId,
        sourceUrl: metadata.sourceUrl,
        type: mode,
        quality: selectedQuality,
      });
      setActiveJob(job);

      pollRef.current = setInterval(async () => {
        try {
          const { data: updated } = await getDownloadStatus(job.jobId);
          setActiveJob(updated);
          if (updated.status === "completed" || updated.status === "failed") {
            stopPolling();
            if (updated.status === "completed") {
              record({
                id: updated.jobId,
                videoId: metadata.videoId,
                title: metadata.title,
                channel: metadata.channel,
                thumbnailUrl: metadata.thumbnailUrl,
                type: mode,
                quality: selectedQuality,
                downloadedAt: new Date().toISOString(),
              });
              showToast({
                variant: "success",
                title: "Download ready",
                description: `${metadata.title} — ${selectedQuality}`,
              });
            } else {
              showToast({ variant: "error", title: "Download failed", description: "Please try again." });
            }
          }
        } catch {
          stopPolling();
          showToast({ variant: "error", title: "Lost connection", description: "Couldn't check download status." });
        }
      }, 500);
    } catch (err) {
      const message = err instanceof ApiRequestError ? err.message : "Couldn't start the download.";
      showToast({ variant: "error", title: "Download failed", description: message });
    } finally {
      setIsStartingDownload(false);
    }
  }, [metadata, selectedQuality, mode, record, showToast, stopPolling]);

  useGlobalPasteShortcut((url) => {
    if (!isAnalyzing) handleAnalyze(url);
  });

  return (
    <div className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">Analyze a link</h1>
          <p className="mt-2 text-ink-muted">Paste any YouTube video, shorts, or share URL to get started.</p>
        </div>

        <UrlInputCard onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {isAnalyzing && (
              <motion.div key="skeleton" exit={{ opacity: 0 }}>
                <ResultSkeleton />
              </motion.div>
            )}
            {!isAnalyzing && metadata && (
              <VideoResultCard
                key={metadata.videoId}
                metadata={metadata}
                mode={mode}
                onModeChange={handleModeChange}
                selectedQuality={selectedQuality}
                onSelectQuality={setSelectedQuality}
                onStartDownload={handleStartDownload}
                isStartingDownload={isStartingDownload}
                activeJob={activeJob}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10">
          <HistoryPanel entries={entries} onRemove={remove} onClear={clear} />
        </div>
      </div>
    </div>
  );
}
