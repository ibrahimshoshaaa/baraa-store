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
          <p className="eyebrow">{t("storeTagline")}</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-pine sm:text-5xl">{t("aboutTitle")}</h1>
          <p className="mt-5 leading-relaxed text-ink-soft">{t("aboutP1")}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{t("aboutP2")}</p>
        </div>
        <div className="relative overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(11,61,46,0.18)]">
          <Image src="/images/mosque.jpg" alt={t("aboutTitle")} width={900} height={700} className="aspect-[4/3] w-full object-cover" />
        </div>
      </div>

      <section className="mt-16 text-center">
        <h2 className="font-display text-3xl font-bold text-pine">{t("aboutValuesTitle")}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            { title: t("aboutValue1Title"), text: t("aboutValue1Text") },
            { title: t("aboutValue2Title"), text: t("aboutValue2Text") },
            { title: t("aboutValue3Title"), text: t("aboutValue3Text") },
          ].map((v) => (
            <div key={v.title} className="rounded-[24px] bg-surface p-7 text-start shadow-[0_6px_24px_rgba(11,61,46,0.07)]">
              <h3 className="font-display text-xl font-bold text-pine">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-center font-display text-3xl font-bold text-pine">{t("aboutFaqTitle")}</h2>
        <div className="mt-8 space-y-4">
          {[
            { q: t("aboutFaq1Q"), a: t("aboutFaq1A") },
            { q: t("aboutFaq2Q"), a: t("aboutFaq2A") },
            { q: t("aboutFaq3Q"), a: t("aboutFaq3A") },
          ].map((f) => (
            <details key={f.q} className="group rounded-[20px] bg-surface p-5 shadow-[0_6px_24px_rgba(11,61,46,0.06)]">
              <summary className="cursor-pointer font-display text-lg font-bold text-pine">{f.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
