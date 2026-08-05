"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // In production, forward to an error-tracking service instead of console.
    console.error(error);
  }, [error]);

  return (
    <div className="px-4 pt-40 pb-24 text-center">
      <h1 className="font-display font-semibold text-3xl">Something went wrong</h1>
      <p className="mt-3 text-ink-muted">An unexpected error occurred. You can try again.</p>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </div>
  );
}
