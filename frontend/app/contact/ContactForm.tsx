"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";

/**
 * REPLACE-ME: this form currently simulates submission client-side.
 * Wire it to a real endpoint (e.g. POST /api/contact backed by an email
 * service, or a form provider) before shipping to production.
 */
export function ContactForm() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsSubmitting(false);
    setSubmitted(true);
    showToast({ variant: "success", title: "Message sent", description: "We'll get back to you soon." });
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <p className="text-ink font-medium">Thanks — your message is on its way.</p>
        <p className="text-sm text-ink-muted mt-1">We typically reply within a couple of days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink-muted mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-xl bg-base-surface/60 border border-line px-4 py-3 text-sm text-ink outline-none focus:border-ice/60 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink-muted mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl bg-base-surface/60 border border-line px-4 py-3 text-sm text-ink outline-none focus:border-ice/60 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink-muted mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl bg-base-surface/60 border border-line px-4 py-3 text-sm text-ink outline-none focus:border-ice/60 transition-colors resize-none"
        />
      </div>
      <Button type="submit" isLoading={isSubmitting} size="lg" className="w-full">
        {!isSubmitting && <Send className="h-4 w-4" aria-hidden="true" />}
        Send message
      </Button>
    </form>
  );
}
