"use client";

import { useEffect } from "react";
import { isValidYoutubeUrl } from "@/lib/validators";

/**
 * Listens for Cmd/Ctrl+V anywhere on the page while the given ref's input
 * is not necessarily focused, and forwards clipboard text to the callback
 * if it looks like a YouTube URL. Complements the input's native onPaste.
 */
export function useGlobalPasteShortcut(onDetectUrl: (url: string) => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    async function handleKeydown(e: KeyboardEvent) {
      const isPasteShortcut = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "v";
      if (!isPasteShortcut) return;

      const active = document.activeElement;
      const isTypingElsewhere =
        active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
      if (isTypingElsewhere) return; // let native paste happen in that field

      try {
        const text = await navigator.clipboard.readText();
        if (text && isValidYoutubeUrl(text)) {
          onDetectUrl(text.trim());
        }
      } catch {
        // Clipboard API may be blocked by permissions — fail silently.
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onDetectUrl, enabled]);
}
