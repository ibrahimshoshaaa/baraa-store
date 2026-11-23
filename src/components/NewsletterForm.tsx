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
        className={`input ${dark ? "" : "focus:border-pine"}`}
      />
      <button
        type="submit"
        className={`btn shrink-0 ${dark ? "btn-gold" : "btn-primary"}`}
      >
        {t("subscribe")}
      </button>
    </form>
  );
}
