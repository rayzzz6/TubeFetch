import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="px-4 pt-40 pb-24 text-center">
      <p className="font-mono text-sm text-ice">404</p>
      <h1 className="mt-2 font-display font-semibold text-3xl sm:text-4xl">Page not found</h1>
      <p className="mt-3 text-ink-muted">The link you followed doesn&apos;t match anything here.</p>
      <Link href="/" className="inline-block mt-6">
        <Button>Back home</Button>
      </Link>
    </div>
  );
}
