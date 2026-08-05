import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-lg", className)} aria-hidden="true" />;
}

export function ResultSkeleton() {
  return (
    <div className="glass rounded-xl3 p-5 sm:p-7" role="status" aria-label="Analyzing video">
      <div className="flex flex-col sm:flex-row gap-5">
        <Skeleton className="w-full sm:w-56 aspect-video shrink-0" />
        <div className="flex-1 space-y-3 py-1">
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-4 w-1/3" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
      <span className="sr-only">Analyzing your link…</span>
    </div>
  );
}
