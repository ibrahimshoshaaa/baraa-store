"use client";

// Baraa — thank-you page: shows the order code generated at checkout.
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

function ThankYouInner() {
  const params = useSearchParams();
  const { t } = useLanguage();
  const [order, setOrder] = useState<{ code: string; name: string; totalCents: number } | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("baraa-order");
      if (raw) {
        const parsed = JSON.parse(raw) as { code: string; name: string; totalCents: number };
        if (parsed.code === params.get("code")) setOrder(parsed);
      }
    } catch {
      // ignore
    }
  }, [params]);

  const code = order?.code ?? params.get("code") ?? "";

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pine text-4xl text-gold-light">
        ✓
      </span>
      <h1 className="mt-6 font-display text-4xl font-bold text-pine sm:text-5xl">{t("thankYouTitle")}</h1>
      <p className="mt-3 text-lg text-ink-soft">{t("thankYouSub")}</p>

      {code && (
        <div className="mx-auto mt-8 max-w-md rounded-[24px] bg-surface p-6 shadow-[0_6px_24px_rgba(11,61,46,0.07)]">
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
                <dd className="font-display font-bold text-pine">{formatPrice(order.totalCents)}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink-soft">{t("thankYouNote")}</p>
      <Link
        href="/shop"
        className="mt-8 inline-block rounded-full bg-pine px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-pine-mid"
      >
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
