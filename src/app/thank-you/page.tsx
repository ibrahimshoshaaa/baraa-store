"use client";

// Baraa — thank-you page: shows the order code generated at checkout.
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

function ThankYouInner() {
  const params = useSearchParams();
  const { lang, t } = useLanguage();
  const [order, setOrder] = useState<{ code: string; name: string; total: number } | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("baraa-order");
      if (raw) {
        const rawParsed = JSON.parse(raw) as { code: string; name: string; total?: number; totalCents?: number };
        const parsed = { code: rawParsed.code, name: rawParsed.name, total: rawParsed.total ?? (rawParsed.totalCents != null ? Math.round((rawParsed.totalCents / 100) * 48) : 0) };
        if (parsed.code === params.get("code")) setOrder(parsed);
      }
    } catch {
      // ignore
    }
  }, [params]);

  const code = order?.code ?? params.get("code") ?? "";

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pine text-4xl text-gold-light shadow-[var(--shadow-button)] ring-4 ring-gold/25">
        ✓
      </span>
      <h1 className="section-title mt-6">{t("thankYouTitle")}</h1>
      <p className="section-sub text-lg">{t("thankYouSub")}</p>

      {code && (
        <div className="card mx-auto mt-8 max-w-md p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-ink-soft">{t("orderCode")}</p>
          <p className="mt-2 font-display text-3xl font-bold tracking-wider text-pine" dir="ltr">
            {code}
          </p>
          <dl className="mt-5 space-y-2 border-t border-black/5 pt-4 text-start text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">{t("thankYouPay")}</dt>
              <dd className="font-semibold">{t("cashOnDelivery")}</dd>
            </div>
            {order && (
              <div className="flex justify-between">
                <dt className="text-ink-soft">{t("thankYouTotal")}</dt>
                <dd className="font-display font-bold text-pine">{formatPrice(order.total, lang)}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink-soft">{t("thankYouNote")}</p>
      <Link href="/shop" className="btn btn-primary mt-8">
        {t("continueShopping")} →
      </Link>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouInner />
    </Suspense>
  );
}
