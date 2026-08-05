"use client";

import Image from "next/image";
import { AudioLines, Film, Trash2, X } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { HistoryEntry } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";

interface HistoryPanelProps {
  entries: HistoryEntry[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function HistoryPanel({ entries, onRemove, onClear }: HistoryPanelProps) {
  if (entries.length === 0) {
    return (
      <GlassCard className="p-6 text-center">
        <p className="text-sm text-ink-muted">
          Your recent downloads will show up here. Nothing&apos;s been saved on this device yet.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-base">Recent downloads</h2>
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1.5 text-xs text-ink-faint hover:text-danger transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear all
        </button>
      </div>

      <ul className="space-y-2 max-h-80 overflow-y-auto no-scrollbar">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/[0.04] transition-colors group"
          >
            <div className="relative h-11 w-16 shrink-0 rounded-lg overflow-hidden border border-line">
              <Image src={entry.thumbnailUrl} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-ink truncate">{entry.title}</p>
              <div className="flex items-center gap-1.5 text-xs text-ink-faint font-mono">
                {entry.type === "video" ? <Film className="h-3 w-3" /> : <AudioLines className="h-3 w-3" />}
                <span>{entry.quality}</span>
                <span aria-hidden="true">·</span>
                <span>{formatRelativeDate(entry.downloadedAt)}</span>
              </div>
            </div>
            <button
              onClick={() => onRemove(entry.id)}
              className="opacity-0 group-hover:opacity-100 text-ink-faint hover:text-danger p-1.5 transition-opacity"
              aria-label={`Remove ${entry.title} from history`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
