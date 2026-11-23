"use client";

// Baraa — checkout: cart summary + COD form. Generates an order code and
// stores the order in sessionStorage for the thank-you page.
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatPrice, getProduct, productName } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/components/CartProvider";

const FREE_SHIPPING_CENTS = 7500;

function orderCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `B-${out.slice(0, 4)}-${out.slice(4)}`;
}

export default function CheckoutPage() {
  const { items, subtotalCents, clear } = useCart();
  const { lang, t } = useLanguage();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const shippingCents = items.length === 0 || subtotalCents >= FREE_SHIPPING_CENTS ? 0 : 999;
  const totalCents = subtotalCents + shippingCents;

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setError(t("requiredField"));
      return;
    }
    const code = orderCode();
    try {
      sessionStorage.setItem(
        "baraa-order",
        JSON.stringify({ code, name: name.trim(), totalCents, count: items.reduce((s, i) => s + i.quantity, 0) }),
      );
    } catch {
      // ignore
    }
    clear();
    router.push(`/thank-you?code=${code}`);
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold text-pine">{t("checkoutTitle")}</h1>
        <p className="mt-4 text-ink-soft">{t("checkoutEmpty")}</p>
        <Link
          href="/shop"
          className="mt-7 inline-block rounded-full bg-pine px-8 py-3.5 text-sm font-semibold text-white"
        >
          {t("checkoutGoShop")} →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center font-display text-4xl font-bold text-pine">{t("checkoutTitle")}</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <form onSubmit={placeOrder} className="lg:col-span-3">
          <div className="rounded-[24px] bg-surface p-6 shadow-[0_6px_24px_rgba(11,61,46,0.07)]">
            <h2 className="font-display text-2xl font-bold text-pine">{t("yourDetails")}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-sm font-bold">{t("fullName")} *</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("fullNamePlaceholder")}
                  className="mt-1.5 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-pine"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold">{t("phone")} *</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("phonePlaceholder")}
                  className="mt-1.5 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-pine"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold">{t("city")} *</span>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-pine"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-bold">{t("address")} *</span>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t("addressPlaceholder")}
                  rows={2}
                  className="mt-1.5 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-pine"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-bold">{t("notes")}</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("notesPlaceholder")}
                  rows={2}
                  className="mt-1.5 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-pine"
                />
              </label>
            </div>
          </div>

          <div className="mt-5 rounded-[24px] bg-pine p-6 text-white shadow-[0_6px_24px_rgba(11,61,46,0.15)]">
            <h2 className="font-display text-xl font-bold">{t("cashOnDelivery")}</h2>
            <p className="mt-1 text-sm text-white/80">{t("codNote")}</p>
          </div>

          {error && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-gold py-4 text-base font-bold text-pine-deep transition hover:bg-gold-light"
          >
            {t("placeOrder")} — {formatPrice(totalCents)}
          </button>
        </form>

        <aside className="lg:col-span-2">
          <div className="rounded-[24px] bg-surface p-6 shadow-[0_6px_24px_rgba(11,61,46,0.07)]">
            <h2 className="font-display text-2xl font-bold text-pine">{t("orderSummary")}</h2>
            <ul className="mt-4 divide-y divide-black/5">
              {items.map((item) => {
                const product = getProduct(item.slug);
                const displayName = product ? productName(product, lang) : item.name;
                return (
                  <li key={`${item.slug}-${item.colour}-${item.size}`} className="flex gap-3 py-3">
                    <span className="relative h-16 w-12 shrink-0 overflow-hidden rounded-xl bg-cream-deep">
                      <Image src={item.image} alt="" fill className="object-cover" sizes="48px" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-bold leading-snug">{displayName}</p>
                      <p className="text-xs text-ink-soft">
                        {item.colour} · {t("size")} {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-pine">{formatPrice(item.priceCents * item.quantity)}</p>
                  </li>
                );
              })}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-black/5 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">{t("subtotal")}</dt>
                <dd className="font-semibold">{formatPrice(subtotalCents)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">{t("shipping")}</dt>
                <dd className="font-semibold">{shippingCents === 0 ? t("free") : formatPrice(shippingCents)}</dd>
              </div>
              <div className="flex justify-between border-t border-black/5 pt-3 text-base">
                <dt className="font-bold">{t("total")}</dt>
                <dd className="font-display text-xl font-bold text-pine">{formatPrice(totalCents)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
