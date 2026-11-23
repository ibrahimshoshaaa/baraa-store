"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className={`rounded-full px-5 py-3.5 text-center text-sm font-semibold ${dark ? "bg-white/10 text-gold-light" : "bg-pine/10 text-pine"}`}>
        {t("newsletterDone")}
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim().length > 3 && email.includes("@")) setDone(true);
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        {t("emailPlaceholder")}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("emailPlaceholder")}
        className={`w-full flex-1 rounded-full px-5 py-3.5 text-sm outline-none ${
          dark
            ? "bg-white text-ink placeholder:text-ink-soft"
            : "border border-black/10 bg-white placeholder:text-ink-soft focus:border-pine"
        }`}
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-pine-deep transition hover:bg-gold-light"
      >
        {t("subscribe")}
      </button>
    </form>
  );
}
