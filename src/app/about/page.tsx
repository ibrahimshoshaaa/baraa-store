"use client";

// Baraa — about page: story, values, FAQs.
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow eyebrow-start">{t("storeTagline")}</p>
          <h1 className="section-title mt-3">{t("aboutTitle")}</h1>
          <p className="mt-5 leading-relaxed text-ink-soft">{t("aboutP1")}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{t("aboutP2")}</p>
        </div>
        <div className="relative overflow-hidden rounded-[28px] shadow-[var(--shadow-hero)]">
          <Image src="/images/mosque.jpg" alt={t("aboutTitle")} width={900} height={700} className="aspect-[4/3] w-full object-cover" />
        </div>
      </div>

      <section className="mt-16 text-center sm:mt-20">
        <h2 className="section-title">{t("aboutValuesTitle")}</h2>
        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-3">
          {[
            { title: t("aboutValue1Title"), text: t("aboutValue1Text") },
            { title: t("aboutValue2Title"), text: t("aboutValue2Text") },
            { title: t("aboutValue3Title"), text: t("aboutValue3Text") },
          ].map((v, i) => (
            <div key={v.title} className="card p-7 text-start">
              <span className="font-display text-3xl font-bold text-gold/60" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-pine">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-3xl sm:mt-20">
        <h2 className="section-title text-center">{t("aboutFaqTitle")}</h2>
        <div className="mt-8 space-y-4">
          {[
            { q: t("aboutFaq1Q"), a: t("aboutFaq1A") },
            { q: t("aboutFaq2Q"), a: t("aboutFaq2A") },
            { q: t("aboutFaq3Q"), a: t("aboutFaq3A") },
          ].map((f) => (
            <details key={f.q} className="card group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-pine">
                {f.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pine/10 text-pine transition group-open:rotate-180" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
