"use client";

import { AudioLines, Film } from "lucide-react";
import { AudioFormatOption, VideoFormatOption } from "@/lib/types";
import { formatFileSize } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface QualitySelectorProps {
  mode: "video" | "audio";
  onModeChange: (mode: "video" | "audio") => void;
  videoFormats: VideoFormatOption[];
  audioFormats: AudioFormatOption[];
  selectedQuality: string | null;
  onSelectQuality: (quality: string) => void;
}

export function QualitySelector({
  mode,
  onModeChange,
  videoFormats,
  audioFormats,
  selectedQuality,
  onSelectQuality,
}: QualitySelectorProps) {
  return (
    <div>
      <div role="tablist" aria-label="Download type" className="inline-flex glass rounded-full p-1">
        <button
          role="tab"
          aria-selected={mode === "video"}
          onClick={() => onModeChange("video")}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors",
            mode === "video" ? "bg-gradient-to-r from-signal to-ice text-base" : "text-ink-muted hover:text-ink"
          )}
        >
          <Film className="h-3.5 w-3.5" aria-hidden="true" />
          MP4 Video
        </button>
        <button
          role="tab"
          aria-selected={mode === "audio"}
          onClick={() => onModeChange("audio")}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors",
            mode === "audio" ? "bg-gradient-to-r from-signal to-ice text-base" : "text-ink-muted hover:text-ink"
          )}
        >
          <AudioLines className="h-3.5 w-3.5" aria-hidden="true" />
          MP3 Audio
        </button>
      </div>

      <div role="tabpanel" className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {mode === "video"
          ? videoFormats.map((f) => (
              <QualityRow
                key={f.quality}
                label={f.quality}
                sizeLabel={formatFileSize(f.approxFileSizeMB)}
                isSelected={selectedQuality === f.quality}
                onSelect={() => onSelectQuality(f.quality)}
              />
            ))
          : audioFormats.map((f) => (
              <QualityRow
                key={f.bitrate}
                label={f.bitrate}
                sizeLabel={formatFileSize(f.approxFileSizeMB)}
                isSelected={selectedQuality === f.bitrate}
                onSelect={() => onSelectQuality(f.bitrate)}
              />
            ))}
      </div>
    </div>
  );
}

function QualityRow({
  label,
  sizeLabel,
  isSelected,
  onSelect,
}: {
  label: string;
  sizeLabel: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        "rounded-xl border px-3 py-3 text-left transition-all",
        isSelected
          ? "border-ice/60 bg-ice/10 shadow-glow"
          : "border-line bg-base-surface/40 hover:border-white/20"
      )}
    >
      <div className="font-mono text-sm font-semibold text-ink">{label}</div>
      <div className="font-mono text-xs text-ink-faint mt-0.5">{sizeLabel}</div>
    </button>
  );
}
