"use client";

import { cn } from "@/lib/utils";

interface FrequencyBarsProps {
  active?: boolean;
  barCount?: number;
  className?: string;
}

/**
 * Signature element: an audio/video signal readout. Idle by default (short,
 * still bars), animates into a pulsing waveform while analysis/download is
 * in progress — a visual metaphor for the stream being read, tied directly
 * to what the product does rather than a generic decorative animation.
 */
export function FrequencyBars({ active = false, barCount = 24, className }: FrequencyBarsProps) {
  const bars = Array.from({ length: barCount });

  return (
    <div
      className={cn("flex items-end gap-[3px] h-8", className)}
      role="img"
      aria-label={active ? "Reading video signal" : "Signal idle"}
    >
      {bars.map((_, i) => {
        const heightSeed = ((i * 37) % 100) / 100; // deterministic pseudo-random height
        const delay = (i % 8) * 0.07;
        return (
          <span
            key={i}
            className={cn(
              "w-[3px] rounded-full origin-bottom bg-gradient-to-t from-signal to-ice",
              active ? "animate-bar-pulse" : "opacity-40"
            )}
            style={{
              height: active ? `${12 + heightSeed * 20}px` : `${4 + heightSeed * 6}px`,
              animationDelay: `${delay}s`,
              transition: "height 0.4s ease",
            }}
          />
        );
      })}
    </div>
  );
}
