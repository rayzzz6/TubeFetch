"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardPaste, Link2, Search } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { isValidYoutubeUrl } from "@/lib/validators";
import { cn } from "@/lib/utils";

interface UrlInputCardProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

export function UrlInputCard({ onAnalyze, isAnalyzing }: UrlInputCardProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isValid = value.trim().length === 0 || isValidYoutubeUrl(value);
  const showError = touched && value.trim().length > 0 && !isValidYoutubeUrl(value);

  const submit = useCallback(() => {
    setTouched(true);
    if (isValidYoutubeUrl(value)) {
      onAnalyze(value.trim());
    }
  }, [value, onAnalyze]);

  const handlePasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setValue(text.trim());
        setTouched(true);
        inputRef.current?.focus();
      }
    } catch {
      inputRef.current?.focus();
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const text = e.dataTransfer.getData("text/plain") || e.dataTransfer.getData("text/uri-list");
      if (text) {
        setValue(text.trim());
        setTouched(true);
      }
    },
    []
  );

  return (
    <GlassCard className="p-5 sm:p-8">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "rounded-2xl border-2 border-dashed transition-colors p-1",
          isDragOver ? "border-ice bg-ice/5" : "border-transparent"
        )}
      >
        <label htmlFor="youtube-url" className="block text-sm font-medium text-ink-muted mb-2">
          YouTube URL
        </label>

        <div className="relative">
          <Link2
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-faint pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            id="youtube-url"
            type="url"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            placeholder="https://www.youtube.com/watch?v=..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setTouched(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            aria-invalid={showError}
            aria-describedby={showError ? "url-error" : undefined}
            className={cn(
              "w-full rounded-2xl bg-base-surface/60 border pl-12 pr-12 py-4 text-base font-body",
              "placeholder:text-ink-faint text-ink outline-none transition-colors",
              "focus:border-ice/60",
              showError ? "border-danger/60" : "border-line"
            )}
          />
          <button
            type="button"
            onClick={handlePasteFromClipboard}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ice p-2 rounded-lg transition-colors"
            aria-label="Paste from clipboard"
            title="Paste from clipboard (or Ctrl/Cmd+V anywhere)"
          >
            <ClipboardPaste className="h-4 w-4" />
          </button>
        </div>

        {showError && (
          <p id="url-error" className="mt-2 text-sm text-danger">
            That doesn&apos;t look like a valid YouTube link. Try a full watch, shorts, or youtu.be URL.
          </p>
        )}

        <p className="mt-2 text-xs text-ink-faint">
          Drag a link in, paste with Ctrl/Cmd+V, or type it out.
        </p>

        <Button
          onClick={submit}
          isLoading={isAnalyzing}
          disabled={!isValid || value.trim().length === 0}
          size="lg"
          className="w-full mt-5"
        >
          {!isAnalyzing && <Search className="h-4 w-4" aria-hidden="true" />}
          {isAnalyzing ? "Analyzing…" : "Analyze"}
        </Button>
      </div>
    </GlassCard>
  );
}
