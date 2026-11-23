"use client";

// Baraa — contact page: info + form (front-end only; shows a success state).
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const inputCls =
    "mt-1.5 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-pine";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="text-center">
        <h1 className="font-display text-4xl font-bold text-pine sm:text-5xl">{t("contactTitle")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">{t("contactSub")}</p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <aside className="rounded-[24px] bg-pine p-7 text-white lg:col-span-2">
          <h2 className="font-display text-2xl font-bold">{t("contactInfoTitle")}</h2>
          <dl className="mt-6 space-y-5 text-sm">
            <div>
              <dt className="font-semibold uppercase tracking-widest text-gold-light">{t("contactEmailLabel")}</dt>
              <dd className="mt-1">
                <a href="mailto:hello@baraa.store" className="hover:underline">
                  hello@baraa.store
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-widest text-gold-light">{t("contactHoursLabel")}</dt>
              <dd className="mt-1 text-white/85">{t("contactHours")}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-widest text-gold-light">{t("contactLocationLabel")}</dt>
              <dd className="mt-1 text-white/85">{t("contactLocation")}</dd>
            </div>
          </dl>
        </aside>

        <div className="rounded-[24px] bg-surface p-7 shadow-[0_6px_24px_rgba(11,61,46,0.07)] lg:col-span-3">
          {sent ? (
            <p className="rounded-2xl bg-pine/10 px-5 py-6 text-center font-semibold text-pine">{t("contactSent")}</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim() && email.includes("@") && message.trim()) setSent(true);
              }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <label className="block">
                <span className="text-sm font-bold">{t("contactName")} *</span>
                <input value={name} onChange={(e) => setName(e.target.value)} required className={inputCls} />
              </label>
              <label className="block">
                <span className="text-sm font-bold">{t("contactEmail")} *</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputCls}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-bold">{t("contactMessage")} *</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contactMessagePlaceholder")}
                  rows={5}
                  required
                  className={inputCls}
                />
              </label>
              <button
                type="submit"
                className="rounded-full bg-pine py-3.5 text-sm font-semibold text-white transition hover:bg-pine-mid sm:col-span-2"
              >
                {t("contactSend")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
