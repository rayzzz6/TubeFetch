import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of TubeFetch.",
};

export default function TermsPage() {
  return (
    <div className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight mb-8">Terms of Service</h1>
        <GlassCard className="p-6 sm:p-8 space-y-6 text-sm text-ink-muted leading-relaxed">
          <p className="text-xs text-ink-faint font-mono">Last updated: August 2026</p>

          <section>
            <h2 className="text-ink font-semibold mb-2">Acceptable use</h2>
            <p>
              You agree to use TubeFetch only to download content you own or have explicit rights to download.
              You are solely responsible for ensuring your use complies with applicable copyright law and the
              terms of service of any source platform, including YouTube&apos;s Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold mb-2">No warranty</h2>
            <p>
              TubeFetch is provided &quot;as is,&quot; without warranties of any kind. Availability of specific
              qualities or formats is not guaranteed and may vary or change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold mb-2">Rate limits and fair use</h2>
            <p>
              To keep the service available to everyone, requests are rate-limited. Attempting to circumvent
              these limits, or using the service for bulk or automated scraping, is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold mb-2">Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, TubeFetch and its operators are not liable for any
              indirect, incidental, or consequential damages arising from use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold mb-2">Changes</h2>
            <p>
              These terms may be updated from time to time. Continued use of the service after changes take
              effect constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold mb-2">Contact</h2>
            <p>
              Questions about these terms can be sent through the{" "}
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
