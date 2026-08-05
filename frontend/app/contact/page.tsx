import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the TubeFetch team.",
};

export default function ContactPage() {
  return (
    <div className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-signal to-ice mb-4">
            <Mail className="h-5 w-5 text-base" aria-hidden="true" />
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">Get in touch</h1>
          <p className="mt-2 text-ink-muted">Questions, feedback, or bug reports — we&apos;d like to hear them.</p>
        </div>

        <GlassCard className="p-6 sm:p-8">
          <ContactForm />
        </GlassCard>
      </div>
    </div>
  );
}
