import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TubeFetch handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight mb-8">Privacy Policy</h1>
        <GlassCard className="p-6 sm:p-8 space-y-6 text-sm text-ink-muted leading-relaxed">
          <p className="text-xs text-ink-faint font-mono">Last updated: August 2026</p>

          <section>
            <h2 className="text-ink font-semibold mb-2">What we collect</h2>
            <p>
              TubeFetch does not require an account and does not collect personal information to operate the
              service. The URL you submit is sent to our backend solely to look up and return video metadata.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold mb-2">Local storage</h2>
            <p>
              Your download history is stored only in your browser&apos;s local storage, on your device. It is
              never transmitted to our servers and is not accessible to us. Clearing your browser data or using
              the &quot;Clear all&quot; button removes it permanently.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold mb-2">Server logs</h2>
            <p>
              Our backend keeps minimal operational logs (timestamps, request paths, response status) to detect
              abuse and diagnose errors. These logs do not include full URLs or content of downloads and are
              rotated regularly.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold mb-2">Third parties</h2>
            <p>
              We do not use third-party advertising or analytics trackers. Video thumbnails are loaded directly
              from YouTube&apos;s image CDN.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold mb-2">Cookies</h2>
            <p>TubeFetch does not use tracking cookies. Any storage used is limited to your device.</p>
          </section>

          <section>
            <h2 className="text-ink font-semibold mb-2">Contact</h2>
            <p>
              Questions about this policy can be sent through the{" "}
              <a href="/contact" className="text-ice hover:underline">
                contact page
              </a>
              .
            </p>
          </section>
        </GlassCard>
      </div>
    </div>
  );
}
